import { Time } from './Time'
import { Scene, Coords } from './SceneSpace'
type Environment = { coords: Coords, cell: Cell | undefined }[]
type CellStatus = 'alive' | 'wait' | 'death'

// Any live cell with fewer than two live neighbors dies, as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by over-population.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
const B = [1,3,5,7]
const S = [1,3,5,7]
// b1s1 b1s12345678 b1357s1357
export class Cell {
  environment: Environment = []
  key: string
  constructor(
    public coords: [number, number],
    public status: CellStatus,
    public time: Time,
    public scene: Scene) {

    this.key = `${coords[0]}_${coords[1]}`
    if (status === 'alive') {
      scene.push(this, 'create')
    }
    this.time.addCell(this)
    this.scene.addCell(this)
  }

  destroy = () => {
    this.time.removeCell(this)
    this.scene.removeCell(this)
    if (this.status === 'alive') {
      this.scene.push(this, 'destroy')
    }
    this.status = 'death'

  }

  handleTimeSpend: () => void = () => {
    const aroundItems = this.lookAround()
    let aliveCount = 0
    const isAlive = this.status === 'alive'
    aroundItems.forEach(({ coords, cell }) => {
      if (cell) {
        if (cell.status === 'alive') {
          aliveCount++
        }
        // 处理两个时间碰撞的节点
        // 后发的时间,会覆盖先发的时间。
        // if (cell.status === 'alive' || cell.status === 'wait') {
        //   if (this.time.count !== cell.time.count) {
        //     // count 大的时间管理器的 dispatch 时机会比较晚。
        //     this.time.removeCell(cell)
        //     this.time = cell.time
        //     this.time.addCell(this)
        //     return
        //   }
        // }
      } else {
        isAlive && new Cell(coords, 'wait', this.time, this.scene)
      }
    })

    if (isAlive && (!S.some(e => e == aliveCount))) {
      this.time.nextTick(() => this.destroy())
    }

    if (this.status === 'wait') {
      if (B.some(e => e === aliveCount)) {
        this.time.nextTick(() => {
          this.changeStatus(`alive`)
        })
      } else {
        this.time.nextTick(() => this.destroy())
      }
    }
  }

  lookAround: () => Environment = () => {
    const operation = [
      { key: 'addition', handle: (value: number) => value + 1 },
      { key: 'immutable', handle: (value: number) => value },
      { key: 'subtraction', handle: (value: number) => value - 1 }
    ]
    const coordsList: [number, number][] = []
    for (let item of operation) {
      const coordsForX = [item.handle(this.coords[0]), this.coords[1]]
      for (let item1 of operation) {
        if (item.key === 'immutable' && item1.key === 'immutable') continue
        const coordsRes: [number, number] = [coordsForX[0], item1.handle(coordsForX[1])]
        coordsList.push(coordsRes)
      }
    }
    const filterCoordsList = this.scene.filterSpace(coordsList)
    const res = filterCoordsList.map(item => {
      return {
        cell: this.scene.getCellByCoords(item),
        coords: item
      }
    })
    return res
  }
  changeStatus = (status: CellStatus) => {
    this.status = status
    if (status === 'alive') {
      this.scene.push(this, 'create')

    }
  }
}
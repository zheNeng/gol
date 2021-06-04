
import { Cell } from './Cell'

export type Coords = [number, number]

// const getKeyByCoords = (params: Coords) => {
//   return params.reduce((res, key) => `${res}_${key}`, '')
// }
// const getCoordsFromKey: (params: string) => Coords = (params) => {
//   const res: any = params.split(`_`)
//   return res
// }

export class Scene {

  cacheCoords: Set<string> = new Set()
  cacheContain: (Cell | undefined)[][][] = []

  contain: Map<string, (Cell | undefined)>

  private changeList: { type: 'create' | 'destroy', cell: Cell }[] = []

  count: number = 0

  constructor(private x: number, private y: number) {
    (window as any).scene = this

    this.contain = new Map()
    //  new Array(x + 1).fill('').map(() => {
    //   return [...new Array(y + 1).fill(undefined)]
    // })
  }

  addCell(cell: Cell) {
    const item = this.contain.get(cell.key)
    if (item) {
      item.destroy()
    }
    this.contain.set(cell.key, cell)
    this.count++
  }

  removeCell(cell: Cell) {
    this.contain.delete(cell.key)
    this.count--
  }

  getCellByCoords: (coords: Coords) => Cell | undefined = (coords) => {
    return this.contain.get(`${coords[0]}_${coords[1]}`)
  }

  filterSpace(list: Coords[]) {
    const res = list.filter(([x, y]) => {
      if (x < 0 || y < 0 || x > this.x || y > this.y) {
        return false
      }
      return true
    })
    return res
  }
  push = (cell: Cell, type: 'create' | 'destroy') => {
    this.changeList.push({
      cell, type
    })
  }
  pop = () => {
    return this.changeList.shift()
  }
}
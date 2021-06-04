import { Cell } from './Cell'
const timeList: Time[] = []

export class Time {
  static count: number = 0
  color: string

  static removeOtherTime: (item: Cell) => void = (cell: Cell,) => {
    timeList.forEach(item => {
      item.removeCell(cell)
    })
  }

  static logTimeList = () => {
    console.log(timeList)
    return timeList
  }

  public count: number

  constructor(cellList: Cell[] = [], color = 'black') {
    (window as any).time = this
    cellList.forEach(cell => {
      Time.removeOtherTime(cell)
      this.removeCell(cell)
    })
    this.color = color
    this.count = ++Time.count
    timeList.push(this)
  }

  relationshipList: Set<Cell> = new Set()
  tickList: any[] = []

  next = () => {
    this.tickList = []
    this.relationshipList.forEach(item => {
      item.handleTimeSpend()
    })
    this.tickList.forEach(fn => {
      fn()
    })
  }

  nextTick(fn: () => void) {
    this.tickList.push(fn)
  }

  addCell: (target: Cell) => void = (target) => {
    this.relationshipList.add(target)
  }

  removeCell: (target: Cell) => void = (target) => {
    this.relationshipList.delete(target)
  }

  history: Map<string, Cell[]> = new Map()
}
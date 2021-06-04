export const creatRect = ([x, y]: [number, number]) => {
  return [
    [x, y], [x + 1, y],
    [x, y + 1], [x + 1, y + 1]
  ]
}
export const createGlider = ([x, y]: [number, number]) => {
  // 滑翔机
  const cell = [
    [x, y],
    [x + 1, y + 1],
    [x - 1, y + 2], [x, y + 2], [x + 1, y + 2]
  ]
  return cell
}
export const createLightWeightSpaceship = ([x, y]: [number, number]) => {
  // 轻型飞船
  const cell = [[x, y], [x + 3, y],
  [x + 4, y + 1],
  [x, y + 2], [x + 4, y + 2],
  [x + 1, y + 3], [x + 2, y + 3], [x + 3, y + 3], [x + 4, y + 3]]
  return cell
}
export const createGospersGliderGun = ([x, y]: [number, number]) => {
  // 高斯帕滑翔机枪
  const creatLeft = ([x, y]: [number, number]) => {
    return [
      [x, y], [x + 1, y],
      [x - 1, y + 1], [x + 3, y + 1],
      [x - 2, y + 2], [x + 4, y + 2],
      [x - 2, y + 3], [x + 2, y + 3], [x + 4, y + 3], [x + 5, y + 3],
      [x - 2, y + 4], [x + 4, y + 4],
      [x - 1, y + 5], [x + 3, y + 5],
      [x, y + 6], [x + 1, y + 6],
    ]
  }

  const creatRight = ([x, y]: [number, number]) => {
    return [
      [x, y],
      [x - 2, y + 1], [x, y + 1],
      [x - 4, y + 2], [x - 3, y + 2],
      [x - 4, y + 3], [x - 3, y + 3],
      [x - 4, y + 4], [x - 3, y + 4],
      [x - 2, y + 5], [x, y + 5],
      [x, y + 6]
    ]
  }
  const cell = [
    ...creatRect([x, y]),
    ...creatLeft([x + 12, y - 3]),
    ...creatRight([x + 24, y - 5]),
    ...creatRect([x + 34, y - 2])
  ]
  return cell
}
export const createI = ([x, y]: [number, number]) => {
  // I
  // -
  // I
  const cell = [[x, y], [x + 1, y], [x + 2, y],
  [x + 1, y + 1],
  [x + 1, y + 2],
  [x, y + 3], [x + 1, y + 3], [x + 2, y + 3],
  [x, y + 5], [x + 1, y + 5], [x + 2, y + 5],
  [x, y + 6], [x + 1, y + 6], [x + 2, y + 6],
  [x, y + 8], [x + 1, y + 8], [x + 2, y + 8],
  [x + 1, y + 9],
  [x + 1, y + 10],
  [x, y + 11], [x + 1, y + 11], [x + 2, y + 11],]
  return cell
}
export const createZ = ([x, y]: [number, number]) => {
  // Z
  const cell = [[x, y], [x + 1, y], [x + 2, y],
  [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]]
  return cell
}
export const createLine = ([x, y]: [number, number]) => {
  // 直线
  const cell = [
    [x, y], [x + 1, y], [x + 2, y]
  ]
  return cell
}
export const createFlower = ([x, y]: [number, number]) => {
  // 🌹
  const cell = [
    [x, y], [x + 1, y],
    [x - 1, y + 1], [x + 2, y + 1],
    [x, y + 2], [x + 1, y + 2],
  ]
  return cell
}
export const createBigRect = ([x, y]: [number, number]) => {
  //     --- 
  //  |      |
  //- |-    -|-
  //  |      |
  //     ---
  const cell = [
    [x, y], [x + 1, y], [x + 2, y],
    [x - 2, y - 2], [x + 4, y - 2],
    [x - 3, y - 3], [x - 2, y - 3], [x - 1, y - 3], [x + 3, y - 3], [x + 4, y - 3], [x + 5, y - 3],
    [x - 2, y - 4], [x + 4, y - 4],
    [x, y - 6], [x + 1, y - 6], [x + 2, y - 6],
  ]
  return cell
}
export const creatRandomCell = (number: number = 100, maxX = 100, maxY = 100) => {
  const res = []
  const obj: any = {}
  for (let index = 0; index < number; index++) {
    const x = Math.round(Math.random() * maxX);
    const y = Math.round(Math.random() * maxY);
    const key = `${x}_${y}`
    if (!obj[key]) {
      res.push([x, y])
      obj[key] = 1
    }
  }
  return res
}
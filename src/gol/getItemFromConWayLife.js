// https://conwaylife.com/ref/lexicon/lex_1.htm  从这个网站读取一些图形代码
const getArrItemFromConWayLife = (str) => {
  const arr = str.split(/\s/).filter(e => e)
  const res = []
  for (let y = 0; y < arr.length; y++) {
    const row = arr[y].split('')
    for (let x = 0; x < row.length; x++) {
      const item = row[x]
      if (item === 'O') {
        const pointX = x ? `x+${x}` : `x`
        const pointY = y ? `y+${y}` : `y`
        res.push([pointX, pointY])
      }
    }
  }
  return res
}
const getVarFromConWayLife = (str) => {
  const res = JSON.stringify(getArrItemFromConWayLife(str)).replace(/"/g, '')
  return res
}
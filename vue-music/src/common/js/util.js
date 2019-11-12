function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle(arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const idx = getRandom(0, i)
    const temp = _arr[i]
    _arr[i] = _arr[idx]
    _arr[idx] = temp
  }
  return _arr
}


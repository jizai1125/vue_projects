const picURL = 'http://y.gtimg.cn/music/photo_new/T001R150x150M000'

export default class Singer {
  constructor({ id, name }) {
    this.id = id
    this.name = name
    this.avatar = `${picURL}${id}.webp`
  }
}

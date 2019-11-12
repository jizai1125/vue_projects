import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.code !== ERR_OK) {
          reject(res)
        } else {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }
      })
    })
  }
}

export function createSong(musicData, purl) {
  const imgUrl = musicData.album.mid.trim()
    ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`
    : 'https://y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000'
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: imgUrl,
    url: `http://ws.stream.qqmusic.qq.com/${purl}`
  })
}
// name / name
function filterSinger(singer) {
  if (!singer) return ''
  return singer.map(item => item.name).join('/')
}

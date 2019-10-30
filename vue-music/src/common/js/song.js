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
// "FFB1BA328F4F1BE4013AD80AECEDADA50BE4C3911F5944345B86130A94562BB5128862870BDCCB9FED02DA946851525E6E383A921754A557"
// "C400001qvvgF38HVc4.m4a?guid=973270494&vkey=FFB1BA328F4F1BE4013AD80AECEDADA50BE4C3911F5944345B86130A94562BB5128862870BDCCB9FED02DA946851525E6E383A921754A557&uin=0&fromtag=66"

function filterSinger(singer) {
  if (!singer) return ''
  return singer.map(item => item.name).join('/')
}

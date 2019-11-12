import { playMode } from 'common/js/config'
const state = {
  singer: {},
  playing: false, // 播放状态
  fullScreen: false, // 展开/最小化播放器
  playList: [], // 歌曲播放列表
  sequenceList: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式：顺序、随机、单曲
  currentIndex: -1 // 当前播放歌曲index
}
export default state

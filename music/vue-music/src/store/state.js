import { playMode } from "common/js/config";

const state = {
  userInfo: null,
  singer: {},
  playing: false, // 播放状态
  fullScreen: false, // 展开/最小化播放器
  playList: [], // 歌曲播放列表
  sequenceList: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式：顺序、随机、单曲
  currentIndex: -1, // 当前播放歌曲index (playList)
  currentDisc: [], // 当前歌单
  currentRank: null, // 当前榜单
  searchHistory: [], // 搜索历史
  playHistory: [], // 最近播放
  favoriteList: [], // 我喜欢的
};

export default state;

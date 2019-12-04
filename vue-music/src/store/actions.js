import * as types from './mutation-type'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'
// 选中歌曲播放
export function selectPlay({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = randomList.findIndex(item => item.id === list[index].id)
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}

// 随机播放
export function randomPlay({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
}
// 插入播放列表
export function insertSong({ commit, state }, song) {
  const playList = state.playList.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  const currentSong = state.playList[currentIndex]
  // 插入到playList
  const fpIndex = playList.findIndex(item => item.id === song.id)
  currentIndex++
  playList.splice(currentIndex, 0, song)
  // 如果播放列表存在这首歌，则删除
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }
  // 插入到sequenceList, 计算插入位置 -> 判断列表中是否已有要插入的歌曲 -> 有则删除该歌曲，
  // 如果插入的索引 > 该已有歌曲的索引，则直接删除；插入的索引 < 该已有歌曲的索引,则删除位置+1
  const currentSIndex = sequenceList.findIndex(item => item.id === currentSong.id) + 1
  const fsIndex = sequenceList.findIndex(item => item.id === song.id)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 保存搜索历史
export function saveSearchHistory({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
// 删除搜索历史
export function deleteSearchHistory({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export function clearSearchHistory({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

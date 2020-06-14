import * as types from "./mutation-type";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";

import { addCollect, delCollect } from "api/collect";
import { addSearchHis, delSearchHis, cleearSearchHis } from "api/search";
import { getUserInfo } from 'api/user'

// 选中歌曲播放
export function selectPlay({ commit, state }, { list, index }) {
  console.log("list", list);
  commit(types.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    const randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    index = randomList.findIndex((item) => item._id === list[index]._id);
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
}

// 随机播放
export function randomPlay({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_SEQUENCE_LIST, list);
  const randomList = shuffle(list);
  commit(types.SET_PLAYLIST, randomList);
  commit(types.SET_CURRENT_INDEX, 0);
}
// 插入歌曲到播放列表
export function insertSong({ commit, state }, song) {
  const playList = state.playList.slice();
  const sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  const currentSong = state.playList[currentIndex];
  // 插入到playList
  const fpIndex = playList.findIndex((item) => item._id === song._id);
  currentIndex++;
  playList.splice(currentIndex, 0, song);
  // 如果播放列表存在这首歌，则删除
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playList.splice(fpIndex + 1, 1);
    }
  }
  // 插入到sequenceList, 计算插入位置 -> 判断列表中是否已有要插入的歌曲 -> 有则删除该歌曲，
  // 如果插入的索引 > 该已有歌曲的索引，则直接删除；插入的索引 < 该已有歌曲的索引,则删除位置+1
  const currentSIndex =
    sequenceList.findIndex((item) => item._id === currentSong._id) + 1;
  const fsIndex = sequenceList.findIndex((item) => item._id === song._id);
  sequenceList.splice(currentSIndex, 0, song);
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  commit(types.SET_PLAYLIST, playList);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}
// 从播放列表删除歌曲
export function deleteSong({ commit, state }, song) {
  const playList = state.playList.slice();
  const sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  const pIndex = playList.findIndex((item) => item._id === song._id);
  playList.splice(pIndex, 1);
  const sIndex = sequenceList.findIndex((item) => item._id === song._id);
  sequenceList.splice(sIndex, 1);
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--;
  }
  commit(types.SET_PLAYLIST, playList);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  const playingState = playList.length > 0;
  commit(types.SET_PLAYING_STATE, playingState);
}
// 保存搜索历史
export function saveSearchHistory({ commit, state }, query) {
  addSearchHis(query);
  const searchHis = state.searchHistory || [];
  _insertArray(searchHis, query, (item) => item === query);
  commit(types.SET_SEARCH_HISTORY, searchHis);
}
// 删除搜索历史
export function deleteSearchHistory({ commit, state }, query) {
  delSearchHis(query);
  const searchHis = state.searchHistory || [];
  _deleteFromArray(searchHis, (item) => item === query);
  commit(types.SET_SEARCH_HISTORY, searchHis);
}
// 清空搜索历史
export function clearSearchHistory({ commit }) {
  cleearSearchHis();
  commit(types.SET_SEARCH_HISTORY, []);
}

// 清空播放列表
export function clearPlaylist({ commit }) {
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_SEQUENCE_LIST, []);
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING_STATE, false);
}

// 保存最近播放歌曲
export function savePlayHistory({ commit, state }, song) {
  const songs = state.playHistory;
  _insertArray(songs, song, (item) => item._id === song._id);
  commit(types.SET_PLAY_HISTORY, songs);
}
// 收藏歌曲
export function saveFavoriteSong({ commit, state }, song) {
  addCollect(song._id);
  const songs = state.favoriteList;
  _insertArray(songs, song, (item) => item._id === song._id);
  commit(types.SET_FAVORITE_LIST, songs);
}
// 删除收藏歌曲
export function deleteFavoriteSong({ commit, state }, song) {
  delCollect(song._id);
  const songs = state.favoriteList;
  _deleteFromArray(songs, (item) => item._id === song._id);
  commit(types.SET_FAVORITE_LIST, songs);
}

// 获取用户信息
export function getInfo({commit}) {
  return new Promise((resolve, reject) => {
    getUserInfo().then(res => {
      console.log('userInfo>>>>', res)
      commit(types.SET_USERINFO, res)
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 添加数据到数组中
function _insertArray(arr, value, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (!index) return;
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(value);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

// 从数组中删除对应数据
function _deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

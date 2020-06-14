<template>
  <div class="managemusic">
    <audio ref="musicPlayer" :src="toListenSrc" @ended="ended" autoplay preload="load"></audio>
    <Row style="padding:20px 60px 20px 40px;">
      <Col :span="5">
        <Input
          prefix="ios-musical-notes"
          clearable
          v-model="searchName"
          @keypress.enter.native="searchSong()"
          placeholder="按 歌名, 歌手 搜索歌曲..."
          style="width: auto"
        />
      </Col>
      <Col :span="3">
        <Button type="primary" style="margin-left:5px;" @click="getAllSong()">所有歌曲</Button>
      </Col>
      <Col :span="4">
        <Button type="success" style="margin-left:5px;" @click="toListen = true">试听歌曲</Button>
      </Col>
      <Col :span="12" style="text-align:right;">
        <Avatar
          id="musicPoster"
          @click.native="operaMusic"
          class="listen-poster"
          v-if="toListenPoster"
          :src="toListenPoster"
          size="large"
          style="margin-right:40px;"
        />
        <Button type="primary" @click="showAddSongBtn()">添加</Button>
      </Col>
    </Row>
    <!-- 歌曲数据表 -->
    <div style="width:100%;background-color:#f40;" v-if="allSongs.length">
      <el-table :data="allSongs" class="song-table" style="width: 100%" border>
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="_id" label="歌曲 ID" align="center"></el-table-column>
        <el-table-column prop="title" label="歌曲名" align="center"></el-table-column>
        <el-table-column prop="singer.name" label="歌手" align="center"></el-table-column>
        <el-table-column prop="url" align="center" width="200" label="歌曲地址"></el-table-column>
        <el-table-column align="center" width="120" label="歌曲封面">
          <template slot-scope="scope" v-if="scope.row.singer">
            <Avatar :src="'http://localhost:3000' + scope.row.singer.pic" size="large" />
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="language" width="120" label="语种"></el-table-column> -->
        <el-table-column prop="type.name" align="center" width="120" label="风格"></el-table-column>
        <el-table-column align="center" label="是否已上传歌词">
          <template slot-scope="scope">{{scope.row.hasLyric ? '是' : "否"}}</template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="playcount" width="80" label="播放次数"></el-table-column> -->
        <!-- <el-table-column align="center" prop="created" width="200" label="最近更新时间"></el-table-column> -->
        <el-table-column prop="operation" align="center" label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              circle
              icon="el-icon-star-off"
              @click="likeSongs(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              @click="onEditSong(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="onDeleteSong(scope.row,scope.$index)"
            ></el-button>
            <el-button
              size="small"
              icon="ios-cloud-upload-outline"
              @click="uploadLyric(scope.row)"
            >上传歌词</el-button>
            <Upload
              style="display:none;"
              action="http://localhost:3000/upload/lrc"
              :on-success="handleAddLyricSuccess"
              ref="uploadLyric"
              :format="['lrc']"
            ></Upload>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <Row>
      <Col span="24" style="text-align:right;padding:10px;">
        <el-pagination
          v-if="paginations.total > 0"
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total"
          :current-page.sync="paginations.page_index"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </Col>
    </Row>

    <!-- 添加歌曲 -->
    <el-dialog
      :title="addDialog.title"
      :visible.sync="addDialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="addForm_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="title" label="歌曲名:">
            <el-input type="songName" v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item prop="singer_name" label="歌手:">
            <el-input type="artist" v-model="addForm.singer_name"></el-input>
          </el-form-item>
          <el-form-item label="歌手封面:" prop="singer_pic">
            <Upload
              :show-upload-list="false"
              :format="['jpg','png']"
              :max-size="10000"
              multiple
              type="drag"
              :on-success="handleAddPosterSuccess"
              action="http://localhost:3000/upload/img"
              style="display:block;width:44px;"
            >
              <span style="float:left;">
                <Avatar :src="'http://localhost:3000' + addForm.singer_pic" size="large" />
              </span>
            </Upload>
          </el-form-item>
          <el-form-item prop="url" label="歌曲地址:">
            <Upload
              action="http://localhost:3000/upload/music"
              :on-success="handleAddSongSuccess"
              ref="uploadmusic"
              :format="['mp3', 'm4a']"
            >
              <Button icon="ios-cloud-upload-outline" @click.native="clearFiles">上传歌曲</Button>
            </Upload>
          </el-form-item>
          <el-form-item prop="typeId" label="风格:">
            <Select v-model="addForm.typeId" clearable style="width:200px">
              <Option v-for="item in SongStyle" :value="item._id" :key="item._id">{{ item.name }}</Option>
            </Select>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="addDialog.show = false">取 消</el-button>
            <el-button type="primary" @click="addSong('addForm')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 编辑歌曲 -->
    <el-dialog
      :title="editDialog.title"
      :visible.sync="editDialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="editForm"
          :model="editForm"
          :rules="addForm_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="_id" label="歌曲ID:">
            <el-input type="id" disabled v-model="editForm._id"></el-input>
          </el-form-item>
          <el-form-item prop="title" label="歌曲:">
            <el-input type="songName" v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item prop="singer_name" label="歌手:">
            <el-input type="artist" v-model="editForm.singer_name"></el-input>
          </el-form-item>
          <el-form-item label="歌手封面:" prop="singer_pic">
            <Upload
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :max-size="50000"
              multiple
              type="drag"
              :on-success="handleEditPosterSuccess"
              action="http://localhost:3000/upload/img"
              style="display:block;width:44px;"
            >
              <span style="float:left;">
                <Avatar :src="'http://localhost:3000' + editForm.singer_pic" size="large" />
              </span>
            </Upload>
          </el-form-item>
          <el-form-item prop="src" label="歌曲地址:">
            <Upload
              action="http://localhost:3000/upload/music"
              :on-success="handleEditSongSuccess"
              ref="editmusic"
              :format="['mp3']"
            >
              <Button icon="ios-cloud-upload-outline">重新选择</Button>
            </Upload>
          </el-form-item>
          <el-form-item prop="style" label="风格:">
            <Select v-model="editForm.typeId" clearable style="width:200px">
              <Option v-for="item in SongStyle" :value="item._id" :key="item._id">{{ item.name }}</Option>
            </Select>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="editDialog.show = false">取 消</el-button>
            <el-button type="primary" @click="okEditBtn('editForm')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 音乐试听 -->
    <Modal v-model="toListen" width="700">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-musical-notes" />
        <span>点击试听</span>
      </p>
      <div v-if="toListen">
        <div style="width:100%;">
          <el-table :data="allSongs" height="300" style="width: 100%">
            <el-table-column prop="title" align="center" width="200" label="歌名"></el-table-column>
            <el-table-column prop="singer.name" align="center" width="200" label="歌手"></el-table-column>
            <el-table-column align="center" width="200" label="试听">
              <template slot-scope="scope">
                <span class="toListen-link" @click="listenMusic(scope.row)">播放</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" v-if="toListen" style="height:30px;">
        <Col span="24" style="text-align:right;padding:0px 10px;">
          <el-pagination
            v-if="paginations.total > 0"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page.sync="paginations.page_index"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </Col>
      </div>
    </Modal>
  </div>
</template>
<script>
// 添加歌手 => 添加音乐 => 添加歌曲
import wsmLoading from "@/plugins/wsmLoading";
import $ from "jquery";
export default {
  name: "managemusic",
  data() {
    return {
      currentSong: null,
      isfirst: false,
      firstEdit: true,
      inputPassword: "",
      searchName: "",
      // flag: "", // 用来判断是 添加, 编辑或删除
      toListen: false,
      toListenSrc: "",
      toListenPoster: "",
      allSongs: [],
      allTableData: [],
      paginations: {
        // 分页属性
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 8, // 1页显示多少条
        page_sizes: [8, 15, 20, 25], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      editDialog: {
        title: "编辑歌曲",
        show: false
      },
      editForm: {
        // 编辑歌曲的form
        _id: "",
        title: "",
        url: "",
        singer_name: "",
        singer_pic: "",
        typeId: ""
      },
      addDialog: {
        title: "添加歌曲",
        show: false
      },
      addForm: {
        title: "",
        url: "",
        singer_name: "",
        singer_pic: "",
        typeId: ""
      },
      addForm_rules: {
        // 添加或者编辑歌曲规则
        title: [{ required: true, message: "歌曲名不能为空" }],
        singer_name: [{ required: true, message: "歌手不能为空" }],
        url: [{ required: true, message: "歌曲不能为空" }],
        singer_pic: [{ required: true, message: "歌手封面不能为空" }],
        typeId: [{ required: true, message: "风格不能为空" }]
      },
      SongStyle: [] // 歌曲风格
    };
  },
  created() {
    this.getAllSong();
    this.getSongStyle();
  },
  methods: {
    // 获取歌曲风格
    getSongStyle() {
      this.$axios
        .get("/type/list")
        .then(res => {
          this.SongStyle = res.result;
        })
        .catch(err => console.error(err));
    },
    // 管理员推荐歌曲
    likeSongs(song) {
      console.log(song);
      this.$confirm(
        `要添加 ${song.title} (${song.singer.name}) 歌曲到推荐歌曲里吗? `,
        "操作提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .post("/recommend/new", {
              songId: song._id
            })
            .then(res => {
              this.$Message.success("添加成功");
            })
            .catch(err => console.error(err));
        })
        .catch(() => {});
    },
    // 删除歌曲
    onDeleteSong(song) {
      this.$confirm(
        `确定删除 ${song.title} (${song.singer.name}) 歌曲吗?不可撤销,是否继续? `,
        "风险提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .delete("/song/delete", { data: { id: song._id } })
            .then(res => {
              this.$Message.success(res.msg);
              this.getAllSong();
            });
        })
        .catch(() => {});
    },
    okEditBtn(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        const {
          _id: songId,
          title,
          url,
          singer_name,
          singer_pic,
          typeId
        } = this.editForm;
        // 添加歌手
        const res = await this.$axios.post("/singer/new", {
          name: singer_name,
          pic: singer_pic
        });
        const { _id: singerId } = res.result;
        // 添加歌曲信息
        this.$axios
          .put("/song/edit", { songId, title, url, typeId, singerId })
          .then(res => {
            console.log(res);
            this.getAllSong();
            this.$Message.success("修改成功");
          });
      });
      this.editDialog.show = false;
      // this.flag = 2;
    },
    // 编辑歌曲
    onEditSong(song) {
      const { _id, title, url, type, singer } = song;
      this.editForm = {
        _id,
        title,
        url,
        singer_name: singer.name,
        singer_pic: singer.pic,
        typeId: type._id
      };
      this.editDialog.show = true;
      this.clearFiles();
    },
    // 成功上传歌曲
    handleEditSongSuccess(res) {
      console.log(res);
      this.editForm.url = res.file.path;
      this.firstEdit = false;
    },
    // 成功上传图片
    handleEditPosterSuccess(res) {
      console.log(res);
      this.editForm.singer_pic = res.file.path;
      console.log(this.editForm);
    },
    // 搜索歌曲
    searchSong() {
      if (this.searchName.trim().length) {
        this.$axios
          .post("http://localhost:8633/api/music/search/byname", {
            searchName: this.searchName
          })
          .then(res => {
            this.allSongs = res.data;
            this.allTableData = res.data;
            this.setPaginations();
          });
      } else {
        this.$Message.warning("搜索内容不能为空..");
      }
    },
    // 添加音乐
    addSong(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        const { title, url, singer_name, singer_pic, typeId } = this.addForm;
        // 添加歌手
        const res = await this.$axios.post("/singer/new", {
          name: singer_name,
          pic: singer_pic
        });
        const { _id } = res.result;
        // 添加歌曲信息
        this.$axios
          .post("/song/new", { title, url, typeId, singerId: _id })
          .then(res => {
            console.log(res);
            this.getAllSong();
            this.$Message.success("添加成功");
          });
        this.addDialog.show = false;
        // this.flag = 1;
      });
    },
    // 显示添加音乐模态框
    showAddSongBtn() {
      this.addDialog.show = true;
      this.addForm.title = "";
      this.addForm.url = "";
      this.addForm.singer_name = "";
      this.addForm.singer_pic = "";
      this.addForm.typeId = "";
      this.clearFiles();
    },
    // 成功添加歌曲回调
    handleAddSongSuccess(res) {
      console.log(res);
      this.addForm.url = res.file.path;
    },
    // 成功添加歌词回调
    async handleAddLyricSuccess(res) {
      console.log(res);
      this.lyricPath = res.filepath;
      try {
        if (this.currentSong.hasLyric) {
          // 更改
          console.log("update");
          await this.$axios.put("/lyric/edit", {
            songId: this.currentSong._id,
            filepath: res.filepath
          });
        } else {
          // 添加
          console.log("add");
          await this.$axios.post("/lyric/new", {
            songId: this.currentSong._id,
            filepath: res.filepath
          });
        }
        this.getAllSong();
        this.$Message.success("上传成功");
      } catch (error) {
        this.$Message.success("上传失败");
      }
    },
    // 成功添加歌手图片回调
    handleAddPosterSuccess(res) {
      this.isfirst = true;
      console.log(res);
      this.addForm.singer_pic = res.file.path;
    },
    clearFiles() {
      if (this.firstEdit == false) {
        this.$refs.editmusic.clearFiles();
      }
      if (this.isfirst == true) {
        this.$refs.uploadmusic.clearFiles();
      }
    },
    clearLyric() {
      this.$refs.uploadLyric.clearFiles();
    },
    uploadLyric(item) {
      console.log(item);
      this.currentSong = item;
      this.$refs.uploadLyric.$refs.input.click();
    },
    listenMusic(song) {
      this.toListenSrc = `http://localhost:3000${song.url}`;
      this.toListenPoster = `http://localhost:3000${song.singer.pic}`;
      setTimeout(() => {
        console.log(this.$refs.musicPlayer.duration);
      }, 200);
    },
    // 操作音乐
    operaMusic() {
      if (this.$refs.musicPlayer.paused) {
        $(".listen-poster").css("animation-play-state", "running");
        this.$refs.musicPlayer.play();
      } else {
        $(".listen-poster").css("animation-play-state", "paused");
        this.$refs.musicPlayer.pause();
      }
    },
    ended() {
      this.$refs.musicPlayer.play();
    },
    // 获取所有歌曲
    getAllSong() {
      this.$axios
        .get("/song/list")
        .then(res => {
          console.log(res);
          const result = res.result;
          this.allSongs = result;
          this.allTableData = result;
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    // 设置当前页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.allSongs = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      this.allSongs = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 改变每页条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.allSongs = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    // 设置的分页
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 8;
      // 设置默认分页数据
      this.allSongs = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.managemusic {
  width: 100%;
  height: 100%;
  padding: 20px 60px;

  .listen-poster {
    cursor: pointer;
    animation: poster 15s linear infinite;
  }
  @keyframes poster {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
.toListen-link {
  cursor: pointer;
  &:hover {
    color: rgb(223, 107, 72);
  }
}
</style>
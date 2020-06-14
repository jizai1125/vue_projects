<template>
  <div class="adminlikes">
    <Row style="padding:20px 60px 20px 40px;">
      <Col :span="20">
        <Input
          prefix="ios-musical-notes"
          clearable
          v-model="searchName"
          @keypress.enter.native="searchSong()"
          placeholder="按 歌名, 歌手 搜索歌曲..."
          style="width: auto"
        />
      </Col>
      <Col :span="4" style="text-align:right;">
        <Button type="primary" @click="getRecommend">所有歌曲</Button>
      </Col>
    </Row>
    <!-- 歌曲数据表 -->
    <div style="width:100%;background-color:#f40;">
      <el-table :data="adminLikes" class="song-table" style="width: 100%" border>
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="_id" label="歌曲 ID" align="center" width="240"></el-table-column>
        <el-table-column prop="song.title" label="歌曲名" align="center" width="200"></el-table-column>
        <el-table-column prop="song.singer.name" label="歌手" align="center" width="170"></el-table-column>
        <el-table-column prop="song.url" align="center" width="200" label="歌曲地址"></el-table-column>
        <el-table-column align="center" width="120" label="歌曲封面">
          <template slot-scope="scope">
            <Avatar :src="'http://localhost:3000' + scope.row.song.singer.pic" size="large" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="song.type.name" width="120" label="风格"></el-table-column>
        <!-- <el-table-column align="center" prop="date" width="200" label="最近更新时间"></el-table-column> -->
        <el-table-column prop="operation" align="center" label="操作" fixed="right" min-width="100">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="onDeleteSong(scope.row,scope.$index)"
            ></el-button>
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
  </div>
</template>
<script>
import wsmLoading from "@/plugins/wsmLoading";
export default {
  name: "adminlikes",
  data() {
    return {
      inputPassword: "",
      searchName: "",
      adminLikes: [],
      allTableData: [],
      paginations: {
        // 分页属性
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 8, // 1页显示多少条
        page_sizes: [8, 15, 20, 25], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      }
    };
  },
  created() {
    this.getRecommend();
  },
  methods: {
    // 搜索歌曲
    searchSong() {
      if (this.searchName.trim().length) {
        // console.log(this.searchName)
        this.$axios
          .post("http://localhost:8633/api/admin/adminlike/search", {
            searchName: this.searchName
          })
          .then(res => {
            this.adminLikes = res.data;
            this.allTableData = res.data;
            this.setPaginations();
          });
      } else {
        this.$Message.warning("搜索内容不能为空");
      }
    },
    // 获取所有推荐歌曲
    getRecommend() {
      this.$axios.get("http://localhost:3000/recommend/list").then(res => {
        console.log(res);
        this.adminLikes = res.result;
        this.allTableData = res.result;
        this.setPaginations();
      });
    },
    // 移除歌曲
    onDeleteSong(recommend) {
      const { song, _id } = recommend;
      this.$confirm(
        `你确定要移除 ${song.title} (${song.singer.name}) 吗?不可恢复是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .delete("/recommend/delete", { data: { id: _id } })
            .then(res => {
              this.$Message.success(res.msg);
              this.getRecommend();
            });
        })
        .catch(() => {});
    },
    // 设置当前页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.adminLikes = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      this.adminLikes = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 改变每页条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.adminLikes = this.allTableData.filter((item, index) => {
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
      this.adminLikes = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.adminlikes {
  width: 100%;
  height: 100%;
  padding: 20px 60px;
}
</style>
<template>
  <div class="managemusic">
    <Row style="padding:20px 60px 20px 40px;">
      <Col :span="12" offset="12" style="text-align:right;">
        <Button type="primary" @click="showAddStyleBtn()">添加</Button>
      </Col>
    </Row>
    <!-- 风格列表 -->
    <div style="width:100%;background-color:#f40;">
      <el-table :data="allStyle" class="song-table" style="width: 100%" border>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="_id" label="风格 ID" align="center"></el-table-column>
        <el-table-column prop="name" label="歌曲风格" align="center"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              @click="onEditStyle(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="onDeleteStyle(scope.row,scope.$index)"
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
          <el-form-item prop="name" label="歌曲风格名:">
            <el-input type="songName" v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="addDialog.show = false">取 消</el-button>
            <el-button type="primary" @click="addStyle('addForm')">提 交</el-button>
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
          <el-form-item prop="id" label="歌曲风格ID:">
            <el-input type="id" disabled v-model="editForm.id"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="风格名称:">
            <el-input type="name" v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="editDialog.show = false">取 消</el-button>
            <el-button type="primary" @click="okEditBtn('editForm')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import wsmLoading from "@/plugins/wsmLoading";
import $ from "jquery";
export default {
  name: "styleManage",
  data() {
    return {
      SongStyle: [], // 歌曲风格
      allStyle: [],
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
        title: "编辑歌曲风格",
        show: false
      },
      editForm: {
        id: "",
        name
      },
      addDialog: {
        title: "添加歌曲风格",
        show: false
      },
      addForm: {
        name: ""
      },
      addForm_rules: {
        name: [{ required: true, message: "风格名不能为空" }]
      }
    };
  },
  created() {
    this.getSongStyle();
  },
  methods: {
    // 获取歌曲风格
    getSongStyle() {
      this.$axios
        .get("/type/list")
        .then(res => {
          this.SongStyle = res.result;
          this.allStyle = res.result;
          this.allTableData = res.result;
          this.setPaginations();
        })
        .catch(err => console.error(err));
    },
    // 删除歌曲风格
    onDeleteStyle(style) {
      console.log(style);
      this.$confirm(`确定删除 ${style.name}?不可撤销,是否继续? `, "风险提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("/type/delete", { data: { id: style._id } })
            .then(res => {
              this.$Message.success(res.msg);
              this.getSongStyle();
            });
        })
        .catch(() => {});
    },
    // 上传编辑风格
    okEditBtn(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        const { id, name } = this.editForm;
        this.$axios.put("/type/edit", { id, name }).then(res => {
          console.log(res);
          this.$Message.success("修改成功");
          this.getSongStyle();
        });
      });
      this.editDialog.show = false;
    },
    // 编辑歌曲风格
    onEditStyle(style) {
      const { _id, name } = style;
      this.editForm = {
        id: _id,
        name
      };
      this.editDialog.show = true;
    },
    // 上传添加风格
    addStyle(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        const { name } = this.addForm;
        this.$axios.post("/type/new", { name }).then(res => {
          console.log(res);
          this.$Message.success("添加成功");
          this.getSongStyle();
          this.resetForm();
        });
        this.addDialog.show = false;
        // this.flag = 1;
      });
    },
    // 显示添加音乐模态框
    showAddStyleBtn() {
      this.addDialog.show = true;
      this.addForm.title = "";
      this.addForm.url = "";
      this.addForm.singer_name = "";
      this.addForm.singer_pic = "";
      this.addForm.typeId = "";
    },
    resetForm() {
      this.addForm = { name: "" };
    },
    // 设置当前页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.allStyle = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      this.allStyle = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 改变每页条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.allStyle = this.allTableData.filter((item, index) => {
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
      this.allStyle = this.allTableData.filter((item, index) => {
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
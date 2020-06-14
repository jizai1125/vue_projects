<template>
  <div class="managemusic">
    <Row style="padding:20px 60px 20px 40px;">
      <Col :span="12" offset="12" style="text-align:right;">
        <Button type="primary" @click="showAddStyleBtn()">添加</Button>
      </Col>
    </Row>
    <!-- 用户列表 -->
    <div style="width:100%;background-color:#f40;">
      <el-table :data="allUser" class="song-table" style="width: 100%" border>
        <el-table-column type="index" label="序号" align="center" width="120"></el-table-column>
        <el-table-column prop="_id" label="用户 ID" align="center" min-width="120"></el-table-column>
        <el-table-column prop="name" label="用户名" align="center"></el-table-column>
        <el-table-column prop="role" label="用户角色" align="center"></el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <Avatar :src="'http://localhost:3000' + scope.row.avatar" size="large" />
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              @click="onEditUser(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="onDeleteUser(scope.row,scope.$index)"
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

    <!-- 添加用户 -->
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
          <el-form-item label="歌手封面:" prop="singer_pic">
            <Upload
              :show-upload-list="false"
              :format="['jpg','png']"
              :max-size="10000"
              multiple
              type="drag"
              :on-success="handleAddAvatarSuccess"
              action="http://localhost:3000/upload/img"
              style="display:block;width:44px;"
            >
              <span style="float:left;">
                <Avatar :src="'http://localhost:3000' + addForm.avatar" size="large" />
              </span>
            </Upload>
          </el-form-item>
          <el-form-item prop="name" label="用户名:">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码:">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="role" label="角色:">
            <Select v-model="addForm.role" clearable>
              <Option v-for="item in roleArr" :value="item.value" :key="item.value">{{ item.role }}</Option>
            </Select>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="addDialog.show = false">取 消</el-button>
            <el-button type="primary" @click="addUser('addForm')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->
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
          <el-form-item label="歌手封面:" prop="singer_pic">
            <Upload
              :show-upload-list="false"
              :format="['jpg','png']"
              :max-size="10000"
              multiple
              type="drag"
              :on-success="handleEditAvatarSuccess"
              action="http://localhost:3000/upload/img"
              style="display:block;width:44px;"
            >
              <span style="float:left;">
                <Avatar :src="'http://localhost:3000' + editForm.avatar" size="large" />
              </span>
            </Upload>
          </el-form-item>
          <el-form-item prop="name" label="用户名:">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="role" label="角色:">
            <Select v-model="editForm.role" clearable>
              <Option v-for="item in roleArr" :value="item.value" :key="item.value">{{ item.role }}</Option>
            </Select>
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
  name: "userManage",
  data() {
    return {
      roleArr: [
        {
          role: "用户",
          value: "user"
        },
        {
          role: "管理员",
          value: "admin"
        }
      ],
      userList: [], // 用户列表
      allUser: [],
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
        name: "",
        avatar: "",
        role: ""
      },
      addDialog: {
        title: "添加歌曲风格",
        show: false
      },
      addForm: {
        name: "",
        password: "",
        avatar: "/uploads/image/default.jpg",
        role: "user"
      },
      addForm_rules: {
        name: [{ required: true, message: "用户名不能为空" }],
        password: [{ required: true, message: "密码不能为空" }],
        role: [{ required: true, message: "密码不能为空" }]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取所有用户
    getUserList() {
      this.$axios
        .get("/users/list")
        .then(res => {
          this.userList = res.result;
          this.allUser = res.result;
          this.allTableData = res.result;
          this.setPaginations();
        })
        .catch(err => console.error(err));
    },
    // 成功添加用户头像回调
    handleAddAvatarSuccess(res) {
      this.addForm.avatar = res.file.path;
    },
    handleEditAvatarSuccess(res) {
      this.editForm.avatar = res.file.path;
    },
    // 删除用户
    onDeleteUser(user) {
      console.log(user);
      this.$confirm(`确定删除 ${user.name}?不可撤销,是否继续? `, "风险提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("/users/delete", { data: { id: user._id } })
            .then(res => {
              this.$Message.success(res.msg);
              this.getUserList();
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
        this.$axios.put("/users/edit", this.editForm).then(res => {
          console.log(res);
          this.$Message.success("修改成功");
          this.getUserList();
        });
      });
      this.editDialog.show = false;
    },
    // 编辑歌曲风格
    onEditUser(user) {
      const { _id, name, avatar, role } = user;
      this.editForm = {
        id: _id,
        name,
        avatar,
        role
      };
      this.editDialog.show = true;
    },
    // 上传添加风格
    addUser(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        this.$axios.post("/users/register", this.addForm).then(res => {
          console.log(res);
          this.$Message.success("添加成功");
          this.getUserList();
          this.$refs[formName].resetFields();
          this.resetForm();
        });
        this.addDialog.show = false;
        // this.flag = 1;
      });
    },
    // 显示添加音乐模态框
    showAddStyleBtn() {
      this.addDialog.show = true;
      this.resetForm();
    },
    resetForm() {
      this.addForm = {
        name: "",
        password: "",
        avatar: "/uploads/image/default.jpg",
        role: "user"
      };
    },
    // 设置当前页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.allUser = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      this.allUser = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 改变每页条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.allUser = this.allTableData.filter((item, index) => {
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
      this.allUser = this.allTableData.filter((item, index) => {
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
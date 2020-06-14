<template>
  <transition name="slide">
    <div v-if="userInfo" class="setting">
      <van-nav-bar
        title="个人信息"
        left-text="返回"
        left-arrow
        @click-left="back"
      />
      <ul class="content">
        <li class="avatar">
          <van-image
            round
            width="50px"
            height="50px"
            :src="'http://localhost:3000' + userInfo.avatar"
          />
        </li>
        <li class="content-item">{{ userInfo.name }}</li>
        <li class="content-item" @click="showEditForm = true">修改密码</li>
        <li class="content-item">
          <van-button
            type="danger"
            size="small"
            @click="logout"
          >退出</van-button>
        </li>
      </ul>
      <!-- 修改密码表单 -->
      <div v-show="showEditForm" class="editFormWrap">
        <van-nav-bar
          title="密码修改"
          left-text="返回"
          left-arrow
          @click-left="showEditForm = false"
        />
        <van-form @submit="onSubmit">
          <van-field
            v-model.trim="form.oldPwd"
            type="password"
            name="oldPwd"
            label="旧密码"
            placeholder="请输入旧密码"
            :rules="[{ required: true, message: '请填写旧密码' }]"
          />
          <van-field
            v-model.trim="form.newPwd"
            type="password"
            name="newPwd"
            label="新密码"
            placeholder="请输入新密码"
            :rules="[{ required: true, message: '请填写新密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </transition>
</template>

<script>
import { Notify, NavBar, Image, Button, Form } from "vant";
import { mapGetters } from "vuex";
import { editPwd } from "api/user";
export default {
  data() {
    return {
      showEditForm: false,
      form: {
        oldPwd: "",
        newPwd: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      editPwd({ newPwd: values.newPwd, oldPwd: values.oldPwd }).then((res) => {
        if (res && res.code === 200) {
          Notify({ type: "success", message: "修改成功" });
        }
      });
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.replace("/login");
    },
  },
};
</script>
<style>
.van-nav-bar__title {
  color: #fff!important;
}
</style>
<style lang="stylus" scoped>
@import "~common/stylus/variable"

.van-nav-bar
  background $color-background
.setting
  position: fixed
  top: 0
  bottom: 0
  z-index: 100
  width: 100%
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .back
    position absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .content
    position: absolute;
    top: 10%;
    width: 100%;
    text-align: center;
    .avatar
    .content-item
      font-size: 16px;
      height: 50px;
      line-height: 50px;
  .editFormWrap
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background
    .van-form
      margin: 40px 40px 10px;
</style>

<template>
  <!-- <fox-group class="base_wrapper"> -->
    <div>
      <div class="base_wrapper">
        <fox-item class="base_left">
          <img src="../../../../../static/img/idPic.jpg" class="item_img">
          <div class="info_empty_img">
            <img src>
            <span>采集照片</span>
          </div>
        </fox-item>
        <fox-item class="base_right">
          <div class="user_name">
            <span class="name" @click="customInfo" >{{userInfo.name}}（{{userInfo.sex}}士）</span>
            <span class="vip">VIP</span>
            <span class="iconfont edit">&#xe634;</span>
            <!--<button icon="el-icon-edit" class="edit"></button>-->
          </div>
          <div class="user_en_name">{{userInfo.enName}}</div>
          <div class="user_btn">
            <button>切换为代理人</button>
          </div>
          <div class="user_id">
            客户编号：
            <span>{{userInfo.userId}}</span>
          </div>
          <div class="user_tel">
            手机号码：
            <span>{{userInfo.userTel}}</span>
          </div>
        </fox-item>
      </div>
      <fox-item class="desc_wrapper">
        <div class="item">
            <span class="check_title">证件类型</span>
            <div class="check_right">
                <span class="check_status">未核查</span>
                <span class="check_type">身份证</span>
            </div>
        </div>
        <div class="item">
            <span class="check_title">证件号码</span>
            <div class="check_right">
                <span class="check_type">{{userInfo.idNum}}</span>
            </div>
        </div>
        <div class="item">
            <span class="check_title">有效期</span>
            <fox-button>该身份证将要过期</fox-button>
            <div class="check_right">
                <span class="check_type">{{userInfo.deadline}}</span>
            </div>
        </div>
        <div class="item">
            <span class="check_title">核查结果</span>
            <fox-button>未核查</fox-button>
            <div class="check_right">
                        <span class="check_button" @click="onlineCheck">
                            <span class="iconfont">&#xe64f;</span>
                            联网检查
                        </span>
            </div>
        </div>
        <div class="item">
            <span class="check_title long">当前操作凭证</span>
            <div class="check_right">
                        <span class="check_button">
                            <span class="iconfont">&#xe645;</span>
                            切换凭证
                        </span>
            </div>
        </div>
    </fox-item>
    </div>
  <!-- </fox-group> -->
</template>

<script>
export default {
    name: 'UserBase',
    data() {
        return {
            userInfo: {
                name: '沈清其',
                sex: '女',
                isvip: true,
                enName: 'ShenQingQi',
                userId: '25465348',
                userTel: '13654655348',
                checkStatus: '未核查',
                checkType: '身份证',
                idNum: '220210198604046167',
                deadline: '2019-10-10',
            },
        }
    },
    methods: {
        customInfo() {
            fox.custom.openPage(this, '/common/customerinfo', {}, this.userInfo)
        },
        onlineCheck() {
            fox.custom.openPage(this, '/verify/verifyidcard', {}, this.userInfo)
        },
    },
}
</script>

<style scoped>
/*图片和基本信息框*/
.base_wrapper {
  display: flex;
  width: 95%;
  height: 125px;
  margin-bottom: 5px;
  overflow: hidden;
}

.base_left {
  width: 48% !important;
  height: 80%;
  /*background-color: red;*/
  position: relative;
  margin-left: 5px;
}

.base_left .item_img {
  width: 50%;
  position: absolute;
  float: left;
  height: 157px;
  /*height: 100%;*/
}

.base_left .info_empty_img {
  /*background-color: blue;*/
  width: 48%;
  float: right;
  /*height: 141px;*/
  height: 122px;
  border: solid 2px #ccc;
  margin-left: 5px;
}

.base_right {
  width: 50% !important;
  height: 100%;
  /*background-color: purple;*/
}

.base_right .user_name {
  position: relative;
  margin-left: 8px;
  margin-top: -12px;
}

.base_right .user_name .vip {
  background-color: #f0a117;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 3px;
}

.base_right .user_name .edit {
  margin-left: 7px;
  cursor: pointer;
}

.base_right .user_en_name {
  margin-top: -20px;
  margin-left: 8px;
  color: #ccc;
}

.base_right .user_btn {
  margin-left: 8px;
  color: #a7a7a7;
  margin-top: -5px;
}

.base_right .user_btn button {
  padding: 2px 3px;
}

.base_right .user_id {
  margin-left: 8px;
}

.base_right .user_tel {
  margin-top: -12px;
  margin-left: 8px;
}

  /*个人详细信息部分*/
    .desc_wrapper {
        width: 95%;
        margin: 0 5px 5px 5px;
    }

    .desc_wrapper .item {
        display: block;
        border-bottom: #ccc solid 1px;
        line-height: 30px!important;
    }

    .desc_wrapper .check_title {
        margin-left: 10px;
        color: #a7a7a7;
        width: 60px;
        display: inline-block;
    }
    .desc_wrapper .long{
        width: 90px;
    }

    .desc_wrapper .check_right {
        float: right;
        margin-right: 15px;
    }

    .desc_wrapper .check_status {
        padding: 3px 10px;
        color: #fff;
        background-color: #c69651;
        border-radius: 15px;
    }

    .desc_wrapper .check_type {
        margin-left: 5px;
        font-weight: bold;
    }

    .desc_wrapper .check_right .check_button {
        background-color: #f3f3f3;
        padding: 3px 5px;
        color: #898989;
        border: 1px solid #ccc;
        border-radius: 2px;
        cursor: pointer;
    }

</style>

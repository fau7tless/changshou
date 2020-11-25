<template>
  <div class="my-memorial-list">
    <template v-for="(item,index) in mList">
      <div :key="`mem-${index}`" class="my-memorial-item" @click="showDialog(item)">
        <div class="my-memorial-item-left">
          <div class="list-point"></div>
          <span :title="item.text">{{item.text}}</span>
        </div>
        <div class="my-memorial-item-right">
          <span>{{item.date}}</span>
        </div>
      </div>
    </template>
    <fox-dialog title="消息公告" :visible.sync="dialogVisible" width="50%" top="25vh" center>
      <fox-form ref="form" :model="form" label-width="80px">
        <fox-text-item v-model="form.text" label="公告标题"></fox-text-item>
        <fox-text-item v-model="form.date" label="公告日期"></fox-text-item>
        <fox-text-item v-model="form.content" label="公告详情" type="textarea"></fox-text-item>
      </fox-form>
      <span slot="footer" class="dialog-footer">
        <fox-button @click="dialogVisible = false">取 消</fox-button>
        <fox-button type="primary" @click="dialogVisible = false">确 定</fox-button>
      </span>
    </fox-dialog>
  </div>
</template>
<script>
import { foxUI } from "@/assets/libs/fox-libs";

export default {
  name: "my-memorial-list",
  //属性
  props: {
    //items
    items: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {}
    };
  },
  //计算属性
  computed: {
    //list
    mList() {
      //克隆数组
      let cloneList = [...this.items];
      //排序数组
      cloneList.sort((a, b) => {
        return b.date.localeCompare(a.date);
      });

      return cloneList;
    }
  },
  //方法
  methods: {
    showDialog(item) {
      this.form = item;
      this.dialogVisible = true;
    },
    //格式化item text
    formatItemText(text) {
      return foxUI.renderText(text);
    }
  }
};
</script>
<style scoped>
.my-memorial-list {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.my-memorial-item {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.my-memorial-item-left {
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: flex-start;
  justify-content: flex-start;
  /* 避免横向滚动条 */
  max-width: calc(100% - 110px);
}

.my-memorial-item-right {
  flex: 0 0 auto;
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100px;
  margin-left: auto;
}

.my-list-line {
  line-height: 24px;
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
}

@media screen {
  .my-list-line + .my-list-line {
    margin-top: 8px;
  }

  .my-memorial-item + .my-memorial-item {
    margin-top: 14px;
  }

  .list-point {
    margin: 2px 6px;
  }
}

@media screen and (max-height: 800px) {
  .my-list-line + .my-list-line {
    margin-top: 1px;
  }

  .my-memorial-item + .my-memorial-item {
    margin-top: 10px;
  }

  .list-point {
    margin: 2 6px;
  }
}

.my-list-line span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-point {
  display: inline-block;
  width: 6px;
  height: 6px;
  min-width: 6px;
  min-height: 6px;
  border-radius: 6px;
  background-color: #f9d7af;
}
</style>
<style>
/*滚动条宽高*/
::-webkit-scrollbar {
  /*竖向滚动条宽度*/
  width: 6px;
  /*横向滚动条高度*/
  height: 6px;
}

/*滚动条轨道样式*/
::-webkit-scrollbar-track {
  /*去除轨道内阴影*/
  -webkit-box-shadow: none;
  /*设置背景颜色*/
  background: rgba(255, 255, 255, 0);
}

/*滚动条滑块*/
::-webkit-scrollbar-thumb {
  /*设置圆角*/
  border-radius: 5px;
  /*去除阴影*/
  -webkit-box-shadow: none;
  /*背景色*/
  background: rgba(92, 105, 128, 0.25);
  /*过渡时间*/
  transition: all 0.2s;
}

/*鼠标悬浮时的滚动滑块样式*/
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(92, 105, 128, 0.45);
}

.my-sidebar.my-left ::-webkit-scrollbar-thumb {
  /*设置圆角*/
  border-radius: 5px;
  /*去除阴影*/
  -webkit-box-shadow: none;
  /*背景色*/
  background: rgba(255, 255, 255, 0.5);
  /*过渡时间*/
  transition: all 0.2s;
}
</style>
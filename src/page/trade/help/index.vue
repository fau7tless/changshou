<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <div class="helpItem">
        <div class="title">交易码【026183】</div>
        <div class="content">
          <div>■功能描述：</div>
          <div class="subContent">查询账/卡号下具体绑定的手机信息；</div>
          <div>■操作权限：</div>
          <div class="subContent">所有柜员；</div>
          <div>■操作步骤：</div>
          <div class="subContent">进入操作界面后，在带有“*”的输入域正确输入信息，灰色的输入域系统自动回显。点击“取消“关闭本交易；</div>
        </div>
      </div>
      <div class="helpItem">
        <div class="title">交易码【020715】</div>
        <div class="content">
          <div>■功能描述：</div>
          <div class="subContent">本交易用于维护我行借记卡（包括借记IC卡）的银联ATM转账功能；</div>
          <div>■权限：</div>
          <div class="subContent">操作权限：现金柜员岗、结算柜员岗、综合柜员岗、主办柜员岗；</div>
          <div class="subContent">授权权限：2级及以上柜员；</div>
          <div>■输入重点要素说明：</div>
          <div class="subContent">卡号： “卡号”栏只能刷卡输入，不支持手工输入卡号；</div>
          <div class="subContent">操作类型：下拉选项 1-新增：用于办理开通银联ATM转账功能的卡号；</div>
          <div class="subContent">2-修改：用于办理已开通的卡号修改转账额度；</div>
          <div class="subContent">3-删除：用于办理已开通的卡号取消转账功能；</div>
          <div>■操作步骤：</div>
          <div class="subContent">进入操作界面后，在带有“*”的输入域输入信息，灰色的输入域系统自动回显；</div>
          <div class="subContent">必须对存款人本人进行身份联网核查，点击“公民身份核查图像”进入手工联网核查界面。信息审核无误后即可提交；</div>
          <div>■输出打印：</div>
          <div class="subContent">一式两联业务凭证/回单；</div>
          <div>■注意事项：</div>
          <div class="subContent">1 . 支持对部冻、全冻、止付、限额的卡号办理开通银联ATM转账功能。不支持未激活、挂失、封锁、锁定、不动户的卡号办理开通银联ATM转账功能；</div>
        </div>
      </div>
      <div class="helpItem">
        <div class="title">交易码【026181】</div>
        <div class="content">
          <div>■功能描述：</div>
          <div class="subContent">本交易只支持人民币活期账户的手机短信签约。整合了老VT系统【6181手机短信签约】和【6182手机短信维护】两个交易；</div>
          <div>■权限：</div>
          <div class="subContent">操作权限：现金柜员岗、结算柜员岗、综合柜员岗、主办柜员岗；</div>
          <div>■输入重点要素说明：</div>
          <div class="subContent">操作类型：0-签约、1-维护、2-解约（系统默认为签约）。此输入域选择“签约或维护”时，
             “手机号码”列表显示为白色，可进行新增、删除手机号码。此输入域选择“解约”时， 
             “手机号码”列表显示为灰色，对该账户已绑定签约的全部手机号码解除签约关系。
             金额变动下限提醒：短信提醒交易起点金额系统默认为100元，经办柜员需根据客户申请的提醒额度正确输入；
          </div>
          <div> ■操作步骤：</div>
          <div class="subContent">进入操作界面后，柜员输入“账/卡号”、“证件类型”等必输项，然后点击“公民身份核查图像”进行联网核查，信息审核无误即可提交；</div>
          <div>■输出打印：</div>
          <div class="subContent">一式两联业务凭证/回单；</div>
          <div>■注意事项：</div>
          <div class="subContent">1 ．本交易不支持本行信用卡的手机短信签约；</div>
          <div class="subContent">2 ．支持对部冻、全冻、止付、限额的账/卡号进行手机短信签约。
            不支持账/卡号为未激活、密挂、口挂、书挂、锁定、不动户状态下进行手机短信签约；
          </div>
         </div>
      </div>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "easypage",
  // 数据
  data: function() {
    var id = "";
    return {
    
    };
  },
  // 方法
  methods: {},
  // 加载后处理
  mounted() {
    
  },
};
</script>

<style scoped>
.helpItem{
  margin: 0 0 3rem 1rem;
}
.helpItem .title{
  font-size: 1.5rem;
}
.helpItem .content{
  margin-left: 1rem;
  line-height:2rem;
}
.helpItem .content .subContent{
  margin-left: 2.5rem;
  line-height: 1.5rem;
}
</style>
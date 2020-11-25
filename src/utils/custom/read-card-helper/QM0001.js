/**
 * Created by xhx263 on 2017/8/8.
 */
import Qmcdh from './qmcdh'

export default {
    define: function(data) {
        Qmcdh.qmcdh_sound(data)
    },
}
// define:function((require, exports) => {
//     alert(1)
//     // page加载完成后调用ready方法
//     exports.ready = function(hashCode, data, cite) {
//         let vm = new Vue({
//             el: '#pages_queue_QM0001',
//             data: {
//                 queueData: [
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                     { winType: '', winNum: '', queNum: '' },
//                 ],
//                 color: [
//                     // 'rgb(166, 166,50)',
//                     // 'rgb(146, 146, 50)',
//                     // 'rgb(126, 126, 50)',
//                     // 'rgb(106,106,50)',
//                     // 'rgb(86,86, 50)',
//                     // 'rgb(66, 66, 50)',
//                     // 'rgb(50, 50, 50)',
//                     // 'rgb(40, 40, 50)',
//                     // 'rgb(30,30, 50)',
//                 ],
//             },
//         })

//         callScreen()
//         function callScreen() {
//             let body = {
//                 ORG_ID: '1',
//             }
//             fox.service.request({
//                 id: 'login',
//                 name: 'qm/callscreen/call',
//                 data: body,
//                 callback: function(code, message, data) {
//                     if (code == '0000') {
//                         let tableLen = 0 // 实际表的长度
//                         if (data.table.length == 0) {
//                             vm.queueData[0].winType = '无数据';
//                             vm.queueData[0].winNum = '无数据';
//                             vm.queueData[0].queNum = '无数据';
//                             return
//                         }
//                         // 判断表长度，获取tableLen值
//                         if (data.table.length < vm.queueData.length) {
//                             tableLen = data.table.length
//                         } else tableLen = vm.queueData.length

//                         for (i = 0; i < tableLen; i++) {
//                             vm.queueData[i].winType = data.table[i].WINTYPE
//                             vm.queueData[i].winNum = data.table[i].WINID
//                             vm.queueData[i].queNum = data.table[i].QUEUENUM
//                         }
//                         setTimeout(() => {
//                             // callScreen();
//                         }, 1000)
//                     } else {
//                         fox.layer1.alert(
//                             message,
//                             '提示',
//                             '4',
//                             true,
//                             () => {},
//                         )
//                     }
//                 },
//             })
//         }

//         function Init() {
//             fox.service.registerMessageService('fox', (name, data) => {
//                 // 处理信息
//                 if (data.msgType == '#Info') {
//                     let mac = '<%=session.getAttribute("MAC")%>'
//                     $.ajax({
//                         type: 'GET',
//                         url: 'C0001.action',
//                         data: { MAC: mac, Addr: data.content },
//                         dataType: 'json',
//                         success: function(data) {
//                             if (data.ERRORCODE == '0') {
//                                 if (data.ISREGISTER == '1') {
//                                     // var ret = qmcdh_init();
//                                     // location.href = "Redirect.action?type=2";
//                                     qmcdh_shutdown(data.TIMEDSHUTDOWN)
//                                 } else {
//                                     // $.mobile.changePage("#pagereg","pop",true, true);
//                                 }
//                             } else {
//                                 alert(data.ERRORMESSAGE)
//                             }
//                         },
//                     })
//                     // alert("web socket信息:"+data.content);
//                 }
//                 // 处理消息
//                 else {
//                     console.log(data)
//                     let ress = data
//                     let result = eval('(' + ress.content + ')')
//                     let messType = result.MESSTYPE
//                     switch (messType) {
//                     case '0':
//                         // 0-叫号
//                         // 语音呼叫
//                         message4(result)
//                             // 调用条屏
//                             message5(result)
//                             // 刷新一级界面
//                             message2(result)
//                             break;
//                     case '1':
//                         // 1-刷新一级界面
//                         message1(result)
//                             break;
//                     case '2':
//                         // 2-刷新一级界面等待人数
//                         message2(result)
//                             break;
//                     case '3':
//                         // 3-硬件评价器
//                         message3(result)
//                             break;
//                     case '4':
//                         // 4-语音呼叫
//                         message4(result)
//                             break;
//                     case '5':
//                         // 5-调用条屏显示信息
//                         message5(result)
//                             break;
//                     case '6':
//                         // 5-调用条屏显示信息
//                         message6(result)
//                             break;
//                     default:
//                         showMessage('未定义的消息')
//                     }
//                     // alert("web socket通知:"+data.content);
//                 }
//             })
//         }
//         // 语音呼叫
//         function message4(result) {
//             let voic = result.VOIC
//             let winID = result.WINID
//             let voicNUM = result.VOICNUM
//             // var data = "0,1<SEPERATOR>0,1<SEPERATOR>0,1<DATA>" + voic + "," + winID;
//             let data = voic
//             qmcdh_sound(data)
//         }
//         // 条屏
//         function message5(result) {
//             // 条屏
//             let winScreen = '  ' + result.WINSCREEN
//             let winID = result.WINID
//             // var berrdata = winID + "<SEPERATOR>TEXT<SEPERATOR>" + winScreen + "<SEPERATOR>0<SEPERATOR>0";
//             let berrdata = winID + '<SEPERATOR>' + winScreen
//             qmcdh_berr(berrdata)
//             // 综合屏
//             // var comScreen = result.COMSCREEN;
//             // var compID = result.COMPID;
//             // compdata = winID + "<SEPERATOR>TEXT<SEPERATOR>" + comScreen + "<SEPERATOR>0<SEPERATOR>0";
//             // var compdata = winID + "<SEPERATOR>" + comScreen;
//             // qmcdh_comp(compdata);
//         }
//         function message2(result) {
//             let len = result.FIRSTWIN.length
//             for (let i = 0; i < len; i++) {
//                 let firstWinId = result.FIRSTWIN[i].FIRSTWINID
//                 let queueSize = result.FIRSTWIN[i].QUEUESIZE
//                 $('#PAGEONE_' + firstWinId).text(queueSize)
//             }
//         }

//         // 5-调用条屏显示信息
//         function C0006() {
//             $.ajax({
//                 type: 'GET',
//                 url: 'C0006.action',
//                 data: {},
//                 async: false,
//                 dataType: 'json',
//                 success: function(data) {
//                     let { serverIP } = data
//                     Init()
//                     if (data.ERRORCODE == '0') {
//                         refreshPageone(data)
//                     } else {
//                         $('#pageone_ui').html(
//                             '<h1>' + data.ERRORMESSAGE + '</h1>',
//                         )
//                     }
//                 },
//             })
//         }
//     }

//     /**
//      * 消息处理
//      * @param type
//      * @param message
//      */
//     exports.onmessage = function(type, message) {}

//     // page销毁时触发destroy方法
//     exports.destroy = function(id, cite) {}
// })

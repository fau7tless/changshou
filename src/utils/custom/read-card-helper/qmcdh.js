import XMLRPC from './xmlrpc'

export default{
    qmcdh_sound: function (soundData) {
        XMLRPC.XMLRPCMessage(soundData)
        // try {
        //     return sendxmlrpc(
        //         Array('voice', 'PlaySound', getBase64(soundData)),
        //     )
        // } catch (x) {
        //     // alert(x);
        // }
    },
    // let oldtime

    // function sendxmlrpc(params) {
    //     let uri = 'http://127.0.0.1:8010';
    //     let client = new XMLRPCClient(uri)
    //     return client.call('execute.CallDevice', params).toString()
    // }

    // function getBase64(str) {
    //     str = strUnicode2Ansi(str)
    //     return new Base64(str).encode()
    // }

    // function qmcdh_init() {
    //     try {
    //         return sendxmlrpc(Array('queue', 'InitQueueDevice', ''))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }

    // function qmcdh_readinfo() {
    //     try {
    //         return sendxmlrpc(Array('queue', 'ReadInfo', ''))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }

    // function qmcdh_continueRead() {
    //     try {
    //         return sendxmlrpc(Array('queue', 'ContinueRead', ''))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }

    // function qmcdh_getPrtStatus() {
    //     try {
    //         return sendxmlrpc(Array('queue', 'GetStatus', 'prt'))
    //     } catch (x) {
    //         // alert(x);
    //         showPagepause('打印机连接异常，请检查外设服务是否成功启动……')
    //     }
    // }

    // function qmcdh_print(printData, queuenum) {
    //     try {
    //         oldtime = new Date().getTime()
    //         let status = sendxmlrpc(
    //             Array('prt', 'Print', getBase64(printData)),
    //         )
    //         if (status.charAt(status.length - 1) == '0') {
    //         } else if (status.charAt(status.length - 1) == '3') {
    //             var error =                    "打印机异常或缺纸,请大堂经理检查<br />号单打印机异常,无法打印小票!您的排队号码为<span style='color:red;font-size:100px'>"
    //                 + queuenum
    //                 + '</span>,请记住排队号码，等待窗口叫号服务';
    //             showPagepause(error)
    //             $.ajax({
    //                 type: 'GET',
    //                 url: 'C0013.action',
    //                 data: {},
    //                 async: false,
    //                 dataType: 'json',
    //                 success: function(data) {},
    //             })
    //         } else {
    //             var error =                    "打印机调用异常,请大堂经理检查外设服务<br />号单打印机异常,无法打印小票!您的排队号码为<span style='color:red;font-size:100px'>"
    //                 + queuenum
    //                 + '</span>,请记住排队号码,等待窗口叫号服务';
    //             showPagepause(error)
    //             $.ajax({
    //                 type: 'GET',
    //                 url: 'C0013.action',
    //                 data: {},
    //                 async: false,
    //                 dataType: 'json',
    //                 success: function(data) {},
    //             })
    //         }
    //     } catch (x) {
    //         // alert(x);
    //         var error =                "打印机连接异常，请大堂经理检查外设服务是否成功启动……<br />号单打印机异常,无法打印小票!您的排队号码为<span style='color:red;font-size:100px'>"
    //             + queuenum
    //             + '</span>,请记住排队号码,等待窗口叫号服务';
    //         showPagepause(error)
    //         $.ajax({
    //             type: 'GET',
    //             url: 'C0013.action',
    //             data: {},
    //             async: false,
    //             dataType: 'json',
    //             success: function(data) {},
    //         })
    //     }
    // }

    // function qmcdh_berr(berrdata) {
    //     try {
    //         return sendxmlrpc(Array('berr', 'Show', getBase64(berrdata)))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }

    // function qmcdh_comp(compdata) {
    //     try {
    //         return sendxmlrpc(Array('comp', 'Show', getBase64(compdata)))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }

    // function qmcdh_comp1(compdata) {
    //     try {
    //         return sendxmlrpc(Array('device', 'GetMac', compdata))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }

    // function qmcdh_appr(apprdata) {
    //     try {
    //         return sendxmlrpc(Array('wl', 'GetAppr', apprdata))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }

    // function qmcdh_shutdown(shutdowntime) {
    //     try {
    //         return sendxmlrpc(Array('device', 'SetPowerOffTime', shutdowntime))
    //     } catch (x) {
    //         // alert(x);
    //     }
    // }
}

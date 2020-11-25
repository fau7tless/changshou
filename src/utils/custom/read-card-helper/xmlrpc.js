/*
 * xmlrpc.js
 */

/** ***********************************
 * XMLRPCMessage implementation      *
 ************************************ */
export default {
    XMLRPCMessage: function(data) {
        data.$alert('Hello world', '提示', {
            confirmButtonText: '确定',
            type: 'info',
        }).then(() => {})
        // this.params = params || []
        // this.method = methodname || 'system.listMethods'
        // return this
    },
    // XMLRPCMessage: function (methodname, params) {
    //     // this.params = params || []
    //     // this.method = methodname || 'system.listMethods'

    //     // return this
    // }

    // XMLRPCMessage.prototype.setMethod = function(methodName) {
    //     this.method = methodName
    // }

    // XMLRPCMessage.prototype.addParameter = function(data) {
    //     this.params[this.params.length] = data
    // }

    // XMLRPCMessage.prototype.xml = function() {
    //     let { method } = this
    //     let xml = ''

    //     xml += '<?xml version="1.0"?>\n'
    //     xml += '<methodCall>\n'
    //     xml += '<methodName>' + method + '</methodName>\n'
    //     xml += '<params>\n'

    //     // do individual parameters
    //     for (let i = 0; i < this.params.length; i++) {
    //         let data = this.params[i]
    //         xml += '<param>\n'
    //         xml
    //             += '<value>'
    //             + XMLRPCMessage.getParamXML(
    //                 XMLRPCMessage.dataTypeOf(data),
    //                 data,
    //             )
    //             + '</value>\n'
    //         xml += '</param>\n'
    //     }

    //     xml += '</params>\n'
    //     xml += '</methodCall>'

    //     return xml // for now
    // }

    // XMLRPCMessage.dataTypeOf = function(o) {
    //     let type = typeof o

    //     type = type.toLowerCase()
    //     switch (type) {
    //     case 'number':
    //         if (Math.round(o) == o) type = 'i4'
    //         else type = 'double'
    //         break
    //     case 'object':
    //         var con = o.constructor
    //         if (con == Date) type = 'date'
    //         else if (con == Array) type = 'array'
    //         else type = 'struct'
    //         break
    //     default:
    //         break
    //     }

    //     return type
    // }

    // XMLRPCMessage.doValueXML = function(type, data) {
    //     let xml = '<' + type + '>' + data + '</' + type + '>'

    //     return xml
    // }

    // XMLRPCMessage.doBooleanXML = function(data) {
    //     let value = data == true ? 1 : 0
    //     let xml = '<boolean>' + value + '</boolean>'

    //     return xml
    // }

    // XMLRPCMessage.doDateXML = function(data) {
    //     let xml = '<dateTime.iso8601>'

    //     xml += dateToISO8601(data)
    //     xml += '</dateTime.iso8601>'

    //     return xml
    // }

    // XMLRPCMessage.doArrayXML = function(data) {
    //     let xml = '<array><data>\n'

    //     for (let i = 0; i < data.length; i++) {
    //         xml
    //             += '<value>'
    //             + XMLRPCMessage.getParamXML(
    //                 XMLRPCMessage.dataTypeOf(data[i]),
    //                 data[i],
    //             )
    //             + '</value>\n'
    //     }
    //     xml += '</data></array>\n'

    //     return xml
    // }

    // XMLRPCMessage.doStructXML = function(data) {
    //     let xml = '<struct>\n'

    //     for (let i in data) {
    //         xml += '<member>\n'
    //         xml += '<name>' + i + '</name>\n'
    //         xml
    //             += '<value>'
    //             + XMLRPCMessage.getParamXML(
    //                 XMLRPCMessage.dataTypeOf(data[i]),
    //                 data[i],
    //             )
    //             + '</value>\n'
    //         xml += '</member>\n'
    //     }
    //     xml += '</struct>\n'

    //     return xml
    // }

    // XMLRPCMessage.getParamXML = function(type, data) {
    //     let xml

    //     switch (type) {
    //     case 'date':
    //         xml = XMLRPCMessage.doDateXML(data)
    //         break
    //     case 'array':
    //         xml = XMLRPCMessage.doArrayXML(data)
    //         break
    //     case 'struct':
    //         xml = XMLRPCMessage.doStructXML(data)
    //         break
    //     case 'boolean':
    //         xml = XMLRPCMessage.doBooleanXML(data)
    //         break
    //     default:
    //         xml = XMLRPCMessage.doValueXML(type, data)
    //         break
    //     }

    //     return xml
    // }

    // // pads a single number with a leading zero. Heh.
    // function leadingZero(n) {
    //     if (n.length == 1) n = '0' + n

    //     return n
    // }

    // // wow I hate working with the Date object
    // function dateToISO8601(date) {
    //     let year = new String(date.getYear())
    //     let month = leadingZero(new String(date.getMonth() + 1))
    //     let day = leadingZero(new String(date.getDate()))
    //     let time = leadingZero(new String(date.getHours()))
    //         + ':'
    //         + leadingZero(new String(date.getMinutes()))
    //         + ':'
    //         + leadingZero(new String(date.getSeconds()))
    //     let converted = year + month + day + 'T' + time

    //     return converted
    // }

    // /** *******************************
    //  * XMLRPCResponse implementation *
    //  ******************************** */
    // function xgetChildElement(doc) {
    //     for (let i = 0; i < doc.childNodes.length; i++) {
    //         if (doc.childNodes[i].nodeName != '#text') return doc.childNodes[i]
    //     }

    //     throw 'No child exists'
    //     return null
    // }

    // function rpcparam2hash(doc) {
    //     let rpc

    //     if (doc.tagName == 'methodResponse') {
    //         rpc = rpcparam2hash(xgetChildElement(doc))
    //     } else if (doc.tagName == 'params' || doc.tagName == 'fault') {
    //         rpc = Array()
    //         rpc[doc.tagName] = rpcparam2hash(xgetChildElement(doc))
    //     } else if (
    //         doc.tagName == 'value'
    //         || doc.tagName == 'array'
    //         || doc.tagName == 'param'
    //     ) {
    //         rpc = rpcparam2hash(xgetChildElement(doc))
    //     } else if (doc.tagName == 'data') {
    //         rpc = Array()
    //         for (let i = 0; i < doc.childNodes.length; i++) {
    //             if (doc.childNodes[i].nodeName != '#text') {
    //                 var myparam
    //                 myparam = rpcparam2hash(doc.childNodes[i])
    //                 rpc.push(myparam)
    //             }
    //         }
    //     } else if (doc.tagName == 'i4' || doc.tagName == 'int') {
    //         rpc = parseInt(doc.childNodes[0].nodeValue)
    //     } else if (doc.tagName == 'string') {
    //         rpc = doc.childNodes[0].nodeValue
    //     } else if (doc.tagName == 'boolean') {
    //         rpc = new Boolean(parseInt(doc.childNodes[0].nodeValue))
    //     } else if (doc.tagName == 'double') {
    //         rpc = parseFloat(doc.childNodes[0].nodeValue)
    //     } else if (doc.tagName == 'dateTime.iso8601') {
    //         datestr = doc.childNodes[0].nodeValue
    //         rpc = new Date(
    //             parseInt(datestr.substr(0, 4), 10),
    //             parseInt(datestr.substr(4, 2), 10),
    //             parseInt(datestr.substr(6, 2), 10),
    //             parseInt(datestr.substr(9, 2), 10),
    //             parseInt(datestr.substr(12, 2), 10),
    //             parseInt(datestr.substr(15, 2), 10),
    //         )
    //     } else if (doc.tagName == 'struct') {
    //         rpc = Array()
    //         for (let x = 0; x < doc.childNodes.length; x++) {
    //             var name
    //             var value
    //             let node = doc.childNodes[x]
    //             if (node.nodeName == 'member') {
    //                 for (let y = 0; y < node.childNodes.length; y++) {
    //                     let mynode = node.childNodes[y]
    //                     if (mynode.nodeName == '#text') continue
    //                     if (mynode.tagName == 'name') {
    //                         name = mynode.childNodes[0].nodeValue
    //                     } else if (mynode.tagName == 'value') {
    //                         value = rpcparam2hash(mynode)
    //                     }
    //                 }
    //                 rpc[name] = value
    //             }
    //         }
    //     } else {
    //         throw 'Unknown/Unsupported tagname:' + doc.tagName
    //     }

    //     return rpc
    // }

    // function XMLRPCResponse(req) {
    //     // XMLHTTPRequest object
    //     if (req.readyState != 4 && req.status != 200) throw 'Request error'
    //     this.m_xml = req.responseXML
    //     this.m_serialize = req.responseText

    //     // parse the XML result
    //     let rootNode = this.m_xml
    //         .getElementsByTagName('methodResponse')
    //         .item(0)
    //     if (!rootNode) throw 'No root node'
    //     this.m_value = rpcparam2hash(rootNode)

    //     return this
    // }

    // XMLRPCResponse.prototype.faultCode = function() {
    //     if (this.m_value.fault) {
    //         return parseInt(this.m_value.fault.faultCode)
    //     } else return 0
    // }

    // XMLRPCResponse.prototype.faultString = function() {
    //     if (this.m_value.fault) return this.m_value.fault.faultString
    //     else return null
    // }

    // XMLRPCResponse.prototype.value = function() {
    //     return this.m_value.params
    // }

    // XMLRPCResponse.prototype.serialize = function() {
    //     return this.m_serialize
    // }

    // /** *****************************
    //  * XMLRPCClient implementation *
    //  ****************************** */
    // /* Some helper functions for xmlrpc */
    // function XMLHTTPRequestCompact() {
    //     let req = null

    //     let msxmlhttp = new Array(
    //         'Msxml2.XMLHTTP.5.0',
    //         'Msxml2.XMLHTTP.4.0',
    //         'Msxml2.XMLHTTP.3.0',
    //         'Msxml2.XMLHTTP',
    //         'Microsoft.XMLHTTP',
    //     )
    //     for (let i = 0; i < msxmlhttp.length; i++) {
    //         try {
    //             req = new ActiveXObject(msxmlhttp[i])
    //         } catch (e) {
    //             req = null
    //         }
    //     }

    //     if (!req && typeof XMLHttpRequest != 'undefined') {
    //         req = new XMLHttpRequest()
    //         if (req && req.overrideMimeType) req.overrideMimeType('text/xml')
    //     }

    //     if (!req) throw "Can't create XMLHttpRequest object"

    //     return req
    // }

    // function XMLRPCClient(url, callback) {
    //     if (url) this.m_url = url
    //     if (callback) this.readystatechange = callback

    //     return this
    // }

    // XMLRPCClient.prototype.setURL = function(url) {
    //     this.m_url = url
    // }

    // XMLRPCClient.prototype.setCallback = function(callback) {
    //     this.readystatechange = callback
    // }

    // XMLRPCClient.prototype.readystatechange = function(req) {
    //     // dummy function now
    // }

    // XMLRPCClient.prototype.send = function(msg, async, callback) {
    //     let req
    //     let is_async = async || false

    //     req = XMLHTTPRequestCompact()

    //     if (is_async) {
    //         req.onreadystatechange = function() {
    //             if (callback) callback(req)
    //             else this.readystatechange(req)
    //         }
    //     }
    //     req.open('POST', this.m_url, is_async)
    //     req.send(msg)

    //     return req
    // }

    // XMLRPCClient.prototype.call = function(method, params) {
    //     let req
    //     let resp
    //     let msg

    //     msg = new XMLRPCMessage(method, params)
    //     // alert(msg.xml());
    //     req = this.send(msg.xml())
    //     resp = new XMLRPCResponse(req)
    //     if (resp.faultCode()) {
    //         throw 'XMLRPC call error:\nerrorCode = '
    //             + resp.faultCode()
    //             + '\nerrorString = '
    //             + resp.faultString()
    //     }

    //     return resp.value()
    // }
}

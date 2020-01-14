//var _ = require('lodash');
let ResponseData = [{"DATE": "14/01/2020", "_id": {"$oid": "5e1d58aacf8437d315dd2a40"}, "TIME": "11:28:17", "ERROR CODE": "TEMP ERROR"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d53697e4a0630635dcdb3"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:05:56"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d52eab45adbc37abd2195"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:03:49"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d52bab45adbc37abd2194"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:03:01"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d52b8b45adbc37abd2193"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:00:58"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d524fb45adbc37abd2192"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:00:58"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d5248b45adbc37abd2191"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:00:58"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d5247b45adbc37abd2190"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:00:58"}, {"DATE": "14/01/2020", "_id": {"$oid": "5e1d5240b45adbc37abd218f"}, "ERROR CODE": "TEMP ERROR", "TIME": "11:00:58"}];
//let filtered_array = _.uniq(ResponseData, 'time');

let arr = ResponseData.map(obj=> ({ ...obj, datetime: obj["DATE"] + " "+ obj["TIME"] }))
// console.log(arr)
var uniq = {}
//var arr  = [{"id":"1"},{"id":"1"},{"id":"2"}]
var arrFiltered = arr.filter(obj => !uniq[obj.datetime] && (uniq[obj.datetime] = true));
console.log('arrFiltered', arrFiltered)
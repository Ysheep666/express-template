/**
 * User
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp');

var UserSchema = new mongoose.Schema({
  login: {type:String, required: true}, // 登陆账号
  email: {type:String, required: true}, // 邮箱
  password: {type:String}, // 密码
  name: {type:String, required: true}, // 名称
  phone: {type:String}, // 手机
  loginAt: {type: Date, default: Date.now} // 最后登陆时间
});

UserSchema.plugin(timestamps);
module.exports = mongoose.model('User', UserSchema);

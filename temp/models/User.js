var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");


/*스키마 Set / 스키마 만들고 몽구스에서 가져오고 ㅇㅇ*/

var userSchema = mongoose.Schema({
    email :{type:String, require:true,unique:true},
    nickname :{type:String, require:true,unique:true},
    password :{type:String, require:true},
    createdAt:{type:Date, default:Date.now}
});
userSchema.pre("save",function(next){//user.create를 쓰면 마지막에 자동으로 user.save를 하는데 그러기 전에 할 행동 지정
    var user = this;//userSchema 의 객체를 this로 불러옴
    if(!user.isModified("password")){//mongoose에서 지원하는 isModified -> ("~~")의 속성이 save에 의해 변경되는지 아닌지 확인 / 새로 생성시에도 해당
        return next();
    } else {
        user.password = bcrypt.hashSync(user.password);//변경 된다면 or 새로 생성된다면 해쉬로 암호화 //동기식으로 hash를 만드는 함수
        return next();
    }
});
userSchema.methods.authenticate= function(password){
    var user = this;
    console.log(user.password+"와"+password+"인증!");
    return bcrypt.compareSync(password,user.password);
    // bcrypt.compareSync함수를 사용해서 입력된 password와 db의 hash(user.password)를 비교합니다.
    //Sync가 들어가 있으므로 동기식 함수라는 것을 알 수 있습니다. 이 함수는 hash가 일치하면 true, 일치하지 않으면 false를 return합니다.
};
userSchema.methods.hash = function(password){
    return bcrypt.hashSync(password);
};

var User = mongoose.model('user',userSchema);

module.exports = User;

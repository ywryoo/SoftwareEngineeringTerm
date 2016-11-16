
var passport = require('passport');
var User = require('../models/User');//mongoose.model('user',userSchema);
var LocalStrategy = require('passport-local');

passport.use('login-check',
    new LocalStrategy({
        usernameField : 'idInput',
        passwordField : 'pwInput',
        passReqToCallback : true
    },
    function(request, idInput, pwInput,done){
        console.log(idInput+"을 몽고디비에서 찾아요");
        User.findOne({email:idInput},
            function(err,user){
                console.log(user+"을 찾았어요");
                if(err) return done(err);
                if(!user){
                    request.flash("email",request.body.idInput);
                    return done(null, false, request.flash('loginError','아이디를 찾을 수 없습니다'));
                }
                if(!user.authenticate(pwInput)){ //user.password !=pwInput){
                    console.log("비밀번호가 틀렸어요");
                    request.flash("email",request.body.idInput);
                    return done(null, false, request.flash('loginError','올바른 비밀번호를 입력하세요'));
                }
                console.log("로그인성공!");
                return done(null,user);
            }
        );
    }
));
passport.serializeUser(function(user,done){
    done(null,user);//user.id를 해서 find하는 수도 있지만 그냥 user size 설계를 작게 하고 나중에 수업 과정 이수 관련하여서 db 셀렉을 하는걸로 하는게 나을거같다.
});
passport.deserializeUser(function(user, done) {
    done(null, user);//user.id로 셀렉 안하고 그냥 서버 메모리를 쓰는걸로 했ㄸr....
/*    User.findById(id, function(err, user) {
        done(err, user);
    });*/
});

module.exports = passport;

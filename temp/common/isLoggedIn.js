
function isLoggedIn(req,res,next)
{
    console.log("isLoggedIn1호출");
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/');
}

module.exports = isLoggedIn;

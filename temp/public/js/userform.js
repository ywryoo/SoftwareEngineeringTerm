function validationCheck(form)
{
    var idInput = form.idInput.value;
    var pwInput = form.pwInput.value;
    var pwInput2 = form.pwConfirmInput.value;
    var nnInput = form.nicknameInput.value;
    document.getElementById("password_error").textContent = "";
    document.getElementById("password_confirmation_error").textContent = "";
    if(idInput.length===0)
    {
        document.getElementById("email_error").textContent = "이메일을 입력하세요";
        return false;
    }
    if(pwInput.length<6)
    {
        document.getElementById("password_error").textContent = "비밀번호를 6자리 이상 입력하세요";
        return false;
    }
    if(pwInput!=pwInput2)
    {
        document.getElementById("password_confirmation_error").textContent = "비밀번호가 일치하지 않습니다";
        return false;
    }
    if(nnInput.length===0)
    {
        document.getElementById("nickname_error").textContent = "닉네임을 입력하세요";
        return false;
    }

    return true;
}

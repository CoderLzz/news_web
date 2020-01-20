function serialize(ele) {
    var f = ele.serializeArray()
    var obj = {}
    f.forEach(item => {
        obj[item.name] = item.value
    })
    return obj
}

$('#registerForm').on('submit', function (e) {
    e.preventDefault()
    var result = serialize($(this))
    if (result.username.trim().length == 0) {
        return alert('用户名不能为空')
    } else {
        if (result.username.trim().length < 2 || result.username.trim().length > 6) {
            return alert('用户名长度必须在2到6之间')
        }
    }
    if (result.email.trim().length == 0) {
        return alert('邮箱不能为空')
    } else {
        var regx = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
        if (!regx.test(result.email.trim())) {
            return alert('邮箱不合法')
        }
    }
    if (result.password.trim().length == 0) {
        return alert('密码不能为空')
    } else {
        if (result.password.trim().length < 5 || result.password.trim().length > 15) {
            return alert('密码长度必须在5到15之间')
        } else {
            if (result.password.trim() != result.ispassword.trim()) {
                return alert('两次密码不一样')
            }
        }
    }
    if (result.ispassword.trim().length == 0) {
        return alert('两次密码不一样')
    }
    delete result.ispassword
    $.ajax({
        type: 'post',
        url: 'http://localhost/register',
        data: result,
        success: function (data) {
            $('.reset').click()
            location.href="login.html"
        }
    })
})
$('#loginForm').on('submit', function (e) {
    e.preventDefault()
    var form = $(this).serialize()
    $.ajax({
        type: 'post',
        url: 'http://localhost/login',
        data: form,
        success: function (data) {
            if (data.data) {
                if (data.data.isActive) {
                    window.sessionStorage.setItem('token', data.data.token)
                    window.sessionStorage.setItem('username', data.data.username)
                    window.sessionStorage.setItem('role', JSON.stringify(data.data.role))
                    location.href = "index.html"
                } else {
                    new NoticeJs({
                        text: '该用户已被封禁，请联系管理员',
                        position: 'topCenter',
                        animation: {
                            open: 'animated bounceInRight',
                            close: 'animated bounceOutLeft'
                        }
                    }).show();
                }
            }else{
                new NoticeJs({
                    text: data.meta.msg,
                    position: 'topCenter',
                    animation: {
                        open: 'animated bounceInRight',
                        close: 'animated bounceOutLeft'
                    }
                }).show();
            }
        }
    })
})
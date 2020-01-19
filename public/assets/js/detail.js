$.ajax({
    type: 'get',
    url: 'http://localhost/privates/detail/' + location.search.split('=')[1],
    success: function (data) {
        var html = template('tpl9', {
            obj: data.data
        })
        $('.main').html(html)
    }
})

$('#submitComment').on('click', function () {
    var contentComment = $('#write').val()
    $.ajax({
        type: 'post',
        url: 'http://localhost/privates/comment',
        data: {
            author: window.sessionStorage.getItem('username'),
            content: contentComment,
            article: location.search.split('=')[1]
        },
        success: function (data) {
            $('#write').val('')
            new NoticeJs({
                text: '评论发表成功',
                position: 'topCenter',
                animation: {
                    open: 'animated bounceInRight',
                    close: 'animated bounceOutLeft'
                }
            }).show();
        }
    })
})

$.ajax({
    type:'get',
    url:'http://localhost/privates/web',
    success:function(data){
        console.log(data);
        var html=template('tpl11',{
            isLogin:window.sessionStorage.getItem('username'),
            isComment:data.data[0].isComment
        })
        $('.commentCon').html(html)
    }
})
function runPost(){
    $.ajax({
        type: 'get',
        url: 'http://localhost/privates/detail/' + location.search.split('=')[1],
        success: function (data) {
            data.data.read=data.data.read+1
            var html = template('tpl9', {
                obj: data.data,
                flag:window.sessionStorage.getItem('username')
            })
            $('.main').html(html)
            $.ajax({
                type:'put',
                url:'http://localhost/privates/read/'+location.search.split('=')[1],
                data:{
                    read:data.data.read
                }
            })
        }
    })
}
runPost()
$('.commentCon').on('click','#submitComment', function () {
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
            run()
            runPost()
        }
    })
})

$.ajax({
    type: 'get',
    url: 'http://localhost/privates/web',
    success: function (data) {
        var html = template('tpl11', {
            isLogin: window.sessionStorage.getItem('username'),
            isComment: data.data[0].isComment
        })
        $('.commentCon').html(html)
    }
})


$('.newest .main').on('click', '#praisePost', function () {
    var praise = Number($(this).text().split('(')[1].split(')')[0]) + 1
    $(this).html('<i class="fa fa-thumbs-up"></i>点赞(' + praise + ')')
    var postId = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: 'http://localhost/privates/praise/' + postId,
        data: {
            praise: praise
        }
    })
})

function run(){
    $.ajax({
        type:'get',
        url:'http://localhost/privates/commentList/'+location.search.split('=')[1],
        success:function(data){
            var html=template('tpl13',{
                arr:data.data
            })
            $('.commentList').html(html)
            if ($('.newest .commentList').children().length == 0) {
                $('.newest .list').hide()
            } else {
                $('.newest .list').show()
            }
        }
    })
}
run()


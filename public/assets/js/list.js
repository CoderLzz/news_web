$.ajax({
    type:'get',
    url:'http://localhost/privates/list/'+location.search.split('=')[1]+'/true',
    success:function(data){
        var html=template('tpl8',{
            arr:data.data,
            flag:window.sessionStorage.getItem('username')
        })
        $('.newest .main').html(html)
    }
})

$.ajax({
    type:'get',
    url:'http://localhost/privates/cate/'+location.search.split('=')[1],
    success:function(data){
        var html=template('tpl10',{
            cateName:data.data.cateName
        })
        $('.newest .title').html(html)
    }
})

$('.newest .main').on('click','#praisePost',function(){
    var praise=Number($(this).text().split('(')[1].split(')')[0])+1
    $(this).html('<i class="fa fa-thumbs-up"></i>点赞('+praise+')')
    var postId=$(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'http://localhost/privates/praise/'+postId,
        data:{
            praise:praise
        }
    })
})
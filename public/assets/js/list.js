$.ajax({
    type:'get',
    url:'http://localhost/privates/list/'+location.search.split('=')[1]+'/true',
    success:function(data){
        console.log(data);
        var html=template('tpl8',{
            arr:data.data
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
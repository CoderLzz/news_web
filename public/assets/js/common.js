function rd(max,min){
    var num=parseInt(Math.random()*(max-min)+min)
    return num
}

function dateFomate(p){
    var date=new Date(p)
    var y=date.getFullYear().toString()
    var m=(date.getMonth()+1).toString().padStart(2,'0')
    var d=date.getDate().toString().padStart(2,'0')
    var h=date.getHours().toString().padStart(2,'0')
    var mi=date.getMinutes().toString().padStart(2,'0')
    var s=date.getSeconds().toString().padStart(2,'0')
    return `${y}-${m}-${d} ${h}:${mi}:${s}`
}


var html = template('tpl1', {
    username: window.sessionStorage.getItem('username')?window.sessionStorage.getItem('username'):'',
    roleName: JSON.parse(window.sessionStorage.getItem('role'))?JSON.parse(window.sessionStorage.getItem('role')).roleName:'',
    code: JSON.parse(window.sessionStorage.getItem('role'))?JSON.parse(window.sessionStorage.getItem('role')).code:''
})
document.getElementById('info').innerHTML = html
$('#logout').on('click', function () {
    window.sessionStorage.clear()
    location.href = 'index.html'
})
$('#gotoBack').on('click', function () {
    location.href = "http://localhost:3000/login"
})
$.ajax({
    type: 'get',
    url: 'http://localhost/privates/categories',
    success: function (data) {
        var html = template('tpl2', {
            arr: data.data
        })
        $('.navMenu').html(html)
        var html2=template('tpl12',{
            arr1:data.data
        })
        $('#headerNav').html(html2)
    }
})



$.ajax({
    type: 'get',
    url: 'http://localhost/privates/randomPost',
    success: function (data) {
        let randomPost = new Set()
        while (randomPost.size <= 2) {
            var num = rd(data.data.length, 0)
            randomPost.add(data.data[num])
        }
        var html = template('tpl6', {
            arr: [...randomPost]
        })
        $('.random .randomPost').html(html)
    }
})

$.ajax({
    type:'get',
    url:'http://localhost/privates/newComment',
    success:function(data){
        let newComment=new Set()
        while(newComment.size<6){
            var num=rd(data.data.length,0)
            newComment.add(data.data[num])
        }
        var html=template('tpl7',{
            arr:[...newComment]
        })
        $('.newContent').html(html)
    }
})
$.ajax({
    type: 'get',
    url: 'http://localhost/privates/swiper',
    success: function (data) {
        console.log(data);
        var html = template('tpl3', {
            swiper: data.data
        })
        $('.swiper-container').html(html)
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
        });
    }
})

// 每个30s重新获取
$.ajax({
    type: 'get',
    url: 'http://localhost/privates/popular',
    success: function (data) {
        let postArr = new Set()
        while (postArr.size < 4) {
            var num = rd(data.data.length, 0)
            postArr.add(data.data[num])
        }
        var html = template('tpl4', {
            arr: [...postArr]
        })
        $('.popular-upload').html(html)
    }
})

$.ajax({
    type: 'get',
    url: 'http://localhost/privates/newest',
    success: function (data) {
        var newestPost=new Set()
        while(newestPost.size<3){
            var num=rd(data.data.length,0)
            newestPost.add(data.data[num])
        }
        var html = template('tpl5', {
            arr: [...newestPost]
        })
        $('.newest .main').html(html)
    }
})
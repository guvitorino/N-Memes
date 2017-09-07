
(function ($) {

    var self = {
        memesImg: [
            'http://s2.glbimg.com/6Nj5RJmCqwSQ2KYhCLAmHHmQ36c=/288x0/top/s.glbimg.com/jo/eg/f/original/2016/10/14/nazaaa.gif',
            'http://i0.kym-cdn.com/photos/images/original/000/429/265/bff.gif',
            'https://i.makeagif.com/media/6-20-2016/XQain4.gif',
            'https://i.makeagif.com/media/3-10-2017/QLq6Zo.gif',
            'https://abrilcapricho.files.wordpress.com/2017/06/hi.gif?crop=153px%2C0px%2C487px%2C331px&resize=680%2C453&quality=85&strip=info',
            'https://abrilcapricho.files.wordpress.com/2017/06/gif.gif?w=640&h=360'
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.memesImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);


(function ($) {

    var self = {
        memesImg: [
            'http://pm1.narvii.com/6358/4944f591c1438e2208707f0bb5eeec25d58d9e02_hq.jpg',
            'https://pbs.twimg.com/media/C4s0q72XUAEiXdr.jpg',
            'https://i.ytimg.com/vi/kmW_gzEjgcw/hqdefault.jpg',
            'https://i.ytimg.com/vi/TTipr6m0kfs/maxresdefault.jpg',
            'https://media.lolusercontent.com/api/embedly/1/image/resize?url=http%3A%2F%2Fimgur.com%2FXgfTdsZ.png&key=f0abbd34f14549f3a15cd94dd9970851&width=425',
            'http://pm1.narvii.com/6362/66c162dd9e6e49358dbc90bfff5f6bd4707253a0_hq.jpg',
            'https://www.myinstants.com/media/instants_images/sem-titulo_26.jpg',
            'https://i.ytimg.com/vi/l57FtllsMUI/hqdefault.jpg',
            'https://i.ytimg.com/vi/Bbd9olrbOuU/maxresdefault.jpg',
            'https://i.ytimg.com/vi/k_zCKgOfOgw/maxresdefault.jpg',
            'https://i.ytimg.com/vi/dymgiAy97fE/maxresdefault.jpg',
            'http://images.virgula.uol.com.br/2016/02/bin-855x621.jpg',
            'https://mega.ibxk.com.br/2013/3/materias/358541212268.jpg?w=600',
            'https://i.ytimg.com/vi/tDYIJr0wNV4/hqdefault.jpg',
            'http://d139lereoqc85y.cloudfront.net/wp-content/uploads/2016/07/birl-600x330.jpg',
            'https://jovemnerd.com.br/wp-content/uploads/2016/07/Birl_bambam-760x428.jpg',
            'https://i.ytimg.com/vi/lxX7_unVXLo/maxresdefault.jpg'

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
    $.nMemes = self;

})(jQuery);

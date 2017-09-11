
(function ($) {

    var self = {
        memesImg: [
            'http://s2.glbimg.com/6Nj5RJmCqwSQ2KYhCLAmHHmQ36c=/288x0/top/s.glbimg.com/jo/eg/f/original/2016/10/14/nazaaa.gif',
            'http://i0.kym-cdn.com/photos/images/original/000/429/265/bff.gif',
            'https://i.makeagif.com/media/6-20-2016/XQain4.gif',
            'https://i.makeagif.com/media/3-10-2017/QLq6Zo.gif',
            'https://abrilcapricho.files.wordpress.com/2017/06/hi.gif?crop=153px%2C0px%2C487px%2C331px&resize=680%2C453&quality=85&strip=info',
            'https://abrilcapricho.files.wordpress.com/2017/06/gif.gif?w=640&h=360',
            'https://media.tenor.com/images/0cfc38994d937dc72ecea909cb53ed53/tenor.gif',
            'http://cdn.naosalvo.com.br/2015/06/burro.gif',
            'http://pa1.narvii.com/6542/d97b5156b2d92e2f59c03bbda0af2ea6abf569e2_hq.gif',
            'https://media.giphy.com/media/xTiTnHvXHHxOTcdmxO/giphy.gif',
            'https://i.makeagif.com/media/5-03-2016/fkuX-d.gif',
            'https://i.makeagif.com/media/5-10-2015/QnQ8gB.gif',
            'https://giant.gfycat.com/FineHospitableCreature.gif',
            'http://pa1.narvii.com/6413/e907ad8504c711f3f88044bc3b022ab4eb94f5f6_hq.gif',
            'http://pa1.narvii.com/6518/0a830d000afad556718fb3dce9fe445e522291fa_hq.gif',
            'https://i.makeagif.com/media/5-08-2015/Z_J_3f.gif',
            'https://thumbs.gfycat.com/DeterminedCookedAustraliansilkyterrier-max-1mb.gif',
            'http://3.bp.blogspot.com/-4-Hf2asiSNA/Vic00Bb2uQI/AAAAAAAAHTE/UGvNRFDH9Og/s1600/anigif_enhanced-21337-1406056566-21.gif',
            'https://media.tenor.com/images/9e3fddbd727a22b4aaad44dfc33ba73b/tenor.gif',
            'https://68.media.tumblr.com/361428952d9a51e82ae2d89cb7a502de/tumblr_mssh5kqQGE1qlqj9ro1_250.gif',
            'https://www.altoastral.com.br/wp-content/uploads/2016/08/gloria-maria-correndo.gif',
            'http://2.bp.blogspot.com/-GdjVdl7Ojfo/UZ0q9khgBTI/AAAAAAAAAHo/WUe1KZoJs0I/s400/para-nossa-alegria-o.gif',
            'http://i.imgur.com/U6qrpOv.gif',
            'http://24.media.tumblr.com/fe76337aa235d41cd44d7c9a83549c8d/tumblr_mjdg20CX0L1rtdp8ho3_250.gif',
            'http://1.bp.blogspot.com/_muRuy-g1S9I/TP98CsXBSGI/AAAAAAAAACE/7Yau7May7To/s1600/noia-big.gif',
            'https://media.tenor.com/images/a7266774da3a149889342ad7598fc495/tenor.gif',
            'http://pa1.narvii.com/6451/68bbec436fb9f79b3c7c5d477a4bf49e19a4f795_hq.gif',
            'http://pa1.narvii.com/6461/3807c88d82b9a77d4ac1af470bea82c369649d2e_128.gif',
            'http://pa1.narvii.com/6537/e80216cc969f0ee5bd60b8d1f4a6d9ab882ba797_hq.gif'
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

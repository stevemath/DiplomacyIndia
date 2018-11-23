'use strict';

app.intro = kendo.observable({
    onShow: function () {
        var self = this;
        
        
       

        //function onLoad() {
        //    alert("loaded")
            document.addEventListener("deviceready", onDeviceReady, false);
        //}

        app.intro.resizeIntro();
        playAudio(audioList.intro)
        gamePlay.renderRedButtons();

        $(window).on("resize", function () {
            console.log("resize");
            app.intro.resizeIntro();
        });

        $(".intro1 .red-btn-container").on("click touchend", function () {
           
            if (currentAudio != null && currentAudio.paused == true) {
                playAudio(currentAudio);
            }
            app.intro.slidePanel("intro1", "intro2");

        });

        $(".intro2 .red-btn-container").on("click touchend", function () {
            app.intro.slidePanel("intro2", "intro3");

        });

        $(".intro3 .red-btn-container").on("click touchend", function () {
            app.intro.slidePanel("intro3", "intro4");
           
        });

        $(".intro4 .red-btn-container").on("click touchend", function () {
            $("#fire").remove();
            app.intro.navToGame();

        });
        $(".show-credits").on("click touchend", function () {
            var curr = $("#lowerBlockWrapper");
 kendo.fx(curr).slideIn("up").duration(500).play();
        });
       
        $(".close-credits").on("click touchend", function () {
            var curr = $("#lowerBlockWrapper");
            kendo.fx(curr).slideIn("up").duration(500).reverse();
        });


        // set links for desk or mobile
        if (kendo.support.mobileOS.device == undefined) {
            $(".gwb").on("click touchend", function () {
                window.open('https://www.bush41.org', '_blank');
                
            });

            $(".eduweb-link").on("click touchend", function () {
                window.open('http://www.eduweb.com', '_blank');
            });

            $(".appstore").on("click touchend", function () {
                window.open('https://itunes.apple.com/us/app/china-diplomatic-dragon/id1326862566?ls=1&mt=8', '_blank');
            });

            $(".googlestore").on("click touchend", function () {
                window.open('https://play.google.com/store/apps/details?id=com.bush41.china', '_blank');
            });
        } else {

            $(".gwb").on("click touchend", function () {
                window.open('https://www.bush41.org', '_system', "location=no");
                
            });

           



            $(".eduweb-link").on("click touchend", function () {
                window.open('http://www.eduweb.com', '_system', "location=no");
            });
        }

        $(".img-credits").on("click touchend", function () {
            app.intro.showImgCredits();
        });

    },
   slidePanel: function (panelId, newPanelId) {
       var self = this;

       var panel = $("." + panelId);
       var newPanel = $("." + newPanelId);

       kendo.fx(panel).slideIn("right").duration(800).reverse();

       kendo.fx(newPanel).slideIn("left").duration(800).play();
       newPanel.show();

       if (newPanelId == "intro4") {
           self.startFire(".intro4");

       }
    },
    resizeIntro: function () {
        var h = $(window).height();
        var bScale = .85;
        if ($(window).width() < 750) {
            bScale = .79
        };

        var btnMargin = h * bScale;
        this.resizeDragon();
       

 $(".intro-panel").css("height", h + "px");

 $(".intro-button").css("margin-top", btnMargin + "px");

    },
    resizeDragon: function () {
       var iw = 2000;
      var  ih = 1182;
      var  w = $(window).width();
      var h = $(window).height();
      var iRatio = 1;

        if (iw / w > ih / h) {
            console.log("expand to fs height");
            iRatio = h / ih;
        } else {
            console.log("expand to fs width")
            iRatio = w / iw; 
        }
        console.log(iRatio)

        var transTop = (1 - iRatio) * 100 - 2;
        $(".intro-dragon").css({ transform: 'translate(0% ,-' + transTop + '%) scale(' + iRatio + ')' });
       
    }
,
    startFire: function (elem) {
        console.log("start fire")
        if ($("#fire")) {
            $("#fire").remove();
        }
      
        $(".intro-dragon").prepend("<canvas id='fire' width='400' height='300' style='position:absolute;pointer-events:none;z-index:19' />")
          var imgw = $(elem).find(".intro-dragon").width();
        var elemw = $(elem).width();
       
        var pLeft = imgw -130;
        console.log(pLeft);
       
        var pTop = $(elem).position().top - 35;

        $("#fire").css("left", pLeft + "px");
        $("#fire").css("top", pTop + "px");
        $("#fire").css("z-index", 10);
        cr_createRuntimeFire("fire");
        var timeout = setTimeout('$("#fire").remove();', 5500);
    },
    afterShow: function () {
        if (checkSimulator() == false && window.screen.lockOrientation) {
            window.screen.lockOrientation('landscape');
        }
    },
    beforeHide: function () {
        
        $("#fire").remove();
    },
    navToGame: function () {
        app.mobileApp.navigate("components/home/view.html")
    },
    showImgCredits: function () {

        var self = this;
        console.log("show credits");
        setTimeout(function () {
           
            var template = kendo.template($("#creditsTemplate").html());
            var creditsHtml = kendo.render(template, [{}]);
           
            $("body").append(creditsHtml);


           



            var w = $(window).width();
            var h = $(window).height();
            var dw = $(".credits-container").width();
            var dh = $(".credits-container").height();
            var topOffset = 10;
            var scale = 1;
            var marginThreshold = 125;
            if (w < dw + marginThreshold || h < dh + marginThreshold) {

                var wr = (dw + marginThreshold) / w;
                var hr = (dh + marginThreshold) / h;

                if (hr > wr) {
                    scale = 1 / hr;
                } else {
                    scale = 1 / wr;
                }

                console.log(wr + " " + hr)

                $(".credits-container").css("transform", "scale(" + scale + ") ")

            }

            var ml = -($(".credits-container").width()) / 2;
            var mt = (h - $(".credits-container").height()) / 2 + (topOffset * scale);
            $(".credits-container").css("top", mt + "px");
            $(".card-wrapper").css("left", "50%");
            $(".credits-container").css("margin-left", ml + "px");
            $(".credits-container").fadeIn();
            gamePlay.renderRedButtons();

            $("#imgCredits").kendoMobileListView({

                dataSource: credits,
                template:"<div class='cred-item'>#=data# </div>",


            });

          

            $(".close-imgcredits").on("click touchend", function () {
                $(".card-wrapper").remove();
            });

        }, 0);
    },
});


app.localization.registerView('intro');

// START_CUSTOM_CODE_login
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes



var navToGame = function () {
    // app.navigate("#home");
    app.intro.navToGame();
}
// END_CUSTOM_CODE_login
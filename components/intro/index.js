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
           // app.intro.slidePanel("intro3", "intro4");
            app.intro.navToGame();
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

      
    },
    resizeIntro: function () {
        var h = $(window).height();
        var bScale = .85;
        if ($(window).width() < 750) {
            bScale = .79
        };

        var btnMargin = h * bScale;
       
       

 $(".intro-panel").css("height", h + "px");

 $(".intro-button").css("margin-top", btnMargin + "px");

    },
    resizeDragon: function () {
     
    }
,
    startFire: function (elem) {
       
    },
    afterShow: function () {
        if (checkSimulator() == false && window.screen.lockOrientation) {
            window.screen.lockOrientation('landscape');
        }
    },
    beforeHide: function () {
       
    },
    navToGame: function () {
        app.mobileApp.navigate("components/home/view.html")
    },
    showImgCredits: function () {

        var self = this;
        console.log("show credits");
        setTimeout(function () {


            $(".credits-container").remove();
            var template = kendo.template($("#creditsTemplate").html());
            var creditsHtml = kendo.render(template, [{}]);
           
            $("body").append(creditsHtml);


           



            var w = $(window).width();
            var h = $(window).height();
            var dw = $(".credits-container").width();
            var dh = $(".credits-container").height()*.7;
            var topOffset = 0;
            var scale = 1;
            var marginThreshold = 120;
            if (w < dw + marginThreshold || h < dh + marginThreshold) {

                var wr = (dw + marginThreshold) / w;
                var hr = (dh + marginThreshold + 50) / h;

                if (hr > wr) {
                    scale = 1 / hr;
                } else {
                    scale = 1 / wr;
                }

                console.log(wr + " " + hr)

               // $(".credits-container").css("transform", "scale(" + scale + ") ")

            }

            var ml = -($(".credits-container").width()) / 2;
            var mt = (h - $(".credits-container").height()) / 2 + (topOffset * scale);
           // $(".credits-container").css("top", mt + "px");
           // $(".card-wrapper").css("left", "50%");
            //$(".credits-container").css("margin-left", ml-25 + "px");
            $(".credits-container").fadeIn();
            gamePlay.renderRedButtons();

            $("#imgCredits").kendoMobileListView({

                dataSource: credits,
                template:"<div class='cred-item'>#=data# </div>",


            });

          

            $(".close-imgcredits").on("click touchend", function () {
                $(".credits-container").remove();
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
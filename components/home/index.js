'use strict';

app.home = kendo.observable({
    onShow: function () {
       



        if (gamePlay.properties.gameStarted != true) {
            console.log(gamePlay.properties.gameStarted)
            gamePlay.init();
            gamePlay.properties.gameStarted = true
        } else {
            console.log(configData.gameData)
            $("#loading").fadeOut(300);

            if (jsonCanvas) {
              //  console.log(canvas);
                //canvas.renderAll();
                var w = $(window).width();
                var h = $(window).height();

                $("canvas").attr("width", w);
                $("canvas").attr("height", h);

                canvas = new fabric.Canvas('chinaCanvas');

                canvas.loadFromJSON(jsonCanvas, canvas.renderAll.bind(canvas), function (o, object) {
                    fabric.log(o, object);
                });

                //resizeCanvas()
            }

            configData.init();
            localesMgmt.initEvents();

           
            setTimeout(function(){
                //  resizeCanvas();
                repositionCanvas();
            },200)
        }
    },
    afterShow: function () {
        if (gamePlay.properties.gameStarted == true) {
          

           // configData.init();
           // localesMgmt.initEvents();
            //setTimeout(function () {
            //    $("body").append('<div class="spacer"></div>');
            //    scrollTo(0, 10);
            //    // resizeCanvas();
            //}, 500)
        }
    },
    beforeHide: function () {
       // console.log(configData.gameData)
      // console.log( canvas.getObjects());
        jsonCanvas = canvas.toJSON(['id', 'name', 'state', 'initState', 'lockMovementX', 'lockMovementY', 'hasControls', 'hasBorders', 'hoverCursor', 'aType', 'unlockable', 'selectable']);//
       var can2 = canvas.toObject();
       glowEnabled = false;
      // console.log(jsonCanvas);
      // console.log(can2);
    },
    navToIntro: function (e) {
        e.preventDefault();
        console.log("nav to intro");
        app.mobileApp.navigate("components/intro/view.html")
    },
    refresh:function(){
        console.log("refresh");
clearCanvas();
    }
});
app.localization.registerView('home');

// START_CUSTOM_CODE_home


//var imgW;
//var imgH;
var currRespStatus;
var currHover;
var zRatio = 1;
var resizing = false;

var lsx;
var lsy;
var locales;
var isMobile;
var fullScreen = false;
var bkgrdImg;
var srcLocales = [];
var currentAudio = null;

//var workingH = 766;
//var workingW = 1280;

var workingH = 600;
var workingW = 1070;

//var workingH = 799;
//var workingW = 1424;

//var workingH = 875;
//var workingW = 1450;



function updateDiscovery(id) {
    var src = selectObject(id);
    if (src.state == "ready") {
        src.set("stroke", "#309060");
        src.set("strokeWidth", 3);
        canvas.renderAll();
    }

    // hide random
    localesMgmt.hideRandomDiscovery(id)
}

function closeDiscovery(id) {

    var src = selectObject(id);
    localesMgmt.removeGlow(src);
    src.set("stroke", "#303030");
    // src.set("fill", "#808080");
    src.setGradient("fill", disGradientEmpty),
    src.set("state", "empty");
    src.hoverCursor = "default";
    src.animate("opacity", 0, {
        onChange: canvas.renderAll.bind(canvas)
    });
    
    canvas.renderAll();
}





function getLocaleById(id) {

   
    var item;
    var i = $.grep(locales, function (obj, idx) {
        return obj.Id == id;
    });

    if (i.length > 0) {
        item = i[0];
        return item;
    } else {
        return null;
    }

}


function getTypeById(id) {


    var item;
    var i = $.grep(locales, function (obj, idx) {
        return obj.Id == id;
    });

    if (i.length > 0) {
        item = i[0];
        return item.aType;
    } else {
        return null;
    }

}


function getQDataById(id) {
    var item;
    var i = $.grep(questions, function (obj, idx) {
        return obj.id == id;
    });

    if (i.length > 0) {
        item = i[0];
        return item;
    } else {
        return null;
    }

}

function getTDataById(id) {
    var item;
    var i = $.grep(topics, function (obj, idx) {
        return obj.id == id;
    });

    if (i.length > 0) {
        item = i[0];
        return item;
    } else {
        return null;
    }

}






var selectObject = function (ObjectName) {
    var obj = null;
 //console.log(ObjectName);
    canvas.getObjects().forEach(function (o) {
      // 
       // 

        if (o.id == ObjectName) {
           // console.log("match");
            //console.log(o.id);
            // canvas.setActiveObject(o);
            obj = o;
        }

    });


 

    return (obj);
}

var currentFactor = 1;


function zoomIt(newfactor) {

    var factor;
    
    factor = newfactor / currentFactor;
    currentFactor =  newfactor;
   

    console.log("factor: " + factor)
    console.log("current factor: " + newfactor);

    canvas.setHeight(canvas.getHeight() * factor);
   canvas.setWidth(canvas.getWidth() * factor);

    if (canvas.backgroundImage) {
        // Need to scale background images as well
        console.log("has bkgrd img");
        var bi = canvas.backgroundImage;
        bi.width = bi.width * factor; bi.height = bi.height * factor;
    }

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * factor;
        var tempScaleY = scaleY * factor;
        var tempLeft = left * factor;
        var tempTop = top * factor;

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }
    canvas.renderAll();
    canvas.calcOffset();
}

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}
function resizeCanvas() {
    setTimeout(function () { window.scrollTo(0, 1); }, 0);
   // toggleFullScreen();
    //document.body.requestFullscreen();
    var hMenuOffset = 45;
   
    var w = $(window).width(); //window.innerWidth; 
    var h = $(window).height() - hMenuOffset; //window.innerHeight; 
 if (w > 1000) {
     workingH = 635;
    // workingH = 875;
    }
    var ofh = (imgH - workingH) / 2;
    var ofw = (imgW - workingW) / 2;
    ofh = 10;
    console.log(ofw)

    setTimeout(function () {

        if (resizing == false) {
            resizing = true;
            $(document.body).height(window.innerHeight);

             $(".km-content").css('height', window.innerHeight + "px");

               var acw = $("#chinaCanvas").width();
            var ach = $("#chinaCanvas").height();
            var cw = workingW; //$("canvas").width();
            var ch = workingH; //$("canvas").height() + 55;



            //  console.log(cw + " x " + ch);

            if (fullScreen == false) {

                var byWidth;
                if (cw / w > ch / h) {
                    // adjust by width
                    console.log("adjust to width");
                    byWidth = true;
                      zRatio = w / cw;
                     zoomIt(zRatio);
                   $("canvas").css("margin-left", -ofw * zRatio + "px");
                   

                    var marginTop = (h - $("canvas").height()) / 2;
                   // $("canvas").css("margin-top", marginTop + "px");
                    // fix canvas to top
                    $("canvas").css("margin-top", 0 + "px");
                  
                } else {
                    // adjust by height
                    console.log("adjust to height");
                    zRatio = h / ch;

                    zoomIt(zRatio);
                 
                    var marginLeft = (w - $("canvas").width()) / 2;
                    $("canvas").css("margin-left", marginLeft + "px");
                      $("canvas").css("margin-top", -ofh * zRatio + "px");

                  

                    $("#statusbar").css("top", 0 + "px");
                    $("#statusbar").css("margin-left", marginLeft + "px");
                   


                }

                $("#toolbar").css("width", cw * zRatio + "px");
                $("#statusbar").css("width", cw * zRatio + "px");


                setTimeout(function () {
                    if (w < 900) {
                        console.log("resize toolbar <600")
                        var tRatio = w / 1200;
                         $("#tools").css({ transform: 'scale(' + tRatio + ')' });
                        $("#toolbar").css("height", 90 * tRatio + "px");
                        $("#toolbar").css("width", w + "px");
                        tbh = 90 * tRatio;
                        $("#tools").css("top", "-28px");
                       // console.log(h + " " + tbh);
                       // $("#toolbar").css("top", h + 10 + "px");
                        $("#toolbar").css("left", "50%");
                        $("#toolbar").css("margin-left", -($("#toolbar").width() / 2) + "px");
                       
                    } else {
                        console.log("resize toolbar >>")
                        $("#tools").css({ transform: 'scale(' + .9 + ')' });
                        $("#toolbar").css("height", 70 + "px");
                        $("#toolbar").css("width", w + "px");
                        $("#tools").css("top", "-10px");
                        tbh = 80;
                       // $("#toolbar").css("top", h - 20 + "px");
                        $("#toolbar").css("left", "50%");
                        $("#toolbar").css("margin-left", -($("#toolbar").width() / 2) + "px");

                       
                    }

                    if (byWidth == true) {
                       // alert(kendo.support.mobileOS.device)
                        if (w < 1035 && kendo.support.mobileOS.device != undefined) {
                           
                            $("#toolbar").css("top", h - ($("#toolbar").height() * zRatio/3) + "px");

                        } else {
                            $("#toolbar").css("top", $("canvas").height() - ($("#toolbar").height() * zRatio) + "px");
                        }
                    } else {
                        $("#toolbar").css("top", $(window).height() - ($("#toolbar").height()-5) + "px");

                    }

                }, 200);

                $("#statusbar").css("top", 0 + "px");
                $("#statusbar").css("margin-left", 0 + "px");
                $("#statusbar").css("width", "100%");



                resizing = false;
            } else {
                // fullscreen mode - image overflows screen

                ch = $("canvas").height();
                var oh = screen.height; 
                var ih = Window.innerHeight;
                var marginTop = 0;
                if (cw / w > ch / h) {
                    console.log("expand to height");
                    zRatio = h / ch;
                    var newcw = $("canvas").width() * zRatio;
                    $("canvas").css("width", newcw + "px");
                    console.log("width: " + w + " " + $("canvas").width())
                    var marginLeft = (w - $("canvas").width()) / 2;
                    
                    $("canvas").css("margin-left", marginLeft + "px");
                    $("canvas").css("margin-top", 0 + "px");

                } else {
                    console.log("expand to fs width")
                    zRatio = w / cw;
                    var newch = $("canvas").height() * zRatio;

                    marginTop = ((h - $("canvas").height() * zRatio) / 2);
                    console.log("margin: " + marginTop)
                    $("canvas").css("margin-top", marginTop + "px");
                    $("canvas").css("margin-left", 0 + "px");


                }
                zoomIt(zRatio);


              
                $("#toolbar").css("position", "absolute");
                $("#toolbar").css("z-index", "8000");
                $("#toolbar").css("margin-left", 0 + "px");
                var tbh = $("#toolbar").height();


                var tOffset = h * zRatio;


                $("#toolbar").css("width", "100%");

  setTimeout(function () {
                    if (w < 900) {
                        console.log("resize toolbar <600")
                        var tRatio = w / 900;
                       $("#tools").css({ transform: 'scale(' + tRatio + ')' });
                        $("#toolbar").css("height", 90 * tRatio + "px");
                        tbh = 90 * tRatio;
                        $("#tools").css("top", "-10px");
                        console.log(h + " " + tbh);
                        $("#toolbar").css("top", h - tbh + "px");
                       
                    } else {
                        console.log("resize toolbar >>")
                        $("#tools").css({ transform: 'scale(' + 1 + ')' });
                        $("#toolbar").css("height", 80 + "px");
                        $("#tools").css("top", "0px");
                        tbh = 80;
                        $("#toolbar").css("top", h - tbh + "px");
                       
                    }

                }, 0);

                $("#statusbar").css("top", 0 + "px");
                $("#statusbar").css("margin-left", 0 + "px");
                $("#statusbar").css("width", "100%");

               

            }
            console.log(zRatio);

            if ($("#bCardLayout").length > 0) {

                $("#bCardLayout").remove();
                gamePlay.getBcardLayout();
            }
        }

        setTimeout(function () {
            $("#loading").fadeOut(300);
        },500)
    }, 300);


}
 
function repositionCanvas() {
    console.log("reposition");
    var hMenuOffset = 45;

    var w = $(window).width(); //window.innerWidth; 
    var h = $(window).height() - hMenuOffset; //window.innerHeight; 
    if (w > 1000) {
        workingH = 635;
        // workingH = 875;
    }
    var ofh = (imgH - workingH) / 2;
    var ofw = (imgW - workingW) / 2;
    ofh = 10;
    console.log(ofw)

    setTimeout(function () {

        if (resizing == false) {
            resizing = true;
            $(document.body).height(window.innerHeight);

            $(".km-content").css('height', window.innerHeight + "px");

            var acw = $("#chinaCanvas").width();
            var ach = $("#chinaCanvas").height();
            var cw = workingW; //$("canvas").width();
            var ch = workingH; //$("canvas").height() + 55;



            //  console.log(cw + " x " + ch);

            if (fullScreen == false) {

                var byWidth;
                if (cw / w > ch / h) {
                    // adjust by width
                    console.log("adjust to width");
                    byWidth = true;
                    zRatio = w / cw;
                    zoomIt(zRatio);
                   // $("canvas").css("margin-left", -ofw * zRatio + "px");


                    var marginTop = (h - $("canvas").height()) / 2;
                    // $("canvas").css("margin-top", marginTop + "px");
                    // fix canvas to top
                    $("canvas").css("margin-top", 0 + "px");

                } else {
                    // adjust by height
                    console.log("adjust to height");
                    zRatio = h / ch;

                   // zoomIt(zRatio);
                    console.log(h + " " + ch)
                    console.log(w + " " + imgW * zRatio)
                    var marginLeft = ((w - imgW * zRatio) / 2);
                    console.log(marginLeft);
                    $("canvas").css("margin-left", marginLeft + "px");
                    $("canvas").css("margin-top", -ofh * zRatio + "px");



                    $("#statusbar").css("top", 0 + "px");
                    $("#statusbar").css("margin-left", marginLeft + "px");



                }

                $("#toolbar").css("width", cw * zRatio + "px");
                $("#statusbar").css("width", cw * zRatio + "px");


                setTimeout(function () {
                    if (w < 900) {
                        console.log("resize toolbar <600")
                        var tRatio = w / 1200;
                        $("#tools").css({ transform: 'scale(' + tRatio + ')' });
                        $("#toolbar").css("height", 90 * tRatio + "px");
                        $("#toolbar").css("width", w + "px");
                        tbh = 90 * tRatio;
                        $("#tools").css("top", "-28px");
                        // console.log(h + " " + tbh);
                        // $("#toolbar").css("top", h + 10 + "px");
                        $("#toolbar").css("left", "50%");
                        $("#toolbar").css("margin-left", -($("#toolbar").width() / 2) + "px");

                    } else {
                        console.log("resize toolbar >>")
                        $("#tools").css({ transform: 'scale(' + .9 + ')' });
                        $("#toolbar").css("height", 70 + "px");
                        $("#toolbar").css("width", w + "px");
                        $("#tools").css("top", "-10px");
                        tbh = 80;
                        // $("#toolbar").css("top", h - 20 + "px");
                        $("#toolbar").css("left", "50%");
                        $("#toolbar").css("margin-left", -($("#toolbar").width() / 2) + "px");


                    }

                    if (byWidth == true) {
                        $("#toolbar").css("top", $("canvas").height() - ($("#toolbar").height() * zRatio) + "px");

                    } else {
                        $("#toolbar").css("top", $(window).height() - ($("#toolbar").height() - 5) + "px");

                    }

                }, 200);

                $("#statusbar").css("top", 0 + "px");
                $("#statusbar").css("margin-left", 0 + "px");
                $("#statusbar").css("width", "100%");



                resizing = false;
            } else {
                // fullscreen mode - image overflows screen

                ch = $("canvas").height();
                var oh = screen.height;
                var ih = Window.innerHeight;
                var marginTop = 0;
                if (cw / w > ch / h) {
                    console.log("expand to height");
                    zRatio = h / ch;
                    var newcw = $("canvas").width() * zRatio;
                    $("canvas").css("width", newcw + "px");
                    console.log("width: " + w + " " + $("canvas").width())
                    var marginLeft = (w - $("canvas").width()) / 2;

                    $("canvas").css("margin-left", marginLeft + "px");
                    $("canvas").css("margin-top", 0 + "px");

                } else {
                    console.log("expand to fs width")
                    zRatio = w / cw;
                    var newch = $("canvas").height() * zRatio;

                    marginTop = ((h - $("canvas").height() * zRatio) / 2);
                    console.log("margin: " + marginTop)
                    $("canvas").css("margin-top", marginTop + "px");
                    $("canvas").css("margin-left", 0 + "px");


                }
               // zoomIt(zRatio);



                $("#toolbar").css("position", "absolute");
                $("#toolbar").css("z-index", "8000");
                $("#toolbar").css("margin-left", 0 + "px");
                var tbh = $("#toolbar").height();


                var tOffset = h * zRatio;


                $("#toolbar").css("width", "100%");

                setTimeout(function () {
                    if (w < 900) {
                        console.log("resize toolbar <600")
                        var tRatio = w / 900;
                        $("#tools").css({ transform: 'scale(' + tRatio + ')' });
                        $("#toolbar").css("height", 90 * tRatio + "px");
                        tbh = 90 * tRatio;
                        $("#tools").css("top", "-10px");
                        console.log(h + " " + tbh);
                        $("#toolbar").css("top", h - tbh + "px");

                    } else {
                        console.log("resize toolbar >>")
                        $("#tools").css({ transform: 'scale(' + 1 + ')' });
                        $("#toolbar").css("height", 80 + "px");
                        $("#tools").css("top", "0px");
                        tbh = 80;
                        $("#toolbar").css("top", h - tbh + "px");

                    }

                }, 0);

                $("#statusbar").css("top", 0 + "px");
                $("#statusbar").css("margin-left", 0 + "px");
                $("#statusbar").css("width", "100%");



            }
            console.log(zRatio);

            if ($("#bCardLayout").length > 0) {

                $("#bCardLayout").remove();
                gamePlay.getBcardLayout();
            }
        }

        setTimeout(function () {
            $("#loading").fadeOut(300);
        }, 500)
    }, 300);


}

//function stringifyCanvas(canvas) {
//    //array of the attributes not saved by default that I want to save
//    var additionalFields = ['selectable', 'uid', 'custom'];

//    sCanvas = JSON.stringify(canvas);
//    oCanvas = JSON.parse(sCanvas);
//    $.each(oCanvas.objects, function (n, object) {
//        $.each(additionalFields, function (m, field) {
//            oCanvas.objects[n][field] = canvas.item(n)[field];
//        });
//    });

//    return JSON.stringify(oCanvas);
//}


var checkSimulator = function () {
    if (window.navigator.simulator === true) {
        console.log('The orientation plugin is not available in the simulator.');
        return true;
    } else if (window.screen === undefined) {
        console.log('Orientation Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
        return true;
    } else {
        return false;
    }
}




// END_CUSTOM_CODE_home
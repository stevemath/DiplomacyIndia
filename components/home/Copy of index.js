'use strict';

app.home = kendo.observable({
    onShow: function() {init()},
    afterShow: function() {},
    refresh:function(){
        console.log("refresh");
clearCanvas();
    }
});
app.localization.registerView('home');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

var imgW = 698;
var imgH = 484;
var imgRatio = imgH / imgW;
var canvas;
var currRespStatus;
var currHover;
var zRatio;
var resizing;
var legendW = 250;
var legendH = 175;
var lsx;
var lsy;
var locales = [];
var isMobile;
var fullScreen = true;


var srcLocales = [{
        id: "dis-1",
        aType: "dis",
        x: 180,
        y: 100,
        state: "locked"
    }, {
        id: "dis-2",
        aType: "dis",
        x: 700,
        y: 400,
        state: "locked"
    }, {
        id: "dip-1",
        aType: "dip",
        x: 475,
        y: 425,
        state: "ready",
        rr: 3,
        unlocks: ["dis-1", "dip-2"]
    }, {
        id: "dip-2",
        aType: "dip",
        x: 610,
        y: 130,
        state: "locked",
        unlocks: ["dis-2"]
    },

]

var questions = [{
        id: 1,
        localeId: "dip-1",
        intro: "Meet with China's Minister of Agriculture to Discuss Farming Policies",
        q: "While meeting with the diplomat, you decide to show off your knowledge of China by mentioning that the Yangtze is the longest river in:",
        answers: [{
            id: 1,
            text: "Western China",
            correct: 0
        }, {
            id: 2,
            text: "Asia",
            correct: 1
        }, {
            id: 3,
            text: "The World",
            correct: 0
        }, ],
        incorrectResponse: {
            title: "OOPS!",
            text: "No, the Yangtze is the longest river in Asia! You lost face by revealing your lack of knowledge about China.",
            subtext: "",
            bullets: ["The minister of agriculture decides not to introduce you to anyone new.", "U.S. China Relations worsen by 2 points"]
        },
        correctResponse: {
            title: "YES!",
            text: "The Yangtze is the longest river in Asia! The Minister of Agriculture is impressed with your knowledge of his country.",
            subtext: "He introduces you to the Chairman of the History & Culture Committee.",
            bullets: []
        },
        points: 2,
    },

    {
        id: 2,
        localeId: "dip-2",
        intro: "Meet with China's Minister of the Interior Discuss Trade Policies",
        q: "While meeting with the diplomat, you decide to show off your knowledge of China by mentioning that the Yangtze is the longest river in:",
        answers: [{
            id: 1,
            text: "Western China",
            correct: 0
        }, {
            id: 2,
            text: "Asia",
            correct: 1
        }, {
            id: 3,
            text: "The World",
            correct: 0
        }, ],
        incorrectResponse: {
            title: "OOPS!",
            text: "No, the Yangtze is the longest river in Asia! You lost face by revealing your lack of knowledge about China.",
            subtext: "",
            bullets: ["The minister of agriculture decides not to introduce you to anyone new.", "U.S. China Relations worsen by 2 points"]
        },
        correctResponse: {
            title: "YES!",
            text: "The Yangtze is the longest river in Asia! The Minister of Agriculture is impressed with your knowledge of his country.",
            subtext: "He introduces you to the Chairman of the History & Culture Committee.",
            bullets: []
        },
        points: 2,
    }
]
var topics = [{
    id: 1,
    localeId: "dis-1",
    img: "great-wall.jpg",
    intro: "Go See the Great Wall of China",
    info: "",
    facts: [{
        text: "The Great Wall of China was built to protect against raids and invasions from nomadic groups to the east."
    }, {
        text: "Some parts of the wall are 2700 years old!"
    }],
    points: 2
}, {
    id: 2,
    localeId: "dis-2",
    img: "great-wall.jpg",
    intro: "Go See the Great Wall of China",
    info: "",
    facts: [{
        text: "The Great Wall of China was built to protect against raids and invasions from nomadic groups to the east."
    }, {
        text: "Some parts of the wall are 2700 years old!"
    }],
    points: 2
}]
var shadow = {
    color: 'rgba(0,0,0,0.8)',
    blur: 7,
    offsetX: 3,
    offsetY: 3,
    opacity: 0.7,
    fillShadow: true,
    strokeShadow: true
}


var init = function() {

 $("html, body").css("overflow", "hidden");
    console.log(checkSimulator());
    if(checkSimulator() == false){
window.screen.lockOrientation('landscape');
    }
  locales = [];
  locales = JSON.parse(JSON.stringify(srcLocales));;
           

    $("canvas").empty();
    console.log("init");
    canvas = new fabric.Canvas('chinaCanvas');
    console.log("canvas init");
     $("canvas").attr("width", 950);
     $("canvas").attr("height", 680);
console.log(locales);

    createLocales();

    

    initEvents();
};


 function clearCanvas() {
          
            var objs = canvas.getObjects();
            console.log(objs.length);
           

            canvas.clear();
            canvas.dispose();
            locales = [];
            setTimeout(function () {
                console.log(canvas.getObjects());
                console.log(locales);
                 $("canvas").attr("width", 950);
     $("canvas").attr("height", 680);
                init();
            }, 0);

        }


function initEvents() {

 $(window).resize(function() {
        resizeCanvas();
    });

   if (kendo.support.mobileOS.device == undefined) {
                isMobile = false;
    canvas.on('mouse:over', function(e) {
        // console.log(e.target)
        var item = e.target;

        if (item && item.id) {
            var loc = getLocaleById(item.id);
            if (loc != null && loc.state && loc.state == "ready") {
                currHover = e.target.fill;
                e.target.set('fill', '#216619');
                e.target.hoverCursor = 'pointer';
                canvas.renderAll();
            } else {
                e.target.hoverCursor = 'default';
            }
        } else {
            if (e.target) {
                e.target.hoverCursor = 'default';
            }
        }
    });

    canvas.on('mouse:out', function(e) {
        if (currHover != "" && currHover != undefined) {
            e.target.set('fill', currHover);
            canvas.renderAll();
            currHover = "";
        }
    });

   }
    canvas.on('mouse:down', function(options) {
        console.log("canvas click")
        if (options.target) {
            var id = options.target.id;
            console.log(id)

            // get item data

            if (id != undefined) {

                var item = getLocaleById(id)
                    // console.log(item);

                if (item && item.hasOwnProperty("unlocks") && item.unlocks.length > 0 && item.state == "ready") {
                    drawLines(item, item.unlocks);
                    getDiplomacy(id)

                }

                if (item.aType == "dis" && item.state == "ready") {

                    getDiscovery(id)

                }

            }
        }
    });

    $(".close-legend").on("click", function() {
        $(".legend-content").hide();
        $(".show-legend").fadeIn();
    });

    $(".show-legend").on("click", function() {
        $(".legend-content").fadeIn();
        $(".show-legend").hide();
    });

    $(".panel-hide").on("click", function() {
        console.log("slide up");
        kendo.fx($("#statusWrapper")).slideIn("down").reverse();
        $(".panel-hide").hide();
        $(".panel-show").show();

    });

    $(".panel-show").on("click", function() {
        console.log("slide down");
        kendo.fx($("#statusWrapper")).slideIn("down").play();
        $(".panel-hide").show();
        $(".panel-show").hide();

    });
 $(".reset").off();
    $(".reset").on("click", function() {

        app.home.refresh();

    });
    setBadges();

}

function setBadges() {

    $.each($(".tool-item"), function(idx, item) {

        item = $(item);
        var num = item.data("badge");
        if (idx == 0) {

            var bHtml = "<div class='badge long' >" + num + "</div>";
            item.append(bHtml)
        } else {

            var bHtml = "<div class='badge' >" + num + "</div>";
            item.append(bHtml)
        }

    });

}

function getDiplomacy(id) {

    var qData = [getQDataById(id)];

    var templateContent = $("#diplomacyTemplate").html();
    var template = kendo.template(templateContent);
    var result = kendo.render(template, qData);

    $("body").prepend(result);
    // $("body").append("<div class='modal' ></div>");

    var w = $(window).width();
    var h = $(window).height();
    var dw = $(".diplomacy-container").width();
    var dh = $(".diplomacy-container").height();
    //  console.log(w + " " + h + " " + dw + " " + dh)
    if (w < dw + 100 || h < dh + 100) {

        var wr = (dw + 100) / w;
        var hr = (dh + 100) / h;
        var scale;
        if (hr > wr) {
            scale = 1 / hr;
        } else {
            scale = 1 / wr;
        }

        console.log(wr + " " + hr)

        $(".diplomacy-container").css("transform", "scale(" + scale + ") ")
        setTimeout(function() {
            var ml = -(w - $(".diplomacy-container").width()) / 2;
            var mt = (h - $(".diplomacy-container").height()) / 2;
            // $(".diplomacy-container").css("top", mt + "px");
            //$(".diplomacy-container").css("left", ml + "px");
            // $(".diplomacy-container").css("margin-left", ml + "px");
        }, 300)
    }

    var ml = -($(".diplomacy-container").width()) / 2;
    var mt = (h - $(".diplomacy-container").height()) / 2;
    $(".diplomacy-container").css("top", mt + "px");
    $(".card-wrapper").css("left", "50%");
    $(".diplomacy-container").css("margin-left", ml + "px");

    $(".dip-btn").on("click", function(e) {

        evalDipResp(e)
    });

    $(".cancel").on("click", function() {

        $(".diplomacy-container").fadeOut(200, function() {
            $(".diplomacy-container").remove();
        });
        var locale = getLocaleById(id)
        var lineNum = locale.unlocks.length;

        for (var i = 0; i < lineNum; i++) {
            //
            var line = selectObject(id + "-line-" + i);
            line.remove();
        }

        canvas.renderAll();
    });

    $(".accept").on("click", function() {

        kendo.fx($(".diplomacy-container")).flip("horizontal", $(".dip-front"), $(".dip-back")).duration(1000).play();

    });

    $(".continue").on("click", function() {

        $(".diplomacy-container").fadeOut(200, function() {
            $(".diplomacy-container").remove();
        });

        updateRoutes(id, currRespStatus)

    });

    // $("canvas").hide();

}

function getDiscovery(id) {

    var tData = [getTDataById(id)];

    var templateContent = $("#discoveryTemplate").html();
    var template = kendo.template(templateContent);

    // console.log(tData);

    var result = kendo.render(template, tData);

    $("body").prepend(result);

    var w = $(window).width();
    var h = $(window).height();
    var dw = $(".discovery-container").width();
    var dh = $(".discovery-container").height();
    console.log(w + " " + h + " " + dw + " " + dh)
    if (w < dw + 100 || h < dh + 100) {

        var wr = (dw + 100) / w;
        var hr = (dh + 100) / h;
        var scale;
        if (hr > wr) {
            scale = 1 / hr;
        } else {
            scale = 1 / wr;
        }

        console.log(wr + " " + hr)

        $(".discovery-container").css("transform", "scale(" + scale + ") ")
        setTimeout(function() {
            var ml = -(w - $(".discovery-container").width()) / 2;
            var mt = (h - $(".discovery-container").height()) / 2;

        }, 300)
    }

    var ml = -($(".discovery-container").width()) / 2;
    var mt = (h - $(".discovery-container").height()) / 2;
    $(".discovery-container").css("top", mt + "px");
    $(".card-wrapper").css("left", "50%");
    $(".discovery-container").css("margin-left", ml + "px");

    $(".discovery-container").fadeIn();
    $(".dis-back").css("background-image", "url('images/system/" + tData[0].img + "')")

    $(".cancel").on("click", function() {

        $(".discovery-container").fadeOut(200, function() {
            $(".discovery-container").remove();
        });

    });

    $(".accept").on("click", function() {

        kendo.fx($(".discovery-container")).flip("horizontal", $(".dis-front"), $(".dis-back")).duration(1000).play();

    });

    $(".continue").on("click", function() {

        $(".discovery-container").fadeOut(200, function() {
            $(".discovery-container").remove();
        });

        updateDiscovery(id);

        // updateRoutes(id, currRespStatus)

    });

}

function updateDiscovery(id) {
    var src = selectObject(id);
    src.set("stroke", "#309060");
    src.set("strokeWidth", 2);
    canvas.renderAll();
}

function updateRoutes(id, correct) {

    var currL = getLocaleById(id);
    var src = selectObject(id);

    $.each(currL.unlocks, function(idx, item) {
        console.log(item)
        var line = selectObject(id + "-line-" + idx);

        if (correct == 1) {
            line.set("stroke", "#80ee80");
            var loc = selectObject(item);
            currL.state = "success";
            var locText = selectObject(item + "-state");
            loc.set("fill", "#ff9900");

            locText.set("text", "");
            getLocaleById(item).state = "ready";

            src.set("fill", "#2a8d1c")

        } else {
            line.set("stroke", "#202020");
            src.set("fill", "#404040")
            currL.state = "fail";
        }
    })

    canvas.renderAll()

}

function evalDipResp(e) {
    var correct = $(e.target).data().corr;
    if (correct == 1) {
        $(".q-wrapper").hide();
        $(".corr-resp").show();
        $(".resp-wrapper").fadeIn();
        currRespStatus = 1;
    } else {
        $(".q-wrapper").hide();
        $(".incorr-resp").show();
        $(".resp-wrapper").fadeIn();
        currRespStatus = 0;
    }

}

function createLocales() {
canvas.selection = false;
//scale map
 var bkgrdImg = fabric.Image.fromURL('images/system/china-map.png', function(oImg) {
        if (oImg.width / $("canvas").width() > oImg.height / $("canvas").height()) {

            oImg.height = $("canvas").height();
            oImg.width = oImg.height * (imgW / imgH);
        } else {
            oImg.width = $("canvas").width();
            oImg.height = oImg.width * imgRatio;

        }
        canvas.add(oImg);
        oImg.set('selectable', false);
        oImg.sendToBack();
    });


    $.each(locales, function(idx, item) {

        var stateOffsetY = 0;

        if (item.aType == "dis") {
            var circle = new fabric.Circle({
                id: item.id,
                radius: 25,
                fill: '#effa6e',
                shadow: shadow,
                left: item.x,
                top: item.y
            });

            canvas.add(circle);
            circle.bringToFront();
            circle.moveTo(10);
            // circle.set('selectable', false);
            circle.hasControls = false;
            circle.hasBorders = false;
            circle.hoverCursor = "pointer";
            circle.lockMovementX = true;
            circle.lockMovementY = true;
        }

        if (item.aType == "dip") {
            var triangle = new fabric.Triangle({
                id: item.id,
                width: 43,
                height: 60,
                stroke: "black",
                strokeWidth: 3,
                fill: '#effa6e',
                left: item.x,
                top: item.y
            });

            canvas.add(triangle);
            triangle.bringToFront();
            triangle.moveTo(10);
            triangle.hasControls = false;
            triangle.hasBorders = false;
            triangle.hoverCursor = "pointer";
            triangle.lockMovementX = true;
            triangle.lockMovementY = true;
            // triangle.set('selectable', false);

            stateOffsetY = 15;
            if (item.state == "ready") {
                triangle.set("fill", "#ff9900");
            }
        }

        if (item.state == "locked") {

            var text = new fabric.Text('?', {
                id: item.id + "-state",
                fontSize: 25,
                fontWeight: "bold",
                stroke: "#202020",
                shadow: 'rgba(255,255,255,0.9) 1px 1px 3px',
                left: item.x + 16,
                top: item.y + 10 + stateOffsetY
            });
            canvas.add(text);
            text.hasControls = false;
            text.hasBorders = false;
            text.lockMovementX = true;
            text.lockMovementY = true;
        }

    });
   
        resizeCanvas();
    

}

function getLocaleById(id) {

    var i = $.grep(locales, function(obj, idx) {
        return obj.id == id;
    });

    if (i.length > 0) {
        var item = i[0];
        return item;
    } else {
        return null;
    }

}

function getQDataById(id) {

    var i = $.grep(questions, function(obj, idx) {
        return obj.localeId == id;
    });

    if (i.length > 0) {
        var item = i[0];
        return item;
    } else {
        return null;
    }

}

function getTDataById(id) {

    var i = $.grep(topics, function(obj, idx) {
        return obj.localeId == id;
    });

    if (i.length > 0) {
        var item = i[0];
        return item;
    } else {
        return null;
    }

}

function drawLines(src, targets) {
    canvas.renderAll();
    $.each(targets, function(idx, itemId) {

        var targObj = selectObject(itemId);
        var srcObj = selectObject(src.id);

        // src.state = "success";

        var srcOffX = 0;
        var srcOffY = 0;
        //  console.log(srcObj)
        zRatio = $("canvas").width() / 950;

        // if (zRatio > 1) {
        srcOffX = (srcObj.width * zRatio) / 2;
        srcOffY = (srcObj.height * zRatio) / 2;
        //}

        var line = new fabric.Line([srcObj.left + srcOffX, srcObj.top + srcOffY, srcObj.left + srcOffX, srcObj.top + srcOffY], {
            left: targObj.left + srcOffX,
            top: targObj.top + srcOffY,
            strokeWidth: 10,
            stroke: '#efda2e',
            opacity: .8,
            strokeDashArray: [15, 5],
            id: src.id + "-line-" + idx
        });

        canvas.add(line);
        line.moveTo(1);
        line.set('selectable', false);
        //   console.log(zRatio)
        var offX = 0; //(targObj.width * zRatio) / 2;
        var offY = 0; // (targObj.height * zRatio) / 2 ;

        // if (zRatio > 1) {
        offX = (targObj.width * zRatio) / 2;
        offY = (targObj.height * zRatio) / 2;
        // }

        line.animate("x2", targObj.left + offX, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000,
        });
        line.animate("y2", targObj.top + offY, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000,
        })
    })

    setTimeout(function() {
        $(".diplomacy-container").fadeIn();
    }, 1200);

}

var selectObject = function(ObjectName) {
    var obj = null;

    canvas.getObjects().forEach(function(o) {

        if (o.id === ObjectName) {
            // canvas.setActiveObject(o);
            obj = o;
        }

    });

    return (obj);
}

function zoomIt(factor) {

    canvas.setHeight(canvas.getHeight() * factor);
    canvas.setWidth(canvas.getWidth() * factor);
    if (canvas.backgroundImage) {
        // Need to scale background images as well
        var bi = canvas.backgroundImage;
        bi.width = bi.width * factor;
        bi.height = bi.height * factor;
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

function resizeCanvas() {
    resizing = true;
    var w = $(window).width(); //window.innerWidth; 
    var h = $(window).height(); //window.innerHeight; 

    console.log(w + " x " + h)
    var cw = $("canvas").width();
    var ch = $("canvas").height() + 55;

            if (fullScreen == false) {
          
    if (cw / w > ch / h) {
        // adjust by width
        // console.log("width");
        zRatio = w / cw;
        zoomIt(zRatio);

        var marginTop = (h - $("canvas").height()) / 2;
        $("canvas").css("margin-top", marginTop + "px");
        $("canvas").css("margin-left", 0 + "px");

        $("#toolbar").css("margin-left", 0 + "px");
        $("#toolbar").css("top", marginTop + "px");

        $("#statusbar").css("top", marginTop + "px");
        $("#statusbar").css("margin-left", 0 + "px");

        $("#legend").css("transform-origin", "0% 100%")
        var scale = $("canvas").width() / 950;
        $("#legend").css("transform", "scale(" + scale + ")");
        $("#legend").css("left", 50 * scale + "px");

        $("#legend").css("top", marginTop + (170 * scale) + "px");
    } else {
        // adjust by height
        // console.log("height");
        zRatio = h / ch;

        zoomIt(zRatio);

        var marginLeft = (w - $("canvas").width()) / 2;
        $("canvas").css("margin-left", marginLeft + "px");
        $("canvas").css("margin-top", 0 + "px");

        $("#toolbar").css("top", 0 + "px");
        $("#toolbar").css("margin-left", marginLeft + "px");

        $("#statusbar").css("top", 0 + "px");
        $("#statusbar").css("margin-left", marginLeft + "px");

        $("#legend").css("transform-origin", "0% 100%")
        var scale = $("canvas").height() / 680;
        $("#legend").css("transform", "scale(" + scale + ")");

        $("#legend").css("left", marginLeft + (50 * scale) + "px");
        // $("#legend").css("bottom",  (110 * scale) + "px");
        $("#legend").css("top", (210 * scale) + "px");
    }

    $("#toolbar").css("width", cw * zRatio + "px");
    $("#statusbar").css("width", cw * zRatio + "px");
    resizing = false;
            }else{
  // fullscreen mode - image overflows screen

                ch = $("canvas").height();
                var oh = Window.outerHeight;//
var ih = Window.innerHeight;
                var marginTop = 0;
                if (cw / w > ch / oh) {
                    console.log("expand to height");
                    zRatio = h / ch;

                    console.log("width: "  + w + " " + $("canvas").width())
                    var marginLeft = (w - $("canvas").width()) / 2;
                    console.log(marginLeft);
                    $("canvas").css("margin-left", -marginLeft + "px");
                    $("canvas").css("margin-top", 0 + "px");

                } else {
                    console.log("expand to width")
                    zRatio = w / cw;
                     marginTop = ((h - $("canvas").height()* zRatio) / 2) ;
console.log("margin: " + marginTop)
                    $("canvas").css("margin-top", marginTop + "px");
                    $("canvas").css("margin-left", 0 + "px");


                }
                zoomIt(zRatio);


                console.log(oh)

                $("#toolbar").css("position", "absolute");
                $("#toolbar").css("z-index", "8000");
                $("#toolbar").css("margin-left", 0 + "px");
                $("#toolbar").css("top",h-30+ "px");
               
                $("#toolbar").css("width", "100%");


                $("#statusbar").css("top", 0 + "px");
                $("#statusbar").css("margin-left", 0 + "px");
                $("#statusbar").css("width", "100%");

                $("#legend").css("bottom", "250px");
                $("#legend").css("transform-origin", "0% 100%")
                var scale = $("canvas").width() / 950;
                $("#legend").css("transform", "scale(" + scale + ")");
                $("#legend").css("left", 50 * scale + "px");

                //$("#legend").css("bottom", -marginTop + (150 * scale) + "px");

            }
}

 var checkSimulator= function () {
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
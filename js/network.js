var network = {
    networkCanvas: null,
    showNetwork: function () {
        $(".messagebar").remove();

        this.getNetworkImgDim(imgDir, bkgrdImg);
    },
    getNetworkImgDim: function (dir, file) {
        var self = this;
       
      //  var cHtml = ' <div class="network-container"><canvas id="networkmap" width="950" height="680" ></canvas></div>';
        //$(".network-container").prepend(cHtml);
        // $("#network").empty();


        console.log(configData.gameData.unlockedList);
        //console.log(configData.gameData.unlockedList.data().length);

        var disComplete = configData.gameData.viewedFacts.data().length;
        var dipComplete = configData.gameData.activityNum - disComplete;



        var template = kendo.template($("#networkTemplate").html());
        var networkData = {
            dipComplete: dipComplete,
            dipUnlocked: configData.gameData.unlockedDip,
            dipUnknown: configData.gameData.unknownDip,
            disComplete: disComplete,
            disUnlocked: configData.gameData.unlockedDis,
            disUnknown: configData.gameData.unknownDis,
        }
        
        var networkHtml = kendo.render(template, [networkData]);
       
        $("body").append(networkHtml);

      //  self.getImgDim(imgDir, bkgrdImg);

       
        // configData.gameData.disUnknown
             kendo.bind($("#networkTotals"), configData.gameData)
       

        $("#networkmap").attr("width", imgW);
        $("#networkmap").attr("height", imgH)

        this.loadNetworkCanvas(dir, file, imgW, imgH)

        $(".close-network").on("click touchend", function () {

            self.networkCanvas.clear();
           self.networkCanvas.dispose();
           self.networkCanvas = null;
           setTimeout(function () {
               $("#networkmap").empty();
               $(".network-container").remove();
               $("#networkTotals").remove();
               $("#networkScrim").remove();
           }, 500);
        })

    },
    loadNetworkCanvas: function (dir, file, w, h) {
        var self = this;
        // var app = new kendo.mobile.Application();

        console.log("init: " + " " + w + " " + h);
        this.networkCanvas = new fabric.Canvas('networkmap');

        console.log(file);
        var newNetBkgrdImg = fabric.Image.fromURL(dir + file, function (oImg) {
            oImg.width = w;
            oImg.height = h;
            self.networkCanvas.add(oImg);
            oImg.set('selectable', false);
            oImg.sendToBack();
            self.networkCanvas.renderAll();
            console.log("img loaded");
        });


       
      

        setTimeout(function () {
            self.createNetworkLocales();
        }, 0);

    },
    createNetworkLocales: function () {
       
        var self = this;
        console.log("create network points");
        playAudio(audioList.career)
        //  locales = vmLocales.locales;

        // console.log(locales)

        var cRadius = 15;
        var triH = 30;
        var triW = 28;
        var sqW = 25;
        if ($(window).width() < 750) {
            cRadius = 25;

            triH = 43;
            triW = 41;

            sqW = 40;
        }

        // console.log(locales);
        var count;
        $.each(locales, function (idx, item) {
            count = idx;
            var stateOffsetY = 0;
            var stateOffsetX = 0;
            item.x = parseInt(item.x);
            item.y = parseInt(item.y);


            var opacity = 1;
            var calState = "hide";

            if (item.diploResult || item.discResult || item.state == "ready") {


                if ((item.discResult && item.discResult != "retired") || item.state == "ready") {
                    if (item.aType == "dis") {
                        var circle = new fabric.Circle({
                            id: "NET-" + item.Id, radius: cRadius, shadow: shadow, left: item.x - cRadius, top: item.y - cRadius,

                        });

                        circle.set("stroke", "#202020");
                        circle.set("strokeWidth", 3);
                        self.networkCanvas.add(circle);
                        circle.bringToFront();

                        circle.hasControls = false;
                        circle.hasBorders = false;
                        circle.lockMovementX = true;
                        circle.lockMovementY = true;
                        circle.originX = "center";
                        circle.originY = "center";

                        circle.setGradient('fill', disGradientReady)



                        // circle.opacity = opacity;


                    }
                }


                if ((item.diploResult && item.diploResult != "retired") || item.state == "ready") {

                    if (item.aType == "dip") {

                        if (item.rr == "high") {
                            var triangle = new fabric.Triangle({
                                id: "NET-" + item.Id, width: triW, shadow: shadow, height: triH, stroke: "black", strokeWidth: 3, left: item.x - triW / 2, top: item.y - triH / 2
                            });

                            self.networkCanvas.add(triangle);
                            triangle.bringToFront();
                            // triangle.moveTo(10);
                            triangle.hasControls = false;
                            triangle.hasBorders = false;
                            // triangle.hoverCursor = "pointer";
                            triangle.lockMovementX = true;
                            triangle.lockMovementY = true;

                            triangle.originX = "center";
                            triangle.originY = "center";

                            // triangle.set('selectable', false);

                            //stateOffsetY = 15;
                            triangle.setGradient('fill', dipGradientReady);

                            if (item.diploResult == 1) {
                                triangle.setGradient('fill', dipGradientSuccess);
                            }

                            if (item.diploResult == 0) {
                                triangle.setGradient('fill', dipGradientFail);
                                triangle.stroke = "#990000";
                            }

                            //  triangle.opacity = opacity;

                            //}
                        }
                        if (item.rr == "low") {
                            // console.log(item.x);

                            var sqr = new fabric.Rect({
                                id: "NET-" + item.Id, originX: "center", originY: "center", width: sqW, height: sqW, shadow: shadow, stroke: "black", strokeWidth: 3, left: item.x, top: item.y - sqW / 2
                            });

                            self.networkCanvas.add(sqr);
                            sqr.bringToFront();
                            // sqr.moveTo(10);
                            sqr.hasControls = false;
                            sqr.hasBorders = false;
                            //  sqr.hoverCursor = "pointer";
                            sqr.lockMovementX = true;
                            sqr.lockMovementY = true;
                            // sqr.state = item.state;
                            //  sqr.initState = item.state;
                            //  sqr.aType = item.aType;
                            sqr.originX = "center";
                            sqr.originY = "center";

                            sqr.centeredRotation = true;
                            sqr.angle = 45;

                            // sqr.rr = "low";
                            sqr.setGradient('fill', dipGradientReady)

                            if (item.diploResult == 1) {
                                sqr.setGradient('fill', dipGradientSuccess);
                            }

                            if (item.diploResult == 0) {
                                sqr.setGradient('fill', dipGradientFail);
                                sqr.stroke = "#990000";
                            }
                            // sqr.opacity = opacity;

                            // }


                        }
                    }
                }

            } else {
                if (item.aType == "dip") {
                    configData.gameData.set("unknownDip", configData.gameData.unknownDip + 1);
                } else {
                    configData.gameData.set("unknownDis", configData.gameData.unknownDis + 1);
                }

                var text = new fabric.Text('?', { id: "NET-" + item.id + "-state", fontSize: 25, fontWeight: "bold", stroke: "#202020", shadow: 'rgba(255,255,255,0.9) 1px 1px 3px', left: item.x, top: item.y });
               
                text.hasControls = false;
                text.hasBorders = false;
                text.lockMovementX = true;
                text.lockMovementY = true;
                text.originX = "center";
                text.originY = "center";

               self.networkCanvas.add(text);

            }
        });




        console.log("count: " + count);
       
       
        setTimeout(function () {
            self.resizeNetwork();
            setTimeout(function(){
                self.drawNetwork();
            },300)
        }, 100);


    },
    drawNetwork: function () {
        var self = this;
        console.log(configData.gameData.unlockedList)
        var arrNetwork = configData.gameData.unlockedList.data().toJSON();

        $.each(arrNetwork, function (idx, item) {
            setTimeout(function () {
                self.drawLine(item.src, item.targ)
            }, idx * 300)
        })


    },

    drawLine: function (src, target) {

        var self = this;
        // console.log(src)

        var srcObj = selectObject(src);


        var targetId = target;
        var targObj = selectObject(targetId);

        // src.state = "success";
        console.log(targetId)
        console.log(targObj)


        var srcOffX = 0;
        var srcOffY = 0;

        console.log(srcObj)
        console.log(targObj)
        //zRatio = $("#network").width() / 950;




        if (srcObj.rr == "high") {
            srcOffX = 0//(srcObj.width * zRatio) / 2;
            srcOffY = 0//(srcObj.height * zRatio) / 2;
        } else {
            srcOffX = 0;
            srcOffY = 0;
        }
        console.log(targObj)
        console.log(srcOffX);

        console.log(srcObj.left + " " + srcObj.top)

        var line = new fabric.Line([srcObj.left + srcOffX, srcObj.top + srcOffY, srcObj.left + srcOffX, srcObj.top + srcOffY], {
            left: targObj.left* .83 + srcOffX,
            top: targObj.top * .83 + srcOffY,
            strokeWidth: 10,
            stroke: '#000000',
            opacity: .95,
            strokeDashArray: [15, 5],
            // id: src.Id + "-line-" + idx
        });

        self.networkCanvas.add(line);
        line.moveTo(1);
        line.set('selectable', false);
        //   console.log(zRatio)
        var offX = 0; //(targObj.width * zRatio) / 2;
        var offY = 0;// (targObj.height * zRatio) / 2 ;

        // if (zRatio > 1) {
        //  offX = (targObj.width * zRatio) / 2;
        // offY = (targObj.height * zRatio) / 2;
        // }

        if (targObj.rr && targObj.rr == "low") {
            // offX = offX - 20;
        }
        //targObj.left*.93 + offX


        //var y1s = srcObj.top + srcOffY;
        //var y1t = targObj.top + offY;
        //var x1s = srcObj.left + srcOffX;
        //var x1t = targObj.left + offX;

        //var angle = Math.atan2(y1s - y1t, x1s - x1t) * 180 / Math.PI - 90;
        //line.set("angle", angle);
        //line.animate("x2", (srcObj.left + srcOffX) + ((targObj.left + offX) - (srcObj.left + srcOffX)) * .95 + 1, {
        //    onChange: self.networkCanvas.renderAll.bind(self.networkCanvas),
        //    duration: 250,
        //});


        line.animate("x2", targObj.left + offX  , {
            onChange: self.networkCanvas.renderAll.bind(self.networkCanvas),
            duration: 250,
        });

        //targObj.top*.93 + offY
        //line.animate("y2", (srcObj.top + srcOffY) + ((targObj.top + offY) - (srcObj.top + srcOffY)) * .95, {
        //    onChange: self.networkCanvas.renderAll.bind(self.networkCanvas),
        //    duration: 250,
        //})

        line.animate("y2", targObj.top + srcOffY , {
            onChange: self.networkCanvas.renderAll.bind(self.networkCanvas),
            duration: 250,
        })

        setTimeout(function () {
            var y11 = srcObj.top + srcOffY;
            var y12 = targObj.top + offY;
            var x11 = srcObj.left + srcOffX;
            var x12 = targObj.left + offX;

            var a = Math.atan2(y11 - y12, x11 - x12) * 180 / Math.PI - 90;
            line.arrow = new fabric.Triangle({
                left: (srcObj.left + srcOffX) + ((targObj.left + offX) - (srcObj.left + srcOffX)) * .95 + 2,
                top: (srcObj.top + srcOffY) + ((targObj.top + offY) - (srcObj.top + srcOffY)) * .95 + 3,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                pointType: 'arrow_start',
                angle: a,
                opacity: .9,
                width: 36,
                height: 30,
                fill: '#000000'
            });

            self.networkCanvas.add(line.arrow);
            line.set('selectable', false);
            line.arrow.set('selectable', false);

        }, 250);



    },
    resizeNetwork: function () {
        var self = this;
        var hMenuOffset = 45;
        var vOffset = 75;
        var zRatio;
        var w = $(window).width(); //window.innerWidth; 
        var h = $(window).height() - hMenuOffset; //window.innerHeight; 
        if (w > 1000) {
           // workingH = 635;
            // workingH = 875;
        }
        var ofh = (imgH - workingH) / 2;
        var ofw = (imgW - workingW) / 2;
        ofh = 10;
        //console.log(ofw)

        setTimeout(function () {

            if (resizing == false) {
                resizing = true;
                $(document.body).height(window.innerHeight);


                var acw = $("#networkmap").width();
                var ach = $("#networkmap").height();
                var cw = workingW; //$("canvas").width();
                var ch = workingH; //$("canvas").height() + 55;



                //  console.log(cw + " x " + ch);


                var byWidth;
                if (cw / w > ch / h) {
                    // adjust by width
                    console.log("adjust to width");
                    byWidth = true;
                    zRatio = w / cw;
                    self.zoomNetwork(zRatio);
                    $("#networkmap").css("margin-left", -ofw * zRatio + "px");


                    var marginTop = (h - $("#networkMap").height()) / 2 ;
                    // $("canvas").css("margin-top", marginTop + "px");
                    // fix canvas to top
                    $("#networkmap").css("margin-top", 0 + vOffset + "px");

                } else {
                    // adjust by height
                    console.log("adjust to height");
                    zRatio = h / ch;

                    self.zoomNetwork(zRatio);

                    var marginLeft = (w - $("#networkmap").width()) / 2;
                    $("#networkmap").css("margin-left", marginLeft + "px");
                    $("#networkmap").css("margin-top", -ofh * zRatio +50  +"px");
                }

               // $("#networkTotals").css("transform", "scale(" + zRatio + ") ");

                resizing = false;
                console.log(zRatio);
                netRatio = zRatio;

            }


        }, 100);


    },

    zoomNetwork: function (newfactor) {
        var self = this;
        var factor;

        factor = newfactor / 1;
        currentFactor = newfactor;


        console.log("factor: " + factor)
        console.log("current factor: " + newfactor);

        self.networkCanvas.setHeight(self.networkCanvas.getHeight() * factor);
        self.networkCanvas.setWidth(self.networkCanvas.getWidth() * factor);

        if (self.networkCanvas.backgroundImage) {
            // Need to scale background images as well
            console.log("has bkgrd img");
            var bi = self.networkCanvas.backgroundImage;
            bi.width = bi.width * factor; bi.height = bi.height * factor;
        }

        var objects = self.networkCanvas.getObjects();
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
        self.networkCanvas.renderAll();
        self.networkCanvas.calcOffset();
    }
}
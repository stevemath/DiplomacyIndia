var locales = [];
var canvas;
var jsonCanvas;
var imgH;
var imgW;

var localesMgmt = {
    showExpLocales:false,
    selectedTarget:null,
    replaceLocale: function (targObj) {
        var self = this;
        console.log('replace');
        console.log(targObj)
       // if (targObj.rr) {

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
            self.removeGlow(targObj);
            //if (targObj.rr == "low") {
            //    var triangle = new fabric.Triangle({
            //        id: targObj.Id, width: triW, shadow: shadow, height: triH, stroke: "black", strokeWidth: 3, left: targObj.x  , top: targObj.y 
            //    });



            //    triangle.id = targObj.id;
            //    triangle.hasControls = false;
            //    triangle.hasBorders = false;
            //    triangle.hoverCursor = "pointer";
            //    triangle.lockMovementX = true;
            //    triangle.lockMovementY = true;
            //    triangle.state = "ready";
            //    triangle.originX = "center";
            //    triangle.originY = "bottom";
            //    triangle.unlocks = triangle.unlocks;
            //    triangle.contentId = triangle.contentId;
            //    triangle.strokeWidth = targObj.strokeWidth;
            //    //triangle.height = triH * targObj.scaleY;
            //    //triangle.width = triW * targObj.scaleX;

            //    triangle.height = triH;//* targObj.scaleY;
            //    triangle.width = triW; // * targObj.scaleX;
            //    triangle.centeredRotation = true;
                
            //    triangle.left = targObj.left - sqW/2;
            //    triangle.top = targObj.top + sqW;
            //    triangle.rr = "high";
            //    triangle.state = "ready";
            //    triangle.setGradient('fill', dipGradientReady)
            //    triangle.unlockable = targObj.unlockable;

            //    triangle.opacity = 1;
            //    triangle.scaleX = targObj.scaleX;
            //    triangle.scaleY = targObj.scaleY;


            //    canvas.remove(targObj);
            //    canvas.insertAt(triangle, 50, false);
            //    triangle.zoomX = targObj.zoomX;
            //    triangle.zoomY = targObj.zoomY;
            //    triangle.bringToFront();
            //    triangle.moveTo(10);
            //    self.createGlow(triangle)
                
            //}
           // if (targObj.rr == "high") {
                 console.log("create low rr");

                var sqr = new fabric.Rect({
                    id: targObj.Id, width: sqW, height: sqW, shadow: shadow, stroke: "black", strokeWidth: 3, left: targObj.x, top: targObj.y 
                });


                sqr.id = targObj.id;
                sqr.hasControls = false;
                sqr.hasBorders = false;
                sqr.hoverCursor = "pointer";
                sqr.lockMovementX = true;
                sqr.lockMovementY = true;
                sqr.state = "ready";
                sqr.originX = "center";
                sqr.originY = "center";
                sqr.unlocks = sqr.unlocks;
                sqr.contentId = sqr.contentId;
                sqr.strokeWidth = targObj.strokeWidth;
                sqr.height = sqW;// * targObj.scaleY;
                sqr.width = sqW ;//* targObj.scaleX;
                sqr.centeredRotation = true;
                sqr.angle = 45;
                sqr.left = targObj.left + sqW;
                sqr.top = targObj.top + sqW;
               // sqr.rr = "low";
                   sqr.state = "ready";
                    sqr.setGradient('fill', dipGradientReady)
                    sqr.unlockable = targObj.unlockable;


                sqr.opacity = 1;

                sqr.scaleX = targObj.scaleX;
                sqr.scaleY = targObj.scaleY;

              

                canvas.remove(targObj);
                canvas.insertAt(sqr, 50, false);
                sqr.zoomX = targObj.zoomX;
                sqr.zoomY = targObj.zoomY;
                sqr.bringToFront();
                sqr.moveTo(10);

                self.createGlow(sqr);
            //}

       // }

      
        canvas.renderAll();

    },
    createLocales: function () {
        var self = this;
       // console.log(canvas.getObjects());

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
        $.each(locales, function (idx, item) {

            var stateOffsetY = 0;
            var stateOffsetX = 0;
            item.x = parseInt(item.x);
            item.y = parseInt(item.y);
            
          //  console.log(item);
            var opacity = 0;
            var calState = "hide";
            if (item.state == "calendar") {
                if ((item.startDate <= currentDate && item.endDate >= currentDate)) {
                    opacity = 1;
                    calState = "show"
                    if (item.aType == "dip") {
                        item.diploResult = "ready";
                    } else {
                        item.discResult = "ready";
                    }
                }
            } else {
                if (item.state == "ready") {
                    opacity = 1;
                    calState = "show"
                    if (item.aType == "dip") {
                        item.diploResult = "ready";
                    } else {
                        item.discResult = "ready";
                    }
                }

            }

           
           
            //'#effa6e'
            if (item.aType == "dis") {
                //var circle = new fabric.Circle({
                //    id: item.Id, radius: cRadius, shadow: shadow, left: item.x - cRadius, top: item.y - cRadius
                //});

                //circle.setGradient('fill', disGradientLocked)
                //circle.set("stroke", "#202020");
                //circle.set("strokeWidth", 3);
                //canvas.add(circle);
                //circle.bringToFront();
                //circle.moveTo(10);

                //circle.hasControls = false;
                //circle.hasBorders = false;
                //circle.hoverCursor = "pointer";
                //circle.lockMovementX = true;
                //circle.lockMovementY = true;
                //circle.state = item.state;
                //circle.initState = item.state;
                //circle.aType = item.aType;
                //circle.name = item.name;
                //circle.originX = "center";
                //circle.originY = "center";

                var circle = new fabric.Rect({
                    id: item.Id, width: sqW, height: sqW, shadow: shadow, stroke: "black", strokeWidth: 3, left: item.x, top: item.y 
                });

                canvas.add(circle);
                circle.bringToFront();
                circle.moveTo(10);
                circle.hasControls = false;
                circle.hasBorders = false;
                circle.hoverCursor = "pointer";
                circle.lockMovementX = true;
                circle.lockMovementY = true;
                circle.state = item.state;
                circle.initState = item.state;
                circle.aType = item.aType;
                circle.originX = "center";
                circle.originY = "center";

                circle.centeredRotation = true;
                circle.angle = 45;

                circle.rr = "low";
               



                if (item.state == "ready" || calState == "show") {
                    // console.log("circle state: " + item.state)
                    //circle.set("fill", "#ff9900");
                    circle.setGradient('fill', dipGradientReady)
                    circle.state = "ready";
                }

                if (item.state == "calendar" || item.state == "random") {
                    circle.unlockable = false;
                } else {
                    circle.unlockable = true;
                }

                if (item.state == "exp") {
                    circle.expLevel = item.expLevel;
                    circle.unlockable = true;
                }

                circle.opacity = opacity;


                if (item.state == "empty") {
                    // console.log("circle state: " + item.state)
                    circle.set("fill", "#808080");
                    circle.set("stroke", "#303030");
                    circle.hoverCursor = "default";
                    circle.setGradient('fill', disGradientEmpty)
                }



            }

            
            if (item.aType == "dip") {
               
               // if (item.contentId == configData.gameData.testDip) {
                    //if (item.rr == "high") {
                    //    var triangle = new fabric.Triangle({
                    //        id: item.Id, width: triW, shadow: shadow, height: triH, stroke: "black", strokeWidth: 3, left: item.x - triW / 2, top: item.y - triH / 2
                    //    });

                    //    canvas.add(triangle);
                    //    triangle.bringToFront();
                    //    triangle.moveTo(10);
                    //    triangle.hasControls = false;
                    //    triangle.hasBorders = false;
                    //    triangle.hoverCursor = "pointer";
                    //    triangle.lockMovementX = true;
                    //    triangle.lockMovementY = true;
                    //    triangle.state = item.state;
                    //    triangle.initState = item.state;
                    //    triangle.aType = item.aType;
                    //    triangle.rr = "high";

                    //    triangle.originX = "center";
                    //    triangle.originY = "center";

                    //    // triangle.set('selectable', false);

                    //    stateOffsetY = 15;
                    //    if (item.state == "ready" || calState == "show") {
                    //        triangle.setGradient('fill', dipGradientReady);
                    //        triangle.state = "ready";
                    //    }


                    //    if (item.state == "calendar" || item.state == "random") {
                    //        triangle.unlockable = false;
                    //    } else {
                    //        triangle.unlockable = true;
                    //    }
                    //    //else {

                    //    triangle.opacity = opacity;

                    //    //}
                    //}
                   // if (item.rr == "low") {
                        // console.log(item.x);

                //        var sqr = new fabric.Rect({
                //            id: item.Id, width: sqW, height: sqW, shadow: shadow, stroke: "black", strokeWidth: 3, left: item.x, top: item.y - sqW / 2
                //        });
                //sqW = sqW / 2;
                //var sqr0 = new fabric.Circle({
                //    id: item.Id, radius: cRadius, shadow: shadow, left: item.x - cRadius, top: item.y - cRadius, stroke: "black", strokeWidth: 3
                //});

                //        canvas.add(sqr);
                //        sqr.bringToFront();
                //        sqr.moveTo(10);
                //        sqr.hasControls = false;
                //        sqr.hasBorders = false;
                //        sqr.hoverCursor = "pointer";
                //        sqr.lockMovementX = true;
                //        sqr.lockMovementY = true;
                //        sqr.state = item.state;
                //        sqr.initState = item.state;
                //        sqr.aType = item.aType;
                //        sqr.originX = "center";
                //        sqr.originY = "center";

                //        sqr.centeredRotation = true;
                //        sqr.angle = 45;

                //       // sqr.rr = "low";
                //        if (item.state == "ready" || calState == "show") {
                //            sqr.state = "ready";
                //            sqr.setGradient('fill', dipGradientReady)
                //        }




                var sqr = new fabric.Rect({
                    id: item.Id, width: sqW, height: sqW, shadow: shadow, stroke: "black", strokeWidth: 3, left: item.x, top: item.y 
                });

                canvas.add(sqr);
                sqr.bringToFront();
                sqr.moveTo(10);
                sqr.hasControls = false;
                sqr.hasBorders = false;
                sqr.hoverCursor = "pointer";
                sqr.lockMovementX = true;
                sqr.lockMovementY = true;
                sqr.state = item.state;
                sqr.initState = item.state;
                sqr.aType = item.aType;
                sqr.originX = "center";
                sqr.originY = "center";

                sqr.centeredRotation = true;
                sqr.angle = 45;

                sqr.rr = "low";
                if (item.state == "ready" || calState == "show") {
                    sqr.state = "ready";
                    sqr.setGradient('fill', dipGradientReady)
                }




                        //else {

                        if (item.state == "calendar" || item.state == "random") {
                            sqr.unlockable = false;
                        } else {
                            sqr.unlockable = true;
                }


                if (item.state == "exp") {
                    sqr.expLevel = item.expLevel;
                    sqr.unlockable = true;
                }


                        sqr.opacity = opacity;

                        // }


                  //  }
                //}
            }

        });

        canvas.selection = false;
        canvas.forEachObject(function (o) {
            o.selectable = false;
        });
        canvas.renderAll();
       
            resizeCanvas();
            localesMgmt.initEvents();
            var nd = new Date();
            console.log("resize: " + nd);
            setTimeout(function () {
                self.updateLocalesStates();
               // gamePlay.showMessage(0);
        }, 500);



    }
    ,
    initEvents: function () {
        var self = this;

       
        console.log('init events');
       // alert("events")
        $(window).resize(function () {
           
            resizeCanvas();

           // self.loadCanvas();
        });

       // canvas.on('mouse:down', function (options) {
        //window.mousedown = false;
        //window.mousemoving = false;
        //window.draggingObj = false;

        //$(window).on('mousedown mouseup', function (e) {
        //    console.log(e.type);
        //    if (e.type == 'mousedown' || e.type == 'touchstart') {
        //        window.mousedown= true;
        //    }
        //    else {
        //        window.mousedown = false;
        //        //mouseup

        //        $(".dragobj").remove();
        //        //console.log(localesMgmt.selectedTarget);
        //       // console.log(window.draggingObj);
        //        if (window.draggingObj == false && localesMgmt.selectedTarget != null) {
        //            console.log("get deferred target");
        //            var defTarget = localesMgmt.selectedTarget;
        //            console.log(defTarget.id)
        //            localesMgmt.getActivity(defTarget);
                  
        //        } else {
                   
        //            console.log("check drop target");

        //        }
        //    }
        //    window.draggingObj = false;
        //   // console.log(window.mousedown);
        //});



        //$(window).on('touchstart touchend', function (e) {
        //    e.preventDefault();
        //    console.log(e.type);
        //    if ( e.type == 'touchstart') {
        //        window.mousedown = true;
        //    }
        //    else {
        //        window.mousedown = false;
        //        //mouseup

        //        $(".dragobj").remove();
        //        console.log(localesMgmt.selectedTarget);
        //         console.log(window.draggingObj);
        //        if (window.draggingObj == false && localesMgmt.selectedTarget != null) {
        //            console.log("get deferred target");
        //            var defTarget = localesMgmt.selectedTarget;
        //            console.log(defTarget.id)
        //            localesMgmt.getActivity(defTarget);

        //        } else {

        //            console.log("check drop target");
        //            console.log("target drop");

        //            console.log(e);
        //            var elem = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
        //            console.log(elem);

        //            if ($(elem).attr("id") == "itinerary" || $(elem).hasClass("itin-wrapper") ||  $(elem).hasClass("itin-item")) {
        //                var src = localesMgmt.selectedTarget;

        //                var item = getLocaleById(src.id)


        //                var itinItem;

        //                if (item.aType == "dip") {
        //                    itinItem = configData.dsDiplomacy.ds.get(item.contentId);
        //                } else {
        //                    itinItem = configData.dsDiscovery.ds.get(item.contentId);
        //                }

        //                var dup = configData.dsItinerary.ds.get(itinItem.Id)
        //                if (dup == undefined) {
        //                    configData.dsItinerary.ds.add(itinItem);
        //                }

                       

        //                localesMgmt.selectedTarget = null;

        //            }
        //        }
        //    }
        //    window.draggingObj = false;
        //    // console.log(window.mousedown);
        //});

        //window.fabric.util.addListener(canvas.upperCanvasEl, 'touchstart' , function (event, self) {
        //    console.log("touchstart");

        //    $(".dragobj").remove();
        //    window.mousedown = true;
        //    window.mousemoving = true;

        //    console.log("ready to drag")
        //    var target = canvas.findTarget(event);
        //    localesMgmt.selectedTarget = target;

        //    console.log(localesMgmt.selectedTarget);
        //    if (target.state && target.state == "ready") {
        //        var tw = target.width;
        //        var scale = target.scaleX;
        //        var w = tw * scale;
        //        console.log(target);
        //        var l = event.pageX - w / 2;
        //        var t = event.pageY - w / 2;
        //        var objHTML = '<div class="dragobj"></div>';

        //        // var dropHTML = '<div class="droptarg"></div>';

        //        $("body").append(objHTML);
        //        // $("body").append(dropHTML);


        //        setTimeout(function () {

        //            $(".dragobj").css("width", w + "px")
        //            $(".dragobj").css("height", w + "px");
        //            $(".dragobj").css("left", l + "px");
        //            $(".dragobj").css("top", t + "px");
        //            $(".dragobj").css("opacity", 0);

        //            $(".itin-wrapper").off();
        //            $(".itin-wrapper").on("mouseup touchend", function () {

        //                console.log("target drop");

        //                //  console.log(localesMgmt.selectedTarget);
        //                var src = localesMgmt.selectedTarget;

        //                var item = getLocaleById(src.id)


        //                var itinItem;

        //                if (item.aType == "dip") {
        //                    itinItem = configData.dsDiplomacy.ds.get(item.contentId);
        //                } else {
        //                    itinItem = configData.dsDiscovery.ds.get(item.contentId);
        //                }

        //                var dup = configData.dsItinerary.ds.get(itinItem.Id)
        //                if (dup == undefined) {
        //                    configData.dsItinerary.ds.add(itinItem);
        //                }

        //                $(".itin-wrapper").off();


        //                localesMgmt.selectedTarget = null;
        //            })
        //            //$(".dragobj").kendoDraggable({});
        //            //$(".droptarg").kendoDropTarget({
        //            //    dragenter: function (e) {
        //            //        console.log(e)
        //            //        //e.draggable.hint.css("opacity", 0.5); //modify the draggable hint
        //            //        //e.dropTarget.removeClass("orange").addClass("purple"); //modify dropTarget element
        //            //    },
        //            //    dragleave: function (e) {
        //            //        //e.draggable.hint.css("opacity", 1); //modify the draggable hint
        //            //        //e.dropTarget.removeClass("purple").addClass("orange"); //modify dropTarget element
        //            //        console.log(e)
        //            //    }
        //            //});



        //            $(window).on("mousemove", function (e) {

        //                //  console.log(window.mousedown)
        //                if (window.mousedown == true) {
        //                    var mousePosition = [e.pageX, e.pageY];
        //                    var mouseX = mousePosition[0],
        //                        mouseY = mousePosition[1];

        //                    if (typeof this.prevMouseX == "undefined") { this.prevMouseX = mouseX };
        //                    if (typeof this.prevMouseY == "undefined") { this.prevMouseY = mouseY };

        //                    var item = $(".dragobj")
        //                    item.css({
        //                        'left': mouseX - w / 2,
        //                        'top': mouseY - w / 2
        //                    });

        //                    if (Math.abs(mouseX - this.prevMouseX) > 15 || Math.abs(mouseY - this.prevMouseY) > 15) {
        //                        console.log("targ moved");
        //                        $(".dragobj").css("opacity", 0.85);
        //                        window.draggingObj = true;
        //                        //console.log(mouseX + "  " + this.prevMouseX + " " + mouseY + " " + this.prevMouseY);
        //                    } else {
        //                        window.draggingObj = false;
        //                        console.log("targ stationary");
        //                    }
        //                }

        //            })

        //            $(window).on("touchmove", function (e) {

        //                 console.log("touchmove")
        //                if (window.mousedown == true) {

        //                    console.log(e.originalEvent.touches);
        //                  //  console.log(e);
        //                    var mousePosition = [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY];
        //                    var mouseX = mousePosition[0],
        //                        mouseY = mousePosition[1];

        //                    if (typeof this.prevMouseX == "undefined") { this.prevMouseX = mouseX };
        //                    if (typeof this.prevMouseY == "undefined") { this.prevMouseY = mouseY };

        //                    var item = $(".dragobj")
        //                    item.css({
        //                        'left': mouseX - w / 2,
        //                        'top': mouseY - w / 2
        //                    });

        //                    if (Math.abs(mouseX - this.prevMouseX) > 15 || Math.abs(mouseY - this.prevMouseY) > 15) {
        //                        console.log("targ moved");
        //                        $(".dragobj").css("opacity", 0.85);
        //                        window.draggingObj = true;
        //                        //console.log(mouseX + "  " + this.prevMouseX + " " + mouseY + " " + this.prevMouseY);
        //                    } else {
        //                        window.draggingObj = false;
        //                        console.log("targ stationary");
        //                    }
        //                }

        //            })

        //        }, 0)
        //    }
        //})

        //window.fabric.util.addListener(canvas.upperCanvasEl, isMobile == true ? 'touchstart' : 'mousedown', function (event, self) {
        //    $(".dragobj").remove();
        //    window.mousedown = true;
        //    window.mousemoving = true;

        //    console.log("ready to drag")
        //    var target = canvas.findTarget(event);
        //    localesMgmt.selectedTarget = target;

        //    console.log(localesMgmt.selectedTarget);
        //    if (target.state && target.state == "ready") {
        //        var tw = target.width;
        //        var scale = target.scaleX;
        //        var w = tw * scale;
        //        console.log(target);
        //        var l = event.pageX - w / 2;
        //        var t = event.pageY - w / 2;
        //        var objHTML = '<div class="dragobj"></div>';

        //       // var dropHTML = '<div class="droptarg"></div>';

        //        $("body").append(objHTML);
        //       // $("body").append(dropHTML);


        //        setTimeout(function () {

        //            $(".dragobj").css("width", w + "px")
        //            $(".dragobj").css("height", w + "px");
        //            $(".dragobj").css("left", l + "px");
        //            $(".dragobj").css("top", t + "px");
        //            $(".dragobj").css("opacity", 0);

        //            $(".itin-wrapper").off();
        //            $(".itin-wrapper").on("mouseup touchend", function (e) {

        //                 //  console.log(localesMgmt.selectedTarget);
        //                var src = localesMgmt.selectedTarget;
                        
        //                var item = getLocaleById(src.id)
                        
                      
        //                var itinItem;

        //                if (item.aType == "dip") {
        //                    itinItem  = configData.dsDiplomacy.ds.get(item.contentId);
        //                } else {
        //                    itinItem = configData.dsDiscovery.ds.get(item.contentId);
        //                }

        //                var dup = configData.dsItinerary.ds.get(itinItem.Id)
        //                if (dup == undefined) {
        //                    configData.dsItinerary.ds.add(itinItem);
        //                }
                      
        //                $(".itin-wrapper").off();
                       
                       
        //                localesMgmt.selectedTarget = null;
        //            })
                   



        //            //$(window).on("mousemove", function (e) {

        //            //  //  console.log(window.mousedown)
        //            //    if (window.mousedown == true) {
        //            //        var mousePosition = [e.pageX, e.pageY];
        //            //        var mouseX = mousePosition[0],
        //            //            mouseY = mousePosition[1];

        //            //        if (typeof this.prevMouseX == "undefined") { this.prevMouseX = mouseX };
        //            //        if (typeof this.prevMouseY == "undefined") { this.prevMouseY = mouseY };

        //            //        var item = $(".dragobj")
        //            //        item.css({
        //            //            'left': mouseX - w/2,
        //            //            'top': mouseY-w/2
        //            //        });

        //            //        if (Math.abs(mouseX - this.prevMouseX) > 15 || Math.abs(mouseY - this.prevMouseY) > 15) {
        //            //            console.log("targ moved");
        //            //            $(".dragobj").css("opacity", 0.85);
        //            //            window.draggingObj = true;
        //            //            //console.log(mouseX + "  " + this.prevMouseX + " " + mouseY + " " + this.prevMouseY);
        //            //        } else {
        //            //            window.draggingObj = false;
        //            //            console.log("targ stationary");
        //            //        }
        //            //    }

        //            //})

        //            //$(window).on("touchmove", function (e) {

        //            //    //  console.log(window.mousedown)
        //            //    if (window.mousedown == true) {
        //            //        var mousePosition = [e.pageX, e.pageY];
        //            //        var mouseX = mousePosition[0],
        //            //            mouseY = mousePosition[1];

        //            //        if (typeof this.prevMouseX == "undefined") { this.prevMouseX = mouseX };
        //            //        if (typeof this.prevMouseY == "undefined") { this.prevMouseY = mouseY };

        //            //        var item = $(".dragobj")
        //            //        item.css({
        //            //            'left': mouseX - w / 2,
        //            //            'top': mouseY - w / 2
        //            //        });

        //            //        if (Math.abs(mouseX - this.prevMouseX) > 15 || Math.abs(mouseY - this.prevMouseY) > 15) {
        //            //            console.log("targ moved");
        //            //            $(".dragobj").css("opacity", 0.85);
        //            //            window.draggingObj = true;
        //            //            //console.log(mouseX + "  " + this.prevMouseX + " " + mouseY + " " + this.prevMouseY);
        //            //        } else {
        //            //            window.draggingObj = false;
        //            //            console.log("targ stationary");
        //            //        }
        //            //    }

        //            //})

        //        }, 0)
        //    }
        //   // console.log(target);
        //});


         window.fabric.util.addListener(canvas.upperCanvasEl, isMobile == true ? 'touchend' : 'click', function (event, self) {
       
         //   window.fabric.util.addListener(canvas.upperCanvasEl, 'touchend', function (event, self) {
             window.mousedown = false;
             console.log("obj click registered");
             gamePlay.checkForPopup();
               fadeAudio(currentAudio);
                var target = canvas.findTarget(event);
         
            //  console.log("canvas click")
            //console.log(options);
                //  if (options.target) {

                // check for open windows

                var openWindows = false;

             if ($(".card-wrapper").length > 0 || configData.gameData.popupsExecuting == true) {

                
                 console.log(configData.gameData.popupsExecuting == true);
                 openWindows = true;
             } else {
                 openWindows = false;
             }


             console.log(target);
             console.log(openWindows);
             console.log("gameplaylocked is : " + gamePlay.properties.locked);

             if (target.id && openWindows == false && gamePlay.properties.locked == false) {

               

               

                // save bush card
                $(".save-card").trigger("click");

                    // remove messages
                $(".messagebar").remove();

                //var id = options.target.id;
                var id = target.id;

                // get item data
                    console.log(id);
                if (id != undefined) {

                    var item = getLocaleById(id)
                  
                    //if (item.dipContent.length > 0 && item.state == "ready") {
                    //    if (item && item.hasOwnProperty("unlocks") && item.unlocks.length > 0) {
                    //        drawLines(item, item.unlocks);
                    //    }

                    //    console.log(item)
                    //    getDiplomacy(item.dipContent[0].id, item.Id)

                    //}
                    var obj = selectObject(id);
                    console.log(obj);
                    if (obj != null && obj.opacity == 1) {

                        gamePlay.properties.locked = true;

                        console.log(item);
                        if (item != null && item.aType == 'dip' && (item.state == "ready" || item.state == "calendar" || item.state == "random") && item.contentId != "") {
                            if (item && item.hasOwnProperty("unlocks")) {
                                if (item.unlocks != undefined && item.unlocks.length > 0) {
                                    console.log(item.unlocks);
                                   // self.drawLines(item, item.unlocks);
                                }
                            }

                            gamePlay.getDiplomacy(item.contentId, item.Id)

                        }

                        if (item != null && item.aType == "dis" && (item.state == "ready" || item.state == "calendar" || item.state == "random")) {
                            //if (item.disContent && item.disContent.length > 0) {
                            // getDiscovery(item.disContent[0].id)

                          
                            gamePlay.getDiscovery(item.contentId, item.Id);
                            item.discResult = 'viewed';
                            // }
                        }
                    }
                }
            } 
        });


        //window.fabric.util.addListener(canvas.upperCanvasEl,  'touchend' , function (event, self) {

        //    //   window.fabric.util.addListener(canvas.upperCanvasEl, 'touchend', function (event, self) {
        //    window.mousedown = false;
        //    console.log("obj click registered");






        //    fadeAudio(currentAudio);
        //    var target = canvas.findTarget(event);

        //    //  console.log("canvas click")
        //    //console.log(options);
        //    //  if (options.target) {

        //    // check for open windows

        //    var openWindows = false;

        //    if ($(".card-wrapper").length > 0 || configData.gameData.popupsExecuting == true) {
        //        openWindows = true
        //    }

        //    if (target.id && openWindows == false) {
        //        // save bush card
        //        $(".save-card").trigger("click");

        //        // remove messages
        //        $(".messagebar").remove();

        //        //var id = options.target.id;
        //        var id = target.id;

        //        // get item data

        //        if (id != undefined) {

        //            var item = getLocaleById(id)

        //            //if (item.dipContent.length > 0 && item.state == "ready") {
        //            //    if (item && item.hasOwnProperty("unlocks") && item.unlocks.length > 0) {
        //            //        drawLines(item, item.unlocks);
        //            //    }

        //            //    console.log(item)
        //            //    getDiplomacy(item.dipContent[0].id, item.Id)

        //            //}
        //            var obj = selectObject(id);

        //            if (obj != null && obj.opacity == 1) {
        //                console.log(item);
        //                if (item != null && item.aType == 'dip' && (item.state == "ready" || item.state == "calendar" || item.state == "random") && item.contentId != "") {
        //                    if (item && item.hasOwnProperty("unlocks")) {
        //                        if (item.unlocks != undefined && item.unlocks.length > 0) {
        //                            console.log(item.unlocks);
        //                            // self.drawLines(item, item.unlocks);
        //                        }
        //                    }

        //                    gamePlay.getDiplomacy(item.contentId, item.Id)

        //                }

        //                if (item != null && item.aType == "dis" && (item.state == "ready" || item.state == "calendar" || item.state == "random")) {
        //                    //if (item.disContent && item.disContent.length > 0) {
        //                    // getDiscovery(item.disContent[0].id)


        //                    gamePlay.getDiscovery(item.contentId, item.Id);
        //                    item.discResult = 'viewed';
        //                    // }
        //                }
        //            }
        //        }
        //    }
        //});

        if (kendo.support.mobileOS.device == undefined) {
            isMobile = false;

            canvas.on('mouse:over', function (e) {
               //  console.log(e.target)
                var item = e.target;

                if (item && item.id) {
                    var loc = getLocaleById(item.id);
                    if (e.target.state && e.target.state == "ready") {
                        currHover = e.target.fill;
                        // e.target.set('fill', '#216619');
                        e.target.setGradient('fill', dipGradientHover);
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
            canvas.on('mouse:out', function (e) {

                if (currHover != "" && currHover != undefined && e.target.state == "ready") {
                    e.target.set('fill', currHover);
                    canvas.renderAll();
                    currHover = "";
                }
            });
        } else {
            isMobile = true;
        }

          


        //$(".close-legend").on("click touchend", function () {
        //    $(".legend-content").hide();
        //    $(".show-legend").fadeIn();
        //});


        //$(".show-legend").on("click touchend", function () {
        //    $(".legend-content").fadeIn();
        //    $(".show-legend").hide();
        //});

        $(".panel-hide").on("click touchend", function () {
            console.log("slide up");
            kendo.fx($("#statusWrapper")).slideIn("down").reverse();
            $(".panel-hide").hide();
            $(".panel-show").show();
               

        });

        $(".panel-show").on("click touchend", function () {
            console.log("slide down");
            kendo.fx($("#statusWrapper")).slideIn("down").play();
            $(".panel-hide").show();
            $(".panel-show").hide();

        });

        $(".reset").off();
        $(".reset").on("click touchend", function () {
          self.clearCanvas();
        });

        $(".getbcardfull").off();
        $(".getbcardfull").on("click touchend", function () {
            if ($(".card-wrapper").length == 0) {
                $(".getbcardfull").off();
                gamePlay.getBcardLayout();
            }
        });



        $(".network").off();
        $(".network").on("click touchend", function () {
            // app.mobileApp.navigate("components/network/view.html")
            if ($(".card-wrapper").length == 0) {
                network.showNetwork();
            }
        });

        $(".career").off();
        $(".career").on("click touchend", function () {
            if ($(".card-wrapper").length == 0) {
                gamePlay.getCareer();
            }
        });

        $(".intro").off();
        $(".intro").on("click touchend", function () {
            //location.href = "components/intro/view.html";
            app.mobileApp.navigate("components/intro/view.html")
        });

       // setBadges();

    },
    dropOnItin: function () {




    },
    getActivity: function (target) {

        window.mousedown = false;
        console.log("obj click registered");

        fadeAudio(currentAudio);
       // var target = canvas.findTarget(event);

        //  console.log("canvas click")
        //console.log(options);
        //  if (options.target) {

        // check for open windows

        var openWindows = false;

        if ($(".card-wrapper").length > 0 || configData.gameData.popupsExecuting == true) {
            openWindows = true
        }

        console.log("game is : " + gamePlay.properties.locked);

        if (target.id && openWindows == false ) {
            // save bush card
            $(".save-card").trigger("click");

            // remove messages
            $(".messagebar").remove();

            //var id = options.target.id;
            var id = target.id;

            // get item data

            if (id != undefined) {

                var item = getLocaleById(id)

                //if (item.dipContent.length > 0 && item.state == "ready") {
                //    if (item && item.hasOwnProperty("unlocks") && item.unlocks.length > 0) {
                //        drawLines(item, item.unlocks);
                //    }

                //    console.log(item)
                //    getDiplomacy(item.dipContent[0].id, item.Id)

                //}
                var obj = selectObject(id);

                if (obj != null && obj.opacity == 1) {
                    console.log(item);
                    if (item != null && item.aType == 'dip' && (item.state == "ready" || item.state == "calendar" || item.state == "random") && item.contentId != "") {
                        if (item && item.hasOwnProperty("unlocks")) {
                            if (item.unlocks != undefined && item.unlocks.length > 0) {
                                console.log(item.unlocks);
                                // self.drawLines(item, item.unlocks);
                            }
                        }

                        gamePlay.getDiplomacy(item.contentId, item.Id)

                    }

                    if (item != null && item.aType == "dis" && (item.state == "ready" || item.state == "calendar" || item.state == "random")) {
                        //if (item.disContent && item.disContent.length > 0) {
                        // getDiscovery(item.disContent[0].id)


                        gamePlay.getDiscovery(item.contentId, item.Id);
                        item.discResult = 'viewed';
                        // }
                    }
                }
            }
        } 

        localesMgmt.selectedTarget = null;
    },
 getImgDim : function (dir, file) {
     var self = this;
    var newImg = $("#imgHolder");
    newImg.attr("src", dir + file)
    console.log(dir + file);
    newImg.off();
    newImg.on("load", function () {
        var h = 762//1197//766// newImg.height();
        var w = 1280//2000//1280//newImg.width();
       // 1280x766
        imgW = w;
        imgH = h;
        console.log(w + " x " + h);
        $("canvas").attr("width", w);
        $("canvas").attr("height", h);
       

        self.loadCanvas(dir, file, w, h)
    })

},

    
 loadCanvas: function (dir, file, w, h) {
     var self = this;
   // var app = new kendo.mobile.Application();
   //  var d = new Date();
   //  console.log("init: " + d);
    canvas = new fabric.Canvas('chinaCanvas');

    console.log(file);
    var newBkgrdImg = fabric.Image.fromURL(dir + file, function (oImg) {
        oImg.width = w;
        oImg.height = h;
        canvas.add(oImg);
        oImg.set('selectable', false);
        oImg.sendToBack();
        canvas.renderAll();
        console.log("img loaded");
    });

   

    locales = [];
    //if (localStorage.locales != "" && localStorage.locales != undefined) {
    //    locales = JSON.parse(localStorage.locales);
    //    createLocalesAlt();

    //    initEvents();
    //} else {
    //    createLocalesAlt();
    //    initEvents();
    //   // resizeCanvas();

    //}


  var localesready =  events.subscribe("dsLocalesReady", function (d) {
      localesready.remove();


      locales = d.ds.data().toJSON();
     console.log("locales ready")
    // self.setRiskVals(locales)
       
      self.startLocales(locales)
 

       // resizeCanvas();
    });
    configData.dsLocales.getDataSource();
   configData.init();
 },
 //setRiskVals: function (localesList) {
 //    var diplistReady = events.subscribe("dsDiplomacyReady", function (data) {
 //        diplistReady.remove();
 //      var dipList = data.ds.data().toJSON();
 //      console.log(dipList);
 //     // console.log(data.ds)
         
 //      $.each(localesList, function (idx, item) {
            
 //          if (item.aType == "dip" && item.contentId != "" &&  item.contentId != null) {
 
 //              selRisk = $.grep(dipList, function (dipItem, idx) {
 //                  return dipItem.Id == item.contentId;
 //              })
 //              // console.log(selRisk)
 //              if (selRisk.length > 0 && selRisk[0].rr != "") {

 //                  // console.log(selRisk);
 //                  item.rr = selRisk[0].risk.id;
                  
 //              } 

 //          }
 // if (idx >= localesList.length - 1) {
 //              setTimeout(function () {
 //                  console.log("start locales");
 //                  //console.log(localesList);
 //                 // console.log(locales);
 //                  locales = localesList;
 //                 localesMgmt.createLocales();
 //              }, 0);
 //          }

 //      })
        
 //        //return locales
        
 //       // localesMgmt.initEvents();

 //    });

 //  configData.dsDiplomacy.getDataSource();
     
 //   },
    startLocales: function (localesList) {
        var diplistReady = events.subscribe("dsDiplomacyReady", function (data) {
            diplistReady.remove();
            var dipList = data.ds.data().toJSON();
            console.log(dipList);
           
            console.log("start locales");
           
            locales = localesList;
            localesMgmt.createLocales();

        });

        configData.dsDiplomacy.getDataSource();

    },
 drawLines: function (src, targets) {
    // console.log(src)
     canvas.renderAll();
     console.log(targets)
     var srcObj = selectObject(src.Id);

     $.each(targets, function (idx, item) {

         itemId = item.Id;
         var targObj = selectObject(itemId);
        
         // src.state = "success";
         console.log(itemId)
         console.log(targObj)
         if (targObj != null && targObj.opacity == 0 && targObj.unlockable == true ) {

            
             var srcOffX = 0;
             var srcOffY = 0;

             console.log(srcObj)
             console.log(targObj)
             zRatio = $("canvas").width() / 950;

             //if (srcObj.rr == "high") {
             //    srcOffX = 0//(srcObj.width * zRatio) / 2;
             //    srcOffY = 0//(srcObj.height * zRatio) / 2;
             //} else {
             //    srcOffX = 0;
             //    srcOffY = 0;
             //}
             console.log(targObj)
             console.log(srcOffX);
             var line = new fabric.Line([srcObj.left + srcOffX, srcObj.top + srcOffY, srcObj.left + srcOffX, srcObj.top + srcOffY], {
                 left: targObj.left + srcOffX,
                 top: targObj.top + srcOffY,
                 strokeWidth: 10,
                 stroke: '#000000',
                 opacity: .8,
                 strokeDashArray: [15, 5],
                 id: src.Id + "-line-" + idx
             });

             canvas.add(line);
             line.moveTo(1);
             line.set('selectable', false);
             //   console.log(zRatio)
             var offX = 0; //(targObj.width * zRatio) / 2;
             var offY = 0;// (targObj.height * zRatio) / 2 ;

             // if (zRatio > 1) {
           //  offX = (targObj.width * zRatio) / 2;
            // offY = (targObj.height * zRatio) / 2;
             // }

             //if (targObj.rr && targObj.rr == "low") {
             //    offX = offX - 20;
             //}

             line.animate("x2", targObj.left + offX, {
                 onChange: canvas.renderAll.bind(canvas),
                 duration: 1000,
             });
             line.animate("y2", targObj.top + offY, {
                 onChange: canvas.renderAll.bind(canvas),
                 duration: 1000,
             })

             targObj.opacity = .6;
         }
     })

     setTimeout(function () {
         $(".diplomacy-container").fadeIn();
     }, 1200);


 },
 updateRoutes: function (id, correct) {
     var self = this;
            console.log("update routes");
            var currL = getLocaleById(id);
            var src = selectObject(id);
     console.log(currL)
            if (currL.unlocks != undefined && correct == 1) {
               
                self.drawLines(currL, currL.unlocks);

               
            }

            setTimeout(function () {
                if (correct == 1) {
                    // currL.state = "success";
                    //src.set("fill", "#2a8d1c");
                    src.setGradient("fill", dipGradientSuccess);

                    //  canvas.remove(src);

                } else {
                    // currL.state = "fail";
                    src.set("fill", "#101010");
                    src.stroke = "#990000";
                    //   src.setGradient("fill", dipGradientFail);
                    //  console.log(src)
                }

                if (currL.unlocks != undefined) {
                    $.each(currL.unlocks, function (idx, item) {
                        console.log(item);
                        var line = selectObject(id + "-line-" + idx);
                        if (line) {
                            var loc = selectObject(item.Id);
                            loc.opacity = 1;
                            if (correct == 1) {
                                // line.set("stroke", "#80ee80");

                                var locText = selectObject(item.Id + "-state");
                                // loc.set("fill", "#ff9900");
                                if (item.aType == "dip") {
                                    loc.setGradient("fill", dipGradientReady);
                                } else {
                                    loc.setGradient("fill", dipGradientReady);
                                    loc.discResult = "used";
                                  
                                }


                                if (locText != null) {
                                    locText.set("text", "");
                                }
                                console.log("set item to ready state");
                                getLocaleById(item.Id).state = "ready";

                                self.createGlow(loc);


                                // save in unlocked list
                                console.log("add unlocked item");
                                configData.gameData.addUnlockedItem(currL.Id, itemId);


                                // update original ds
                                // var dataItem =  configData.dsLocales.ds.get(item.Id);
                                //dataItem.set("state", "ready");

                            } else {
                                line.set("stroke", "#202020");
                                setTimeout(function () {

                                    loc.opacity = 0;

                                }, 3000)
                            }

                            setTimeout(function () {
                                //console.log(line);
                                //console.log(canvas.getObjects());
                                canvas.remove(line);

                                // canvas.renderAll();

                                // console.log(canvas.getObjects());
                            }, 3000);
                        }
                    })

                }

                var newDipData = configData.dsLocales.isMulti(id);

                console.log("check for multi data");
                // console.log(newDipData);

                if (newDipData == false) {
                    console.log("hide after .3 sec");
                    setTimeout(function () {
                        console.log("hide locale");

                        src.animate("opacity", 0, {
                            onChange: canvas.renderAll.bind(canvas)
                        });
                        self.removeGlow(src)
                        canvas.renderAll()
                        gamePlay.properties.locked = false;
                    }, 2000);
                    canvas.renderAll();
                } else {

                     console.log(newDipData);
                    console.log(currL);
                    console.log(src)
                    // transfer new dip  data
                    currL.contentId = newDipData.activityId;
                    currL.unlocks = newDipData.unlocks;

                    src.contentId = newDipData.activityId;
                    src.unlocks = newDipData.unlocks;

                    src.state = "ready";
                    
                   // console.log(currL.rr + " " + newDipData.rr.id);

                    //if (currL.rr != newDipData.rr.id) {
                    //    self.replaceLocale(src)
                    //}

                    //currL.rr = newDipData.rr.id;
                   

                    // if is random hide and reset state

                    //console.log(src.wasRandom);
                    //console.log(id);
                    //console.log(configData.gameData.usedRandomDip.data());

                    //console.log(configData.gameData.randomDip.data());
                    if (src.wasRandom && src.wasRandom == true) {


                        src.state = "random"

                       
                        setTimeout(function () {
                            console.log("hide locale");

                            src.animate("opacity", 0, {
                                onChange: canvas.renderAll.bind(canvas)
                            });
                            self.removeGlow(src)
                            canvas.renderAll()
                            gamePlay.properties.locked = false;
                        }, 300);

                    } else {

 setTimeout(function () {

                        src.setGradient('fill', dipGradientReady);
                        //  src.stroke = "#000000"
                        console.log("reset locale");

                        canvas.renderAll();
                    }, 400);
                   
                    }

              self.updateLocalesData(currL);
                    console.log(src)
                }

                localesMgmt.updateLocalesStates();
            }, 400);
 },

 updateLocalesData: function (item) {
     console.log("update locale data");
    // console.log(item);
    // console.log(configData.dsLocales.ds.get(item.Id));
     var oldData = getLocaleById(item.Id);//configData.dsLocales.ds.get(item.Id);
     //console.log(oldData);
    // console.log(oldData.rr + " " + item.rr);

     //oldData.set("contentId",item.contentId);
     //oldData.set("unlocks",item.unlocks);
     //oldData.set("state", "ready");
     //oldData.set("rr", item.rr);

     oldData.contentId = item.contentId;
     oldData.unlocks = item.unlocks;
     oldData.state = "ready";
    // oldData.rr = item.rr;

    // console.log(oldData);
    // , unlocks:item.unlocks, state:"ready"})
    // console.log(configData.dsLocales.ds.data())
    // locales = configData.dsLocales.ds.data().toJSON();

    },
    checkExpThreshold: function () {
        self = this;
        console.log("check threshold");
        if (configData.dsExp.ds) {

       
        var pts = configData.gameData.expLevel;
        var arrLevels = configData.dsExp.ds.data().toJSON();
        var currLevel = configData.gameData.currExpLevel;
        var newLevel = -1;
        $.each(arrLevels, function (i, item) {
           // console.log(item.threshold + " " + pts);
            if (item.threshold <= pts) {
                newLevel = item.idx;
            }
        })

        if (newLevel >= currLevel) {

            console.log("show exp locales");
            configData.gameData.currExpLevel = newLevel;
            self.showExpLocales = true;
        }
 }
    },
 updateLocalesStates: function () {
     var self = this;
     cDate = configData.gameData.currentDate;
     console.log("update states");
     configData.gameData.currDis = 0;
     configData.gameData.currDip = 0;
     setTimeout(function () {
         console.log(configData.dsExp.ds.data().toJSON());



         $.each(locales, function (idx, item) {
             var obj = selectObject(item.Id);
             var opacity = 0;


             if (item.state == "calendar" && obj != null) {
                 //
                 item.startDate.setHours(0, 0, 0, 0);
                 item.endDate.setHours(23, 59, 59, 59);
                 item.endDate.setYear(1975);
                 item.startDate.setYear(1975);
                 // 
                 // console.log(item);
                 //console.log(obj);
                 //console.log(item.startDate + " " + cDate + " " + item.endDate);
                 if (item.startDate <= cDate && item.endDate >= cDate && obj.state != "ready" && obj.state != "empty") {
                     obj.opacity = 1;
                     obj.state = "ready";
                     if (obj.aType == "dip") {
                         obj.setGradient('fill', dipGradientReady);
                     }

                    

                     if (item.aType == "dip") {
                         item.diploResult = "ready";
                     } else {


                         if (obj.aType == "dis") {
                             obj.setGradient('fill', dipGradientReady);
                         }
                         item.discResult = "ready";
                     }
                     //item.state = "ready";
                     // console.log("show");
                     //console.log(item.name)
                 } else {


                     if (obj != null && (item.startDate > cDate || item.endDate < cDate) && obj.state == "ready") {
                         console.log("hide obj");
                         obj.opacity = 0;
                         obj.state = "locked";
                         self.removeGlow(obj);
                         if (item.aType == "dip") {
                             if (!item.diploResult || (item.diploResult != 1 && item.diploResult != 0)) {
                                 item.diploResult = "retired";
                             }
                         } else {
                             if (!item.discResult || (item.discResult != "used" && item.discResult != "viewed")) {

                                 item.discResult = "retired";
                             }
                         }
                     }
                 }
             }

             if (item.state == "exp" && obj != null) {
                
                 // 
                 // console.log(item);
                // console.log(obj);
               //  console.log(self.showExpLocales + " " + obj.expLevel + " " + configData.gameData.currExpLevel);

                 //self.showExpLocales == true &&
                 if ( obj.expLevel && configData.gameData.currExpLevel >= obj.expLevel && obj.state != "ready" && obj.state != "empty") {

                     self.showExpLocales = false;
                     console.log("reveal exp");
                     obj.opacity = 1;
                     obj.state = "ready";
                     item.state = "ready";
                     if (obj.aType == "dip") {
                         obj.setGradient('fill', dipGradientReady);
                     }



                     if (item.aType == "dip") {
                         item.diploResult = "ready";
                     } else {


                         if (obj.aType == "dis") {
                             obj.setGradient('fill', dipGradientReady);
                         }
                         item.discResult = "ready";
                     }
                     //item.state = "ready";
                     // console.log("show");
                     //console.log(item.name)

                     console.log(obj);
                 } else {


                    // optionally remove lower exp items
                 }
             }

             if (obj != null && obj.opacity == 1) {

                 if (item.aType == "dis") {
                     configData.gameData.currDis++

                 }

                 if (item.aType == "dip") {
                    
                     configData.gameData.currDip++
                 }
             }
             if (obj != null) {
                 self.createGlow(obj);
             }

          

         });
         //use random locales to add or remove to optimal number
        
         var neededDis = configData.gameData.minDis - configData.gameData.currDis;
         var extraDis = configData.gameData.currDis - configData.gameData.maxDis;
         var neededDip = configData.gameData.minDip - configData.gameData.currDip;
         var extraDip = configData.gameData.currDip - configData.gameData.maxDip;

         console.log(neededDip);
         console.log(configData.gameData.currDip);
         console.log(configData.gameData.maxDip);
         console.log(extraDip);

         if (extraDip > 0) {
             for (var i = 0; i < extraDip; i++) {
                 if (configData.gameData.UsedRandomDip != undefined) {
                     var item = configData.gameData.UsedRandomDip.at(i);
                     var obj = selectObject(item.Id);
                     locItem = getLocaleById(item.Id);
                     if (!locItem.diploResult || (locItem.diploResult != 1 && locItem.diploResult != 0)) {
                         locItem.diploResult = "retired";
                     }
                     obj.opacity = 0;
                     obj.state = "locked";
                     self.removeGlow(obj);
                     configData.gameData.removeUsedRandomDip(item);
                     configData.gameData.addRandomDip(item);
                 }
             }

         }
         if (extraDis > 0) {
             for (var i = 0; i < extraDis; i++) {
                 var item = configData.gameData.usedRandomDis.at(i);
                 if (item) {
                     var obj = selectObject(item.Id);
                
                     obj.opacity = 0;
                     obj.state = "locked";
                     self.removeGlow(obj)
                     configData.gameData.removeUsedRandomDis(item);
                     configData.gameData.addRandomDis(item);

                     if (!locItem.discResult || (locItem.discResult != "used" && locItem.discResult != "viewed")) {
                         locItem = getLocaleById(item.Id);
                         locItem.discResult = "retired";
                     }
                 }
             }

         }

         var q = [{ field: "randomLevel.id", operator: "lte", value: configData.gameData.rankIdx }, { field: "Id", operator: "ne", value: "" }]


         if (neededDip > 0 && configData.gameData.randomDip != null) {

             var dipDelItems = [];
             configData.gameData.randomDip.query({
                 filter: { logic: "and", filters: q }
             }).then(function (e) {

                 var availableDip = configData.gameData.randomDip.view().length;
                 //console.log(configData.gameData.randomDip.view());

                 if (configData.gameData.currDip == 0 && availableDip == 0) {
                     gamePlay.getGameOver()
                 }

                
                 if (neededDip > availableDip) { neededDip = availableDip };
                 for (var i = 0; i < neededDip; i++) {
 //console.log('****neededDip');
 //                console.log(neededDip);

                     var idx = getRandomInt(0, configData.gameData.randomDip.view().length - i)
                     var item = configData.gameData.randomDip.view().at(idx);

                    // var item = configData.gameData.randomDip.view().at(i+1);
                     if (item != undefined) {
                         dipDelItems.push(item)
                         console.log(item);
                         var obj = selectObject(item.Id);
                         if (obj != null) {
                             obj.opacity = 1;
                             obj.state = "ready";
                             obj.wasRandom = true;
                             locItem = getLocaleById(item.Id);
                             locItem.diploResult = "ready";

                             obj.setGradient('fill', dipGradientReady);
                             self.createGlow(obj);
                             // console.log(item);


                         }
                     }


                 }

                 for (var i = 0; i < dipDelItems.length; i++) {
                     var newDipData = configData.dsLocales.isMulti(dipDelItems[i].id, true);


                     //  console.log("****remove used random")
                     // if not multi item add to used list
                     // leave multi in random list for later use 
                     if (newDipData == false) {
                         configData.gameData.removeRandomDip(dipDelItems[i]);
                         configData.gameData.addUsedRandomDip(dipDelItems[i]);
                     }

                     //console.log(configData.gameData.randomDip.data())
                     //console.log(configData.gameData.usedRandomDip.data())
                 }





             });
         }

         if (neededDis > 0 && configData.gameData.randomDis !=null) {
             var disDelItems = [];
             configData.gameData.randomDis.query({
                 filter: { logic: "and", filters: q }
             }).then(function (e) {
                 var availableDis = configData.gameData.randomDis.view().length;
                 // console.log(availableDis)
                 //console.log(configData.gameData.randomDis.view());
                 if (neededDis > availableDis) { neededDis = availableDis };
                 for (var i = 0; i < neededDis; i++) {
                     var item = configData.gameData.randomDis.view().at(i);

                     if (item != undefined) {
                         disDelItems.push(item)
                         console.log(availableDis)

                         console.log(item);
                         var obj = selectObject(item.Id);
                         obj.opacity = 1;
                         obj.state = "ready";

                         obj.setGradient('fill', dipGradientReady);
                         console.log("dis - create glow")
                         self.createGlow(obj);

                         // setTimeout(function(){
                         // configData.gameData.removeRandomDis(item);
                         //   configData.gameData.addUsedRandomDis(item);
                         // },1000);

                         locItem = getLocaleById(item.Id);
                         locItem.discResult = "ready";
                     }
                 }

                 for (var i = 0; i < disDelItems.length; i++) {
                     configData.gameData.removeRandomDis(disDelItems[i]);
                     configData.gameData.addUsedRandomDis(disDelItems[i]);
                     console.log(configData.gameData.randomDis)
                 }


             });
         }


        
    

     }, 800);


     canvas.renderAll();
// chk for all locales complete
     setTimeout(function () {
         var readyLocales = 0;

         $.each(locales, function (idx, item) {
            // console.log(item);
             var obj = selectObject(item.Id);
            // console.log(obj);
             if (obj.opacity === 1) {
                 readyLocales++;
             }
         })
         console.log(readyLocales);
         if (readyLocales == 0 && configData.dsItinerary.ds.data().length < itinSlots) {

             if (configData.gameData.popupEvents.length == 0) {
                 console.log("add and show");
                 gamePlay.addPopupEvent('gamePlay.usedAllLocales');
                 self.checkForPopup();
             } else {
                 console.log("add only");
                 gamePlay.addPopupEvent('gamePlay.usedAllLocales');
             }
            
            
         }

     },3200)
     


 },
 removeGlow(obj) {
     if (isMobile == false) {
         var glow = selectObject(obj.id + "-glow");
         if (glow != null) {
             glow.remove();
         }
     }
   //  console.log("remove " + glow.id)
 },
 createGlow: function (obj) {
     var self = this;
     if (isMobile == false && showGlow == true) {
         if (selectObject(obj.id + "-glow") == null) {
             obj.clone(function (glow) {
                 // console.log("create glow");
                 glow.fill = glowFill;
                 glow.id = obj.id + "-glow";
                 glow.stroke = "";
                 glow.strokeWidth = 0;
                 glow.shadow = shadowGlow;
                 glow.selectable = false;
                 glow.aType = "";

                 //glow.originX = "center";
                 //glow.originY = "center"

                 if (obj.opacity == 1) {
                     //  console.log("render glow");
                     // obj.opacity = 0;
                     glow.opacity = .6;
                     var glowWidth = 12;
                     if ($(window).width() < 750) { glowWidth = 25 };
                     var scaleAdjust = (obj.width + glowWidth) / obj.width;
                     var scaleInit = obj.scaleX;
                     var scaleNew = scaleInit * scaleAdjust;
                     var scale = scaleNew;
                     setTimeout(function () {
                         self.animateGlow(glow, scale, scaleInit, scaleNew);

                     }, 200);

                     //console.log(glow);

                     canvas.add(glow);
                     obj.bringToFront();
                     canvas.renderAll();
                 }

             });
         }
     }
 },
 animateGlow: function (glow, scale, scaleInit, scaleNew) {
     var self = this;
    
     if (glowEnabled == true) {
         glow.animate({ scaleX: scale, scaleY: scale }, {
             duration: 250,
             onChange: canvas.renderAll.bind(canvas),
             onComplete: function () {
                 canvas.renderAll.bind(canvas);
                 if (scale == scaleNew) {
                     scale = scaleInit
                 } else {
                     scale = scaleNew
                 }
                 setTimeout(function () {
                     self.animateGlow(glow, scale, scaleInit, scaleNew);

                 }, 500);
             }
         });
     }
 },
 hideRandomDiscovery: function (id) {

     var self = this;
     console.log("hide random");
     var dObj = selectObject(id);
     console.log(dObj)

     if (dObj.initState == "random") {
         dObj.opacity = 0;
         dObj.state = "locked";
         self.removeGlow(dObj)
        // console.log(configData.gameData.usedRandomDis.data());
         var item = configData.gameData.usedRandomDis.get(id);
         configData.gameData.removeUsedRandomDis(item);
         configData.gameData.addRandomDis(item);
         configData.gameData.currDis = configData.gameData.currDis -1;
         
     }
 },
 clearCanvas: function () {

var objs = canvas.getObjects();
console.log(objs.length);


canvas.clear();
canvas.dispose();
locales = [];
configData.gameData.set("savedBushCards", null);
     configData.gameData.set("savedCardsNum", 0);
     configData.gameData.set("unlockedScrapPages", 1);

$("#cardsList").remove();
$("#bcardLayout").remove();
setTimeout(function () {
    console.log("clear");
    console.log(canvas.getObjects());
    console.log(locales);
    $("canvas").attr("width", 950);
    $("canvas").attr("height", 680);
    currentFactor = 1;
    gamePlay.init();
}, 300);

}
}
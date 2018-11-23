var locales = {

    properties: {

    },
    init: function () {
        var imgW;
        var imgH;
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
        var locales;
       // var bkgrdImg = "china-map.png";
        var bkgrdImg = "chinamap1.jpg";
        var imgDir = "/images/system/";
        var objIsMoving = false;
        var newX;
        var newY;
        var oldX;
        var oldY;

        var aTypeOptions = [
           { id: "dip", text: "diplomacy" },
            { id: "dis", text: "discovery" },
        ];

        var rrOptions = [
           { id: "low", text: "low" },
            { id: "high", text: "high" },
        ];

        var stateOptions = [
          { id: "locked", text: "locked" },
           { id: "ready", text: "ready" },
        ];

        var dsUnlocks;

        var shadow = {
            color: 'rgba(0,0,0,0.8)',
            blur: 7,
            offsetX: 3,
            offsetY: 3,
            opacity: 0.7,
            fillShadow: true,
            strokeShadow: true
        }

        var diplomacyOptions = [
{
    id: 1, name: "Agriculture", localeId: "dip-1", intro: "Meet with China's Minister of Agriculture to Discuss Farming Policies", q: "While meeting with the diplomat, you decide to show off your knowledge of China by mentioning that the Yangtze is the longest river in:",
    answers: [
      { id: 1, text: "Western China", correct: 0 },
       { id: 2, text: "Asia", correct: 1 },
        { id: 3, text: "The World", correct: 0 },
    ],
    incorrectResponse: { title: "OOPS!", text: "No, the Yangtze is the longest river in Asia! You lost face by revealing your lack of knowledge about China.", subtext: "", bullets: ["The minister of agriculture decides not to introduce you to anyone new.", "U.S. China Relations worsen by 2 points"] },
    correctResponse: { title: "YES!", text: "The Yangtze is the longest river in Asia! The Minister of Agriculture is impressed with your knowledge of his country.", subtext: "He introduces you to the Chairman of the History & Culture Committee.", bullets: [] },
    points: 2,
},

{
    id: 2, name: "Farming", localeId: "dip-2", intro: "Meet with China's Minister of the Interior Discuss Trade Policies", q: "While meeting with the diplomat, you decide to show off your knowledge of China by mentioning that the Yangtze is the longest river in:",
    answers: [
      { id: 1, text: "Western China", correct: 0 },
       { id: 2, text: "Asia", correct: 1 },
        { id: 3, text: "The World", correct: 0 },
    ],
    incorrectResponse: { title: "OOPS!", text: "No, the Yangtze is the longest river in Asia! You lost face by revealing your lack of knowledge about China.", subtext: "", bullets: ["The minister of agriculture decides not to introduce you to anyone new.", "U.S. China Relations worsen by 2 points"] },
    correctResponse: { title: "YES!", text: "The Yangtze is the longest river in Asia! The Minister of Agriculture is impressed with your knowledge of his country.", subtext: "He introduces you to the Chairman of the History & Culture Committee.", bullets: [] },
    points: 2,
}
        ]
        var discoveryOptions = [
            { id: 1, name: "The Great Wall", localeId: "dis-1", img: "great-wall.jpg", intro: "Go See the Great Wall of China", info: "", facts: [{ text: "The Great Wall of China was built to protect against raids and invasions from nomadic groups to the east." }, { text: "Some parts of the wall are 2700 years old!" }], points: 2 },
             { id: 2, name: "Famous Landmarks", localeId: "dis-2", img: "great-wall.jpg", intro: "Go See the Great Wall of China", info: "", facts: [{ text: "The Great Wall of China was built to protect against raids and invasions from nomadic groups to the east." }, { text: "Some parts of the wall are 2700 years old!" }], points: 2 }
        ]
        var unlockOptions = [{ id: "test1", name: "test 1" }, { id: "test2", name: "test 2" }];


        vmLocales = kendo.observable({
            dsLocales:configData.dsLocales.ds

            //    new kendo.data.DataSource({
            //    type: 'everlive',
            //    transport: {
            //        typeName: 'locales'
            //    },
            //    schema: {
            //        model: {
            //            id: Everlive.idField,
            //            fields: {
            //                unlocks: { defaultValue: {} },
            //                dipContent: { defaultValue: {} },
            //                disContent: { defaultValue: {} }
            //            }
            //        }
            //    },
            //    serverFiltering: false,
            //}),
            ,
            aTypeOptions: aTypeOptions,
            rrOptions: rrOptions,
            stateOptions: stateOptions,
            unlockOptions: dsUnlocks,
            diplomacyOptions:configData.dsDiplomacy.ds, //diplomacyOptions,
            discoveryOptions: configData.dsDiscovery.ds,
            id: "",
            x: "",
            y: "",
            aType: "dip",
            state: "locked",
            rr: "low",
            icon: "",
            unlocks: [],
            dipContent: [],
            disContent: [],
            showDis : false,
            showDip : true,
            contentId:"",
            addLocale: function (syncDB) {
                var self = this;
                this.get("locales").push({
                   // id: this.get("Id"),
                    name: this.get("name"),
                    x: parseInt(this.get("x")),
                    y: parseInt(this.get("y")),
                    aType: this.get("aType"),
                    rr: this.get("rr"),
                    state: this.get("state"),
                    unlocks: this.get("unlocks"),
                    icon: this.get("icon"),
                   // showDis : false,
                    //showDip : true,
                   // dipContent: this.get("dipContent"),
                   // disContent: this.get("disContent"),
                    contentId:this.get("contentId"),
                });
                var dataItem;
                this.unlockOptions.push({ id: this.get("id"), name: this.get("name") });
                console.log(syncDB);
                if (syncDB == true) {
                     dataItem = this.locales[this.locales.length - 1]
                    var data = el.data('locales');
                    data.create(dataItem,
              function (data) {
                  console.log(dataItem.toJSON());
                 // locales.push(dataItem.toJSON());
                  // updateLines(true);
                  console.log(locales);
                  console.log(self.locales);
                  self.locales = [];
                  vmLocales.dsLocales.read();
                  createLocale(dataItem.toJSON());
//vmLocales.locales[vmLocales.locales.length - 1]
                 
              },
              function (error) {
                  console.log(JSON.stringify(error));
              });
                }
            },
            initLocaleData: function (data) {
                var self = this;
                $.each(data, function (idx, item) {
                    self.Id = item.Id;
                    self.name = item.name;
                    self.x = item.x;
                    self.y = item.y;
                    self.aType = item.aType;
                    self.state = item.state;
                    self.rr = item.rr;
                    self.icon = item.icon;
                    self.unlocks = item.unlocks;
                    self.dipContent = item.dipContent;
                    self.disContent = item.disContent;
                    self.contentId = item.contentId;
                    self.addLocale(false);

                })

            },
            sync: function () {

                // localStorage.locales = JSON.stringify(this.locales);
                // console.log(this.locales);

                this.dsLocales.sync();



            },
            aTypeSelected: function (e) {
                console.log(e)
            },
            locales: [],
        })

        events.subscribe("localesUpdated", function (data) {

            console.log("locales length: " + locales.length);
            if (locales.length == 0) {
                console.log("copy data to  empty locales data ");
                locales = data;
            }
        });

        var getImgDim = function (dir, file) {

            var newImg = $("#imgHolder");
            newImg.attr("src", dir + file)

            newImg.on("load", function () {
                setTimeout(function () {
                    var h = newImg.height();
                    var w = newImg.width();

                    imgW = w;
                    console.log(h + " " + w)
                    $("canvas").attr("width", w);
                    $("canvas").attr("height", h);

                    loadCanvas(dir, file, w, h)
                }, 500);
            })

        }

        var loadData = function () {
            if (localStorage.locales != "" && localStorage.locales != undefined) {
                srcLocales = parse.JSON(localStorage.locales);
            } else {
                // srcLocales = [];

            }

        }

        var loadCanvas = function (dir, file, w, h) {
            canvas = new fabric.Canvas('gameCanvas');


            var newBkgrdImg = fabric.Image.fromURL(dir + file, function (oImg) {
                oImg.width = w;
                oImg.height = h;
                canvas.add(oImg);
                oImg.set('selectable', false);
                oImg.sendToBack();
                canvas.renderAll();

            });


           

            vmLocales.dsLocales.fetch(function () {
                console.log("locales fetched")
                dsUnlocks = $.map(this.data().toJSON(), function (item, idx) {
                    return { id: item.Id, name: item.name }
                });

                vmLocales.unlockOptions = dsUnlocks;
                // console.log(dsUnlocks);
               // vmLocales.initLocaleData(this.data().toJSON());
                createLocales(this.data().toJSON());
            })



            canvas.on('object:moving', function (options) {

                objIsMoving = true;

            });

            canvas.on('object:modified', function (options) {

                if (objIsMoving == true) {
                    objIsMoving = false;

                    newX = options.e.offsetX;
                    newY = options.e.offsetY;


                    var x = newX;
                    var y = newY;
                    $(".pos-x").val(x);
                    $(".pos-x").trigger("change");
                    $(".pos-y").val(y);
                    $(".pos-y").trigger("change");
                    //console.log(vmLocales.locales)
                }

            });

            canvas.on('object:selected', function (options) {
              //  console.log("obj selected")
                var id = options.target.id;


                if (id != undefined && id != "temp") {
                  //  console.log(id);
                    var item = getLocaleById(id)

                    oldX = item.x;
                    oldY = item.y;

                    openEditor(id);
                    $(".submit").hide();
                    $(".save").show();

                   // removeFromUnlocks(id);


                    $(".save").on("click", function () {
                        // update object
                        item = getLocaleById(id);
                        item.dirty = true;
                        vmLocales.sync();
                        canvas.remove(options.target);
                        // console.log(item.x);
                        createLocale(item);
                        updateLines(true);
                        $(".form-wrapper").remove();

                    });

                    $(".delete").on("click", function () {
                        item = getLocaleById(id);
                        var obj = selectObject(id)
                       
                        canvas.remove(obj);
                        canvas.renderAll;
                        vmLocales.dsLocales.remove(item);
                        vmLocales.sync();
                       
                        removeFromUnlocks(id);
                        updateLines(true);
                        $(".form-wrapper").remove();
                    });

                    $(".clear-data").on("click", function () {

                        localStorage.locales = "";
                        vmLocales.locales = [];
                    });

                    $(".cancel").on("click", function () {

                        canvas.deactivateAll();
                        canvas.renderAll();
                        vmLocales.sync();

                        $(".form-wrapper").remove();
                    });

                    $(".resize").on("click", function () {

                        resizeCanvas();
                    });
                }
            });


            canvas.on('mouse:down', function (options) {
                //console.log("canvas click");
               // console.log(options);
                if (options.target) {
                  
                    var id = options.target.id;

                  //  console.log(id)
                    // get item data

                    if (id != undefined) {



                    } else {
                        console.log("new locale")
                        var x = options.e.offsetX;
                        var y = options.e.offsetY;
                        vmLocales.x = x;
                        vmLocales.y = y;

                        console.log(x + "|" + y);

                        var circle = new fabric.Circle({
                            id: "temp", radius: 10, fill: '#990000', left: x - 10, top: y - 10
                        });

                        canvas.add(circle);
                        circle.bringToFront();
                        canvas.renderAll();
                        vmLocales.id = "";
                        vmLocales.unlocks = [];
                        openEditor();

                        $(".submit").show();
                        $(".save").hide();

                        var obj = selectObject('temp');
                        $(".submit").on("click", function () {
                            vmLocales.addLocale(true)
                            //  console.log(vmLocales.id);
                            vmLocales.sync();
                            // console.log(obj)
                            obj.remove();
                            $(".form-wrapper").remove();
                            console.log(vmLocales.locales)
                           
                        });

                        $(".cancel").on("click", function () {
                            obj.remove();
                            $(".form-wrapper").remove();
                        });


                    }
                }

            });





        };

        function openEditor(itemId) {
            // console.log(itemId);
            var templateContent = $("#localeTemplate").html();
            var template = kendo.template(templateContent);
            $("#main").prepend(template);
            setTimeout(function () {
                if (itemId == undefined || itemId == "temp") {
                    kendo.bind(".form-wrapper", vmLocales);
                    var aList = $("#ddlAtype").data("kendoDropDownList");

                    aList.bind("select", function (e) {
                       
                        if (e.dataItem.id == "dis") {
                            $(".dis-content").show();
                            $(".dip-content").hide();
                        } else {
                            $(".dis-content").hide();
                            $(".dip-content").show();
                        }


                    });
                } else {
                    var item = getLocaleById(itemId)
                    if (item.aType == "dis") {
                        item.showDis = true;
                        item.showDip = false;
                    } else {
                        item.showDis = false;
                        item.showDip = true;
                    }

                    // console.log(item);
                    kendo.bind(".form-wrapper", vmLocales);
                    //item.aTypeSelected = function (e) {
                    //    console.log(e);
                    //};
                    kendo.bind(".form-wrapper", item);
                   

                    var aList = $("#ddlAtype").data("kendoDropDownList");
                    aList.bind("select", function (e) {
                        console.log(e);
                        if (e.dataItem.id == "dis") {
                            $(".dis-content").show();
                            $(".dip-content").hide();
                        } else {
                           
                           // $(".dis-content").hide();
                            $(".dis-content").remove();
                            $(".dip-content").show();
                        }


                    })
                }
            }, 200);

        }

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

            $(window).resize(function () {
                resizeCanvas();
            });


            canvas.on('mouse:over', function (e) {
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


            canvas.on('mouse:out', function (e) {
                if (currHover != "" && currHover != undefined) {
                    e.target.set('fill', currHover);
                    canvas.renderAll();
                    currHover = "";
                }
            });



            canvas.on('mouse:down', function (options) {
                console.log("canvas click")
                if (options.target) {
                    console(options.target);
                    var id = options.target.id;


                    // get item data

                    if (id != undefined) {

                        var item = getLocaleById(id)
                        console.log(item);

                        //if (item && item.hasOwnProperty("unlocks") && item.unlocks.length > 0 && item.state == "ready") {
                        //    drawLines(item, item.unlocks);
                        //    getDiplomacy(id)

                        //}

                        //if (item.aType == "dis" && item.state == "ready") {

                        //    getDiscovery(id)

                        //}

                    }
                } else {

                }
            });


            $(".close-legend").on("click", function () {
                $(".legend-content").hide();
                $(".show-legend").fadeIn();
            });


            $(".show-legend").on("click", function () {
                $(".legend-content").fadeIn();
                $(".show-legend").hide();
            });

            $(".panel-hide").on("click", function () {
                console.log("slide up");
                kendo.fx($("#statusWrapper")).slideIn("down").reverse();
                $(".panel-hide").hide();
                $(".panel-show").show();


            });

            $(".panel-show").on("click", function () {
                console.log("slide down");
                kendo.fx($("#statusWrapper")).slideIn("down").play();
                $(".panel-hide").show();
                $(".panel-show").hide();

            });

            $(".reset").off();
            $(".reset").on("click", function () {

                clearCanvas();

            });

            setBadges();

        }

        function createLocale(item) {
            // canvas.clear();
            // item = vmLocales.locales[vmLocales.locales.length - 1];
            console.log("create locale");
            console.log(item.Id);
            var stateOffsetY = 0;

            if (item.aType == "dis") {
                var circle = new fabric.Circle({
                    id: item.Id, radius: 12, fill: '#effa6e', shadow: shadow, left: item.x - 12, top: item.y - 12
                });

                canvas.add(circle);
                circle.bringToFront();
                circle.moveTo(10);
                // circle.set('selectable', false);
                if (item.state == "ready") {
                    circle.set("fill", "#ff9900");
                }

            }

            if (item.aType == "dip") {
                var triangle = new fabric.Triangle({
                    id: item.Id, width: 23, height: 23, stroke: "black", strokeWidth: 3, fill: '#effa6e', left: item.x - 12, top: item.y - 12
                });
                console.log(triangle);
                canvas.add(triangle);
                triangle.bringToFront();
                triangle.moveTo(10);

                // triangle.set('selectable', false);

                stateOffsetY = 15;
                if (item.state == "ready") {
                    triangle.set("fill", "#ff9900");
                }

                if (item && item.hasOwnProperty("unlocks") && item.unlocks.length > 0) {
                 
                    drawLines(item, item.unlocks);
                }
            }


            //if (item.state == "locked") {

            //    var text = new fabric.Text('?', { id: item.id + "-state" , fontSize:25,fontWeight:"bold", stroke:"#202020",shadow: 'rgba(255,255,255,0.9) 1px 1px 3px', left: item.x +5, top: item.y -2 + stateOffsetY });
            //    canvas.add(text);
            //    text.hasControls = false;
            //    text.hasBorders = false;
            //    text.lockMovementX = true;
            //    text.lockMovementY = true;
            //}


            canvas.renderAll();
            // resizeCanvas();




        }


        function createLocales(data) {
            // canvas.clear();

            locales = data;//vmLocales.locales;

            $.each(locales, function (idx, item) {

                var stateOffsetY = 0;

                if (item.aType == "dis") {
                    var circle = new fabric.Circle({
                        id: item.Id, radius: 12, fill: '#effa6e', shadow: shadow, left: item.x - 12, top: item.y - 12
                    });

                    canvas.add(circle);
                    circle.bringToFront();
                    circle.moveTo(10);
                    // circle.set('selectable', false);
                    if (item.state == "ready") {
                        circle.set("fill", "#ff9900");
                    }
                }

                if (item.aType == "dip") {
                    var triangle = new fabric.Triangle({
                        id: item.Id, width: 23, height: 23, stroke: "black", strokeWidth: 3, fill: '#effa6e', left: item.x - 12, top: item.y - 12
                    });

                    canvas.add(triangle);
                    triangle.bringToFront();
                    triangle.moveTo(10);

                    // triangle.set('selectable', false);

                    stateOffsetY = 15;
                    if (item.state == "ready") {
                        triangle.set("fill", "#ff9900");
                    }


                   
                }


                //if (item.state == "locked") {

                //    var text = new fabric.Text('?', { id: item.id + "-state" , fontSize:25,fontWeight:"bold", stroke:"#202020",shadow: 'rgba(255,255,255,0.9) 1px 1px 3px', left: item.x +5, top: item.y -2 + stateOffsetY });
                //    canvas.add(text);
                //    text.hasControls = false;
                //    text.hasBorders = false;
                //    text.lockMovementX = true;
                //    text.lockMovementY = true;
                //}

               

            })


           
 updateLines(false);


            canvas.renderAll();
            // resizeCanvas();

           
        }

        function updateLines(deleteLines) {


            setTimeout(function () {
 var arrLines = [];
                if (deleteLines == true) {

                    var objects = canvas.getObjects();
                    console.log(objects);
                   

                    $.each(objects, function (idx, item) {
                      
                        if (item && item.id && item.id.indexOf("line") > -1) {                           
                           arrLines.push(item);
                       }
                    });
                }
               
  
                for (var i = 0; i < arrLines.length; i++) {
                    arrLines[i].arrow.remove();
                    arrLines[i].remove();
                }

                // canvas.renderAll();
                console.log(locales)
                $.each(locales, function (idx, item) {

                    if (item.hasOwnProperty("unlocks") && item.unlocks && item.unlocks.length > 0) {
                        console.log('draw lines')
                        drawLines(item, item.unlocks);
                    }
                });
            }, 300);


        }

        function removeFromUnlocks(id) {

            vmLocales.dsLocales.filter({
                field: "unlocks",  
                    operator: function (itemValue, value) {
                        return itemValue && itemValue.find(function (item) {
                            return item.id === value;
                        });
                    }
                    , value: id,
            })
            
           // console.log(vmLocales.dsLocales.view());

            setTimeout(function () {
                arrUnlocksRefs = vmLocales.dsLocales.view();

                for (var i = 0; i < arrUnlocksRefs.length; i++) {
                   // console.log(arrUnlocksRefs[i])
                    var unlockItems = arrUnlocksRefs[i].unlocks;
                    var idx = -1; 
                    for (var j = 0; j < unlockItems.length; j++) {
                        // console.log( unlockItems[j])
                       
                        if (unlockItems[j].id == id) {
                            console.log(j);
                            idx= j
                           
                        }

                    }
                    if (idx > -1) {
                       
                        unlockItems.splice(idx, 1)
                    }
                }

               
            }, 500);
           
            vmLocales.sync();
            
        }

        function drawLines(src, targets) {
            canvas.renderAll();

          //  console.log(src);
            $.each(targets, function (idx, item) {
               // console.log(item)
                itemId = item.id;
                var targObj = selectObject(itemId);
                var srcObj = selectObject(src.Id);
                if (srcObj != null && targObj != null) {
                    // console.log(targObj);
                    //console.log(item);
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
                        strokeWidth: 3,
                        stroke: '#990000',
                        opacity: 1,
                        strokeDashArray: [15, 5],
                        id: src.Id + "-line-" + idx
                    });

                    canvas.add(line);
                    line.moveTo(1);
                   
                    var offX = 0; //(targObj.width * zRatio) / 2;
                    var offY = 0;// (targObj.height * zRatio) / 2 ;

                      offX = (targObj.width * zRatio) / 2;
                    offY = (targObj.height * zRatio) / 2;
                   
                    line.animate("x2", targObj.left + offX, {
                        onChange: canvas.renderAll.bind(canvas),
                        duration: 350,
                    });
                    line.animate("y2", targObj.top + offY, {
                        onChange: canvas.renderAll.bind(canvas),
                        duration: 350,
                    });

                   
                   
                    var y11 = srcObj.top + srcOffY;
                   var y12 = targObj.top + offY;
                   var x11 = srcObj.left + srcOffX;
                   var x12 = targObj.left + offX;
                   
                   var a = Math.atan2(y11 - y12, x11 - x12) * 180 / Math.PI -90;
                    line.arrow = new fabric.Triangle({
                        left: (srcObj.left + srcOffX) + ((targObj.left + offX) - (srcObj.left + srcOffX)) * .25+1,
                        top: (srcObj.top + srcOffY) + ((targObj.top + offY) - (srcObj.top + srcOffY)) * .25,
                        originX: 'center',
                        originY: 'center',
                        hasBorders: false,
                        hasControls: false,
                        lockScalingX: true,
                        lockScalingY: true,
                        lockRotation: true,
                        pointType: 'arrow_start',
                        angle: a,
                        opacity:.9,
                        width: 16,
                        height: 15,
                        fill: '#900000'
                    });

                    canvas.add(line.arrow);
                    line.set('selectable', false);
                    line.arrow.set('selectable', false);
                }
                })

         


        }


        function getLocaleById(id) {

            //  console.log(vmLocales.dsLocales.get(id));
            return vmLocales.dsLocales.get(id);
            

        }

        function getQDataById(id) {

            var i = $.grep(questions, function (obj, idx) {
                return obj.localeId == id;
            });

            if (i.length > 0) {
                item = i[0];
                return item;
            } else {
                return null;
            }

        }

        function getTDataById(id) {

            var i = $.grep(topics, function (obj, idx) {
                return obj.localeId == id;
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
           // console.log(canvas.getObjects())
            canvas.getObjects().forEach(function (o) {
              //  console.log(o.id + " " + ObjectName);
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

        function resizeCanvas() {
            resizing = true;
            var w = $(window).width(); //window.innerWidth; 
            var h = $(window).height(); //window.innerHeight; 

            //  console.log(w + " x " + h)
            var cw = $("canvas").width();
            var ch = $("canvas").height();//+35;



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

                $("#legend").css("bottom", -marginTop + (110 * scale) + "px");
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
                $("#legend").css("bottom", (110 * scale) + "px");

            }


            $("#toolbar").css("width", cw * zRatio + "px");
            $("#statusbar").css("width", cw * zRatio + "px");
            resizing = false;

        }


        getImgDim(imgDir, bkgrdImg);

    }
}
var gamePlay = {
    properties: {
        viewedFacts:null,
        usedFacts: null,
        factsToView: null,
        selectedFact: null,
        gameStarted: false,
        lastFactIdx: null,
       // savedBushCards:null,
    },
    init: function () {
        var self = this;
        console.log("init game")
     



        $(document).on('touchmove', function (ev) {

            if ($(ev.target).closest('.c-list-card').length == 0) {
                ev.preventDefault();
            }
        })




        // set up itin handling
        console.log($("#itin").length);
        configData.dsItinerary.getDataSource();
        configData.dsViewedLocales.getDataSource();

        $("#itin").kendoMobileListView({
            dataSource: configData.dsItinerary.ds,
            template: $("#itinTemplate").html(),
           // appendOnRefresh: true,
            autoBind:true,
        })


        $("#viewedLocations").kendoMobileListView({
            dataSource: configData.dsViewedLocales.ds,
            template: $("#viewedLocalesTemplate").html(),
            // appendOnRefresh: true,
            autoBind: true,
        })



       
       
        $("#itinerary").kendoDraggable({

            holdToDrag: false,
            hold: function (e) {
                $("#itinerary").css("border", "solid 6px #339966")
                console.log("hold");
            },
            dragstart: function (e) {
                $(e.sender.hint).css("border", "solid 6px #339966")
                console.log(e);
                $(e.currentTarget).hide();
               // $(e.sender).hide();
            },
            hint: function (element) {
               
                return element.clone();
            },
            dragend: function (e) {
                var iY = e.sender.hint.offset().top;
                var iX = e.sender.hint.offset().left;
                //e.x.client
                $(e.currentTarget).css("top", iY + "px");
                $(e.currentTarget).css("left", iX + "px");
                console.log(e);
                e.sender.hint.remove();
                $("#itinerary").css("border", "solid 6px transparent")
                $(e.currentTarget).show();
            },


        }
        );


        $(".show-visited").on("click", function () {
            $(".itin-wrapper").hide();
            $(".viewed-locales-wrapper").show();
            var buttongroup = $("#btnGroup").data("kendoMobileButtonGroup");
            buttongroup.select(1);

        })

        $(".show-itin").on("click", function () {
            $(".itin-wrapper").show();
            $(".viewed-locales-wrapper").hide();
            var buttongroup = $("#btnGroup").data("kendoMobileButtonGroup");
            buttongroup.select(0);
        })

      

        var buttongroup = $("#btnGroup").data("kendoMobileButtonGroup");
        buttongroup.select(0);


        if (checkSimulator() == false && window.screen.lockOrientation) {
             window.screen.lockOrientation('landscape');
        }
       // alert("init")
         $("#chinaMap").focus();
         //setTimeout(function(){
         //    gamePlay.getGameOver();
            
         //},3000)
        configData.gameData.adjustRank(0);
        events.subscribe("dsFactsReady", function (d) {
           // alert("ds ready");
            var arrData = d.ds.data().toJSON();
            configData.gameData.factsToView = new kendo.data.DataSource({
                schema: {
                    model: { id: "Id" }
                },
                data: arrData,
            });

            configData.gameData.factsToView.fetch(function () {
              //  console.log(configData.gameData.factsToView.data());

            })
            configData.gameData.viewedFacts = new kendo.data.DataSource({
                schema: {
                    model: { id: "Id" }
                },
            });
            configData.gameData.usedFacts = new kendo.data.DataSource({
                schema: {
                    model: { id: "Id" }
                },
            });

            configData.gameData.savedBushCards = new kendo.data.DataSource({
                schema: {
                    model: { id: "Id" }
                },
            });

             configData.dsMCQuiz.getDataSource();
            // configData.dsDiplomacy.getDataSource();
             configData.dsDiscovery.getDataSource();
             configData.dsBushCards.getDataSource();
             configData.dsMulti.getDataSource();
             configData.dsAchievements.getDataSource();
            localesMgmt.getImgDim(imgDir, bkgrdImg);
            configData.dsItinerary.getDataSource();
            configData.dsExp.getDataSource();
           
            // self.getFactByDiscoveryId();

        });
       // alert(el);
        configData.dsFacts.getDataSource();

        //document.addEventListener("online", function () {
        //    configData.dsDiplomacy.ds.online(true);
        //    configData.dsMulti.ds.online(true);
        //    configData.dsDiscovery.ds.online(true);
        //    configData.dsFacts.ds.online(true);
        //    configData.dsMCQuiz.ds.online(true);
        //    configData.dsLocales.ds.online(true);
        //    configData.dsBushCards.ds.online(true);
        //    configData.dsAchievements.ds.online(true);
        //});
        //document.addEventListener("offline", function () {
        //    configData.dsDiplomacy.ds.online(false);
        //    configData.dsMulti.ds.online(false);
        //    configData.dsDiscovery.ds.online(false);
        //    configData.dsFacts.ds.online(false);
        //    configData.dsMCQuiz.ds.online(false);
        //    configData.dsLocales.ds.online(false);
        //    configData.dsBushCards.ds.online(false);
        //    configData.dsAchievements.ds.online(false);
        //});

        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function (mql) {
               // console.log(mql.matches )
                if (mql.matches) {
                    console.log('Functionality to run before printing.');
                    //alert("printquery")
                   
                }
                if (!mql.matches) {
                    console.log('Functionality to run After printing.');
                    $("#printWindow").remove();
                }

            });
        }

      
    },
    getItinPanel: function(e) {
            var index = this.current().index();
        if (index == 0) {
            $(".itin-wrapper").show();
            $(".viewed-locales-wrapper").hide();
        }

        if (index == 1) {
            $(".itin-wrapper").hide();
            $(".viewed-locales-wrapper").show();
        }

        },
    getFactByDiscoveryId: function (id) {
        console.log("filter")
        var viewDS = configData.gameData.factsToView;

        var filter = { field: "discoveryId.Id", operator: "eq", value: id };
        console.log(filter);
        viewDS.filter(filter);
        var view = viewDS.view();
        console.log(view)
    },
    getQuizByFactId: function (id) {
        var self = this;
        console.log("filter")
       // id = "0145cbb0-900f-11e7-acb1-0993c0d5f1c1";
        var viewDS = configData.dsMCQuiz.ds;

        var filter = { field: "Id", operator: "eq", value: id };
       
        viewDS.filter(filter);
        var view = viewDS.view()[0].toJSON();
        console.log(view)
        return view;
    },
    getRandomQuiz: function () {
        var self = this;
        var flist = configData.gameData.viewedFacts.data();
        var max = flist.length - 1;

        var count = 0;
         if (flist.length > 0) {
             var dv
             do {
                 count++;
                 var idx = getRandomInt(0, max);

                 //  idx = 0;
                 var selItem = flist[idx];
                 var selFact = flist[idx].Id;
                 var qLen = 0;

                 configData.dsMCQuiz.ds.filter({ field: "factId.Id", operator: "eq", value: selFact });
                 qLen = configData.dsMCQuiz.ds.view().length;
                 if (qLen > 0) {
                     dv = configData.dsMCQuiz.ds.view()[0].toJSON();
                     configData.gameData.usedFacts.add(selItem);
                     configData.gameData.viewedFacts.remove(selItem);

                     return dv
                 } else {
                     if (count > flist.length ) {
                         qLen = 999;
                         return null;
                     }

                 }
             } while (qLen == 0 );
         } else {
             return null;
         }
        
    },
    getRandomFact: function (discId) {
        var self = this;
      
        configData.gameData.factsToView.filter({ field: "discoveryId.Id", operator: "eq", value: discId });

        var flist = configData.gameData.factsToView.view();
        console.log(flist);
        if (flist.length > 0) {
            var max = flist.length - 1;
            console.log(max);

            var idx = getRandomInt(0, max);
           
            self.properties.selectedFact = flist[idx];
            
             selFact = flist[idx];
            // self.properties.viewedFacts.add(selFact);
            //self.properties.factsToView.remove(selFact);
            var remaining = flist.length;
           // console.log(remaining + " left");
            if (remaining <= 1) {

                self.properties.lastFactIdx = self.properties.currentDiscObj.id;
                //self.properties.currentDiscObj.state = "empty";
                //closeDiscovery(self.properties.currentDiscObj.id);
                //console.log(self.properties.currentDiscObj)
                //canvas.renderAll();
            } 
            return selFact;
        } else {

            return null
        }


    },
    getDiplomacyData: function (id) {
        var self = this;
        console.log(id)
        console.log(configData.dsDiplomacy.ds.data())
             configData.dsDiplomacy.ds.filter({ field: "Id", operator: "eq", value: id });
             var dv = configData.dsDiplomacy.ds.view()[0].toJSON();
              var quiz = self.getRandomQuiz();
             // console.log(quiz);
             // console.log(dv);
        if (quiz != null) {
            dv.q = quiz.q;
            dv.answers = quiz.answers;
            shuffle(dv.answers)
            console.log(dv.answers);
            dv.factId = quiz.factId.Id;
            dv.correctiveText = quiz.correctiveText;
            console.log(dv);
            return dv
        } else {
            return dv
        }
    },

    getDiscoveryData: function (id) {
        var self = this;
        configData.dsDiscovery.ds.filter({ field: "Id", operator: "eq", value: id });
        var dv = configData.dsDiscovery.ds.view()[0].toJSON();
        console.log(dv);
        var fact = self.getRandomFact(id);
        if (fact != null) {
            dv.fact = fact.fact;

            return dv
        } else {
            return null;
        }
    },

    getDiplomacy: function (id, src) {
        var self = this;
        diploData = self.getDiplomacyData(id)
        playAudio(audioList.diplo);
       
          //  console.log(src);
//console.log(id);updateRoutes
$(".card-wrapper").remove();
//var qData = [getQDataById(id)];

//if (diploData.risk.id == "high") {
    //diploData.points = diploData.points * 2;
    //diploData.experiencePoints = diploData.experiencePoints * 2;
//}

if (typeof diploData.intro == 'undefined') {
    diploData.intro = "";
}

if (typeof diploData.quizIntro == 'undefined') {
    diploData.quizIntro = "";
}

diploData.showBullets = true;

diploPts = diploData.points;
exPts = diploData.experiencePoints;

var templateContent;
var templateType;

       var currL = getLocaleById(src)
if (currL.unlocks) {

    if (currL.unlocks.length > 0) {
         
        if (self.isLocaleVisible(currL.unlocks[0].Id) == true || configData.gameData.hasBeenUnlocked(currL.unlocks[0].Id) == true) {
            diploData.showBullets = false;

        } else {
            diploData.showBullets = true;
        }
    }

}

        console.log(diploData);

if (diploData.q && diploData.random == false) {
    templateContent = $("#diplomacyTemplate").html();
    templateType = "normal";
} else {
    templateContent = $("#diplomacyTemplate").html();
    templateType = "random";
    
        }

        console.log(templateType);

       // console.log(templateContent);
var template = kendo.template(templateContent);
var result = kendo.render(template,[diploData]);
       // console.log(result);
$("body").prepend(result);

self.renderRedButtons();
// $("body").append("<div class='modal' ></div>");

var w = $(window).width();
var h = $(window).height();
var dw = $(".diplomacy-container").width();
var dh = $(".diplomacy-container").height();
var topOffset = 95;
 var scale =1;
        //  console.log(w + " " + h + " " + dw + " " + dh)
 var marginThreshold = 295;
 if (w < dw + marginThreshold || h < dh + marginThreshold) {

     var wr = (dw + marginThreshold) / w;
     var hr = (dh + marginThreshold) / h;
   
    if (hr > wr) {
        scale = 1 / hr;
    } else {
        scale = 1 / wr;
    }

    console.log(wr + " " + hr)
               
    $(".diplomacy-container").css("transform", "scale(" + scale + ") ")
    //setTimeout(function () { 
    //    var ml = -(w - $(".diplomacy-container").width()) / 2;
    //    var mt = (h - $(".diplomacy-container").height()) / 2 ;
    //    // $(".diplomacy-container").css("top", mt + "px");
    //    //$(".diplomacy-container").css("left", ml + "px");
    //    // $(".diplomacy-container").css("margin-left", ml + "px");
    //},300)
}

var ml = -($(".diplomacy-container").width()) / 2;
var mt = (h - $(".diplomacy-container").height()) / 2 + (95*scale);
$(".diplomacy-container").css("top", mt + "px");
$(".card-wrapper").css("left", "50%");
$(".diplomacy-container").css("margin-left", ml + "px");
$(".diplomacy-container").fadeIn();





          
$(".cancel").on("click touchend", function () {
    fadeAudio(currentAudio);
    $(".diplomacy-container").fadeOut(200, function () {
       // $(".diplomacy-container").remove();
        $(".card-wrapper").remove();
    });

   
    //var locale = getLocaleById(src);
   
    //if (locale && locale.hasOwnProperty("unlocks") == true) {
    //    if (locale.unlocks != undefined) {
    //        var lineNum = locale.unlocks.length;

    //        for (var i = 0; i < lineNum ; i++) {
    //            //
    //            var line = selectObject(src + "-line-" + i);
    //            if (line) {
    //                line.remove();
    //                console.log(locale.unlocks);
    //                var targ = selectObject(locale.unlocks[i].Id);
    //                // console.log(targ);
    //                targ.opacity = 0;
    //            }
    //        }

    //        canvas.renderAll();
    //    }
    //}
});

$(".accept").on("click touchend", function (e) {
    console.log("accept");
    configData.gameData.careerList.push(diploData.name);
    configData.gameData.set("activityNum", configData.gameData.careerList.length);
    console.log(configData.gameData.activityNum);
   // console.log($(e.target).data().factid);
   
   // kendo.fx($(".diplomacy-container")).flip("horizontal", $(".dip-front"), $(".dip-back")).duration(1000).play();
  //  console.log(templateContent);

    $(".diplomacy-container").fadeOut(200, function () {
        $(".card-wrapper").remove();
        $(".diplomacy-container").remove();
    });



    var templateAContent;
    if (templateType == "random") {
        templateAContent = $("#diplomacyActionRandomTemplate").html();
    } else {
        templateAContent  = $("#diplomacyActionTemplate").html();
    }
    
    var templateA = kendo.template(templateAContent);

   

    var resultA = kendo.render(templateA, [diploData]);

    $("body").prepend(resultA);
    self.renderRedButtons();

    $(".dip-btn").on("click touchend", function (e) {
        console.log("answer click");
        //self.evalDipResp(e, diploPts, exPts, diploData.risk.id)
        self.evalDipResp(e, diploPts, exPts)
    });


    $(".continue").off();
    $(".resp-wrapper .continue").on("click touchend", function () {

        var itinExists = configData.dsItinerary.ds.get(diploData.Id)
        if (itinExists) {
            $(".resp-container").fadeOut(200, function () {
               //close

            });
        } else {
            $(".resp-container").hide();
            $(".add-itin-panel").fadeIn();
        }
    });



    var itinItem = diploData;
    $(".itin-btns .itin-yes").on("click touchend", function () {

        updateLocale(true);
        console.log("close diplo");
        $("#resultsScrim").remove();
        $("#fireworksiframe").remove();

        $(".diplomacy-container").fadeOut(200, function () {
            $(".card-wrapper").remove();
            // $(".diplomacy-container").remove();
            $("#resultsScrim").remove();
            $("#fireworksiframe").remove();
            self.checkForPopup();
        });

        $(".dis-fact").fadeOut(200, function () {
            $(".card-wrapper").remove();
            // $(".diplomacy-container").remove();
            $("#resultsScrim").remove();
            $("#fireworksiframe").remove();
            self.checkForPopup();
        });

     

       
    })

    $(".itin-btns .itin-no").on("click touchend", function () {
        console.log(itinItem);
        updateLocale(false);
        var dup = configData.dsViewedLocales.ds.get(itinItem.Id)
        if (dup == undefined) {
            configData.dsViewedLocales.ds.add(itinItem);
        }

        console.log(configData.dsViewedLocales.ds.data());
        $(".dis-fact").fadeOut(200, function () {
            $(".dis-fact").remove();
            $("#resultsScrim").remove()
            self.checkForPopup();
        });
    })

    function updateLocale(addToItin) {
        if (addToItin == undefined) { addToItin = false }

        localesMgmt.updateRoutes(src, currRespStatus)
        var dipItem = getLocaleById(src);
        var pts = parseInt(diploPts);

        var expPts = parseInt(exPts);
        console.log(currRespStatus);

        if (currRespStatus == 1) {
            //self.adjustDipMeter(pts);

            //var bCardData = configData.dsBushCards.getBushCardById(id);
            var bCardData = configData.dsBushCards.getBushCardByArrayId(id);
            if (bCardData != null) {
                if (configData.gameData.isCardSaved(id) == false) {
                    // configData.gameData.showingBushCard = true;
                    // self.getBushCard(bCardData,pts);

                    self.addPopupEvent('gamePlay.getBushCard', bCardData, pts)
                }
            } else {
                // configData.gameData.adjustRank(expPts);
                // configData.gameData.adjustRank(Math.round(expPts * expReducedPenalty));

            }

            configData.gameData.adjustRank(expPts);

            self.checkAchievements(diploData.achievementId);

            configData.gameData.adjustDipLevel(pts);

        } else {
            // self.adjustDipMeter(-pts);
            configData.gameData.adjustRank(Math.round(expPts * expReducedPenalty));
            // expPts = expPts * expReducedPenalty;
            configData.gameData.adjustDipLevel(- (Math.round(pts * reducedPenalty)));
            //configData.gameData.adjustRank(0);
        }

        dipItem.diploResult = currRespStatus;

        if (addToItin == true) {
            var dup = configData.dsItinerary.ds.get(itinItem.Id)
            if (dup == undefined) {
                configData.dsItinerary.ds.add(itinItem);
            }
        }
    }



    if (templateType == "random") {
        fadeAudio(currentAudio);

        setTimeout(function () {
            $(".outcome .fa").addClass("fa-spin");
        }, 1200);

        var result;
        var correct = 0;
        setTimeout(function () {
            var odds = 50;

            //if (diploData.risk.id = "low") {
            //    odds = lowOdds;
            //} else {
            //    odds = highOdds;
            //}
            var compare = odds ;

            var adjust = configData.gameData.expLevel / expOffset;
            compare = compare + adjust;
            console.log(compare);
                result = getRandomInt(0, 100);
           // console.log(typeof diploData.correctResponse.noQuiz);
            //console.log(result + " " + compare)

                if (result < compare) {
                    correct = 1;
                    
                 //if (diploData.risk.id == "low") {
                 //    playAudio(audioList.goodLow);
                 //} else {
                 //    playAudio(audioList.goodHigh);
                 //}
                    playAudio(audioList.goodLow);

                 if (typeof diploData.correctResponse.noQuiz != 'undefined') {
                     console.log("fail on correct")
                     var outcomeHtml = diploData.correctResponse.noQuiz;

                    // $(".outcome").html(outcomeHtml);
                 } else {
                     console.log("correct");
                     $(".outcome").html("");
                     self.evalRandom(correct);
                 }
               
             } else {
                    correct = 0;

                    //if (diploData.risk.id == "low") {
                    //    playAudio(audioList.badLow);
                    //} else {
                    //    playAudio(audioList.badHigh);
                    //}

                    playAudio(audioList.badLow);

                 if (typeof diploData.incorrectResponse.noQuiz != 'undefined') {
                     console.log("fail on incorrect")
                     var outcomeHtml = diploData.incorrectResponse.noQuiz;

                    // $(".outcome").html(outcomeHtml);
                 } else {
                     console.log("incorrect")
                     $(".outcome").html("");
                     self.evalRandom(correct);
                 }

                 if (diploData.random == false) {
                    // trigger game tip 0
                     configData.gameData.checkTips(0);
                 }
             }

             self.evalRandom(correct);
            self.showResults(correct,diploData.experiencePoints,diploData.points)

        }, 2000);

        //$(".get-random").on("click touchend", function () {
        //    self.evalRandom(correct);
        //})

    }

    var lData = getLocaleById(src);

    var duration = 1;
    if (lData.duration) {
        duration = lData.duration;
    }

   
    configData.gameData.updateDate(duration);

});



    },
    showLevelUp: function (newLevel) {
        var self = this;
        setTimeout(function () {
            console.log("show levelup");

            playAudio(audioList.levelUp);
            if (newLevel == undefined) { newLevel = 1 };
            

            var levelupData = ranks[newLevel];

            var template = kendo.template($("#levelUpTemplate").html());
            var levelup = kendo.render(template, [levelupData]);

            $("body").append(levelup);

            var w = $(window).width();
            var h = $(window).height();
            var dw = $(".levelup-container").width();
            var dh = $(".levelup-container").height();
            var topOffset = 95;
            var scale = 1;
            var marginThreshold = 455;
            if (w < dw + marginThreshold || h < dh + marginThreshold) {

                var wr = (dw + marginThreshold) / w;
                var hr = (dh + marginThreshold) / h;

                if (hr > wr) {
                    scale = 1 / hr;
                } else {
                    scale = 1 / wr;
                }

                console.log(wr + " " + hr)

                $(".levelup-container").css("transform", "scale(" + scale + ") ")

            }

            var ml = -($(".levelup-container").width()) / 2;
            var mt = (h - $(".levelup-container").height()) / 2 + (95 * scale);
            $(".levelup-container").css("top", mt + "px");
            $(".card-wrapper").css("left", "50%");
            $(".levelup-container").css("margin-left", ml + "px");
            $(".levelup-container").fadeIn();
            self.renderRedButtons();

            setTimeout(function () {

                $("body").append('<div id="resultsScrim"></div>');
                $("#resultsScrim").fadeIn(200);
                self.startFireworks("body");
            }, 0);

            setTimeout(function () {
                var curr = $(".rank-text.current");
                var prev = $(".rank-text.prev");
                kendo.fx(curr).slideIn("down").duration(800).play();
                kendo.fx(prev).slideIn("up").duration(800).reverse();
                $(".rank-desc").fadeIn(800)
                // 
            }, 1200);


            $(".close-levelup").on("click touchend", function () {
                fadeAudio(currentAudio);
                $(".card-wrapper").remove();
                $("#resultsScrim").remove();
                $("#fireworksiframe").remove();
                console.log("levelidx: " + configData.gameData.levelIdx);
                setTimeout(function(){
                    if (newLevel >= 4) {
                        gamePlay.getGameOver();
                    }
                    gamePlay.checkForPopup();
                },2000)
            });

        }, 750);
    },

    showResults: function (correct,expPts, dipPts) {
        console.log("show results");
        var self = this;
        if (correct == 1) {
            expPts = "+" + expPts;
            dipPts = "+" + dipPts;
            ptClass = "";
        } else {
            expPts = "+" + Math.round(expPts * expReducedPenalty);
            dipPts = "-" + Math.round(dipPts * reducedPenalty);
            ptClass = "fail";
        }
        var resultsData = [{ correct: correct, expPts: expPts, dipPts: dipPts, ptClass:ptClass, meterValue:configData.gameData.meterValue }];

        var template = kendo.template($("#resultsTemplate").html());
        var result = kendo.render(template, resultsData);

       

        $(".diplomacy-container").append(result)
        setTimeout(function () {

            $("body").append('<div id="resultsScrim"></div>');
             $("#resultsScrim").fadeIn(200);
             $("#resultsContainer").fadeIn(400, function () {
                 self.animateDiploLevel(dipPts);
                 if (correct == 1) {  
                    self.startFireworks("body");
                     self.startFire("#dragonWrapperLrg .dragon-gold");
                 } else {
                     self.startSmoke("#dragonWrapperLrg .dragon-gold");
                 }
               });
        }, 200)

        
    },
    animateDiploLevel: function (pts) {
        pts = parseInt(pts);
        console.log(pts);
        console.log(configData.gameData.diplomacyLevel);
        var finalVal = (configData.gameData.diplomacyLevel + pts) * dMeterAdjust;
        var dragon = $("#dragonWrapperLrg .dragon-gold");
        console.log(finalVal)
       // console.log(finalVal)
        dragon.animate({width: finalVal + "%"},800)

    },

    startFireworks: function (elem) {
        console.log("start fireworks");
        var w = $(window).width();
        var h = $(window).height();
                     $("body").prepend('<iframe id="fireworksiframe" width="' + w + '" height="' + h + '" src="fireworks2.html" style="position:absolute;z-index:50" />');
                     $("#fireworksiframe").fadeIn();
 setTimeout(function () {
                         $("#fireworksiframe").remove();
                     }, 19000);
        
    },

    startFire: function (elem) {
        console.log("start fire")
		    if ($("#fire")) {
		        $("#fire").remove();
}
		    var scale = .5;
$("#resultsContainer").prepend("<canvas id='fire' width='400' height='300' style='position:absolute;pointer-events:none;z-index:19' />")
//$("#fire").css("transform", "scale(" + scale + ") ");
var imgw = $(elem).find("img").width();
var elemw = $(elem).width();
//var pLeft = elemw / 2 + imgw / 2 - 40;

var pLeft;
var pTop;

if ($(window).width() < 1025) {
    pLeft = imgw - 90;
    pTop = $(elem).position().top - 90;

} else {
    pLeft = imgw - 130;
    pTop = $(elem).position().top - 50;
}
console.log(pLeft);
//$(elem).position().left;
		  



$("#fire").css("left", pLeft + "px");
$("#fire").css("top", pTop + "px");
$("#fire").css("z-index", 10);
cr_createRuntimeFire("fire");
timeout = setTimeout('$("#fire").remove();', 5500);
},

    startSmoke: function (elem) {

    if ($("#smoke")) {
        $("#smoke").remove();
    }

    $("#resultsContainer").prepend(" <canvas id='smoke' width='400' height='300' style='position:absolute;pointer-events:none;z-index:19' />")
    var imgw = $(elem).find("img").width();
    var elemw = $(elem).width();
    var pLeft =  imgw  - 130;
    //$(elem).position().left;

    var pTop = $(elem).position().top - 90;


    $("#smoke").css("left", pLeft + "px");
    $("#smoke").css("top", pTop + "px");
    $("#smoke").css("z-index", 10);
    cr_createRuntimeSmoke("smoke");
    timeout = setTimeout('$("#smoke").remove();', 5500);
},
    getDiscovery: function (id, src) {
        var self = this;
       
        playAudio(audioList.discover);
        self.properties.currentDiscObj = selectObject(src);
        var discData = self.getDiscoveryData(id);
       
        if (discData != null) {
            var tData = [discData];

            var templateContent = $("#discoveryTemplate").html();
            var template = kendo.template(templateContent);

            // console.log(tData);

            var result = kendo.render(template, tData);

            $("body").prepend(result);
            self.renderRedButtons();

            var w = $(window).width();
            var h = $(window).height();
            var dw = $(".discovery-container").width();
            var dh = $(".discovery-container").height();
            // console.log(w + " " + h + " " + dw + " " + dh)
            if (w < dw + 170 || h < dh + 170) {

                var wr = (dw + 220) / w;
                var hr = (dh + 220) / h;
                var scale;
                if (hr > wr) {
                    scale = 1 / hr;
                } else {
                    scale = 1 / wr;
                }

                console.log(wr + " " + hr)

                $(".discovery-container").css("transform", "scale(" + scale + ") ")
                setTimeout(function () {
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
            var imgBack = imgDir + tData.bkgrdImgBack
           
            setTimeout(function () {
                $(".cancel").off();
                $(".cancel").on("click touchend", function () {

                    fadeAudio(audioList.discover);
                    $(".discovery-container").fadeOut(200, function () {
                        $(".card-wrapper").remove();
                        $(".discovery-container").remove();
                    });

                });
                $(".accept").off();
                $(".accept").on("touchend click", function (e) {
                    configData.gameData.careerList.push(discData.name);
                    configData.gameData.set("activityNum", configData.gameData.careerList.length);
                    console.log(configData.gameData.activityNum);
                    audioList.discover.play();
                    // kendo.fx($(".discovery-container")).flip("horizontal", $(".dis-front"), $(".dis-back")).duration(1000).play();
                    $(".discovery-container").fadeOut(200, function () {
                        $(".card-wrapper").remove();
                        $(".discovery-container").remove();
                    });

                    if (self.properties.lastFactIdx == self.properties.currentDiscObj.id) {

                self.properties.currentDiscObj.state = "empty";
                closeDiscovery(self.properties.currentDiscObj.id);
                console.log(self.properties.currentDiscObj)
                        canvas.renderAll();
                        self.properties.lastFactIdx = null;
                    }

                    var templateFContent = $("#discoveryFactTemplate").html();
                    var templateF = kendo.template(templateFContent);

                    console.log(tData);

                    var resultF = kendo.render(templateF, tData);

                    $("body").prepend(resultF);
                    self.renderRedButtons();

                    self.registerFactAsViewed(tData[0].Id);
                    setTimeout(function () {
                        $(".continue").off();

                        $(".dis-btn .continue").on("click touchend", function () {

                           
                            $(".dis-btn .continue").remove();
                            updateDiscovery(src);
                            localesMgmt.updateLocalesStates();

                             var bCardData = configData.dsBushCards.getBushCardByArrayId(id);
                            if (bCardData != null) {
                                if (configData.gameData.isCardSaved(id) == false) {
                                   
                                    self.addPopupEvent('gamePlay.getBushCard', bCardData)
                                }
                            }

                            var lData = getLocaleById(src);

                            var duration = 1;
                            if (lData.duration) {
                                duration = lData.duration;
                            }
                            configData.gameData.updateDate(duration);


                            var itinExists = configData.dsItinerary.ds.get(discData.Id)
                            if (itinExists) {
                                $(".dis-fact").fadeOut(200, function () {
                                    $(".dis-fact").remove();

                                    self.checkForPopup();
                                });
                            } else {
                            $(".fact-text").hide();
                            $(".add-itin-panel").fadeIn();
                            }
                           
                          
                        });

 var itinItem = discData;
                        $(".itin-btns .itin-yes").on("click touchend", function () {
                           
                           
                            var dup = configData.dsItinerary.ds.get(itinItem.Id)
                        if (dup == undefined) {
                            configData.dsItinerary.ds.add(itinItem);
                        }

                            $(".dis-fact").fadeOut(200, function () {
                                $(".dis-fact").remove();

                                self.checkForPopup();
                            });
                        })

                        $(".itin-btns .itin-no").on("click touchend", function () {
 console.log(itinItem);

                            var dup = configData.dsViewedLocales.ds.get(itinItem.Id)
                            if (dup == undefined) {
                                configData.dsViewedLocales.ds.add(itinItem);
                            }

                            console.log(configData.dsViewedLocales.ds.data());
                            $(".dis-fact").fadeOut(200, function () {
                                $(".dis-fact").remove();
                                $("#resultsScrim").remove()
                                self.checkForPopup();
                            });
                        })


                    }, 450)

                });
            }, 450);
          

        } else {
           
           // closeDiscovery(src)
        }

    },
    removeItinItem: function (itemId) {
       
console.log("remove");
        if (itemId == undefined) {
    console.log($(this));
if($(this).attr("data-id")){
itemId= $(this).attr("data-id");

}

}
console.log(itemId);
var item =configData.dsItinerary.ds.get(itemId)
if(item){
    configData.dsItinerary.ds.remove(item);
    configData.dsViewedLocales.ds.add(item)
}

    },
    addItinItem: function (itemId) {

        console.log("add");

        var item = configData.dsViewedLocales.ds.get(itemId)
        if (itemId != undefined) {

            var dup = configData.dsItinerary.ds.get(itemId)
            if (dup == undefined) {
                configData.dsItinerary.ds.add(item);
                configData.dsViewedLocales.ds.remove(item)

            }
           
        }
    },
    getBushCard: function (bCardData,pts) {
        var self = this;
       // configData.gameData.showingBushCard = true;
        setTimeout(function () {

            playAudio(audioList.bushCard);
            collectedCards++
            bCardData.collectedNum = collectedCards;
            var bData = [bCardData];

            var bTemplateContent = $("#bCardTemplate").html();
            var bTemplate = kendo.template(bTemplateContent);

            // console.log(tData);

            var bResult = kendo.render(bTemplate, bData);

            $("body").prepend(bResult);
            self.renderRedButtons();

            var w = $(window).width();
            var h = $(window).height();
            var dw = $(".bcard").width() + $(".bcard-content").width();
            var dh = $(".bcard-content").height();
            // console.log(w + " " + h + " " + dw + " " + dh)
            // if (w < dw + 100 || h < dh + 100) {


            if (w < 750) {
                var wr = (dw + 200) / w;
                var hr = (dh + 150) / h;
                var scale;
                if (hr > wr) {
                    scale = 1 / hr;
                } else {
                    scale = 1 / wr;
                }

                console.log(wr + " " + hr)

                $(".bcard").css("transform", "scale(" + scale + ") ");
                $(".bcard-content").css("transform", "scale(" + scale + ") ")

                var ml = -($(".bcard").width()) / 2;
                var mt = (h - $(".bcard").height()) / 2 - 25;
                $(".bcard").css("top", mt + "px");
                $(".card-wrapper").css("left", "-7%");



                var bcl = ($(".card-wrapper").offset().left + $(".bcard").width()) * scale - 10;
                var bct = h / 2 - $(".bcard-content").height() / 2;
                console.log($(".card-wrapper").width());
                console.log($(".bcard").width());
                $(".bcard-content").css("left", bcl + "px");
                $(".bcard-content").css("top", bct + "px");

                //setTimeout(function () {
                //    var ml = -(w - $(".bcard").width()) / 2;
                //    var mt = (h - $(".bcard").height()) / 2;

                //}, 300)
            } else {

                if (w < 1025) {


                    var wr = (dw + 350) / w;
                    var hr = (dh + 350) / h;
                    var scale;
                    if (hr > wr) {
                        scale = 1 / hr;
                    } else {
                        scale = 1 / wr;
                    }

                    console.log(wr + " " + hr)

                    $(".bcard").css("transform", "scale(" + scale + ") ");
                    $(".bcard-content").css("transform", "scale(" + scale + ") ")

                    var ml = -($(".bcard").width()) / 2;
                    var mt = (h - $(".bcard").height()) / 2 - 25;
                    $(".bcard").css("top", mt + "px");
                    $(".card-wrapper").css("left", "15%");



                    var bcl = ($(".card-wrapper").offset().left + $(".bcard").width()) * scale + 25;
                    var bct = h / 2 - $(".bcard-content").height() / 2;
                    console.log($(".card-wrapper").width());
                    console.log($(".bcard").width());
                    $(".bcard-content").css("left", bcl + "px");
                    $(".bcard-content").css("top", bct + "px");

                } else {

                    var ml = -($(".bcard").width()) / 2;
                    var mt = (h - $(".bcard").height()) / 2;
                    $(".bcard").css("top", mt + "px");

                    var cardLeftPos = $(window).width() / 2 - ($(".card-wrapper").width() + $(".bcard").width()) / 1.1
                    $(".card-wrapper").css("left", cardLeftPos + "px");



                    var bcl = $(".card-wrapper").offset().left + $(".bcard").width() - 20;
                    var bct = h / 2 - $(".bcard-content").height() / 2;
                    console.log($(".card-wrapper").width());
                    console.log($(".bcard").width());
                    $(".bcard-content").css("left", bcl + "px");
                    $(".bcard-content").css("top", bct + "px");

                }
            }

            // set events

            $(".save-card").off();
            $(".save-card").on("click touchend", function () {

                self.hideBushCard(bCardData,pts);
            

            })

            $(".bcard").fadeIn(350);

        }, 500);
    },
    hideBushCard: function (bCardData,pts) {
        configData.gameData.addBushCard(bCardData);

        $(".bcard").fadeOut(200, function () {
            $(".bcard").remove();
        });

        $(".bcard-content").fadeOut(600, function () {
            $(".bcard-content").remove();
            $(".card-wrapper").remove();

           // configData.gameData.showingBushCard = false;
            if( pts != undefined && pts != 0){
                configData.gameData.adjustRank(pts);            
            }

            gamePlay.checkForPopup();
        });
        console.log(configData.gameData.savedBushCards);
    },
    getBcardLayout: function () {
        var self = this;
        console.log("get bcard layout");
 
        $(".messagebar").remove();

        configData.dsBushCards.ds.filter([]);
       
        var bcardsVM = kendo.observable({
            cardList: configData.dsBushCards.ds.view().toJSON(),
        });
         var bTemplateContent = $("#bCardLayoutTemplate").html();
        var bTemplate = kendo.template(bTemplateContent);

        var bResult = kendo.render(bTemplate,  [bcardsVM]);

         $("body").prepend(bResult);
         kendo.bind($("#bCardLayout"), bcardsVM);

         playAudio(audioList.bushLayout)

         self.scaleBushCards();

        
         setTimeout(function () {
            
          

            $(".close-bush-cards").on("click touchend", function () {
                fadeAudio(currentAudio);
                self.removeBushCards();   
            });
          
            $.each(configData.gameData.savedBushCards.data().toJSON(), function (idx, item) {
                 console.log(item.number)

                var num = parseInt(item.number) - 1;
                setTimeout(function () {
                    kendo.fx($(".bcardfull-container").eq(num)).flip("horizontal", $(".bc-front").eq(num), $(".bc-back").eq(num)).duration(500).play();
                }, idx * 500);
            });

            if (isMobile == false) {
                self.renderRedButtons();

                $("#bCardLayout .print").off();
                $("#bCardLayout .print").on("click touchend", function () {

                    gamePlay.printElement($("#cardsList").html(), "bCards")
                });
            }
         }, 500);

    },
    scaleBushCards: function () {

        var availW = $(window).width() - 100;
          var availH = $(window).height() - ($(".heading-text").height() + $("#bCardLayout .header").height())-50;
           
        var cardW = $(".bcardfull-content").width() ;
        var cardH = $(".bcardfull-content").height();
        var wScale = availW / (cardW * 5)
        var hScale = availH / (cardH * 2);
        var listW = cardW *5 +70;
        var clhOriginal = cardH * 2;
        console.log(availW + " " + availH);
        if (wScale < hScale) {
            if (wScale < 1) {
                console.log("scale by width");
                $(".bcardfull-content").css("width", cardW * wScale + "px");
                 $(".cards-wrapper").css("transform", 'scale(' + wScale + ')');

                console.log(cardW + " " + wScale);
                $(".cards-wrapper").css("margin-top", (cardH * wScale) - cardH + "px");
                  $("#cardsList").css("margin-left", "-60px");
                    var newMargin = $(".cards-wrapper").eq(0).position().top;
                $("#cardsList").css("margin-top", (newMargin + 10) + "px")
               listW = listW * wScale;
            } else {

                $(".cards-wrapper").css("transform", 'scale(' + 1 + ')');

            }

        } else {

            if (hScale < 1) {
              
                  console.log("scale by height");
                $(".bcardfull-content").css("height", cardH * hScale + "px");
                $(".bcardfull-content").css("width", cardW * hScale + "px");
     $(".cards-wrapper").css("transform", 'scale(' + hScale + ')');

                console.log(cardH + " " + hScale);
            
                clhNew = clhOriginal * hScale;
                var offset = $(".heading-text").height() + $("#bCardLayout .heading").height();
                 var newMargin = $(".cards-wrapper").eq(0).position().top; //0;//cardH * hScale / 2; cardH * hScale / 3;//
             
                 $("#cardsList").css("margin-top", -(newMargin+10) + "px")
                   listW = listW * hScale;
            } else {

                $(".cards-wrapper").css("transform", 'scale(' + 1 + ')');

            }

        }
        
        $("#cardsList").css("width", listW + "px");
        $("#cardsList").css("margin-left", ($(window).width() - listW) / 2 - 35 + "px");

      
      
    },
    getbcardfull: function (bData) {

        console.log(bData);
        var bTemplateContent = $("#bCardFullTemplate").html();
        var bTemplate = kendo.template(bTemplateContent);

        var bResult = kendo.render(bTemplate, bData);

       // $("body").prepend(bResult);

       // $(".full-card").css({ transform: 'scale(' + .35 + ')' })
//        $(".bcardfull-container").on("click touchend", function () {
//console.log("flip")
//kendo.fx($(this)).flip("horizontal", $(".bc-front"), $(".bc-back")).duration(1000).play();

      //  })
       return bResult 
    },
    removeBushCards: function () {
        $(".scrim").remove();
        $("#bCardLayout").remove();
       
    },
    renderRedButtons: function () {

        $(".red-btn-container").each(function (idx, item) {
           // console.log($(item).html())
            if ($(item).html() == "") {
                var btnData = {};
                btnData.styles = "";
                if ($(item).data().text) {
                    btnData.text = $(item).data().text;
                } else {
                    btnData.text = "";
                }

                if ($(item).data().width) {
                    btnData.width = $(item).data().width + "px";
                    btnData.styles = btnData.styles + ";width: " + btnData.width;
                }
                if ($(item).data().height) {
                    btnData.height = $(item).data().height + "px";
                    btnData.styles = btnData.styles + ";height: " + btnData.height;
                }

                if ($(item).data().fontsize) {
                    btnData.fontsize = $(item).data().fontsize + "px";
                    btnData.styles = btnData.styles + ";font-size: " + btnData.fontsize;
                }


                btnData.styles = btnData.styles.substring(1);

                var template = kendo.template($("#redButtonTemplate").html());
                var result = kendo.render(template, [btnData]);

                $(item).html(result);
            }
            });
        
    },
    getCareer: function () {
        var self = this;
        playAudio(audioList.career)

        console.log(configData.gameData.achievementList.data().length);
        var aNum = configData.gameData.achievementList.data().length == undefined ? 0: configData.gameData.achievementList.data().length;

        configData.gameData.set("achievementNum", aNum)
        var careerVM = kendo.observable({
            activities: configData.gameData.careerList,
            expLevel: configData.gameData.expLevel,
            levelup: configData.gameData.levelup,
            ranksList:ranks,
            achievements: configData.gameData.achievementList,
           // achievements: configData.dsAchievements.ds,
            achievementNum: configData.gameData.achievementNum,
            achievementTotal: configData.gameData.achievementTotal,
            totalCards:configData.gameData.totalCards,
            savedCardsNum: configData.gameData.savedCardsNum,
        });
        var cTemplateContent = $("#careerTemplate").html();
        var cTemplate = kendo.template(cTemplateContent);

        var cResult = kendo.render(cTemplate, [careerVM]);

        $("body").prepend(cResult);
        kendo.bind($("#careerLayout"), careerVM);

        if (isMobile == true) {
            var lists = $(".sc-content");
            lists.removeClass("sc-content");
            lists.addClass("sc-content-mobile");

            $('.c-list-card').on('touchend', function () {
                var el = $(this);
                if (el.scrollTop() <= 0) {
                    el.scrollTop(1);
                }
                if (el.scrollTop() >= el[0].scrollHeight) {
                    el.scrollTop(el[0].scrollHeight - 1);
                }
            });

           
        }
       
        $("#careerLayout .rank-list .item").eq(configData.gameData.rankIdx).addClass("sel-rank");
        $("#careerLayout .rank-list .item").eq(configData.gameData.rankIdx).prepend("<i class='fa fa-caret-right'></i>");

        $(".view-bcards").off();
        $(".view-bcards").on("click touchend", function () {
            fadeAudio(currentAudio);
            $("#careerLayout").remove();
            $("#careerScrim").remove();

            gamePlay.getBcardLayout();
        });

        $(".close-career").off();
        $(".close-career").on("click touchend", function () {
            fadeAudio(currentAudio);
            $("#careerLayout").remove();
            $("#careerScrim").remove();
        });


        $(".reset-game").off();
        $(".reset-game").on("click touchend", function () {
            location.href = configData.gameData.appPage;

            //app.mobileApp.navigate("components/intro/view.html")
            // app.mobileApp.navigate("#intro")
            //app.home.navToIntro(self);
        });


        if (isMobile == false) {

            self.renderRedButtons();
            $(".print").off();
            $(".print").on("click touchend", function () {
                //self.printElement($(".card-content.achievements"))
                self.printElement($("#achievementList"), "achievements")


            })
        }
        self.scaleCareers();
    },
    scaleCareers: function () {

        var availW = $(window).width() - 100;
        var availH = $(window).height() - ($(".heading-text").height() + $("#bCardLayout .header").height()) - 50;

        var carW = $(".career-content").width();
        var carH = $(".career-content").height();
        var wScale = availW / (carW )
        var hScale = availH / (carH );
       // var listW = cardW * 5 + 70;
       // var clhOriginal = cardH * 2;
        console.log(availW + " " + availH);
        if (wScale < hScale) {
            if (wScale < 1) {
                console.log("scale by width");
                //$(".career-content").css("width", carW * wScale + "px");
               // $(".career-wrapper").css("transform", 'scale(' + wScale + ')');


                var transTop = (1 - wScale) * 100 / 2;
                $(".career-content").css({ transform: 'translate(0% ,-' + transTop + '%) scale(' + wScale + ')' });

            //    console.log(cardW + " " + wScale);
               // $(".career-wrapper").css("margin-top", (carH * wScale) - carH + "px");
               // $("#cardsList").css("margin-left", "-60px");
              //  var newMargin = $(".career-wrapper").eq(0).position().top;
               // $("#cardsList").css("margin-top", (newMargin + 10) + "px")
               // listW = listW * wScale;
            } else {

                $(".career-wrapper").css("transform", 'scale(' + 1 + ')');

            }

        } else {

            if (hScale < 1) {

                console.log("scale by height");
              //  $(".career-content").css("height", carH * hScale + "px");
                //$(".career-content").css("width", carW * hScale + "px");
              //  $(".career-content").css("transform", 'scale(' + hScale + ')');
                var transTop = (1 - hScale)*100/2 ;
                $(".career-content").css({ transform: 'translate(0% ,-' + transTop + '%) scale(' + hScale + ')' });

                console.log(carH + " " + hScale);

               // clhNew = clhOriginal * hScale;
              //  var offset = $(".heading-text").height() + $("#bCardLayout .heading").height();
              //  var newMargin = $(".cards-wrapper").eq(0).position().top; //0;//cardH * hScale / 2; cardH * hScale / 3;//

              //  $("#cardsList").css("margin-top", -(newMargin + 10) + "px")
               // listW = listW * hScale;
            } else {

                $(".career-wrapper").css("transform", 'scale(' + 1 + ')');

            }

        }

       // $("#cardsList").css("width", listW + "px");
       // $("#cardsList").css("margin-left", ($(window).width() - listW) / 2 - 35 + "px");



    },
    scaleGameOver: function () {
        console.log("scale gameover");
        var availW = $(window).width() - 100;
        var availH = $(window).height() - ($(".heading-text").height() + $("#gameoverLayout .header").height()) - 50;

        var carW = 1200//$(".gameover-content").width();
        var carH = 400//$(".gameover-content").height();
        var wScale = availW / (carW)
        var hScale = availH / (carH);
        // var listW = cardW * 5 + 70;
        // var clhOriginal = cardH * 2;
        console.log(availW + " " + availH);
        console.log(carW + " " + carH);
        if (wScale < hScale) {
            if (wScale < 1) {
                console.log("scale by width");
               console.log(wScale)
                var transTop = (1 - wScale) * 100 / 2;
                $(".gameover-content").css({ transform: 'translate(0% ,' + transTop + '%) scale(' + wScale + ')' });
                // $(".gameover-wrapper").css({ transform: 'translate(0% ,-' + transTop + '%) scale(' + wScale + ')' });
                if (wScale < .8) {
                    $(".gameover-wrapper").css("background-position", "0px 20px");
                }
            } else {

                $(".gameover-wrapper").css("transform", 'scale(' + 1 + ')');

            }

        } else {

            if (hScale < 1) {

                console.log("scale by height");
                    var transTop = (1 - hScale) * 100 / 2;
                    $(".gameover-content").css({ transform: 'translate(0% ,-' + transTop + '%) scale(' + hScale + ')' });
                    if (hScale < .8) {
                        $(".gameover-wrapper").css("background-position", "0px 20px");
                    }
                console.log(carH + " " + hScale);

            } else {

                $(".gameover-wrapper").css("transform", 'scale(' + 1 + ')');

            }

        }



    },
    registerFactAsViewed: function (factId) {
        var self = this;
        var selFact = self.properties.selectedFact;
        configData.gameData.viewedFacts.add(selFact);
        configData.gameData.factsToView.remove(selFact);
    },
    getGameOver: function () {
        var self = this;
        var activityNum;
        var careerVM = kendo.observable({
            activities: configData.gameData.careerList,
            expLevel: configData.gameData.expLevel,
            currentRank: ranks[configData.gameData.rankIdx].name,
            totalCards: configData.gameData.totalCards,
            savedCardsNum: configData.gameData.savedCardsNum,
            activityNum: configData.gameData.careerList.length,
        });
        var cTemplateContent = $("#gameCompletedTemplate").html();
        var cTemplate = kendo.template(cTemplateContent);

        var cResult = kendo.render(cTemplate, [careerVM]);

        $("body").prepend(cResult);
        kendo.bind($("#gameoverLayout"), careerVM);
        self.renderRedButtons()
       


        playAudio(audioList.levelUp);


        $(".view-bcards").off();
        $(".gameover-content .view-bcards").on("click touchend", function () {
            fadeAudio(currentAudio);
           

            gamePlay.getBcardLayout();
        });

        $(".gameover-content .btn-career").on("click touchend", function () {
            fadeAudio(currentAudio);
            gamePlay.getCareer();
        });


        $(".gameover-content .play-again").on("click touchend", function () {
            fadeAudio(currentAudio);
            location.href = configData.gameData.appPage;

        });
        this.scaleGameOver();

    },

    evalDipResp: function (e, dipPts, expPts) {
        var self = this;
       // console.log(risk);
        console.log($(e.target).closest(".dip-btn"));

        var targ = $(e.target).closest(".dip-btn");


        var correct = targ.data().corr;
      
        if (correct == 1) {

            //if (risk == "low") {
            //    playAudio(audioList.goodLow);
            //} else {
            //    playAudio(audioList.goodHigh);
            //}

            playAudio(audioList.goodLow);




            $(".card-content .heading").text("DIPLOMACY SUCCESS");

           // $(".card-content .heading").text($(e.target).data().corrresp);
            $(".q-wrapper").hide();
            $(".corr-resp").show();
            $(".resp-wrapper").fadeIn();
            currRespStatus = 1;
           

        } else {
            //$(".card-content .heading").text($(e.target).data().incorrresp);
            //if (risk == "low") {
            //    playAudio(audioList.badLow);
            //} else {
            //    playAudio(audioList.badHigh);
            //}

            playAudio(audioList.badLow);

            $(".card-content .heading").text("DIPLOMACY FAILURE");

            $(".q-wrapper").hide();
            $(".incorr-resp").show();
            $(".resp-wrapper").fadeIn();
            currRespStatus = 0;
           
        }
      
        self.showResults(correct, expPts, dipPts)
    },

    evalRandom: function (correct) {
        console.log("correct: " + correct)
        if (correct == 1) {
            console.log("success");
            $(".card-content .heading").text("DIPLOMACY SUCCESS");
            $(".q-wrapper").hide();
            $(".corr-resp").show();
            $(".resp-wrapper").fadeIn();
            currRespStatus = 1;
        } else {
            $(".card-content .heading").text("DIPLOMACY FAILURE");

            $(".q-wrapper").hide();
            $(".incorr-resp").show();
            $(".resp-wrapper").fadeIn();
            currRespStatus = 0;
        }
    },
    isLocaleVisible: function (id) {
        var obj = selectObject(id);

        if (obj !== null && obj.opacity == 1) {
            return true;
        } else {
            return false;
        }
    },
    checkAchievements: function (id) {
        var self = this;
        if (id != undefined) {
            if (configData.gameData.hasOwnProperty("required-" + id) == true) {
                console.log("****** achievement *******");
                console.log(configData.gameData["earned-" + id]);
                console.log(configData.gameData["required-" + id]);
               // console.log();
                configData.gameData["earned-" + id]++;
                if(configData.gameData["earned-" + id] == configData.gameData["required-" + id]) {
                    console.log(configData.gameData["required-" + id]);
                    var achievement = configData.dsAchievements.ds.get(id);
                    configData.gameData.achievementList.add(achievement);

                    console.log(configData.gameData.achievementList.data());
                    // self.showAchievement(achievement);
                    self.addPopupEvent('gamePlay.showAchievement', achievement)
                }
                
            }
        }
    },
    showAchievement: function (achievement) {
        var self = this;
        console.log("show achievement");
        setTimeout(function () {
            console.log("show achievement");

            playAudio(audioList.achievement);
           
            var template = kendo.template($("#achievementTemplate").html());
            var achievementHtml = kendo.render(template, [achievement]);
            console.log(achievement)
            $("body").append(achievementHtml);

            var w = $(window).width();
            var h = $(window).height();
            var dw = $(".achievement-container").width();
            var dh = $(".achievement-container").height();
            var topOffset = 10;
            var scale = 1;
            var marginThreshold = 455;
            if (w < dw + marginThreshold || h < dh + marginThreshold) {

                var wr = (dw + marginThreshold) / w;
                var hr = (dh + marginThreshold) / h;

                if (hr > wr) {
                    scale = 1 / hr;
                } else {
                    scale = 1 / wr;
                }

                console.log(wr + " " + hr)

                $(".achievement-container").css("transform", "scale(" + scale + ") ")

            }

            var ml = -($(".achievement-container").width()) / 2;
            var mt = (h - $(".achievement-container").height()) / 2 + (topOffset * scale);
            $(".achievement-container").css("top", mt + "px");
            $(".card-wrapper").css("left", "50%");
            $(".achievement-container").css("margin-left", ml + "px");
            $(".achievement-container").fadeIn();
            self.renderRedButtons();

          


            $(".close-achievement").on("click touchend", function () {
                fadeAudio(currentAudio);
                $(".card-wrapper").remove();
                gamePlay.checkForPopup();
             
            });

        }, 750);
    },
    showGametip: function (tipData) {
        var self = this;
        console.log("show gametip");
        setTimeout(function () {
           
           
            var template = kendo.template($("#gametipTemplate").html());
            var achievementHtml = kendo.render(template, [tipData]);
            console.log(tipData)
            $("body").append(achievementHtml);

            var w = $(window).width();
            var h = $(window).height();
            var dw = $(".gametip-container").width();
            var dh = $(".gametip-container").height();
            var topOffset = 10;
            var scale = 1;
            var marginThreshold = 455;
            if (w < dw + marginThreshold || h < dh + marginThreshold) {

                var wr = (dw + marginThreshold) / w;
                var hr = (dh + marginThreshold) / h;

                if (hr > wr) {
                    scale = 1 / hr;
                } else {
                    scale = 1 / wr;
                }

                console.log(wr + " " + hr)

                $(".gametip-container").css("transform", "scale(" + scale + ") ")

            }

            var ml = -($(".gametip-container").width()) / 2;
            var mt = (h - $(".gametip-container").height()) / 2 + (topOffset * scale);
            $(".gametip-container").css("top", mt + "px");
            $(".card-wrapper").css("left", "50%");
            $(".gametip-container").css("margin-left", ml + "px");
            $(".gametip-container").fadeIn();
            self.renderRedButtons();




            $(".close-gametip").on("click touchend", function () {
               
                $(".card-wrapper").remove();
                gamePlay.checkForPopup();

            });

        }, 750);
    },
    addPopupEvent: function (callback, data) {
        

        var popEvent = { callback: callback, data: data }
        configData.gameData.popupEvents.push(popEvent);
        events.publish("newPopupEvent")

    },
    checkForPopup: function () {
        if (configData.gameData.popupEvents.length > 0) {
            configData.gameData.popupsExecuting = true;
            setTimeout(function () {
                console.log(configData.gameData.popupEvents)
                var callback = configData.gameData.popupEvents[0].callback;
                var data = configData.gameData.popupEvents[0].data;

                executeFunctionByName(callback, window, data);
                configData.gameData.popupEvents.splice(0, 1);
            }, 350);
        } else {
            configData.gameData.popupsExecuting = false;
        }

        // show msg 1 after first activity
        console.log(configData.gameData.popupEvents.length);
        console.log(configData.gameData.activityNum);
        if (configData.gameData.popupEvents.length == 0 && configData.gameData.activityNum ==1) {
         gamePlay.showMessage(1);
        }
    },
    showMessage: function (msgId) {
        var template = kendo.template($("#messageTemplate").html());

        mData = messages[msgId];
        var mssgHtml = kendo.render(template, [mData]);
        console.log(mData)
        $("body").append(mssgHtml);


       // setTimeout(function () {
           // $("body").on("click touchend", function () {
                //$(".messagebar").remove();
           // });

            setTimeout(function () { $(".messagebar").remove(); }, 40000);
       // }, 2000);
    },
    setupPrint: function (el, pType, orientation) {

        $("body").append("<div id='printWindow'><div id='printArea'></div></div>")
        console.log('setup')
        var css;

        setTimeout(function () {


            var printArea = $("#printArea");// $(w.document.body).find("#printArea").html(html);
            if (pType == "bCards") {
                var html = el;
                css = '@page { size: landscape; }'
                printArea.html(html);
                printArea.addClass("landscape")

                if (printArea.find(".cards-wrapper").length > 0) {
                    var availW = printArea.width() - 150;
                    var availH = printArea.height() - 150;
                    printArea.find(".cards-wrapper").css("transform", 'scale(' + 1 + ')');
                    var cardW = 270// printArea.find(".bcardfull-content").width()+40;
                    var cardH = 331//printArea.find(".bcardfull-content").height();
                    var wScale = availW / ((cardW * 5) + 5 * 20)
                    var hScale = availH / (cardH * 2);
                    var listW = cardW * 5 + 70;
                    var clhOriginal = cardH * 2;
                    var scaleByWidth = true;
                    if (wScale < hScale || scaleByWidth == true) {
                        if (wScale < 1) {
                            console.log("scale by width");
                            printArea.find(".bcardfull-content").css("width", cardW * wScale + "px");
                            printArea.find(".bcardfull-content").css("height", cardH * wScale + "px");
                            printArea.find(".cards-wrapper").css("transform", 'scale(' + wScale + ')');
                            printArea.find(".cards-wrapper").css("margin-right", "25px");

                            if (wScale < .7) {
                                printArea.css("padding-top", "0px");
                                printArea.find(".cards-wrapper").css("margin-top", "70px");
                            } else {
                                printArea.find(".cards-wrapper").css("margin-top", "15px");

                            }


                        } else {
                            printArea.find(".cards-wrapper").css("transform", 'scale(' + 1 + ')');

                        }
                    }
                }

                printArea.css("@page", "{size:landscape}")
            }

            if (pType == "achievements") {
                printArea.addClass("portrait")
                printArea.append("<img class='achieve-header' src=" + badgeHeader + " /><div class='achieve-header-text'>Earned Badges</div>")
                printArea.append("<div id='printAchieveList' >test</div>")

                //class="career-list sc-content" data-role="listview" data-template="achievementsTemplate" data-bind="source:achievements"
                // configData.gameData.achievementList
                setTimeout(function () {

                    console.log($("#printAchieveList"))
                    $("#printAchieveList").kendoMobileListView({
                        template: kendo.template($("#achievementsTemplate").html()),
                        dataSource: configData.gameData.achievementList,
                    })
                }, 50);

               css = '@page { size: portrait; }'
    
            }

            printArea.append('<div class="close-print"><i class="fa fa-times-circle-o fa-3x"></i></div>');

            $(".close-print").on("click touchend", function () { $("#printWindow").remove(); });

           var  head = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style');

            style.type = 'text/css';
            style.media = 'print';

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);



        }, 150)

       
    },
    printElement: function (el, pType, orientation) {
        var self = this;
        //  var w = window.open("print.html");
       
        window.el = el;
        window.pType = pType;
        self.setupPrint(el, pType);
        setTimeout(function () {
            console.log("printing");
           // alert("printstart")
            $("#printWindow").focus();
            window.print();
           
           // alert("printend")

           // $("#printWindow").remove();
            // using matchwindow watcher to detect print completion
            //setTimeout(function () {
            //  $("#printWindow").remove();
            // }, 1000);
        }, 1000)

        
    },
}


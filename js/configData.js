

var configData = {

    gameData: kendo.observable({
        minDip: minDip,
        minDis: minDis,
        maxDip: maxDip,
        maxDis: maxDis,
        currDip: 0,
        currDis: 0,
        pendingLevelup:null,
        currentDate: currentDate,
        factsToView: null,
        viewedFacts: null,
        usedFacts: null,
        randomDip: null,
        usedRandomDip:null,
        randomDis: null,
        unlockedList: null,
        unlockedDip: 0,
        unlockedDis: 0,
        unknownDip: 0,
        unknownDis: 0,
        usedRandomDis:null,
        savedBushCards: null,
        showingBushCard: false,
        careerList: null,
        popupEvents: [],
        popupsExecuting:false,
        achievementList: null,
        achievementTotal: 0,
        achievementNum:0,
        expLevel: expLevel,
        activityNum: 0,
        testDip: null,
        rank: "",
        rankIdx:0,
        levelup: "",
        currExpLevel:0,
        savedCardsNum: 0,
        totalCards:0,
        addBushCard: function (bCardData) {
            var self = this;
            this.savedBushCards.add(bCardData);
            self.set("savedCardsNum", this.savedBushCards.data().length);
           
        },
        diplomacyLevel: dipLevel,
        appPage:'',
        adjustDipLevel: function (val) {
            if (this.diplomacyLevel + val <= 100) {
                this.diplomacyLevel = this.diplomacyLevel + val;

            } else {
                this.diplomacyLevel = 100;
            }
            this.setDipMeter();
        },
        meterValue: dipLevel + '%',
        setDipMeter: function () {
            this.set("meterValue", this.diplomacyLevel * dMeterAdjust + "%");
        },
        adjustRank: function (val) {
            console.log("adjust rank");
            console.log(val)
            var expLevel = this.expLevel + val;



            if (expLevel < 0) { expLevel = 0 };
            console.log(expLevel)
            this.set("expLevel", expLevel);
            this.setRank();
            localesMgmt.checkExpThreshold(expLevel);
        },
       
        setRank: function () {
         //   if (this.showingBushCard == false) {
                console.log("set rank");
                var self = this;
                var newRank = ranks[0].name;
                var nxt = ranks[0].nextLevel;
                var levelIdx = 0;
                $.each(ranks, function (idx, item) {
                    console.log(item.points + " " + self.expLevel)
                    if (item.points <= self.expLevel && self.expLevel !=0) {
                        newRank = item.name;
                        if (ranks[idx + 1]) {
                            nxt = ranks[idx + 1].points;
                        } else {
                            nxt = null;
                        }
                        levelIdx = idx;
                       // console.log(item.points + " " + self.expLevel + " " + newRank)
                    }
                });

               // console.log(this.rank == newRank);
                if (this.rankIdx != levelIdx && levelIdx > 0) {
                    console.log(this.rank + " " + newRank);

                    //gamePlay.showLevelUp(levelIdx);
                    gamePlay.addPopupEvent('gamePlay.showLevelUp', levelIdx)
                }

                this.set("rankIdx", levelIdx);
                this.set("rank", "Rank: " + newRank);
               
                if (nxt != null) {
                    $(".levelup-textlabel").show();
                    this.set("levelup", "at " + nxt);
                } else {
                    $(".levelup-textlabel").hide();
                    this.set("levelup", "");
                }

                
           // }
           
        },
        updateDate: function (days) {
            var self = this;
            var newDate = new Date(self.currentDate.setDate(self.currentDate.getDate() + days));
            //console.log(newDate);
          
            self.set("currentDate", newDate);
           // localesMgmt.updateLocalesStates();
        },
        isCardSaved: function (id) {
            //var filter ={ field: "activityId.id", operator: "eq", value: id }

            //this.savedBushCards.filter(filter);
            //var savedCardView = this.savedBushCards.view();
            //console.log(savedCardView)

            var savedCardView = null;
            var arrMatch;
            $.each(this.savedBushCards.data().toJSON(), function (idx, item) {
               
                if (item && typeof item.activityIds != "undefined") {
                    arrMatch = $.grep(item.activityIds, function (activity, idx) {
                        return activity.id == id;
                    })

                   
                    if (arrMatch.length > 0) {
                        savedCardView = item;

                    }
                }

            });



            if (savedCardView  != null) {
                return true;
            } else {
                return false;
            }
        },
        addUsedRandomDis: function (item) {
        this.usedRandomDis.add(item);
        },
        addUsedRandomDip: function (item) {
            //console.log(item)
            //if (this.usedRandomDip == null) {
            //  configData.gameData.usedRandomDip = new kendo.data.DataSource({
            //    schema: {
            //    model: {
            //    id: 'Id',
            //    fields: {
            //    Id: { defaultValue: '', }
            //},
            //}
            //},
            //});
            //}
            //console.log(this.usedRandomDip.data())
            this.usedRandomDip.add(item);
        },
        addRandomDis: function (item) {
           
            this.randomDis.add(item);
        },
        addRandomDip: function (item) {
            this.randomDip.add(item);
        },
        removeRandomDis: function (item) {            
            this.randomDis.remove(item);            
        },
        removeRandomDip: function (item) {
           
            this.randomDip.remove(item);
        },
        removeUsedRandomDis: function (item) {
            this.usedRandomDis.remove(item);
        },
        removeUsedRandomDip: function (item) {
           
            this.usedRandomDip.remove(item);
        },
        addUnlockedItem: function (srcId, targetId) {
            var self = this;
            var aType = null;

            if (getTypeById(targetId) == "dip") {
                self.unlockedDip++;
                aType = "dip"
            } else {
                self.unlockedDis++;
                aType = "dis"

            }

            var item = {src:srcId,targ:targetId, aType:aType}
            this.unlockedList.add(item);
           // console.log(this.unlockedList.data())
        },
        hasBeenUnlocked: function (id) {
            var arrMatch;
            if (this.unlockedList != null) {
                arrMatch = this.unlockedList.get(id);
            }

            if (arrMatch == null || arrMatch == undefined) {
                return false;

            } else {
                return true;
            }

        },
        checkTips: function (tipId,data) {
            var self = this;

            // tips0 --- first random nonrandom question answered wrong

            if (tipId == 0 && !self.tips0Shown || self.tips0Shown == false) {
                console.log("get tip 0");

                var tipData = { heading: "A Good Diplomat <br/>is a Knowledgeable Diplomat!", text: "The more you know about China, the better you'll be at your job! By exploring the country, you'll gain tidbits of information that you can use during your diplomacy activities. It's better to rely on your knowledge than random luck!" };
                gamePlay.addPopupEvent("gamePlay.showGametip", tipData);

                self.tips0Shown = true;
            }

        },

    }),
    init: function () {
        var self = this;


        self.gameData.appPage = location.pathname;
        self.gameData.careerList = [];
        self.gameData.achievementList = new kendo.data.DataSource({});
        // bind game data to toolbar
        kendo.bind($("#toolbar"),this.gameData);
      //  kendo.bind($("#dragonWrapper"), this.gameData);
        kendo.bind($(".status-item"), this.gameData);
       
        // 0145cbb0-900f-11e7-acb1-0993c0d5f1c1

    },

 
 //   dsMulti: {
 //       ds: null,
 //       staticData: null,
 //       init: function () {

 //           var self = this;
 //           self.ds = new kendo.data.DataSource({
 //            //   offlineStorage: "dsMulti",
 //               type: 'everlive',
 //               filter: { logic: "and", filters: [ { field: "localeId", operator: "ne", value: "" }, ] },
 //               transport: {
 //                   typeName: 'diplomacy',

 //               },
 //               schema: {
 //                   parse: function (data) {
 //                       var response = data.result;
 //                      // console.log(data.result)
 //                       var arrMulti = [];
 //                       for (var i = 0; i < response.length; i++) {
 //                           var lid = null;
 //                          // console.log(response[i])
 //                           if (response[i].localeId && response[i].localeId.Id != undefined && response[i].localeId.Id != null) {

 //                               lid = response[i].localeId.Id;
 //                           } else {
 //                               if (response[i].localeId != null && typeof response[i].localeId == "string") {
 //                                  // console.log(response[i].localeId);
 //                                   lid = response[i].localeId;
 //                               }
                               
 //                           }
                           
 //                          if (lid != null) {
                               
                         
 //                               var item = {
 //                                   localeId: lid , //response[i].localeId,
 //                                   unlocks: response[i].arrUnlocks,
 //                                   activityId: response[i].Id,
 //                                   rr: response[i].risk,
 //                                   Id: response[i].Id
 //                               };
 //                               arrMulti.push(item);
                             
 //                           }

 //                           if (i == response.length-1) {
 ////console.log("****** multi ******");
 ////                       console.log(arrMulti)
 //                        return arrMulti;
 //                           }
 //                       }
                     
                       
 //                   },
 //                   model: {
 //                       id: Everlive.idField,
 //                      // id:localeId.Id,
 //                       fields: {
 //                           localeId: { defaultValue: { name: "", Id: "" }, },

 //                       }
 //                   }
 //               },

 //               serverFiltering: true,

 //           });

 //           this.ds.fetch(function () {
 //               self.staticData = self.ds.data().toJSON();
 //               console.log(self.staticData);
 //               events.publish("dsMultiReady", { ds: self.ds });

 //           });

 //       },
 //       getDataSource: function () {

 //           if (this.ds == null) {
 //               this.init();
 //           } else {
 //               events.publish("dsMultiReady", { ds: this.ds });

 //           }

 //       },

 //   },

    dsDiplomacyEL: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'diplomacy',
                    update: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    destroy: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    create: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                },
                schema: {
                    //parse: function (data) {
                    //    var response = data.result;
                    //    // console.log(data.result)
                    //    var items = [];
                    //    for (var i = 0; i < 1; i++) {
                    //        configData.gameData.testDip = response[i].Id;
                    //            var item = response[i]
                    //            items.push(item);


                    //    }
                    //    return items;

                    //},
                    model: {
                        id: Everlive.idField,

                        fields: {

                            discoveryId: { defaultValue: {}, },
                            localeId: { defaultValue: {}, },
                            correctResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            incorrectResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            quizIntro: { defaultValue: "", type: "string", },
                            intro: { defaultValue: "", type: "string", }
                        }
                    }
                },
                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log("init dip list: " + self.ds.data().length)
                events.publish("dsDiplomacyReady", { ds: self.ds });

            });

        },
        getDataSource: function () {
            var self = this;

            if (self.ds == null || self.ds.data().length == 0) {
                this.init();
            } else {
                console.log(self.ds);
                console.log("get dip list: " + self.ds.data().length)
                events.publish("dsDiplomacyReady", { ds: self.ds });

            }

        },

    },
    dsDiplomacyStatic: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            console.log("diplomacy init")
            self.ds = new kendo.data.DataSource({
                data: diplomacySD,
                schema: {
                    //parse: function (data) {
                    //    var response = data.result;
                    //    // console.log(data.result)
                    //    var items = [];
                    //    for (var i = 0; i < 1; i++) {
                    //        configData.gameData.testDip = response[i].Id;
                    //            var item = response[i]
                    //            items.push(item);


                    //    }
                    //    return items;

                    //},
                    model: {
                        id: 'Id',

                        fields: {

                            discoveryId: { defaultValue: {}, },
                            localeId: { defaultValue: {}, },
                            correctResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            incorrectResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            quizIntro: { defaultValue: "", type: "string", },
                            intro: { defaultValue: "", type: "string", }
                        }
                    }
                },
                serverFiltering: false,

            });

            this.ds.fetch(function () {
                console.log("idip fetch")
                self.staticData = self.ds.data().toJSON();
                console.log("init dip list: " + self.ds.data().length)
                events.publish("dsDiplomacyReady", { ds: self.ds });

            });

        },
        getDataSource: function () {
            var self = this;
            console.log("get diplomacy ")
            if (self.ds == null || self.ds.data().length == 0) {
                this.init();
            } else {
                console.log(self.ds);
                console.log("get dip list: " + self.ds.data().length)
                events.publish("dsDiplomacyReady", { ds: self.ds });

            }

        },

    },
    dsDiplomacy: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            var tbl = 'diplomacy'
            self.ds = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    }, 
                    parameterMap: function (data) {

                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },
                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    //  console.log(response);
                    action = e.type;
                  
                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            // discoveryId: { defaultValue: {}, },
                            achievementId: { type: "string", defaultValue: "" },
                            localeId: { defaultValue: { name: "", Id: null }, },
                            arrLocales: { defaultValue: [] },
                            correctResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            incorrectResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                           // risk: { defaultValue: { id: "low", name: "low" }, },
                            points: { type: "number", defaultValue: 2 },
                            experiencePoints: { type: "number", defaultValue: 5 },
                            random: { type: "boolean", defaultValue: false, },
                            quizIntro: { defaultValue: "", type: "string", },
                            intro: { defaultValue: "", type: "string", },
                            name: { defaultValue: "", type: "string", }

                             
                        }
                    }
                },
                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                console.log(self.ds.data().toJSON())
                events.publish("dsDiplomacyReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsDiplomacyReady", { ds: this.ds });

            }

        },

    },
    dsMultiEL: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                filter: { logic: "and", filters: [{ field: "localeId", operator: "ne", value: "" }, ] },
                transport: {
                    typeName: 'diplomacy',

                },
                schema: {
                    parse: function (data) {
                        var response = data.result;
                        // console.log(data.result)
                        var arrMulti = [];
                        for (var i = 0; i < response.length; i++) {
                            var lid = null;
                            // console.log(response[i])
                            if (response[i].localeId && response[i].localeId.Id != undefined && response[i].localeId.Id != null) {

                                lid = response[i].localeId.Id;
                            } else {
                                if (response[i].localeId != null && typeof response[i].localeId == "string") {
                                    // console.log(response[i].localeId);
                                    lid = response[i].localeId;
                                }

                            }

                            if (lid != null) {


                                var item = {
                                    localeId: lid, //response[i].localeId,
                                    unlocks: response[i].arrUnlocks,
                                    activityId: response[i].Id,
                                   // rr: response[i].risk,
                                    Id: response[i].Id
                                };
                                arrMulti.push(item);

                            }

                            if (i == response.length - 1) {
                                //console.log("****** multi ******");
                                //                       console.log(arrMulti)
                                return arrMulti;
                            }
                        }


                    },
                    model: {
                        id: Everlive.idField,
                        // id:localeId.Id,
                        fields: {
                            localeId: { defaultValue: { name: "", Id: "" }, },

                        }
                    }
                },

                serverFiltering: true,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log(self.staticData);
                events.publish("dsMultiReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsMultiReady", { ds: this.ds });

            }

        },

    },
    dsMultiStatic: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                data: diplomacySD,
                filter: { logic: "and", filters: [{ field: "localeId", operator: "ne", value: "" }, ] },

                schema: {
                    parse: function (data) {
                        console.log(data);
                        var response = data //data.result;
                        // console.log(data.result)
                        var arrMulti = [];
                        for (var i = 0; i < response.length; i++) {
                            var lid = null;
                            // console.log(response[i])
                            if (response[i].localeId && response[i].localeId.Id != undefined && response[i].localeId.Id != null) {

                                lid = response[i].localeId.Id;
                            } else {
                                if (response[i].localeId != null && typeof response[i].localeId == "string") {
                                    // console.log(response[i].localeId);
                                    lid = response[i].localeId;
                                }

                            }

                            if (lid != null) {


                                var item = {
                                    localeId: lid, //response[i].localeId,
                                    unlocks: response[i].arrUnlocks,
                                    activityId: response[i].Id,
                                   // rr: response[i].risk,
                                    Id: response[i].Id
                                };
                                arrMulti.push(item);

                            }

                            if (i == response.length - 1) {
                                //console.log("****** multi ******");
                                console.log(arrMulti)
                                return arrMulti;
                            }
                        }


                    },
                    model: {
                        id: 'Id',
                        // id:localeId.Id,
                        fields: {
                            localeId: { defaultValue: { name: "", Id: "" }, },

                        }
                    }
                },

                serverFiltering: true,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log(self.staticData);
                events.publish("dsMultiReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsMultiReady", { ds: this.ds });

            }

        },

    },
    dsMulti: {
        ds: null,
        staticData: null,
        init: function () {
            var tbl = "diplomacy";
            var self = this;
            self.ds = new kendo.data.DataSource({

                filter: { logic: "and", filters: [{ field: "localeId.name", operator: "ne", value: "" }] },
                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },

                },
                schema: {
                    parse: function (data) {
                       
                        //var response = data;
                        //console.log(response)

                        var response = $.map(data, function (el, prop) {
                            if (el) {
                                el.key = prop.toString();
                                return el;
                            }
                        });

                        var arrMulti = [];
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].localeId && response[i].localeId.name && response[i].localeId.name != "") {
                                var item = {

                                    localeId: response[i].localeId,
                                    unlocks: response[i].arrUnlocks,
                                    activityId: response[i].Id

                                };
                                arrMulti.push(item);
                            }
                        }
                        console.log(arrMulti)

                        return arrMulti;
                    },
                    model: {
                        id: "Id",
                        fields: {
                            localeId: { defaultValue: { name: "", Id: "" }, },

                        }
                    }
                },

                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log("*** dsmulti data")
                console.log(self.staticData);
                events.publish("dsMultiReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsMultiReady", { ds: this.ds });

            }

        },

    },
    dsItinerary: {
        ds: null,
        staticData: null,
        init: function () {
           // var tbl = "diplomacy";
            var self = this;
            self.ds = new kendo.data.DataSource({
                autoSync:true,
                 schema: {
                   
                    model: {
                        id: "Id",
                        fields: {
                            Id: { defaultValue: "", },

                        }
                    }
                },

                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log("*** dsItin data")
                console.log(self.staticData);
                events.publish("dsItinReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsItinReady", { ds: this.ds });

            }

        },

    },
    dsViewedLocales: {
        ds: null,
        staticData: null,
        init: function () {
            // var tbl = "diplomacy";
            var self = this;
            self.ds = new kendo.data.DataSource({
                autoSync: true,
                schema: {

                    model: {
                        id: "Id",
                        fields: {
                            Id: { defaultValue: "", },

                        }
                    }
                },

                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log("*** dsViewed data")
                console.log(self.staticData);
                events.publish("dsViewedReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsViewedReady", { ds: this.ds });

            }

        },

    },
    dsDiscoveryEL: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'discovery',
                    update: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    destroy: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    create: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                },
                schema: {
                    model: {
                        id: Everlive.idField,
                        fields: {
                            category: { defaultValue: { id: '', name: '' } },

                        }
                    }
                },
                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsDiscoveryReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsDiscoveryReady", { ds: this.ds });

            }

        },

    },
    dsDiscoveryStatic: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                data: discoverySD,
                schema: {
                    model: {
                        id: 'Id',
                        fields: {
                            category: { defaultValue: { id: '', name: '' } },

                        }
                    }
                },
                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsDiscoveryReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsDiscoveryReady", { ds: this.ds });

            }

        },

    },
    dsDiscovery: {
        ds: null,
        staticData: null,
        init: function () {
            var tbl = "discovery";
            var self = this;
            self.ds = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },
                  
                    parameterMap: function (data) {

                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },
                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    console.log(response);
                    action = e.type;
                    if (action == "create") {
                        var key = response.name
                        var data = { Id: key };
                        var strData = JSON.stringify(data);

                        jQuery.ajax({
                            accept: "application/json",
                            type: 'patch',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: data,
                            url: config.databaseURL + "/" + tbl + "/" + key + "/.json?auth=" + authToken,
                            data: strData,
                            success: function () {
                                self.ds.read();
                            }
                        });

                    }



                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            category: { defaultValue: { id: '', name: '' } },

                        }
                    }
                },
                serverFiltering: false,
                sort: { field: "category.name", dir: "asc" }
            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsDiscoveryReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsDiscoveryReady", { ds: this.ds });

            }

        },

    },

    dsFactsEL: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'facts',
                    update: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    destroy: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    create: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                },
                schema: {
                    model: {
                        id: Everlive.idField,
                        fields: {
                            discoveryId: { defaultValue: { id: '', name: '' } },
                        }
                    }
                },
                change: function (e) {
                    // console.log(e);
                    if (e.sender._filter != undefined && e.items.length > 0) {
                        var filFacts = e.items;
                        var discLen = filFacts.length;
                        var idx = getRandomInt(0, discLen - 1);

                    }
                },

                serverFiltering: false,

            });

            self.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsFactsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsFactsReady", { ds: this.ds });

            }

        },

    },
    dsFactsStatic: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                // type: 'everlive',
                data: factsSD,
                schema: {
                    model: {
                        id: 'Id',
                        fields: {
                            discoveryId: { defaultValue: { id: '', name: '' } },
                        }
                    }
                },
                change: function (e) {
                    // console.log(e);
                    if (e.sender._filter != undefined && e.items.length > 0) {
                        var filFacts = e.items;
                        var discLen = filFacts.length;
                        var idx = getRandomInt(0, discLen - 1);

                    }
                },

                serverFiltering: false,

            });

            self.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsFactsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsFactsReady", { ds: this.ds });

            }

        },

    },
    dsFacts: {
        ds: null,
        staticData: null,
        init: function () {
            var tbl = "facts"
            var self = this;
            console.log("get dsfacts")
            console.log(config.databaseURL)
            self.ds = new kendo.data.DataSource({



                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },
                  
                    parameterMap: function (data) {

                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },
                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    console.log(response);
                    action = e.type;
                    if (action == "create") {
                        var key = response.name
                        var data = { Id: key };
                        var strData = JSON.stringify(data);

                        jQuery.ajax({
                            accept: "application/json",
                            type: 'patch',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: data,
                            url: config.databaseURL + "/" + tbl + "/" + key + "/.json?auth=" + authToken,
                            data: strData,
                            success: function () {
                                self.ds.read();
                            }
                        });
                        //    
                    }

                    if (e.type == "update") {
                        console.log("update quiz")
                        configData.dsMCQuiz.ds.read();
                    }

                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            discoveryId: { defaultValue: { id: '', name: '' } },
                        }
                    }
                },
                change: function (e) {
                    // console.log(e);
                    if (e.sender._filter != undefined && e.items.length > 0) {
                        var filFacts = e.items;
                        var discLen = filFacts.length;
                        var idx = getRandomInt(0, discLen - 1);

                    }
                },

                serverFiltering: false,
                sort: { field: "discoveryId.name", dir: "asc" },
            });
            console.log("fetch");
            self.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log(self.staticData);
                events.publish("dsFactsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsFactsReady", { ds: this.ds });

            }

        },

    },

    dsMCQuizEL: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'multipleChoiceQuiz',
                    update: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    destroy: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    create: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                },
                schema: {
                    model: {
                        id: Everlive.idField,
                        fields: {
                            factId: { defaultValue: { id: '', name: '' } },
                            category: { defaultValue: { id: '', name: '' } },
                            //   correctResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            // incorrectResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            answers: { defaultValue: [] },

                        }
                    }
                },
                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsMCQuizReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsMCQuizReady", { ds: this.ds });

            }

        },

    },
    dsMCQuizStatic: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                data: multipleChoiceQuizSD,
                schema: {
                    model: {
                        id: 'Id',
                        fields: {
                            factId: { defaultValue: { id: '', name: '' } },
                            category: { defaultValue: { id: '', name: '' } },
                            //   correctResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            // incorrectResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            answers: { defaultValue: [] },

                        }
                    }
                },
                serverFiltering: false,

            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsMCQuizReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsMCQuizReady", { ds: this.ds });

            }

        },

    },

    dsMCQuiz: {
        ds: null,
        staticData: null,
        init: function () {
            var tbl = "multipleChoiceQuiz"
            var self = this;
            self.ds = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },
                  
                    parameterMap: function (data) {

                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },

                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    console.log(response);
                    action = e.type;
                    if (action == "create") {
                        var key = response.name
                        var data = { Id: key };
                        var strData = JSON.stringify(data);

                        jQuery.ajax({
                            accept: "application/json",
                            type: 'patch',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: data,
                            url: config.databaseURL + "/" + tbl + "/" + key + "/.json?auth=" + authToken,
                            data: strData,
                            success: function () {
                                self.ds.read();
                            }
                        });

                    }



                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            factId: { defaultValue: { id: '', name: '' } },
                            category: { defaultValue: { id: '', name: '' } },
                            //   correctResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            // incorrectResponse: { defaultValue: { title: '', text: '', subtext: '', bullets: [] } },
                            answers: { defaultValue: [] },

                        }
                    }
                },
                serverFiltering: false,
                sort: { field: "factId.name", dir: "asc" }
            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsMCQuizReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsMCQuizReady", { ds: this.ds });

            }

        },

    },
    dsLocalesEL: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'locales',
                    update: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    destroy: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                    create: {
                        headers: { 'Authorization': "Bearer " + sessionStorage.accessToken }
                    },
                },
                schema: {
                    parse: function (data) {
                        var response = data.result;
                        // console.log(data.result)
                        var arrLocales = [];
                        for (var i = 0; i < response.length; i++) {
                            var item = response[i];
                            if (typeof item.randomLevel == "undefined") {
                                item.randomLevel = { id: 0, name: "Newbie" }
                            }

                            arrLocales.push(item);
                        }
                        console.log(arrLocales);
                        return arrLocales;
                    },
                    model: {
                        id: Everlive.idField,
                        fields: {
                            state: { type: "string" },
                            unlocks: { defaultValue: {} },
                            dipContent: { defaultValue: {} },
                            disContent: { defaultValue: {} },
                            randomLevel: { defaultValue: { id: 0, name: "Newbie" } },
                        }
                    }
                },
                serverFiltering: false,
                change: function (e) {
                    // console.log("locales change");
                    events.publish("localesUpdated", e.sender.data().toJSON())
                },
            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                // console.log(self.staticData)
                events.publish("dsLocalesReady", { ds: self.ds });


                // create random locales lists

                self.ds.query({
                    filter: { logic: "and", filters: [{ field: "state", operator: "contains", value: "random" }, { field: "aType", operator: "eq", value: "dip" }] }
                }).then(function (e) {
                    var dipRandom = self.ds.view();

                    //$.each(self.ds.data(), function (idx,item) {
                    //    if (item.state == "random" && item.aType == "dip") {
                    //        console.log(item.state + " " + item.name)
                    //        dipRandom.push(item)
                    //    }
                    //})





                    configData.gameData.randomDip = new kendo.data.DataSource({
                        data: dipRandom,
                    });




                    configData.gameData.usedRandomDip = new kendo.data.DataSource({
                        schema: {
                            model: {
                                id: 'Id',
                                fields: {
                                    id: { defaultValue: '', }
                                },
                            }
                        },
                    });

                    // self.ds.filter([]);

                    //  console.log( configData.gameData.randomDip.data());
                    configData.gameData.randomDip.fetch(function () {

                        // console.log(this.data());
                    });

                    configData.gameData.usedRandomDip.fetch(function () {

                        // console.log(this.data());
                    });


                    configData.gameData.randomDis = new kendo.data.DataSource({
                    });

                    configData.gameData.unlockedList = new kendo.data.DataSource({
                        schema: {
                            model: {
                                id: "targ",
                            }
                        },
                    });

                    configData.gameData.randomDis.fetch(function () {

                        //  console.log(configData.gameData.randomDip);
                    });

                    configData.gameData.usedRandomDis = new kendo.data.DataSource({
                    });

                    configData.gameData.usedRandomDis.fetch(function () {

                        //  console.log(configData.gameData.randomDip);
                    });

                });

                console.log("filter dis");
                self.ds.query({
                    filter: { logic: "and", filters: [{ field: "state", operator: "eq", value: "random" }, { field: "aType", operator: "eq", value: "dis" }] }
                }).then(function (e) {
                    var disRandom = self.ds.view();
                    console.log(disRandom);
                    configData.gameData.randomDis = new kendo.data.DataSource({

                        data: disRandom,
                    });


                    configData.gameData.randomDis.fetch(function () {

                        console.log(configData.gameData.randomDis);
                    });

                    self.ds.filter([]);

                });


            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsLocalesReady", { ds: this.ds });

            }

        },
        isMulti: function (localeId, preserve) {
            if (preserve == undefined) { preserve = false };

            var list = configData.dsMulti.ds.data().toJSON();
            //  console.log(configData.dsMulti.ds.data().toJSON());
            pos = $.grep(list, function (e, idx) {
                if (e.localeId != null) {
                    return e.localeId == localeId;
                }
            });

            if (pos.length > 0) {

                var multiItem = configData.dsMulti.ds.get(pos[0].activityId);

                // console.log(multiItem)
                if (preserve == false) {
                    configData.dsMulti.ds.remove(multiItem);
                }
                //console.log(configData.dsMulti.ds.data().toJSON());
                return pos[0];
            } else {
                return false;
            }
        },
    },
    dsLocalesStatic: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                data: localesSD,
                schema: {
                    parse: function (data) {
                        var response = data; //data.result;
                        // console.log(data.result)
                        var arrLocales = [];
                        for (var i = 0; i < response.length; i++) {
                            var item = response[i];
                            if (typeof item.randomLevel == "undefined") {
                                item.randomLevel = { id: 0, name: "Newbie" }
                            }

                            arrLocales.push(item);
                        }
                        console.log(arrLocales);
                        return arrLocales;
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            startDate: { type: "date" },
                            endDate: { type: "date" },
                            state: { type: "string" },
                            unlocks: { defaultValue: {} },
                            dipContent: { defaultValue: {} },
                            disContent: { defaultValue: {} },
                            randomLevel: { defaultValue: { id: 0, name: "Newbie" } },
                        }
                    }
                },
                serverFiltering: false,
                change: function (e) {
                    // console.log("locales change");
                    events.publish("localesUpdated", e.sender.data().toJSON())
                },
            });

            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                // console.log(self.staticData)
                events.publish("dsLocalesReady", { ds: self.ds });

                console.log("init unlocked list")
                configData.gameData.unlockedList = new kendo.data.DataSource({
                    schema: {
                        model: {
                            id: "targ",
                        }
                    },
                });

                // create random locales lists

                self.ds.query({
                    filter: { logic: "and", filters: [{ field: "state", operator: "contains", value: "random" }, { field: "aType", operator: "eq", value: "dip" }] }
                }).then(function (e) {
                    var dipRandom = self.ds.view();

                    //$.each(self.ds.data(), function (idx,item) {
                    //    if (item.state == "random" && item.aType == "dip") {
                    //        console.log(item.state + " " + item.name)
                    //        dipRandom.push(item)
                    //    }
                    //})





                    configData.gameData.randomDip = new kendo.data.DataSource({
                        data: dipRandom,
                    });




                    configData.gameData.usedRandomDip = new kendo.data.DataSource({
                        schema: {
                            model: {
                                id: 'Id',
                                fields: {
                                    id: { defaultValue: '', }
                                },
                            }
                        },
                    });

                    // self.ds.filter([]);

                    //  console.log( configData.gameData.randomDip.data());
                    configData.gameData.randomDip.fetch(function () {

                        // console.log(this.data());
                    });

                    configData.gameData.usedRandomDip.fetch(function () {

                        // console.log(this.data());
                    });


                    configData.gameData.randomDis = new kendo.data.DataSource({
                    });


                   
                    configData.gameData.randomDis.fetch(function () {

                        //  console.log(configData.gameData.randomDip);
                    });

                    configData.gameData.usedRandomDis = new kendo.data.DataSource({
                    });

                    configData.gameData.usedRandomDis.fetch(function () {

                        //  console.log(configData.gameData.randomDip);
                    });

                });

                console.log("filter dis");
                self.ds.query({
                    filter: { logic: "and", filters: [{ field: "state", operator: "eq", value: "random" }, { field: "aType", operator: "eq", value: "dis" }] }
                }).then(function (e) {
                    var disRandom = self.ds.view();
                    console.log(disRandom);
                    configData.gameData.randomDis = new kendo.data.DataSource({

                        data: disRandom,
                    });


                    configData.gameData.randomDis.fetch(function () {

                        console.log(configData.gameData.randomDis);
                    });

                    self.ds.filter([]);

                });


            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsLocalesReady", { ds: this.ds });

            }

        },
        isMulti: function (localeId, preserve) {
            if (preserve == undefined) { preserve = false };

            var list = configData.dsMulti.ds.data().toJSON();
            //  console.log(configData.dsMulti.ds.data().toJSON());
            pos = $.grep(list, function (e, idx) {
                if (e.localeId != null) {
                    return e.localeId == localeId;
                }
            });

            if (pos.length > 0) {

                var multiItem = configData.dsMulti.ds.get(pos[0].activityId);

                // console.log(multiItem)
                if (preserve == false) {
                    configData.dsMulti.ds.remove(multiItem);
                }
                //console.log(configData.dsMulti.ds.data().toJSON());
                return pos[0];
            } else {
                return false;
            }
        },
    },

    dsLocales: {
        ds: null,
        safeds: null,
        staticData: null,
        init: function () {
            var tbl = "locales";
            var self = this;
            self.ds = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },
                   
                    parameterMap: function (data) {
                        console.log(data);
                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },
                requestStart: function (e) {
                    // console.log(e);
                },
                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    console.log(response);
                    action = e.type;
                   


                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {

                            unlocks: { defaultValue: {} },
                            // unl: { defaultValue: {}},
                            dipContent: { defaultValue: {} },
                            disContent: { defaultValue: {} },
                           // risk: { defaultValue: { id: "", name: "" }, },
                            duration: { type: "number", defaultValue: 1 },
                            startDate: { type: "date", defaultValue: "1/2/1975 12:00:00AM" },
                            endDate: { type: "date", defaultValue: "12/31/1975 11:59:59PM" },
                        }
                    }
                },
                serverFiltering: false,
                change: function (e) {
                    console.log("locales change");
                   // self.safeds.read();
                    events.publish("localesUpdated", e.sender.data().toJSON())
                },
            });
            console.log("fetch locales")
            //this.ds.fetch(function () {
            //    self.staticData = self.ds.data().toJSON();

            //    events.publish("dsLocalesReady", { ds: self.ds });

            //});


            this.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                // console.log(self.staticData)
                events.publish("dsLocalesReady", { ds: self.ds });

                console.log("init unlocked list")
                configData.gameData.unlockedList = new kendo.data.DataSource({
                    schema: {
                        model: {
                            id: "targ",
                        }
                    },
                });

                // create random locales lists

                self.ds.query({
                    filter: { logic: "and", filters: [{ field: "state", operator: "contains", value: "random" }, { field: "aType", operator: "eq", value: "dip" }] }
                }).then(function (e) {
                    var dipRandom = self.ds.view();

                    //$.each(self.ds.data(), function (idx,item) {
                    //    if (item.state == "random" && item.aType == "dip") {
                    //        console.log(item.state + " " + item.name)
                    //        dipRandom.push(item)
                    //    }
                    //})





                    configData.gameData.randomDip = new kendo.data.DataSource({
                        data: dipRandom,
                    });




                    configData.gameData.usedRandomDip = new kendo.data.DataSource({
                        schema: {
                            model: {
                                id: 'Id',
                                fields: {
                                    id: { defaultValue: '', }
                                },
                            }
                        },
                    });

                    // self.ds.filter([]);

                    //  console.log( configData.gameData.randomDip.data());
                    configData.gameData.randomDip.fetch(function () {

                        // console.log(this.data());
                    });

                    configData.gameData.usedRandomDip.fetch(function () {

                        // console.log(this.data());
                    });


                    configData.gameData.randomDis = new kendo.data.DataSource({
                    });



                    configData.gameData.randomDis.fetch(function () {

                        //  console.log(configData.gameData.randomDip);
                    });

                    configData.gameData.usedRandomDis = new kendo.data.DataSource({
                    });

                    configData.gameData.usedRandomDis.fetch(function () {

                        //  console.log(configData.gameData.randomDip);
                    });

                });

                console.log("filter dis");
                self.ds.query({
                    filter: { logic: "and", filters: [{ field: "state", operator: "eq", value: "random" }, { field: "aType", operator: "eq", value: "dis" }] }
                }).then(function (e) {
                    var disRandom = self.ds.view();
                    console.log(disRandom);
                    configData.gameData.randomDis = new kendo.data.DataSource({

                        data: disRandom,
                    });


                    configData.gameData.randomDis.fetch(function () {

                        console.log(configData.gameData.randomDis);
                    });

                    self.ds.filter([]);

                });


            });
        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsLocalesReady", { ds: this.ds });

            }

        },
        fetchSafeLocaleData: function () {
            // safe to unlock
            console.log("fetch safe");
            var tbl = "locales"
            var self = this;
            //self.safeds = new kendo.data.DataSource({
            //    transport: {
            //        read: {
            //            url: function (options) {
            //                console.log(options)
            //                return config.databaseURL + "/" + tbl + ".json"
            //            },
            //            dataType: "json",
            //            contentType: "application/json",
            //            beforeSend: function (req) {
            //                //req.setRequestHeader('Authorization', sessionStorage.accessToken);
            //            },
            //        },
            //    },
            //    filter: { logic: "and", filters: [{ field: "state", operator: "ne", value: "calendar" }, { field: "state", operator: "ne", value: "random" }] },
            //    sort: { field: "name", dir: "asc" },
            //    schema: {
            //        parse: function (response) {
            //            console.log(response)
            //            if (action == 'read') {
            //                var resp = $.map(response, function (el, prop) {
            //                    if (el) {
            //                        el.key = prop.toString();
            //                        return el;
            //                    }
            //                });
            //                console.log("array");
            //                return resp;
            //            } else {
            //                console.log("not array");
            //                return response;
            //            }
            //        },

            //        model: {
            //            id: 'Id',
            //            fields: {


            //            }
            //        }
            //    },
            //    serverFiltering: false,
            //    change: function (e) {
            //        //     console.log(e.sender.data().toJSON())
            //        //    events.publish("safeLocalesUpdated", e.sender.data().toJSON())
            //    },
            //});

            //this.safeds.fetch(function () {

            //    self.safeStaticData = self.safeds.data().toJSON();
            //    console.log(self.safeStaticData)
            //    events.publish("dsSafeLocalesReady", { ds: self.safeds });

            //});
        },
        getSafeLocalesList: function () {

            //if (this.safeds == null) {
            //    console.log("get safe");
            //    this.fetchSafeLocaleData();
            //} else {
            //    console.log(this.safeds.data())
            //    events.publish("dsSafeLocalesReady", { ds: this.safeds });

            //}

        },
        isMulti: function (localeId, preserve) {
            if (preserve == undefined) { preserve = false };

            var list = configData.dsMulti.ds.data().toJSON();
            //  console.log(configData.dsMulti.ds.data().toJSON());
            pos = $.grep(list, function (e, idx) {
                if (e.localeId != null) {
                    return e.localeId == localeId;
                }
            });

            if (pos.length > 0) {

                var multiItem = configData.dsMulti.ds.get(pos[0].activityId);

                // console.log(multiItem)
                if (preserve == false) {
                    configData.dsMulti.ds.remove(multiItem);
                }
                //console.log(configData.dsMulti.ds.data().toJSON());
                return pos[0];
            } else {
                return false;
            }
        },
    
    
    },

    dsBushCardsEL: {
        ds: null,
        staticData: null,
        init: function () {
            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'bushCards',

                },
                schema: {
                    model: {
                        id: Everlive.idField,
                        fields: {
                            activityId: { defaultValue: { id: '', name: '' } },
                            activityIds: { defaultValue: [{ id: '', name: '' }] },
                            number: { type: "number" },
                        }
                    }
                },
                change: function (e) {

                },

                // serverFiltering: true,
                sort: { field: "number", dir: "asc" },
            });

            self.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();


                configData.gameData.totalCards = self.ds.data().length;
                events.publish("dsBushCardsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {
            console.log("get bush cards");
            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsBushCardsReady", { ds: this.ds });

            }

        },
        getBushCardById: function (id) {

            var viewDS = this.ds;

            var filter = { field: "activityId.id", operator: "eq", value: id };
            //console.log(filter);
            viewDS.filter(filter);
            var view = viewDS.view();

            if (view.length > 0) {
                return view[0];
            } else {
                return null;
            }
        },

        getBushCardByArrayId: function (id) {

            var viewDS = this.ds.data().toJSON();

            var view = null;

            $.each(viewDS, function (idx, item) {

                if (typeof item.activityIds != "undefined") {
                    arrMatch = $.grep(item.activityIds, function (activity, idx) {
                        return activity.id == id;

                    })
                    if (arrMatch.length > 0) {
                        view = item;

                    }
                }

            });


            if (view != null) {
                return view;
            } else {
                return null;
            }
        },

    },
    dsBushCardsStatic: {
        ds: null,
        staticData: null,
        init: function () {
            var self = this;
            self.ds = new kendo.data.DataSource({
                data: bushCardsSD,
                schema: {
                    model: {
                        id: 'Id',
                        fields: {
                            activityId: { defaultValue: { id: '', name: '' } },
                            activityIds: { defaultValue: [{ id: '', name: '' }] },
                            number: { type: "number" },
                        }
                    }
                },
                change: function (e) {

                },

                // serverFiltering: true,
                sort: { field: "number", dir: "asc" },
            });

            self.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();


                configData.gameData.totalCards = self.ds.data().length;
                events.publish("dsBushCardsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {
            console.log("get bush cards");
            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsBushCardsReady", { ds: this.ds });

            }

        },
        getBushCardById: function (id) {

            var viewDS = this.ds;

            var filter = { field: "activityId.id", operator: "eq", value: id };
            //console.log(filter);
            viewDS.filter(filter);
            var view = viewDS.view();

            if (view.length > 0) {
                return view[0];
            } else {
                return null;
            }
        },

        getBushCardByArrayId: function (id) {

            var viewDS = this.ds.data().toJSON();

            var view = null;

            $.each(viewDS, function (idx, item) {

                if (typeof item.activityIds != "undefined") {
                    arrMatch = $.grep(item.activityIds, function (activity, idx) {
                        return activity.id == id;

                    })
                    if (arrMatch.length > 0) {
                        view = item;

                    }
                }

            });


            if (view != null) {
                return view;
            } else {
                return null;
            }
        },

    },

    dsBushCards: {
        ds: null,
        staticData: null,
        init: function () {
            var tbl = "bushCards";
            var self = this;
            self.ds = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },
                  
                    parameterMap: function (data) {

                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },

                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    console.log(response);
                    action = e.type;
                    if (action == "create") {
                        var key = response.name
                        var data = { Id: key };
                        var strData = JSON.stringify(data);

                        jQuery.ajax({
                            accept: "application/json",
                            type: 'patch',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: data,
                            url: config.databaseURL + "/" + tbl + "/" + key + "/.json?auth=" + authToken,
                            data: strData,
                            success: function () {
                                self.ds.read();
                            }
                        });

                    }



                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            activityId: { defaultValue: { id: '', name: '' } },
                        }
                    }
                },
                change: function (e) {

                },

                serverFiltering: false,

            });

            self.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();

                events.publish("dsBushCardsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsBushCardsReady", { ds: this.ds });

            }

        },
        getBushCardById: function (id) {

            var viewDS = this.ds;

            var filter = { field: "activityId.id", operator: "eq", value: id };
            //console.log(filter);
            viewDS.filter(filter);
            var view = viewDS.view();

            if (view.length > 0) {
                return view[0];
            } else {
                return null;
            }
        },

        getBushCardByArrayId: function (id) {

            var viewDS = this.ds.data().toJSON();

            var view = null;

            $.each(viewDS, function (idx, item) {

                if (typeof item.activityIds != "undefined") {
                    arrMatch = $.grep(item.activityIds, function (activity, idx) {
                        return activity.id == id;

                    })
                    if (arrMatch.length > 0) {
                        view = item;

                    }
                }

            });


            if (view != null) {
                return view;
            } else {
                return null;
            }
        },
    },
    dsAchievementsEL: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'achievements',

                },
                schema: {
                    model: {
                        id: Everlive.idField,
                        fields: {
                            reqPoints: { type: "number", defaultValue: 0, },
                            activity: { type: "boolean", defaultValue: false, },
                            locale: { type: "boolean", defaultValue: false, },
                        }
                    }
                },
                change: function (e) {

                },

                serverFiltering: false,

            });

            self.ds.fetch(function () {
                self.staticData = $.map(self.ds.data().toJSON(), function (item, idx) {

                    var newItem = {};
                    newItem.Id = item.Id;
                    newItem.name = item.name;
                    configData.gameData["earned-" + item.Id] = 0;
                    configData.gameData["required-" + item.Id] = item.reqPoints;
                    return newItem;
                });
                configData.gameData.set("achievementTotal", self.ds.data().length);
                console.log(configData.gameData.achievementTotal)

                events.publish("dsAchievementsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsAchievementsReady", { ds: this.ds });

            }

        },

    },
    dsAchievementsStatic: {
        ds: null,
        staticData: null,
        init: function () {

            var self = this;
            self.ds = new kendo.data.DataSource({
                data: achievementsSD,
                schema: {
                    model: {
                        id: 'Id',
                        fields: {
                            reqPoints: { type: "number", defaultValue: 0, },
                            activity: { type: "boolean", defaultValue: false, },
                            locale: { type: "boolean", defaultValue: false, },
                        }
                    }
                },
                change: function (e) {

                },

                serverFiltering: false,

            });

            self.ds.fetch(function () {
                self.staticData = $.map(self.ds.data().toJSON(), function (item, idx) {

                    var newItem = {};
                    newItem.Id = item.Id;
                    newItem.name = item.name;
                    configData.gameData["earned-" + item.Id] = 0;
                    configData.gameData["required-" + item.Id] = item.reqPoints;
                    return newItem;
                });
                configData.gameData.set("achievementTotal", self.ds.data().length);
                console.log(configData.gameData.achievementTotal)

                events.publish("dsAchievementsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsAchievementsReady", { ds: this.ds });

            }

        },

    },
    dsAchievements: {
        ds: null,
        staticData: null,
        init: function () {
            var tbl = "achievements";
            var self = this;
            self.ds = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json"
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                            //req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },
                   
                    parameterMap: function (data) {

                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },

                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    console.log(response);
                    action = e.type;
                   


                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            reqPoints: { type: "number", defaultValue: 0, },
                            activity: { type: "boolean", defaultValue: false, },
                            locale: { type: "boolean", defaultValue: false, },
                        }
                    }
                },
                change: function (e) {

                },

                serverFiltering: false,

            });

            self.ds.fetch(function () {
                self.staticData = $.map(self.ds.data().toJSON(), function (item, idx) {
                    console.log(item);
                    var newItem = {};
                    newItem.Id = item.Id;
                    newItem.name = item.name;
                    return newItem;
                });
                console.log(self.staticData);
                events.publish("dsAchievementsReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsAchievementsReady", { ds: this.ds });

            }

        },

    },
    dsExp: {
        ds: null,
        staticData: null,
        init: function () {
            var tbl = "expLevels"
            var self = this;
            console.log("get expLevels")
            console.log(config.databaseURL)
            self.ds = new kendo.data.DataSource({



                transport: {
                    read: {
                        url: function (options) {
                            console.log(options)
                            return config.databaseURL + "/" + tbl + ".json" 
                        },
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function (req) {
                          //  req.setRequestHeader('Authorization', sessionStorage.accessToken);
                        },

                    },  
                    parameterMap: function (data) {

                        console.log(JSON.stringify(data));

                        return JSON.stringify(data);
                    }
                },
                requestEnd: function (e) {
                    var response = e.response;
                    var type = e.type;
                    console.log(response);
                    action = e.type;
                    if (action == "create") {
                        var key = response.name
                        var data = { Id: key };
                        var strData = JSON.stringify(data);

                        jQuery.ajax({
                            accept: "application/json",
                            type: 'patch',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: data,
                            url: config.databaseURL + "/" + tbl + "/" + key + "/.json?auth=" + authToken,
                            data: strData,
                            success: function () {
                                self.ds.read();
                            }
                        });
                        //    
                    }

                    if (e.type == "update") {
                        console.log("update exp")

                    }

                },
                schema: {
                    parse: function (response) {
                        console.log(response)
                        if (action == 'read') {
                            var resp = $.map(response, function (el, prop) {
                                if (el) {
                                    el.key = prop.toString();
                                    return el;
                                }
                            });
                            console.log("array");
                            return resp;
                        } else {
                            console.log("not array");
                            return response;
                        }
                    },
                    model: {
                        id: 'Id',
                        fields: {
                            Id: {},
                            idx: { type: "number" },
                            threshold: { type: "number" },
                        }
                    }
                },
                change: function (e) {
                    // console.log(e);

                },

                serverFiltering: false,
                sort: { field: "idx", dir: "asc" },
            });
            console.log("fetch");
            self.ds.fetch(function () {
                self.staticData = self.ds.data().toJSON();
                console.log(self.staticData);
                events.publish("dsExpReady", { ds: self.ds });

            });

        },
        getDataSource: function () {

            if (this.ds == null) {
                this.init();
            } else {
                events.publish("dsExpReady", { ds: this.ds });

            }

        },

    },
//    dsImgFiles : new kendo.data.DataSource({
//        data:getFileList("/images/system/"),
//    }),

//dsBkgrdImgFiles : new kendo.data.DataSource({
//    data: getFileList("/images/system/bkgrds"),
//}),

//dsIconImgFiles : new kendo.data.DataSource({
//    data: getFileList("/images/system/icons/"),
//}),


}

var dsCategories = [
       { id: 1, name: "CULTURE/HISTORY" },
         { id: 2, name: "GEOGRAPHY/NATURE" },
           { id: 3, name: "INDUSTRY/ELECTRONICS" },
           { id: 4, name: "AGRICULTURE" },
            { id: 5, name: "AEROSPACE" },
];

var rrOptions = [
         { id: "low", name: "low" },
          { id: "high", name: "high" },
];
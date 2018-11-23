
var gameStart = new Date("1/2/1975");
var gameEnd = new Date("12/31/1975");
var currentDate = gameStart;
var key = "xgff4hx5ek3t5nz5";
var adminRole = "835b06f0-8cf0-11e7-a148-29de9a0c5cc1";

//var el;
var fbKey = "AIzaSyB3WH41vPYpnlY8-wEWty8IBc0WXvMAcFs";
var fbAuthDomain = "diplomacy-india.firebaseapp.com";
var fbUrl = "https://diplomacy-india.firebaseio.com";
var fbProjectId = "diplomacy-india";
var fbMsgId = "1005286435043";


//var minDip = 4;
//var minDis = 3;

var minDip = 0;
var minDis = 0;

var maxDip = 5;
var maxDis = 4;

var dMeterAdjust = .92;
var dipLevel = 33;

var expLevel = 0;
var collectedCards = 0;
var maxCards = 10;

var showGlow = false;

//var bkgrdImg = "chinamap-ext4.jpg";
//1280x766
//var bkgrdImg = "chinamap-lrg3.jpg";
var bkgrdImg = "IndiaMap-2000p.jpg";
//2000x1197

var imgDir = "images/system/";
var bkgrdDir = "images/system/bkgrds/";
var badgeDir = "images/system/achievements/";
var badgeHeader = "images/system/achieve-header.png";
var key = "xgff4hx5ek3t5nz5";

var lowOdds = 70;
var highOdds = 40;

var expOffset = 20;
var reducedPenalty = 1;
var expReducedPenalty = .5;

var glowEnabled = true;
//0 50 200
var ranks = [
    { name: "Newbie", prev: "", next: "Junior", points: 0, nextLevel: 75, description: "As a Newbie Diplomat, you’ll continue your work as an American diplomat in China, trying to build political, cultural, and economic relationships between the two countries. But now you’ll have better chances of success in all your activities. ", },
    { name: "Junior", prev: "Newbie", next: "Mid-Level", points: 75, nextLevel: 400, description: "As a Junior Diplomat, you’ll continue your work as an American diplomat in China, trying to build political, cultural, and economic relationships between the two countries. But now you’ll have better chances of success in all your activities. ", },
     { name: "Mid-Level", prev: "Junior", next: "Senior", points: 400, nextLevel: 750, description: "As a Mid-Level Diplomat, you'll continue your work in China, but with your growing knowledge of the country, you'll have better luck in all your interactions. And you'll be given tasks with greater responsibilities -- you may even help negotiate a trade agreement! ", },
    { name: "Senior", prev: "Mid-Level", next: "Master", points: 750, nextLevel: 1000, description: "As a Senior Diplomat, you'll continue working to build political, cultural, and economic relationships between China and the United States, and your tasks will include major diplomatic efforts like trade agreements!", },
    { name: "Master", prev: "Senior", next: "", points: 1000, nextLevel: null, description: "As a Master Diplomat, you are now an old China hand, an expert on the country's history, culture, geography, and economy. All that makes you a valuable diplomat, and more effective at building political, cultural, and economic relationships between China and the United States. Well done!", },
]

var messages = [
{ heading: "China is a Vast and Ancient Civilization", text: "What do you do first? Discover China <span class='dis-icon'></span> by meeting the people and visiting amazing places. And start doing diplomacy <span class='dip-icon-low'></span><span class='dip-icon-high'></span>!" },
{ heading: "What Do You Want To Do Next?", text: "Look at your possible activities and choose those that will best help you reach your goals." },
]

var credits = [
"China Map Illustrated by Maria Rabinky, (c) 2017 Rabinky Art, LLC",
"Chinese Auto Factory - U.S. Department of State (Wikimedia Commons)",
"Chinese New Year (iStock Photo)",
"Cotton - public domain (Wikimedia Commons)",
"Dragon Boat Race (iStock Photo)",
"Everest (Himalayas) shrimpo1967derivative work: Papa Lima Whiskey 2 (Wikimedia Commons)",
"Forbidden City - kallgan (Wikimedia Commons)",
"Great Wall - Severin.stalder (Wikimedia Commons)",
"Tutor (iStock Photo)",
"Leshan Giant Buddha (Shutterstock)",
"Li River (iStock Photo)",
"Ming Tombs (Shutterstock)",
"Mogao Caves - Zhangzhugang (Wikimedia Commons)",
"Opera - 刻意 (Wikimedia Commons)",
"Giant pandas (iStock Photo)",
"Potala Palace - Coolmanjackey (Wikimedia Commons)",
"Rice terraces - chensiyuan (Wikimedia Commons)",
"Silk factory interior (iStock Photo)",
"Table tennis - public domain (Wikimedia Commons)",
"Tea terraces - Shizhao (Wikimedia Commons)",
"Terracotta Army - Maros M r a z (Maros) (Wikimedia Commons)",
"Three Gorges Dam - Rehman (Wikimedia Commons)",
"Tiger (iStock Photo)",
"Yangtze River cruise - Andrew Hitchcock (Wikimedia Commons)"
];

var audioList = {};

$(document).ready(function () {

   
    //console.log("*****el")
    //           el = new Everlive({
    //                apiKey: key,
    //                offline: true,
    //                scheme: "https"
    //            });




    config = {
        apiKey: fbKey,
        authDomain: fbAuthDomain,
        databaseURL: fbUrl,
        projectId: fbProjectId,
        storageBucket: "",
        messagingSenderId: fbMsgId
    };
    firebase.initializeApp(config);

         
    audioList.intro = document.getElementById("audio-intro");
    audioList.diplo = document.getElementById("audio-diplo");
    audioList.goodLow = document.getElementById("audio-diplo-good-low");
    audioList.goodHigh = document.getElementById("audio-diplo-good-hi");
    audioList.badLow = document.getElementById("audio-diplo-bad-low");
    audioList.badHigh = document.getElementById("audio-diplo-bad-hi");


    audioList.bushCard = document.getElementById("audio-bush-card");
    audioList.bushLayout = document.getElementById("audio-bush-layout");

    audioList.achievement = document.getElementById("audio-achievement");
    audioList.discover = document.getElementById("audio-discover");
    audioList.levelUp = document.getElementById("audio-levelup");
    audioList.career = document.getElementById("audio-career");

});

// Fabric constants//
var shadow = {
    color: 'rgba(0,0,0,0.8)',
    blur: 7,
    offsetX: 3,
    offsetY: 3,
    opacity: 0.7,
    fillShadow: true,
    strokeShadow: true
}


var glowFill = "#e64a24";

var shadowGlow = {
    color: 'rgba(220,50,50,1)',
    blur: 15,
    offsetX: 0,
    offsetY: 0,
    opacity: 1,
    //fillShadow: true,
   // strokeShadow: true
}

var shadowLrg = {
    color: 'rgba(0,0,0,0.8)',
    blur: 27,
    offsetX: 3,
    offsetY: 3,
    opacity: 0.7,
    fillShadow: true,
    strokeShadow: true
}

var disGradientReady = {
    type: 'radial',
    r1: 0,
    r2: 12,
    x1: 12,
    y1: 12,
    x2: 12,
    y2: 12,
    colorStops: {
        0: '#ffef80',
        1: '#fabd00'
    }
};

var disGradientLocked = {
    type: 'radial',
    r1: 0,
    r2: 12,
    x1: 12,
    y1: 12,
    x2: 12,
    y2: 12,
    colorStops: {
        0: '#202020',
        1: '#808080'
    }
};

var disGradientEmpty = {
    type: 'radial',
    r1: 0,
    r2: 12,
    x1: 12,
    y1: 12,
    x2: 12,
    y2: 12,
    colorStops: {
        0: '#202020',
        1: '#808080'
    }
};

var dipGradientReady = {
    type: 'radial',
    r1: 0,
    r2: 8,
    x1: 12,
    y1: 15,
    x2: 12,
    y2: 15,
    colorStops: {
        0: '#ff9a0d',
        1: '#de2910'
    }
};

var dipGradientLocked = {
    type: 'radial',
    r1: 0,
    r2: 8,
    x1: 12,
    y1: 15,
    x2: 12,
    y2: 15,
    colorStops: {
        0: '#000000',
        1: '#303030'
    }
};

var dipGradientFail = {
    type: 'radial',
    r1: 0,
    r2: 8,
    x1: 12,
    y1: 12,
    x2: 12,
    y2: 12,
    colorStops: {
        0: '#000000',
        1: '#303030'
    }
};

var dipGradientSuccess = {
    type: 'radial',
    r1: 0,
    r2: 9,
    x1: 12,
    y1: 15,
    x2: 12,
    y2: 15,
    colorStops: {
        0: '#34cac6',
        1: '#24bab6'
    }
};


var dipGradientHover = {
    type: 'radial',
    r1: 0,
    r2: 9,
    x1: 12,
    y1: 15,
    x2: 12,
    y2: 15,
    colorStops: {
        0: '#79dcff',
        1: '#099ce6'
    }
};

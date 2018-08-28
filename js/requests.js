var master = JSON.parse(Get("http://starlord.hackerearth.com/gamesext"));
var head = []
var genres = []
var platforms = []
let mc = 0
var cards = $(".card");
let pagecard = 0;

//clamps a value between two values
function clamp(val, min, max) {
    return Math.min(Math.max(parseInt(val), min), max);
}

//returns a list with no duplicate element
function uniquelist(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

//fetch from JSON API
function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

//animate the cards slowly from bottom
function fadeIn() {
    var cards = $(".card");
    pagecard = cards.length;
    $(cards).each(function() {
        $(this).removeClass('animate-card');
    });
    $(".card").css({ opacity: 0 })
    animatecards();
    //debug
    info = ""
    var currentpage = $(".active")[0].innerText.trim();
    info = "currently in page " + currentpage + " showing " + pagecard + " games of " + master.length + " games"
        //debug
}

//trigger animation by adding the animation class
function triggeranim(obj, rem, add) {
    $(obj).removeClass(" " + rem).addClass(" " + add);
}

//debug
/*for (i = 0; i < 10; i++) {
    head.push(master[i])
}
console.log(head)
*/
//debug

//shuffles the array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//add games to the HTML file dynamically using JS
for (i = 0; i < master.length; i++) {
    addgame();
    genres.push(master[i].genre);
    platforms.push(master[i].platform);
}

//selects a random color from list
//debug 
/*function randomcolor() {
    let colours = ['#e6194b', '#3cb44b', '#0082c8', '#f58231', '#ffe119', '#008080', '#000080']
    shuffle(colours);
    let col = colours.pop()
    colours.push(col)
    return col
}*/
//debug


//normalize most occuring platforms to shortnames
//(ie) playstation, playstation 3 and 4 can now be commonly considered as ps
function normalize(platform) {
    if (platform.includes("PlayStation")) {
        return "ps";
    } else if (platform.includes("iP")) {
        return "ip";
    } else if (platform.includes("Xbox")) {
        return "xb";
    } else if (platform.includes("Macintosh")) {
        return "mac";
    } else if (platform.includes("PC")) {
        return "pc";
    } else if (platform.includes("Nintendo")) {
        return "nt";
    } else {
        return "no idea";
    }
}

//chooses a color for a platform(this is where i lost my precious time :P)
function choose_color(platform) {
    var pf = normalize(platform);
    switch (pf) {
        case "ps":
            return "#3F51B5";
            break;
        case "ip":
            return "#212121";
            break;
        case "pc":
            return "#212121";
            break;
        case "nt":
            return "#FF4B26";
            break;
        case "xb":
            return "#4CAF50";
            break;
        case "mac":
            return "#455A64";
            break;
        case "no idea":
            return "#000000";
            break;
        default:
            return "#000000";
    }
}


//This is the brain of the webapp, takes the JSON item and creates a HTML structure and pushes to the main HTML file
function addgame() {
    var list = document.getElementById('grid'); //wrapper
    var newitem = document.createElement('div'); //game item element
    var content = document.createElement('div'); //game content
    var header = document.createElement('a'); //game name
    var img = document.createElement('div'); //svg holder
    var rating = document.createElement('div'); //radial holder
    var ratingdis = document.createElement('span'); // release year
    var platform = document.createElement('div'); //platform
    var extra = document.createElement('div'); //misc
    var genre = document.createElement('span'); //genre
    var relyear = document.createElement('span'); // release year
    header.innerHTML = master[mc].title;
    platform.innerHTML = master[mc].platform;
    genre.innerHTML = "<b>" + master[mc].genre + "</b>";
    ratingdis.innerHTML = master[mc].score;
    relyear.innerHTML = "<b>" + master[mc].release_year + "</b>";
    header.className = header.className + "header name";
    ratingdis.className = rating.className + "score";
    content.className = content.className + "content center aligned segment";
    platform.className = platform.className + "meta platform";
    newitem.className = newitem.className + "card grow";
    img.className = img.className + "ui image";
    rating.className = rating.className + "progress";
    extra.className = extra.className + "extra content";
    extra.style.backgroundColor = choose_color(master[mc].platform);
    genre.className = genre.className + "left floated genre";
    relyear.className = relyear.className + "right floated year";
    $(ratingdis).attr("style", "display:none");
    $(rating).attr("id", "progress-" + mc);
    $(header).attr("href", "http://ign.com" + master[mc].url);
    $(header).attr("target", "blank");
    img.appendChild(rating);
    img.appendChild(ratingdis);
    content.appendChild(img);
    content.appendChild(header);
    content.appendChild(platform);
    newitem.appendChild(content);
    extra.appendChild(genre);
    extra.appendChild(relyear);
    newitem.appendChild(extra);
    grid.appendChild(newitem);
    mc += 1;
}

//semantic ui stuff
$('.ui.dropdown').dropdown();

//initialize list.js
$(document).ready(function() {
    options = {
        valueNames: ['year', 'name', 'genre', 'platform', 'score'],
        page: 75,
        pagination: true
    };
    userList = new List('main', options);
})

//animate cards function
function animatecards() {
    var delay = 0;
    $('.card').each(function() {
        var $card = $(this);
        setTimeout(function() {
            triggeranim($card, "animate-card", "animate-card");
        }, delay += 50);
    });
}

//these three functions add the animations to the app
$input = $(".search-list");
$input.on('keydown', function() {
    fadeIn();
});
//
$(document).ready(function() {
        fadeIn();
    })
    //
$(".pagination").click(function() {
    fadeIn();
});
//

//add contents(genre) to dropdown menu using JS
genres = uniquelist(genres);
genrelist = document.getElementsByClassName("genre-list")[0];
for (i = 0; i < genres.length; i++) {
    var genreitem = document.createElement('div');
    genreitem.className = "item filter-genre";
    genreitem.innerText = genres[i];
    genrelist.appendChild(genreitem);
}
var header = document.createElement('div')
header.className = "header";
header.innerText = "Platform";
genrelist.appendChild(header);
var divider = document.createElement('div');
divider.className = "divider";
genrelist.appendChild(divider);

//add contents(platform) to dropdown menu using JS
platformss = uniquelist(platforms);
platfromlist = document.getElementsByClassName("genre-list")[0];
for (i = 0; i < platformss.length; i++) {
    var platformitem = document.createElement('div');
    platformitem.className = "item filter-platform";
    platformitem.innerText = platformss[i];
    platfromlist.appendChild(platformitem);
}


//filter by genre process runs here
$('.filter-genre').on('click', function() {
    var $text = $(this).text();
    if ($(this).hasClass('selected')) {
        userList.filter();
        $(this).removeClass('selected');
    } else {
        userList.filter(function(item) {
            return (item.values().genre.replace(/<(?:.|\n)*?>/gm, '') == $text);
        });
        $(this).addClass('selected');
    }
    fadeIn();
});

//filter by platform process runs here
$('.filter-platform').on('click', function() {
    var $text = $(this).text();
    if ($(this).hasClass('selected')) {
        userList.filter();
        $(this).removeClass('selected');
    } else {
        userList.filter(function(item) {
            return (item.values().platform.replace(/<(?:.|\n)*?>/gm, '') == $text);
        });
        $(this).addClass('selected');
    }
    fadeIn();
});

//sort process runs here
$('.sort').on('click', function() {
    setTimeout(function() { fadeIn() }, 500);
});
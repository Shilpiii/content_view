let top_header_element_id = undefined;
var header_element_id;
let total_headers_length = 0;
var notes_bm_map;
var notes_bm_map = new Map(
    [
        ['ENAS5526_1.0.0.0', "{'noted','bookmarked'}"],
        ['ENAS5526_3.1.1.0', "{'noted'}"],
        ['ENAS5526_3.1.2.0', "{'bookmarked'}"],
        ['ENAS5526_4.1.1.0', "{'bookmarked'}"]
    ]);
var pageid_note_book;
var page_id, next_header_element_class, header_element_height, all_data_attributes ,previous_header_element;
var called = false;
var height_of_levels = 0;

function initialise() {

    total_headers_length = document.querySelectorAll(".header1, .header2, .header3, .header4").length;
    data_attributes = document.querySelectorAll(".header1, .header2, .header3, .header4");
    //hide menu button while scrolling by default
    document.getElementsByClassName("menu")[0].style.display = "none";

    for (var i = 0; i < total_headers_length; i++) {
        var header_element = document.querySelectorAll(".header1, .header2, .header3, .header4")[i];
        if(i<=1){
            var header_element = document.querySelectorAll(".header1, .header2, .header3, .header4")[i];
        }
        else{
            previous_header_element = document.querySelectorAll(".header1, .header2, .header3, .header4")[i - 1];
        }
        header_element_id = document.querySelectorAll(".header1, .header2, .header3, .header4")[i].dataset.numtree;
        top_pageName = document.querySelectorAll(".header1, .header2, .header3, .header4")[i].id;
        var screenPositionTop = header_element.getBoundingClientRect().top;

        if (screenPositionTop <= 3 && screenPositionTop >= -2) {
            document.getElementById(header_element.id).classList.add("wrapped_header");
            var menubtn = document.getElementsByClassName("menu_btn")[0];
            menubtn.style.display = "block";
            menubtn.setAttribute("id", header_element_id + '_menu_btn');
            var menu_btn_id = menubtn.id;
            document.getElementById(menu_btn_id).onclick = function (element) {
                expandDropdown(element);
            }

            if (i == (total_headers_length - 1)) {
                var next_header_element = null;
                document.getElementsByClassName("menu")[0].style.display = "block";
                document.getElementById(menu_btn_id).onclick = function (element) {
                    expandDropdown(element);
                }
                toggleMenuOptions(top_pageName, notes_bm_map);
            } else {
                var next_header_element = document.querySelectorAll(".header1, .header2, .header3, .header4")[i + 1];
                var next_header_element_class = document.querySelectorAll(".header1, .header2, .header3, .header4")[i + 1].dataset.numtree;
                
                if ((header_element.classList[0] == "header1") && (next_header_element.classList[0] == "header2")) {
                    document.getElementsByClassName("menu")[0].style.display = "none";
                } else if ((header_element.classList[0] == "header2") && (next_header_element.classList[0] == "header3")) {
                    document.getElementsByClassName("menu")[0].style.display = "none";
                } else if ((header_element.classList[0] == "header3") && (next_header_element.classList[0] == "header4")) {
                    document.getElementsByClassName("menu")[0].style.display = "none";
                } else if ((header_element.classList[0] == "header1") && (next_header_element.classList[0] !== "header2")) {
                    pageid_note_book = top_pageName;
                    document.getElementsByClassName("menu")[0].style.display = "block";
                    document.getElementById(menu_btn_id).onclick = function (element) {
                        expandDropdown(element);
                    }
                    toggleMenuOptions(top_pageName, notes_bm_map);
                }
                else {
                    document.getElementsByClassName("menu")[0].style.display = "block";
                    console.log("header_element_id===" + header_element_id);
                    page_id = header_element_id;
                    pageid_note_book = top_pageName;
                    toggleMenuOptions(top_pageName, notes_bm_map);
                    document.getElementById(menu_btn_id).onclick = function (element) {
                        expandDropdown(element);
                    }
                    break;
                }
            }
        } else {
            if ($(`.${header_element.classList[1]}`).hasClass("wrapped_header")) {
                document.querySelectorAll('[data-numtree="' + header_element_id + '"]')[0].classList.remove("wrapped_header");

            }
        }
    }

    if (called === true) {
        var next_id = document.querySelectorAll('[data-numtree="' + next_header_element_class + '"]')[0];
        var next_id_class = next_id.classList[0];
        var height_of_next_id = next_id.getBoundingClientRect().top;
        if(height_of_next_id <= (height_of_levels+20)){
            var dropdown = document.getElementById("dropdown");
            dropdown.style.paddingTop = "";
            collapseHeader();
            called = false;
        }
    }
}

function calculate_white_space() {
    var height_of_device = window.innerHeight;
    last_div = document.querySelector('div.content_div:last-child');
    var height_of_last_div = last_div.offsetHeight;

    var lastElement = document.querySelector('body:last-child');
    var bottom_margin = window.getComputedStyle(lastElement).marginBottom;
    var bottom_margin_int = parseInt(bottom_margin);
    var white_space = height_of_device - height_of_last_div - bottom_margin_int;
    var span = document.createElement("span");
    span.style.display = "block";
    span.style.height = white_space;
    last_div.appendChild(span);
    fillNotesBM(notes_bm_map);
}

function expandHeader() {
    var get_className = document.querySelectorAll('[data-numtree="' + page_id + '"]')[0];
    var headerLevel = get_className.classList[0];
    var splittedId = page_id.split(".");
    var i, j, k, n = 4;

    for (i = 1; i <= n; i++) {
        if (headerLevel == ("header" + i)){
            for (j = 1; j <= i; j++) {
                //empty numtree
                var numtree = "";
                var level = document.getElementById("level" + j);
                level.classList.add("header" + j);
                for (k = 0; k < j; k++) {
                    numtree = numtree + splittedId[k] + ".";
                }
                //remove last "."
                numtree = numtree.slice(0, -1);
                //append required ".0"
                numtree = numtree + ".0".repeat(4 - j);
                level.innerHTML = document.querySelectorAll('[data-numtree="' + numtree + '"]')[0].innerHTML;
                height_of_levels = height_of_levels + level.clientHeight;
            }

            var menu = document.getElementsByClassName("menu")[0];
            menu.style.display = "block";
            if(i == 2){
                menu.style.marginTop = "52px";
            } else if(i == 3){
                menu.style.marginTop = "98px";
            } else if(i == 4){
                menu.style.marginTop = "142px";
            }

            // var dropdown = document.getAnimations("dropdown")
            break;
        } else {
            continue;
            }
    }
    called = true;

    /* With different CSS */
  /*   var menu = document.getElementsByClassName("menu")[0];
    menu.style.display = "block";
    menu.style.marginTop = height_of_levels - 46;
    var dropdown = document.getElementById("dropdown");
    dropdown.style.setProperty("marginTop" , height_of_levels + 45, "!important");
    dropdown.style.marginTop = height_of_levels + 45; */
    /* var menu = document.getElementsByClassName("menu")[0];
    menu.style.display = "block";
    menu.style.marginTop = height_of_levels - 46; */
    var dropdown = document.getElementById("dropdown");
    dropdown.style.paddingTop = height_of_levels-35;

}

function collapseHeader() {
    var n = 4;
    for (j = 1; j <= n; j++) {
        var levels = document.getElementById("level" + j);
        levels.innerHTML = "";
        levels.className = "";
    }
    called = false;
    height_of_levels = 0;
    var menu = document.getElementsByClassName("menu")[0];
    menu.style.display = "none";
    menu.style.marginTop = "10px";
}

function expandDropdown(element) {
    document.getElementById("dropdown").classList.toggle("show");
    document.getElementById("menu").classList.toggle("whiteBackground");
    element.stopPropagation();
    element.preventDefault();
}

/* Toogle menu options if page has already note/bookmark */
function toggleMenuOptions(top_page, notes_bm_map) {
    //fetch notes/bookmark status of the page which is on top
    var pageStatus = notes_bm_map.get(top_page);
    //set default text & status
    document.getElementById("takeNote").innerHTML = "Take a note";
    document.getElementById("bookmarkPage").innerHTML = "Bookmark this page";
    document.getElementById("noteLink").setAttribute("data-noted", "no");
    document.getElementById("bookmarkLink").setAttribute("data-bookmarked", "no");

    //if page entry found in notes-bookmarks map
    if (pageStatus != undefined) {
        //remove opening & closing curly braces for values
        pageStatus = pageStatus.slice(1);
        pageStatus = pageStatus.slice(0, -1);
        var status = pageStatus.split(",");
        //if page is either only noted or only bookmarked
        if (status.length == 1) {
            if (status[0] == "\'noted\'") {
                //only noted
                document.getElementById("takeNote").innerHTML = "Edit Note";
                document.getElementById("noteLink").setAttribute("data-noted", "yes");
            } else if (status[0] == "\'bookmarked\'") {
                //only bookmarked
                document.getElementById("bookmarkPage").innerHTML = "Remove Bookmark";
                document.getElementById("bookmarkLink").setAttribute("data-bookmarked", "yes");
            }
        } else if (status.length == 2) {
            //  if page is both noted & bookmarked
            document.getElementById("takeNote").innerHTML = "Edit Note";
            document.getElementById("bookmarkPage").innerHTML = "Remove Bookmark";
            document.getElementById("noteLink").setAttribute("data-noted", "yes");
            document.getElementById("bookmarkLink").setAttribute("data-bookmarked", "yes");
        }
    }
}

function fillNotesBM(notes_bm_map) {
    for (let [pageName, pageStatus] of notes_bm_map) {
        pageStatus = pageStatus.slice(1);
        pageStatus = pageStatus.slice(0, -1);
        var status = pageStatus.split(",");
        var pageDiv = document.getElementById(pageName);
        //if page is either only noted or only bookmarked
        if(pageDiv !=null)
        if (status.length == 1) {
            if (status[0] == "\'noted\'") {
                //only noted
                var img = document.createElement("img");
                img.src = "noted.png";
                img.setAttribute("id", "noted" + pageName);
                img.setAttribute("class", "noted");
                pageDiv.appendChild(img);
            } else if (status[0] == "\'bookmarked\'") {
                //only bookmarked
                var img = document.createElement("img");
                img.src = "bookmarked.png";
                img.setAttribute("id", "bm" + pageName);
                img.setAttribute("class", "bookmarked");
                pageDiv.appendChild(img);
            }
        } else if (status.length == 2) {
            //  if page is both noted & bookmarked
            var img = document.createElement("img");
            img.src = "bookmarked.png";
            img.setAttribute("id", "bm" + pageName);
            img.setAttribute("class", "bookmarked");
            pageDiv.appendChild(img);
            var img2 = document.createElement("img");
            img2.src = "noted.png";
            img2.setAttribute("id", "noted" + pageName);
            img2.setAttribute("class", "noted");
            pageDiv.appendChild(img2);
        }
    }
}

function noteAction(pageid) {
    currentNoteStatus = document.getElementById("noteLink").getAttribute("data-noted");
    if(currentNoteStatus == "yes"){
        document.getElementById("noteLink").setAttribute("href", "editNote_" + pageid);
    } else if(currentNoteStatus == "no"){
        var img = document.createElement("img");
        img.src = "noted.png";
        img.setAttribute("id", "noted" + pageid);
        img.setAttribute("class", "noted");
        var pageDiv = document.getElementById(pageid);
        pageDiv.appendChild(img);
        document.getElementById("noteLink").setAttribute("href", "note_" + pageid);
        document.getElementById("takeNote").innerHTML = "Edit Note";
        document.getElementById("noteLink").setAttribute("data-noted", "yes");
    }
    expandDropdown();
    
}

function bookmarkAction(pageid) {
    currentBookmarkStatus = document.getElementById("bookmarkLink").getAttribute("data-bookmarked");
    var pageDiv = document.getElementById(pageid);
    if(currentBookmarkStatus == "yes"){
        document.getElementById("bookmarkLink").setAttribute("data-bookmarked", "no");
        document.getElementById("bookmarkLink").setAttribute("href", "unbookmark_" + pageid);
        document.getElementById("bookmarkPage").innerHTML = "Bookmark this page";
        document.getElementById("bm" + pageid).remove();
    } else if(currentBookmarkStatus == "no"){
        document.getElementById("bookmarkLink").setAttribute("data-bookmarked", "yes");
        document.getElementById("bookmarkLink").setAttribute("href", "bookmark_" + pageid);
        var img = document.createElement("img");
        img.src = "bookmarked.png";
        img.setAttribute("id", "bm" + pageid);
        img.setAttribute("class", "bookmarked");
        pageDiv.appendChild(img);
        document.getElementById("bookmarkPage").innerHTML = "Remove Bookmark";
    }
    expandDropdown();
}

function initialiseNotesBM(obj){
    obj = JSON.parse(obj);
    notes_bm_map = new Map();
    for (let k of Object.keys(obj)) {
        notes_bm_map.set(k, obj[k]);
    }
    fillNotesBM(notes_bm_map);
}

function closeDropdown(){
    if($("#dropdown").hasClass("show")){
        $("#dropdown").removeClass("show");
    }
    if($("#menu").hasClass("whiteBackground")){
        $("#menu").removeClass("whiteBackground");
    }
}
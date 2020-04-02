let top_header_element_id = undefined;
var header_element_id;
let total_headers_length = 0;
var notes_bm_map = new Map(
    [
        ['ENAS5526_2.0.0.0', '{"noted","bookmarked"}'],
        ['ENAS5526_3.1.1.0', '{"noted"}'],
        ['ENAS5526_3.1.2.0', '{"bookmarked"}'],
        ['ENAS5526_4.1.1.0', '{"bookmarked"}']
    ]);
var pageid_book, pageid_note;
var page_id, next_header_element_class;
var called = false;
var height_of_levels = 0;

function expandDropdown(menu_btn_id) {
    document.getElementById("dropdown").classList.toggle("show");
    document.getElementById(menu_btn_id).classList.toggle("whiteBackground");

}
function initialise() {

    total_headers_length = document.querySelectorAll(".header1, .header2, .header3, .header4").length;

    for (var i = 0; i < total_headers_length; i++) {
        var header_element = document.querySelectorAll(".header1, .header2, .header3, .header4")[i];
        header_element_id = document.querySelectorAll(".header1, .header2, .header3, .header4")[i].dataset.numtree;
        top_pageName = document.querySelectorAll(".header1, .header2, .header3, .header4")[i].id;
        var screenPositionTop = header_element.getBoundingClientRect().top;

        if (screenPositionTop <= 3 && screenPositionTop >= -2) {
            document.getElementById(header_element.id).classList.add("wrapped_header");
            var menubtn = document.getElementsByClassName("menu_btn")[0];
            menubtn.style.display = "block";
            menubtn.setAttribute("id", header_element_id + '_menu_btn');
            var menu_btn_id = menubtn.id;
            document.getElementById(menu_btn_id).onclick = function () {
                expandDropdown(menu_btn_id);
            }

            if (i == (total_headers_length - 1)) {
                var next_header_element = null;
                // document.getElementsByClassName("arrow_class")[0].style.display = "block";
                document.getElementsByClassName("menu")[0].style.display = "block";
                document.getElementById(menu_btn_id).onclick = function () {
                    expandDropdown(menu_btn_id);
                }
                toggleMenuOptions(top_pageName, notes_bm_map);
            } else {
                var next_header_element = document.querySelectorAll(".header1, .header2, .header3, .header4")[i + 1];
                var next_header_element_class = document.querySelectorAll(".header1, .header2, .header3, .header4")[i + 1].className;
                
                if ((header_element.classList[0] == "header1") && (next_header_element.classList[0] == "header2")) {
                    document.getElementsByClassName("menu")[0].style.display = "none";
                    // document.getElementsByClassName("arrow_class")[0].style.display = "none";
                } else if ((header_element.classList[0] == "header2") && (next_header_element.classList[0] == "header3")) {
                    document.getElementsByClassName("menu")[0].style.display = "none";
                    // document.getElementsByClassName("arrow_class")[0].style.display = "none";
                } else if ((header_element.classList[0] == "header3") && (next_header_element.classList[0] == "header4")) {
                    document.getElementsByClassName("menu")[0].style.display = "none";
                    // document.getElementsByClassName("arrow_class")[0].style.display = "none";
                } else if ((header_element.classList[0] == "header1") && (next_header_element.classList[0] !== "header2")) {
                    document.getElementsByClassName("menu")[0].style.display = "block";
                    // document.getElementsByClassName("arrow_class")[0].style.display = "none";
                    pageid_book = header_element_id + '_bookmarks_icon';
                    pageid_note = header_element_id + '_notes_icon';
                    toggleMenuOptions(top_pageName, notes_bm_map);
                }
                else {
                    document.getElementsByClassName("menu")[0].style.display = "block";
                    console.log("header_element_id===" + header_element_id);
                    toggleMenuOptions(top_pageName, notes_bm_map);
                    pageid_book = header_element_id + '_bookmarks_icon';
                    pageid_note = header_element_id + '_notes_icon';
                    // document.getElementsByClassName("arrow_class")[0].style.display = "block";
                    document.getElementById(menu_btn_id).onclick = function () {
                        expandDropdown(menu_btn_id);
                    }
                    page_id = header_element_id;
                    break;
                }


            }


        }
        else if (screenPositionTop >= 30 || screenPositionTop <= -30) {
            if ($(`.${header_element.classList[1]}`).hasClass("wrapped_header")) {
                document.querySelectorAll('[data-numtree="' + header_element_id + '"]')[0].classList.remove("wrapped_header");

            }
        }
        // else if (screenPositionTop <= -3) {
        //     if ($(`.${header_element.classList[1]}`).hasClass("wrapped_header")) {
        //         document.querySelectorAll('[data-numtree="'+header_element_id+'"]')[0].classList.remove("wrapped_header");

        //     }
        // }
        else if (screenPositionTop >= 3 || screenPositionTop <= -3) {
            // document.getElementsByClassName("arrow_class")[0].style.display = "none";

        }



    }

    if (called === true) {
        for (j = 1; j <= 4; j++) {
            var next_header_class = document.querySelectorAll(".header1, .header2, .header3, .header4")[i].classList[0];
            var next_header_class1 = document.querySelectorAll(".header1, .header2, .header3, .header4")[i + j].className;
            var next_header_dataid1 = document.querySelectorAll(".header1, .header2, .header3, .header4")[i + j].dataset.numtree;
            var height_of_next_header_dataid1 = document.querySelectorAll('[data-numtree="' + next_header_dataid1 + '"]')[0].getBoundingClientRect().top;
            var headerlevels = 0;
            var splitted_id = next_header_element_class.split("r");
            for(k = 1; k <= splitted_id[1]; k++){
                var headerlevel = document.getElementById("level"+k);
                headerlevels = headerlevels + headerlevel.clientHeight;
            }
            for (k = 1; k <= 4; k++) {
                if (next_header_class1 == "header" + k) {
                    if (height_of_next_header_dataid1 < height_of_levels) {
                        var level = document.getElementById("level" + k);
                        var header_class = document.querySelectorAll('[data-numtree="' + next_header_dataid1 + '"]')[0].classList[0];
                        level.classList.add(header_class);
                        level.innerHTML = document.querySelectorAll('[data-numtree="' + next_header_dataid1 + '"]')[0].innerHTML;
                    }
                }                        
            }

           
            if(next_header_class !== next_header_element_class){
                if(height_of_next_header_dataid1 < height_of_levels){
                for(l = 1; l <= 4; l++){
                    if(next_header_element_class=="header"+l){
                        for(m = 4; m > l; m--){
                        var header_levels = document.getElementById("level" + (m));
                        header_levels.innerHTML = "";
                        header_levels.className = "";
                        }
                    }
                }
                }
            }
        }
    }
}


function noteAction(pageid) {
    currentNoteStatus = document.getElementById("noteLink").getAttribute("data-noted");
    if(currentNoteStatus == "yes"){
        document.getElementById("noteLink").setAttribute("href", "editNote_" + pageid);
    } else if(currentNoteStatus == "no"){
        document.getElementById("noteLink").setAttribute("href", "note_" + pageid);
    }
    
}

function bookmarkAction(pageid) {
    currentBookmarkStatus = document.getElementById("bookmarkLink").getAttribute("data-bookmarked");
    if(currentBookmarkStatus == "yes"){
        document.getElementById("bookmarkLink").setAttribute("href", "unbookmark_" + pageid);
    } else if(currentBookmarkStatus == "no"){
        document.getElementById("bookmarkLink").setAttribute("href", "bookmark_" + pageid);
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


function expandHeader2() {
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
            called = true;
            break;
        } else {
            continue;
            }
    }

}

function collapseHeader() {
    var n = 4;
    for (j = 1; j <= n; j++) {
        var levels = document.getElementById("level" + j);
        levels.innerHTML = "";
        levels.className = "";
    }

}

/* Toogle menu options if page has already note/bookmark */
function toggleMenuOptions(top_page, notes_bm_map) {
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
            if (status[0] == "\"noted\"") {
                //only noted
                document.getElementById("takeNote").innerHTML = "Edit Note";
                document.getElementById("noteLink").setAttribute("data-noted", "yes");
            } else if (status[0] == "\"bookmarked\"") {
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
            if (status[0] == "\"noted\"") {
                //only noted
                var img = document.createElement("img");
                img.src = "noted.png";
                img.setAttribute("id", "noted" + pageName);
                img.setAttribute("class", "noted");
                pageDiv.appendChild(img);
            } else if (status[0] == "\"bookmarked\"") {
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

function TakeScreenshot1()
{
    html2canvas(document.body,{
        onrendered: function(canvas)  
        {
            var img = canvas.toDataURL();
            console.log("base 64");
            console.log(img);
        },
        width: window.innerWidth,
        height: window.innerHeight,
    });
    return true;
}

function TakeScreenshot()
{
    var img; 
    base64 = abc();
    console.log(base64);
    abc().then((value) => console.log(value));

    return img;
}

async function abc(){
    html2canvas(document.body,{
        onrendered: function(canvas)  
        {
            img = canvas.toDataURL();
            return img;
        },
    });
}
function Take2(){
    console.log("Akansha");
    document.body.html2canvas();
    var queue = html2canvas.Parse();
    var canvas = html2canvas.Renderer(queue,{elements:{length:1}});
    var img = canvas.toDataURL();
    console.log((img));
    html2canvas(document.body).then(function (canvas) {
        document.body.appendChild(canvas);
     });
}

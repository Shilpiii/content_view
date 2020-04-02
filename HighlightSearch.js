
var word ;
function letSearch(search_item)
{
    //var curr_url=curr_url+"?"+search_item+"?"+search_item;
	
    doSearch(search_item);
   
}
function loadCssFile(fileName)
{
	var fileRef = document.createElement("link");
	fileRef.setAttribute("rel", "stylesheet");
	fileRef.setAttribute("type", "text/css");
	fileRef.setAttribute("href", fileName);

	if (typeof fileRef != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileRef);
}
function _geturl1()
{
    var url1 = document.location.href;
    
    url1 = decodeURI(url1);
    //alert(url1);
    //doSearch(url1);
     var space = (url1.split(/\+/g).length - 1);
    
     if(space == 0)
     {
        seaword();
    }
    else
    {
        seawordfull();
    }


}

function changeSize(font)
{
    console.log("Akans");
    document.getElementsByTagName('body')[0].style.webkitTextSizeAdjust= font+"%";
}

function doSearch(text) {
    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);
        
        while (window.find(text)) {
            
            document.execCommand("HiliteColor", false, "yellow");
            sel.collapseToEnd();
        }
        document.designMode = "off";
    } else if (document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        while (textRange.findText(text)) {
            textRange.execCommand("BackColor", false, "yellow");
            textRange.collapse(false);
        }
    }
    
}


function seaword()
{
    var url1 = document.location.href;
    var from1 = url1.indexOf('?',0);
    var to1 = url1.indexOf('?',from1+1);
    var swordis =  url1.substring(from1+1, to1);
    if((from1 != -1 )&&(to1 != -1))
    {
        if(from1 < to1)
        {
            var swordis =  url1.substring(from1+1, to1);
            word = decodeURI(swordis);
            highlightSearchTerms(word);
            doSearch(word);
        }
    }



}

function seawordfull()
{
    var url1 = document.location.href;
    var u = decodeURI(url1);
    var from1 = u.indexOf('?',0);
    var to1 = u.indexOf('?',from1+1);
    var swordis =  u.substring(from1+1, to1);
    var strnew = swordis.replace(/\+/g," ");
    highlightSearchTerms(decodeURI(strnew),1);
    doSearch(decodeURI(strnew));
}

function replaceAll(find, replace, str)
{
    return str.replace(new RegExp(find, 'g'), replace);
}

String.prototype.insert = function (index, string)
{
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};


function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag)
{
    // the highlightStartTag and highlightEndTag parameters are optional
    if ((!highlightStartTag) || (!highlightEndTag)) {
        highlightStartTag = "<font style='color:blue; background-color:yellow;'>";
        highlightEndTag = "</font>";
    }
    
    
    var newText = '';
    var i = -1;
    var lcSearchTerm = searchTerm.toLowerCase();
    var lcBodyText = bodyText.toLowerCase();
    var lenOfCurrStr = lcSearchTerm.length;
    
    bodyText = bodyText.replace(/\u00AD/g, '<wbr>');
    lcBodyText = lcBodyText.replace(/\u00AD/g, '<wbr>');
    
    
    
    for(var len = 0; len < lenOfCurrStr; len++)
    {
        lcSearchTerm = lcSearchTerm.insert(len,'<wbr>');
        i = lcBodyText.indexOf(lcSearchTerm, i+1);
        if (i > 0)
        {
            newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, lcSearchTerm.length) + highlightEndTag;
            bodyText = bodyText.substr(i + lcSearchTerm.length);
            lcBodyText = bodyText.toLowerCase();
            i = -1;
        }
        lcSearchTerm = replaceAll('<wbr>','',lcSearchTerm);
    }
    
    while (bodyText.length > 0)
    {
        i = lcBodyText.indexOf(lcSearchTerm, i+1);
        if (i < 0)
        {
            newText += bodyText;
            bodyText = "";
        }
        else
        {
            // skip anything inside an HTML tag
            if (bodyText.lastIndexOf(";", i) >= bodyText.lastIndexOf("&", i))
            {
                if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i))
                {
                    // skip anything inside a <script> block
                    if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i))
                    {
                        newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
                        bodyText = bodyText.substr(i + searchTerm.length);
                        lcBodyText = bodyText.toLowerCase();
                        i = -1;
                    }
                }
            }
        }
    }
    // alert("first "+ newText);
    bodyText = replaceAll('<wbr>','&shy;',newText);
    // alert("secnd"+ bodyText);
    return bodyText;
}


function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)
{
    
    
    if (treatAsPhrase)
    {
        searchArray = [searchText];
    }
    else
    {
        searchArray = searchText.split(" ");
    }
    
    if (!document.body || typeof(document.body.innerHTML) == "undefined") {
        if (warnOnFailure) {
            // alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
        }
        return false;
    }
    

    var bodyText = document.body.innerHTML.replace(/\u00AD/g, '');


    for (var i = 0; i < searchArray.length; i++)
    {
        bodyText = doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
    }
    
    document.body.innerHTML = bodyText;
    return true;
}

function searchPrompt(defaultText, treatAsPhrase, textColor, bgColor)
{
    // This function prompts the user for any words that should
    // be highlighted on this web page
    if (!defaultText) {
        defaultText = "";
    }
    
    // we can optionally use our own highlight tag values
    if ((!textColor) || (!bgColor)) {
        highlightStartTag = "";
        highlightEndTag = "";
    } else {
        highlightStartTag = "<font style='color:" + textColor + "; background-color:" + bgColor + ";'>";
        highlightEndTag = "</font>";
    }
    
    if (treatAsPhrase) {
        promptText = "Please enter the phrase you'd like to search for:";
    } else {
        promptText = "Please enter the words you'd like to search for, separated by spaces:";
    }
    
    searchText = prompt(promptText, defaultText);
    
    if (!searchText)  {
        // alert("No search terms were entered. Exiting function.");
        return false;
    }
    
    return highlightSearchTerms(searchText, treatAsPhrase, true, highlightStartTag, highlightEndTag);
}
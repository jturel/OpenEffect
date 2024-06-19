var MENU_SEPARATOR = "";
BUILD_CONTROL = 1
BUILD_TRIEDITDLL = 2
BUILD_SAMPLE = 3
BUILD_HEADER = 4
BUILD_SETUP = 5
BUILD_LAST_COMMAND = 5

var QueryStatusToolbarButtons = new Array();
var ContextMenu = new Array();
var GeneralContextMenu = new Array();
var docInit = false;
function DECMD_SHOWDETAILS_onclick(){tbContentElement.ShowDetails=!tbContentElement.ShowDetails;}
function encodeHTMLQuotes(strIn){
  var strOut;
  var details = tbContentElement.ShowDetails;
  if(details) tbContentElement.ShowDetails=!tbContentElement.ShowDetails;
  strOut = strIn;

  strOut=strOut.replace(/<P>/g,'<lft>');
  strOut=strOut.replace(/<P align=center>/g,'<cnt>');
  strOut=strOut.replace(/<P align=right>/g,'<rht>');
  strOut=strOut.replace(/<P align=left>/g,'<lft>');
  strOut=strOut.replace(/<P align=justify>/g,'<jst>');
  strOut=strOut.replace(/\n/g,'')
  var tmp='';
  while (strOut != tmp){
    tmp = strOut;
    strOut = formatOutput(tmp);
  }
  strOut=strOut.replace(/<rht>/g,'<div align=right>');
  strOut=strOut.replace(/<cnt>/g,'<div align=center>');
  strOut=strOut.replace(/<lft>/g,'<div align=left>');
  strOut=strOut.replace(/<jst>/g,'<div align=justify>');
  strOut=strOut.replace(/<\/P>/gi,'</div>');
  strOut=strOut.replace(/<STRONG>/g,'<b>');
  strOut=strOut.replace(/<\/STRONG>/gi,'</b>');
  strOut=strOut.replace(/<EM>/g,'<i>');
  strOut=strOut.replace(/<\/EM>/gi,'</i>');

  strOut=strOut.replace(/<img/gi,'<img align="right"');
  if(details) tbContentElement.ShowDetails=!tbContentElement.ShowDetails;

  return strOut;
}
function formatOutput(tmp) {
  var out='';
  var arr = tmp.split('<\/P>');
  for (i=0; i < arr.length-1; i++)arr[i]=arr[i].substr(arr[i].indexOf('<'));
  for (i=1; i < arr.length-1; i++){
    if(arr[i-1].substr(0,5) == arr[i].substr(0,5)){
      arr[i-1] = arr[i-1]+'<br>'+arr[i].substr(5);
      arr[i] = '';
      i++;
    }
  }
  for(i=0; i<arr.length; i++) out+=(arr[i]!='' && arr[i].substr(arr[i].length - 4)!='<\/P>')?arr[i] + '<\/P>':(arr[i]!='')?arr[i]:'';
  return out;
}

function ContextMenuItem(string, cmdId) {
  this.string = string;
  this.cmdId = cmdId;
}

function QueryStatusItem(command, element) {
  this.command = command;
  this.element = element;
}
var iFrameName = '';
var document_loaded = false;
function window_onload() {
  ObjTableInfo.TableAttrs='border=0 cellPadding=0 cellSpacing=0 width=75%'

  QueryStatusToolbarButtons[0] = new QueryStatusItem(DECMD_BOLD, document.body.all["DECMD_BOLD"]);
  QueryStatusToolbarButtons[1] = new QueryStatusItem(DECMD_COPY, document.body.all["DECMD_COPY"]);
  QueryStatusToolbarButtons[2] = new QueryStatusItem(DECMD_CUT, document.body.all["DECMD_CUT"]);
  QueryStatusToolbarButtons[3] = new QueryStatusItem(DECMD_HYPERLINK, document.body.all["DECMD_HYPERLINK"]);
  QueryStatusToolbarButtons[4] = new QueryStatusItem(DECMD_INDENT, document.body.all["DECMD_INDENT"]);
  QueryStatusToolbarButtons[5] = new QueryStatusItem(DECMD_ITALIC, document.body.all["DECMD_ITALIC"]);
  QueryStatusToolbarButtons[6] = new QueryStatusItem(DECMD_JUSTIFYLEFT, document.body.all["DECMD_JUSTIFYLEFT"]);
  QueryStatusToolbarButtons[7] = new QueryStatusItem(DECMD_JUSTIFYCENTER, document.body.all["DECMD_JUSTIFYCENTER"]);
  QueryStatusToolbarButtons[8] = new QueryStatusItem(DECMD_JUSTIFYRIGHT, document.body.all["DECMD_JUSTIFYRIGHT"]);
  QueryStatusToolbarButtons[9] = new QueryStatusItem(DECMD_ORDERLIST, document.body.all["DECMD_ORDERLIST"]);
  QueryStatusToolbarButtons[10] = new QueryStatusItem(DECMD_OUTDENT, document.body.all["DECMD_OUTDENT"]);
  QueryStatusToolbarButtons[11] = new QueryStatusItem(DECMD_PASTE, document.body.all["DECMD_PASTE"]);
  QueryStatusToolbarButtons[12] = new QueryStatusItem(DECMD_UNDERLINE, document.body.all["DECMD_UNDERLINE"]);
  QueryStatusToolbarButtons[13] = new QueryStatusItem(DECMD_UNORDERLIST, document.body.all["DECMD_UNORDERLIST"]);
  QueryStatusToolbarButtons[14] = new QueryStatusItem(DECMD_HYPERLINK, document.body.all["DECMD_HYPERLINK"]);
  QueryStatusToolbarButtons[15] = new QueryStatusItem(DECMD_SHOWDETAILS, document.body.all["DECMD_SHOWDETAILS"]);
  QueryStatusToolbarButtons[16] = new QueryStatusItem(DECMD_HYPERLINK, document.body.all["DECMD_HYPERLINK1"]);

  GeneralContextMenu[0] = new ContextMenuItem("Cut", DECMD_CUT);
  GeneralContextMenu[1] = new ContextMenuItem("Copy", DECMD_COPY);
  GeneralContextMenu[2] = new ContextMenuItem("Paste", DECMD_PASTE);

//alert(parent.document.all.tags('DIV'))
  while(iFrameName==''){
    for(var i = 0; i < parent.document.frames.length; i++){
      if(parent.document.frames[i].document===document) {
        iFrameName = parent.document.frames[i].name.substr(5);
        break;
      }
    }
  }
  inpVal = eval('parent.document.all.'+iFrameName+'_hidden.value')
//  loadDoc(inpVal);
//setTimeout("loadDoc(inpVal);",100);
  loadDoc(inpVal);
//setTimeout("setMode(true);",100);
/**
    inpVal=inpVal.replace(/&lt;/g,'<');
    inpVal=inpVal.replace(/&gt;/g,'>');
    inpVal=inpVal.replace(/&quot;/g,'"');
    inpVal=inpVal.replace(/&amp;/g,'&');

tbContentElement.DOM.body.innerHTML=inpVal;
*/
  document_loaded = true;
}

function loadDoc(inpVal){
/**
      tbContentElement.DOM.open();
      tbContentElement.DOM.write(sHeader);
      tbContentElement.DOM.close();
*/
    setMode(true);
    inpVal=inpVal.replace(/&lt;/g,'<');
    inpVal=inpVal.replace(/&gt;/g,'>');
    inpVal=inpVal.replace(/&quot;/g,'"');
    inpVal=inpVal.replace(/&amp;/g,'&');

tbContentElement.DOM.body.innerHTML=inpVal;
}

function tbContentElement_ShowContextMenu() {
  var menuStrings = new Array();
  var menuStates = new Array();
  for (i=0; i<GeneralContextMenu.length; i++) ContextMenu[i] = GeneralContextMenu[i];
  var state;
  for (i=0; i<ContextMenu.length; i++) {
    menuStrings[i] = ContextMenu[i].string;
    if (menuStrings[i] != MENU_SEPARATOR) {
      if (ContextMenu[i].cmdId > BUILD_LAST_COMMAND) state = tbContentElement.QueryStatus(ContextMenu[i].cmdId);
      else state = DECMDF_ENABLED;
    } else state = DECMDF_ENABLED;
    if (state == DECMDF_DISABLED || state == DECMDF_NOTSUPPORTED) menuStates[i] = OLE_TRISTATE_GRAY;
    else if (state == DECMDF_ENABLED || state == DECMDF_NINCHED) menuStates[i] = OLE_TRISTATE_UNCHECKED;
    else menuStates[i] = OLE_TRISTATE_CHECKED;
  }
  tbContentElement.SetContextMenu(menuStrings, menuStates);
}

function tbContentElement_ContextMenuAction(itemIndex) {
  tbContentElement.ExecCommand(ContextMenu[itemIndex].cmdId, OLECMDEXECOPT_DODEFAULT);
}

var tbEnabled = true;
var tbTabStates = new Array();
function EnableDisable(){
  if(tbEnabled){
    for(var i = 0; i < QueryStatusToolbarButtons.length; i++){
      tbTabStates[i] = (i==14)?"unchecked":QueryStatusToolbarButtons[i].element.TBSTATE;
      QueryStatusToolbarButtons[i].element.TBSTATE = "gray";
      QueryStatusToolbarButtons[i].element.style.filter = TB_DISABLED_OPACITY_FILTER;
    }
  } else {
    for(var i = 0; i < QueryStatusToolbarButtons.length; i++){
      QueryStatusToolbarButtons[i].element.TBSTATE = tbTabStates[i];
      QueryStatusToolbarButtons[i].element.style.filter = "none";
    }
  }
  tbEnabled = !tbEnabled;
}

function tbContentElement_DisplayChanged() {
  if(document_loaded){
  var s;
  for (var i = 0; i < QueryStatusToolbarButtons.length; i++) {
   if(QueryStatusToolbarButtons[i].command != DECMD_SHOWDETAILS){
     s = tbContentElement.QueryStatus(QueryStatusToolbarButtons[i].command);
     if (s == DECMDF_DISABLED || s == DECMDF_NOTSUPPORTED) TBSetState(QueryStatusToolbarButtons[i].element, "gray");
       else if (s == DECMDF_ENABLED  || s == DECMDF_NINCHED) TBSetState(QueryStatusToolbarButtons[i].element, "unchecked"); 
       else TBSetState(QueryStatusToolbarButtons[i].element, "checked");
     }
  }
  if ("complete" == document.readyState && false == docInit) docInit = true;
  else saveIt();
  }
}
function saveIt(){
  eval('parent.document.all.'+iFrameName+'_hidden.value = encodeQuotes();')
}
function encodeQuotes(){
//  strOut='';
  if(!bMode){
    var fonts=tbContentElement.DOM.body.all.tags("FONT")
    for (var i=0;i<fonts.length;i++) if (fonts[i].style.backgroundColor!="") fonts[i].outerHTML=fonts[i].innerHTML;
    strOut = tbContentElement.DOM.body.innerHTML;
/**
    strOut=strOut.replace(/<br><br>/gi,'<2br>');
    strOut=strOut.replace(/<br>/gi,'');
    strOut=strOut.replace(/<2br>/g,'<br>');
*/
    strOut=strOut.replace(/&lt;/g,'<');
    strOut=strOut.replace(/&gt;/g,'>');
    strOut=strOut.replace(/&amp;/g,'&');
  } else strOut = tbContentElement.DOM.body.innerHTML;
//alert(bMode)
    strOut=strOut.replace(/"/g,'&quot;');
//alert(strOut)
  return strOut;
}
function SMTH_onclick(what,command) {
  var s = eval('tbContentElement.QueryStatus('+what+')');
  if (s != DECMDF_DISABLED && s != DECMDF_NOTSUPPORTED) eval('tbContentElement.ExecCommand('+what+','+command+')');
//  tbContentElement.focus();
}

function getEl(sTag,start) {
  while ((start!=null) && (start.tagName!=sTag)) start = start.parentElement;
  return start;
}

function insLink(){
  var s = tbContentElement.QueryStatus(DECMD_HYPERLINK);
  if (s != DECMDF_DISABLED && s != DECMDF_NOTSUPPORTED){
    var isA = getEl("A",tbContentElement.DOM.selection.createRange().parentElement())
    var str=window.showModalDialog("files/link.htm",isA ? isA.href : "http:\/\/","dialogHeight: 30px; dialogWidth: 350px; edge: Raised; center: Yes; help: No; resizable: No; status: No; dialogHide: Yes; unadorned: Yes; scroll: No;");
    if ((str!=null) && (str!="http://")) {
      if ((tbContentElement.DOM.selection.type=="None") && (!isA)) {
        var sel=tbContentElement.DOM.selection.createRange();
        sel.pasteHTML("<A HREF=\""+str+"\">"+str+"</A> ");
        sel.select();
      }else tbContentElement.ExecCommand(DECMD_HYPERLINK, OLECMDEXECOPT_DONTPROMPTUSER, str);
    } //else tbContentElement.focus();
  }
  return true;
}

function insLink1(){
  var s = tbContentElement.QueryStatus(DECMD_HYPERLINK);
//alert(s)
//alert(s != DECMDF_DISABLED)
//alert(s != DECMDF_NOTSUPPORTED)
//  if (s != DECMDF_DISABLED) // &&
if ( s != DECMDF_NOTSUPPORTED){
    var isA = getEl("A",tbContentElement.DOM.selection.createRange().parentElement())
    var str=window.showModalDialog("../../parse.php?34",top.leftFrame.copyIt(),"dialogHeight: 280px; dialogWidth: 250px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No; dialogHide: Yes; unadorned: Yes; scroll: Auto;");
    if(typeof(str)!="undefined"){
      str = str.split("@#$%^&^%$#@");
      if ((str!=null) && str.length==2) {
        if ((tbContentElement.DOM.selection.type=="None") && (!isA)) {
          var sel=tbContentElement.DOM.selection.createRange();
          sel.pasteHTML("<A HREF=\""+str[0]+"\">"+str[1]+"</A> ");
          sel.select();
        }else tbContentElement.ExecCommand(DECMD_HYPERLINK, OLECMDEXECOPT_DONTPROMPTUSER, str[0]);
      }// else tbContentElement.focus();
    }
  }
  return true;
}

var sHeader="<BODY STYLE=\"font:10pt tahoma,arial,sans-serif;margin:0px; BACKGROUND-COLOR: #D2E0FF;\">";
var bMode=false;

function setMode(bNewMode) {
  if (bNewMode!=bMode) {
    if (bNewMode) {
//alert('tbContentElement.DOM: '+tbContentElement.DOM+'\n typeof(tbContentElement.DOM): '+typeof(tbContentElement.DOM))
      var sContents=tbContentElement.DOM.body.innerText;
      tbContentElement.DOM.open();
      tbContentElement.DOM.write(sHeader);
      tbContentElement.DOM.close();
      tbContentElement.DOM.body.innerHTML=sContents;
    } else {
      var fonts=tbContentElement.DOM.body.all.tags("FONT")
      for (var i=0;i<fonts.length;i++) if (fonts[i].style.backgroundColor!="") fonts[i].outerHTML=fonts[i].innerHTML;
      var sContents=tbContentElement.DOM.body.innerHTML;
      tbContentElement.DOM.open();
      tbContentElement.DOM.write("<BODY style=\"font:10pt fixedsys, monospace; margin: 5px;\">");
      tbContentElement.DOM.close();
      tbContentElement.DOM.body.innerText=sContents;
    }
    bMode=bNewMode;
  }
//  tbContentElement.focus()
}
var whichMode = 1;
function switchMode(){
  if (whichMode == 0){
    if (event.srcElement.tagName == "IMG") {
      event.srcElement.src="images/HTML.gif";
      event.srcElement.parentElement.title = "HTML";
    }
    setMode(true);
    whichMode = 1;
  } else {
    if (event.srcElement.tagName == "IMG") {
      event.srcElement.src="images/TEXT.gif";
      event.srcElement.parentElement.title = "TEXT";
    }
    setMode(false);
    whichMode = 0;
  }
  EnableDisable();
}
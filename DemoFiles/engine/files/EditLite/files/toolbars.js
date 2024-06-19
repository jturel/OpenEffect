var tbEventSrcElement;

TB_STS_OK = "OK";
TB_E_INVALID_CLASS = "Invalid class value";
TB_E_INVALID_TYPE = "Invalid TBTYPE value";
TB_E_INVALID_STATE = "Invalid TBSTATE value";
TB_E_NO_ID = "Element does not have an ID";

TB_DISABLED_OPACITY_FILTER = "alpha(opacity=25)";
TB_HANDLE_WIDTH = 10;
TB_HANDLE = '<DIV class=tbHandleDiv style="LEFT: 3"> </DIV><DIV class=tbHandleDiv style="LEFT: 6"> </DIV>';

TB_TOOLBAR_PADDING = 4;
TB_SEPARATOR_PADDING = 5;
TB_CLIENT_AREA_GAP = 0;

var TBInitialized = false;
var tbToolbars = new Array();
var tbContentElementObject = null;
var tbContentElementTop = 0;
var tbContentElementBottom = 0;
var tbLastHeight = 0;
var tbLastWidth = 0;
var tbRaisedElement = null;
var tbOnClickInProcess;
var tbMouseOutWhileInOnClick;

var tbEnabled = true;
var tbTabStates = new Array();
function EnableDisable(){
  if(tbEnabled){
    for(var i = 0; i < tbToolbars[0].children.length; i++){
      if(tbToolbars[0].children[i].id!='DECMD_HTML'){
        tbTabStates[i] = tbToolbars[0].children[i].TBSTATE;
        tbToolbars[0].children[i].TBSTATE = "gray";
        tbToolbars[0].children[i].style.filter = TB_DISABLED_OPACITY_FILTER;
      }
    }
  } else {
    for(var i = 0; i < tbToolbars[0].children.length; i++){
      if(tbToolbars[0].children[i].id!='DECMD_HTML'){
        tbToolbars[0].children[i].TBSTATE = tbTabStates[i];
        tbToolbars[0].children[i].style.filter = "none";
      }
    }
  }
  tbEnabled = !tbEnabled;
}

function TBContentElementMouseOver() {
  if (tbRaisedElement) {
    switch (tbRaisedElement.className) {
    case "tbButtonMouseOverUp" :
      tbRaisedElement.className = "tbButton";
      break;
    case "tbButtonMouseOverDown" :
      tbRaisedElement.className = "tbButtonDown";
      break;
    }
    tbRaisedElement = null;
  }
}

function TBCancelEvent() {
  event.returnValue=false;
  event.cancelBubble=true;
}

function TBButtonMouseOver() {
  var element, image;

  image = event.srcElement;
  element = image.parentElement;
  if (element.TBSTATE == "gray") {
    event.cancelBubble=true;
    return;
  }
  if (image.className == "tbIcon") {
    element.className = "tbButtonMouseOverUp";
    tbRaisedElement = element;
  } else if (image.className == "tbIconDown") element.className = "tbButtonMouseOverDown";
  event.cancelBubble=true;
}

function TBButtonMouseOut() {
  var element, image;

  image = event.srcElement;
  element = image.parentElement;
  if (element.TBSTATE == "gray") {
    event.cancelBubble=true;
    return;
  }
  tbRaisedElement = null;
  if (tbOnClickInProcess) {
    tbMouseOutWhileInOnClick = true;
    return;
  }
  switch (image.className) {
    case "tbIcon" :
      if (((element.TBTYPE == "toggle") || (element.TBTYPE == "radio")) && (element.TBSTATE == "checked")) {
        element.className = "tbButtonDown";
        image.className = "tbIconDown";
      } else element.className = "tbButton";
      break;
    case "tbIconDown" :
      if (((element.TBTYPE == "toggle") || (element.TBTYPE == "radio")) && (element.TBSTATE == "unchecked")) {
        element.className = "tbButton";
        image.className = "tbIcon";
      } else element.className = "tbButtonDown";
    break;
    case "tbIconDownPressed" :
      element.className = "tbButtonDown";
      image.className = "tbIconDown";
    break;  
  }
  event.cancelBubble=true;
}

function TBButtonMouseDown() {
  var element, image;
  
  if (event.srcElement.tagName == "IMG") {
    image = event.srcElement;
    element = image.parentElement;
  } else {
    element = event.srcElement;
    image = element.children.tags("IMG")[0];
  }
  if (element.TBSTATE == "gray") {
    event.cancelBubble=true;
    return;
  }
  switch (image.className) {
    case "tbIcon" :
      element.className = "tbButtonMouseOverDown";
      image.className = "tbIconDown";
    break;
    case "tbIconDown" :
      if ((element.TBTYPE == "toggle") || (element.TBTYPE == "radio")) image.className = "tbIconDownPressed";
      else {
        element.className = "tbButton";
        image.className = "tbIcon";
      }
    break;
  }   
  event.cancelBubble=true;
  return false;
}

function TBButtonMouseUp() {
  var element, image, userOnClick, radioButtons, i;
 
  if (event.srcElement.tagName == "IMG") {
    image = event.srcElement;
    element = image.parentElement;
  } else {
    element = event.srcElement;
    image = element.children.tags("IMG")[0];
  }
  if (element.TBSTATE == "gray") {
    event.cancelBubble=true;
    return;
  }
  if ((image.className != "tbIcon") && (image.className != "tbIconDown") && (image.className != "tbIconDownPressed")) return;
  tbEventSrcElement = element;
  tbOnClickInProcess = true;
  tbMouseOutWhileInOnClick = false;
  if (element.TBUSERONCLICK) eval(element.TBUSERONCLICK + "anonymous()");
  tbOnClickInProcess = false;
  if (element.parentElement.TBTYPE == "nomouseover") tbMouseOutWhileInOnClick = true;
  switch (element.TBTYPE) {
    case "toggle" :
      if (element.TBSTATE == "checked") {
        element.TBSTATE = "unchecked";
        if (tbMouseOutWhileInOnClick) element.className = "tbButton";
        else element.className = "tbButtonMouseOverUp";
        image.className = "tbIcon";
      } else {
        element.TBSTATE = "checked";
        if (tbMouseOutWhileInOnClick) element.className = "tbButtonDown";
        else element.className = "tbButtonMouseOverDown";
        image.className = "tbIconDown";
      }
    break;
    case "radio" :
      if (element.TBSTATE == "checked"){
        image.className = "tbIconDown";
        break;
      }
      element.TBSTATE = "checked";
      if (tbMouseOutWhileInOnClick) element.className = "tbButtonDown";
      else element.className = "tbButtonMouseOverDown";
      image.className = "tbIconDown";
      radioButtons = element.parentElement.children;
      for (i=0; i<radioButtons.length; i++) {
        if ((radioButtons[i].NAME == element.NAME) && (radioButtons[i] != element)) {
          radioButtons[i].TBSTATE = "unchecked";
          radioButtons[i].className = "tbButton";
          radioButtons[i].children.tags("IMG")[0].className = "tbIcon";
        }
      }
    break;
    default :
      if (tbMouseOutWhileInOnClick) element.className = "tbButton";
      else element.className = "tbButtonMouseOverUp";
      image.className = "tbIcon";
  }
  event.cancelBubble=true;
  return false;
}

function TBInitButton(element, mouseOver) {
  var image;
 
  if (element.TBTYPE) {
    element.TBTYPE = element.TBTYPE.toLowerCase();
    if ((element.TBTYPE != "toggle") && (element.TBTYPE != "radio")) return TB_E_INVALID_TYPE;
  }
  if (element.TBSTATE) {
    element.TBSTATE = element.TBSTATE.toLowerCase();
    if ((element.TBSTATE != "gray") && (element.TBSTATE != "checked") && (element.TBSTATE != "unchecked")) return TB_E_INVALID_STATE;
  }
  image = element.children.tags("IMG")[0]; 
  if (mouseOver) {
    element.onmouseover = TBButtonMouseOver;
    element.onmouseout = TBButtonMouseOut;
  }
  element.onmousedown = TBButtonMouseDown; 
  element.onmouseup = TBButtonMouseUp; 
  element.ondragstart = TBCancelEvent;
  element.onselectstart = TBCancelEvent;
  element.onselect = TBCancelEvent;
  element.TBUSERONCLICK = element.onclick;
  element.onclick = TBCancelEvent;
  if (element.TBSTATE == "gray") {
    element.style.filter = TB_DISABLED_OPACITY_FILTER;
    return TB_STS_OK;
  }
  if (element.TBTYPE == "toggle" || element.TBTYPE == "radio") {
    if (element.TBSTATE == "checked") {
      element.className = "tbButtonDown";
      image.className = "tbIconDown";
    } else element.TBSTATE = "unchecked";
  }
  element.TBINITIALIZED = true;
  return TB_STS_OK;
}

function TBPopulateToolbar(tb) {
  var i, elements, s;

  elements = tb.children;
  for (i=0; i<elements.length; i++) {
    if (elements[i].tagName == "SCRIPT" || elements[i].tagName == "!") continue;
    switch (elements[i].className) {
      case "tbButton" :			
        if (elements[i].TBINITIALIZED == null) {
          if ((s = TBInitButton(elements[i], tb.TBTYPE != "nomouseover")) != TB_STS_OK) {
            alert("Problem initializing:" + elements[i].id + " Status:" + s);
            return s;
          }
        }
        elements[i].style.posLeft = tb.TBTOOLBARWIDTH;
        elements[i].style.width = elements[i].children[0].width;
        tb.TBTOOLBARWIDTH += elements[i].offsetWidth + 1; 
      break;
      case "tbGeneral" :
        elements[i].style.posLeft = tb.TBTOOLBARWIDTH;
        tb.TBTOOLBARWIDTH += elements[i].offsetWidth + 1; 
      break;
      case "tbSeparator" :
        elements[i].style.posLeft = tb.TBTOOLBARWIDTH + 2;
        tb.TBTOOLBARWIDTH += TB_SEPARATOR_PADDING;
      break;
      case "tbHandleDiv":
      break;
      default :
        alert("Invalid class: " + elements[i].className + " on Element: " + elements[i].id + " <" + elements[i].tagName + ">");
        return TB_E_INVALID_CLASS;
    }
  }
  return TB_STS_OK;
}

function TBInitToolbar(tb) {
  var s1, tr; 

  if (tb.TBSTATE) {
    tb.TBSTATE = tb.TBSTATE.toLowerCase();
    if ((tb.TBSTATE != "dockedtop") && (tb.TBSTATE != "dockedbottom") && (tb.TBSTATE != "hidden")) return TB_E_INVALID_STATE;
  } else tb.TBSTATE = "dockedtop";
  if (tb.TBSTATE == "hidden") tb.style.visibility = "hidden";
  if (tb.TBTYPE) {
    tb.TBTYPE = tb.TBTYPE.toLowerCase();
    if (tb.TBTYPE != "nomouseover") return TB_E_INVALID_TYPE;
  }
  tb.TBTOOLBARWIDTH = TB_HANDLE_WIDTH;
  if ((s = TBPopulateToolbar(tb)) != TB_STS_OK) return s;
  tb.style.posWidth = tb.TBTOOLBARWIDTH + TB_TOOLBAR_PADDING;
  tb.insertAdjacentHTML("AfterBegin", TB_HANDLE);
  return TB_STS_OK;
}

function TBLayoutToolbars() {
  var x,y,i;
  
  x = 0; 
  y = 0;
  if (tbToolbars.length == 0) return;
  for (i=0; i<tbToolbars.length; i++) {
    if (tbToolbars[i].TBSTATE == "dockedtop") {
      if ((x > 0) && (x + parseInt(tbToolbars[i].TBTOOLBARWIDTH) > document.body.offsetWidth)) {
        x=0; 
        y += tbToolbars[i].offsetHeight;
      }
      tbToolbars[i].style.left = x;
      x += parseInt(tbToolbars[i].TBTOOLBARWIDTH) + TB_TOOLBAR_PADDING;
      tbToolbars[i].style.posTop = y;
    }
  } 
  if ((x != 0) || (y !=0)) tbContentElementTop = y + tbToolbars[0].offsetHeight + TB_CLIENT_AREA_GAP;
  x = 0; 
  y = document.body.clientHeight - tbToolbars[0].offsetHeight;
  for (i=tbToolbars.length - 1; i>=0; i--) {
    if (tbToolbars[i].TBSTATE == "dockedbottom") {
      if ((x > 0) && (x + parseInt(tbToolbars[i].TBTOOLBARWIDTH) > document.body.offsetWidth)) {
        x=0; 
        y -= tbToolbars[i].offsetHeight;
      }
      tbToolbars[i].style.left = x;
      x += parseInt(tbToolbars[i].TBTOOLBARWIDTH) + TB_TOOLBAR_PADDING;
      tbToolbars[i].style.posTop = y;
    }
  }
  if ((x != 0) || (y != (document.body.offsetHeight - tbToolbars[0].offsetHeight))) tbContentElementBottom = document.body.offsetHeight - y + TB_CLIENT_AREA_GAP;
  tbLastHeight = 0;
  tbLastWidth = 0;
}

function TBLayoutBodyElement() {
  tbContentElementObject.style.posTop = tbContentElementTop;
  tbContentElementObject.style.left = 0; 
  tbContentElementObject.style.posHeight = document.body.offsetHeight - tbContentElementBottom - tbContentElementTop;
  tbContentElementObject.style.height = document.body.offsetHeight - tbContentElementBottom - tbContentElementTop;
  tbContentElementObject.style.width = document.body.offsetWidth;
  if (tbLastHeight != 0) {
    for (i=tbToolbars.length - 1; i>=0; i--) {
      if (tbToolbars[i].TBSTATE == "dockedbottom" && tbToolbars[i].style.visibility != "hidden") tbToolbars[i].style.posTop += document.body.offsetHeight - tbLastHeight;
    }
  }
  tbLastHeight = document.body.offsetHeight;
  tbLastWidth = document.body.offsetWidth;
}

function document.onreadystatechange() {
  var i, s;
  
  if (TBInitialized) return;
  TBInitialized = true;
  document.body.scroll = "no";
  if (typeof(tbMenu) != "undefined") document.body.insertAdjacentHTML("BeforeEnd", "<span ID=TBMenuMeasureSpan></span>");
  for (i=0; i<document.body.all.length; i++) {
    if (document.body.all[i].className == "tbToolbar") {
      if ((s = TBInitToolbar(document.body.all[i])) != TB_STS_OK) alert("Toolbar: " + document.body.all[i].id + " failed to initialize. Status: " + s);
      tbToolbars[tbToolbars.length] = document.body.all[i];
    }
  }
  if (typeof(tbMenu) != "undefined") document.all["TBMenuMeasureSpan"].outerHTML = "";
  TBLayoutToolbars();
  TBLayoutBodyElement();
  window.onresize = TBLayoutBodyElement;
}

{
  tbContentElementObject = document.body.all["tbContentElement"];
  if (typeof(tbContentElementObject) == "undefined") alert("Error: There must be one element on the page with an ID of tbContentElement");
  if (tbContentElementObject.className != "tbContentElement") alert('Error: tbContentElement must have its class set to "tbContentElement"');
  document.write('<SCRIPT LANGUAGE="JavaScript" FOR="tbContentElement" EVENT="onmouseover"> TBContentElementMouseOver(); </script>');
}
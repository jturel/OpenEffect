var name, loaded, refresh, data, sync, name0, openedNodes;
var treeImages = new Array();
treeImages["doc"]     = new Image(); treeImages["doc"].src     = imgPath + "img/gn_document.gif";
treeImages["denied"]  = new Image(); treeImages["denied"].src  = imgPath + "img/tr_denied.gif";
treeImages["sopen"]   = new Image(); treeImages["sopen"].src   = imgPath + "img/tr_sopen.gif";
treeImages["salone"]  = new Image(); treeImages["salone"].src  = imgPath + "img/tr_salone.gif";
treeImages["open"]    = new Image(); treeImages["open"].src    = imgPath + "img/tr_open.gif";
treeImages["alone"]   = new Image(); treeImages["alone"].src   = imgPath + "img/tr_alone.gif";
treeImages["close"]   = new Image(); treeImages["close"].src   = imgPath + "img/tr_close.gif";
treeImages["sclose"]  = new Image(); treeImages["sclose"].src  = imgPath + "img/tr_sclose.gif";

function openIt(n){
  if(loaded){
    last = n;
    childState = checkNodeState(n);
    if(childState == "unloaded"){
      loaded = false;
      frameEl = getElById('myiframe');
      frameEl.src =  'files/tree/html.html?'+((name[n]==divPrefix)?'0':name[n].substr(divPrefix.length));
    } else OpenClose(n, childState);
  }
}

function OpenClose(n, state){
  if(n!=0){
    imgEl = getElById(imgPrefix + name[n].substr(divPrefix.length));
    imgEl.src = eval('treeImages["'+changePic(imgEl.src)+'"].src');
  }
  var el = getElById(name[n]);
  if(n==0 || (showDoc && el.hasDocs=="Yes") || el.hasGroups=="Yes"){
    var tmpel = getChildrenByTag(el, "DIV");
    for( var i = 0; i < tmpel.length; i++) {
      if(state == "opened") tmpel[i].showStat = "notshow";
      else tmpel[i].showStat = "show";
    }
    if(!refresh) showall();
  }
}

function showall(){
  sync.style.display = 'none';
  var tmpel;
  for(var i = 0; i < name.length; i++){
    tmpel = getElById(name[i]);
    var dsp = "none";
    if(tmpel.showStat=="show"){
      dsp = (tmpel.typez=="doc" && showDoc)?"block":(tmpel.typez=="group" && showGroups)?"block":(tmpel.typez=="group" && tmpel.hasGroups=="Yes")?"block":(tmpel.typez=="group" && showDoc && tmpel.hasDocs=="Yes")?"block":dsp;
    }
    tmpel.style.display = dsp;
  }
  name0.style.display='block';
  if(Active!="" && document.getElementById(tabPrefix+Active)) document.getElementById(tabPrefix+Active).className = 'mainSelected1';
}
function hideall(synctext){
  sync.innerHTML = synctext;
  sync.style.display = 'block';  
  for(var i = 1; i < name.length; i++){
    tmpel = getElById(name[i]);
    tmpel.style.display = "none";
  }
}

function changePic(x){
  var ret = imgPath+"img/";
  x = x.substr(x.indexOf(ret)+ret.length);
  switch (x){
    case "tr_sopen.gif":   ret = "sclose";   break;
    case "tr_sclose.gif":  ret = "sopen";    break;
    case "tr_open.gif":    ret = "close";    break;
    case "tr_close.gif":   ret = "open";     break;
    case "tr_alone.gif":   ret = "alone";    break;
    case "tr_salone.gif":  ret = "salone";   break;
    default:               ret += x;         break;
  }
  return ret;
}

function parseXML(doc){
   data = new Array();
   data[0] = 0;
   getchildren(doc);
   addSubNode();
}
function getchildren (node) {
  var x = node.childNodes;
  var z = x.length;
  for(var i = 0; i < z; i++){
    if (x(i).nodeName=='node'){
      data[0] += 1
      data[data.length] = x(i).childNodes(0).firstChild.nodeValue;
      data[data.length] = x(i).childNodes(1).firstChild.nodeValue;
      data[data.length] = x(i).childNodes(2).firstChild.nodeValue;
      data[data.length] = x(i).childNodes(3).firstChild.nodeValue;
      data[data.length] = x(i).childNodes(4).firstChild.nodeValue;
    } else getchildren (x(i));
  }
}
var tryNo=0;
function addSubNode(){
var retry = false;
  if(tryNo==0){
    if(data[0]==0) retry = true;
    else if(data[0] < name.length) {
      for (var i = 0; i < data[0]; i++) {
        for(var j = name.length - data[0]; j < name.length; j++) {
          if(name[j] == data[i*5 + 1]) {
            retry = true;
            i = data[0];
            break;
          }
        }
      }
    }
  }
  if(!retry){
    if(data[0]!=0){
      addStr(last);
      for (var i = 0; i < data[0]; i++) name[name.length] = data[i*5 + 1];
    }
    loaded = true;
    if(refresh) synchronyzation();
    else showall();
    tryNo=0;
  } else {
    tryNo=1;
    loaded = true;
    openIt(last);
  }
}
function addStr(n){
  var el   = getElById(name[n]);
  var tmp = (el.innerHTML.indexOf('&nbsp;<!--TREENODES-->')!=-1)?'&nbsp;<!--TREENODES-->':'<!--TREENODES-->';

  var str = "";
  var tmpImgs = new Array();
  for( i = 0; i < data[0]; i++) {
    TMPdAT    = choosePic(data[i*5 + 3]);

    divID     = data[i*5 + 1];
    divType   = TMPdAT[2];
    ckbx      = (!showCkbx || (!showCkbxDoc && divType=="doc"))?'':ckbxSTR;
    idEl      = (divType=="doc")?data[i*5 + 1]:data[i*5 + 1].substr(divPrefix.length);
    tabID     = tabPrefix + idEl;
    shiftX    = countDepth(n)*shift;
    imgID     = imgPrefix + idEl;
    imgSrc    = TMPdAT[0];
    imgAlt    = TMPdAT[1];
    hrefID    = ((divType=="doc")?((addSupGroup)?hrefPrefixDoc+name[n].substr(divPrefix.length)+"&":""):hrefPrefixGroup) + idEl;
    linkTitle = data[i*5+2];
    ckbxValue = idEl;
    ckbxName  = ckbxValPrefixStart + idEl + ckbxValPrefixEnd;
    CHECKEDID = (data[i*5 + 4]==1)?'CHECKED':'';
    hasDocs   = TMPdAT[3];
    hasGroups = TMPdAT[4];
    frms = data[i*5 + 5];

    tmpImgs[i] = new Array(imgID, imgSrc);
    str += replaceStr(ckbx, divID, divType, tabID, shiftX, imgID, imgSrc, imgAlt, hrefID, linkTitle, ckbxValue, ckbxName, CHECKEDID, hasDocs, hasGroups, frms);
  }
  if(n!=0){
    imgEl = getElById(imgPrefix + name[n].substr(divPrefix.length));
    imgEl.src = eval('treeImages["'+changePic(imgEl.src)+'"].src');
  }
  el.innerHTML=el.innerHTML.replace(tmp,str);
  for(var i = 0; i < tmpImgs.length; i++) eval('document.all.'+tmpImgs[i][0]+'.src=treeImages["'+tmpImgs[i][1]+'"].src');
}

function countDepth(n){
  outVal = -1;
  var el = getElById(name[n]);
  while(el.tagName != "BODY") {
    if(el.tagName == "DIV")outVal++;
    el = el.parentElement;
  }
  return outVal;
}

function replaceStr(){
  var strOut = insStr;
  for(var i = 0; i < arguments.length; i++) {
    reg = new RegExp( dataToChange[i], "gi");
    strOut = strOut.replace( reg, arguments[i]);
  }
  return strOut;
}
function choosePic(x){
  var ret = new Array("","---","doc", "No", "No");
  x = parseInt(x); 
  if(x%2 == 1) ret[4] = "Yes";
  if(x < 128 && x > 63){
    ret[3] = "Yes";
    x -=64;
  } 
  if(x < 64 && x > 31){
    ret[0] += "doc"; x -= 32;
    if(x > 15){
      ret[1]='P'; x -= 16;
    } else ret[1]='-';
  } else {
    ret[2] = "group";
    if(x > 15) {
      x -= 16; ret[1]='P';
    } else ret[1]='-';
    if(ret[4]=="Yes" || (ret[3]=="Yes" && showDoc)) ret[0] += (x<12)?"denied":(x<14)?"sopen":"open";
    else  ret[0] += (x<12)?"denied":(x<14)?"salone":"alone";
  }
  ret[1] = ((x>11)?'RW':(x>7)?'-W':(x>3)?'R-':'--') + ret[1];
  return ret;
}

function getElById(itId){
  return document.getElementById(itId);
}

function checkNodeState(n){
  child = getChildrenByTag(getElById(name[n]), "DIV");
  var ret = "unloaded";
  for( var i = 0; i < child.length; i++) { if(child[i].style.display == "block") { ret="opened"; break; } else ret = "closed";}
  return ret;
}

function getChildrenByTag(el, tag){
  ch = new Array();
  for(var i = 0; i < el.children.length; i++) if(el.children[i].tagName == tag) ch[ch.length] = el.children[i];
  return ch;
}

function getParentByTag(el, tag){
  while(el.tagName != tag && el.tagName != "BODY") el = el.parentElement;
  if(el.tagName != tag) el = -1;
  return el;
}

function getNumderInArray(arr, val){
  outVal = -1;
  for(var i = 0; i < arr.length; i++) if(arr[i] == val){ outVal = i; break;}
  return outVal;
}

function changeShowDocProperty(el){
  showDoc = el;
  getSelected();
  var tabs = document.all.tags("TABLE");
  for(var i = 1; i < tabs.length; i++) {
    if(tabs[i].parentElement.typez == "doc" || tabs[i].parentElement.typez == "group"){
      if(tabs[i].parentElement.typez == "group"){
        var im = tabs[i].rows[0].cells[1].children[0];
        var src = im.src;
        while(src.indexOf('/')!=-1) src = src.substr(src.indexOf('/')+1);
        parDiv = tabs[i].parentElement;
        if(parDiv.hasGroups=="Yes" || (parDiv.hasDocs=="Yes" && showDoc)){
          var plus = true;
          for (var k = 0; k < parDiv.children.length; k++) if(parDiv.children[k].tagName=="DIV" && parDiv.children[k].showStat=="show") {plus = false; break;}
          if(plus) src = (src=="tr_alone.gif")?"tr_open.gif":(src=="tr_salone.gif")?"tr_sopen.gif":src;
          else src = (src=="tr_alone.gif")?"tr_close.gif":(src=="tr_salone.gif")?"tr_sclose.gif":src;
        } else src = (src=="tr_open.gif")?"tr_alone.gif":(src=="tr_sopen.gif")?"tr_salone.gif":(src=="tr_close.gif")?"tr_alone.gif":(src=="tr_sclose.gif")?"tr_salone.gif":src;
        im.src = imgPath + "img/" + src;
      }
    }
  }
  showall();
}
/**************************************************************************************************
*
*                                  functions called from outside start
*                                          ! its subfunctions included
**************************************************************************************************/
function reloadIt(){
//alert("reload")
  openedNodes = new Array();
  for(var i = 1; i < name.length; i++) openedNodes[openedNodes.length] = name[i];
  refresh = true;
  hideall("<CENTER><SPAN class=sync>loading...</SPAN>");
  name0.innerHTML = "&nbsp;<!--TREENODES-->";
  initIt();
}
function copyIt(){
  var ret = new Array();
  for(var i = 0; i < name.length; i++) ret[ret.length] = name[i];
  ret[ret.length] = name0.innerHTML;
  return ret;
}
function syncRight(){
  openedNodes = new Array();
  for(var i = 1; i < arguments.length-1; i++){
    openedNodes[openedNodes.length] = arguments[i];
    var obj = getElById(divPrefix+arguments[i]);
    if(typeof(obj)=="object" && obj!=null) {
      if(obj.style.display=="block") break;
    }
  }
  Active = arguments[0];
  hideall("<CENTER><SPAN class=sync>synchronyzing...</SPAN>");
  refresh = true;
  synchronyzation();
}
function synchronyzation(){
  toDoNumber = -1;
  var tmpArray = new Array();
  for(var i = 0; i < openedNodes.length; i++){
    if (toDoNumber == -1){
      for(var j = 0; j < name.length; j++){
        if(openedNodes[i] == name[j].substr(divPrefix.length)) {
          toDoNumber = j;
          break;
        }
      }
    }
    if (toDoNumber == -1) tmpArray[tmpArray.length] = openedNodes[i];
  }
  if (toDoNumber != -1) {
    openedNodes = new Array();
    for(var i = 0; i < tmpArray.length; i++) openedNodes[openedNodes.length] = tmpArray[i];
    openIt(toDoNumber);
  } else {
    refresh = false;
    showall();
  }
}
/**************************************************************************************************
*
*                                  functions called from outside end
*
**************************************************************************************************/
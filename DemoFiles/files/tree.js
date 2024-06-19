var refresh=false;
var name, child, opened, loaded, last, data, depth;
var openedNodes, active='';

function showall(n){
  document.getElementById("sync").style.display='none';
//alert('show: '+name[n] + '\n name: '+name+'\n opend: '+opened)
  if(opened[n]) {
    show(n);
    for(var i=0; i<child[n].length;i++){
      showall(child[n][i]);
    }
  }
}
function hideall(n){
document.getElementById("sync").style.display='block';  
//alert('hide: '+name[n] + '\n name: '+name+'\n opend: '+opened)
  if(opened[n]) {
    hide(n);
    for(var i=0; i<child[n].length;i++){
      hideall(child[n][i]);
    }
  }
}
function storeOpened(n){
  if(opened[n]) {
    openedNodes[openedNodes.length]=name[n];
    for(var i=0; i<child[n].length;i++){
      storeOpened(child[n][i]);
    }
  }
}
function refreshTree(){
  openedNodes = new Array();
  storeOpened(0);
  refresh=true;
  document.getElementById(name[0]).innerHTML='&nbsp;<!--TREENODES-->';
  for(var i=0; i<name.length; i++){
    delete name[i];
    delete child[i];
    delete opened[i];
    delete depth[i];
  }
  foldInit();
}
function foldInit(){
   name = new Array();
   child = new Array();
   opened = new Array();
   depth = new Array();
   loaded = true;

   name[0] = 'node';
   child[0] = new Array();
   opened[0] = true;
   depth[0] = 0;
   addNodes(0);
}
function choosePic(x){
  var ret = new Array('','');
  if(parseInt(x)>15) {
    x = ''+(parseInt(x)-16);
    ret[1]=' P';
  } else ret[1]='-';
  switch (x){
    case "0":
      ret[0] = "img/tr_denied.gif";
      ret[1]='--'+ret[1];
      break;
    case "1":
      ret[0] = "img/tr_denied.gif";
      ret[1]='--'+ret[1];
      break;
    case "2":
      ret[0] = "img/tr_denied.gif";
      ret[1]='--'+ret[1];
      break;
    case "3":
      ret[0] = "img/tr_denied.gif";
      ret[1]='--'+ret[1];
      break;
    case "4":
      ret[0] = "img/tr_denied.gif";
      ret[1]='R-'+ret[1];
      break;
    case "5":
      ret[0] = "img/tr_denied.gif";
      ret[1]='R-'+ret[1];
      break;
    case "6":
      ret[0] = "img/tr_denied.gif";
      ret[1]='R-'+ret[1];
      break;
    case "7":
      ret[0] = "img/tr_denied.gif";
      ret[1]='R-'+ret[1];
      break;
    case "8":
      ret[0] = "img/tr_denied.gif";
      ret[1]='-W'+ret[1];
      break;
    case "9":
      ret[0] = "img/tr_denied.gif";
      ret[1]='-W'+ret[1];
      break;
    case "10":
      ret[0] = "img/tr_denied.gif";
      ret[1]='-W'+ret[1];
      break;
    case "11":
      ret[0] = "img/tr_denied.gif";
      ret[1]='-W'+ret[1];
      break;
    case "12":
      ret[0] = "img/tr_salone.gif";
      ret[1]='RW'+ret[1];
      break;
    case "13":
      ret[0] = "img/tr_sopen.gif";
      ret[1]='RW'+ret[1];
      break;
    case "14":
      ret[0] = "img/tr_alone.gif";
      ret[1]='RW'+ret[1];
      break;
    case "15":
      ret[0] = "img/tr_open.gif";
      ret[1]='RW'+ret[1];
      break;
    default:
      ret = "";
      ret[1]='';
      break;
  }
//alert('x = '+x+'\n ret = '+ret)
  return ret;
}

function changePic(x){
  var ret;
x = x.substr(x.indexOf('img/'));
  switch (x){
    case "img/tr_sopen.gif":
      ret = "img/tr_sclose.gif";
      break;
    case "img/tr_sclose.gif":
      ret = "img/tr_sopen.gif";
      break;
    case "img/tr_open.gif":
      ret = "img/tr_close.gif";
      break;
    case "img/tr_close.gif":
      ret = "img/tr_open.gif";
      break;
    default:
      ret = x;
      break;
  }
//alert('x = '+x+'\n ret = '+ret)
  return ret;
}

function comparing(what){
  var out = false;
  for(var i = 1; i<name.length; i++) {
    if(name[i]==what){
      out=i;
      break;
    }
  }
  return out;
}
function lookForOpen(){
  found=-1;
  for(var i = 0; i<openedNodes.length; i++) {
    res = comparing(openedNodes[i]);
    if(typeof(res)!='boolean'){
      found = res;
      delete openedNodes[i];
      break;
    }
  }
  return found;
}
function shynchronyzation(){
  what = lookForOpen();
  if(what!=-1) {
    hideall(0);
//alert('name: '+name+'\n opend: '+opened)
    addNodes(what);
//alert('name: '+name+'\n opend: '+opened)
  }
  else {
    refresh=false;
    for(var i = 0; i < openedNodes.length; i++) {
      delete openedNodes[i];
    }
    showall(0);
    if(typeof(comparing(active.substr(3)))!='boolean') {
      setAct(active);
    }
  }
}
function syncRight(){
  openedNodes = new Array();
  var tmpArr = new Array();
  for(var i = 0; i < arguments.length-1; i++){
    tmpArr[tmpArr.length]='node'+ arguments[i];
    for(var j = 1; j < name.length; j++){
      if(arguments[i]==name[j].substr(4)) {
        j = name.length;
        i = arguments.length;
      } 
    }
  }
  for(var k = 0; k < tmpArr.length-1; k++) openedNodes[k] = tmpArr[tmpArr.length - k - 1];
  active = 'tabnode'+arguments[0];
  refresh = true;
  shynchronyzation();

}

function show(n){
  document.getElementById(name[0]).style.display='block';
//  opened[n]=true;
  for(var i=0; i<child[n].length; i++) document.getElementById(name[child[n][i]]).style.display='block';
}
function hide(n){
//  opened[n]=false;
  for(var i=0; i<child[n].length; i++) document.getElementById(name[child[n][i]]).style.display='none';
}

function storeNode(n, p){
   tmp = name.length;
   name[tmp] = n;
   child[tmp] = new Array();
   opened[tmp] = false;
   tmp1 = child[p].length;
   child[p][tmp1] = tmp;
   depth[tmp] = depth[p]+1;
}
function open(n){
//alert('open: '+name[n])
   if(n!=0){
     sr =  changePic(eval('document.getElementById("img'+name[n]+'").src'));
     eval('document.getElementById("img'+name[n]+'").src = sr');
   }
//   if(n!=0)eval('document.getElementById("img'+name[n]+'").src = changePic(document.getElementById(\"img'+name[n]+'\").src")');
   opened[n]=true;
   if(!refresh) show(n);
}
function close(n){
//   if(n!=0)eval('document.getElementById("img'+name[n]+'").src = changePic(document.getElementById(\"img'+name[n]+'\").src")');
   if(n!=0){
     sr =  changePic(eval('document.getElementById("img'+name[n]+'").src'));
     eval('document.getElementById("img'+name[n]+'").src = sr');
   }
   opened[n]=false;
   hide(n);
}
function addNodes(n){
SetActive(groupId.value);
   if(loaded){
      last = n;
      if(child[n].length>0){
         if (opened[n]) close(n);
         else open(n);
      } else {
         loaded = false;
         document.getElementById('myiframe').src =  'parse.php?21&'+((name[n]=='node')?'0':name[n].substr(4));
      }
   }
}
function addSubNode(){
  if(data[0]!=0){
    addStr(last);
    for ( i = 0; i < data[0]; i++) storeNode(data[i*4 + 1], last);
    open(last);
  }
  loaded = true;
  if(refresh) shynchronyzation();
  else showall(0);
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
//alert(typeof(x(i).childNodes(1).firstChild.nodeValue))
         data[data.length] = x(i).childNodes(1).firstChild.nodeValue;
         data[data.length] = x(i).childNodes(2).firstChild.nodeValue;
         data[data.length] = x(i).childNodes(3).firstChild.nodeValue;
//         if(data[data.length-3]=='' || typeof(data[data.length-3])=='undefined')data[data.length-3]="Group"+data[data.length-4].substr(4);
      } else getchildren (x(i));
   }
}
var otstup=10;
function addStr(n){
  var tmp=(document.getElementById(name[n]).innerHTML=='&nbsp;<!--TREENODES-->')?'&nbsp;<!--TREENODES-->':'<!--TREENODES-->';
  var str = ''
  for( i = 0; i < data[0]; i++) {
    str+= '<div id=' + data[i*4 + 1] + ' class="tree"><table id="tab' + data[i*4 + 1] + '" width="100%" border="0" cellspacing="0" cellpadding="0" class=browse><tr>';
    str+= '<td width="'+otstup*depth[n]+'"><img src="img/!pix.gif" width="'+otstup*depth[n]+'" height="10"></td><td width="18"><img id=img'+ data[i*4 + 1] +' src="';
//    str+= (data[i*4 + 3]==0)?'tr_open.gif" onclick="addNodes(\'' + (name.length +i) + '\');return false;" onfocus="if(this.blur)this.blur();':(data[i*4 + 3]==1)?'tr_alone.gif':(data[i*4 + 3]==2)?'tr_denied.gif':'tr_system.gif';
    TMPdAT = choosePic(data[i*4 + 3]);
    str+= TMPdAT[0];
    str+= ((data[i*4 + 3]%2)==1)?'" onclick="addNodes(\'' + (name.length +i) + '\');return false;" onfocus="if(this.blur)this.blur();':'';
//    str+= ((data[i*4 + 3]%2)==1)?'tr_open.gif" onclick="addNodes(\'' + (name.length +i) + '\');return false;" onfocus="if(this.blur)this.blur();':'tr_alone.gif';
    str+= '" width="18" height="18" alt="['+TMPdAT[1]+']"></td>';
//    str+= '" width="18" height="18">'+data[i*4 + 3]+'</td>';
    str+= '<td width="100%"><a target="rightFrame" href="parse.php?4&'+data[i*4 + 1].substr(4)+'" class=treelink onfocus="if(this.blur)this.blur()" onclick="groupId.value='+data[i*4 + 1].substr(4)+';SetActive(\''+data[i*4 + 1].substr(4)+'\');setAct(\'tab'+data[i*4 + 1]+'\');">' + data[i*4+2] + '</a></td>';
    str+= (data[i*4 + 4]!= 2)?'<td width="10" align="right"><INPUT TYPE="CHECKBOX" value="'+data[i*4 + 1].substr(4)+'" NAME="check[' + data[i*4 + 1].substr(4) + ']" onfocus="if(this.blur)this.blur()"':'';
    str+= (data[i*4 + 4]==1)?' CHECKED':''
    str+= (data[i*4 + 4]!=2)?' onclick="groupId.value='+data[i*4 + 1].substr(4)+';highLite('+data[i*4 + 1].substr(4)+');"></td>':''
    str+= '</tr></table><!--TREENODES--></div>';
  }
   document.getElementById(name[n]).innerHTML=document.getElementById(name[n]).innerHTML.replace(tmp,str);
}
function expandAll(){
   for(i=1;i<opened.length;i++){
      if(child[i].length>0){
         opened[i]=true;
         eval('document.getElementById("img'+name[i]+'").src = "img/tr_close.gif"');
      }
   }
   remake();
}
function collapseAll(){
   for(i=1;i<opened.length;i++){
      if(child[i].length>0){
         opened[i]=false;
         eval('document.getElementById("img'+name[i]+'").src = "img/tr_open.gif"');
      }
   }
   remake();
}
function FindCHKID(inst){
  if (inst.indexOf('[')==-1) return false;
  tmpSTR = inst.substr(inst.indexOf('[')+1);
  cur=0;
  outst='';
  for(var i = 0; i<tmpSTR.indexOf(']');i++) outst+=tmpSTR.charAt(i);
  return outst;
}
function getSelected(highlt){
  var arra = new Array();
  for(ik=0; ik<document.treeForm.elements.length; ik++){
    if(document.treeForm.elements[ik].checked && typeof(FindCHKID(document.treeForm.elements[ik].name))!='boolean') {
      arra[arra.length]=document.treeForm.elements[ik].value;
      if(highlt) {
        if(document.getElementById('tabnode'+FindCHKID(document.treeForm.elements[ik].name)).className !='mainSelected1') document.getElementById('tabnode'+FindCHKID(document.treeForm.elements[ik].name)).className = 'list_light';
      }
    } else if (highlt && typeof(FindCHKID(document.treeForm.elements[ik].name))!='boolean') {
      if(document.getElementById('tabnode'+FindCHKID(document.treeForm.elements[ik].name))!=document.getElementById(active)) document.getElementById('tabnode'+FindCHKID(document.treeForm.elements[ik].name)).className = 'browse';
      else document.getElementById('tabnode'+FindCHKID(document.treeForm.elements[ik].name)).className = 'mainSelected1';
    }
  }
  return arra;
}
function highLite(val){
  tmp = getSelected(true);
  val=(tmp.length==0)? val: tmp;
  top.topFrame.SetActive(1, val);
}

function SetActive(val){
  tmp = getSelected(false);
  val=(tmp.length==0)? val: tmp;
  top.topFrame.SetActive(1, val);
}
function setAct(what){
  for(var i=1; i<name.length;i++)if(document.getElementById('tab'+name[i]).className=='mainSelected1') document.getElementById('tab'+name[i]).className="browse";
  if(what!='' && typeof(what)!='undefined') {
    document.getElementById(what).className='mainSelected1';
    active=what;
  } else active='';
  getSelected(true);
}
function sheckAll(el){
  for(var i=0; i<document.treeForm.elements.length; i++){
    if(typeof(FindCHKID(document.treeForm.elements[i].name))!='boolean') {
     document.treeForm.elements[i].checked=el.checked;
    } 
  }
  getSelected(true);
}
function Pressed(){
if(typeof(document.all.winhead)=='object') document.all.winhead.className = 'mainSelected';
if(typeof(top.rightFrame.document.all.winhead)=='object') top.rightFrame.document.all.winhead.className = 'caption';
if(typeof(top.searchFrame.document.all.winhead)=='object') top.searchFrame.document.all.winhead.className = 'caption';
  tmp = getSelected(true);
  top.topFrame.SetActive(1, tmp);
}
document.onclick=Pressed;
onload = foldInit;
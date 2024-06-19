var ActiveType, ActiveID;
var disabledItems = [["add","delete","up","down","access","preferences"], ["up","down"], [], ["up","down","access","preferences"]];
var disabledItemsEmpty = [["add","delete","up","down","access","preferences"], ["delete","up","down","access","preferences"], ["delete","up","down","access","preferences"], ["delete","up","down","access","preferences"]];

var imgs = new Array();
var imgsDis = new Array();

function SearchTag(ev){
  while (ev.typez != "menu" && ev.tagName != "BODY") ev = ev.parentElement;
  if (ev.typez == "menu") return ev; 
  else return false;
}

function SelectMenu(){
  var css = ((event.type=='mouseover')?'list_light':'');  
  var el = SearchTag(event.srcElement);
  if (typeof(el) != 'boolean') el.className = css;
}

function pictures_init(){
  var im = document.images;
  for (i = 0; i < im.length; i++) {
    var imp  = im[i].parentElement;
    var imid = imp.id + '';
    if (imp.typez == 'menu' && imid != '') {
      im[i].id = 'im' + imp.id;
      imgs[imp.id] = new Image(); imgs[imp.id].src = "files/img/" + im[i].src.substr(im[i].src.lastIndexOf("/")+1);
      imgsDis[imp.id] = new Image(); imgsDis[imp.id].src = "files/img/(disabled)" + im[i].src.substr(im[i].src.lastIndexOf("/")+1);
    }
  }
}

function EnableItem(id){
  var t = document.getElementById(id);
  if (t.typez == 'disabled_menu'){
    var im      = document.getElementById('im'+id); 
    im.src = imgs[id].src;
    t.typez     = 'menu'; 
    t.className = '';
  }
}

function DisableItem(id){
  var t = document.getElementById(id);
  if (t.typez == 'menu'){
    var im      = document.getElementById('im'+id); 
    im.src = imgsDis[id].src;
    t.typez     = 'disabled_menu'; 
    t.className = 'disabled_text';
  }
}

function SetActive(type, id){
  ActiveType = type;
  ActiveID   = id;
  if(id.length==0) AnableDisable(disabledItemsEmpty[ActiveType]);
  else AnableDisable(disabledItems[ActiveType]);
}

function InitBar(){
  pictures_init();
  top.leftFrame.location.href = 'parse.php?20';
  SetActive(0,'');
}
function AnableDisable(args){
  var allButtons = new Array();
  for (var i = 0; i < document.images.length; i++) {
    imp  = document.images[i].parentElement;
    if (imp.typez == 'menu' || imp.typez == 'disabled_menu') allButtons[allButtons.length] = imp;
  }
  for(var i = 0; i < allButtons.length; i++) EnableItem(allButtons[i].id);
  for(var i = 0; i < args.length; i++) DisableItem(args[i]);
}
document.onmouseover=SelectMenu;
document.onmouseout=SelectMenu;
document.onclick=Selected;

function Selected(){
  var el   = SearchTag(event.srcElement);
  var MENU = SearchTag(event.srcElement).id;

  if (typeof(el) != 'boolean'){
    if (MENU == 'add') {
                                if (ActiveType == 1) addGroup(0);
                                if (ActiveType == 2) addDocument(0);
                                if (ActiveType == 3) addDocument(0);
    }
    if (MENU == 'delete') {
                                if (ActiveType == 1) deleteGroup();
                                if (ActiveType == 2) deleteDocuments();
    }
    if (MENU == 'up')   {
                                if (ActiveType == 1) moveGroup('up');
                                if (ActiveType == 2) moveDocuments('up');
    }
    if (MENU == 'down') {
                                if (ActiveType == 1) moveGroup('down');
                                if (ActiveType == 2) moveDocuments('down');
    }
    if (MENU == 'access') {
                                if ((ActiveType == 1) && (ActiveID != "")) accessGroup(ActiveID);
                                if ((ActiveType == 2) && (ActiveID != "")) accessDocument(ActiveID);
    }
    if (MENU == 'preferences') {
                                if ((ActiveType == 1) && (ActiveID != "")) addGroup(ActiveID);
                                if ((ActiveType == 2) && (ActiveID != "")) addDocument(ActiveID);
                               }
    if (MENU == 'tmpl')        showTB();
    if (MENU == 'tools')        RoleUsers();
    if (MENU == 'logout')       logout();
  }
}

function showTB(){
  var options = "height=600,width=800,left=0,top=0,channelmode=0,directories=0,fullscreen=0,location=0,menubar=0,resizable=1,status=0,toolbar=0";
  window.open("files/tb.htm","",options);
}
function accessGroup(id){ 
  if(id.length>1) isit = OpenDialog(2, 0, "&groups[]="+id, 426, 315);
  else isit = OpenDialog(2, id, 0, 426, 315);
}

function accessDocument(id){
  if(id.length>1) isit = OpenDialog(6, 0, "&docs[]="+id, 426, 315);
  else isit = OpenDialog(6, 0, id, 426, 315);
}

function addGroup(group){
  if(typeof(group)=="number") isit = OpenDialog(9, group, 0, 300, 195);
  else isit = OpenDialog(9, group[0], 0, 300, 195);
  if (isit == 1) top.leftFrame.reloadIt();
}

function addDocument(doc){
  if(doc==0) top.rightFrame.AddDocument(doc);
  else OpenDialog(33, 0, "&docs[]="+doc, 345, 252, top.leftFrame.copyIt());
}
function deleteGroup(){
  if(confirm("Are You sure you want to delete these groups: \n"+ActiveID)){
    top.leftFrame.document.getElementById('deleteid').value="delete";
    for(var i = 0; i < top.leftFrame.treeForm.elements.length; i++)
      if(top.leftFrame.treeForm.elements[i].name.indexOf(ActiveID[0])!=-1)
        top.leftFrame.treeForm.elements[i].checked = true;
    SetActive(ActiveType,"");
    top.leftFrame.treeForm.submit();
  }
}
function deleteDocuments(){
  if(confirm("Are You sure you want to delete these documents: \n"+ActiveID)){
    top.rightFrame.document.getElementById('deleteid').value="delete";
    SetActive(ActiveType,"");
    top.rightFrame.docs.submit();
  }
}

function moveGroup(a){
  top.leftFrame.document.getElementById('moveid').value=a;
  top.leftFrame.document.getElementById('deleteid').value="";
  for(var i = 0; i < top.leftFrame.treeForm.elements.length; i++)
    if(top.leftFrame.treeForm.elements[i].name.indexOf(ActiveID[0])!=-1)
      top.leftFrame.treeForm.elements[i].checked = true;
  SetActive(ActiveType,"");
  top.leftFrame.treeForm.submit();
}
function moveDocuments(a){
  top.rightFrame.document.getElementById('moveid').value=a;
  top.rightFrame.document.getElementById('deleteid').value="";
  top.rightFrame.docs.submit();
}

function RoleUsers(){
  isit = OpenDialog(29, 0, 0, 500, 287);
}

function logout(){
  top.location.href = 'parse.php?27';
}

function OpenDialog(id,grupid,docid ,width, height, param){
  var option = "dialogHeight: "+height+"px; dialogWidth: "+width+"px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: No; status: No; dialogHide: Yes; unadorned: Yes; scroll: No;"
  return window.showModalDialog("parse.php?28&"+grupid+"&"+docid+"&forms_Nr="+id,((typeof(param)!="undefined")?param:""), option);
}
/**
var langPref = '/engine';
function setLang(el){
  var whatRepl = langPref;
  for(var i = 0; i < el.options.length; i++) if(top.rightFrame.document.location.href.indexOf('/'+el.options[i].value+langPref)!=-1){whatRepl= '/' + el.options[i].value + whatRepl; break;}
  if((ActiveType==1 || ActiveType==2) && whatRepl != '/'+el.value+langPref)top.rightFrame.document.location.href=top.rightFrame.document.location.href.replace(whatRepl, '/'+el.value+langPref);
}
*/
var treeAr;
function treeSubmit(){
  var treeArray = top.leftFrame.copyIt();
  top.leftFrame.treeForm.submit();
  treeAr = '""';
  for(var i = 1; i < treeArray.length-1; i++) {
    if(treeArray[treeArray.length-i-1].length > treeArray[0].length) treeAr+=',"'+treeArray[treeArray.length-i-1].substr(treeArray[0].length)+'"';
  }
  treeAr[treeAr.length] = "1";
  setTimeout("syncTree();",50);
}
function syncTree(){
  if(top.leftFrame.loaded) eval('top.leftFrame.syncRight('+treeAr+');');
  else setTimeout("syncTree();",50);
}
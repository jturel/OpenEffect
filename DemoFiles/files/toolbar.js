var ActiveType, ActiveID;

function SearchTag(ev){
while ((ev.typez != "menu") && (ev.tagName != "BODY")){ev = ev.parentElement;}
if (ev.typez == "menu") return ev; else return false;
}

function SelectMenu(){
var css = ((event.type=='mouseover')?'list_light':'');  
var el = SearchTag(event.srcElement);
if (typeof(el) != 'boolean') el.className = css;
}

function pictures_init(){
var im = document.images;
for (i=0;i<im.length;i++){
        var imp = im[i].parentElement;
        var imid = imp.id + '';
        if ((imp.typez == 'menu') && (imid != ''))im[i].id = 'im' + imp.id;}
}

function Selected(){
var el = SearchTag(event.srcElement);
var MENU = SearchTag(event.srcElement).id;

if (typeof(el) != 'boolean') 
 {
 if (MENU == 'preferences') {if ((ActiveType == 1) && (ActiveID != "")){addGroup(ActiveID)}
                             if ((ActiveType == 2) && (ActiveID != "")){addDocument(ActiveID);}
                             }
 if (MENU == 'add') {if (ActiveType == 1) addGroup(0);
                     if (ActiveType == 2) addDocument(0);
                     if (ActiveType == 3) addDocument(0);}
 if (MENU == 'delete') {if (ActiveType == 1) deleteGroup();
                        if (ActiveType == 2) deleteDocuments();}
 if (MENU == 'access') {if ((ActiveType == 1) && (ActiveID != "")) accessGroup(ActiveID);
                        if ((ActiveType == 2) && (ActiveID != "")) accessDocument(ActiveID)}
 if (MENU == 'logout') {logout();}

 if (MENU == 'up')   {if (ActiveType == 1) moveGroup('up');
                      if (ActiveType == 2) moveDocuments('up');}
 if (MENU == 'down') {if (ActiveType == 1) moveGroup('down');
                      if (ActiveType == 2) moveDocuments('down');}
 if (MENU == 'tools') {RoleUsers()}
 }
}

function EnableItem(id){
var t = document.getElementById(id);
if (t.typez != 'menu'){
var im = document.getElementById('im'+id); ims = im.src;
im.src = ims.substr(0,ims.indexOf('(')) + ims.substr(ims.indexOf('.'));
t.typez = 'menu'; t.className = '';}
}

function DisableItem(id){
var t = document.getElementById(id);
if (t.typez == 'menu'){
var im = document.getElementById('im'+id); ims = im.src;
im.src = ims.substr(0,ims.lastIndexOf('.')) + "(d)" + ims.substr(ims.lastIndexOf('.'));
t.typez = ''; t.className = 'disabled_text';}
}

function SetActive(type, id){
//alert(id)
 ActiveType = type;
 ActiveID = id;
}

function InitBar(){
        pictures_init();
//      DisableItem('tools');
//alert(top.leftFrame.location.href)
  top.leftFrame.location.href = 'parse.php?20';
//alert(top.leftFrame.location.href)
}

document.onmouseover=SelectMenu;
document.onmouseout=SelectMenu;
document.onclick=Selected;


function accessGroup(id){ 
  if(id.length>1) isit = OpenDialog(2, 0, "&groups[]="+id, 426, 315);
  else isit = OpenDialog(2, id, 0, 426, 315);
}

function accessDocument(id){
//  if(id.indexOf(',')!=-1) isit = OpenDialog(6, 0, "&docs[]="+id, 426, 300);
  if(id.length>1) isit = OpenDialog(6, 0, "&docs[]="+id, 426, 315);
  else isit = OpenDialog(6, 0, id, 426, 315);
}

function addGroup(group){
  isit = OpenDialog(9, group[0], 0, 322, 195);
  if (isit == 1) top.leftFrame.refreshTree();
}

function addDocument(doc){
  if(doc==0){
    top.rightFrame.AddDocument(doc);
  } else {
//    urls = top.rightFrame.AddDocument1();
    OpenDialog(33, 0, doc[0], 345, 252);
  }
}
function deleteGroup(){
  if(confirm("Are You shure you want to delete these groups: \n"+ActiveID)){
    top.leftFrame.document.getElementById('deleteid').value="delete";
    top.leftFrame.treeForm.submit();
  }
}
function deleteDocuments(){
  if(confirm("Are You shure you want to delete these documents: \n"+ActiveID)){
    top.rightFrame.document.getElementById('deleteid').value="delete";
    top.rightFrame.docs.submit();
  }
}

function moveGroup(a){
  top.leftFrame.document.getElementById('moveid').value=a;
  top.leftFrame.document.getElementById('deleteid').value="";
  top.leftFrame.treeForm.submit();
}
function moveDocuments(a){
  top.rightFrame.document.getElementById('moveid').value=a;
  top.rightFrame.document.getElementById('deleteid').value="";
  top.rightFrame.docs.submit();
}

function RoleUsers(){
  isit = OpenDialog(29, 0, 0, 500, 288);
}

function logout(){
  top.location.href = 'parse.php?27';
}

function OpenDialog(id,grupid,docid ,width, height){
  var option = "dialogHeight: "+height+"px; dialogWidth: "+width+"px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: No; status: No; dialogHide: Yes; unadorned: Yes; scroll: No;"
  return window.showModalDialog("parse.php?28&"+grupid+"&"+docid+"&forms_Nr="+id,"", option);
//  return window.open("parse.php?28&"+grupid+"&"+docid+"&forms_Nr="+id,"", option);
}

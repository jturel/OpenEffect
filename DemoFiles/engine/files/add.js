var minus = '<img src="files/img/minus.gif" width="16" height="16" onclick="removeIt';
var plus = '<img src="files/img/plus.gif" width="16" height="16" onclick="addIt';

var begin = '(\'', middle = '\',\'', end = '\')">', tr = 'tr';
var classNames = ["list", "list", "", ""];
var aligns = ["left", "left", "left", "right"];
var widths = ["120", "300", "", "36"];

function ShowUpload(what, rowPrefix){
  option = "dialogHeight: 500px; dialogWidth: 800px; dialogTop: 100px; dialogLeft: 100px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No; dialogHide: Yes; unadorned: Yes; scroll: No;";
  arr = showModalDialog("parse.php?24","", option);
  cont = SearchTag1(what);
  if(typeof(arr)!='undefined') get('input'+cont.id.substr(tr.length)).value = arr;
}

function get(s){return document.getElementById(s);}
function getF(el) {
  while(el.tagName!="FORM" && el.tagName!="BODY") el = el.parentElement;
  return (el.tagName=="BODY")?false:el;
}
function SearchTag1(ev){
  while (ev.id.substr(0,tr.length) != tr){ev = ev.parentElement;}
  return ev;
}

function addPlussMinus(b_minus, b_pluss, t, rowPrefix, min, tit){
  st =  (b_minus)? minus + begin + t + middle + rowPrefix + middle + min + middle + tit + end:'';
  st += (b_pluss)? plus  + begin + t + middle + rowPrefix + middle + min + middle + tit + end:'';
  return st;
}

function makeInput(innHT, rowPrefix, num){
  va = innHT.substr(innHT.lastIndexOf("value="));
  out = '<input type="text" name="' + rowPrefix + num + '" id="input' + rowPrefix + num + '" size="50" class="input" style="width:300px;" '+va
  return out; 
}

function rebuildTable(t, rowPrefix, min, tit, no){
  tab = get(t);
//  for(j=0; j<tab.rows.length-1; j++) {
  for(j=no; j<tab.rows.length-1; j++) {
    tab.rows[j].id = tr + rowPrefix + j;
    tab.rows[j].cells[0].innerHTML = ''+tit+(j+1);
  }
//------------------------------------------
  frm = getF(tab);
  if(frm){
    for(l=no; l<frm.elements.length; l++){
      if(frm.elements[l].name.substr(0, rowPrefix.length)==rowPrefix && frm.elements[l].type!='hidden') {
        frm.elements[l].parentElement.innerHTML = makeInput(frm.elements[l].parentElement.innerHTML, rowPrefix, frm.elements[l].parentElement.parentElement.id.substr(rowPrefix.length + tr.length));
      }
    }
//------------------------------------------
/**
  for(f=0; f<document.forms.length; f++){
    for(l=0; l<document.forms[f].elements.length; l++){
      if(document.forms[f].elements[l].name.substr(0, rowPrefix.length)==rowPrefix && document.forms[f].elements[l].type!='hidden') {
        document.forms[f].elements[l].parentElement.innerHTML = makeInput(document.forms[f].elements[l].parentElement.innerHTML, rowPrefix, document.forms[f].elements[l].parentElement.parentElement.id.substr(rowPrefix.length + tr.length));
      }
    }
*/
//------------------------------------------
  }
//------------------------------------------
  str = '';
//  for (h=tab.rows.length-1; h < parseInt(min) ; h++) {
  for (h=tab.rows.length-1; h < parseInt(min) ; h++) {
    str += '<input type="hidden" name="' + rowPrefix + h + '" value="">';
  }
  tab.rows[tab.rows.length-1].cells[0].innerHTML = str;
}

function removeIt(t, rowPrefix, min, tit){
  tab = get(t);
  el = SearchTag1(event.srcElement);
  no = el.rowIndex;
  if( no == tab.rows.length-2 ){
    b_minus = (no != 1)? true: false;
    tab.rows[no-1].cells[tab.rows[no-1].cells.length - 1].innerHTML = addPlussMinus(b_minus, true, t, rowPrefix, min, tit);
  } else if (no == 0 && tab.rows.length == 3)  tab.rows[no+1].cells[tab.rows[no+1].cells.length - 1].innerHTML = addPlussMinus(false, true, t, rowPrefix, min, tit);
  tab.deleteRow(no);
//  rebuildTable(t, rowPrefix, min, tit);
  rebuildTable(t, rowPrefix, min, tit, no);
}
function drowRow(t, rowPrefix, min, tit, val){
  tab = get(t);
  no = tab.rows.length;
  if (no > 1) tab.rows[no-2].cells[tab.rows[no-2].cells.length - 1].innerHTML = addPlussMinus(true, false, t, rowPrefix, min, tit);
  newRow = tab.insertRow(no-1);
  newRow.id = tr + rowPrefix + (no-1);

  nC_0 = newRow.insertCell(0);
  nC_0.className = classNames[0];
  nC_0.align = aligns[0];
  nC_0.width = widths[0];
  nC_0.innerHTML = ''+tit+no;

  nC_1 = newRow.insertCell(1);
  nC_1.className = classNames[1];
  nC_1.align = aligns[1];
  nC_1.width = widths[1];
  str = '<input type="text" name="' + rowPrefix + (no-1) + '" size="50" class="input" value="';
  if (val) str += val;
  str += '" style="width:300px;">';
  nC_1.innerHTML = str;

  nC_2 = newRow.insertCell(2);
  nC_2.align = aligns[2];
  nC_2.innerHTML = '<img src="files/img/gn_pictures.gif" onclick="ShowUpload(this,\''+rowPrefix+'\')">';

  nC_3 = newRow.insertCell(3);
  nC_3.align = aligns[3];
  nC_3.width = widths[3];
  b_minus = (no==1)? false:true;
  nC_3.innerHTML = addPlussMinus(b_minus, false, t, rowPrefix, min, tit);
}
function addIt(t, rowPrefix, min, tit, val){

  tab = get(t);
  no = tab.rows.length;

  if (no > 1) tab.rows[no-2].cells[tab.rows[no-2].cells.length - 1].innerHTML = addPlussMinus(true, false, t, rowPrefix, min, tit);
  newRow = tab.insertRow(no-1);

  nC_0 = newRow.insertCell(0);
  nC_0.className = classNames[0];
  nC_0.align = aligns[0];
  nC_0.width = widths[0];
  nC_0.innerHTML = ''+tit+no;

  nC_1 = newRow.insertCell(1);
  nC_1.className = classNames[1];
  nC_1.align = aligns[1];
  nC_1.width = widths[1];
  str = '<input type="text" name="' + rowPrefix + (no-1) + '" size="50" class="input" value="';
  if (val) str += val;
  str += '" style="width:300px;">';
  nC_1.innerHTML = str;

  nC_2 = newRow.insertCell(2);
  nC_2.align = aligns[2];
  nC_2.innerHTML = '<img src="files/img/gn_pictures.gif" onclick="ShowUpload(this,\''+rowPrefix+'\')">';

  nC_3 = newRow.insertCell(3);
  nC_3.align = aligns[3];
  nC_3.width = widths[3];
  b_minus = (no==1)? false:true;
  nC_3.innerHTML = addPlussMinus(b_minus, true, t, rowPrefix, min, tit);

//  rebuildTable(t, rowPrefix, min, tit);
  rebuildTable(t, rowPrefix, min, tit, no-1);
}
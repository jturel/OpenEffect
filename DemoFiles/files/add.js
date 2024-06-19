var minus = '<img src="img/minus.gif" width="16" height="16" onclick="removeIt';
var plus = '<img src="img/plus.gif" width="16" height="16" onclick="addIt';
//var empty = '<!img src="img/!pix.gif" width="16" height="16">';
var begin = '(\'', middle = '\',\'', end = '\')">', tr = 'tr';
var classNames = ["list", "list", "", ""];
var aligns = ["left", "left", "left", "right"];
var widths = ["120", "160", "", "36"];
//var firstTime=true;

function ShowUpload(what, rowPrefix){
	option = "dialogHeight: 500px; dialogWidth: 800px; dialogTop: 100px; dialogLeft: 100px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No; dialogHide: Yes; unadorned: Yes; scroll: No;";
	arr = showModalDialog("parse.php?24","", option);
	cont = SearchTag1(what);
	if(typeof(arr)!='undefined') get('input'+cont.id.substr(tr.length)).value = arr;
}
function get(s){return document.getElementById(s);}
//function ShowUpload(e){}
function SearchTag1(ev){
	while (ev.id.substr(0,tr.length) != tr){ev = ev.parentElement;}
	return ev;
}

function addPlussMinus(b_minus, b_pluss, t, rowPrefix, min){
	st =  (b_minus)? minus + begin + t + middle + rowPrefix + middle + min + end:'';
	st += (b_pluss)? plus  + begin + t + middle + rowPrefix + middle + min + end:'';
	return st;
}
function makeInput(innHT, rowPrefix, num){
	va = innHT.substr(innHT.lastIndexOf("value="));
	out = '<input type="text" name="' + rowPrefix + num + '" id="input' + rowPrefix + num + '" size="50" class="input" style="width:300px;" '+va
	return out; 
}
function rebuildTable(t, rowPrefix, min){
	tab = get(t);
	for(j=0; j<tab.rows.length-1; j++) tab.rows[j].id = tr + rowPrefix + j;
//alert(tab.innerHTML);
	for(f=0; f<document.forms.length; f++){
		for(l=0; l<document.forms[f].elements.length; l++){
			if(document.forms[f].elements[l].name.substr(0, rowPrefix.length)==rowPrefix && document.forms[f].elements[l].type!='hidden') {
//				document.forms[f].elements[l].name = rowPrefix + document.forms[f].elements[l].parentElement.parentElement.id.substr(rowPrefix.length + tr.length);
//				document.forms[f].elements[l].id = 'input'+ rowPrefix + document.forms[f].elements[l].parentElement.parentElement.id.substr(rowPrefix.length + tr.length);
				document.forms[f].elements[l].parentElement.innerHTML = makeInput(document.forms[f].elements[l].parentElement.innerHTML, rowPrefix, document.forms[f].elements[l].parentElement.parentElement.id.substr(rowPrefix.length + tr.length));
//alert(document.forms[f].elements[l].parentElement.innerHTML);
			}
		}
	}
	str = '';
	for (h=tab.rows.length-1; h < parseInt(min) ; h++) {
		str += '<input type="hidden" name="' + rowPrefix + h + '" value="">';
	}
	tab.rows[tab.rows.length-1].cells[0].innerHTML = str;
//alert(tab.innerHTML);
}

function removeIt(t, rowPrefix, min){
	tab = get(t);
	el = SearchTag1(event.srcElement);
	no = el.rowIndex;
	if( no == tab.rows.length-2 ){
		b_minus = (no != 1)? true: false;
		tab.rows[no-1].cells[tab.rows[no-1].cells.length - 1].innerHTML = addPlussMinus(b_minus, true, t, rowPrefix, min);
	} else if (no == 0 && tab.rows.length == 3)	tab.rows[no+1].cells[tab.rows[no+1].cells.length - 1].innerHTML = addPlussMinus(false, true, t, rowPrefix, min);
	tab.deleteRow(no);
	rebuildTable(t, rowPrefix, min);
}

function addIt(t, rowPrefix, min, val){
	tab = get(t);
	no = tab.rows.length;
	if (no > 1) tab.rows[no-2].cells[tab.rows[no-2].cells.length - 1].innerHTML = addPlussMinus(true, false, t, rowPrefix, min);
	newRow = tab.insertRow(no-1);

	nC_0 = newRow.insertCell(0);
	nC_0.className = classNames[0];
	nC_0.align = aligns[0];
	nC_0.width = widths[0];
	nC_0.innerHTML = "##Picture##";

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
	nC_2.innerHTML = '<img src="img/gn_pictures.gif" onclick="ShowUpload(this,\''+rowPrefix+'\')">';

	nC_3 = newRow.insertCell(3);
	nC_3.align = aligns[3];
	nC_3.width = widths[3];
	b_minus = (no==1)? false:true;
	nC_3.innerHTML = addPlussMinus(b_minus, true, t, rowPrefix, min);

	rebuildTable(t, rowPrefix, min);
}
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
  QueryStatusToolbarButtons[14] = new QueryStatusItem(DECMD_HYPERLINK, document.body.all["DECMD_HYPERLINK1"]);

  GeneralContextMenu[0] = new ContextMenuItem("Cut", DECMD_CUT);
  GeneralContextMenu[1] = new ContextMenuItem("Copy", DECMD_COPY);
  GeneralContextMenu[2] = new ContextMenuItem("Paste", DECMD_PASTE);

}
function InsertTable() {
  var pVar = ObjTableInfo;
  var args = new Array();
  var arr = null;
   
  args["NumRows"] = ObjTableInfo.NumRows;
  args["NumCols"] = ObjTableInfo.NumCols;
  args["TableAttrs"] = ObjTableInfo.TableAttrs;
  args["CellAttrs"] = ObjTableInfo.CellAttrs;
  args["Caption"] = ObjTableInfo.Caption;
  
  arr = null;
  
  arr = showModalDialog( "files/instable.htm", args, "font-family:Verdana; font-size:12; dialogWidth:36em; dialogHeight:25em; resizable=1;");
  if (arr != null) {
    for ( elem in arr ) {
      if ("NumRows" == elem && arr["NumRows"] != null) {
        ObjTableInfo.NumRows = arr["NumRows"];
      } else if ("NumCols" == elem && arr["NumCols"] != null) {
        ObjTableInfo.NumCols = arr["NumCols"];
      } else if ("TableAttrs" == elem) {
        ObjTableInfo.TableAttrs = arr["TableAttrs"];
      } else if ("CellAttrs" == elem) {
        ObjTableInfo.CellAttrs = arr["CellAttrs"];
      } else if ("Caption" == elem) {
        ObjTableInfo.Caption = arr["Caption"];
      }
    }
    tbContentElement.ExecCommand(DECMD_INSERTTABLE,OLECMDEXECOPT_DODEFAULT, pVar);  
  }
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

function tbContentElement_DisplayChanged() {
  var i, s;
  for (i=0; i<QueryStatusToolbarButtons.length; i++) {
//alert(QueryStatusToolbarButtons[i].command)
	  s = tbContentElement.QueryStatus(QueryStatusToolbarButtons[i].command);
	  if (s == DECMDF_DISABLED || s == DECMDF_NOTSUPPORTED) TBSetState(QueryStatusToolbarButtons[i].element, "gray"); 
      else if (s == DECMDF_ENABLED  || s == DECMDF_NINCHED) TBSetState(QueryStatusToolbarButtons[i].element, "unchecked"); 
      else TBSetState(QueryStatusToolbarButtons[i].element, "checked");
  }
  if ("complete" == document.readyState && false == docInit) docInit = true;
}
function SMTH_onclick(what,command) {
  eval('tbContentElement.ExecCommand('+what+','+command+')');
  tbContentElement.focus();
}

function TOOLBARS_onclick(toolbar) {
  if (toolbar.TBSTATE == "hidden") TBSetState(toolbar, "dockedTop");
  else TBSetState(toolbar, "hidden");
  tbContentElement.focus();
}

function preview(){
    var filteredHTML;
    filteredHTML = tbContentElement.FilterSourceCode (tbContentElement.DOM.body.innerHTML);
    filteredHTML = encodeHTMLQuotes(filteredHTML);
	var win = top.document.open('files/dhtmled/files/blank.html', '', 'top=100; left=200; width=600; height=500; resizable=1; status=1;');
	win.document.body.innerHTML=filteredHTML;
}
function insImg(){
	tbContentElement.ExecCommand(DECMD_IMAGE,OLECMDEXECOPT_DONTPROMPTUSER, 'test.gif');
	return true;
}
function insLink(){
	tbContentElement.ExecCommand(DECMD_HYPERLINK,OLECMDEXECOPT_DONTPROMPTUSER, '#');
	return true;
}
function insLink1(){
	tbContentElement.ExecCommand(DECMD_HYPERLINK,OLECMDEXECOPT_DONTPROMPTUSER, '#');
	return true;
}
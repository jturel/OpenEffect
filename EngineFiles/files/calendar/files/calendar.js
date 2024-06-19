var 	doc = document.all;
var 	objCalend = new Object();
var dd = "";

function GetDaysInMonth(iMonth, iYear) {
	var r;
	obj = new Date(iYear, iMonth-1, 31);
	r=(obj.getDate()<4)?(31-obj.getDate()):obj.getDate()
	return r;
}

function GetDayOfWeek(iMonth, iYear, iDate) {
	obj = new Date(iYear, iMonth-1, iDate);
	day = obj.getDay();
	if(day == 0){
	return 7;
	}else{
	return day;
	}
}

function ClearCalend(){
	tab = doc["CalendTab"];
	tab.style.cursor="wait";
	Rlen = tab.rows.length;
	for(i=0; i < Rlen; i++){
		tab.deleteRow();
		}
	oRow = tab.insertRow();
	oCell = oRow.insertCell();
	oCell.colSpan=7;
}

function buildCalendar(iMonth, iYear, iDay){
	oldButton = false;
	if(!iDay){iDay = 0;}
	tab = doc["CalendTab"];
	tab.style.cursor="default";
	tab.deleteRow();
	realDays = " "+objCalend.realDays+" ";
	fromDay = GetDayOfWeek(iMonth, iYear, 1);
	cellCount = 7;
	stopDay = GetDaysInMonth(iMonth, iYear);
	if(fromDay==1) fromDay+=7;
	firstDay = GetDaysInMonth(iMonth-1, iYear) - fromDay + 2;
	d = 1;
	for( c=1; c < 43; c++ ){
		if(cellCount ==7){
			oRow = tab.insertRow();
			cellCount = 0;
		}
		oCell = oRow.insertCell();
		oCell.innerHTML = "&nbsp;";
		if( (c >= fromDay) && (d <= stopDay) ){
				if(d==iDay && (iMonth-1) == CurDate.getMonth() && iYear == CurDate.getFullYear()) {
					oCell.className = "calendarCellCurrent";
				} else {
					oCell.className = "calendarCell";
				}
				oCell.id = "c_"+d;
			oCell.innerHTML=d;
			d++;
		}
		else {
			if (c < fromDay){
				oCell.className = "calendarPrevious";
				oCell.id = "p_"+firstDay;
				oCell.innerHTML=firstDay;
				firstDay++;
			}
			if (d > stopDay){
				oCell.className = "calendarNext";
				oCell.id = "n_"+(c-stopDay-fromDay+1);
				oCell.innerHTML=(c-stopDay-fromDay+1);
			}
		}
	cellCount ++;
	}
}

function setDateInForm(iMonth, iYear){
	ClearCalend();
	doc["sMonth"].options[iMonth].selected=true;
	doc["oY"+iYear].selected=true;
	setChange();
}

function setChange(){
	ClearCalend();
	iMonth = doc["sMonth"].options[doc["sMonth"].selectedIndex].value
	iYear = doc["sYear"].options[doc["sYear"].selectedIndex].text
	buildCalendar(iMonth, iYear, CurDate.getDate())
}
var oldButton = false;

function ClickCalend(){
	iDay = event.srcElement.innerHTML;
	cn = event.srcElement.className;
	if (event.srcElement.id.substr(0,2)=='c_'){
		for(i = 0; i < 6; i++ ) {
			for(j = 0; j < 7; j++ ) {
				if( doc["CalendTab"].rows[i].cells[j].id.substr(0,2)=='c_'){
					if(doc["CalendTab"].rows[i].cells[j].innerHTML==CurDate.getDate() && (iMonth-1) == CurDate.getMonth() && iYear == CurDate.getFullYear()){
						doc["CalendTab"].rows[i].cells[j].className = "calendarCellCurrent";
					} else {
						doc["CalendTab"].rows[i].cells[j].className = "calendarCell";
					}
				}
			}
		}
		dd = format(event.srcElement.innerHTML) + '/' + format(doc["sMonth"].options[doc["sMonth"].selectedIndex].value) + '/' + doc["sYear"].options[doc["sYear"].selectedIndex].text
		event.srcElement.className = 'calendarCellSelected'
	}
	if (event.srcElement.id.substr(0,2)=='p_'){
		if(doc["sYear"].selectedIndex>0 || doc["sMonth"].selectedIndex>0){
			dd = format(event.srcElement.innerHTML) + '/';
			doc["sMonth"].selectedIndex = (doc["sMonth"].selectedIndex!=0)?(doc["sMonth"].selectedIndex-1):11;
			dd+=format(doc["sMonth"].options[doc["sMonth"].selectedIndex].value) + '/';
			doc["sYear"].selectedIndex = (doc["sMonth"].selectedIndex!=11)? (doc["sYear"].selectedIndex): (doc["sYear"].selectedIndex - 1);
			dd+=doc["sYear"].options[doc["sYear"].selectedIndex].text;
			tmp = 'c_'+event.srcElement.innerHTML;
			setChange();
			doc[tmp].className = 'calendarCellSelected';
		}
	}
	if (event.srcElement.id.substr(0,2)=='n_'){
		if(doc["sYear"].selectedIndex<doc["sYear"].options.length || doc["sMonth"].selectedIndex<doc["sMonth"].options.length){
			dd = format(event.srcElement.innerHTML) + '/';
			doc["sMonth"].selectedIndex = (doc["sMonth"].selectedIndex!=11)?(doc["sMonth"].selectedIndex+1):0;
			dd+=format(doc["sMonth"].options[doc["sMonth"].selectedIndex].value) + '/';
			doc["sYear"].selectedIndex = (doc["sMonth"].selectedIndex!=0)? (doc["sYear"].selectedIndex): (doc["sYear"].selectedIndex + 1);
			dd+=doc["sYear"].options[doc["sYear"].selectedIndex].text;
			tmp = 'c_'+event.srcElement.innerHTML;
			setChange();
			doc[tmp].className = 'calendarCellSelected';
		}
	}
	iMonth = doc["sMonth"].options[doc["sMonth"].selectedIndex].value
	iYear = doc["sYear"].options[doc["sYear"].selectedIndex].text
}

function format(x){
	return (x>9)?x:'0'+x;
}

function tt(){
	if(dd==""){
		dd = format(CurDate.getDate()) + '/' + format(CurDate.getMonth()+1) + '/' + CurDate.getFullYear()
	}
}

var CurDate = new Date();
setDateInForm(CurDate.getMonth(), CurDate.getFullYear());

CalendTab.onclick=ClickCalend;
setDateInForm(CurDate.getMonth(), CurDate.getFullYear());
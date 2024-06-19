<?
$instTitle='Open Effect Demo Install Script';
$errors=array(); $err=array();
$errors['dbmissing']='Database/configuration error: Database is missing or incorrect.';
$errors['dbincorrect']='Database/configuration error: incorrect Database configuration.';
$errors['admin_email']='You have not defined administrative email.';

include ('../DemoFiles/conf/db_schemes.conf.php');
?>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<HEAD><TITLE><?=$instTitle?></TITLE>
<LINK href="install.css" type="text/css" rel="STYLESHEET">
</HEAD>
<BODY bgcolor="#E7EBFF">

<table width="100%" border="0" cellspacing="0" cellpadding="1">
<tr><td bgcolor="#B7C9FF">

<table width="100%" border="0" cellspacing="0" cellpadding="5" bgcolor="#E7EBFF">
<tr bgcolor="#B7C9FF">
<td width="249"><img src="./logo.gif" border="0" alt="Open Effect" width="249" height="65"></a></td>
<td width="100%" valign=middle><span class="captionText"><?=$instTitle?></span></td>
</tr>
<tr>
<td colspan=2>

<?
$DB=$db_schemes['default']['type'];
$DBhost=$db_schemes['default']['host'];
$DBusr=$db_schemes['default']['user'];
$DBpwd=$db_schemes['default']['password'];
$DBname=$db_schemes['default']['database'];
$AdminEmail=$db_schemes['default']['errors_to'];

if (file_exists("./install_$DB.sql")) {

/* Check for database working properly */
if (!@mysql_connect($DBhost, $DBusr, $DBpwd)) $err[]='dbincorrect';
if (!@mysql_select_db($DBname)) $err[]='dbmissing';

if ($AdminEmail=='') $err[]='admin_email';

/* GO ON */

switch ($step) {
case 'install':

$sql = join ('', file("./install_$DB.sql"));
$sql = trim ($sql);

/* If DB is mysql */
if ($DB=='mysql') {
$errs=0;

/* Erase UNIX bslashes */
$sql = str_replace ("\r", "", $sql);
/* Erase comments */
$sql = preg_replace ("/#(.*?)\n/i", "", $sql);

$stringsSQL = explode (');', $sql);

for ($i=0; $i<sizeof($stringsSQL); $i++) {

if (trim($stringsSQL[$i])!='') {
//$stringsSQL[$i] = str_replace ("\r\n", '', $stringsSQL[$i]);
$stringsSQL[$i] = str_replace ("\n", '', $stringsSQL[$i]);

$rs = mysql_query($stringsSQL[$i].');');
//preg_match("/CREATE TABLE ([a-zA-Z_]+) \(/i", $stringsSQL[$i], $tbName);
//$tbName=$tbName[1];
if (mysql_error()) {
echo "<p>Operation failed: <b>".mysql_error()."</b>, request \"$stringsSQL[$i]\"";
$errs++;
}
//else echo "<p>Table {$tbName} successfully created...";
}
}

if ($errs==0) {

function insertData($req, $reason){
global $errs;
$rs=mysql_query($req);
if (mysql_error()) { "<p>$reason data WAS NOT added, reason: ".mysql_error(); $errs++; }
//echo "<p>$reason data successfully added...";
}

$inserts=array(
"INSERT INTO DocLinks (GrpID, DocID, sortNr) VALUES (97,98,495),(104,105,268),(97,112,494),(104,269,302),(104,277,279),(104,285,293),(104,294,296),(97,305,489);",

"INSERT INTO DocSec (DocID, RoleID, Access) VALUES (98,1,'WR'),(98,2,'WRP'),(105,1,'WR'),(105,2,'PWR'),(112,1,'WR'),(112,2,'WRP'),(269,1,'WR'),(269,2,'PWR'),(277,1,'WR'),(277,2,'PWR'),(285,1,'WR'),(285,2,'PWR'),(294,1,'WR'),(294,2,'PWR'),(305,1,'WR'),(305,2,'WRP'),(98,122,'R'),(112,122,'R'),(305,122,'R'),(105,122,'R'),(294,122,'R'),(269,122,'R'),(277,122,'R'),(285,122,'R'),(98,374,'R'),(98,122,'R'),(112,374,'R'),(305,374,'R');",

"INSERT INTO Documents (ID, RecTime, LastUpdate, visible, searchVisible, keyWords, templateID, UserID, name) VALUES (98,'2002-01-08 16:48:29','2002-05-30 10:28:33',1,0,'About Welcome KrazyHouse\'s site Welcome%20to%20KrazyHouse%27s%20web%20site.%20Our%20goal%20is%20to%20provide%20you%20with%20an%20easy-to-navigate%20site%20that%20makes%20shopping%20effortless.%3CBR%3E%3CBR%3EWe%20offer%20over%202%2C500%20of%20the%20most%20requested%20janitorial%20products.%20Our%20line%20is%20diverse%2C%20encompassing%20the%20top%20manufacturers%20and%20the%20highest%20quality%20products.%20%3CBR%3E%3CBR%3EThis%2C%20combined%20with%20our%20volume%20buying%20power%20and%20controlled%20costs%2C%20allows%20us%20to%20offer%20you%20the%20best%20available%20products%20at%20the%20most%20competitive%20prices.%20Your%20order%20is%20shipped%20from%20the%20closest%20of%20our%2025%20warehouses%2C%20insuring%20fast%20delivery%20and%20low%20freight%20costs.%20But%20it%20does%20not%20end%20there.%20We%20want%20to%20continue%20to%20earn%20your%20trust%2C%20and%20to%20that%20extent%2C%20every%20purchase%20is%20backed%20by%20our%20100%25%20Satisfaction%20Guarantee.%20%3CBR%3E%3CBR%3EWe%20encourage%20you%20to%20join%20our%20worldwide%20base%20of%20customers%20and%20experience%20for%20yourself%20how%20we%20combine%20state-of-the-art%20technology%20with%20good%20%22old-%20fashioned%22%20service.',95,1,'about'),(105,'2002-01-08 16:51:27','2002-02-21 17:01:08',1,0,'CAPPUCHINO /img/cup1.gif Foamed milk\r\nCappuccino\'s main ingredient... [CAP-UH-CHEE-NO]\r\n\r\nFoamed ingredient. drinks visit card, which comes last fill topped with powder chocolate.\r\n\r\nSteamed milk\r\nSilky, fleshly boiled milk, heated temperature gently added until about full\r\n\r\nEspresso\r\nOur espresso roast, smooth satisfying, made from special selection different beans dominant taste rabusta arabica\r\n',96,1,'capuchino'),(112,'2002-01-08 17:11:22','2002-05-30 10:28:48',1,0,'Publications Reviews Articles about Hansa%20Times%3CBR%3E12.09.2001%3CBR%3ERIGA%3CBR%3E%3CBR%3ECrazyhouse%20Bar%20is%20an%20express-bar%20in%20a%20traditional%20sense%20of%20this%20word.%20Therefore%20those%20who%20are%20used%20to%20have%20heated%20food%20or%20partake%20salads%20at%20lunch%20will%20feel%20disappointed%20here.%20New%20Express%20bar%20at%20Valdemara%20Center%20is%20the%20only%20place%20in%20Riga%20where%20you%20can%20taste%20special%20coffee%20made%20of%20Crazyhouse%20Bar%20branded%20ground%20coffee%20beans.%20You%20cat%20fetch%20some%20coffee%20home%20if%20you%20like%20the%20taste.%20250%20gm.%20of%20South%20American%20and%20East%20African%20arabica%20and%20Indian%20robusta%20coffee%20mixture%20cost%20Ls%202.70.%3CBR%3E%3CBR%3EA%20variety%20of%2010%20various%20coffee%20brands%20are%20available.%20Cup%20of%20Cafe%20Mocha%20with%20steamed%20milk%3B%20hot%20chocolate%20and%20cream%20top%20costs%20Ls%200.75.%20For%20those%20who%20are%20in%20for%20pastries%20and%20donuts%20a%20wide%20choice%20of%20home%20bakery%20and%20cookies%20is%20available%20%28rolls%2C%20pies%2C%20croissants%29%20for%20just%20Ls%200.15%20apiece.%20Although%20if%20you%20enter%20the%20cafe%20after%2018.00%20you%27ll%20have%20to%20choose%20from%20what%20is%20left.%3CBR%3E%3CBR%3EAccording%20to%20the%20menu%20you%20call%20choose%20%22extras%22%20while%20ordering%20coffee.%20For%20example%20if%20you%20want%20to%20taste%20some%20cappuccino%20your%20can%20ask%20to%20add%20a%20drop%20of%20espresso%20to%20add%20extra%20strength.%20You%20can%20also%20enhance%20the%20flavor%20by%20caramel%2C%20chocolates%2C%20vanilla%2C%20strawberry%2C%20almond%20or%20other%20syrups%20as%20well%20as%20cream.%3CBR%3E%3CBR%3EAlcohol%20drinks%20are%20not%20offered%20and%20smoking%20is%20not%20restricted.%20You%20can%20while%20away%20the%20time%20over%20recent%20press%20publications.%20Juice%2C%20tea%2C%20water%20and%20other%20drinks%20are%20offered%20to%20those%20who%20are%20not%20coffee%20fans.%20Cafe%20is%20open%20from%208%20to%2022.00.',95,1,'publications'),(269,'2002-02-21 17:03:13','2002-02-21 17:18:52',1,0,'CAFFE LATTE /img/cup2.gif Foamed milk\r\nNo more then layer foamed decorate... [CAF-AY LA-TAY]\r\n\r\nFoamed decorate topping drink.\r\n\r\nSteamed milk\r\nThe main ingredient this espresso based drink made freshly steamed milk which heated 170°C degrees special mug\r\n\r\nEspresso\r\nThe grace aromatic revealed with each smooth sip.to sip.',96,1,'caffe latte'),(277,'2002-02-21 17:04:54','2002-02-21 17:04:54',1,0,'CAFFE AMERICANO /img/cup3.gif water\r\nFresh, pure water boiled just right... [CAF-AY A-MER-I-CAH-NO]\r\n\r\nHot right condition, added espresso. amounts temperature don\'t allow taste drink lost.\r\n\r\nEspresso\r\nIts balance sweet flavor, smoky aroma tangy kick lies somewhere between caramel sweetness profound intensity French Roast. checkbox',96,1,'CAFFE AMERICANO'),(285,'2002-02-21 17:09:19','2002-02-21 17:16:17',1,0,'ESPRESSO PANNA /img/cup5.gif Whipped cream\r\nWhipped cream topping espresso shot makes... [ESS-PRESS-O CONE PA-NA]\r\n\r\nWhipped makes unique taste that must order understand.\r\n\r\nEspresso\r\nAn intense balanced coffee, it\'s roasted somewhat darker than traditional Italian espresso.',96,1,'ESPRESSO CON PANNA'),(294,'2002-02-21 17:17:31','2002-02-21 17:17:31',1,0,'ESPRESSO /img/cup4.gif Preparation time\r\nCoffee Nation standard preparation time... [ESS-PRESS-O]\r\n\r\nPreparation time espresso portion approximately seconds.\r\n\r\nIngredients\r\nThe consists 7grams finely grinded coffee that might purchased separately stores.\r\n\r\nResult\r\nEspresso portion- refreshing aromatic checkbox',96,1,'ESPRESSO'),(305,'2002-02-21 17:50:01','2002-05-30 10:29:04',1,0,'Contact Information Address Our%20Address%3A%3CBR%3E%3CBR%3EKalku%201%3CBR%3ERiga%3CBR%3ELatvia%3CBR%3E%3CBR%3EPhone%3A%20%28+371%29%20542-5677%3CBR%3EFax%3A%20%28+371%29%20542-5678%3CBR%3EEmail%3A%20coffee@krazyhouse.lv',95,1,'contacts');",

"INSERT INTO Groups (ID, parentID, name, sortNr, templateID, inheritAccess, visible) VALUES (1,0,'root',1,0,0,1),(97,1,'Hot News',0,95,0,1),(104,1,'Products',0,96,1,1);",

"INSERT INTO GrpSec (GrpID, RoleID, Access) VALUES (97,1,'WR'),(97,2,'PWR'),(104,1,'WR'),(104,2,'PWR'),(97,122,'R'),(104,122,'R');",

"INSERT INTO OIDTable (ID) VALUES (495);",

"INSERT INTO Role (RoleID, Name) VALUES (1,'Admin'),(2,'Editor'),(122,'Guest');",

"INSERT INTO TxtContents (ID, content, name, Lang) VALUES (101,'About Us','title',1),(102,'Welcome to KrazyHouse\'s web site','sdescr',1),(103,'Welcome%20to%20KrazyHouse%27s%20web%20site.%20Our%20goal%20is%20to%20provide%20you%20with%20an%20easy-to-navigate%20site%20that%20makes%20shopping%20effortless.%3CBR%3E%3CBR%3EWe%20offer%20over%202%2C500%20of%20the%20most%20requested%20janitorial%20products.%20Our%20line%20is%20diverse%2C%20encompassing%20the%20top%20manufacturers%20and%20the%20highest%20quality%20products.%20%3CBR%3E%3CBR%3EThis%2C%20combined%20with%20our%20volume%20buying%20power%20and%20controlled%20costs%2C%20allows%20us%20to%20offer%20you%20the%20best%20available%20products%20at%20the%20most%20competitive%20prices.%20Your%20order%20is%20shipped%20from%20the%20closest%20of%20our%2025%20warehouses%2C%20insuring%20fast%20delivery%20and%20low%20freight%20costs.%20But%20it%20does%20not%20end%20there.%20We%20want%20to%20continue%20to%20earn%20your%20trust%2C%20and%20to%20that%20extent%2C%20every%20purchase%20is%20backed%20by%20our%20100%25%20Satisfaction%20Guarantee.%20%3CBR%3E%3CBR%3EWe%20encourage%20you%20to%20join%20our%20worldwide%20base%20of%20customers%20and%20experience%20for%20yourself%20how%20we%20combine%20state-of-the-art%20technology%20with%20good%20%22old-%20fashioned%22%20service.','descr',1),(108,'CAPPUCHINO ','title',1),(109,'/img/cup1.gif','picture',1),(110,'Foamed milk\r\nCappuccino\'s main ingredient...','sdescr',1),(111,'[CAP-UH-CHEE-NO]\r\n\r\nFoamed milk\r\nCappuccino\'s main ingredient. The drinks visit card, which comes last to fill up the cup and is topped with powder chocolate.\r\n\r\nSteamed milk\r\nSilky, fleshly boiled milk, which is heated up to 150 - 170 °C temperature and gently added until the cup is about 2/3 full\r\n\r\nEspresso\r\nOur espresso roast, smooth and satisfying, made from a special selection of different beans with a dominant taste of rabusta and arabica\r\n','descr',1),(115,'Publications and Reviews','title',1),(116,'Articles about our Bar','sdescr',1),(117,'Hansa%20Times%3CBR%3E12.09.2001%3CBR%3ERIGA%3CBR%3E%3CBR%3ECrazyhouse%20Bar%20is%20an%20express-bar%20in%20a%20traditional%20sense%20of%20this%20word.%20Therefore%20those%20who%20are%20used%20to%20have%20heated%20food%20or%20partake%20salads%20at%20lunch%20will%20feel%20disappointed%20here.%20New%20Express%20bar%20at%20Valdemara%20Center%20is%20the%20only%20place%20in%20Riga%20where%20you%20can%20taste%20special%20coffee%20made%20of%20Crazyhouse%20Bar%20branded%20ground%20coffee%20beans.%20You%20cat%20fetch%20some%20coffee%20home%20if%20you%20like%20the%20taste.%20250%20gm.%20of%20South%20American%20and%20East%20African%20arabica%20and%20Indian%20robusta%20coffee%20mixture%20cost%20Ls%202.70.%3CBR%3E%3CBR%3EA%20variety%20of%2010%20various%20coffee%20brands%20are%20available.%20Cup%20of%20Cafe%20Mocha%20with%20steamed%20milk%3B%20hot%20chocolate%20and%20cream%20top%20costs%20Ls%200.75.%20For%20those%20who%20are%20in%20for%20pastries%20and%20donuts%20a%20wide%20choice%20of%20home%20bakery%20and%20cookies%20is%20available%20%28rolls%2C%20pies%2C%20croissants%29%20for%20just%20Ls%200.15%20apiece.%20Although%20if%20you%20enter%20the%20cafe%20after%2018.00%20you%27ll%20have%20to%20choose%20from%20what%20is%20left.%3CBR%3E%3CBR%3EAccording%20to%20the%20menu%20you%20call%20choose%20%22extras%22%20while%20ordering%20coffee.%20For%20example%20if%20you%20want%20to%20taste%20some%20cappuccino%20your%20can%20ask%20to%20add%20a%20drop%20of%20espresso%20to%20add%20extra%20strength.%20You%20can%20also%20enhance%20the%20flavor%20by%20caramel%2C%20chocolates%2C%20vanilla%2C%20strawberry%2C%20almond%20or%20other%20syrups%20as%20well%20as%20cream.%3CBR%3E%3CBR%3EAlcohol%20drinks%20are%20not%20offered%20and%20smoking%20is%20not%20restricted.%20You%20can%20while%20away%20the%20time%20over%20recent%20press%20publications.%20Juice%2C%20tea%2C%20water%20and%20other%20drinks%20are%20offered%20to%20those%20who%20are%20not%20coffee%20fans.%20Cafe%20is%20open%20from%208%20to%2022.00.','descr',1),(118,'checkbox','as_new',1),(272,'CAFFE LATTE ','title',1),(273,'/img/cup2.gif','picture',1),(274,'Foamed milk\r\nNo more then a 5mm layer is foamed to decorate...','sdescr',1),(275,'[CAF-AY LA-TAY]\r\n\r\nFoamed milk\r\nNo more then a 5mm layer is foamed to decorate the topping of the drink.\r\n\r\nSteamed milk\r\nThe main ingredient of this espresso based drink is made out of a freshly steamed milk which is heated up to 150 - 170°C degrees in a special mug\r\n\r\nEspresso\r\nThe grace of our aromatic mix is revealed with each smooth sip.to decorate the topping of the drink.\r\n\r\nSteamed milk\r\nThe main ingredient of this espresso based drink is made out of a freshly steamed milk which is heated up to 150 - 170°C degrees in a special mug\r\n\r\nEspresso\r\nThe grace of our aromatic mix is revealed with each smooth sip.','descr',1),(276,'checkbox','as_new',1),(280,'CAFFE AMERICANO','title',1),(281,'/img/cup3.gif','picture',1),(282,'Hot water\r\nFresh, pure water boiled just to a right...','sdescr',1),(283,'[CAF-AY A-MER-I-CAH-NO]\r\n\r\nHot water\r\nFresh, pure water boiled just to a right condition, to be added to an espresso. The right amounts and the right temperature don\'t allow the taste of the drink to be lost.\r\n\r\nEspresso\r\nIts balance of sweet flavor, smoky aroma and tangy kick lies somewhere between the caramel sweetness and the profound intensity of French Roast.','descr',1),(284,'checkbox','as_new',1),(288,'ESPRESSO CON PANNA','title',1),(289,'/img/cup5.gif','picture',1),(290,'Whipped cream\r\nWhipped cream topping on an espresso shot makes...','sdescr',1),(291,'[ESS-PRESS-O CONE PA-NA]\r\n\r\nWhipped cream\r\nWhipped cream topping on an espresso shot makes a unique taste that one must try in order to understand.\r\n\r\nEspresso\r\nAn intense and balanced coffee, it\'s roasted somewhat darker than traditional Italian espresso.','descr',1),(297,'ESPRESSO','title',1),(292,'checkbox','as_new',1),(298,'/img/cup4.gif','picture',1),(299,'Preparation time\r\nCoffee Nation standard preparation time...','sdescr',1),(300,'[ESS-PRESS-O]\r\n\r\nPreparation time\r\nCoffee Nation standard preparation time of an espresso portion is approximately 20 seconds.\r\n\r\nIngredients\r\nThe portion consists of 7grams finely grinded coffee that might be purchased separately in any of our stores.\r\n\r\nResult\r\nEspresso portion- refreshing and aromatic','descr',1),(301,'checkbox','as_new',1),(308,'Contact Information','title',1),(309,'Our Address','sdescr',1),(310,'Our%20Address%3A%3CBR%3E%3CBR%3EKalku%201%3CBR%3ERiga%3CBR%3ELatvia%3CBR%3E%3CBR%3EPhone%3A%20%28+371%29%20542-5677%3CBR%3EFax%3A%20%28+371%29%20542-5678%3CBR%3EEmail%3A%20coffee@krazyhouse.lv','descr',1),(486,'en','language',1),(491,'en','language',1),(493,'en','language',1);",

"INSERT INTO TxtDetails (DocID, TxtID) VALUES (98,101),(98,102),(98,103),(105,108),(105,109),(105,110),(105,111),(112,115),(112,116),(112,117),(112,118),(269,272),(269,273),(269,274),(269,275),(269,276),(277,280),(277,281),(277,282),(277,283),(277,284),(285,288),(285,289),(285,290),(285,291),(285,292),(294,297),(294,298),(294,299),(294,300),(294,301),(305,308),(305,309),(305,310),(305,493),(112,491),(98,486);",

"INSERT INTO User_Role (UserID, RoleID) VALUES (1,1),(1,2),(2,122);",

"INSERT INTO Users (UserID, Nick, Password, Name, SName, Email, DocID, Remarks) VALUES (1,'$AdminLogin','$AdminPasswd','$AdminName','$AdminSurname','$AdminEmail',0,''),(2,'Guest','','','','',0,'');",

"INSERT INTO formXgroup (formID, groupID, access) VALUES (100,1,'WR');",

"INSERT INTO pageCache (ID, updatePeriod, updateLast) VALUES (100,1,1017675762);",

"INSERT INTO templates (ID, name, cfgFile, frmID) VALUES (95,'HotNews','tmpl/HotNews.dtd',101),(96,'Products','tmpl/Products.dtd',102);"
);

foreach($inserts as $in){
preg_match("/INSERT INTO ([a-zA-Z_]+) \(/i", $in, $res);
$res=$res[1];
insertData($in, $res);
}

}
}


if ($errs==0) {
echo <<<out
<p>All tables successfully created and data inserted!
<p>Now you can start to work with your Open Effect. Please, refer to the second part of manual for more questions.
<p><b>This window now can be closed.</b>
out;
}
else {
echo <<<out
<p>There were problems via setup! Possible reasons:
<li><p>It is disallowed for your DB-account to create tables;
<li><p>Login/password for database were incorrect;
<li><p>You have not created database you have entered in options (possibly, you need to do it manually);
<li><p>Tables are already created and that's why you can already work.
<p>Please, refer to manual for more questions, check your setup files, or use "handly" creating of tables.
out;
}

echo <<<out
<p><b>Don't forget to DELETE installdemo_mysql.php file from your directory! If you already have installed core engine, you can also remove the whole directory "Install".
<br>DO IT RIGHT NOW!!!</b>
out;

break;

default:
if (count($err)==0){
echo <<<out
<p>Welcome to $instTitle!
<p>It takes only 1 step to create all necessary database tables, and update all necessary info.</p>
<p>Before installing, copying or modifying Open Effect, please, read the <a href="../license"><b>GPL license agreement</b></a>.
<p>Your data is:
<ul>
<li>Database type: $DB
<li>Database host: $DBhost
<li>Database username: $DBusr
<li>Database password: $DBpwd
<li>Database name: $DBname
<li>Admin email: $AdminEmail
</ul>

<p>Please fill in the form below to set yourself up as an administrator:

<form action="installdemo_mysql.php" method="post" name=dataform>
<input type="hidden" name="step" value="install">

<table border=0>
<tr>
<td><p>Admin Name</td>
<td><input type="text" size="35" name="AdminName" value="AdminName"></td>
</tr>
<tr>
<td><p>Admin Surname</td>
<td><input type="text" size="35" name="AdminSurname" value="AdminSurname"></td>
</tr>
<tr>
<td><p>Admin Login Name</td>
<td><input type="text" size="35" name="AdminLogin" value="admin"></td>
</tr>
<tr>
<td><p>Admin Password</td>
<td><input type="text" size="35" name="AdminPasswd" value="admin"></td>
</tr>
</table>
<input class="buttonz1" type=button value="Continue &gt;&gt;&gt;" onClick="JavaScript:checkForm();">
</form>

<script language=JavaScript>
<!--
function checkForm(){
var login, pass, name, surname, myReName, myRePass;
myReName=/^[a-z_]+$/i;
myRePass=/[a-z0-9_]+/i;

login=document.forms['dataform'].AdminLogin.value;
pass=document.forms['dataform'].AdminPasswd.value;
name=document.forms['dataform'].AdminName.value;
surname=document.forms['dataform'].AdminSurname.value;
if (login=='' || pass=='' || name=='' || surname==''){
alert ("Please, fill out all fields!");
}
else if (!login.match(myReName)) alert ("Incorrect login name, use only letters and _ sign!");
else if (!pass.match(myRePass)) alert ("Incorrect password, use only letters, digits and _ sign!");
else if (!name.match(myRePass)) alert ("Incorrect name, use only letters, digits and _ sign!");
else if (!surname.match(myRePass)) alert ("Incorrect surname, use only letters, digits and _ sign!");
else document.forms['dataform'].submit();
}
//-->
</script>

out;
}
else {
foreach($err as $e){
echo "<p><b>{$errors[$e]}</b>";
}
echo '<p><font color=red><b>'.count($err).' error(s) found. Script will not continue. Please, check your db_schemes.conf.php file!</b></font>';

}
}

}
else {
echo "<p>Installation file is missing. Please, check your directory for install_$DB.sql file!";
}
?>

</td></tr></table>
</td></tr></table>
</body>
</html>
<?php
$instTitle='Open Effect Install Script';
$errors=array(); $err=array();
$errors['dbmissing']='Database/configuration error: Database is missing or incorrect.';
$errors['dbincorrect']='Database/configuration error: incorrect Database configuration.';
$errors['admin_email']='You have not defined administrative email.';

include ('../EngineFiles/conf/db_schemes.conf.php');
?>
<!DOCTYPE html>
<html>
<HEAD><TITLE><?=$instTitle?></TITLE>
<LINK href="install.css" type="text/css" rel="STYLESHEET">
</HEAD>
<BODY bgcolor="#E7EBFF">

<table width="100%" border="0" cellspacing="0" cellpadding="1">
<tr><td bgcolor="#B7C9FF">

<table width="100%" border="0" cellspacing="0" cellpadding="5" bgcolor="#E7EBFF">
<tr bgcolor="#B7C9FF">
<td width="249"><img src="./logo.gif" border="0" alt="Open Effect" width="249" height="65"></td>
<td width="100%" valign=middle><span class="captionText"><?=$instTitle?></span></td>
</tr>
<tr>
<td colspan=2>

<?php
$DB=$db_schemes['default']['type'];
$DBhost=$db_schemes['default']['host'];
$DBusr=$db_schemes['default']['user'];
$DBpwd=$db_schemes['default']['password'];
$DBname=$db_schemes['default']['database'];
$AdminEmail=$db_schemes['default']['errors_to'];

if (file_exists("./install_$DB.sql")) {

/* Check for database working properly */
$connStr = "mysql:host=".$DBhost.";dbname=".$DBname;
try {
  $conn = new PDO($connStr, $DBusr, $DBpwd);
} catch (PDOException $e) {
  switch($e->getCode()) {
  case 1698:
    $err[] = 'dbincorrect';
    break;
  case 1049:
    $err[] = 'dbmissing';
    break;
  default:
    die("Unhandled DB Error");
  }
}

if ($AdminEmail=='') $err[]='admin_email';

/* GO ON */
if (isset($_POST['step'])) {
  $step = $_POST['step'];
} else {
  $step = null;
}

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

try {
  $rs = $conn->exec($stringsSQL[$i].');');
} catch (PDOException $e) {
  echo "<p>Operation failed: <b>".$e->getMessage()."</b>";
  $errs++;
}
//preg_match("/CREATE TABLE ([a-zA-Z_]+) \(/i", $stringsSQL[$i], $tbName);
//$tbName=$tbName[1];

//else echo "<p>Table {$tbName} successfully created...";
}
}
if ($errs==0) {

function insertData($req, $reason){
global $errs;
global $conn;
try {
  $conn->exec($req);
} catch (PDOException $e) {
  $errs++;
  echo "<p>".$reason." data WAS NOT added, reason: ".$e->getMessage();
}
}
//echo "<p>$reason data successfully added...";

$AdminLogin=$_POST['AdminLogin'];
$AdminPasswd=$_POST['AdminPasswd'];
$AdminNick=$_POST['AdminNick'];
$AdminSurname=$_POST['AdminSurname'];

$inserts=array(
"INSERT INTO Groups (ID, parentID, name, sortNr, templateID, inheritAccess, visible) VALUES (1,0,'root',1,0,0,1),(2,1,'group',1,0,0,1);",
"INSERT INTO GrpSec (GrpID, RoleID, Access) VALUES (1,1,'WRP'),(1,2,'WRP'),(2,1,'WRP'),(2,2,'WRP');",
"INSERT INTO OIDTable (ID) VALUES (14);",
"INSERT INTO User_Role (UserID, RoleID) VALUES (1,1),(1,2);",
"INSERT INTO Role (RoleID, Name) VALUES (1,'Admin'),(2,'Editor');",
"INSERT INTO Users (UserID, Nick, Password, Name, SName, Email, DocID, Remarks) VALUES (1,'$AdminLogin','$AdminPasswd','$AdminNick','$AdminSurname','$AdminEmail',0,'');",
"INSERT INTO formXgroup (formID, groupID, access) VALUES (100,1,'WR');",
"INSERT INTO pageCache (ID, updatePeriod, updateLast) VALUES (100,1,986335077);"
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
<p><b>Don't forget to DELETE install_mysql.php file from your directory!
<br>DO IT RIGHT NOW!!!</b>
out;

break;

default:
if (count($err)==0){
echo <<<out
<p>Welcome to Open Effect $instTitle!
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

<form action="install_mysql.php" method="post" name=dataform>
<input type="hidden" name="step" value="install">

<table border=0>
<tr>
<td><p>Admin Name</td>
<td><input type="text" size="35" name="AdminNick" value="AdminName"></td>
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
var login, nick, pass, myReName, myRePass;
myReName=/^[a-z_]+$/i;
myRePass=/[a-z0-9_]+/i;

login=document.forms['dataform'].AdminLogin.value;
nick=document.forms['dataform'].AdminNick.value;
pass=document.forms['dataform'].AdminPasswd.value;
if (login=='' || nick=='' || pass==''){
alert ("Please, fill out all fields!");
}
else if (!nick.match(myReName)) alert ("Incorrect nickname, use only letters and _ sign!");
else if (!login.match(myReName)) alert ("Incorrect login name, use only letters and _ sign!");
else if (!pass.match(myRePass)) alert ("Incorrect password, use only letters, digits and _ sign!");
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

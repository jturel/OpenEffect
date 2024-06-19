<?

/*function fix_php_upload_bug($tmp) { 
$infile=fopen($tmp,"r"); // Open the file for the copy 
$outfile=fopen("$tmp.new","w"); // create a new temp file 
$header=fgets($infile,255); //get the 1st line (netscape sometimes doesn't add a Content-type line) 
//if its more than just a \r\n sequence then 
if (strlen($header)>2) $header=fgets($infile,255); //get next line also 
while(!feof($infile)) { // Loop through the remaining file 
$temp=fread($infile,128); 
fwrite($outfile,$temp,strlen($temp)); //copying contents to new temp file 
} 
fclose($outfile); 
fclose($infile); 
copy("$tmp.new","$tmp"); //replace the original with our new bug fixed file 
unlink("$tmp.new"); //and delete the new file 
return filesize($tmp); //return a true file size 
} */

   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################


   global $create, $dirName, $dir;
   global $upload, $fileName, $fileName_name, $fileName_type, $fileName_size;
   global $REQUEST_URI, $track_vars;
   $dir = trim($dir);
   
   $cfg = $this->kernel->cfger->reg("FILE CONF", CONF_PLUGIN_DIR."file.conf");
   $rootDir = $cfg->get("rootDir");

####################################   
# UPPLOAD FILE
/*
   if ($upload && $fileName) {
//      print "[$fileName][$upload, $fileName, $fileName_name, $fileName_type, $fileName_size, $dir]<br>";
      fix_php_upload_bug($fileName);
      $uFileName = trim($rootDir)."/".trim($dir)."/".trim($fileName_name);
      print $uFileName."<br>";
      print $fileName."<br>";
      print $fileName_type."<br>";
      print $fileName_size."<br>";
      print $track_vars."<br>";
      print "[$fileName, $uFileName]<br>";
      if (!@copy($fileName, $uFileName)) 
          print "Error";
   }
*/

####################################   
# CREATE DIR
   if ($create && $dirName) {


      $rDirName = $rootDir."/".$dir."/".$dirName;
      if (strpos(" ".str_replace("/", "", $rDirName), str_replace("/", "", $rootDir))) {
         if (@mkdir($rDirName, 0700)) 
         {} 
         else print "Error [$rDirName]";
      } else print "Access DENY to this directory";
   }


####################################   
# FILE TREE
   $form = new filePlugin($this, "file.conf");

   global $deleteF;
   if ($deleteF) $form->delete();   
   $form->parse();

   
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
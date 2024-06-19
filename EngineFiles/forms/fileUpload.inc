<?
function fix_php_upload_bug($tmp) { 
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
} 

   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################

   global $upload, $fileName, $fileName_name, $fileName_type, $fileName_size, $dir;
   global $REQUEST_URI, $track_vars;

   $cfg = $this->kernel->cfger->reg("FILE CONF", CONF_PLUGIN_DIR."file.conf");
   $rootDir = $cfg->get("rootDir");
$ttr = IMG_BASE_DIR;
   
   $tmpl = new templateClass(TMPL_DIR, "remove");
   $tmpl->set_file(array("body" => "plugins/fileUpload.tmpl"));
   $tmpl->set_block("body", "close_block", "closeBlock");
   $tmpl->set_var(array("_LINK_SELF" => $REQUEST_URI,
                        "DIR"        => $dir));

   if ($upload && $fileName) {
      //fix_php_upload_bug($fileName);
      $uFileName = trim($ttr)."/".trim($dir)."/".trim($fileName_name);
//      $uFileName = trim($rootDir)."/".trim($dir)."/".trim($fileName_name);
//echo "zdes: $ttr & $dir & $fileName_name";

      print $uFileName."<br>";
      print $dir."<br>";
      print $fileName."<br>";
      print $fileName_type."<br>";
      print $fileName_size."<br>";
      print $track_vars."<br>";
      if (@copy($fileName, $uFileName)) {
         $tmpl->parse("closeBlock", "close_block");
      } else print "Error";
   }

   $tmpl->parse("out", array("body"));
   $out = $tmpl->get("out");

   $this->parseStr("BODY", $out, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
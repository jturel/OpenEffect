<?

   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################

   global $create, $dirName, $dir;
   global $REQUEST_URI;

   $idir = IMG_BASE_DIR;
   
   $cfg = $this->kernel->cfger->reg("FILE CONF", CONF_PLUGIN_DIR."file.conf");
   $rootDir = $cfg->get("rootDir");

   $tmpl = new templateClass(TMPL_DIR, "remove");
   $tmpl->set_file(array("body" => "plugins/createDir.tmpl"));
   $tmpl->set_block("body", "close_block", "closeBlock");
   $tmpl->set_var(array("_LINK_SELF" => $REQUEST_URI,
                        "DIR"        => $dir));

   if ($create && $dirName) {
      $rDirName = $idir.$dir."/".$dirName;
      if (strpos(" ".str_replace("/", "", $rDirName), str_replace("/", "", $idir))) {
         if (@mkdir($rDirName, 0700)) {
           $tmpl->parse("closeBlock", "close_block");
         } else print "Error [$rDirName]";
      } else print "Access DENY to this directory [$rDirName]";
   }

   $tmpl->parse("out", array("body"));
   $out = $tmpl->get("out");

   $this->parseStr("BODY", $out, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
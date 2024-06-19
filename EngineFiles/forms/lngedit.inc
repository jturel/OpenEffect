<?
//   global $debugip;
//   $debugip = 0;
//   $this->kernel->debug_ip = 0;

   $page = &$this->start($this->kernel->cfg->get('mainTemplate'));
#####################################################
   $this->kernel->secure->accessForm();

      $root_dir = LANGUAGE_DIR;
      $template = TMPL_DIR.'plugins/lngedit.tmpl';

      global $save,$name,$Text;

      if (!$name) $name = $this->kernel->cfg->get('defaultLangName').'/forms/main.lng';

      $filename = $root_dir.$name;
      if ($save&&$Text) {
         $fp = fopen ($filename, 'w');
         $Text = str_replace('\"','"',$Text);
         fwrite ($fp, $Text);
         fclose($fp);
      } else {
         $fp = fopen ($filename, 'r');
         $Text = fread($fp, filesize ($filename) );
         fclose($fp);
      }
      $Text = str_replace('<','&lt;',$Text);

      $this->kernel->classLoader->checkClass("templateClass");
      $tmpl = new templateClass($root_dir, "remove");
      $tmpl->halt_on_error = "yes";

      $tmpl->set_file(array("base_qwe43" => $template));
      $tmpl->set_var('TEXT',$Text);

      $tmpl->parse("out", array("base_qwe43"));

   $this->parseStr("BODY", $tmpl->get("out"), true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get('mainTemplateLng'));
   
?>
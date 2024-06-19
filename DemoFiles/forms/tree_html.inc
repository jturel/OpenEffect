<?
   global $debugip;
    $debugip = 0;
   $this->kernel->debug_ip = 0;
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");

   $this->parseFile('BODY','plugins/tree_html.tmpl',false,TMPL_DIR);

   if ($this->groupNr) {
      $inStr = $this->tmpl->get_var('BODY');
      $outStr = str_replace("{GROUPID}", $this->groupNr, $inStr);
      $this->tmpl->set_var(array('BODY' => $outStr));
   }


#####################################################   
//   usleep (5000000);
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
<?
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");

   $this->parseFile('BODY','plugins/documentLincContainer.tmpl',false,TMPL_DIR);

   if ($this->groupNr) {
      $inStr = $this->tmpl->get_var('BODY');
      $outStr = str_replace("{GROUPID}", $this->groupNr, $inStr);
      $this->tmpl->set_var(array('BODY' => $outStr));
   }

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
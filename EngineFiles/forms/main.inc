<?
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
   $this->kernel->secure->accessForm();
   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");

   $this->parseFile('BODY','plugins/main.tmpl',false,TMPL_DIR);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
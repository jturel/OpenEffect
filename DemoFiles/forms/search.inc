<?
   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
   $this->kernel->secure->accessForm();
//   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");

   $this->parse("BODY", "formsearch", "search.conf");

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
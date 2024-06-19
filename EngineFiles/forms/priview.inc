<?
   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
   $this->kernel->secure->accessForm();
//   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");

   $this->parse("BODY", "priview");

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
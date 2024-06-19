<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

   $this->kernel->sysLog->put("Open admin frame [user list]");
   $form = new listPlugin($this, "users.conf");
   
   global $delete;
   if ($delete) $form->delete();

   $form->parse();
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
<?


   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
   $this->kernel->secure->accessForm();

   $this->kernel->sysLog->put("Open group frame");
   $form = new treePlugin($this, "groups.conf");
   
   global $delete;
   if ($delete) $form->delete();

   $form->parse();
   $this->parse("BODY", "lngSelectPlugin", "lngSelect.conf", true);
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
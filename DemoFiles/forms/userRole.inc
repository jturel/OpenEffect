<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

   $form = new userRolePlugin($this, "userRole.conf");
   
   global $delete, $save, $UserID;
   $form->tmpl->set_var("UserID", $UserID);
   if ($delete) $form->delete();
   if ($save) $form->save();

   $form->parse();
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
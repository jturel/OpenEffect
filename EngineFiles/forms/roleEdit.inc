<?

   $page = &$this->start($this->kernel->cfg->get("main1Template"));
#####################################################

   $form = new formPlugin($this, "roleEdit.conf");
   $form->tmpl->set_block("body", "close_block", "closeBlock");
   $form->action = $form->cfg->get("Action");

   global $save, $RoleID;
   $RoleID = ($RoleID ? $RoleID : 0);

   if ($save) {
      $RoleID = $form->getID($RoleID);
      $form->save("RoleID = $RoleID");
      $form->tmpl->parse("closeBlock", "close_block");
   }
   
   $form->readItem("RoleID = $RoleID");
   $form->parse();
   
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
   
   $form = new formPlugin($this, "userEdit.conf");
   $form->tmpl->set_block("body", "close_block", "closeBlock");
   $form->action = $form->cfg->get("Action");

   //if ($this->kernel->secure->user != 'Admin' && $this->kernel->secure->user != 'admin' ) {   
if ($this->kernel->secure->userID!=1) {
        print 'Edit access is only for Admin user!';
exit;      
//halt();
   }

   global $save, $UserID, $Password1, $Password2, $Password;
   $UserID = ($UserID ? $UserID : 0);

   if ($save && $Password1 == $Password2) {
      $Password = $Password1;
      $UserID = $form->getID($UserID);
      $form->save("UserID = $UserID");
      $form->tmpl->parse("closeBlock", "close_block");
      $apacheConf = new apacheConfPlugin($this, "userEdit.conf");
      $apacheConf->make();
      $this->kernel->log->put("Add User [$UserID] By user [".$this->kernel->secure->user."]<BR>");
   }
   
   $form->readItem("UserID = $UserID");
   $form->parse();
   
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
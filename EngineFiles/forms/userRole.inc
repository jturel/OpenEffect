<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

   $form = new userRolePlugin($this, "userRole.conf");

   if ($this->kernel->secure->userID!=1) {
   //if ($this->kernel->secure->user != 'Admin' && $this->kernel->secure->user != 'admin' ) {
        print 'Role access is only for Admin user!!!';
exit;      
//halt();
   }
 
   global $delete, $save, $UserID;
   $form->tmpl->set_var("UserID", $UserID);
   if ($delete) {
        $form->delete();
        $this->kernel->log->put("Delete UserRole [$UserID] By user [".$this->kernel->secure->user."]<BR>");
   }

   if ($save){
        $form->save();
        $this->kernel->log->put("Add UserRole [$UserID] By user [".$this->kernel->secure->user."]<BR>");
   }

   $form->parse();
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
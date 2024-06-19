<?

   $page = &$this->start($this->kernel->cfg->get('secondTemplate'));
#####################################################
   $this->kernel->secure->accessForm();

   global $uXr1;

   if ($this->kernel->secure->user!='Admin') {
      print 'Only for Admin user!!!';
      halt();
   }

   if ($uXr1) {
     $uXr = explode(',',$uXr1);
     $SqlStr = 'delete from '.$this->kernel->tab_cfg->get('userXroleTable').';';
     $result = $this->kernel->db->query($SqlStr);
     for ($i=0;$i<count($uXr);$i++){
          list($userID,$roleID) = explode('-',$uXr[$i]);
          $this->kernel->api->LinkUserToRole($roleID,$userID);
     }
   }
   
   $this->kernel->classLoader->checkClass('templateClass');
   $tmpl = new templateClass(TMPL_DIR, 'remove');
   $tmpl->halt_on_error = 'yes';
   $tmpl->set_file(array('body_qscv_asdf' => "plugins/secure.tmpl"));

   $tmpl->set_block('body_qscv_asdf','user_block','user');
   $tmpl->set_block('body_qscv_asdf','role_block','role');
   $tmpl->set_block('body_qscv_asdf','roleXuser_block','roleXuser');

   $SqlStr = 'select UserID, Nick from '.$this->kernel->tab_cfg->get('userTable').';';
   $result = $this->kernel->db->query($SqlStr);
   if ($result && $count = $result->numrows()) {
      for ($i=0;$i<$count;$i++){
          list ($ID,$Name) = $result->getrow();
          $tmpl->set_var(array('ID'   => $ID,'NAME' => $Name));
          $tmpl->parse('user','user_block', true);
      }
   }

   $SqlStr = 'select RoleID, Name from '.$this->kernel->tab_cfg->get('roleTable').';';
   $result = $this->kernel->db->query($SqlStr);
   if ($result && $count = $result->numrows()) {
      for ($i=0;$i<$count;$i++){
          list ($ID,$Name) = $result->getrow();
          $tmpl->set_var(array('ID'   => $ID,'NAME' => $Name));
          $tmpl->parse('role','role_block', true);
      }
   }

   $SqlStr = 'select UserID, RoleID from '.$this->kernel->tab_cfg->get('userXroleTable').';';
   $result = $this->kernel->db->query($SqlStr);
   if ($result && $count = $result->numrows()) {
      for ($i=0;$i<$count;$i++){
         list ($ID,$Name) = $result->getrow();
         $tmpl->set_var(array('USER'  => $ID,'ROLE' => $Name));
         $tmpl->parse('roleXuser','roleXuser_block', true);
      }
   } 

   $tmpl->parse('out', array('body_qscv_asdf'));
   $this->parseStr("BODY", $tmpl->get('out'), true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get('mainTemplateLng'));
   
?>
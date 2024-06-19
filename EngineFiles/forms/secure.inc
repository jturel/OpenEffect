<?

   $page = &$this->start($this->kernel->cfg->get('secondTemplate'));
#####################################################
   $this->kernel->secure->accessForm();

   global $uXr1,$delUser, $delRole, $save;

   //if ($this->kernel->secure->user != 'Admin' && $this->kernel->secure->user != 'admin' ) {
   if ($this->kernel->secure->userID!=1) {
      print 'Secure access is only for Admin user!';
exit;      
//halt();
   }

   $this->kernel->classLoader->checkClass('templateClass');
   $tmpl = new templateClass(TMPL_DIR, 'remove');
   $tmpl->halt_on_error = 'yes';
   $tmpl->set_file(array('body_qscv_asdf' => "plugins/secure.tmpl"));

   $tmpl->set_block('body_qscv_asdf','close_block','close');
   $tmpl->set_block('body_qscv_asdf','user_block','user');
   $tmpl->set_block('body_qscv_asdf','role_block','role');
   $tmpl->set_block('body_qscv_asdf','roleXuser_block','roleXuser');

   if ($uXr1) {
      if ($delUser) {
           $uXr = explode(',',$uXr1);
           for ($i=0;$i<count($uXr);$i++){
               $q = intval($uXr[$i]);
               if ($q>1) {
                  $this->kernel->log->put("Del User $q By user [".$this->kernel->secure->user."]<BR>");
                  $SqlStr = 'delete from '.$this->kernel->tab_cfg->get('userXroleTable')." where UserID = $q;";
                  $result = $this->kernel->db->query($SqlStr);
                  $SqlStr = 'delete from '.$this->kernel->tab_cfg->get('userTable')." where UserID = $q;";
                  $result = $this->kernel->db->query($SqlStr);   
               }
           }
      } else
      if ($delRole) {
           $uXr1 = intval($uXr1);
           $this->kernel->log->put("Del Role $uXr1 By user [".$this->kernel->secure->user."]<BR>");
           $SqlStr = 'delete from '.$this->kernel->tab_cfg->get('userXroleTable')." where RoleID = $uXr1;";
           $result = $this->kernel->db->query($SqlStr);
           $SqlStr = 'delete from '.$this->kernel->tab_cfg->get('roleTable')." where RoleID = $uXr1;";
           $result = $this->kernel->db->query($SqlStr);   
      }
      else if ($save) {
           $uXr = explode(',',$uXr1);
//           for ($i=0;$i<count($uXr);$i++){
//                list($userID,$roleID) = explode('-',$uXr[$i]);
               if (count($uXr)>2) {
                $SqlStr = 'delete from '.$this->kernel->tab_cfg->get('userXroleTable');//.' where RoleID = $RoleID;';
//               print "Del All  <BR>";
               }
                $result = $this->kernel->db->query($SqlStr);
//           }
           for ($i=0;$i<count($uXr);$i++){
                list($userID,$roleID) = explode('-',$uXr[$i]);
                $this->kernel->api->LinkUserToRole($roleID,$userID);
//               print "Add Role to User $roleID  => $userID  <BR>";
                $this->kernel->log->put("Add Role to User $roleID  => $userID By user [".$this->kernel->secure->user."]<BR>");
           }
      }
   }

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
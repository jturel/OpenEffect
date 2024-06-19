<?
function qwertyasdf($qq){
  if (is_array($qq)) $qq = implode (",", $Aread);
  return explode (",",$qq);
}

function ny_chg($docNr,&$form,&$formz){
   global $lists;
   global $save,$Apublic,$Awrite,$Aread,$Arole;
   global $REQUEST_URI, $delete, $RoleID, $DocID, $ListRoleID, $docs, $grps;
   global $rights, $Access;

     for ($i=1;$i<count($rights);$i++){
       list ($id,$Access) = explode('-',$rights[$i]);
       $id = intval($id);
       if (!$id) continue;

       print "<br>[$docNr] Save ($id): [$Access]<br>";
       $RoleID = $id;
       $DocID = intval($docNr);
       if ($Access)
          $formz->save("RoleID=$id AND DocID=".intval($docNr));
       else
          $formz->delete("RoleID=$id AND DocID=".intval($docNr));
     }

}

   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################

   global $lists;
   global $save,$Apublic,$Awrite,$Aread,$Arole;
   global $REQUEST_URI, $delete, $RoleID, $DocID, $ListRoleID, $docs, $grps;
   global $rights, $Access;

   $form = new formPlugin($this, "documentAccess.conf");
   $form->action = $form->cfg->get("Action");
   $form->tmpl->set_block("body", "role_block", "roleBlock");
   $form->tmpl->set_block("body", "access_block", "accessBlock");   
   $form->tmpl->set_block("body", "close_block", "closeBlock");

//,1-WR,2-PWR

   if ($save) {

print "$rights<br>";
               $formz = new formPlugin($this, "documentRole.conf");
               $rights = explode (",",$rights);

               $id = ($this->docNr ? $this->docNr : 0);
//               $groups = explode(',',$grps);
               $groups = explode(',',$docs[0]);

               if ($id)
                  ny_chg($id,$form,$formz);
               else {
                  print_r($groups);
                  print(count($groups).'<br>');
                  print_r($grps);
                  for ($i=0;$i<count($groups);$i++) 
                      ny_chg($groups[$i],$form,$formz);
               }
               $form->tmpl->parse("closeBlock", "close_block");
   } else {
           // Make list of Roles
           
           $Roles = $this->kernel->api->listOfRoles();

           foreach ($Roles as $k => $v) {
                 $form->tmpl->set_var('ID',$k);
                 $form->tmpl->set_var('NAME',$v);
                 $form->tmpl->parse("roleBlock", "role_block",true);
           }

           // Make role Acces list

           $id = ($this->docNr ? $this->docNr : 0);
           $id = explode(',',$docs[0]);
           if (count($id)==1) { 
              $id = $id[0];
   
//           print_r($id);
              $this->parent->docNr = $id;
              $this->kernel->docNr = $id;
              $form->readItem("ID=$id");

              if ($id) 
                  for ($i=0;$i<count($lists['role']) ;$i++){
                      $form->tmpl->set_var($lists['role'][$i]);
                      $form->tmpl->parse('accessBlock', 'access_block',true);
                  }
           }
           if (is_array($groups))
              $form->tmpl->set_var('groups',implode (',', $docs));
   }
   $form->parse();
    
   $this->parseStr("BODY", $form->html, true);   

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
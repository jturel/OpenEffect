<?
   function ny_chg($groupNr,&$form,&$formz){
      print ("$groupNr,$form,$formz <br>");
      global $REQUEST_URI, $save, $delete, $RoleID, $GrpID, $groups;
      global $rights, $Access, $inheritAccess;

               print $form->kernel->groupNr;
               print $formz->kernel->groupNr;
               for ($i=1;$i<count($rights);$i++){
                      list ($id,$Access) = explode('-',$rights[$i]);
                      $id = intval($id);
                      if (!$id) continue;
                   
                      $formz->delete("GrpID=$id");
//                    $form->save("ID=$id");
                   
                    print "<br>Doc [$groupNr] Save ($id): [$Access]<br>";
                    $RoleID = $id;
                    $GrpID = intval($groupNr);
                    if ($Access)
                       $formz->save("RoleID=$id AND GrpID=".intval($groupNr));
                    else
                       $formz->delete("RoleID=$id AND GrpID=".intval($groupNr));
               }
   }

   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################

   global $lists;
   global $save,$Apublic,$Awrite,$Aread,$Arole;
   global $REQUEST_URI, $delete, $RoleID, $GrpID, $grps,$groups;
   global $rights, $Access, $inheritAccess;

   $form = new formPlugin($this, "groupAccess.conf");
   $form->action = $form->cfg->get("Action");
   $form->tmpl->set_block("body", "role_block", "roleBlock");
   $form->tmpl->set_block("body", "access_block", "accessBlock");   
   $form->tmpl->set_block("body", "close_block", "closeBlock");

//,1-WR,2-PWR

   if ($save) {

         $formz = new formPlugin($this, "groupRole.conf");
         $rights = explode (",",$rights);
//print "$rights<br>";
         $groups = explode(',',$grps);
//         $groups = $grps;

         $id = ($this->groupNr ? $this->groupNr : 0);
         if ($id)
            ny_chg($id,$form,$formz);
         else {
            print_r($groups);
            print(count($groups).'<br>');
//            print_r($grps);
            for ($i=0;$i<count($groups);$i++) 
                 ny_chg($groups[$i],$form,$formz);
         }
            
         $form->tmpl->parse("closeBlock", "close_block");
      $this->kernel->api->updateGroupinfo($this->groupNr,array('inheritAccess' => $inheritAccess?'1':'0'));

//      $form->tmpl->parse("closeBlock", "close_block");
   } else {
           $id = ($this->groupNr ? $this->groupNr : 0);
   
           $Roles = $this->kernel->api->listOfRoles();

           foreach ($Roles as $k => $v) {
              $form->tmpl->set_var('ID',$k);
              $form->tmpl->set_var('NAME',$v);
              $form->tmpl->parse("roleBlock", "role_block",true);
           }
           if ($id) {
              $form->readItem("ID=$id");
              for ($i=0;$i<count($lists["role"]) ;$i++){
                 $form->tmpl->set_var($lists["role"][$i]);
                 $form->tmpl->parse("accessBlock", "access_block",true);
              }
           }
           if (is_array($groups))
              $form->tmpl->set_var('groups',implode (",", $groups));
   }
   $form->parse();
    
   $this->parseStr("BODY", $form->html, true);   

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
?>
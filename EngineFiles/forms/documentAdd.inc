<?

   $page = &$this->start($this->kernel->cfg->get("main1Template"));
#####################################################

   $form = new formPlugin($this, "documentAdd.conf");
   $form->tmpl->set_block("body", "close_block", "closeBlock");
   $form->action = $form->cfg->get("Action");

   global $save, $ID, $templateID;
   $ID = ($this->docNr ? $this->docNr : 0);


   if ($save) {
/*      if (!$ID) {
         global $UserID, $LastUpdate, $RecTime;
                $UserID = $this->kernel->secure->userID;
                $RecTime = $LastUpdate = date("Y-m-d H:i:s");
      }
      $ID     = $form->getID($ID);
      $form->save("ID = $ID");
      
      if ($ID && $this->groupNr && !$this->docNr) {
                $defRole   = $form->cfg->get("defaultRoleID");
                $defAccess = $form->cfg->get("defaultRoleAccess");
                if (!is_array($defRole))
                   $this->kernel->api->magicSecurityDoc($ID, $defRole, $defAccess);
                else for ($Cn = 0; $Cn < count($defRole); $Cn++)
                         $this->kernel->api->magicSecurityDoc($ID, $defRole[$Cn], $defAccess[$Cn]);
         $this->kernel->api->createLinkGroupToDoc($this->groupNr, $ID);
      }
*/      
      $form->tmpl->set_var(
                              array(
                                     'templateID'   =>   $templateID,
                                     '_GROUP_ID'    =>   $this->groupNr
                                   )
                          );
      $form->tmpl->parse("closeBlock", "close_block");
   }
   
   $form->readItem("ID=$ID");
   $form->parse();
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
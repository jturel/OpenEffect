<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

   $form = new formPlugin($this, "groupEdit.conf");
   $form->tmpl->set_block("body", "close_block", "closeBlock");
   $form->action = $form->cfg->get("Action");

   global $save, $ID, $sortNr;
   $ID = ($ID ? $ID : $this->groupNr ? $this->groupNr : 0);

   if ($save) {
      if (!$ID) $new = true; else $new = false;
      $ID     = $form->getID($ID);
      $sortNr = $form->getID($sortNr);
      $form->save("ID = $ID");
      if ($new) {
                $inAccess = $this->kernel->secure->group->getInheritAccess($ID);
                if (!is_array($inAccess)) {
                   $defRole   = $form->cfg->get("defaultRoleID");
                   $defAccess = $form->cfg->get("defaultRoleAccess");
                } else list($defRole, $defAccess) = $inAccess;
                if (!is_array($defRole))
                   $this->kernel->api->magicSecurityGroup($ID, $defRole, $defAccess);
                else for ($Cn = 0; $Cn < count($defRole); $Cn++)
                         $this->kernel->api->magicSecurityGroup($ID, $defRole[$Cn], $defAccess[$Cn]);
      }
      $form->tmpl->parse("closeBlock", "close_block");
   }
   
   $form->readItem("ID = $ID");
   $form->parse();
   
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
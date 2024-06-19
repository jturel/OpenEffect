<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

   global $REQUEST_URI, $save, $delete, $RoleID;
   global $Access, $Access_R, $Access_W, $Access_P;

   $form = new formPlugin($this, "groupRole.conf");
   $form->tmpl->set_block("body", "close_block", "closeBlock");
   $form->action = $REQUEST_URI;
   $RoleID = ($RoleID ? $RoleID : 0);

   if ($save) {
      $Access = "";
      if ($Access_R) $Access .= "R";
      if ($Access_W) $Access .= "W";
      if ($Access_P) $Access .= "P";
   
      $form->save("RoleID=$RoleID AND GrpID=".$this->groupNr);
      $form->tmpl->parse("closeBlock", "close_block");
   }
   if ($delete) $form->delete("RoleID=$RoleID AND GrpID=".$this->groupNr);

   $form->readItem("RoleID=$RoleID AND GrpID=".$this->groupNr);

   $Access = strtoupper($Access);
   if (strpos(" ".$Access, "R")) $Access_R = 1;
   if (strpos(" ".$Access, "W")) $Access_W = 1;
   if (strpos(" ".$Access, "P")) $Access_P = 1;

   $form->parse();
   
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
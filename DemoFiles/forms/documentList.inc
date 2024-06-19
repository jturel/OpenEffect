<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
      
   $list = new documentListPlugin($this, "documentList.conf");
   $list->tmpl->set_block("body", "close_block", "closeBlock");
   $list->tmpl->set_block("body", "addDocWithOutTmpl_block", "addWOBlock");
   $list->tmpl->set_block("body", "addDocWithTmpl_block",    "addWBlock");
   $list->tmpl->set_block("body", "tree_block", "TreeBlock");

   $SqlStr = "SELECT templateID FROM ".$this->kernel->tab_cfg->get("groupTable")."
              WHERE ID = ".$this->groupNr;
   $result = $this->kernel->db->query($SqlStr);
   $tmplID = 0;
   if ($result && $result->numrows()) list($tmplID) = $result->getrow();
   if ($tmplID) $list->tmpl->parse("addWBlock", "addDocWithTmpl_block");
           else $list->tmpl->parse("addWOBlock", "addDocWithOutTmpl_block");

   global $save;
   if ($save) {
//      $ID = $this->kernel->api->createDocument($this->groupNr, $tmplID);
//      $defRole   = $list->cfg->get("defaultRoleID");
//      $defAccess = $list->cfg->get("defaultRoleAccess");
//      if (!is_array($defRole))
//              $this->kernel->api->magicSecurityDoc($ID, $defRole, $defAccess);
//       else for ($Cn = 0; $Cn < count($defRole); $Cn++)
//                     $this->kernel->api->magicSecurityDoc($ID, $defRole[$Cn], $defAccess[$Cn]);
      $list->tmpl->set_var("DOC_ID", $ID);
      $list->tmpl->parse("closeBlock", "close_block");
   }

   
   $list->pubSave();
   $tree = $this->kernel->api->getGroupTree($this->groupNr);
//   print count($tree);
   for ($i=1;$i<count($tree) ;$i++){
//      print "[$tree[$i]]";
      $list->tmpl->set_var("ID", $tree[$i]);
      $list->tmpl->parse("TreeBlock", "tree_block",true);
   }

   global $delete;
   if ($delete)
   $list->delete();
   $list->parse("x.GrpID=".$this->groupNr);
   
   $this->parseStr("BODY", $list->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
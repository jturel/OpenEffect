<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
      
   $list = new documentListPlugin($this, "list.conf");
   $list->tmpl->set_block("body", "close_block", "closeBlock");
   $list->tmpl->set_block("body", "addDocWithOutTmpl_block", "addWOBlock");
   $list->tmpl->set_block("body", "addDocWithTmpl_block",    "addWBlock");

   $SqlStr = "SELECT templateID FROM ".$this->kernel->tab_cfg->get("groupTable").
             " WHERE ID = ".$this->groupNr;
   $result = $this->kernel->db->query($SqlStr);
   $tmplID = 0;
   if ($result && $result->numrows()) list($tmplID) = $result->getrow();
   if ($tmplID) $list->tmpl->parse('addWBlock', 'addDocWithTmpl_block');
           else $list->tmpl->parse('addWOBlock', 'addDocWithOutTmpl_block');

   $list->pubSave();

   $list->parse("x.GrpID=".$this->groupNr);
   
   $this->parseStr("BODY", $list->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
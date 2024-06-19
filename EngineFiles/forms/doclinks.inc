<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

   global $check;
   $form = new treePlugin($this, "doclink.conf");
   $form->tmpl->set_block("body", "close_block", "closeBlock");
   $form->xSql    = "DocID=".$this->docNr." AND GrpID=";
   $form->xAddSql = $this->docNr.",";
   $form->predadiction = '';
//   $form->recursive = 1;
   $form->withfiles = 1;
   
   global $save;
   if ($save) {
      $form->saveX("DocID = ".$this->docNr);
      $form->tmpl->parse("closeBlock", "close_block");
   }
//   if ($delete) $form->delete();

   $check = $this->kernel->api->getLinkedGroup($this->docNr);
   $form->parse();   
   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
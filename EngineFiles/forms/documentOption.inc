<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

   $form = new formPlugin($this, "documentOption.conf");
   $form->tmpl->set_block("body", "close_block", "closeBlock");
   $form->action = $form->cfg->get("Action");

   $id = ($this->docNr ? $this->docNr : 0);

   global $save, $apply, $delete, $LastUpdate;
   if ($save || $apply) {
      $LastUpdate = date("Y-m-d H:i:s");
      $form->save("ID=$id");
      if ($save) $form->tmpl->parse("closeBlock", "close_block");
   }
   if ($delete) $form->delete("ID=$id");

   $form->readItem("ID=$id");
   $form->parse();

   $this->parseStr("BODY", $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
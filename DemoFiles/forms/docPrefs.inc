<?
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");


   $this->kernel->classLoader->checkClass('templateClass');
   $tmpl = new templateClass(TMPL_DIR, 'remove');
   $tmpl->halt_on_error = 'yes';
   $tmpl->set_file(array('body_qscv_asdf' => "plugins/docPrefs.tmpl"));

   $tmpl->set_block('body_qscv_asdf','group_item_block','groupitemblock');
   $tmpl->set_block('body_qscv_asdf','temlate_item_block','temlateitemblock');
   $tmpl->set_block('body_qscv_asdf','temlate_selected_item_block','temlateselecteditemblock');

   $curid = $this->kernel->api->getDocumentTemplate($this->parent->docNr);

   $SqlStr = 'select ID,name  from '.$this->kernel->tab_cfg->get('templateTable').';';
   $result = $this->kernel->db->query($SqlStr);
   if ($result && $count = $result->numrows()) {
      for ($i=0;$i<$count;$i++){
          list ($ID,$Name) = $result->getrow();
          $tmpl->set_var(array('ID'   => $ID,'NAME' => $Name));
          if ($curid == $ID) 
               $tmpl->parse('temlateitemblock','temlate_selected_item_block', true);
          else
               $tmpl->parse('temlateitemblock','temlate_item_block', true);
      }
   }

   $check = $this->kernel->api->getLinkedGroup($this->docNr);

      for ($i=0;$i<count($check);$i++){
          $ID = $check[$i];
          $Name = $this->kernel->api->getGroupName($ID);
          $tmpl->set_var(array('ID'   => $ID,'NAME' => $Name));
          $tmpl->parse('groupitemblock','group_item_block', true);
      }

   $tmpl->set_var('ID',$this->docNr);
   $tmpl->parse('out', array('body_qscv_asdf'));
   $this->parseStr("BODY", $tmpl->get('out'), true);
   

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
<?
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
//   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");


   $this->kernel->classLoader->checkClass('templateClass');
   $tmpl = new templateClass(TMPL_DIR, 'remove');
   $tmpl->halt_on_error = 'yes';
   $tmpl->set_file(array('body_qscv_asdf' => "plugins/docPrefs.tmpl"));

   $tmpl->set_block('body_qscv_asdf','group_item_block','groupitemblock');
   $tmpl->set_block('body_qscv_asdf','temlate_item_block','temlateitemblock');
   $tmpl->set_block('body_qscv_asdf','temlate_selected_item_block','temlateselecteditemblock');
   $tmpl->set_block('body_qscv_asdf',"close_block", "closeBlock");


   global $save,$ID,$groupsID,$template, $docs;
   $docs = explode(',',$docs[0]);  // Array of documents

   if ($save) {
      for($i=0;$i<count($docs);$i++) {
//       echo "$i [$docs[$i]] <br>";        
          $this->kernel->api->setDocumentField(intval($docs[$i]),array('templateID' =>  intval($template)));

          $inn = $this->kernel->api->getLinkedGroup(intval($docs[$i]));
          $mast = explode(',',$groupsID);
          foreach ( $mast as $v) {
             if (!in_array($v,$inn))
                $this->kernel->api->createLinkGroupToDoc($v,intval($docs[$i]));
          }
          foreach ($inn as $v) {
             if (!in_array($v,$mast))
                $this->kernel->api->removeLinkGroupToDoc($v,intval($docs[$i]));
          }
     }
//      $form->tmpl->parse("closeBlock", "close_block");
   }

   if (count($docs)<2) 
      $curid = $this->kernel->api->getDocumentTemplate(intval($docs[0]));
//         print "templ: $curid<br>";

   $SqlStr = 'select ID,name  from '.$this->kernel->tab_cfg->get('templateTable').';';
   $result = $this->kernel->db->query($SqlStr);
   if ($result && $count = $result->numrows()) {
      for ($i=0;$i<$count;$i++){
          list ($ID,$Name) = $result->getrow();
          $tmpl->set_var(array('ID'   => $ID,'NAME' => $Name));
//          $tmpl->set_var(array('ID'   => intval($docs[$i]),'NAME' => $Name));
//          echo "[$curid] == [$Name]<BR>";
          if ($curid == $Name) 
               $tmpl->parse('temlateitemblock','temlate_selected_item_block', true);
          else
               $tmpl->parse('temlateitemblock','temlate_item_block', true);
      }
   }

   if (count($docs)<2) {
      $check = $this->kernel->api->getLinkedGroup(intval($docs[0]));     // !!! must be redundant !!!

      for ($i=0;$i<count($check);$i++){
          $ID = $check[$i];
//          print "zdes: $ID";
          $Name = $this->kernel->api->getGroupName($ID);
          $tmpl->set_var(array('ID'   => intval($ID),'NAME' => $Name));
          $tmpl->parse('groupitemblock','group_item_block', true);
      }
   }
//    print "zdes: $docs[0]";

   $TitleID = (count($docs) > 1)?0:intval($docs[0]);

   $tmpl->set_var('ID',$TitleID);
   $tmpl->parse('out', array('body_qscv_asdf'));
   $this->parseStr("BODY", $tmpl->get('out'), true);
   

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
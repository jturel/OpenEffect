<?
   $page = &$this->start($this->kernel->cfg->get('secondTemplate'));
#####################################################
   $this->kernel->secure->accessForm();

//   global $uXr1,$delUser, $delRole, $save;
   global $Save,$TempID,$TempName,$Text,$Delete,$frmID;

   if ($this->kernel->secure->userID!=1) {
   //if ($this->kernel->secure->user!='Admin' and $this->kernel->secure->user != 'admin') {
//      $ur = $this->kernel->secure->user;
      print 'Navigation access is only for Admin user!';
exit;
//      halt();
   }
  
   $this->kernel->classLoader->checkClass('templateClass');
   $tmpl = new templateClass(TMPL_DIR, 'remove');
   $tmpl->halt_on_error = 'yes';
   $tmpl->set_file(array('body_qscv_asdf' => "plugins/navigation.tmpl"));

   $tmpl->set_block('body_qscv_asdf','templates_block','templates');

   if ($Save) {
          if ($TempID) {
             $SqlStr = 'update '.$this->kernel->tab_cfg->get('templateTable')." set name = '$TempName' where ID = $TempID;";
             $result = $this->kernel->db->query($SqlStr);
             $SqlStr = 'select cfgFile from '.$this->kernel->tab_cfg->get('templateTable')." where ID = $TempID;";
             $result = $this->kernel->db->query($SqlStr);
             if ($result && $count = $result->numrows()) {
               list($Name) = $result->getrow();
//               print $Name.'<BR>';
               $fName = $Name;
             }
          } else {
             $TempID = $this->kernel->db->nextid();  
             $fName = "tmpl/$TempName.dtd";
             $SqlStr = 'insert into '.$this->kernel->tab_cfg->get('templateTable').
                       " VALUES($TempID,'$TempName','tmpl/$TempName.dtd',$frmID);";
             $result = $this->kernel->db->query($SqlStr);
          };
          if ($fName) {
          //  print $fName;
            $fp = fopen(SAIT_TMPL_DIR.$fName, 'w');
            $text = str_replace('\"', '"', $Text);
            $text = str_replace('@#$', '"', $Text);
            fwrite($fp,$text);
            fclose($fp);
          }
   }

   if ($Delete) {
      
          if ($TempID) {
             $SqlStr = 'delete from '.$this->kernel->tab_cfg->get('templateTable')." where ID = $TempID;";
             $result = $this->kernel->db->query($SqlStr);
             $TempID = 0;
          }
      
   }

   $SqlStr = 'select ID, name from '.$this->kernel->tab_cfg->get('templateTable').';';
   $result = $this->kernel->db->query($SqlStr);
   if ($result && $count = $result->numrows()) {
      for ($i=0;$i<$count;$i++){
          list ($ID,$Name) = $result->getrow();
          $tmpl->set_var(array('ID'   => $ID,'NAME' => $Name));
          $tmpl->parse('templates','templates_block', true);
      }
   }

   $template = intval($TempID);
   $tmpl->set_var(array('MAIN_XML'   => 'parse.php?35&&&main=1',
                        'CURENT_XML' => 'parse.php?35&&&tmpl='.$template));

   $tmpl->parse('out', array('body_qscv_asdf'));
   $this->parseStr("BODY", $tmpl->get('out'), true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get('mainTemplateLng'));
   
?>
<?
   global $debugip;
   $debugip = 0;
   $this->kernel->debug_ip = 0;

   $page = &$this->start($this->kernel->cfg->get('componentXMLTemplate'));
#####################################################
   $this->kernel->secure->accessForm();

   global $main, $tmpl;

   if ($main) {
         $fName = TMPL_DIR.'main.dtd';
   } else {
         $fName = '';
         if ($tmpl) {
            $SqlStr = 'select cfgFile from '.$this->kernel->tab_cfg->get('templateTable')." where ID = $tmpl;";
            $result = $this->kernel->db->query($SqlStr);
            if ($result && $count = $result->numrows()) {
               list($Name) = $result->getrow();
               $fName = SAIT_TMPL_DIR.$Name;
            }
         }
   }

   if ($fName) {
      $fp = fopen($fName, 'r');
      $A = fread($fp, filesize($fName));
      fclose($fp);
   } else  $A = '<COMPONENTS></COMPONENTS>';

   $this->parseStr("COMPONENTS", $A, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get('mainTemplateLng'));
   
?>
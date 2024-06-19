<?
   global $debugip;
   $debugip = "194.19.228.214";
   $this->kernel->debug_ip = "194.19.228.214";
   $this->kernel->debug_ip = "0";
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
   $this->kernel->secure->accessForm();

   $this->kernel->sysLog->put("Open group frame");

   $this->kernel->sysLog->put("Sha budet object ");
   $form = new treePlugin($this, 'tree.conf');
    
   global $delete;
   
 //  $ttt = $form->delete();

   if ($delete) {
    $form->delete();
   }

   $form->parse();
   
   $this->parseFile('BODY','plugins/tree.tmpl',false,TMPL_DIR);


#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
<?
   global $debugip;
    $debugip = 0;
   $this->kernel->debug_ip = 0;
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
   $this->kernel->secure->accessForm();

   $this->kernel->sysLog->put("Open group frame");

   $form = new treePlugin($this, 'tree.conf');

   global $delete;
//   print "[ $delete ]";
   if ($delete) $form->delete();

   $form->parse();
   
   $this->parseFile('BODY','plugins/tree.tmpl',false,TMPL_DIR);


#####################################################   
//   usleep (5000000);
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
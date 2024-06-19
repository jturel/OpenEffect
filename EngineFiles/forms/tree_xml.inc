<?
   global $debugip;
   $debugip = 0;
   $this->kernel->debug_ip = 0;
   $page = &$this->start($this->kernel->cfg->get("secondTemplate"));
#####################################################
   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put('Open group frame');

   $form = new treePlugin($this, 'tree.conf');

   global $delete;
   if ($delete) $form->delete();

   $form->parse();
   $this->parseStr('BODY', $form->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
?>
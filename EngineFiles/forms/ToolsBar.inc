<?
   $page = &$this->start('plugins/toolsbar.tmpl');
#####################################################
   $this->kernel->secure->accessForm();
   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");

//   $this->parseFile('BODY','plugins/toolsbar.tmpl',false,TMPL_DIR);

   $this->parse('SECURE','sec_info','secure.conf',true);
   $this->parse("LANGUAGE", "lngSelectPlugin", "lngSelect.conf", true);

//   sec_info_doc
//   $form->parse();
//   $this->parseStr("BODY", $form->html, true);


#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
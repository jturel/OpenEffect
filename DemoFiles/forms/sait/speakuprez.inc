<?

   $page = &$this->start($this->kernel->cfg->get("main"));
#####################################################

   global $login;
   $this->kernel->secure->accessForm();

   $this->parseFile("HEAD", "tmpl/tmpl/header.tmpl", true);
   $this->parse('HOTNEWS', 'documentslist', 'sait/hotnews.conf');
   $this->parse("PRODUCTS", "feedback", "sait/speakuprez.conf");

 
#####################################################
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));

?>
<?

   $page = &$this->start($this->kernel->cfg->get("main"));
#####################################################

   global $login;
   $this->kernel->secure->accessForm();

   $this->parse("HEAD", "search", "sait/search.conf");
//   $this->parseFile("HEAD", "tmpl/tmpl/header.tmpl", true);
   $this->parse("PRODUCTS", "search", "sait/searchrez.conf");
   $this->parse('HOTNEWS', 'documentslist', 'sait/hotnews.conf');

 
#####################################################
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));

?>
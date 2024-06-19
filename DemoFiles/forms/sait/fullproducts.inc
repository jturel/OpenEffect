<?

   $page = &$this->start($this->kernel->cfg->get("main"));
#####################################################

   global $login;
   $this->kernel->secure->accessForm();

   $this->parseFile("HEAD", "tmpl/tmpl/header.tmpl", true);
   $this->parse('HOTNEWS', 'documentslist', 'sait/hotnews.conf');
   $this->parse('PRODUCTS', 'documents', 'sait/fullproducts.conf');

 
#####################################################
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));

?>
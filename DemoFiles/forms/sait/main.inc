<?

   $page = &$this->start($this->kernel->cfg->get("main"));
#####################################################

   global $login;
   $this->kernel->secure->accessForm();

   $this->parse("HEAD", "search", "sait/search.conf");
   $this->parse('HOTNEWS', 'documentslist', 'sait/hotnews.conf');
   $this->parse('PRODUCTS', 'documentslist', 'sait/products.conf');
   $this->parse("SPEAKUP", "feedback", "sait/speakup.conf");

 
#####################################################
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));

?>
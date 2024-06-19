<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
   $this->kernel->secure->accessForm();
                                                    
   $this->parse('BODY','CSVimport','cvsimport.conf',true);

/*
   $api = &$this->kernel->api;
   $Docs = $api->getAllDocuments(15);
   for ($i=0;$i<count($Docs);$i++){
      $api->removeTxt($Docs[$i],'place');
      $api->removeTxt($Docs[$i],'place');
      $api->removeTxt($Docs[$i],'place');
      $api->removeTxt($Docs[$i],'place');
      $api->magicTxt($Docs[$i],'place', 'Riga',0);
      print "$Docs[$i],'place', 'Riga'<BR>";
   }                    
*/

#####################################################   
//   usleep (5000000);
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
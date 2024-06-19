<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
//   $page = &$this->start();
   
#####################################################
   $this->kernel->secure->accessForm();
   $this->kernel->debug_ip = 0;

   $this->kernel->sysLog->put("Open group frame");

//   $this->parseSTR('SECURE','sec_info','secure.conf',true);

   $tmpl = new templateClass(TMPL_DIR, "remove");
   $tmpl->set_file(array("base_qwe43" => 'plugins/dialog.tmpl'));

//    print "";
    global $HTTP_GET_VARS,$forms_Nr;
    $tmp = &$this->parent->parent;
    $url = '?'.$forms_Nr.
           '&'.$this->groupNr.
           '&'.$this->docNr;
    while (list($k,$v)=each($HTTP_GET_VARS)){
        if (!preg_match('/&/',$v))
            if (!is_array($HTTP_GET_VARS[$k]))
               $url .= '&'.$k.'='.$v;
            else
               $url .= '&'.$k.'[]='.implode(",", $HTTP_GET_VARS[$k]);
    }
   
   $tmpl->set_var(array("LINK" => $url));
   $tmpl->parse("out", array("base_qwe43"));

   $this->parseStr("BODY",  $tmpl->get("out"), true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
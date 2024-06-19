<?

   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################
      

   $list = new documentListPlugin($this, "documentList.conf");
   $lngsel = new lngSelectPlugin($this, "lngSelect.conf");
   $list->tmpl->set_block("body", "close_block", "closeBlock");
   $list->tmpl->set_block("body", "addDocWithOutTmpl_block", "addWOBlock");
   $list->tmpl->set_block("body", "addDocWithTmpl_block",    "addWBlock");
   $list->tmpl->set_block("body", "tree_block", "TreeBlock");
   $list->tmpl->set_block("body", "navigator_block", "navigatorq");
   $list->navigator = 100;

   $list->tmpl->set_var("LANGUAGE", $lngsel->html);

   $SqlStr = "SELECT templateID FROM ".$this->kernel->tab_cfg->get("groupTable")."
              WHERE ID = ".$this->groupNr;
   $result = $this->kernel->db->query($SqlStr);
   $tmplID = 0;
   if ($result && $result->numrows()) list($tmplID) = $result->getrow();
   if ($tmplID) $list->tmpl->parse("addWBlock", "addDocWithTmpl_block");
           else $list->tmpl->parse("addWOBlock", "addDocWithOutTmpl_block");

   global $save;
   if ($save) {
      $list->tmpl->set_var("DOC_ID", $ID);
      $list->tmpl->parse("closeBlock", "close_block");
   }

   $SqlStr = 'SELECT count(DocID) FROM '.$this->kernel->tab_cfg->get('docXgroupTable').' WHERE GrpID = '.$this->groupNr;
   $result = $this->kernel->db->query($SqlStr);
   list($count) = $result->getrow();
//   print "GO![$count]";

   for ($i=0;$i<$count;$i+=100){
       $list->tmpl->set_var(array('from'=> $i,
                                  'from1'=> $i+1,
                                  'to'=> ($i+100>$count)?$count:$i+100));
       $list->tmpl->parse("navigator", "navigator_block", true);
   }
   

   $list->pubSave();
   $tree = $this->kernel->api->getGroupTree($this->groupNr);
//   print count($tree);
   for ($i=1;$i<count($tree) ;$i++){
//      print "[$tree[$i]]";
      $list->tmpl->set_var("ID", $tree[$i]);
      $list->tmpl->parse("TreeBlock", "tree_block",true);
   }

   global $delete;
   if ($delete)
     $list->delete();
   $list->parse("x.GrpID=".$this->groupNr);

   $this->parseStr("BODY", $list->html, true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
<?

  $TOPGROUP=1;

   $page = &$this->start($this->kernel->cfg->get('mainTemplate'));
#####################################################
      

   $tmpl = new templateClass(TMPL_DIR, 'remove');
   $tmpl->set_file(array('body' => 'plugins/listtop.tmpl'));
   $tmpl->set_block('body', 'item_block', 'itemBlock');
   $tmpl->set_var(array('_LINK_SELF' => $REQUEST_URI));

   function groupEditTree($pID, &$kernel, $deep = 0) {
      $list = array();
      $SqlStr = 'SELECT ID, name FROM '.$kernel->tab_cfg->get('groupTable').
                " WHERE parentID = $pID ORDER BY sortNr";
      $result = $kernel->db->query($SqlStr);
      if ($result && $count = $result->numrows()) for ($Cn = 0; $Cn < $count; $Cn++) {
         list($id, $name) = $result->getrow();
         for ($i = 0; $i < $deep; $i++) $name = "-&nbsp;&nbsp;".$name;
             $list[] = array("name" => $name, "value" => $id);
             $list = array_merge($list, groupEditTree($id, $kernel, $deep + 1));
      }
      return $list;
   }
   $list = groupEditTree($TOPGROUP, $this->kernel);
   for ($i=0;$i<count($list);$i++){
       $tmpl->set_var($list[$i]);
       $tmpl->parse("itemBlock", "item_block", true);
   }

   global $GroupID;
   $tmpl->set_var('GRP',$GroupID);
   $tmpl->parse("out", array("body"));

     
   $this->parseStr("BODY", $tmpl->get("out"), true);

#####################################################   
   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"));
   
?>
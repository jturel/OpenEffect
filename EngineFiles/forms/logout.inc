<?

//   $page = &$this->start($this->kernel->cfg->get("mainTemplate"));
#####################################################

           
   if ($this->kernel->cfg->check("accessCfgFile"))
   $cfgFile = $this->kernel->cfg->get("accessCfgFile");
   else $cfgFile = "access.conf";
         
   $cfgFile = CONF_DIR."/$cfgFile";
        
   $this->cfg = $this->kernel->cfger->reg("ACCESS", $cfgFile);

   $loginName  = $this->cfg->get("accessFormLoginName");
   $passName   = $this->cfg->get("accessFormPassName");

   setCookie($loginName, '', time() + $expireTime, "/");
   setCookie($passName,  '', time() + $expireTime, "/");
   header("Location: ."); 


#####################################################
//   $out = $this->end($this->kernel->cfg->get("mainTemplateLng"),$this->kernel);

?>
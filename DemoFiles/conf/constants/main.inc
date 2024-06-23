<?php

/*************************************
* This file define contants 
* Directories u etc.
*
*************************************/

  // Define Class directory
  define("CLASS_DIR", BASE_DIR."class/");
  
  // Define default Constant configuration dir
  define("CONF_DIR", BASE_DIR."conf/");
  define("DB_CONF_DIR",  BASE_DIR."conf/");

  // Define FORM Configuration dir
  define("FORM_DIR", BASE_DIR."forms/");

  // Define template's dir
  define("TMPL_DIR", BASE_DIR."tmpl/");
  define("ERROR_TMPL_DIR", TMPL_DIR."error/");
  define("COMPONENT_TMPL_DIR", TMPL_DIR."components/");

  // Define Location of Kerenl class dir
  define("KERNEL_CLASS_DIR", CLASS_DIR."kernel/");

  // Define default DB scheme
  define("DEFAULT_DB_SCHEME", "default");

  // Define default LOG stream
  define("DEFAULT_LOG_STREAM",   "SYS");
  define("DEFAULT_LOG_DB_TABLE", "database.table");
  define("DEFAULT_LOG_FILE",     "/tmp/tmp_engine_log_file");
  define("DEFAULT_LOG_OUTPUT",   "log"); // [log,screen,db,file] 

  // Define default LOG output dir
  define("LOG_DIR", BASE_DIR."logs/");

  // Define Language dir
  define("LANGUAGE_DIR", BASE_DIR."lng/");

  // Error conf file
  define("MAIN_ERROR_CONF_FILE", CONF_DIR."error.conf");

  // Cache dir
  define("FORM_CACHE_DIR", BASE_DIR."cache/forms/");

  // Plugins configuration dirs
  define("PLUGIN_DIR", BASE_DIR."plugins/");
  define("CONF_PLUGIN_DIR", CONF_DIR."plugins/");
  
  // Include configuration files
  include CONSTANT_DIR."/classLoader.inc";

  
 
?>

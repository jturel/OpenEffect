<?
/**
* Copyright (C) 2002 SIA ESOFTS.
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License 
* version 2 as published by the Free Software Foundation.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the SIA ESOFTS, 38/40 Blaumana str., 
* Riga, LV - 1011, LATVIA, e-mail office@esoft.lv 
*
* This General Public License does not permit incorporating your program into
* proprietary programs. Should you require to License Open Effect under the
* commercial License, please contact SIA ESOFTS for up-to-date information.
*/

   // prepend configuration
/* Configs - backslash at the end */

define("BASE_DIR", getcwd().'/');
define("SAIT_BASE_DIR", getcwd().'/');
define("CONSTANT_DIR", BASE_DIR."conf/constants/");   

include CONSTANT_DIR."main.inc";       // Include constants
include CLASS_DIR."classLoader.class"; // Include Class Loader class
include CLASS_DIR."kernel.class";      // Include Kernel class
$kernel = new kernelClass(CONF_DIR."kernel.conf");
$kernel->close();

?>

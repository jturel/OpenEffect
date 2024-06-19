<?

class xml_components {
var $components;

   function xml_components($data) {
      $this->parser = xml_parser_create();
      xml_set_object($this->parser,&$this);
      xml_set_element_handler($this->parser,"tag_open","tag_close");
      xml_set_character_data_handler($this->parser,"cdata");
      xml_parse($this->parser,$data);
   }

   function tag_open($parser,$tag,$attributes) { 
    switch ($tag) {
    case 'COMPONENT':
          unset($this->component);
          $this->param         = array();
        break;
    case 'ELMS':
          unset($this->elms);
          $this->elms           = $attributes;
        break;
    case 'ELM':
          $this->elm           = $attributes;
        break;
    case 'PARAM':
          $this->param         = $attributes;
        break;         
    default: 
        $this->cdata = '';
        $this->component->$tag = $attributes;
    }
   }
   
   function cdata($parser,$cdata) { 
       $this->cdata = $cdata;
   }
   
   function tag_close($parser,$tag) { 

    switch ($tag) {
    case 'COMPONENT':
        $this->components[]        = $this->component;
        print_r($this->component);
        break;
    case 'ELMS':
        $this->component->elms[]    = $this->elms;
          if ($t = $this->elms['NAME'])
             $this->component->elms[$t] = &end($this->component->elms);
        break;
    case 'PARAM':
          $this->param['_']        = $this->cdata;
          $this->component->param[] = $this->param;
          if ($t = $this->param['NAME'])
             $this->component->param[$t] = &end($this->component->param);
        break;         
    case 'ELM':
        $this->elm['_']                      = $this->cdata;
        $this->elms[]    = $this->elm;
        break;
    default:
        $q = &$this->component->$tag;
        $q['_'] = $this->cdata;
    }
   }
   
} // end of class xml

print "Start<BR>";


$fp = @fopen('main.dtd', "r");
$A = fread($fp, filesize('main.dtd'));
$t = new xml_components($A);
fclose($fp);

print "<BR>";
print_r($t->components);

print "<BR>End<BR>";
?>
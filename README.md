input-supperter
=======================

Introduction
-----------------
This plugin enables to validate input element easily.

Usage
-----------------
1. HTML parameter pattern

````
<form name="input-form" method="post" action="/" formnovalidate="formnovalidate" data-role="validation">
    <input type="text" name="email" title="email" data-input-support='{"cancelspace":true}'>
    <input type="text" name="email2" title="email2" data-input-support='{"cancelspace":true}'>
</form>
````

2. javascript option pattern

````
<form name="input-form" method="post" action="/" formnovalidate="formnovalidate" data-role="validation">
    <input type="text" name="email" title="email">
    <input type="text" name="email2" title="email2">
</form>
````

````
// execute input supporter
$('[data-input-support]').inputSupporter({}, [
    "email": {
        "cancelspace": true
    },
    "email-confirmation": {
        "cancelspace": true
    }
]);
````

Links
-----------------

Requirements
-----------------
jQuery-.1.7.2+

Compatibility
-----------------
* Internet Explorer 8+
* Firefox
* Chrome
* Safari
* Mobile Safari
* Android browser
* Android Chrome
  
※ We support only latest version of Firefox/Chrome/Safari
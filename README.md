$count
========
Adds a `:once` suffix to both Element and Class.Events event types. Once used, the selector will remove then event once it fired for the first time.


How to use
----------
For all event interfaces, simply do:

    #JS
    
    myElement.addEvent('click:once',function(){});
    
    myClass.addEvent('foo:once',function(){});
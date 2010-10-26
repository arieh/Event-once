/*
---
description: Adds the :once suffix to event names so that you could add a one-time event

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Core,Element.Event,Class.Extras]


provides:
    [Event:once]
...
*/
/*!
Copyright (c) 2010 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/

(function(window,undef){

function addEventOnce(obj,type,fn,bind){
    function tempFunc(args){
        obj.removeEvent(type,tempFunc);
        fn.apply(bind,Array.from(args));
    }
    
    obj.addEvent(type,tempFunc);
}

var old_Events = {
    event: window['Events'].prototype.addEvent
    , element : window['Element'].prototype.addEvent
};

[Element,Window,Document].each(function(e){
    e.implement({    
        addEvent : function(type,fn){
            if (type.test(/:once$/)){
                type = type.substr(0,type.length-5);
                addEventOnce(this,type,fn,this);
            } else {
                old_Events.element.apply(this,[type,fn]);
            }
        }
    });
});

window['Events'].implement({
    addEvent : function(type,fn){
        if (type.test(/:once$/)){
            type = type.substr(0,type.length-5);
            addEventOnce(this,type,fn);
        } else {
            old_Events.event.apply(this,[type,fn]);
        }
    }
});

})(this);
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
}

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

window['Events'].invoke('implement',{
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
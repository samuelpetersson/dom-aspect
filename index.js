var aspect = (function(){

    function Ratio(element, mode) {
        this.element = element;     
        this.mode = mode;
        //default alignX = 0.5
        //default alignY = 0.5
        //this.init();
        var scope = this;
        element.onload = function() { scope.init(); };
    }

    Ratio.prototype.init = function() {
       var element = this.element;
       delete element.width;
       delete element.height;
       console.log("init", element.clientWidth, element);
       this.ratio = element.clientWidth / element.clientHeight;
       this.layout();
    };

    Ratio.prototype.layout = function() {
        var elementRatio = this.ratio;

        console.log("layout", elementRatio);
        if(isNaN(elementRatio)) {
            return;
        }

        var mode = this.mode;

        var parent = this.element.parentNode;
        var parentWidth = parent.clientWidth;
        var parentHeight = parent.clientHeight;
        var parentRatio = parentWidth / parentHeight;

        var elementWidth = parentWidth;
        var elementHeight = parentWidth / elementRatio;

        if(mode == "fill" && elementRatio > parentRatio || mode == "fit" && elementRatio < parentRatio) {
            elementWidth = parentHeight * elementRatio;
            elementHeight = parentHeight;
        }

        var alignX = this.alignX || 0.5;
        var alignY = this.alignY || 0.5;
        var style = this.element.style;
        console.log(elementWidth, elementHeight);
        
        style.position = "absolute";
        style.width = elementWidth + "px";
        style.height = elementHeight + "px";
        style.left = parentWidth * alignX - elementWidth * alignX + "px";
        style.top = parentHeight * alignY - elementHeight * alignY + "px";
    };


    return {
        fill:function(element) {
            return new Ratio(element, "fill");
        },
        fit:function(element) {
            return new Ratio(element, "fit");
        }
    };
})();

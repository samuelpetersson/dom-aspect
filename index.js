var aspect = (function(){

  var addEvent = function(target, event) {
    target.addEventListener(event, this.eventHandler);
  };
  var removeEvent = function(target, event) {
    target.removeEventListener(event, this.eventHandler);
  };

  function Ratio(element, cover, autoResize) {
    this.element = element;
    this.cover = cover !== false;
    this.autoCoverThreshold = 0;

    this.alignX = 0.5;
    this.alignY = 0.5;

    this.constrainWidth = 0;
    this.constrainHeight = 0;
    
    this.reset();

    var ratio = this;
    this.eventHandler = function(event) {
      event = event || window.event;
      switch(event.type) {
        case "load":
          ratio.reset();
          break;
        case "resize":
          ratio.layout();
          break;
      }
    };

    if(element.nodeName == "IMG") {
      addEvent.call(this, element, "load");
    }
    if(autoResize !== false) {
      addEvent.call(this, window, "resize");
    }
  }

  Ratio.prototype.reset = function(ratio) {
    var element = this.element;
    element.style.width = null;
    element.style.height = null;
    this.ratio = ratio || (element.clientWidth / element.clientHeight);
    this.layout();
  };

  Ratio.prototype.layout = function() {
    var elementRatio = this.ratio;

    if(isNaN(elementRatio)) {
      return;
    }

    var parent = this.element.parentNode;

    if(!parent) {
      return;
    }
    
    var parentWidth = parent.clientWidth;
    var parentHeight = parent.clientHeight;
    var parentRatio = parentWidth / parentHeight;

    var cover = this.cover || Math.abs(elementRatio - parentRatio) < this.autoCoverThreshold;

    var elementWidth = parentWidth;
    var elementHeight = parentWidth / elementRatio;
    
    if(!cover == (elementRatio < parentRatio)) {
      elementWidth = parentHeight * elementRatio;
      elementHeight = parentHeight;
    }

    var constrainWidth = this.constrainWidth;
    var constrainHeight = this.constrainHeight;

    if(constrainWidth && elementWidth > parentWidth * constrainWidth) {
      elementWidth = parentWidth * constrainWidth;
      elementHeight = elementWidth / elementRatio;
    }
    if(constrainHeight && elementHeight > parentHeight * constrainHeight) {
      elementHeight = parentHeight * constrainHeight;
      elementWidth = elementHeight * elementRatio;
    }

    var style = this.element.style;

    var ax = this.alignX;
    var ay = this.alignY;

    var tx = parentWidth * ax - elementWidth * ax;
    var ty = parentHeight * ay - elementHeight * ay;

    if(this.useTransform) {
      var sx = elementWidth / this.element.clientWidth;
      var sy = elementHeight / this.element.clientHeight;
      var transform = "matrix("+ sx +", 0, 0, "+ sy +", "+ tx +", "+ ty +")";
      style.transform = transform;
      style.transformOrigin = "0 0";
    }
    else {      
      style.width = elementWidth + "px";
      style.height = elementHeight + "px";
      style.marginLeft = tx + "px";
      style.marginTop = ty + "px";
    }

  };

  Ratio.prototype.dispose = function() {
    removeEvent.call(this, this.element, "load");
    removeEvent.call(this, window, "resize");
  };

  return {
    createRatio:function(element, cover, autoResize) {
      return new Ratio(element, cover, autoResize);
    }
  };

})();

if(typeof module !== "undefined") {
  module.exports = aspect;
}

# dom-aspect
Maintain element ratio

### Concept

```javascript
//Create a ratio.
var ratio = aspect.createRatio(element);

//Dispose (remove element listeners etc.).
ratio.dispose();
```

### Examples

```javascript
//Create a ratio that will use cover mode when the difference between element and parent ratio is less then 10%. Usefull when containig dynamic sized elements to prevent narrow side bars.
var ratio = aspect.createRatio(element, false);
ratio.autoCoverThreshold = 0.1;
```

```javascript
//Create a ratio that will at most scale element size to 125% of parent size.
var ratio = aspect.createRatio(element);
ratio.constrainWidth = 1.25;
ratio.constrainHeight = 1.25;
```

```javascript
//Create a ratio that will set the transform matrix instead of the regular width and height style.
var ratio = aspect.createRatio(element);
ratio.useTransform = true;
```

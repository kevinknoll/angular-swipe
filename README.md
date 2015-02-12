# Angular Swipe

Multi-directional swipe directive for Angular, ported from jQuery Swipe (https://github.com/kevinknoll/jquery-swipe)

## Build Instructions

The build script has been configured as the default Grunt task.

Just run `grunt` from this directory and the script will be built into the `/dist` directory.

*NOTE: the version number of the compiled/minified file comes from `package.json`*

## Usage Instructions

Include the compiled file in your Angular app and `swipe` as a dependency.

```javascript
angular.module('app', ['swipe']);
```

Add `data-swipe` and one or more `data-swipe-DIRECTION` attributes to an element.

```html
data-swipe
data-swipe-left="doSomething()"
data-swipe-right="doSomething()"
data-swipe-up="doSomething()"
data-swipe-down="doSomething()"
```

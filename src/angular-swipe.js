/*
  Angular Swipe Module
  Based on jquery swipe by kevin knoll (https://github.com/kevinknoll/jquery-swipe)
*/
(function (w, a) {
  'use strict';

  a.module('swipe', [
  ]).directive('swipe', [
    '$parse',
    function ($parse) {

      /* binds swipe */
      function swipe (element, settings) {
        var swiping = false;
        var x = 0;
        var y = 0;

        function onTouchMove (e) {
          if (settings.preventDefault) {
            e.preventDefault();
          }
          /* if swiping has started */
          if (swiping) {
            var dx = x - e.touches[0].pageX;
            var dy = y - e.touches[0].pageY;
            var l = false;
            var r = false;
            var u = false;
            var d = false;
            if (Math.abs(dx) >= settings.min_x) {
              l = (dx > 0);
              r = !l;
            }
            if (Math.abs(dy) >= settings.min_y) {
              u = (dy > 0);
              d = !u;
            }
            if (l || r || u || d) {
              /* swiping has ended (can't use touchend because: 1. we count a swipe as soon as it happens, not when the user lifts their finger, 2. touchend isn't reliable on all devices)... set swiping = true on touchstart, trip to false after first successful touchmove (can't swipe again until next touchstart) */
              swiping = false;
              settings.swipe(l, r, u, d);
            }
          }
        }

        function onTouchStart (e) {
          /* don't trigger swipe on multitouch swipe */
          if (e.touches.length === 1) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
            /* swiping has started */
            swiping = true;
          }
        }

        function bindEvents () {
          element.on('touchstart', onTouchStart);
          element.on('touchmove', onTouchMove);
        }

        bindEvents();
      }

      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var fn = {
            l: $parse(attrs.swipeLeft),
            r: $parse(attrs.swipeRight),
            u: $parse(attrs.swipeUp),
            d: $parse(attrs.swipeDown)
          };

          var opts = {
            preventDefault: false,
            min_x: 25,
            min_y: 25,
            swipe: function (l, r, u, d) {
              scope.$apply(function(){
                if (l || r) {
                  fn[l ? 'l' : 'r'](scope);
                }
                if (u || d) {
                  fn[u ? 'u' : 'd'](scope);
                }
              });
            }
          };

          swipe(element, opts);
        }
      }
    }
  ]);

})(window, window.angular);

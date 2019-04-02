/* eslint-disable */
// Source: https://github.com/calvellido/focus-options-polyfill/blob/cc11aebb9141a36e7b5fd19e19a65201a63009ae/index.js
if (typeof window !== "undefined") {
  // focus - focusOptions - preventScroll polyfill
  var supportsPreventScrollOption = false;
  try {
    var focusElem = window.createElement("div");
    focusElem.addEventListener(
      "focus",
      function(event) {
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );
    // document.documentElement.focus(
    focusElem.focus(
      Object.defineProperty({}, "preventScroll", {
        get: function() {
          supportsPreventScrollOption = true;
        }
      })
    );
  } catch (e) {}

  if (
    HTMLElement.prototype.nativeFocus === undefined &&
    !supportsPreventScrollOption
  ) {
    HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;

    var patchedFocus = function(args) {
      var actualPosition = window.scrollY;
      this.nativeFocus();
      if (args && args.preventScroll) {
        // Hijacking the event loop order, since the focus() will trigger
        // internally an scroll that goes to the event loop
        setTimeout(function() {
          window.scroll(window.scrollX, actualPosition);
        }, 0);
      }
    };

    HTMLElement.prototype.focus = patchedFocus;
  }
}

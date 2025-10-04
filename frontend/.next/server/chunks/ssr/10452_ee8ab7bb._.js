module.exports = [
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend() {
    var target = {};
    for(var i = 0; i < arguments.length; i++){
        var source = arguments[i];
        for(var key in source){
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/fuzzy/lib/fuzzy.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
 * Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */ (function() {
    var root = this;
    var fuzzy = {};
    // Use in node or in browser
    if ("TURBOPACK compile-time truthy", 1) {
        module.exports = fuzzy;
    } else //TURBOPACK unreachable
    ;
    // Return all elements of `array` that have a fuzzy
    // match against `pattern`.
    fuzzy.simpleFilter = function(pattern, array) {
        return array.filter(function(str) {
            return fuzzy.test(pattern, str);
        });
    };
    // Does `pattern` fuzzy match `str`?
    fuzzy.test = function(pattern, str) {
        return fuzzy.match(pattern, str) !== null;
    };
    // If `pattern` matches `str`, wrap each matching character
    // in `opts.pre` and `opts.post`. If no match, return null
    fuzzy.match = function(pattern, str, opts) {
        opts = opts || {};
        var patternIdx = 0, result = [], len = str.length, totalScore = 0, currScore = 0, pre = opts.pre || '', post = opts.post || '', compareString = opts.caseSensitive && str || str.toLowerCase(), ch;
        pattern = opts.caseSensitive && pattern || pattern.toLowerCase();
        // For each character in the string, either add it to the result
        // or wrap in template if it's the next string in the pattern
        for(var idx = 0; idx < len; idx++){
            ch = str[idx];
            if (compareString[idx] === pattern[patternIdx]) {
                ch = pre + ch + post;
                patternIdx += 1;
                // consecutive characters should increase the score more than linearly
                currScore += 1 + currScore;
            } else {
                currScore = 0;
            }
            totalScore += currScore;
            result[result.length] = ch;
        }
        // return rendered string if we have a match for every char
        if (patternIdx === pattern.length) {
            // if the string is an exact match with pattern, totalScore should be maxed
            totalScore = compareString === pattern ? Infinity : totalScore;
            return {
                rendered: result.join(''),
                score: totalScore
            };
        }
        return null;
    };
    // The normal entry point. Filters `arr` for matches against `pattern`.
    // It returns an array with matching values of the type:
    //
    //     [{
    //         string:   '<b>lah' // The rendered string
    //       , index:    2        // The index of the element in `arr`
    //       , original: 'blah'   // The original element in `arr`
    //     }]
    //
    // `opts` is an optional argument bag. Details:
    //
    //    opts = {
    //        // string to put before a matching character
    //        pre:     '<b>'
    //
    //        // string to put after matching character
    //      , post:    '</b>'
    //
    //        // Optional function. Input is an entry in the given arr`,
    //        // output should be the string to test `pattern` against.
    //        // In this example, if `arr = [{crying: 'koala'}]` we would return
    //        // 'koala'.
    //      , extract: function(arg) { return arg.crying; }
    //    }
    fuzzy.filter = function(pattern, arr, opts) {
        if (!arr || arr.length === 0) {
            return [];
        }
        if (typeof pattern !== 'string') {
            return arr;
        }
        opts = opts || {};
        return arr.reduce(function(prev, element, idx, arr) {
            var str = element;
            if (opts.extract) {
                str = opts.extract(element);
            }
            var rendered = fuzzy.match(pattern, str, opts);
            if (rendered != null) {
                prev[prev.length] = {
                    string: rendered.rendered,
                    score: rendered.score,
                    index: idx,
                    original: element
                };
            }
            return prev;
        }, [])// Sort by score. Browsers are inconsistent wrt stable/unstable
        // sorting, so force stable by using the index in the case of tie.
        // See http://ofb.net/~sethml/is-sort-stable.html
        .sort(function(a, b) {
            var compare = b.score - a.score;
            if (compare) return compare;
            return a.index - b.index;
        });
    };
})();
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/suggestions/src/list.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var List = function(component) {
    this.component = component;
    this.items = [];
    this.active = 0;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'suggestions-wrapper';
    this.element = document.createElement('ul');
    this.element.className = 'suggestions';
    this.wrapper.appendChild(this.element);
    // selectingListItem is set to true in the time between the mousedown and mouseup when clicking an item in the list
    // mousedown on a list item will cause the input to blur which normally hides the list, so this flag is used to keep
    // the list open until the mouseup
    this.selectingListItem = false;
    component.el.parentNode.insertBefore(this.wrapper, component.el.nextSibling);
    return this;
};
List.prototype.show = function() {
    this.element.style.display = 'block';
};
List.prototype.hide = function() {
    this.element.style.display = 'none';
};
List.prototype.add = function(item) {
    this.items.push(item);
};
List.prototype.clear = function() {
    this.items = [];
    this.active = 0;
};
List.prototype.isEmpty = function() {
    return !this.items.length;
};
List.prototype.isVisible = function() {
    return this.element.style.display === 'block';
};
List.prototype.draw = function() {
    this.element.innerHTML = '';
    if (this.items.length === 0) {
        this.hide();
        return;
    }
    for(var i = 0; i < this.items.length; i++){
        this.drawItem(this.items[i], this.active === i);
    }
    this.show();
};
List.prototype.drawItem = function(item, active) {
    var li = document.createElement('li'), a = document.createElement('a');
    if (active) li.className += ' active';
    a.innerHTML = item.string;
    li.appendChild(a);
    this.element.appendChild(li);
    li.addEventListener('mousedown', (function() {
        this.selectingListItem = true;
    }).bind(this));
    li.addEventListener('mouseup', (function() {
        this.handleMouseUp.call(this, item);
    }).bind(this));
};
List.prototype.handleMouseUp = function(item) {
    this.selectingListItem = false;
    this.component.value(item.original);
    this.clear();
    this.draw();
};
List.prototype.move = function(index) {
    this.active = index;
    this.draw();
};
List.prototype.previous = function() {
    this.move(this.active === 0 ? this.items.length - 1 : this.active - 1);
};
List.prototype.next = function() {
    this.move(this.active === this.items.length - 1 ? 0 : this.active + 1);
};
List.prototype.drawError = function(msg) {
    var li = document.createElement('li');
    li.innerHTML = msg;
    this.element.appendChild(li);
    this.show();
};
module.exports = List;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/suggestions/src/suggestions.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var extend = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var fuzzy = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/fuzzy/lib/fuzzy.js [app-ssr] (ecmascript)");
var List = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/suggestions/src/list.js [app-ssr] (ecmascript)");
var Suggestions = function(el, data, options) {
    options = options || {};
    this.options = extend({
        minLength: 2,
        limit: 5,
        filter: true,
        hideOnBlur: true
    }, options);
    this.el = el;
    this.data = data || [];
    this.list = new List(this);
    this.query = '';
    this.selected = null;
    this.list.draw();
    this.el.addEventListener('keyup', (function(e) {
        this.handleKeyUp(e.keyCode);
    }).bind(this), false);
    this.el.addEventListener('keydown', (function(e) {
        this.handleKeyDown(e);
    }).bind(this));
    this.el.addEventListener('focus', (function() {
        this.handleFocus();
    }).bind(this));
    this.el.addEventListener('blur', (function() {
        this.handleBlur();
    }).bind(this));
    this.el.addEventListener('paste', (function(e) {
        this.handlePaste(e);
    }).bind(this));
    // use user-provided render function if given, otherwise just use the default
    this.render = this.options.render ? this.options.render.bind(this) : this.render.bind(this);
    this.getItemValue = this.options.getItemValue ? this.options.getItemValue.bind(this) : this.getItemValue.bind(this);
    return this;
};
Suggestions.prototype.handleKeyUp = function(keyCode) {
    // 40 - DOWN
    // 38 - UP
    // 27 - ESC
    // 13 - ENTER
    // 9 - TAB
    if (keyCode === 40 || keyCode === 38 || keyCode === 27 || keyCode === 13 || keyCode === 9) return;
    this.handleInputChange(this.el.value);
};
Suggestions.prototype.handleKeyDown = function(e) {
    switch(e.keyCode){
        case 13:
        case 9:
            if (!this.list.isEmpty()) {
                if (this.list.isVisible()) {
                    e.preventDefault();
                }
                this.value(this.list.items[this.list.active].original);
                this.list.hide();
            }
            break;
        case 27:
            if (!this.list.isEmpty()) this.list.hide();
            break;
        case 38:
            this.list.previous();
            break;
        case 40:
            this.list.next();
            break;
    }
};
Suggestions.prototype.handleBlur = function() {
    if (!this.list.selectingListItem && this.options.hideOnBlur) {
        this.list.hide();
    }
};
Suggestions.prototype.handlePaste = function(e) {
    if (e.clipboardData) {
        this.handleInputChange(e.clipboardData.getData('Text'));
    } else {
        var self = this;
        setTimeout(function() {
            self.handleInputChange(e.target.value);
        }, 100);
    }
};
Suggestions.prototype.handleInputChange = function(query) {
    this.query = this.normalize(query);
    this.list.clear();
    if (this.query.length < this.options.minLength) {
        this.list.draw();
        return;
    }
    this.getCandidates((function(data) {
        for(var i = 0; i < data.length; i++){
            this.list.add(data[i]);
            if (i === this.options.limit - 1) break;
        }
        this.list.draw();
    }).bind(this));
};
Suggestions.prototype.handleFocus = function() {
    if (!this.list.isEmpty()) this.list.show();
    this.list.selectingListItem = false;
};
/**
 * Update data previously passed
 *
 * @param {Array} revisedData
 */ Suggestions.prototype.update = function(revisedData) {
    this.data = revisedData;
    this.handleKeyUp();
};
/**
 * Clears data
 */ Suggestions.prototype.clear = function() {
    this.data = [];
    this.list.clear();
};
/**
 * Normalize the results list and input value for matching
 *
 * @param {String} value
 * @return {String}
 */ Suggestions.prototype.normalize = function(value) {
    value = value.toLowerCase();
    return value;
};
/**
 * Evaluates whether an array item qualifies as a match with the current query
 *
 * @param {String} candidate a possible item from the array passed
 * @param {String} query the current query
 * @return {Boolean}
 */ Suggestions.prototype.match = function(candidate, query) {
    return candidate.indexOf(query) > -1;
};
Suggestions.prototype.value = function(value) {
    this.selected = value;
    this.el.value = this.getItemValue(value);
    if (document.createEvent) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent('change', true, false);
        this.el.dispatchEvent(e);
    } else {
        this.el.fireEvent('onchange');
    }
};
Suggestions.prototype.getCandidates = function(callback) {
    var options = {
        pre: '<strong>',
        post: '</strong>',
        extract: (function(d) {
            return this.getItemValue(d);
        }).bind(this)
    };
    var results;
    if (this.options.filter) {
        results = fuzzy.filter(this.query, this.data, options);
        results = results.map((function(item) {
            return {
                original: item.original,
                string: this.render(item.original, item.string)
            };
        }).bind(this));
    } else {
        results = this.data.map((function(d) {
            var renderedString = this.render(d);
            return {
                original: d,
                string: renderedString
            };
        }).bind(this));
    }
    callback(results);
};
/**
 * For a given item in the data array, return what should be used as the candidate string
 *
 * @param {Object|String} item an item from the data array
 * @return {String} item
 */ Suggestions.prototype.getItemValue = function(item) {
    return item;
};
/**
 * For a given item in the data array, return a string of html that should be rendered in the dropdown
 * @param {Object|String} item an item from the data array
 * @param {String} sourceFormatting a string that has pre-formatted html that should be passed directly through the render function 
 * @return {String} html
 */ Suggestions.prototype.render = function(item, sourceFormatting) {
    if (sourceFormatting) {
        // use existing formatting on the source string
        return sourceFormatting;
    }
    var boldString = item.original ? this.getItemValue(item.original) : this.getItemValue(item);
    var indexString = this.normalize(boldString);
    var indexOfQuery = indexString.lastIndexOf(this.query);
    while(indexOfQuery > -1){
        var endIndexOfQuery = indexOfQuery + this.query.length;
        boldString = boldString.slice(0, indexOfQuery) + '<strong>' + boldString.slice(indexOfQuery, endIndexOfQuery) + '</strong>' + boldString.slice(endIndexOfQuery);
        indexOfQuery = indexString.slice(0, indexOfQuery).lastIndexOf(this.query);
    }
    return boldString;
};
/**
 * Render an custom error message in the suggestions list
 * @param {String} msg An html string to render as an error message
 */ Suggestions.prototype.renderError = function(msg) {
    this.list.drawError(msg);
};
module.exports = Suggestions;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/suggestions/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A typeahead component for inputs
 * @class Suggestions
 *
 * @param {HTMLInputElement} el A valid HTML input element
 * @param {Array} data An array of data used for results
 * @param {Object} options
 * @param {Number} [options.limit=5] Max number of results to display in the auto suggest list.
 * @param {Number} [options.minLength=2] Number of characters typed into an input to trigger suggestions.
 * @param {Boolean} [options.hideOnBlur=true] If `true`, hides the suggestions when focus is lost.
 * @return {Suggestions} `this`
 * @example
 * // in the browser
 * var input = document.querySelector('input');
 * var data = [
 *   'Roy Eldridge',
 *   'Roy Hargrove',
 *   'Rex Stewart'
 * ];
 *
 * new Suggestions(input, data);
 *
 * // with options
 * var input = document.querySelector('input');
 * var data = [{
 *   name: 'Roy Eldridge',
 *   year: 1911
 * }, {
 *   name: 'Roy Hargrove',
 *   year: 1969
 * }, {
 *   name: 'Rex Stewart',
 *   year: 1907
 * }];
 *
 * var typeahead = new Suggestions(input, data, {
 *   filter: false, // Disable filtering
 *   minLength: 3, // Number of characters typed into an input to trigger suggestions.
 *   limit: 3, //  Max number of results to display.
 *   hideOnBlur: false // Don't hide results when input loses focus
 * });
 *
 * // As we're passing an object of an arrays as data, override
 * // `getItemValue` by specifying the specific property to search on.
 * typeahead.getItemValue = function(item) { return item.name };
 *
 * input.addEventListener('change', function() {
 *   console.log(typeahead.selected); // Current selected item.
 * });
 *
 * // With browserify
 * var Suggestions = require('suggestions');
 *
 * new Suggestions(input, data);
 */ var Suggestions = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/suggestions/src/suggestions.js [app-ssr] (ecmascript)");
module.exports = Suggestions;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/lodash.debounce/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the `TypeError` message for "Functions" methods. */ var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as references for various `Number` constants. */ var NAN = 0 / 0;
/** `Object#toString` result references. */ var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */ var freeGlobal = ("TURBOPACK compile-time value", "object") == 'object' && /*TURBOPACK member replacement*/ __turbopack_context__.g && /*TURBOPACK member replacement*/ __turbopack_context__.g.Object === Object && /*TURBOPACK member replacement*/ __turbopack_context__.g;
/** Detect free variable `self`. */ var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function('return this')();
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeMax = Math.max, nativeMin = Math.min;
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */ var now = function() {
    return root.Date.now();
};
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */ function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result = wait - timeSinceLastCall;
        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(now());
    }
    function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = debounce;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/exceptions.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    'fr': {
        'name': 'France',
        'bbox': [
            [
                -4.59235,
                41.380007
            ],
            [
                9.560016,
                51.148506
            ]
        ]
    },
    'us': {
        'name': 'United States',
        'bbox': [
            [
                -171.791111,
                18.91619
            ],
            [
                -66.96466,
                71.357764
            ]
        ]
    },
    'ru': {
        'name': 'Russia',
        'bbox': [
            [
                19.66064,
                41.151416
            ],
            [
                190.10042,
                81.2504
            ]
        ]
    },
    'ca': {
        'name': 'Canada',
        'bbox': [
            [
                -140.99778,
                41.675105
            ],
            [
                -52.648099,
                83.23324
            ]
        ]
    }
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/events.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var nanoid = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/nanoid/index.cjs [app-ssr] (ecmascript)").nanoid;
/**
 * Construct a new mapbox event client to send interaction events to the mapbox event service
 * @param {Object} options options with which to create the service
 * @param {String} options.accessToken the mapbox access token to make requests
 * @param {Number} [options.flushInterval=1000] the number of ms after which to flush the event queue
 * @param {Number} [options.maxQueueSize=100] the number of events to queue before flushing
 * @private
 */ function MapboxEventManager(options) {
    this.origin = options.origin || 'https://api.mapbox.com';
    this.endpoint = 'events/v2';
    this.access_token = options.accessToken;
    this.version = '0.3.0';
    this.pluginSessionID = this.generateSessionID();
    this.sessionIncrementer = 0;
    this.userAgent = this.getUserAgent();
    this.options = options;
    this.send = this.send.bind(this);
    // parse global options to be sent with each request
    this.countries = options.countries ? options.countries.split(",") : null;
    this.types = options.types ? options.types.split(",") : null;
    this.bbox = options.bbox ? options.bbox : null;
    this.language = options.language ? options.language.split(",") : null;
    this.limit = options.limit ? +options.limit : null;
    this.locale = navigator.language || null;
    this.enableEventLogging = this.shouldEnableLogging(options);
    this.eventQueue = new Array();
    this.flushInterval = options.flushInterval || 1000;
    this.maxQueueSize = options.maxQueueSize || 100;
    this.timer = this.flushInterval ? setTimeout(this.flush.bind(this), this.flushInterval) : null;
    // keep some state to deduplicate requests if necessary
    this.lastSentInput = "";
    this.lastSentIndex = 0;
}
MapboxEventManager.prototype = {
    /**
     * Send a search.select event to the mapbox events service
     * This event marks the array index of the item selected by the user out of the array of possible options
     * @private
     * @param {Object} selected the geojson feature selected by the user
     * @param {Object} geocoder a mapbox-gl-geocoder instance
     * @returns {Promise}
     */ select: function(selected, geocoder) {
        var payload = this.getEventPayload('search.select', geocoder, {
            selectedFeature: selected
        });
        if (!payload) return; // reject malformed event
        if (payload.resultIndex === this.lastSentIndex && payload.queryString === this.lastSentInput || payload.resultIndex == -1) {
            // don't log duplicate events if the user re-selected the same feature on the same search
            return;
        }
        this.lastSentIndex = payload.resultIndex;
        this.lastSentInput = payload.queryString;
        return this.push(payload);
    },
    /**
     * Send a search-start event to the mapbox events service
     * This turnstile event marks when a user starts a new search
     * @private
     * @param {Object} geocoder a mapbox-gl-geocoder instance
     * @returns {Promise}
     */ start: function(geocoder) {
        var payload = this.getEventPayload('search.start', geocoder);
        if (!payload) return; // reject malformed event
        return this.push(payload);
    },
    /**
   * Send a search-keyevent event to the mapbox events service
   * This event records each keypress in sequence
   * @private
   * @param {Object} keyEvent the keydown event to log
   * @param {Object} geocoder a mapbox-gl-geocoder instance
   * 
   */ keyevent: function(keyEvent, geocoder) {
        //pass invalid event
        if (!keyEvent.key) return;
        // don't send events for keys that don't change the input
        // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
        if (keyEvent.metaKey || [
            9,
            27,
            37,
            39,
            13,
            38,
            40
        ].indexOf(keyEvent.keyCode) !== -1) return;
        var payload = this.getEventPayload('search.keystroke', geocoder, {
            key: keyEvent.key
        });
        if (!payload) return; // reject malformed event
        return this.push(payload);
    },
    /**
   * Send an event to the events service
   *
   * The event is skipped if the instance is not enabled to send logging events
   *
   * @private
   * @param {Object} payload the http POST body of the event
   * @param {Function} [callback] a callback function to invoke when the send has completed
   * @returns {Promise}
   */ send: function(payload, callback) {
        if (!this.enableEventLogging) {
            if (callback) return callback();
            return;
        }
        var options = this.getRequestOptions(payload);
        this.request(options, (function(err) {
            if (err) return this.handleError(err, callback);
            if (callback) {
                return callback();
            }
        }).bind(this));
    },
    /**
   * Get http request options
   * @private
   * @param {*} payload
   */ getRequestOptions: function(payload) {
        if (!Array.isArray(payload)) payload = [
            payload
        ];
        var options = {
            // events must be sent with POST
            method: "POST",
            host: this.origin,
            path: this.endpoint + "?access_token=" + this.access_token,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) //events are arrays
        };
        return options;
    },
    /**
   * Get the event payload to send to the events service
   * Most payload properties are shared across all events
   * @private
   * @param {String} event the name of the event to send to the events service. Valid options are 'search.start', 'search.select', 'search.feedback'.
   * @param {Object} geocoder a mapbox-gl-geocoder instance
   * @param {Object} eventArgs Additional arguments needed for certain event types
   * @param {Object} eventArgs.key The key pressed by the user
   * @param {Object} eventArgs.selectedFeature GeoJSON Feature selected by the user
   * @returns {Object} an event payload
   */ getEventPayload: function(event, geocoder, eventArgs = {}) {
        // Make sure required arguments are present for certain event types
        if (event === 'search.select' && !eventArgs.selectedFeature || event === 'search.keystroke' && !eventArgs.key) {
            return null;
        }
        // Handle proximity, whether null, lat/lng coordinate object, or 'ip'
        var proximity;
        if (!geocoder.options.proximity) {
            proximity = null;
        } else if (typeof geocoder.options.proximity === 'object') {
            proximity = [
                geocoder.options.proximity.longitude,
                geocoder.options.proximity.latitude
            ];
        } else if (geocoder.options.proximity === 'ip') {
            var ipProximityHeader = geocoder._headers ? geocoder._headers['ip-proximity'] : null;
            if (ipProximityHeader && typeof ipProximityHeader === 'string') {
                proximity = ipProximityHeader.split(',').map(parseFloat);
            } else {
                proximity = [
                    999,
                    999
                ]; // Alias for 'ip' in event logs
            }
        } else {
            proximity = geocoder.options.proximity;
        }
        var zoom = geocoder._map ? geocoder._map.getZoom() : undefined;
        var payload = {
            event: event,
            version: this.getEventSchemaVersion(event),
            created: +new Date(),
            sessionIdentifier: this.getSessionId(),
            country: this.countries,
            userAgent: this.userAgent,
            language: this.language,
            bbox: this.bbox,
            types: this.types,
            endpoint: 'mapbox.places',
            autocomplete: geocoder.options.autocomplete,
            fuzzyMatch: geocoder.options.fuzzyMatch,
            proximity: proximity,
            limit: geocoder.options.limit,
            routing: geocoder.options.routing,
            worldview: geocoder.options.worldview,
            mapZoom: zoom,
            keyboardLocale: this.locale
        };
        // get the text in the search bar
        if (event === "search.select") {
            payload.queryString = geocoder.inputString;
        } else if (event != "search.select" && geocoder._inputEl) {
            payload.queryString = geocoder._inputEl.value;
        } else {
            payload.queryString = geocoder.inputString;
        }
        // add additional properties for certain event types
        if ([
            'search.keystroke',
            'search.select'
        ].includes(event)) {
            payload.path = 'geocoding/v5/mapbox.places';
        }
        if (event === 'search.keystroke' && eventArgs.key) {
            payload.lastAction = eventArgs.key;
        } else if (event === 'search.select' && eventArgs.selectedFeature) {
            var selected = eventArgs.selectedFeature;
            var resultIndex = this.getSelectedIndex(selected, geocoder);
            payload.resultIndex = resultIndex;
            payload.resultPlaceName = selected.place_name;
            payload.resultId = selected.id;
            if (selected.properties) {
                payload.resultMapboxId = selected.properties.mapbox_id;
            }
            if (geocoder._typeahead) {
                var results = geocoder._typeahead.data;
                if (results && results.length > 0) {
                    payload.suggestionIds = this.getSuggestionIds(results);
                    payload.suggestionNames = this.getSuggestionNames(results);
                    payload.suggestionTypes = this.getSuggestionTypes(results);
                    payload.suggestionSources = this.getSuggestionSources(results);
                }
            }
        }
        // Finally, validate that required properties are present for API compatibility
        if (!this.validatePayload(payload)) {
            return null;
        }
        return payload;
    },
    /**
   * Wraps the request function for easier testing
   * Make an http request and invoke a callback
   * @private
   * @param {Object} opts options describing the http request to be made
   * @param {Function} callback the callback to invoke when the http request is completed
   */ request: function(opts, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 204) {
                    //success
                    return callback(null);
                } else {
                    return callback(this.statusText);
                }
            }
        };
        xhttp.open(opts.method, opts.host + '/' + opts.path, true);
        for(var header in opts.headers){
            var headerValue = opts.headers[header];
            xhttp.setRequestHeader(header, headerValue);
        }
        xhttp.send(opts.body);
    },
    /**
   * Handle an error that occurred while making a request
   * @param {Object} err an error instance to log
   * @private
   */ handleError: function(err, callback) {
        if (callback) return callback(err);
    },
    /**
   * Generate a session ID to be returned with all of the searches made by this geocoder instance
   * ID is random and cannot be tracked across sessions
   * @private
   */ generateSessionID: function() {
        return nanoid();
    },
    /**
   * Get the a unique session ID for the current plugin session and increment the session counter.
   *
   * @returns {String} The session ID
   */ getSessionId: function() {
        return this.pluginSessionID + '.' + this.sessionIncrementer;
    },
    /**
   * Get a user agent string to send with the request to the events service
   * @private
   */ getUserAgent: function() {
        return 'mapbox-gl-geocoder.' + this.version + "." + navigator.userAgent;
    },
    /**
     * Get the 0-based numeric index of the item that the user selected out of the list of options
     * @private
     * @param {Object} selected the geojson feature selected by the user
     * @param {Object} geocoder a Mapbox-GL-Geocoder instance
     * @returns {Number} the index of the selected result
     */ getSelectedIndex: function(selected, geocoder) {
        if (!geocoder._typeahead) return;
        var results = geocoder._typeahead.data;
        var selectedID = selected.id;
        var resultIDs = results.map(function(feature) {
            return feature.id;
        });
        var selectedIdx = resultIDs.indexOf(selectedID);
        return selectedIdx;
    },
    getSuggestionIds: function(results) {
        return results.map(function(feature) {
            if (feature.properties) {
                return feature.properties.mapbox_id || '';
            }
            return feature.id || '';
        });
    },
    getSuggestionNames: function(results) {
        return results.map(function(feature) {
            return feature.place_name || '';
        });
    },
    getSuggestionTypes: function(results) {
        return results.map(function(feature) {
            if (feature.place_type && Array.isArray(feature.place_type)) {
                return feature.place_type[0] || '';
            }
            return '';
        });
    },
    getSuggestionSources: function(results) {
        return results.map(function(feature) {
            return feature._source || '';
        });
    },
    /**
   * Get the correct schema version for the event
   * @private
   * @param {String} event Name of the event
   * @returns 
   */ getEventSchemaVersion: function(event) {
        if ([
            'search.keystroke',
            'search.select'
        ].includes(event)) {
            return '2.2';
        } else {
            return '2.0';
        }
    },
    /**
   * Checks if a payload has all the required properties for the event type
   * @private
   * @param {Object} payload 
   * @returns 
   */ validatePayload: function(payload) {
        if (!payload || !payload.event) return false;
        var searchStartRequiredProps = [
            'event',
            'created',
            'sessionIdentifier',
            'queryString'
        ];
        var searchKeystrokeRequiredProps = [
            'event',
            'created',
            'sessionIdentifier',
            'queryString',
            'lastAction'
        ];
        var searchSelectRequiredProps = [
            'event',
            'created',
            'sessionIdentifier',
            'queryString',
            'resultIndex',
            'path',
            'suggestionIds'
        ];
        var event = payload.event;
        if (event === 'search.start') {
            return this.objectHasRequiredProps(payload, searchStartRequiredProps);
        } else if (event === 'search.keystroke') {
            return this.objectHasRequiredProps(payload, searchKeystrokeRequiredProps);
        } else if (event === 'search.select') {
            return this.objectHasRequiredProps(payload, searchSelectRequiredProps);
        }
        return true;
    },
    /**
   * Checks of an object has all the required properties
   * @private
   * @param {Object} obj 
   * @param {Array<String>} requiredProps 
   * @returns 
   */ objectHasRequiredProps: function(obj, requiredProps) {
        return requiredProps.every(function(prop) {
            if (prop === 'queryString') {
                return typeof obj[prop] === 'string' && obj[prop].length > 0;
            }
            return obj[prop] !== undefined;
        });
    },
    /**
     * Check whether events should be logged
     * Clients using a localGeocoder or an origin other than mapbox should not have events logged
     * @private
     */ shouldEnableLogging: function(options) {
        if (options.enableEventLogging === false) return false;
        if (options.origin && options.origin !== 'https://api.mapbox.com') return false;
        return true;
    },
    /**
   * Flush out the event queue by sending events to the events service
   * @private
   */ flush: function() {
        if (this.eventQueue.length > 0) {
            this.send(this.eventQueue);
            this.eventQueue = new Array();
        }
        // //reset the timer
        if (this.timer) clearTimeout(this.timer);
        if (this.flushInterval) this.timer = setTimeout(this.flush.bind(this), this.flushInterval);
    },
    /**
   * Push event into the pending queue
   * @param {Object} evt the event to send to the events service
   * @param {Boolean} forceFlush indicates that the event queue should be flushed after adding this event regardless of size of the queue
   * @private
   */ push: function(evt, forceFlush) {
        this.eventQueue.push(evt);
        if (this.eventQueue.length >= this.maxQueueSize || forceFlush) {
            this.flush();
        }
    },
    /**
   * Flush any remaining events from the queue before it is removed
   * @private
   */ remove: function() {
        this.flush();
    }
};
module.exports = MapboxEventManager;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/localization.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Localized values for the placeholder string
 * 
 * @private
 */ var placeholder = {
    // list drawn from https://docs.mapbox.com/api/search/#language-coverage
    'de': 'Suche',
    'it': 'Ricerca',
    'en': 'Search',
    'nl': 'Zoeken',
    'fr': 'Chercher',
    'ca': 'Cerca',
    'he': 'לחפש',
    'ja': 'サーチ',
    'lv': 'Meklēt',
    'pt': 'Procurar',
    'sr': 'Претрага',
    'zh': '搜索',
    'cs': 'Vyhledávání',
    'hu': 'Keresés',
    'ka': 'ძიება',
    'nb': 'Søke',
    'sk': 'Vyhľadávanie',
    'th': 'ค้นหา',
    'fi': 'Hae',
    'is': 'Leita',
    'ko': '수색',
    'pl': 'Szukaj',
    'sl': 'Iskanje',
    'fa': 'جستجو',
    'ru': 'Поиск' //russian
};
module.exports = {
    placeholder: placeholder
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/geolocation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function Geolocation() {}
Geolocation.prototype = {
    isSupport: function() {
        return Boolean(window.navigator.geolocation);
    },
    getCurrentPosition: function() {
        const positionOptions = {
            enableHighAccuracy: true
        };
        return new Promise(function(resolve, reject) {
            window.navigator.geolocation.getCurrentPosition(resolve, reject, positionOptions);
        });
    }
};
module.exports = Geolocation;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * This function transforms the feature from reverse geocoding to plain text with specified accuracy
 * @param {object} feature 
 * @param {string} accuracy 
 * @returns 
 */ function transformFeatureToGeolocationText(feature, accuracy) {
    const addrInfo = getAddressInfo(feature);
    const addressAccuracy = [
        'address',
        'street',
        'place',
        'country'
    ];
    var currentAccuracy;
    if (typeof accuracy === 'function') {
        return accuracy(addrInfo);
    }
    const accuracyIndex = addressAccuracy.indexOf(accuracy);
    if (accuracyIndex === -1) {
        currentAccuracy = addressAccuracy;
    } else {
        currentAccuracy = addressAccuracy.slice(accuracyIndex);
    }
    return currentAccuracy.reduce(function(acc, name) {
        if (!addrInfo[name]) {
            return acc;
        }
        if (acc !== '') {
            acc = acc + ', ';
        }
        return acc + addrInfo[name];
    }, '');
}
/**
 * This function transforms the feature from reverse geocoding to AddressInfo object
 * @param {object} feature 
 * @returns {object}
 */ function getAddressInfo(feature) {
    const houseNumber = feature.address || '';
    const street = feature.text || '';
    const placeName = feature.place_name || '';
    const address = placeName.split(',')[0];
    const addrInfo = {
        address: address,
        houseNumber: houseNumber,
        street: street,
        placeName: placeName
    };
    feature.context.forEach(function(context) {
        const layer = context.id.split('.')[0];
        addrInfo[layer] = context.text;
    });
    return addrInfo;
}
const REVERSE_GEOCODE_COORD_RGX = /^[ ]*(-?\d{1,3}(\.\d{0,256})?)[, ]+(-?\d{1,3}(\.\d{0,256})?)[ ]*$/;
module.exports = {
    transformFeatureToGeolocationText: transformFeatureToGeolocationText,
    getAddressInfo: getAddressInfo,
    REVERSE_GEOCODE_COORD_RGX: REVERSE_GEOCODE_COORD_RGX
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Typeahead = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/suggestions/index.js [app-ssr] (ecmascript)");
var debounce = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/lodash.debounce/index.js [app-ssr] (ecmascript)");
var extend = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)").EventEmitter;
var exceptions = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/exceptions.js [app-ssr] (ecmascript)");
var MapboxClient = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/index.js [app-ssr] (ecmascript)");
var mbxGeocoder = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/geocoding.js [app-ssr] (ecmascript)");
var MapboxEventManager = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/events.js [app-ssr] (ecmascript)");
var localization = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/localization.js [app-ssr] (ecmascript)");
var subtag = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/subtag/subtag.js [app-ssr] (ecmascript)");
var Geolocation = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/geolocation.js [app-ssr] (ecmascript)");
var utils = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-gl-geocoder/lib/utils.js [app-ssr] (ecmascript)");
const GEOCODE_REQUEST_TYPE = {
    FORWARD: 0,
    LOCAL: 1,
    REVERSE: 2
};
/**
 * Don't include this as part of the options object when creating a new MapboxGeocoder instance.
 */ function getFooterNode() {
    var div = document.createElement('div');
    div.className = 'mapboxgl-ctrl-geocoder--powered-by';
    div.innerHTML = '<a href="https://www.mapbox.com/search-service" target="_blank">Powered by Mapbox</a>';
    return div;
}
/**
 * A geocoder component using the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/#geocoding)
 * @class MapboxGeocoder
 * @param {Object} options
 * @param {String} options.accessToken Required.
 * @param {String} [options.origin=https://api.mapbox.com] Use to set a custom API origin.
 * @param {Object} [options.mapboxgl] A [mapbox-gl](https://github.com/mapbox/mapbox-gl-js) instance to use when creating [Markers](https://docs.mapbox.com/mapbox-gl-js/api/#marker). Required if `options.marker` is `true`.
 * @param {Number} [options.zoom=16] On geocoded result what zoom level should the map animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
 * @param {Boolean|Object} [options.flyTo=true] If `false`, animating the map to a selected result is disabled. If `true`, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto) or [`fitBounds`](https://docs.mapbox.com/mapbox-gl-js/api/#map#fitbounds) method providing control over the animation of the transition.
 * @param {String} [options.placeholder=Search] Override the default placeholder attribute value.
 * @param {Object|'ip'} [options.proximity] a geographical point given as an object with `latitude` and `longitude` properties, or the string 'ip' to use a user's IP address location. Search results closer to this point will be given higher priority.
 * @param {Boolean} [options.trackProximity=true] If `true`, the geocoder proximity will dynamically update based on the current map view or user's IP location, depending on zoom level.
 * @param {Boolean} [options.collapsed=false] If `true`, the geocoder control will collapse until hovered or in focus.
 * @param {Boolean} [options.clearAndBlurOnEsc=false] If `true`, the geocoder control will clear it's contents and blur when user presses the escape key.
 * @param {Boolean} [options.clearOnBlur=false] If `true`, the geocoder control will clear its value when the input blurs.
 * @param {Array} [options.bbox] a bounding box argument: this is
 * a bounding box given as an array in the format `[minX, minY, maxX, maxY]`.
 * Search results will be limited to the bounding box.
 * @param {string} [options.countries] a comma separated list of country codes to
 * limit results to specified country or countries.
 * @param {string} [options.types] a comma seperated list of types that filter
 * results to match those specified. See https://docs.mapbox.com/api/search/#data-types
 * for available types.
 * If reverseGeocode is enabled and no type is specified, the type defaults to POIs. Otherwise, if you configure more than one type, the first type will be used.
 * @param {Number} [options.minLength=2] Minimum number of characters to enter before results are shown.
 * @param {Number} [options.limit=5] Maximum number of results to show.
 * @param {string} [options.language] Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas. Defaults to the browser's language settings.
 * @param {Function} [options.filter] A function which accepts a Feature in the [extended GeoJSON](https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
 * @param {Function} [options.localGeocoder] A function accepting the query string which performs local geocoding to supplement results from the Mapbox Geocoding API. Expected to return an Array of GeoJSON Features in the [extended GeoJSON](https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object) format.
 * @param {Function} [options.externalGeocoder] A function accepting the query string and current features list which performs geocoding to supplement results from the Mapbox Geocoding API. Expected to return a Promise which resolves to an Array of GeoJSON Features in the [extended GeoJSON](https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object) format.
 * @param {distance|score} [options.reverseMode=distance] - Set the factors that are used to sort nearby results.
 * @param {boolean} [options.reverseGeocode=false] If `true`, enable reverse geocoding mode. In reverse geocoding, search input is expected to be coordinates in the form `lat, lon`, with suggestions being the reverse geocodes.
 * @param {boolean} [options.flipCoordinates=false] If `true`, search input coordinates for reverse geocoding is expected to be in the form `lon, lat` instead of the default `lat, lon`.
 * @param {Boolean} [options.enableEventLogging=true] Allow Mapbox to collect anonymous usage statistics from the plugin.
 * @param {Boolean|Object} [options.marker=true]  If `true`, a [Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker) will be added to the map at the location of the user-selected result using a default set of Marker options.  If the value is an object, the marker will be constructed using these options. If `false`, no marker will be added to the map. Requires that `options.mapboxgl` also be set.
 * @param {Function} [options.render] A function that specifies how the results should be rendered in the dropdown menu. This function should accepts a single [extended GeoJSON](https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object) object as input and return a string. Any HTML in the returned string will be rendered.
 * @param {Function} [options.getItemValue] A function that specifies how the selected result should be rendered in the search bar. This function should accept a single [extended GeoJSON](https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object) object as input and return a string. HTML tags in the output string will not be rendered. Defaults to `(item) => item.place_name`.
 * @param {String} [options.mode=mapbox.places] A string specifying the geocoding [endpoint](https://docs.mapbox.com/api/search/#endpoints) to query. Options are `mapbox.places` and `mapbox.places-permanent`. The `mapbox.places-permanent` mode requires an enterprise license for permanent geocodes.
 * @param {Boolean} [options.localGeocoderOnly=false] If `true`, indicates that the `localGeocoder` results should be the only ones returned to the user. If `false`, indicates that the `localGeocoder` results should be combined with those from the Mapbox API with the `localGeocoder` results ranked higher.
 * @param {Boolean} [options.autocomplete=true] Specify whether to return autocomplete results or not. When autocomplete is enabled, results will be included that start with the requested string, rather than just responses that match it exactly.
 * @param {Boolean} [options.fuzzyMatch=true] Specify whether the Geocoding API should attempt approximate, as well as exact, matching when performing searches, or whether it should opt out of this behavior and only attempt exact matching.
 * @param {Boolean} [options.routing=false] Specify whether to request additional metadata about the recommended navigation destination corresponding to the feature or not. Only applicable for address features.
 * @param {String} [options.worldview="us"] Filter results to geographic features whose characteristics are defined differently by audiences belonging to various regional, cultural, or political groups.
 * @param {Boolean} [options.enableGeolocation=false] If `true` enable user geolocation feature.
 * @param {Boolean} [options.useBrowserFocus=false] If `true`, the geocoder will use the browser's focus event to show suggestions. If `false`, it will only highlight active suggestions and Tab will not propagate to the suggestions list.
 * @param {('address'|'street'|'place'|'country')} [options.addressAccuracy="street"] The accuracy for the geolocation feature with which we define the address line to fill. The browser API returns the user's position with accuracy, and sometimes we can get the neighbor's address. To prevent receiving an incorrect address, you can reduce the accuracy of the definition.
 * @example
 * var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
 * map.addControl(geocoder);
 * @return {MapboxGeocoder} `this`
 *
 */ function MapboxGeocoder(options) {
    this._eventEmitter = new EventEmitter();
    this.options = extend({}, this.options, options);
    this.inputString = '';
    this.fresh = true;
    this.lastSelected = null;
    this.geolocation = new Geolocation();
}
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
MapboxGeocoder.prototype = {
    options: {
        zoom: 16,
        flyTo: true,
        trackProximity: true,
        minLength: 2,
        reverseGeocode: false,
        flipCoordinates: false,
        limit: 5,
        origin: 'https://api.mapbox.com',
        enableEventLogging: true,
        marker: true,
        mapboxgl: null,
        collapsed: false,
        clearAndBlurOnEsc: false,
        clearOnBlur: false,
        enableGeolocation: false,
        addressAccuracy: 'street',
        useBrowserFocus: false,
        getItemValue: function(item) {
            return item.place_name;
        },
        render: function(item) {
            var placeName = escapeHtml(item.place_name).split(',');
            return '<div class="mapboxgl-ctrl-geocoder--suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title">' + placeName[0] + '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address">' + placeName.splice(1, placeName.length).join(',') + '</div></div>';
        }
    },
    _headers: {},
    /**
   * Add the geocoder to a container. The container can be either a `mapboxgl.Map`, an `HTMLElement` or a CSS selector string.
   *
   * If the container is a [`mapboxgl.Map`](https://docs.mapbox.com/mapbox-gl-js/api/map/), this function will behave identically to [`Map.addControl(geocoder)`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addcontrol).
   * If the container is an instance of [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), then the geocoder will be appended as a child of that [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
   * If the container is a [CSS selector string](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), the geocoder will be appended to the element returned from the query.
   *
   * This function will throw an error if the container is none of the above.
   * It will also throw an error if the referenced HTML element cannot be found in the `document.body`.
   *
   * For example, if the HTML body contains the element `<div id='geocoder-container'></div>`, the following script will append the geocoder to `#geocoder-container`:
   *
   * ```javascript
   * var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
   * geocoder.addTo('#geocoder-container');
   * ```
   * @param {String|HTMLElement|mapboxgl.Map} container A reference to the container to which to add the geocoder
   */ addTo: function(container) {
        function addToExistingContainer(geocoder, container) {
            if (!document.body.contains(container)) {
                throw new Error("Element provided to #addTo() exists, but is not in the DOM");
            }
            const el = geocoder.onAdd(); //returns the input elements, which are then added to the requested html container
            container.appendChild(el);
        }
        // if the container is a map, add the control like normal
        if (container._controlContainer) {
            //  it's a mapbox-gl map, add like normal
            container.addControl(this);
        } else if (container instanceof HTMLElement) {
            addToExistingContainer(this, container);
        } else if (typeof container == 'string') {
            const parent = document.querySelectorAll(container);
            if (parent.length === 0) {
                throw new Error("Element ", container, "not found.");
            }
            if (parent.length > 1) {
                throw new Error("Geocoder can only be added to a single html element");
            }
            addToExistingContainer(this, parent[0]);
        } else {
            throw new Error("Error: addTo must be a mapbox-gl-js map, an html element, or a CSS selector query for a single html element");
        }
    },
    onAdd: function(map) {
        if (map && typeof map != 'string') {
            this._map = map;
        }
        this.setLanguage();
        if (!this.options.localGeocoderOnly) {
            this.geocoderService = mbxGeocoder(MapboxClient({
                accessToken: this.options.accessToken,
                origin: this.options.origin
            }));
        }
        if (this.options.localGeocoderOnly && !this.options.localGeocoder) {
            throw new Error("A localGeocoder function must be specified to use localGeocoderOnly mode");
        }
        this.eventManager = new MapboxEventManager(this.options);
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onPaste = this._onPaste.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._showButton = this._showButton.bind(this);
        this._hideButton = this._hideButton.bind(this);
        this._onQueryResult = this._onQueryResult.bind(this);
        this.clear = this.clear.bind(this);
        this._updateProximity = this._updateProximity.bind(this);
        this._collapse = this._collapse.bind(this);
        this._unCollapse = this._unCollapse.bind(this);
        this._clear = this._clear.bind(this);
        this._clearOnBlur = this._clearOnBlur.bind(this);
        this._geolocateUser = this._geolocateUser.bind(this);
        this._onSuggestionItemFocus = this._onSuggestionItemFocus.bind(this);
        this._onSuggestionItemKeyDown = this._onSuggestionItemKeydown.bind(this);
        var el = this.container = document.createElement('div');
        el.className = 'mapboxgl-ctrl-geocoder mapboxgl-ctrl';
        var searchIcon = this.createIcon('search', '<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>');
        this._inputEl = document.createElement('input');
        this._inputEl.type = 'text';
        this._inputEl.className = 'mapboxgl-ctrl-geocoder--input';
        this.setPlaceholder();
        if (this.options.collapsed) {
            this._collapse();
            this.container.addEventListener('mouseenter', this._unCollapse);
            this.container.addEventListener('mouseleave', this._collapse);
            this._inputEl.addEventListener('focus', this._unCollapse);
        }
        if (this.options.collapsed || this.options.clearOnBlur) {
            this._inputEl.addEventListener('blur', this._onBlur);
        }
        this._inputEl.addEventListener('keydown', debounce(this._onKeyDown, 200));
        this._inputEl.addEventListener('paste', this._onPaste);
        this._inputEl.addEventListener('change', this._onChange);
        this.container.addEventListener('mouseenter', this._showButton);
        this.container.addEventListener('mouseleave', this._hideButton);
        this._inputEl.addEventListener('keyup', (function(e) {
            this.eventManager.keyevent(e, this);
        }).bind(this));
        var actions = document.createElement('div');
        actions.classList.add('mapboxgl-ctrl-geocoder--pin-right');
        this._clearEl = document.createElement('button');
        this._clearEl.setAttribute('aria-label', 'Clear');
        this._clearEl.addEventListener('click', this.clear);
        this._clearEl.className = 'mapboxgl-ctrl-geocoder--button';
        var buttonIcon = this.createIcon('close', '<path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>');
        this._clearEl.appendChild(buttonIcon);
        this._loadingEl = this.createIcon('loading', '<path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>');
        actions.appendChild(this._clearEl);
        actions.appendChild(this._loadingEl);
        el.appendChild(searchIcon);
        el.appendChild(this._inputEl);
        if (this.options.enableGeolocation && this.geolocation.isSupport()) {
            this._geolocateEl = document.createElement('button');
            this._geolocateEl.setAttribute('aria-label', 'Geolocate');
            this._geolocateEl.addEventListener('click', this._geolocateUser);
            this._geolocateEl.className = 'mapboxgl-ctrl-geocoder--button';
            var geolocateIcon = this.createIcon('geolocate', '<path d="M12.999 3.677L2.042 8.269c-.962.403-.747 1.823.29 1.912l5.032.431.431 5.033c.089 1.037 1.509 1.252 1.912.29l4.592-10.957c.345-.822-.477-1.644-1.299-1.299z" fill="#4264fb"/>');
            this._geolocateEl.appendChild(geolocateIcon);
            actions.appendChild(this._geolocateEl);
            this._showGeolocateButton();
        }
        var typeahead = this._typeahead = new Typeahead(this._inputEl, [], {
            hideOnBlur: !this.options.useBrowserFocus,
            filter: false,
            minLength: this.options.minLength,
            limit: this.options.limit
        });
        // To preserve tab navigation order
        el.insertBefore(actions, typeahead.list.wrapper);
        this.setRenderFunction(this.options.render);
        typeahead.getItemValue = this.options.getItemValue;
        const handleKeyDownTypeahead = this._typeahead.handleKeyDown.bind(this._typeahead);
        const handleKeyUpTypeahead = this._typeahead.handleKeyUp.bind(this._typeahead);
        this._typeahead.handleKeyUp;
        if (this.options.useBrowserFocus) {
            this._typeahead.handleKeyDown = (function(e) {
                if (e.keyCode === 9 && !typeahead.list.isEmpty()) {
                    return;
                }
                // Arrow down
                if (e.keyCode === 40) {
                    this._typeahead.list.active = 0;
                    this._typeahead.list.element.querySelectorAll('li').forEach(function(item) {
                        item.classList.remove('active');
                    });
                    this._typeahead.list.element.querySelectorAll('li')[0].classList.add('active');
                    this._typeahead.list.element.querySelectorAll('li')[0].focus();
                    return;
                // Arrow up
                } else if (e.keyCode === 38) {
                    this._typeahead.list.active = typeahead.list.items.length - 1;
                    this._typeahead.list.element.querySelectorAll('li').forEach(function(item) {
                        item.classList.remove('active');
                    });
                    this._typeahead.list.element.querySelectorAll('li')[this._typeahead.list.active].classList.add('active');
                    this._typeahead.list.element.querySelectorAll('li')[this._typeahead.list.active].focus();
                    return;
                }
                handleKeyDownTypeahead(e);
            }).bind(this);
            this._typeahead.handleKeyUp = function(e) {
                if (e && e.keyCode === 16) {
                    e.preventDefault();
                    return;
                }
                handleKeyUpTypeahead(e);
            };
        }
        // Add support for footer.
        var parentDraw = typeahead.list.draw;
        var footerNode = this._footerNode = getFooterNode();
        var self = this;
        typeahead.list.draw = function() {
            if (self.options.useBrowserFocus) {
                typeahead.list.element.querySelectorAll('li').forEach(function(item) {
                    item.removeEventListener('focus', self._onSuggestionItemFocus);
                    item.removeEventListener('keydown', self._onSuggestionItemKeyDown);
                });
            }
            parentDraw.call(this);
            if (self.options.useBrowserFocus) {
                typeahead.list.element.querySelectorAll('li').forEach((function(item, index) {
                    if (index === 0) {
                        item.focus();
                    }
                    item.setAttribute('data-index', index);
                    item.tabIndex = 0;
                    item.addEventListener('focus', this._onSuggestionItemFocus);
                    item.addEventListener('keydown', this._onSuggestionItemKeyDown);
                }).bind(self));
            }
            footerNode.addEventListener('mousedown', (function() {
                this.selectingListItem = true;
            }).bind(this));
            footerNode.addEventListener('mouseup', (function() {
                this.selectingListItem = false;
            }).bind(this));
            this.element.appendChild(footerNode);
        };
        this.mapMarker = null;
        this._handleMarker = this._handleMarker.bind(this);
        if (this._map) {
            if (this.options.trackProximity) {
                this._updateProximity();
                this._map.on('moveend', this._updateProximity);
            }
            this._mapboxgl = this.options.mapboxgl;
            if (!this._mapboxgl && this.options.marker) {
                // eslint-disable-next-line no-console
                console.error("No mapboxgl detected in options. Map markers are disabled. Please set options.mapboxgl.");
                this.options.marker = false;
            }
        }
        return el;
    },
    _onSuggestionItemKeydown (e) {
        const keyCode = e.keyCode;
        if (keyCode === 9) {
            return;
        }
        if (keyCode === 13) {
            e.preventDefault();
            const activeItem = this._typeahead.list.element.querySelector('.active');
            if (activeItem) {
                const itemIndex = activeItem.getAttribute('data-index');
                const item = this._typeahead.list.items[itemIndex];
                if (item) {
                    this._typeahead.value(item.original);
                    this._typeahead.list.hide();
                }
            }
        } else if (keyCode === 38 || keyCode === 40) {
            const items = this._typeahead.list.element.querySelectorAll('li');
            if (items.length > 0) {
                if (keyCode === 38) {
                    if (this._typeahead.list.active > 0) {
                        e.preventDefault();
                        this._typeahead.list.active--;
                    } else {
                        this._typeahead.el.focus();
                        return;
                    }
                } else if (keyCode === 40) {
                    e.preventDefault();
                    if (this._typeahead.list.active < items.length - 1) {
                        this._typeahead.list.active++;
                    } else {
                        return;
                    }
                }
                items.forEach(function(item) {
                    item.classList.remove('active');
                });
                const activeItem = items[this._typeahead.list.active];
                if (activeItem) {
                    activeItem.classList.add('active');
                    activeItem.focus();
                }
            }
        }
    },
    _onSuggestionItemFocus (e) {
        this._typeahead.list.active = e.target.getAttribute('data-index');
        this._typeahead.list.element.querySelectorAll('li').forEach(function(item) {
            item.classList.remove('active');
        });
        e.target.classList.add('active');
    },
    _geolocateUser: function() {
        this._hideGeolocateButton();
        this._showLoadingIcon();
        this.geolocation.getCurrentPosition().then((function(geolocationPosition) {
            this._hideLoadingIcon();
            const geojson = {
                geometry: {
                    type: 'Point',
                    coordinates: [
                        geolocationPosition.coords.longitude,
                        geolocationPosition.coords.latitude
                    ]
                }
            };
            this._handleMarker(geojson);
            this._fly(geojson);
            this._typeahead.clear();
            this._typeahead.selected = true;
            this.lastSelected = JSON.stringify(geojson);
            this._showClearButton();
            this.fresh = false;
            const config = {
                limit: 1,
                language: [
                    this.options.language
                ],
                query: geojson.geometry.coordinates,
                types: [
                    "address"
                ]
            };
            if (this.options.localGeocoderOnly) {
                const text = geojson.geometry.coordinates[0] + ',' + geojson.geometry.coordinates[1];
                this._setInputValue(text);
                this._eventEmitter.emit('result', {
                    result: geojson
                });
            } else {
                this.geocoderService.reverseGeocode(config).send().then((function(resp) {
                    const feature = resp.body.features[0];
                    if (feature) {
                        const locationText = utils.transformFeatureToGeolocationText(feature, this.options.addressAccuracy);
                        this._setInputValue(locationText);
                        feature.user_coordinates = geojson.geometry.coordinates;
                        this._eventEmitter.emit('result', {
                            result: feature
                        });
                    } else {
                        this._eventEmitter.emit('result', {
                            result: {
                                user_coordinates: geojson.geometry.coordinates
                            }
                        });
                    }
                }).bind(this));
            }
        }).bind(this)).catch((function(error) {
            if (error.code === 1) {
                this._renderUserDeniedGeolocationError();
            } else {
                this._renderLocationError();
            }
            this._hideLoadingIcon();
            this._showGeolocateButton();
            this._hideAttribution();
        }).bind(this));
    },
    createIcon: function(name, path) {
        var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('class', 'mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-' + name);
        icon.setAttribute('viewBox', '0 0 18 18');
        icon.setAttribute('xml:space', 'preserve');
        icon.setAttribute('width', 18);
        icon.setAttribute('height', 18);
        icon.innerHTML = path;
        return icon;
    },
    onRemove: function() {
        this.container.parentNode.removeChild(this.container);
        if (this.options.trackProximity && this._map) {
            this._map.off('moveend', this._updateProximity);
        }
        this._removeMarker();
        this._map = null;
        return this;
    },
    _setInputValue: function(value) {
        this._inputEl.value = value;
        setTimeout((function() {
            this._inputEl.focus();
            this._inputEl.scrollLeft = 0;
            this._inputEl.setSelectionRange(0, 0);
        }).bind(this), 1);
    },
    _onPaste: function(e) {
        var value = (e.clipboardData || window.clipboardData).getData('text');
        if (value.length >= this.options.minLength) {
            this._geocode(value);
        }
    },
    _onKeyDown: function(e) {
        var ESC_KEY_CODE = 27, TAB_KEY_CODE = 9;
        if (e.keyCode === ESC_KEY_CODE && this.options.clearAndBlurOnEsc) {
            this._clear(e);
            return this._inputEl.blur();
        }
        // if target has shadowRoot, then get the actual active element inside the shadowRoot
        var target = e.target && e.target.shadowRoot ? e.target.shadowRoot.activeElement : e.target;
        var value = target ? target.value : '';
        if (!value) {
            this.fresh = true;
            // the user has removed all the text
            if (e.keyCode !== TAB_KEY_CODE) this.clear(e);
            this._showGeolocateButton();
            return this._hideClearButton();
        }
        this._hideGeolocateButton();
        // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
        if (e.metaKey || [
            TAB_KEY_CODE,
            ESC_KEY_CODE,
            37,
            39,
            13,
            38,
            40
        ].indexOf(e.keyCode) !== -1) return;
        if (target.value.length >= this.options.minLength) {
            this._geocode(target.value);
        }
    },
    _showButton: function() {
        if (this._typeahead.selected) this._showClearButton();
    },
    _hideButton: function() {
        if (this._typeahead.selected) this._hideClearButton();
    },
    _showClearButton: function() {
        this._clearEl.style.display = 'block';
    },
    _hideClearButton: function() {
        this._clearEl.style.display = 'none';
    },
    _showGeolocateButton: function() {
        if (this._geolocateEl && this.geolocation.isSupport()) {
            this._geolocateEl.style.display = 'block';
        }
    },
    _hideGeolocateButton: function() {
        if (this._geolocateEl) {
            this._geolocateEl.style.display = 'none';
        }
    },
    _showLoadingIcon: function() {
        this._loadingEl.style.display = 'block';
    },
    _hideLoadingIcon: function() {
        this._loadingEl.style.display = 'none';
    },
    _showAttribution: function() {
        this._footerNode.style.display = 'block';
    },
    _hideAttribution: function() {
        this._footerNode.style.display = 'none';
    },
    _onBlur: function(e) {
        if (this.options.clearOnBlur) {
            this._clearOnBlur(e);
        }
        if (this.options.collapsed) {
            this._collapse();
        }
    },
    _onChange: function() {
        var selected = this._typeahead.selected;
        if (selected && JSON.stringify(selected) !== this.lastSelected) {
            this._hideClearButton();
            if (this.options.flyTo) {
                this._fly(selected);
            }
            if (this.options.marker && this._mapboxgl) {
                this._handleMarker(selected);
            }
            // After selecting a feature, re-focus the textarea and set
            // cursor at start.
            this._inputEl.focus();
            this._inputEl.scrollLeft = 0;
            this._inputEl.setSelectionRange(0, 0);
            this.lastSelected = JSON.stringify(selected);
            this._eventEmitter.emit('result', {
                result: selected
            });
            this.eventManager.select(selected, this);
        }
    },
    _fly: function(selected) {
        var flyOptions;
        if (selected.properties && exceptions[selected.properties.short_code]) {
            // Certain geocoder search results return (and therefore zoom to fit)
            // an unexpectedly large bounding box: for example, both Russia and the
            // USA span both sides of -180/180, or France includes the island of
            // Reunion in the Indian Ocean. An incomplete list of these exceptions
            // at ./exceptions.json provides "reasonable" bounding boxes as a
            // short-term solution; this may be amended as necessary.
            flyOptions = extend({}, this.options.flyTo);
            if (this._map) {
                this._map.fitBounds(exceptions[selected.properties.short_code].bbox, flyOptions);
            }
        } else if (selected.bbox) {
            var bbox = selected.bbox;
            flyOptions = extend({}, this.options.flyTo);
            if (this._map) {
                this._map.fitBounds([
                    [
                        bbox[0],
                        bbox[1]
                    ],
                    [
                        bbox[2],
                        bbox[3]
                    ]
                ], flyOptions);
            }
        } else {
            var defaultFlyOptions = {
                zoom: this.options.zoom
            };
            flyOptions = extend({}, defaultFlyOptions, this.options.flyTo);
            //  ensure that center is not overriden by custom options
            if (selected.center) {
                flyOptions.center = selected.center;
            } else if (selected.geometry && selected.geometry.type && selected.geometry.type === 'Point' && selected.geometry.coordinates) {
                flyOptions.center = selected.geometry.coordinates;
            }
            if (this._map) {
                this._map.flyTo(flyOptions);
            }
        }
    },
    _requestType: function(options, search) {
        var type;
        if (options.localGeocoderOnly) {
            type = GEOCODE_REQUEST_TYPE.LOCAL;
        } else if (options.reverseGeocode && utils.REVERSE_GEOCODE_COORD_RGX.test(search)) {
            type = GEOCODE_REQUEST_TYPE.REVERSE;
        } else {
            type = GEOCODE_REQUEST_TYPE.FORWARD;
        }
        return type;
    },
    _setupConfig: function(requestType, search) {
        // Possible config properties to pass to client
        const keys = [
            'bbox',
            'limit',
            'proximity',
            'countries',
            'types',
            'language',
            'reverseMode',
            'mode',
            'autocomplete',
            'fuzzyMatch',
            'routing',
            'worldview'
        ];
        const spacesOrCommaRgx = /[\s,]+/;
        var self = this;
        var config = keys.reduce(function(config, key) {
            // don't include undefined/null params, but allow boolean, among other, values
            if (self.options[key] === undefined || self.options[key] === null) {
                return config;
            }
            // countries, types, and language need to be passed in as arrays to client
            // https://github.com/mapbox/mapbox-sdk-js/blob/master/services/geocoding.js#L38-L47
            [
                'countries',
                'types',
                'language'
            ].indexOf(key) > -1 ? config[key] = self.options[key].split(spacesOrCommaRgx) : config[key] = self.options[key];
            const isCoordKey = typeof self.options[key].longitude === 'number' && typeof self.options[key].latitude === 'number';
            if (key === 'proximity' && isCoordKey) {
                const lng = self.options[key].longitude;
                const lat = self.options[key].latitude;
                config[key] = [
                    lng,
                    lat
                ];
            }
            return config;
        }, {});
        switch(requestType){
            case GEOCODE_REQUEST_TYPE.REVERSE:
                {
                    var coords = search.split(spacesOrCommaRgx).map(function(c) {
                        return parseFloat(c, 10);
                    });
                    if (!self.options.flipCoordinates) {
                        coords.reverse();
                    }
                    // client only accepts one type for reverseGeocode, so
                    // use first config type if one, if not default to poi
                    config.types ? [
                        config.types[0]
                    ] : [
                        "poi"
                    ];
                    config = extend(config, {
                        query: coords,
                        limit: 1
                    });
                    // Remove config options not supported by the reverseGeocoder
                    [
                        'proximity',
                        'autocomplete',
                        'fuzzyMatch',
                        'bbox'
                    ].forEach(function(key) {
                        if (key in config) {
                            delete config[key];
                        }
                    });
                }
                break;
            case GEOCODE_REQUEST_TYPE.FORWARD:
                {
                    // Ensure that any reverse geocoding looking request is cleaned up
                    // to be processed as only a forward geocoding request by the server.
                    const trimmedSearch = search.trim();
                    const reverseGeocodeCoordRgx = /^(-?\d{1,3}(\.\d{0,256})?)[, ]+(-?\d{1,3}(\.\d{0,256})?)?$/;
                    if (reverseGeocodeCoordRgx.test(trimmedSearch)) {
                        search = search.replace(/,/g, ' ');
                    }
                    config = extend(config, {
                        query: search
                    });
                }
                break;
        }
        config.session_token = this.eventManager.getSessionId();
        return config;
    },
    _geocode: function(searchInput) {
        this.inputString = searchInput;
        this._showLoadingIcon();
        this._eventEmitter.emit('loading', {
            query: searchInput
        });
        const requestType = this._requestType(this.options, searchInput);
        const config = this._setupConfig(requestType, searchInput);
        var request;
        switch(requestType){
            case GEOCODE_REQUEST_TYPE.LOCAL:
                request = Promise.resolve();
                break;
            case GEOCODE_REQUEST_TYPE.FORWARD:
                request = this.geocoderService.forwardGeocode(config).send();
                break;
            case GEOCODE_REQUEST_TYPE.REVERSE:
                request = this.geocoderService.reverseGeocode(config).send();
                break;
        }
        var localGeocoderRes = this.options.localGeocoder ? this.options.localGeocoder(searchInput) || [] : [];
        var externalGeocoderRes = [];
        var geocoderError = null;
        request.catch((function(error) {
            geocoderError = error;
        }).bind(this)).then((function(response) {
            this._hideLoadingIcon();
            var res = {};
            if (!response) {
                res = {
                    type: 'FeatureCollection',
                    features: []
                };
            } else if (response.statusCode == '200') {
                res = response.body;
                res.request = response.request;
                res.headers = response.headers;
                this._headers = response.headers;
            }
            res.config = config;
            if (this.fresh) {
                this.eventManager.start(this);
                this.fresh = false;
            }
            // Tag Mapbox as the source for Geocoding API results, to differentiate from local or external geocoder federated results
            if (res.features && res.features.length) {
                res.features.map(function(feature) {
                    feature._source = 'mapbox';
                });
            }
            // supplement Mapbox Geocoding API results with locally populated results
            res.features = res.features ? localGeocoderRes.concat(res.features) : localGeocoderRes;
            if (this.options.externalGeocoder) {
                externalGeocoderRes = this.options.externalGeocoder(searchInput, res.features) || Promise.resolve([]);
                // supplement Mapbox Geocoding API results with features returned by a promise
                return externalGeocoderRes.then(function(features) {
                    res.features = res.features ? features.concat(res.features) : features;
                    return res;
                }, function() {
                    // on error, display the original result
                    return res;
                });
            }
            return res;
        }).bind(this)).then((function(res) {
            if (geocoderError) {
                throw geocoderError;
            }
            // apply results filter if provided
            if (this.options.filter && res.features.length) {
                res.features = res.features.filter(this.options.filter);
            }
            if (res.features.length) {
                this._showClearButton();
                this._hideGeolocateButton();
                this._showAttribution();
                this._eventEmitter.emit('results', res);
                this._typeahead.update(res.features);
            } else {
                this._hideClearButton();
                this._hideAttribution();
                this._typeahead.selected = null;
                this._renderNoResults();
                this._eventEmitter.emit('results', res);
            }
        }).bind(this)).catch((function(err) {
            this._hideLoadingIcon();
            this._hideAttribution();
            // in the event of an error in the Mapbox Geocoding API still display results from the localGeocoder
            if (localGeocoderRes.length && this.options.localGeocoder || externalGeocoderRes.length && this.options.externalGeocoder) {
                this._showClearButton();
                this._hideGeolocateButton();
                this._typeahead.update(localGeocoderRes);
            } else {
                this._hideClearButton();
                this._typeahead.selected = null;
                this._renderError();
            }
            this._eventEmitter.emit('results', {
                features: localGeocoderRes
            });
            this._eventEmitter.emit('error', {
                error: err
            });
        }).bind(this));
        return request;
    },
    /**
   * Shared logic for clearing input
   * @param {Event} [ev] the event that triggered the clear, if available
   * @private
   *
   */ _clear: function(ev) {
        if (ev) ev.preventDefault();
        this._inputEl.value = '';
        this._typeahead.selected = null;
        this._typeahead.clear();
        this.eventManager.sessionIncrementer++;
        this._onChange();
        this._hideClearButton();
        this._showGeolocateButton();
        this._removeMarker();
        this.lastSelected = null;
        this._eventEmitter.emit('clear');
        this.fresh = true;
    },
    /**
   * Clear and then focus the input.
   * @param {Event} [ev] the event that triggered the clear, if available
   *
   */ clear: function(ev) {
        this._clear(ev);
        this._inputEl.focus();
        // We don't hide on blur when using browser focus
        // because the list is hidden on blur by default.
        // So we hide it here manually.
        if (this.options.useBrowserFocus) {
            this._typeahead.list.hide();
        }
    },
    /**
   * Clear the input, without refocusing it. Used to implement clearOnBlur
   * constructor option.
   * @param {Event} [ev] the blur event
   * @private
   */ _clearOnBlur: function(ev) {
        var ctx = this;
        /*
     * If relatedTarget is not found, assume user targeted the suggestions list.
     * In that case, do not clear on blur. There are other edge cases where
     * ev.relatedTarget could be null. Clicking on list always results in null
     * relatedtarget because of upstream behavior in `suggestions`.
     *
     * The ideal solution would be to check if ev.relatedTarget is a child of
     * the list. See issue #258 for details on why we can't do that yet.
     */ if (ev.relatedTarget) {
            ctx._clear(ev);
        }
    },
    _onQueryResult: function(response) {
        var results = response.body;
        if (!results.features.length) return;
        var result = results.features[0];
        this._typeahead.selected = result;
        this._inputEl.value = result.place_name;
        this._onChange();
    },
    _updateProximity: function() {
        // proximity is designed for local scale, if the user is looking at the whole world,
        // it doesn't make sense to factor in the arbitrary centre of the map
        if (!this._map || !this.options.trackProximity) {
            return;
        }
        if (this._map.getZoom() > 9) {
            var center = this._map.getCenter().wrap();
            this.setProximity({
                longitude: center.lng,
                latitude: center.lat
            }, false);
        } else {
            this.setProximity(null, false);
        }
    },
    _collapse: function() {
        // do not collapse if input is in focus
        if (!this._inputEl.value && this._inputEl !== document.activeElement) this.container.classList.add('mapboxgl-ctrl-geocoder--collapsed');
    },
    _unCollapse: function() {
        this.container.classList.remove('mapboxgl-ctrl-geocoder--collapsed');
    },
    /**
   * Set & query the input
   * @param {string} searchInput location name or other search input
   * @returns {MapboxGeocoder} this
   */ query: function(searchInput) {
        this._geocode(searchInput).then(this._onQueryResult);
        return this;
    },
    _renderError: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error'>There was an error reaching the server</div>";
        this._renderMessage(errorMessage);
    },
    _renderLocationError: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error'>A location error has occurred</div>";
        this._renderMessage(errorMessage);
    },
    _renderNoResults: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error mapbox-gl-geocoder--no-results'>No results found</div>";
        this._renderMessage(errorMessage);
    },
    _renderUserDeniedGeolocationError: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error'>Geolocation permission denied</div>";
        this._renderMessage(errorMessage);
    },
    _renderMessage: function(msg) {
        this._typeahead.update([]);
        this._typeahead.selected = null;
        this._typeahead.clear();
        this._typeahead.renderError(msg);
    },
    /**
   * Get the text to use as the search bar placeholder
   *
   * If placeholder is provided in options, then use options.placeholder
   * Otherwise, if language is provided in options, then use the localized string of the first language if available
   * Otherwise use the default
   *
   * @returns {String} the value to use as the search bar placeholder
   * @private
   */ _getPlaceholderText: function() {
        if (this.options.placeholder) return this.options.placeholder;
        if (this.options.language) {
            var firstLanguage = this.options.language.split(",")[0];
            var language = subtag.language(firstLanguage);
            var localizedValue = localization.placeholder[language];
            if (localizedValue) return localizedValue;
        }
        return 'Search';
    },
    /**
   * Set input
   * @param {string} searchInput location name or other search input
   * @param {boolean} [showSuggestions=false] display suggestion on setInput call
   * @returns {MapboxGeocoder} this
   */ setInput: function(searchInput, showSuggestions) {
        if (showSuggestions === undefined) {
            showSuggestions = false;
        }
        // Set input value to passed value and clear everything else.
        this._inputEl.value = searchInput;
        this._typeahead.selected = null;
        this._typeahead.clear();
        if (searchInput.length >= this.options.minLength) {
            showSuggestions ? this._geocode(searchInput) : this._onChange();
        }
        return this;
    },
    /**
   * Set proximity
   * @param {Object|'ip'} proximity The new `options.proximity` value. This is a geographical point given as an object with `latitude` and `longitude` properties or the string 'ip'.
   * @param {Boolean} disableTrackProximity If true, sets `trackProximity` to false. True by default to prevent `trackProximity` from unintentionally overriding an explicitly set proximity value.
   * @returns {MapboxGeocoder} this
   */ setProximity: function(proximity, disableTrackProximity = true) {
        this.options.proximity = proximity;
        if (disableTrackProximity) {
            this.options.trackProximity = false;
        }
        return this;
    },
    /**
   * Get proximity
   * @returns {Object} The geocoder proximity
   */ getProximity: function() {
        return this.options.proximity;
    },
    /**
   * Set the render function used in the results dropdown
   * @param {Function} fn The function to use as a render function. This function accepts a single [extended GeoJSON](https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object) object as input and returns a string.
   * @returns {MapboxGeocoder} this
   */ setRenderFunction: function(fn) {
        if (fn && typeof fn == "function") {
            this._typeahead.render = fn;
        }
        return this;
    },
    /**
   * Get the function used to render the results dropdown
   *
   * @returns {Function} the render function
   */ getRenderFunction: function() {
        return this._typeahead.render;
    },
    /**
   * Get the language to use in UI elements and when making search requests
   *
   * Look first at the explicitly set options otherwise use the browser's language settings
   * @param {String} language Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas.
   * @returns {MapboxGeocoder} this
   */ setLanguage: function(language) {
        var browserLocale = navigator.language || navigator.userLanguage || navigator.browserLanguage;
        this.options.language = language || this.options.language || browserLocale;
        return this;
    },
    /**
   * Get the language to use in UI elements and when making search requests
   * @returns {String} The language(s) used by the plugin, if any
   */ getLanguage: function() {
        return this.options.language;
    },
    /**
   * Get the zoom level the map will move to when there is no bounding box on the selected result
   * @returns {Number} the map zoom
   */ getZoom: function() {
        return this.options.zoom;
    },
    /**
   * Set the zoom level
   * @param {Number} zoom The zoom level that the map should animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
   * @returns {MapboxGeocoder} this
   */ setZoom: function(zoom) {
        this.options.zoom = zoom;
        return this;
    },
    /**
   * Get the parameters used to fly to the selected response, if any
   * @returns {Boolean|Object} The `flyTo` option
   */ getFlyTo: function() {
        return this.options.flyTo;
    },
    /**
   * Set the flyTo options
   * @param {Boolean|Object} flyTo If false, animating the map to a selected result is disabled. If true, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto) or [`fitBounds`](https://docs.mapbox.com/mapbox-gl-js/api/#map#fitbounds) method providing control over the animation of the transition.
   */ setFlyTo: function(flyTo) {
        this.options.flyTo = flyTo;
        return this;
    },
    /**
   * Get the value of the placeholder string
   * @returns {String} The input element's placeholder value
   */ getPlaceholder: function() {
        return this.options.placeholder;
    },
    /**
   * Set the value of the input element's placeholder
   * @param {String} placeholder the text to use as the input element's placeholder
   * @returns {MapboxGeocoder} this
   */ setPlaceholder: function(placeholder) {
        this.options.placeholder = placeholder ? placeholder : this._getPlaceholderText();
        this._inputEl.placeholder = this.options.placeholder;
        this._inputEl.setAttribute('aria-label', this.options.placeholder);
        return this;
    },
    /**
   * Get the bounding box used by the plugin
   * @returns {Array<Number>} the bounding box, if any
   */ getBbox: function() {
        return this.options.bbox;
    },
    /**
   * Set the bounding box to limit search results to
   * @param {Array<Number>} bbox a bounding box given as an array in the format [minX, minY, maxX, maxY].
   * @returns {MapboxGeocoder} this
   */ setBbox: function(bbox) {
        this.options.bbox = bbox;
        return this;
    },
    /**
   * Get a list of the countries to limit search results to
   * @returns {String} a comma separated list of countries to limit to, if any
   */ getCountries: function() {
        return this.options.countries;
    },
    /**
   * Set the countries to limit search results to
   * @param {String} countries a comma separated list of countries to limit to
   * @returns {MapboxGeocoder} this
   */ setCountries: function(countries) {
        this.options.countries = countries;
        return this;
    },
    /**
   * Get a list of the types to limit search results to
   * @returns {String} a comma separated list of types to limit to
   */ getTypes: function() {
        return this.options.types;
    },
    /**
   * Set the types to limit search results to
   * @param {String} countries a comma separated list of types to limit to
   * @returns {MapboxGeocoder} this
   */ setTypes: function(types) {
        this.options.types = types;
        return this;
    },
    /**
   * Get the minimum number of characters typed to trigger results used in the plugin
   * @returns {Number} The minimum length in characters before a search is triggered
   */ getMinLength: function() {
        return this.options.minLength;
    },
    /**
   * Set the minimum number of characters typed to trigger results used by the plugin
   * @param {Number} minLength the minimum length in characters
   * @returns {MapboxGeocoder} this
   */ setMinLength: function(minLength) {
        this.options.minLength = minLength;
        if (this._typeahead) this._typeahead.options.minLength = minLength;
        return this;
    },
    /**
   * Get the limit value for the number of results to display used by the plugin
   * @returns {Number} The limit value for the number of results to display used by the plugin
   */ getLimit: function() {
        return this.options.limit;
    },
    /**
   * Set the limit value for the number of results to display used by the plugin
   * @param {Number} limit the number of search results to return
   * @returns {MapboxGeocoder}
   */ setLimit: function(limit) {
        this.options.limit = limit;
        if (this._typeahead) this._typeahead.options.limit = limit;
        return this;
    },
    /**
   * Get the filter function used by the plugin
   * @returns {Function} the filter function
   */ getFilter: function() {
        return this.options.filter;
    },
    /**
   * Set the filter function used by the plugin.
   * @param {Function} filter A function which accepts a Feature in the [extended GeoJSON](https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
   * @returns {MapboxGeocoder} this
   */ setFilter: function(filter) {
        this.options.filter = filter;
        return this;
    },
    /**
   * Set the geocoding endpoint used by the plugin.
   * @param {Function} origin A function which accepts an HTTPS URL to specify the endpoint to query results from.
   * @returns {MapboxGeocoder} this
   */ setOrigin: function(origin) {
        this.options.origin = origin;
        this.geocoderService = mbxGeocoder(MapboxClient({
            accessToken: this.options.accessToken,
            origin: this.options.origin
        }));
        return this;
    },
    /**
   * Get the geocoding endpoint the plugin is currently set to
   * @returns {Function} the endpoint URL
   */ getOrigin: function() {
        return this.options.origin;
    },
    /**
   * Set the accessToken option used for the geocoding request endpoint.
   * @param {String} accessToken value
   * @returns {MapboxGeocoder} this
   */ setAccessToken: function(accessToken) {
        this.options.accessToken = accessToken;
        this.geocoderService = mbxGeocoder(MapboxClient({
            accessToken: this.options.accessToken,
            origin: this.options.origin
        }));
        return this;
    },
    /**
   * Set the autocomplete option used for geocoding requests
   * @param {Boolean} value The boolean value to set autocomplete to
   * @returns
   */ setAutocomplete: function(value) {
        this.options.autocomplete = value;
        return this;
    },
    /**
   * Get the current autocomplete parameter value used for requests
   * @returns {Boolean} The autocomplete parameter value
   */ getAutocomplete: function() {
        return this.options.autocomplete;
    },
    /**
   * Set the fuzzyMatch option used for approximate matching in geocoding requests
   * @param {Boolean} value The boolean value to set fuzzyMatch to
   * @returns
   */ setFuzzyMatch: function(value) {
        this.options.fuzzyMatch = value;
        return this;
    },
    /**
   * Get the current fuzzyMatch parameter value used for requests
   * @returns {Boolean} The fuzzyMatch parameter value
   */ getFuzzyMatch: function() {
        return this.options.fuzzyMatch;
    },
    /**
   * Set the routing parameter used to ask for routable point metadata in geocoding requests
   * @param {Boolean} value The boolean value to set routing to
   * @returns
   */ setRouting: function(value) {
        this.options.routing = value;
        return this;
    },
    /**
   * Get the current routing parameter value used for requests
   * @returns {Boolean} The routing parameter value
   */ getRouting: function() {
        return this.options.routing;
    },
    /**
   * Set the worldview parameter
   * @param {String} code The country code representing the worldview (e.g. "us" | "cn" | "jp", "in")
   * @returns
   */ setWorldview: function(code) {
        this.options.worldview = code;
        return this;
    },
    /**
   * Get the current worldview parameter value used for requests
   * @returns {String} The worldview parameter value
   */ getWorldview: function() {
        return this.options.worldview;
    },
    /**
   * Handle the placement of a result marking the selected result
   * @private
   * @param {Object} selected the selected geojson feature
   * @returns {MapboxGeocoder} this
   */ _handleMarker: function(selected) {
        // clean up any old marker that might be present
        if (!this._map) {
            return;
        }
        this._removeMarker();
        var defaultMarkerOptions = {
            color: '#4668F2'
        };
        var markerOptions = extend({}, defaultMarkerOptions, this.options.marker);
        this.mapMarker = new this._mapboxgl.Marker(markerOptions);
        if (selected.center) {
            this.mapMarker.setLngLat(selected.center).addTo(this._map);
        } else if (selected.geometry && selected.geometry.type && selected.geometry.type === 'Point' && selected.geometry.coordinates) {
            this.mapMarker.setLngLat(selected.geometry.coordinates).addTo(this._map);
        }
        return this;
    },
    /**
   * Handle the removal of a result marker
   * @private
   */ _removeMarker: function() {
        if (this.mapMarker) {
            this.mapMarker.remove();
            this.mapMarker = null;
        }
    },
    /**
   * Subscribe to events that happen within the plugin.
   * @param {String} type name of event. Available events and the data passed into their respective event objects are:
   *
   * - __clear__ `Emitted when the input is cleared`
   * - __loading__ `{ query } Emitted when the geocoder is looking up a query`
   * - __results__ `{ results } Fired when the geocoder returns a response`
   * - __result__ `{ result } Fired when input is set`
   * - __error__ `{ error } Error as string`
   * @param {Function} fn function that's called when the event is emitted.
   * @returns {MapboxGeocoder} this;
   */ on: function(type, fn) {
        this._eventEmitter.on(type, fn);
        return this;
    },
    /**
   * Remove an event
   * @returns {MapboxGeocoder} this
   * @param {String} type Event name.
   * @param {Function} fn Function that should unsubscribe to the event emitted.
   */ off: function(type, fn) {
        this._eventEmitter.removeListener(type, fn);
        this.eventManager.remove();
        return this;
    }
};
module.exports = MapboxGeocoder;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@sindresorhus/is/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/// <reference lib="es2018"/>
/// <reference lib="dom"/>
/// <reference types="node"/>
Object.defineProperty(exports, "__esModule", {
    value: true
});
const typedArrayTypeNames = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array'
];
function isTypedArrayName(name) {
    return typedArrayTypeNames.includes(name);
}
const objectTypeNames = [
    'Function',
    'Generator',
    'AsyncGenerator',
    'GeneratorFunction',
    'AsyncGeneratorFunction',
    'AsyncFunction',
    'Observable',
    'Array',
    'Buffer',
    'Blob',
    'Object',
    'RegExp',
    'Date',
    'Error',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Promise',
    'URL',
    'FormData',
    'URLSearchParams',
    'HTMLElement',
    ...typedArrayTypeNames
];
function isObjectTypeName(name) {
    return objectTypeNames.includes(name);
}
const primitiveTypeNames = [
    'null',
    'undefined',
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol'
];
function isPrimitiveTypeName(name) {
    return primitiveTypeNames.includes(name);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isOfType(type) {
    return (value)=>typeof value === type;
}
const { toString } = Object.prototype;
const getObjectType = (value)=>{
    const objectTypeName = toString.call(value).slice(8, -1);
    if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
        return 'HTMLElement';
    }
    if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
    }
    return undefined;
};
const isObjectOfType = (type)=>(value)=>getObjectType(value) === type;
function is(value) {
    if (value === null) {
        return 'null';
    }
    switch(typeof value){
        case 'undefined':
            return 'undefined';
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'function':
            return 'Function';
        case 'bigint':
            return 'bigint';
        case 'symbol':
            return 'symbol';
        default:
    }
    if (is.observable(value)) {
        return 'Observable';
    }
    if (is.array(value)) {
        return 'Array';
    }
    if (is.buffer(value)) {
        return 'Buffer';
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return 'Object';
}
is.undefined = isOfType('undefined');
is.string = isOfType('string');
const isNumberType = isOfType('number');
is.number = (value)=>isNumberType(value) && !is.nan(value);
is.bigint = isOfType('bigint');
// eslint-disable-next-line @typescript-eslint/ban-types
is.function_ = isOfType('function');
is.null_ = (value)=>value === null;
is.class_ = (value)=>is.function_(value) && value.toString().startsWith('class ');
is.boolean = (value)=>value === true || value === false;
is.symbol = isOfType('symbol');
is.numericString = (value)=>is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = (value, assertion)=>{
    if (!Array.isArray(value)) {
        return false;
    }
    if (!is.function_(assertion)) {
        return true;
    }
    return value.every(assertion);
};
is.buffer = (value)=>{
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d !== void 0 ? _d : false;
};
is.blob = (value)=>isObjectOfType('Blob')(value);
is.nullOrUndefined = (value)=>is.null_(value) || is.undefined(value);
is.object = (value)=>!is.null_(value) && (typeof value === 'object' || is.function_(value));
is.iterable = (value)=>{
    var _a;
    return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]);
};
is.asyncIterable = (value)=>{
    var _a;
    return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.asyncIterator]);
};
is.generator = (value)=>{
    var _a, _b;
    return is.iterable(value) && is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.next) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.throw);
};
is.asyncGenerator = (value)=>is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value)=>isObjectOfType('Promise')(value);
const hasPromiseAPI = (value)=>{
    var _a, _b;
    return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.then) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
};
is.promise = (value)=>is.nativePromise(value) || hasPromiseAPI(value);
is.generatorFunction = isObjectOfType('GeneratorFunction');
is.asyncGeneratorFunction = (value)=>getObjectType(value) === 'AsyncGeneratorFunction';
is.asyncFunction = (value)=>getObjectType(value) === 'AsyncFunction';
// eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
is.boundFunction = (value)=>is.function_(value) && !value.hasOwnProperty('prototype');
is.regExp = isObjectOfType('RegExp');
is.date = isObjectOfType('Date');
is.error = isObjectOfType('Error');
is.map = (value)=>isObjectOfType('Map')(value);
is.set = (value)=>isObjectOfType('Set')(value);
is.weakMap = (value)=>isObjectOfType('WeakMap')(value);
is.weakSet = (value)=>isObjectOfType('WeakSet')(value);
is.int8Array = isObjectOfType('Int8Array');
is.uint8Array = isObjectOfType('Uint8Array');
is.uint8ClampedArray = isObjectOfType('Uint8ClampedArray');
is.int16Array = isObjectOfType('Int16Array');
is.uint16Array = isObjectOfType('Uint16Array');
is.int32Array = isObjectOfType('Int32Array');
is.uint32Array = isObjectOfType('Uint32Array');
is.float32Array = isObjectOfType('Float32Array');
is.float64Array = isObjectOfType('Float64Array');
is.bigInt64Array = isObjectOfType('BigInt64Array');
is.bigUint64Array = isObjectOfType('BigUint64Array');
is.arrayBuffer = isObjectOfType('ArrayBuffer');
is.sharedArrayBuffer = isObjectOfType('SharedArrayBuffer');
is.dataView = isObjectOfType('DataView');
is.enumCase = (value, targetEnum)=>Object.values(targetEnum).includes(value);
is.directInstanceOf = (instance, class_)=>Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value)=>isObjectOfType('URL')(value);
is.urlString = (value)=>{
    if (!is.string(value)) {
        return false;
    }
    try {
        new URL(value); // eslint-disable-line no-new
        return true;
    } catch (_a) {
        return false;
    }
};
// Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
is.truthy = (value)=>Boolean(value);
// Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
is.falsy = (value)=>!value;
is.nan = (value)=>Number.isNaN(value);
is.primitive = (value)=>is.null_(value) || isPrimitiveTypeName(typeof value);
is.integer = (value)=>Number.isInteger(value);
is.safeInteger = (value)=>Number.isSafeInteger(value);
is.plainObject = (value)=>{
    // From: https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
    if (toString.call(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
};
is.typedArray = (value)=>isTypedArrayName(getObjectType(value));
const isValidLength = (value)=>is.safeInteger(value) && value >= 0;
is.arrayLike = (value)=>!is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.inRange = (value, range)=>{
    if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
    }
    if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }
    throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
const NODE_TYPE_ELEMENT = 1;
const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue'
];
is.domElement = (value)=>{
    return is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) && !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property)=>property in value);
};
is.observable = (value)=>{
    var _a, _b, _c, _d;
    if (!value) {
        return false;
    }
    // eslint-disable-next-line no-use-extend-native/no-use-extend-native
    if (value === ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        return true;
    }
    if (value === ((_d = (_c = value)['@@observable']) === null || _d === void 0 ? void 0 : _d.call(_c))) {
        return true;
    }
    return false;
};
is.nodeStream = (value)=>is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value)=>value === Infinity || value === -Infinity;
const isAbsoluteMod2 = (remainder)=>(value)=>is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value)=>is.array(value) && value.length === 0;
is.nonEmptyArray = (value)=>is.array(value) && value.length > 0;
is.emptyString = (value)=>is.string(value) && value.length === 0;
const isWhiteSpaceString = (value)=>is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value)=>is.emptyString(value) || isWhiteSpaceString(value);
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyString = (value)=>is.string(value) && value.length > 0;
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyStringAndNotWhitespace = (value)=>is.string(value) && !is.emptyStringOrWhitespace(value);
is.emptyObject = (value)=>is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
// TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
// - https://github.com/Microsoft/TypeScript/pull/29317
is.nonEmptyObject = (value)=>is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value)=>is.set(value) && value.size === 0;
is.nonEmptySet = (value)=>is.set(value) && value.size > 0;
is.emptyMap = (value)=>is.map(value) && value.size === 0;
is.nonEmptyMap = (value)=>is.map(value) && value.size > 0;
// `PropertyKey` is any value that can be used as an object key (string, number, or symbol)
is.propertyKey = (value)=>is.any([
        is.string,
        is.number,
        is.symbol
    ], value);
is.formData = (value)=>isObjectOfType('FormData')(value);
is.urlSearchParams = (value)=>isObjectOfType('URLSearchParams')(value);
const predicateOnArray = (method, predicate, values)=>{
    if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
    if (values.length === 0) {
        throw new TypeError('Invalid number of values');
    }
    return method.call(values, predicate);
};
is.any = (predicate, ...values)=>{
    const predicates = is.array(predicate) ? predicate : [
        predicate
    ];
    return predicates.some((singlePredicate)=>predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values)=>predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value, options = {})=>{
    if (!condition) {
        const { multipleValues } = options;
        const valuesMessage = multipleValues ? `received values of types ${[
            ...new Set(value.map((singleValue)=>`\`${is(singleValue)}\``))
        ].join(', ')}` : `received value of type \`${is(value)}\``;
        throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
    }
};
exports.assert = {
    // Unknowns.
    undefined: (value)=>assertType(is.undefined(value), 'undefined', value),
    string: (value)=>assertType(is.string(value), 'string', value),
    number: (value)=>assertType(is.number(value), 'number', value),
    bigint: (value)=>assertType(is.bigint(value), 'bigint', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (value)=>assertType(is.function_(value), 'Function', value),
    null_: (value)=>assertType(is.null_(value), 'null', value),
    class_: (value)=>assertType(is.class_(value), "Class" /* class_ */ , value),
    boolean: (value)=>assertType(is.boolean(value), 'boolean', value),
    symbol: (value)=>assertType(is.symbol(value), 'symbol', value),
    numericString: (value)=>assertType(is.numericString(value), "string with a number" /* numericString */ , value),
    array: (value, assertion)=>{
        const assert = assertType;
        assert(is.array(value), 'Array', value);
        if (assertion) {
            value.forEach(assertion);
        }
    },
    buffer: (value)=>assertType(is.buffer(value), 'Buffer', value),
    blob: (value)=>assertType(is.blob(value), 'Blob', value),
    nullOrUndefined: (value)=>assertType(is.nullOrUndefined(value), "null or undefined" /* nullOrUndefined */ , value),
    object: (value)=>assertType(is.object(value), 'Object', value),
    iterable: (value)=>assertType(is.iterable(value), "Iterable" /* iterable */ , value),
    asyncIterable: (value)=>assertType(is.asyncIterable(value), "AsyncIterable" /* asyncIterable */ , value),
    generator: (value)=>assertType(is.generator(value), 'Generator', value),
    asyncGenerator: (value)=>assertType(is.asyncGenerator(value), 'AsyncGenerator', value),
    nativePromise: (value)=>assertType(is.nativePromise(value), "native Promise" /* nativePromise */ , value),
    promise: (value)=>assertType(is.promise(value), 'Promise', value),
    generatorFunction: (value)=>assertType(is.generatorFunction(value), 'GeneratorFunction', value),
    asyncGeneratorFunction: (value)=>assertType(is.asyncGeneratorFunction(value), 'AsyncGeneratorFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (value)=>assertType(is.asyncFunction(value), 'AsyncFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (value)=>assertType(is.boundFunction(value), 'Function', value),
    regExp: (value)=>assertType(is.regExp(value), 'RegExp', value),
    date: (value)=>assertType(is.date(value), 'Date', value),
    error: (value)=>assertType(is.error(value), 'Error', value),
    map: (value)=>assertType(is.map(value), 'Map', value),
    set: (value)=>assertType(is.set(value), 'Set', value),
    weakMap: (value)=>assertType(is.weakMap(value), 'WeakMap', value),
    weakSet: (value)=>assertType(is.weakSet(value), 'WeakSet', value),
    int8Array: (value)=>assertType(is.int8Array(value), 'Int8Array', value),
    uint8Array: (value)=>assertType(is.uint8Array(value), 'Uint8Array', value),
    uint8ClampedArray: (value)=>assertType(is.uint8ClampedArray(value), 'Uint8ClampedArray', value),
    int16Array: (value)=>assertType(is.int16Array(value), 'Int16Array', value),
    uint16Array: (value)=>assertType(is.uint16Array(value), 'Uint16Array', value),
    int32Array: (value)=>assertType(is.int32Array(value), 'Int32Array', value),
    uint32Array: (value)=>assertType(is.uint32Array(value), 'Uint32Array', value),
    float32Array: (value)=>assertType(is.float32Array(value), 'Float32Array', value),
    float64Array: (value)=>assertType(is.float64Array(value), 'Float64Array', value),
    bigInt64Array: (value)=>assertType(is.bigInt64Array(value), 'BigInt64Array', value),
    bigUint64Array: (value)=>assertType(is.bigUint64Array(value), 'BigUint64Array', value),
    arrayBuffer: (value)=>assertType(is.arrayBuffer(value), 'ArrayBuffer', value),
    sharedArrayBuffer: (value)=>assertType(is.sharedArrayBuffer(value), 'SharedArrayBuffer', value),
    dataView: (value)=>assertType(is.dataView(value), 'DataView', value),
    enumCase: (value, targetEnum)=>assertType(is.enumCase(value, targetEnum), 'EnumCase', value),
    urlInstance: (value)=>assertType(is.urlInstance(value), 'URL', value),
    urlString: (value)=>assertType(is.urlString(value), "string with a URL" /* urlString */ , value),
    truthy: (value)=>assertType(is.truthy(value), "truthy" /* truthy */ , value),
    falsy: (value)=>assertType(is.falsy(value), "falsy" /* falsy */ , value),
    nan: (value)=>assertType(is.nan(value), "NaN" /* nan */ , value),
    primitive: (value)=>assertType(is.primitive(value), "primitive" /* primitive */ , value),
    integer: (value)=>assertType(is.integer(value), "integer" /* integer */ , value),
    safeInteger: (value)=>assertType(is.safeInteger(value), "integer" /* safeInteger */ , value),
    plainObject: (value)=>assertType(is.plainObject(value), "plain object" /* plainObject */ , value),
    typedArray: (value)=>assertType(is.typedArray(value), "TypedArray" /* typedArray */ , value),
    arrayLike: (value)=>assertType(is.arrayLike(value), "array-like" /* arrayLike */ , value),
    domElement: (value)=>assertType(is.domElement(value), "HTMLElement" /* domElement */ , value),
    observable: (value)=>assertType(is.observable(value), 'Observable', value),
    nodeStream: (value)=>assertType(is.nodeStream(value), "Node.js Stream" /* nodeStream */ , value),
    infinite: (value)=>assertType(is.infinite(value), "infinite number" /* infinite */ , value),
    emptyArray: (value)=>assertType(is.emptyArray(value), "empty array" /* emptyArray */ , value),
    nonEmptyArray: (value)=>assertType(is.nonEmptyArray(value), "non-empty array" /* nonEmptyArray */ , value),
    emptyString: (value)=>assertType(is.emptyString(value), "empty string" /* emptyString */ , value),
    emptyStringOrWhitespace: (value)=>assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace" /* emptyStringOrWhitespace */ , value),
    nonEmptyString: (value)=>assertType(is.nonEmptyString(value), "non-empty string" /* nonEmptyString */ , value),
    nonEmptyStringAndNotWhitespace: (value)=>assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace" /* nonEmptyStringAndNotWhitespace */ , value),
    emptyObject: (value)=>assertType(is.emptyObject(value), "empty object" /* emptyObject */ , value),
    nonEmptyObject: (value)=>assertType(is.nonEmptyObject(value), "non-empty object" /* nonEmptyObject */ , value),
    emptySet: (value)=>assertType(is.emptySet(value), "empty set" /* emptySet */ , value),
    nonEmptySet: (value)=>assertType(is.nonEmptySet(value), "non-empty set" /* nonEmptySet */ , value),
    emptyMap: (value)=>assertType(is.emptyMap(value), "empty map" /* emptyMap */ , value),
    nonEmptyMap: (value)=>assertType(is.nonEmptyMap(value), "non-empty map" /* nonEmptyMap */ , value),
    propertyKey: (value)=>assertType(is.propertyKey(value), 'PropertyKey', value),
    formData: (value)=>assertType(is.formData(value), 'FormData', value),
    urlSearchParams: (value)=>assertType(is.urlSearchParams(value), 'URLSearchParams', value),
    // Numbers.
    evenInteger: (value)=>assertType(is.evenInteger(value), "even integer" /* evenInteger */ , value),
    oddInteger: (value)=>assertType(is.oddInteger(value), "odd integer" /* oddInteger */ , value),
    // Two arguments.
    directInstanceOf: (instance, class_)=>assertType(is.directInstanceOf(instance, class_), "T" /* directInstanceOf */ , instance),
    inRange: (value, range)=>assertType(is.inRange(value, range), "in range" /* inRange */ , value),
    // Variadic functions.
    any: (predicate, ...values)=>{
        return assertType(is.any(predicate, ...values), "predicate returns truthy for any value" /* any */ , values, {
            multipleValues: true
        });
    },
    all: (predicate, ...values)=>assertType(is.all(predicate, ...values), "predicate returns truthy for all values" /* all */ , values, {
            multipleValues: true
        })
};
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_
    },
    function: {
        value: is.function_
    },
    null: {
        value: is.null_
    }
});
Object.defineProperties(exports.assert, {
    class: {
        value: exports.assert.class_
    },
    function: {
        value: exports.assert.function_
    },
    null: {
        value: exports.assert.null_
    }
});
exports.default = is;
// For CommonJS default export support
module.exports = is;
module.exports.default = is;
module.exports.assert = exports.assert;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/defer-to-connect/dist/source/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function isTLSSocket(socket) {
    return socket.encrypted;
}
const deferToConnect = (socket, fn)=>{
    let listeners;
    if (typeof fn === 'function') {
        const connect = fn;
        listeners = {
            connect
        };
    } else {
        listeners = fn;
    }
    const hasConnectListener = typeof listeners.connect === 'function';
    const hasSecureConnectListener = typeof listeners.secureConnect === 'function';
    const hasCloseListener = typeof listeners.close === 'function';
    const onConnect = ()=>{
        if (hasConnectListener) {
            listeners.connect();
        }
        if (isTLSSocket(socket) && hasSecureConnectListener) {
            if (socket.authorized) {
                listeners.secureConnect();
            } else if (!socket.authorizationError) {
                socket.once('secureConnect', listeners.secureConnect);
            }
        }
        if (hasCloseListener) {
            socket.once('close', listeners.close);
        }
    };
    if (socket.writable && !socket.connecting) {
        onConnect();
    } else if (socket.connecting) {
        socket.once('connect', onConnect);
    } else if (socket.destroyed && hasCloseListener) {
        listeners.close(socket._hadError);
    }
};
exports.default = deferToConnect;
// For CommonJS default export support
module.exports = deferToConnect;
module.exports.default = deferToConnect;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@szmarczak/http-timer/dist/source/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const defer_to_connect_1 = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/defer-to-connect/dist/source/index.js [app-ssr] (ecmascript)");
const util_1 = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const nodejsMajorVersion = Number(process.versions.node.split('.')[0]);
const timer = (request)=>{
    if (request.timings) {
        return request.timings;
    }
    const timings = {
        start: Date.now(),
        socket: undefined,
        lookup: undefined,
        connect: undefined,
        secureConnect: undefined,
        upload: undefined,
        response: undefined,
        end: undefined,
        error: undefined,
        abort: undefined,
        phases: {
            wait: undefined,
            dns: undefined,
            tcp: undefined,
            tls: undefined,
            request: undefined,
            firstByte: undefined,
            download: undefined,
            total: undefined
        }
    };
    request.timings = timings;
    const handleError = (origin)=>{
        const emit = origin.emit.bind(origin);
        origin.emit = (event, ...args)=>{
            // Catches the `error` event
            if (event === 'error') {
                timings.error = Date.now();
                timings.phases.total = timings.error - timings.start;
                origin.emit = emit;
            }
            // Saves the original behavior
            return emit(event, ...args);
        };
    };
    handleError(request);
    const onAbort = ()=>{
        timings.abort = Date.now();
        // Let the `end` response event be responsible for setting the total phase,
        // unless the Node.js major version is >= 13.
        if (!timings.response || nodejsMajorVersion >= 13) {
            timings.phases.total = Date.now() - timings.start;
        }
    };
    request.prependOnceListener('abort', onAbort);
    const onSocket = (socket)=>{
        timings.socket = Date.now();
        timings.phases.wait = timings.socket - timings.start;
        if (util_1.types.isProxy(socket)) {
            return;
        }
        const lookupListener = ()=>{
            timings.lookup = Date.now();
            timings.phases.dns = timings.lookup - timings.socket;
        };
        socket.prependOnceListener('lookup', lookupListener);
        defer_to_connect_1.default(socket, {
            connect: ()=>{
                timings.connect = Date.now();
                if (timings.lookup === undefined) {
                    socket.removeListener('lookup', lookupListener);
                    timings.lookup = timings.connect;
                    timings.phases.dns = timings.lookup - timings.socket;
                }
                timings.phases.tcp = timings.connect - timings.lookup;
            // This callback is called before flushing any data,
            // so we don't need to set `timings.phases.request` here.
            },
            secureConnect: ()=>{
                timings.secureConnect = Date.now();
                timings.phases.tls = timings.secureConnect - timings.connect;
            }
        });
    };
    if (request.socket) {
        onSocket(request.socket);
    } else {
        request.prependOnceListener('socket', onSocket);
    }
    const onUpload = ()=>{
        var _a;
        timings.upload = Date.now();
        timings.phases.request = timings.upload - ((_a = timings.secureConnect) !== null && _a !== void 0 ? _a : timings.connect);
    };
    const writableFinished = ()=>{
        if (typeof request.writableFinished === 'boolean') {
            return request.writableFinished;
        }
        // Node.js doesn't have `request.writableFinished` property
        return request.finished && request.outputSize === 0 && (!request.socket || request.socket.writableLength === 0);
    };
    if (writableFinished()) {
        onUpload();
    } else {
        request.prependOnceListener('finish', onUpload);
    }
    request.prependOnceListener('response', (response)=>{
        timings.response = Date.now();
        timings.phases.firstByte = timings.response - timings.upload;
        response.timings = timings;
        handleError(response);
        response.prependOnceListener('end', ()=>{
            timings.end = Date.now();
            timings.phases.download = timings.end - timings.response;
            timings.phases.total = timings.end - timings.start;
        });
        response.prependOnceListener('aborted', onAbort);
    });
    return timings;
};
exports.default = timer;
// For CommonJS default export support
module.exports = timer;
module.exports.default = timer;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/cacheable-lookup/source/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { V4MAPPED, ADDRCONFIG, ALL, promises: { Resolver: AsyncResolver }, lookup: dnsLookup } = __turbopack_context__.r("[externals]/dns [external] (dns, cjs)");
const { promisify } = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
const kCacheableLookupCreateConnection = Symbol('cacheableLookupCreateConnection');
const kCacheableLookupInstance = Symbol('cacheableLookupInstance');
const kExpires = Symbol('expires');
const supportsALL = typeof ALL === 'number';
const verifyAgent = (agent)=>{
    if (!(agent && typeof agent.createConnection === 'function')) {
        throw new Error('Expected an Agent instance as the first argument');
    }
};
const map4to6 = (entries)=>{
    for (const entry of entries){
        if (entry.family === 6) {
            continue;
        }
        entry.address = `::ffff:${entry.address}`;
        entry.family = 6;
    }
};
const getIfaceInfo = ()=>{
    let has4 = false;
    let has6 = false;
    for (const device of Object.values(os.networkInterfaces())){
        for (const iface of device){
            if (iface.internal) {
                continue;
            }
            if (iface.family === 'IPv6') {
                has6 = true;
            } else {
                has4 = true;
            }
            if (has4 && has6) {
                return {
                    has4,
                    has6
                };
            }
        }
    }
    return {
        has4,
        has6
    };
};
const isIterable = (map)=>{
    return Symbol.iterator in map;
};
const ttl = {
    ttl: true
};
const all = {
    all: true
};
class CacheableLookup {
    constructor({ cache = new Map(), maxTtl = Infinity, fallbackDuration = 3600, errorTtl = 0.15, resolver = new AsyncResolver(), lookup = dnsLookup } = {}){
        this.maxTtl = maxTtl;
        this.errorTtl = errorTtl;
        this._cache = cache;
        this._resolver = resolver;
        this._dnsLookup = promisify(lookup);
        if (this._resolver instanceof AsyncResolver) {
            this._resolve4 = this._resolver.resolve4.bind(this._resolver);
            this._resolve6 = this._resolver.resolve6.bind(this._resolver);
        } else {
            this._resolve4 = promisify(this._resolver.resolve4.bind(this._resolver));
            this._resolve6 = promisify(this._resolver.resolve6.bind(this._resolver));
        }
        this._iface = getIfaceInfo();
        this._pending = {};
        this._nextRemovalTime = false;
        this._hostnamesToFallback = new Set();
        if (fallbackDuration < 1) {
            this._fallback = false;
        } else {
            this._fallback = true;
            const interval = setInterval(()=>{
                this._hostnamesToFallback.clear();
            }, fallbackDuration * 1000);
            /* istanbul ignore next: There is no `interval.unref()` when running inside an Electron renderer */ if (interval.unref) {
                interval.unref();
            }
        }
        this.lookup = this.lookup.bind(this);
        this.lookupAsync = this.lookupAsync.bind(this);
    }
    set servers(servers) {
        this.clear();
        this._resolver.setServers(servers);
    }
    get servers() {
        return this._resolver.getServers();
    }
    lookup(hostname, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        } else if (typeof options === 'number') {
            options = {
                family: options
            };
        }
        if (!callback) {
            throw new Error('Callback must be a function.');
        }
        // eslint-disable-next-line promise/prefer-await-to-then
        this.lookupAsync(hostname, options).then((result)=>{
            if (options.all) {
                callback(null, result);
            } else {
                callback(null, result.address, result.family, result.expires, result.ttl);
            }
        }, callback);
    }
    async lookupAsync(hostname, options = {}) {
        if (typeof options === 'number') {
            options = {
                family: options
            };
        }
        let cached = await this.query(hostname);
        if (options.family === 6) {
            const filtered = cached.filter((entry)=>entry.family === 6);
            if (options.hints & V4MAPPED) {
                if (supportsALL && options.hints & ALL || filtered.length === 0) {
                    map4to6(cached);
                } else {
                    cached = filtered;
                }
            } else {
                cached = filtered;
            }
        } else if (options.family === 4) {
            cached = cached.filter((entry)=>entry.family === 4);
        }
        if (options.hints & ADDRCONFIG) {
            const { _iface } = this;
            cached = cached.filter((entry)=>entry.family === 6 ? _iface.has6 : _iface.has4);
        }
        if (cached.length === 0) {
            const error = new Error(`cacheableLookup ENOTFOUND ${hostname}`);
            error.code = 'ENOTFOUND';
            error.hostname = hostname;
            throw error;
        }
        if (options.all) {
            return cached;
        }
        return cached[0];
    }
    async query(hostname) {
        let cached = await this._cache.get(hostname);
        if (!cached) {
            const pending = this._pending[hostname];
            if (pending) {
                cached = await pending;
            } else {
                const newPromise = this.queryAndCache(hostname);
                this._pending[hostname] = newPromise;
                try {
                    cached = await newPromise;
                } finally{
                    delete this._pending[hostname];
                }
            }
        }
        cached = cached.map((entry)=>{
            return {
                ...entry
            };
        });
        return cached;
    }
    async _resolve(hostname) {
        const wrap = async (promise)=>{
            try {
                return await promise;
            } catch (error) {
                if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
                    return [];
                }
                throw error;
            }
        };
        // ANY is unsafe as it doesn't trigger new queries in the underlying server.
        const [A, AAAA] = await Promise.all([
            this._resolve4(hostname, ttl),
            this._resolve6(hostname, ttl)
        ].map((promise)=>wrap(promise)));
        let aTtl = 0;
        let aaaaTtl = 0;
        let cacheTtl = 0;
        const now = Date.now();
        for (const entry of A){
            entry.family = 4;
            entry.expires = now + entry.ttl * 1000;
            aTtl = Math.max(aTtl, entry.ttl);
        }
        for (const entry of AAAA){
            entry.family = 6;
            entry.expires = now + entry.ttl * 1000;
            aaaaTtl = Math.max(aaaaTtl, entry.ttl);
        }
        if (A.length > 0) {
            if (AAAA.length > 0) {
                cacheTtl = Math.min(aTtl, aaaaTtl);
            } else {
                cacheTtl = aTtl;
            }
        } else {
            cacheTtl = aaaaTtl;
        }
        return {
            entries: [
                ...A,
                ...AAAA
            ],
            cacheTtl
        };
    }
    async _lookup(hostname) {
        try {
            const entries = await this._dnsLookup(hostname, {
                all: true
            });
            return {
                entries,
                cacheTtl: 0
            };
        } catch (_) {
            return {
                entries: [],
                cacheTtl: 0
            };
        }
    }
    async _set(hostname, data, cacheTtl) {
        if (this.maxTtl > 0 && cacheTtl > 0) {
            cacheTtl = Math.min(cacheTtl, this.maxTtl) * 1000;
            data[kExpires] = Date.now() + cacheTtl;
            try {
                await this._cache.set(hostname, data, cacheTtl);
            } catch (error) {
                this.lookupAsync = async ()=>{
                    const cacheError = new Error('Cache Error. Please recreate the CacheableLookup instance.');
                    cacheError.cause = error;
                    throw cacheError;
                };
            }
            if (isIterable(this._cache)) {
                this._tick(cacheTtl);
            }
        }
    }
    async queryAndCache(hostname) {
        if (this._hostnamesToFallback.has(hostname)) {
            return this._dnsLookup(hostname, all);
        }
        let query = await this._resolve(hostname);
        if (query.entries.length === 0 && this._fallback) {
            query = await this._lookup(hostname);
            if (query.entries.length !== 0) {
                // Use `dns.lookup(...)` for that particular hostname
                this._hostnamesToFallback.add(hostname);
            }
        }
        const cacheTtl = query.entries.length === 0 ? this.errorTtl : query.cacheTtl;
        await this._set(hostname, query.entries, cacheTtl);
        return query.entries;
    }
    _tick(ms) {
        const nextRemovalTime = this._nextRemovalTime;
        if (!nextRemovalTime || ms < nextRemovalTime) {
            clearTimeout(this._removalTimeout);
            this._nextRemovalTime = ms;
            this._removalTimeout = setTimeout(()=>{
                this._nextRemovalTime = false;
                let nextExpiry = Infinity;
                const now = Date.now();
                for (const [hostname, entries] of this._cache){
                    const expires = entries[kExpires];
                    if (now >= expires) {
                        this._cache.delete(hostname);
                    } else if (expires < nextExpiry) {
                        nextExpiry = expires;
                    }
                }
                if (nextExpiry !== Infinity) {
                    this._tick(nextExpiry - now);
                }
            }, ms);
            /* istanbul ignore next: There is no `timeout.unref()` when running inside an Electron renderer */ if (this._removalTimeout.unref) {
                this._removalTimeout.unref();
            }
        }
    }
    install(agent) {
        verifyAgent(agent);
        if (kCacheableLookupCreateConnection in agent) {
            throw new Error('CacheableLookup has been already installed');
        }
        agent[kCacheableLookupCreateConnection] = agent.createConnection;
        agent[kCacheableLookupInstance] = this;
        agent.createConnection = (options, callback)=>{
            if (!('lookup' in options)) {
                options.lookup = this.lookup;
            }
            return agent[kCacheableLookupCreateConnection](options, callback);
        };
    }
    uninstall(agent) {
        verifyAgent(agent);
        if (agent[kCacheableLookupCreateConnection]) {
            if (agent[kCacheableLookupInstance] !== this) {
                throw new Error('The agent is not owned by this CacheableLookup instance');
            }
            agent.createConnection = agent[kCacheableLookupCreateConnection];
            delete agent[kCacheableLookupCreateConnection];
            delete agent[kCacheableLookupInstance];
        }
    }
    updateInterfaceInfo() {
        const { _iface } = this;
        this._iface = getIfaceInfo();
        if (_iface.has4 && !this._iface.has4 || _iface.has6 && !this._iface.has6) {
            this._cache.clear();
        }
    }
    clear(hostname) {
        if (hostname) {
            this._cache.delete(hostname);
            return;
        }
        this._cache.clear();
    }
}
module.exports = CacheableLookup;
module.exports.default = CacheableLookup;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/normalize-url/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain';
const DATA_URL_DEFAULT_CHARSET = 'us-ascii';
const testParameter = (name, filters)=>{
    return filters.some((filter)=>filter instanceof RegExp ? filter.test(name) : filter === name);
};
const normalizeDataURL = (urlString, { stripHash })=>{
    const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);
    if (!match) {
        throw new Error(`Invalid URL: ${urlString}`);
    }
    let { type, data, hash } = match.groups;
    const mediaType = type.split(';');
    hash = stripHash ? '' : hash;
    let isBase64 = false;
    if (mediaType[mediaType.length - 1] === 'base64') {
        mediaType.pop();
        isBase64 = true;
    }
    // Lowercase MIME type
    const mimeType = (mediaType.shift() || '').toLowerCase();
    const attributes = mediaType.map((attribute)=>{
        let [key, value = ''] = attribute.split('=').map((string)=>string.trim());
        // Lowercase `charset`
        if (key === 'charset') {
            value = value.toLowerCase();
            if (value === DATA_URL_DEFAULT_CHARSET) {
                return '';
            }
        }
        return `${key}${value ? `=${value}` : ''}`;
    }).filter(Boolean);
    const normalizedMediaType = [
        ...attributes
    ];
    if (isBase64) {
        normalizedMediaType.push('base64');
    }
    if (normalizedMediaType.length !== 0 || mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE) {
        normalizedMediaType.unshift(mimeType);
    }
    return `data:${normalizedMediaType.join(';')},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ''}`;
};
const normalizeUrl = (urlString, options)=>{
    options = {
        defaultProtocol: 'http:',
        normalizeProtocol: true,
        forceHttp: false,
        forceHttps: false,
        stripAuthentication: true,
        stripHash: false,
        stripTextFragment: true,
        stripWWW: true,
        removeQueryParameters: [
            /^utm_\w+/i
        ],
        removeTrailingSlash: true,
        removeSingleSlash: true,
        removeDirectoryIndex: false,
        sortQueryParameters: true,
        ...options
    };
    urlString = urlString.trim();
    // Data URL
    if (/^data:/i.test(urlString)) {
        return normalizeDataURL(urlString, options);
    }
    if (/^view-source:/i.test(urlString)) {
        throw new Error('`view-source:` is not supported as it is a non-standard protocol');
    }
    const hasRelativeProtocol = urlString.startsWith('//');
    const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);
    // Prepend protocol
    if (!isRelativeUrl) {
        urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
    }
    const urlObj = new URL(urlString);
    if (options.forceHttp && options.forceHttps) {
        throw new Error('The `forceHttp` and `forceHttps` options cannot be used together');
    }
    if (options.forceHttp && urlObj.protocol === 'https:') {
        urlObj.protocol = 'http:';
    }
    if (options.forceHttps && urlObj.protocol === 'http:') {
        urlObj.protocol = 'https:';
    }
    // Remove auth
    if (options.stripAuthentication) {
        urlObj.username = '';
        urlObj.password = '';
    }
    // Remove hash
    if (options.stripHash) {
        urlObj.hash = '';
    } else if (options.stripTextFragment) {
        urlObj.hash = urlObj.hash.replace(/#?:~:text.*?$/i, '');
    }
    // Remove duplicate slashes if not preceded by a protocol
    if (urlObj.pathname) {
        urlObj.pathname = urlObj.pathname.replace(/(?<!\b(?:[a-z][a-z\d+\-.]{1,50}:))\/{2,}/g, '/');
    }
    // Decode URI octets
    if (urlObj.pathname) {
        try {
            urlObj.pathname = decodeURI(urlObj.pathname);
        } catch (_) {}
    }
    // Remove directory index
    if (options.removeDirectoryIndex === true) {
        options.removeDirectoryIndex = [
            /^index\.[a-z]+$/
        ];
    }
    if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
        let pathComponents = urlObj.pathname.split('/');
        const lastComponent = pathComponents[pathComponents.length - 1];
        if (testParameter(lastComponent, options.removeDirectoryIndex)) {
            pathComponents = pathComponents.slice(0, pathComponents.length - 1);
            urlObj.pathname = pathComponents.slice(1).join('/') + '/';
        }
    }
    if (urlObj.hostname) {
        // Remove trailing dot
        urlObj.hostname = urlObj.hostname.replace(/\.$/, '');
        // Remove `www.`
        if (options.stripWWW && /^www\.(?!www\.)(?:[a-z\-\d]{1,63})\.(?:[a-z.\-\d]{2,63})$/.test(urlObj.hostname)) {
            // Each label should be max 63 at length (min: 1).
            // Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
            // Each TLD should be up to 63 characters long (min: 2).
            // It is technically possible to have a single character TLD, but none currently exist.
            urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
        }
    }
    // Remove query unwanted parameters
    if (Array.isArray(options.removeQueryParameters)) {
        for (const key of [
            ...urlObj.searchParams.keys()
        ]){
            if (testParameter(key, options.removeQueryParameters)) {
                urlObj.searchParams.delete(key);
            }
        }
    }
    if (options.removeQueryParameters === true) {
        urlObj.search = '';
    }
    // Sort query parameters
    if (options.sortQueryParameters) {
        urlObj.searchParams.sort();
    }
    if (options.removeTrailingSlash) {
        urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
    }
    const oldUrlString = urlString;
    // Take advantage of many of the Node `url` normalizations
    urlString = urlObj.toString();
    if (!options.removeSingleSlash && urlObj.pathname === '/' && !oldUrlString.endsWith('/') && urlObj.hash === '') {
        urlString = urlString.replace(/\/$/, '');
    }
    // Remove ending `/` unless removeSingleSlash is false
    if ((options.removeTrailingSlash || urlObj.pathname === '/') && urlObj.hash === '' && options.removeSingleSlash) {
        urlString = urlString.replace(/\/$/, '');
    }
    // Restore relative protocol, if applicable
    if (hasRelativeProtocol && !options.normalizeProtocol) {
        urlString = urlString.replace(/^http:\/\//, '//');
    }
    // Remove http/https
    if (options.stripProtocol) {
        urlString = urlString.replace(/^(?:https?:)?\/\//, '');
    }
    return urlString;
};
module.exports = normalizeUrl;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/wrappy/wrappy.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy;
function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);
    if (typeof fn !== 'function') throw new TypeError('need wrapper function');
    Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
    });
    return wrapper;
    //TURBOPACK unreachable
    ;
    function wrapper() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++){
            args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb = args[args.length - 1];
        if (typeof ret === 'function' && ret !== cb) {
            Object.keys(cb).forEach(function(k) {
                ret[k] = cb[k];
            });
        }
        return ret;
    }
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/once/once.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var wrappy = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/wrappy/wrappy.js [app-ssr] (ecmascript)");
module.exports = wrappy(once);
module.exports.strict = wrappy(onceStrict);
once.proto = once(function() {
    Object.defineProperty(Function.prototype, 'once', {
        value: function() {
            return once(this);
        },
        configurable: true
    });
    Object.defineProperty(Function.prototype, 'onceStrict', {
        value: function() {
            return onceStrict(this);
        },
        configurable: true
    });
});
function once(fn) {
    var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
}
function onceStrict(fn) {
    var f = function() {
        if (f.called) throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || 'Function wrapped with `once`';
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/end-of-stream/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var once = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/once/once.js [app-ssr] (ecmascript)");
var noop = function() {};
var qnt = /*TURBOPACK member replacement*/ __turbopack_context__.g.Bare ? queueMicrotask : process.nextTick.bind(process);
var isRequest = function(stream) {
    return stream.setHeader && typeof stream.abort === 'function';
};
var isChildProcess = function(stream) {
    return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
};
var eos = function(stream, opts, callback) {
    if (typeof opts === 'function') return eos(stream, null, opts);
    if (!opts) opts = {};
    callback = once(callback || noop);
    var ws = stream._writableState;
    var rs = stream._readableState;
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var cancelled = false;
    var onlegacyfinish = function() {
        if (!stream.writable) onfinish();
    };
    var onfinish = function() {
        writable = false;
        if (!readable) callback.call(stream);
    };
    var onend = function() {
        readable = false;
        if (!writable) callback.call(stream);
    };
    var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
    };
    var onerror = function(err) {
        callback.call(stream, err);
    };
    var onclose = function() {
        qnt(onclosenexttick);
    };
    var onclosenexttick = function() {
        if (cancelled) return;
        if (readable && !(rs && rs.ended && !rs.destroyed)) return callback.call(stream, new Error('premature close'));
        if (writable && !(ws && ws.ended && !ws.destroyed)) return callback.call(stream, new Error('premature close'));
    };
    var onrequest = function() {
        stream.req.on('finish', onfinish);
    };
    if (isRequest(stream)) {
        stream.on('complete', onfinish);
        stream.on('abort', onclose);
        if (stream.req) onrequest();
        else stream.on('request', onrequest);
    } else if (writable && !ws) {
        stream.on('end', onlegacyfinish);
        stream.on('close', onlegacyfinish);
    }
    if (isChildProcess(stream)) stream.on('exit', onexit);
    stream.on('end', onend);
    stream.on('finish', onfinish);
    if (opts.error !== false) stream.on('error', onerror);
    stream.on('close', onclose);
    return function() {
        cancelled = true;
        stream.removeListener('complete', onfinish);
        stream.removeListener('abort', onclose);
        stream.removeListener('request', onrequest);
        if (stream.req) stream.req.removeListener('finish', onfinish);
        stream.removeListener('end', onlegacyfinish);
        stream.removeListener('close', onlegacyfinish);
        stream.removeListener('finish', onfinish);
        stream.removeListener('exit', onexit);
        stream.removeListener('end', onend);
        stream.removeListener('error', onerror);
        stream.removeListener('close', onclose);
    };
};
module.exports = eos;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/pump/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var once = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/once/once.js [app-ssr] (ecmascript)");
var eos = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/end-of-stream/index.js [app-ssr] (ecmascript)");
var fs;
try {
    fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)"); // we only need fs to get the ReadStream and WriteStream prototypes
} catch (e) {}
var noop = function() {};
var ancient = typeof process === 'undefined' ? false : /^v?\.0/.test(process.version);
var isFn = function(fn) {
    return typeof fn === 'function';
};
var isFS = function(stream) {
    if (!ancient) return false // newer node version do not need to care about fs is a special way
    ;
    if (!fs) return false // browser
    ;
    return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
};
var isRequest = function(stream) {
    return stream.setHeader && isFn(stream.abort);
};
var destroyer = function(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on('close', function() {
        closed = true;
    });
    eos(stream, {
        readable: reading,
        writable: writing
    }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
        ;
        if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want
        ;
        if (isFn(stream.destroy)) return stream.destroy();
        callback(err || new Error('stream was destroyed'));
    };
};
var call = function(fn) {
    fn();
};
var pipe = function(from, to) {
    return from.pipe(to);
};
var pump = function() {
    var streams = Array.prototype.slice.call(arguments);
    var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new Error('pump requires two streams per minimum');
    var error;
    var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach(call);
            if (reading) return;
            destroys.forEach(call);
            callback(error);
        });
    });
    return streams.reduce(pipe);
};
module.exports = pump;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-stream/buffer-stream.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { PassThrough: PassThroughStream } = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
module.exports = (options)=>{
    options = {
        ...options
    };
    const { array } = options;
    let { encoding } = options;
    const isBuffer = encoding === 'buffer';
    let objectMode = false;
    if (array) {
        objectMode = !(encoding || isBuffer);
    } else {
        encoding = encoding || 'utf8';
    }
    if (isBuffer) {
        encoding = null;
    }
    const stream = new PassThroughStream({
        objectMode
    });
    if (encoding) {
        stream.setEncoding(encoding);
    }
    let length = 0;
    const chunks = [];
    stream.on('data', (chunk)=>{
        chunks.push(chunk);
        if (objectMode) {
            length = chunks.length;
        } else {
            length += chunk.length;
        }
    });
    stream.getBufferedValue = ()=>{
        if (array) {
            return chunks;
        }
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
    };
    stream.getBufferedLength = ()=>length;
    return stream;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-stream/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { constants: BufferConstants } = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
const pump = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/pump/index.js [app-ssr] (ecmascript)");
const bufferStream = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-stream/buffer-stream.js [app-ssr] (ecmascript)");
class MaxBufferError extends Error {
    constructor(){
        super('maxBuffer exceeded');
        this.name = 'MaxBufferError';
    }
}
async function getStream(inputStream, options) {
    if (!inputStream) {
        return Promise.reject(new Error('Expected a stream'));
    }
    options = {
        maxBuffer: Infinity,
        ...options
    };
    const { maxBuffer } = options;
    let stream;
    await new Promise((resolve, reject)=>{
        const rejectPromise = (error)=>{
            // Don't retrieve an oversized buffer.
            if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
                error.bufferedData = stream.getBufferedValue();
            }
            reject(error);
        };
        stream = pump(inputStream, bufferStream(options), (error)=>{
            if (error) {
                rejectPromise(error);
                return;
            }
            resolve();
        });
        stream.on('data', ()=>{
            if (stream.getBufferedLength() > maxBuffer) {
                rejectPromise(new MaxBufferError());
            }
        });
    });
    return stream.getBufferedValue();
}
module.exports = getStream;
// TODO: Remove this for the next major release
module.exports.default = getStream;
module.exports.buffer = (stream, options)=>getStream(stream, {
        ...options,
        encoding: 'buffer'
    });
module.exports.array = (stream, options)=>getStream(stream, {
        ...options,
        array: true
    });
module.exports.MaxBufferError = MaxBufferError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http-cache-semantics/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @typedef {Object} HttpRequest
 * @property {Record<string, string>} headers - Request headers
 * @property {string} [method] - HTTP method
 * @property {string} [url] - Request URL
 */ /**
 * @typedef {Object} HttpResponse
 * @property {Record<string, string>} headers - Response headers
 * @property {number} [status] - HTTP status code
 */ /**
 * Set of default cacheable status codes per RFC 7231 section 6.1.
 * @type {Set<number>}
 */ const statusCodeCacheableByDefault = new Set([
    200,
    203,
    204,
    206,
    300,
    301,
    308,
    404,
    405,
    410,
    414,
    501
]);
/**
 * Set of HTTP status codes that the cache implementation understands.
 * Note: This implementation does not understand partial responses (206).
 * @type {Set<number>}
 */ const understoodStatuses = new Set([
    200,
    203,
    204,
    300,
    301,
    302,
    303,
    307,
    308,
    404,
    405,
    410,
    414,
    501
]);
/**
 * Set of HTTP error status codes.
 * @type {Set<number>}
 */ const errorStatusCodes = new Set([
    500,
    502,
    503,
    504
]);
/**
 * Object representing hop-by-hop headers that should be removed.
 * @type {Record<string, boolean>}
 */ const hopByHopHeaders = {
    date: true,
    connection: true,
    'keep-alive': true,
    'proxy-authenticate': true,
    'proxy-authorization': true,
    te: true,
    trailer: true,
    'transfer-encoding': true,
    upgrade: true
};
/**
 * Headers that are excluded from revalidation update.
 * @type {Record<string, boolean>}
 */ const excludedFromRevalidationUpdate = {
    // Since the old body is reused, it doesn't make sense to change properties of the body
    'content-length': true,
    'content-encoding': true,
    'transfer-encoding': true,
    'content-range': true
};
/**
 * Converts a string to a number or returns zero if the conversion fails.
 * @param {string} s - The string to convert.
 * @returns {number} The parsed number or 0.
 */ function toNumberOrZero(s) {
    const n = parseInt(s, 10);
    return isFinite(n) ? n : 0;
}
/**
 * Determines if the given response is an error response.
 * Implements RFC 5861 behavior.
 * @param {HttpResponse|undefined} response - The HTTP response object.
 * @returns {boolean} true if the response is an error or undefined, false otherwise.
 */ function isErrorResponse(response) {
    // consider undefined response as faulty
    if (!response) {
        return true;
    }
    return errorStatusCodes.has(response.status);
}
/**
 * Parses a Cache-Control header string into an object.
 * @param {string} [header] - The Cache-Control header value.
 * @returns {Record<string, string|boolean>} An object representing Cache-Control directives.
 */ function parseCacheControl(header) {
    /** @type {Record<string, string|boolean>} */ const cc = {};
    if (!header) return cc;
    // TODO: When there is more than one value present for a given directive (e.g., two Expires header fields, multiple Cache-Control: max-age directives),
    // the directive's value is considered invalid. Caches are encouraged to consider responses that have invalid freshness information to be stale
    const parts = header.trim().split(/,/);
    for (const part of parts){
        const [k, v] = part.split(/=/, 2);
        cc[k.trim()] = v === undefined ? true : v.trim().replace(/^"|"$/g, '');
    }
    return cc;
}
/**
 * Formats a Cache-Control directives object into a header string.
 * @param {Record<string, string|boolean>} cc - The Cache-Control directives.
 * @returns {string|undefined} A formatted Cache-Control header string or undefined if empty.
 */ function formatCacheControl(cc) {
    let parts = [];
    for(const k in cc){
        const v = cc[k];
        parts.push(v === true ? k : k + '=' + v);
    }
    if (!parts.length) {
        return undefined;
    }
    return parts.join(', ');
}
module.exports = class CachePolicy {
    /**
     * Creates a new CachePolicy instance.
     * @param {HttpRequest} req - Incoming client request.
     * @param {HttpResponse} res - Received server response.
     * @param {Object} [options={}] - Configuration options.
     * @param {boolean} [options.shared=true] - Is the cache shared (a public proxy)? `false` for personal browser caches.
     * @param {number} [options.cacheHeuristic=0.1] - Fallback heuristic (age fraction) for cache duration.
     * @param {number} [options.immutableMinTimeToLive=86400000] - Minimum TTL for immutable responses in milliseconds.
     * @param {boolean} [options.ignoreCargoCult=false] - Detect nonsense cache headers, and override them.
     * @param {any} [options._fromObject] - Internal parameter for deserialization. Do not use.
     */ constructor(req, res, { shared, cacheHeuristic, immutableMinTimeToLive, ignoreCargoCult, _fromObject } = {}){
        if (_fromObject) {
            this._fromObject(_fromObject);
            return;
        }
        if (!res || !res.headers) {
            throw Error('Response headers missing');
        }
        this._assertRequestHasHeaders(req);
        /** @type {number} Timestamp when the response was received */ this._responseTime = this.now();
        /** @type {boolean} Indicates if the cache is shared */ this._isShared = shared !== false;
        /** @type {boolean} Indicates if legacy cargo cult directives should be ignored */ this._ignoreCargoCult = !!ignoreCargoCult;
        /** @type {number} Heuristic cache fraction */ this._cacheHeuristic = undefined !== cacheHeuristic ? cacheHeuristic : 0.1; // 10% matches IE
        /** @type {number} Minimum TTL for immutable responses in ms */ this._immutableMinTtl = undefined !== immutableMinTimeToLive ? immutableMinTimeToLive : 24 * 3600 * 1000;
        /** @type {number} HTTP status code */ this._status = 'status' in res ? res.status : 200;
        /** @type {Record<string, string>} Response headers */ this._resHeaders = res.headers;
        /** @type {Record<string, string|boolean>} Parsed Cache-Control directives from response */ this._rescc = parseCacheControl(res.headers['cache-control']);
        /** @type {string} HTTP method (e.g., GET, POST) */ this._method = 'method' in req ? req.method : 'GET';
        /** @type {string} Request URL */ this._url = req.url;
        /** @type {string} Host header from the request */ this._host = req.headers.host;
        /** @type {boolean} Whether the request does not include an Authorization header */ this._noAuthorization = !req.headers.authorization;
        /** @type {Record<string, string>|null} Request headers used for Vary matching */ this._reqHeaders = res.headers.vary ? req.headers : null; // Don't keep all request headers if they won't be used
        /** @type {Record<string, string|boolean>} Parsed Cache-Control directives from request */ this._reqcc = parseCacheControl(req.headers['cache-control']);
        // Assume that if someone uses legacy, non-standard uncecessary options they don't understand caching,
        // so there's no point stricly adhering to the blindly copy&pasted directives.
        if (this._ignoreCargoCult && 'pre-check' in this._rescc && 'post-check' in this._rescc) {
            delete this._rescc['pre-check'];
            delete this._rescc['post-check'];
            delete this._rescc['no-cache'];
            delete this._rescc['no-store'];
            delete this._rescc['must-revalidate'];
            this._resHeaders = Object.assign({}, this._resHeaders, {
                'cache-control': formatCacheControl(this._rescc)
            });
            delete this._resHeaders.expires;
            delete this._resHeaders.pragma;
        }
        // When the Cache-Control header field is not present in a request, caches MUST consider the no-cache request pragma-directive
        // as having the same effect as if "Cache-Control: no-cache" were present (see Section 5.2.1).
        if (res.headers['cache-control'] == null && /no-cache/.test(res.headers.pragma)) {
            this._rescc['no-cache'] = true;
        }
    }
    /**
     * You can monkey-patch it for testing.
     * @returns {number} Current time in milliseconds.
     */ now() {
        return Date.now();
    }
    /**
     * Determines if the response is storable in a cache.
     * @returns {boolean} `false` if can never be cached.
     */ storable() {
        // The "no-store" request directive indicates that a cache MUST NOT store any part of either this request or any response to it.
        return !!(!this._reqcc['no-store'] && // A cache MUST NOT store a response to any request, unless:
        // The request method is understood by the cache and defined as being cacheable, and
        ('GET' === this._method || 'HEAD' === this._method || 'POST' === this._method && this._hasExplicitExpiration()) && // the response status code is understood by the cache, and
        understoodStatuses.has(this._status) && // the "no-store" cache directive does not appear in request or response header fields, and
        !this._rescc['no-store'] && // the "private" response directive does not appear in the response, if the cache is shared, and
        (!this._isShared || !this._rescc.private) && // the Authorization header field does not appear in the request, if the cache is shared,
        (!this._isShared || this._noAuthorization || this._allowsStoringAuthenticated()) && // the response either:
        // contains an Expires header field, or
        (this._resHeaders.expires || // contains a max-age response directive, or
        // contains a s-maxage response directive and the cache is shared, or
        // contains a public response directive.
        this._rescc['max-age'] || this._isShared && this._rescc['s-maxage'] || this._rescc.public || // has a status code that is defined as cacheable by default
        statusCodeCacheableByDefault.has(this._status)));
    }
    /**
     * @returns {boolean} true if expiration is explicitly defined.
     */ _hasExplicitExpiration() {
        // 4.2.1 Calculating Freshness Lifetime
        return !!(this._isShared && this._rescc['s-maxage'] || this._rescc['max-age'] || this._resHeaders.expires);
    }
    /**
     * @param {HttpRequest} req - a request
     * @throws {Error} if the headers are missing.
     */ _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
            throw Error('Request headers missing');
        }
    }
    /**
     * Checks if the request matches the cache and can be satisfied from the cache immediately,
     * without having to make a request to the server.
     *
     * This doesn't support `stale-while-revalidate`. See `evaluateRequest()` for a more complete solution.
     *
     * @param {HttpRequest} req - The new incoming HTTP request.
     * @returns {boolean} `true`` if the cached response used to construct this cache policy satisfies the request without revalidation.
     */ satisfiesWithoutRevalidation(req) {
        const result = this.evaluateRequest(req);
        return !result.revalidation;
    }
    /**
     * @param {{headers: Record<string, string>, synchronous: boolean}|undefined} revalidation - Revalidation information, if any.
     * @returns {{response: {headers: Record<string, string>}, revalidation: {headers: Record<string, string>, synchronous: boolean}|undefined}} An object with a cached response headers and revalidation info.
     */ _evaluateRequestHitResult(revalidation) {
        return {
            response: {
                headers: this.responseHeaders()
            },
            revalidation
        };
    }
    /**
     * @param {HttpRequest} request - new incoming
     * @param {boolean} synchronous - whether revalidation must be synchronous (not s-w-r).
     * @returns {{headers: Record<string, string>, synchronous: boolean}} An object with revalidation headers and a synchronous flag.
     */ _evaluateRequestRevalidation(request, synchronous) {
        return {
            synchronous,
            headers: this.revalidationHeaders(request)
        };
    }
    /**
     * @param {HttpRequest} request - new incoming
     * @returns {{response: undefined, revalidation: {headers: Record<string, string>, synchronous: boolean}}} An object indicating no cached response and revalidation details.
     */ _evaluateRequestMissResult(request) {
        return {
            response: undefined,
            revalidation: this._evaluateRequestRevalidation(request, true)
        };
    }
    /**
     * Checks if the given request matches this cache entry, and how the cache can be used to satisfy it. Returns an object with:
     *
     * ```
     * {
     *     // If defined, you must send a request to the server.
     *     revalidation: {
     *         headers: {}, // HTTP headers to use when sending the revalidation response
     *         // If true, you MUST wait for a response from the server before using the cache
     *         // If false, this is stale-while-revalidate. The cache is stale, but you can use it while you update it asynchronously.
     *         synchronous: bool,
     *     },
     *     // If defined, you can use this cached response.
     *     response: {
     *         headers: {}, // Updated cached HTTP headers you must use when responding to the client
     *     },
     * }
     * ```
     * @param {HttpRequest} req - new incoming HTTP request
     * @returns {{response: {headers: Record<string, string>}|undefined, revalidation: {headers: Record<string, string>, synchronous: boolean}|undefined}} An object containing keys:
     *   - revalidation: { headers: Record<string, string>, synchronous: boolean } Set if you should send this to the origin server
     *   - response: { headers: Record<string, string> } Set if you can respond to the client with these cached headers
     */ evaluateRequest(req) {
        this._assertRequestHasHeaders(req);
        // In all circumstances, a cache MUST NOT ignore the must-revalidate directive
        if (this._rescc['must-revalidate']) {
            return this._evaluateRequestMissResult(req);
        }
        if (!this._requestMatches(req, false)) {
            return this._evaluateRequestMissResult(req);
        }
        // When presented with a request, a cache MUST NOT reuse a stored response, unless:
        // the presented request does not contain the no-cache pragma (Section 5.4), nor the no-cache cache directive,
        // unless the stored response is successfully validated (Section 4.3), and
        const requestCC = parseCacheControl(req.headers['cache-control']);
        if (requestCC['no-cache'] || /no-cache/.test(req.headers.pragma)) {
            return this._evaluateRequestMissResult(req);
        }
        if (requestCC['max-age'] && this.age() > toNumberOrZero(requestCC['max-age'])) {
            return this._evaluateRequestMissResult(req);
        }
        if (requestCC['min-fresh'] && this.maxAge() - this.age() < toNumberOrZero(requestCC['min-fresh'])) {
            return this._evaluateRequestMissResult(req);
        }
        // the stored response is either:
        // fresh, or allowed to be served stale
        if (this.stale()) {
            // If a value is present, then the client is willing to accept a response that has
            // exceeded its freshness lifetime by no more than the specified number of seconds
            const allowsStaleWithoutRevalidation = 'max-stale' in requestCC && (true === requestCC['max-stale'] || requestCC['max-stale'] > this.age() - this.maxAge());
            if (allowsStaleWithoutRevalidation) {
                return this._evaluateRequestHitResult(undefined);
            }
            if (this.useStaleWhileRevalidate()) {
                return this._evaluateRequestHitResult(this._evaluateRequestRevalidation(req, false));
            }
            return this._evaluateRequestMissResult(req);
        }
        return this._evaluateRequestHitResult(undefined);
    }
    /**
     * @param {HttpRequest} req - check if this is for the same cache entry
     * @param {boolean} allowHeadMethod - allow a HEAD method to match.
     * @returns {boolean} `true` if the request matches.
     */ _requestMatches(req, allowHeadMethod) {
        // The presented effective request URI and that of the stored response match, and
        return !!((!this._url || this._url === req.url) && this._host === req.headers.host && // the request method associated with the stored response allows it to be used for the presented request, and
        (!req.method || this._method === req.method || allowHeadMethod && 'HEAD' === req.method) && // selecting header fields nominated by the stored response (if any) match those presented, and
        this._varyMatches(req));
    }
    /**
     * Determines whether storing authenticated responses is allowed.
     * @returns {boolean} `true` if allowed.
     */ _allowsStoringAuthenticated() {
        // following Cache-Control response directives (Section 5.2.2) have such an effect: must-revalidate, public, and s-maxage.
        return !!(this._rescc['must-revalidate'] || this._rescc.public || this._rescc['s-maxage']);
    }
    /**
     * Checks whether the Vary header in the response matches the new request.
     * @param {HttpRequest} req - incoming HTTP request
     * @returns {boolean} `true` if the vary headers match.
     */ _varyMatches(req) {
        if (!this._resHeaders.vary) {
            return true;
        }
        // A Vary header field-value of "*" always fails to match
        if (this._resHeaders.vary === '*') {
            return false;
        }
        const fields = this._resHeaders.vary.trim().toLowerCase().split(/\s*,\s*/);
        for (const name of fields){
            if (req.headers[name] !== this._reqHeaders[name]) return false;
        }
        return true;
    }
    /**
     * Creates a copy of the given headers without any hop-by-hop headers.
     * @param {Record<string, string>} inHeaders - old headers from the cached response
     * @returns {Record<string, string>} A new headers object without hop-by-hop headers.
     */ _copyWithoutHopByHopHeaders(inHeaders) {
        /** @type {Record<string, string>} */ const headers = {};
        for(const name in inHeaders){
            if (hopByHopHeaders[name]) continue;
            headers[name] = inHeaders[name];
        }
        // 9.1.  Connection
        if (inHeaders.connection) {
            const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
            for (const name of tokens){
                delete headers[name];
            }
        }
        if (headers.warning) {
            const warnings = headers.warning.split(/,/).filter((warning)=>{
                return !/^\s*1[0-9][0-9]/.test(warning);
            });
            if (!warnings.length) {
                delete headers.warning;
            } else {
                headers.warning = warnings.join(',').trim();
            }
        }
        return headers;
    }
    /**
     * Returns the response headers adjusted for serving the cached response.
     * Removes hop-by-hop headers and updates the Age and Date headers.
     * @returns {Record<string, string>} The adjusted response headers.
     */ responseHeaders() {
        const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        const age = this.age();
        // A cache SHOULD generate 113 warning if it heuristically chose a freshness
        // lifetime greater than 24 hours and the response's age is greater than 24 hours.
        if (age > 3600 * 24 && !this._hasExplicitExpiration() && this.maxAge() > 3600 * 24) {
            headers.warning = (headers.warning ? `${headers.warning}, ` : '') + '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        headers.date = new Date(this.now()).toUTCString();
        return headers;
    }
    /**
     * Returns the Date header value from the response or the current time if invalid.
     * @returns {number} Timestamp (in milliseconds) representing the Date header or response time.
     */ date() {
        const serverDate = Date.parse(this._resHeaders.date);
        if (isFinite(serverDate)) {
            return serverDate;
        }
        return this._responseTime;
    }
    /**
     * Value of the Age header, in seconds, updated for the current time.
     * May be fractional.
     * @returns {number} The age in seconds.
     */ age() {
        let age = this._ageValue();
        const residentTime = (this.now() - this._responseTime) / 1000;
        return age + residentTime;
    }
    /**
     * @returns {number} The Age header value as a number.
     */ _ageValue() {
        return toNumberOrZero(this._resHeaders.age);
    }
    /**
     * Possibly outdated value of applicable max-age (or heuristic equivalent) in seconds.
     * This counts since response's `Date`.
     *
     * For an up-to-date value, see `timeToLive()`.
     *
     * Returns the maximum age (freshness lifetime) of the response in seconds.
     * @returns {number} The max-age value in seconds.
     */ maxAge() {
        if (!this.storable() || this._rescc['no-cache']) {
            return 0;
        }
        // Shared responses with cookies are cacheable according to the RFC, but IMHO it'd be unwise to do so by default
        // so this implementation requires explicit opt-in via public header
        if (this._isShared && this._resHeaders['set-cookie'] && !this._rescc.public && !this._rescc.immutable) {
            return 0;
        }
        if (this._resHeaders.vary === '*') {
            return 0;
        }
        if (this._isShared) {
            if (this._rescc['proxy-revalidate']) {
                return 0;
            }
            // if a response includes the s-maxage directive, a shared cache recipient MUST ignore the Expires field.
            if (this._rescc['s-maxage']) {
                return toNumberOrZero(this._rescc['s-maxage']);
            }
        }
        // If a response includes a Cache-Control field with the max-age directive, a recipient MUST ignore the Expires field.
        if (this._rescc['max-age']) {
            return toNumberOrZero(this._rescc['max-age']);
        }
        const defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;
        const serverDate = this.date();
        if (this._resHeaders.expires) {
            const expires = Date.parse(this._resHeaders.expires);
            // A cache recipient MUST interpret invalid date formats, especially the value "0", as representing a time in the past (i.e., "already expired").
            if (Number.isNaN(expires) || expires < serverDate) {
                return 0;
            }
            return Math.max(defaultMinTtl, (expires - serverDate) / 1000);
        }
        if (this._resHeaders['last-modified']) {
            const lastModified = Date.parse(this._resHeaders['last-modified']);
            if (isFinite(lastModified) && serverDate > lastModified) {
                return Math.max(defaultMinTtl, (serverDate - lastModified) / 1000 * this._cacheHeuristic);
            }
        }
        return defaultMinTtl;
    }
    /**
     * Remaining time this cache entry may be useful for, in *milliseconds*.
     * You can use this as an expiration time for your cache storage.
     *
     * Prefer this method over `maxAge()`, because it includes other factors like `age` and `stale-while-revalidate`.
     * @returns {number} Time-to-live in milliseconds.
     */ timeToLive() {
        const age = this.maxAge() - this.age();
        const staleIfErrorAge = age + toNumberOrZero(this._rescc['stale-if-error']);
        const staleWhileRevalidateAge = age + toNumberOrZero(this._rescc['stale-while-revalidate']);
        return Math.round(Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1000);
    }
    /**
     * If true, this cache entry is past its expiration date.
     * Note that stale cache may be useful sometimes, see `evaluateRequest()`.
     * @returns {boolean} `false` doesn't mean it's fresh nor usable
     */ stale() {
        return this.maxAge() <= this.age();
    }
    /**
     * @returns {boolean} `true` if `stale-if-error` condition allows use of a stale response.
     */ _useStaleIfError() {
        return this.maxAge() + toNumberOrZero(this._rescc['stale-if-error']) > this.age();
    }
    /** See `evaluateRequest()` for a more complete solution
     * @returns {boolean} `true` if `stale-while-revalidate` is currently allowed.
     */ useStaleWhileRevalidate() {
        const swr = toNumberOrZero(this._rescc['stale-while-revalidate']);
        return swr > 0 && this.maxAge() + swr > this.age();
    }
    /**
     * Creates a `CachePolicy` instance from a serialized object.
     * @param {Object} obj - The serialized object.
     * @returns {CachePolicy} A new CachePolicy instance.
     */ static fromObject(obj) {
        return new this(undefined, undefined, {
            _fromObject: obj
        });
    }
    /**
     * @param {any} obj - The serialized object.
     * @throws {Error} If already initialized or if the object is invalid.
     */ _fromObject(obj) {
        if (this._responseTime) throw Error('Reinitialized');
        if (!obj || obj.v !== 1) throw Error('Invalid serialization');
        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl = obj.imm !== undefined ? obj.imm : 24 * 3600 * 1000;
        this._ignoreCargoCult = !!obj.icc;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
    }
    /**
     * Serializes the `CachePolicy` instance into a JSON-serializable object.
     * @returns {Object} The serialized object.
     */ toObject() {
        return {
            v: 1,
            t: this._responseTime,
            sh: this._isShared,
            ch: this._cacheHeuristic,
            imm: this._immutableMinTtl,
            icc: this._ignoreCargoCult,
            st: this._status,
            resh: this._resHeaders,
            rescc: this._rescc,
            m: this._method,
            u: this._url,
            h: this._host,
            a: this._noAuthorization,
            reqh: this._reqHeaders,
            reqcc: this._reqcc
        };
    }
    /**
     * Headers for sending to the origin server to revalidate stale response.
     * Allows server to return 304 to allow reuse of the previous response.
     *
     * Hop by hop headers are always stripped.
     * Revalidation headers may be added or removed, depending on request.
     * @param {HttpRequest} incomingReq - The incoming HTTP request.
     * @returns {Record<string, string>} The headers for the revalidation request.
     */ revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);
        // This implementation does not understand range requests
        delete headers['if-range'];
        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
            // revalidation allowed via HEAD
            // not for the same resource, or wasn't allowed to be cached anyway
            delete headers['if-none-match'];
            delete headers['if-modified-since'];
            return headers;
        }
        /* MUST send that entity-tag in any cache validation request (using If-Match or If-None-Match) if an entity-tag has been provided by the origin server. */ if (this._resHeaders.etag) {
            headers['if-none-match'] = headers['if-none-match'] ? `${headers['if-none-match']}, ${this._resHeaders.etag}` : this._resHeaders.etag;
        }
        // Clients MAY issue simple (non-subrange) GET requests with either weak validators or strong validators. Clients MUST NOT use weak validators in other forms of request.
        const forbidsWeakValidators = headers['accept-ranges'] || headers['if-match'] || headers['if-unmodified-since'] || this._method && this._method != 'GET';
        /* SHOULD send the Last-Modified value in non-subrange cache validation requests (using If-Modified-Since) if only a Last-Modified value has been provided by the origin server.
        Note: This implementation does not understand partial responses (206) */ if (forbidsWeakValidators) {
            delete headers['if-modified-since'];
            if (headers['if-none-match']) {
                const etags = headers['if-none-match'].split(/,/).filter((etag)=>{
                    return !/^\s*W\//.test(etag);
                });
                if (!etags.length) {
                    delete headers['if-none-match'];
                } else {
                    headers['if-none-match'] = etags.join(',').trim();
                }
            }
        } else if (this._resHeaders['last-modified'] && !headers['if-modified-since']) {
            headers['if-modified-since'] = this._resHeaders['last-modified'];
        }
        return headers;
    }
    /**
     * Creates new CachePolicy with information combined from the previews response,
     * and the new revalidation response.
     *
     * Returns {policy, modified} where modified is a boolean indicating
     * whether the response body has been modified, and old cached body can't be used.
     *
     * @param {HttpRequest} request - The latest HTTP request asking for the cached entry.
     * @param {HttpResponse} response - The latest revalidation HTTP response from the origin server.
     * @returns {{policy: CachePolicy, modified: boolean, matches: boolean}} The updated policy and modification status.
     * @throws {Error} If the response headers are missing.
     */ revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if (this._useStaleIfError() && isErrorResponse(response)) {
            return {
                policy: this,
                modified: false,
                matches: true
            };
        }
        if (!response || !response.headers) {
            throw Error('Response headers missing');
        }
        // These aren't going to be supported exactly, since one CachePolicy object
        // doesn't know about all the other cached objects.
        let matches = false;
        if (response.status !== undefined && response.status != 304) {
            matches = false;
        } else if (response.headers.etag && !/^\s*W\//.test(response.headers.etag)) {
            // "All of the stored responses with the same strong validator are selected.
            // If none of the stored responses contain the same strong validator,
            // then the cache MUST NOT use the new response to update any stored responses."
            matches = this._resHeaders.etag && this._resHeaders.etag.replace(/^\s*W\//, '') === response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
            // "If the new response contains a weak validator and that validator corresponds
            // to one of the cache's stored responses,
            // then the most recent of those matching stored responses is selected for update."
            matches = this._resHeaders.etag.replace(/^\s*W\//, '') === response.headers.etag.replace(/^\s*W\//, '');
        } else if (this._resHeaders['last-modified']) {
            matches = this._resHeaders['last-modified'] === response.headers['last-modified'];
        } else {
            // If the new response does not include any form of validator (such as in the case where
            // a client generates an If-Modified-Since request from a source other than the Last-Modified
            // response header field), and there is only one stored response, and that stored response also
            // lacks a validator, then that stored response is selected for update.
            if (!this._resHeaders.etag && !this._resHeaders['last-modified'] && !response.headers.etag && !response.headers['last-modified']) {
                matches = true;
            }
        }
        const optionsCopy = {
            shared: this._isShared,
            cacheHeuristic: this._cacheHeuristic,
            immutableMinTimeToLive: this._immutableMinTtl,
            ignoreCargoCult: this._ignoreCargoCult
        };
        if (!matches) {
            return {
                policy: new this.constructor(request, response, optionsCopy),
                // Client receiving 304 without body, even if it's invalid/mismatched has no option
                // but to reuse a cached body. We don't have a good way to tell clients to do
                // error recovery in such case.
                modified: response.status != 304,
                matches: false
            };
        }
        // use other header fields provided in the 304 (Not Modified) response to replace all instances
        // of the corresponding header fields in the stored response.
        const headers = {};
        for(const k in this._resHeaders){
            headers[k] = k in response.headers && !excludedFromRevalidationUpdate[k] ? response.headers[k] : this._resHeaders[k];
        }
        const newResponse = Object.assign({}, response, {
            status: this._status,
            method: this._method,
            headers
        });
        return {
            policy: new this.constructor(request, newResponse, optionsCopy),
            modified: false,
            matches: true
        };
    }
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/lowercase-keys/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = (object)=>{
    const result = {};
    for (const [key, value] of Object.entries(object)){
        result[key.toLowerCase()] = value;
    }
    return result;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/responselike/src/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Readable = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Readable;
const lowercaseKeys = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/lowercase-keys/index.js [app-ssr] (ecmascript)");
class Response extends Readable {
    constructor(statusCode, headers, body, url){
        if (typeof statusCode !== 'number') {
            throw new TypeError('Argument `statusCode` should be a number');
        }
        if (typeof headers !== 'object') {
            throw new TypeError('Argument `headers` should be an object');
        }
        if (!(body instanceof Buffer)) {
            throw new TypeError('Argument `body` should be a buffer');
        }
        if (typeof url !== 'string') {
            throw new TypeError('Argument `url` should be a string');
        }
        super();
        this.statusCode = statusCode;
        this.headers = lowercaseKeys(headers);
        this.body = body;
        this.url = url;
    }
    _read() {
        this.push(this.body);
        this.push(null);
    }
}
module.exports = Response;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/mimic-response/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProps = [
    'destroy',
    'setTimeout',
    'socket',
    'headers',
    'trailers',
    'rawHeaders',
    'statusCode',
    'httpVersion',
    'httpVersionMinor',
    'httpVersionMajor',
    'rawTrailers',
    'statusMessage'
];
module.exports = (fromStream, toStream)=>{
    const fromProps = new Set(Object.keys(fromStream).concat(knownProps));
    for (const prop of fromProps){
        // Don't overwrite existing properties
        if (prop in toStream) {
            continue;
        }
        toStream[prop] = typeof fromStream[prop] === 'function' ? fromStream[prop].bind(fromStream) : fromStream[prop];
    }
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/decompress-response/node_modules/mimic-response/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProperties = [
    'aborted',
    'complete',
    'headers',
    'httpVersion',
    'httpVersionMinor',
    'httpVersionMajor',
    'method',
    'rawHeaders',
    'rawTrailers',
    'setTimeout',
    'socket',
    'statusCode',
    'statusMessage',
    'trailers',
    'url'
];
module.exports = (fromStream, toStream)=>{
    if (toStream._readableState.autoDestroy) {
        throw new Error('The second stream must have the `autoDestroy` option set to `false`');
    }
    const fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));
    const properties = {};
    for (const property of fromProperties){
        // Don't overwrite existing properties.
        if (property in toStream) {
            continue;
        }
        properties[property] = {
            get () {
                const value = fromStream[property];
                const isFunction = typeof value === 'function';
                return isFunction ? value.bind(fromStream) : value;
            },
            set (value) {
                fromStream[property] = value;
            },
            enumerable: true,
            configurable: false
        };
    }
    Object.defineProperties(toStream, properties);
    fromStream.once('aborted', ()=>{
        toStream.destroy();
        toStream.emit('aborted');
    });
    fromStream.once('close', ()=>{
        if (fromStream.complete) {
            if (toStream.readable) {
                toStream.once('end', ()=>{
                    toStream.emit('close');
                });
            } else {
                toStream.emit('close');
            }
        } else {
            toStream.emit('close');
        }
    });
    return toStream;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/clone-response/src/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const PassThrough = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").PassThrough;
const mimicResponse = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/mimic-response/index.js [app-ssr] (ecmascript)");
const cloneResponse = (response)=>{
    if (!(response && response.pipe)) {
        throw new TypeError('Parameter `response` must be a response stream.');
    }
    const clone = new PassThrough();
    mimicResponse(response, clone);
    return response.pipe(clone);
};
module.exports = cloneResponse;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/cacheable-request/src/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const urlLib = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const normalizeUrl = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/normalize-url/index.js [app-ssr] (ecmascript)");
const getStream = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-stream/index.js [app-ssr] (ecmascript)");
const CachePolicy = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http-cache-semantics/index.js [app-ssr] (ecmascript)");
const Response = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/responselike/src/index.js [app-ssr] (ecmascript)");
const lowercaseKeys = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/lowercase-keys/index.js [app-ssr] (ecmascript)");
const cloneResponse = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/clone-response/src/index.js [app-ssr] (ecmascript)");
const Keyv = __turbopack_context__.r("[externals]/keyv [external] (keyv, cjs)");
class CacheableRequest {
    constructor(request, cacheAdapter){
        if (typeof request !== 'function') {
            throw new TypeError('Parameter `request` must be a function');
        }
        this.cache = new Keyv({
            uri: typeof cacheAdapter === 'string' && cacheAdapter,
            store: typeof cacheAdapter !== 'string' && cacheAdapter,
            namespace: 'cacheable-request'
        });
        return this.createCacheableRequest(request);
    }
    createCacheableRequest(request) {
        return (opts, cb)=>{
            let url;
            if (typeof opts === 'string') {
                url = normalizeUrlObject(urlLib.parse(opts));
                opts = {};
            } else if (opts instanceof urlLib.URL) {
                url = normalizeUrlObject(urlLib.parse(opts.toString()));
                opts = {};
            } else {
                const [pathname, ...searchParts] = (opts.path || '').split('?');
                const search = searchParts.length > 0 ? `?${searchParts.join('?')}` : '';
                url = normalizeUrlObject({
                    ...opts,
                    pathname,
                    search
                });
            }
            opts = {
                headers: {},
                method: 'GET',
                cache: true,
                strictTtl: false,
                automaticFailover: false,
                ...opts,
                ...urlObjectToRequestOptions(url)
            };
            opts.headers = lowercaseKeys(opts.headers);
            const ee = new EventEmitter();
            const normalizedUrlString = normalizeUrl(urlLib.format(url), {
                stripWWW: false,
                removeTrailingSlash: false,
                stripAuthentication: false
            });
            const key = `${opts.method}:${normalizedUrlString}`;
            let revalidate = false;
            let madeRequest = false;
            const makeRequest = (opts)=>{
                madeRequest = true;
                let requestErrored = false;
                let requestErrorCallback;
                const requestErrorPromise = new Promise((resolve)=>{
                    requestErrorCallback = ()=>{
                        if (!requestErrored) {
                            requestErrored = true;
                            resolve();
                        }
                    };
                });
                const handler = (response)=>{
                    if (revalidate && !opts.forceRefresh) {
                        response.status = response.statusCode;
                        const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts, response);
                        if (!revalidatedPolicy.modified) {
                            const headers = revalidatedPolicy.policy.responseHeaders();
                            response = new Response(revalidate.statusCode, headers, revalidate.body, revalidate.url);
                            response.cachePolicy = revalidatedPolicy.policy;
                            response.fromCache = true;
                        }
                    }
                    if (!response.fromCache) {
                        response.cachePolicy = new CachePolicy(opts, response, opts);
                        response.fromCache = false;
                    }
                    let clonedResponse;
                    if (opts.cache && response.cachePolicy.storable()) {
                        clonedResponse = cloneResponse(response);
                        (async ()=>{
                            try {
                                const bodyPromise = getStream.buffer(response);
                                await Promise.race([
                                    requestErrorPromise,
                                    new Promise((resolve)=>response.once('end', resolve))
                                ]);
                                if (requestErrored) {
                                    return;
                                }
                                const body = await bodyPromise;
                                const value = {
                                    cachePolicy: response.cachePolicy.toObject(),
                                    url: response.url,
                                    statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
                                    body
                                };
                                let ttl = opts.strictTtl ? response.cachePolicy.timeToLive() : undefined;
                                if (opts.maxTtl) {
                                    ttl = ttl ? Math.min(ttl, opts.maxTtl) : opts.maxTtl;
                                }
                                await this.cache.set(key, value, ttl);
                            } catch (error) {
                                ee.emit('error', new CacheableRequest.CacheError(error));
                            }
                        })();
                    } else if (opts.cache && revalidate) {
                        (async ()=>{
                            try {
                                await this.cache.delete(key);
                            } catch (error) {
                                ee.emit('error', new CacheableRequest.CacheError(error));
                            }
                        })();
                    }
                    ee.emit('response', clonedResponse || response);
                    if (typeof cb === 'function') {
                        cb(clonedResponse || response);
                    }
                };
                try {
                    const req = request(opts, handler);
                    req.once('error', requestErrorCallback);
                    req.once('abort', requestErrorCallback);
                    ee.emit('request', req);
                } catch (error) {
                    ee.emit('error', new CacheableRequest.RequestError(error));
                }
            };
            (async ()=>{
                const get = async (opts)=>{
                    await Promise.resolve();
                    const cacheEntry = opts.cache ? await this.cache.get(key) : undefined;
                    if (typeof cacheEntry === 'undefined') {
                        return makeRequest(opts);
                    }
                    const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
                    if (policy.satisfiesWithoutRevalidation(opts) && !opts.forceRefresh) {
                        const headers = policy.responseHeaders();
                        const response = new Response(cacheEntry.statusCode, headers, cacheEntry.body, cacheEntry.url);
                        response.cachePolicy = policy;
                        response.fromCache = true;
                        ee.emit('response', response);
                        if (typeof cb === 'function') {
                            cb(response);
                        }
                    } else {
                        revalidate = cacheEntry;
                        opts.headers = policy.revalidationHeaders(opts);
                        makeRequest(opts);
                    }
                };
                const errorHandler = (error)=>ee.emit('error', new CacheableRequest.CacheError(error));
                this.cache.once('error', errorHandler);
                ee.on('response', ()=>this.cache.removeListener('error', errorHandler));
                try {
                    await get(opts);
                } catch (error) {
                    if (opts.automaticFailover && !madeRequest) {
                        makeRequest(opts);
                    }
                    ee.emit('error', new CacheableRequest.CacheError(error));
                }
            })();
            return ee;
        };
    }
}
function urlObjectToRequestOptions(url) {
    const options = {
        ...url
    };
    options.path = `${url.pathname || '/'}${url.search || ''}`;
    delete options.pathname;
    delete options.search;
    return options;
}
function normalizeUrlObject(url) {
    // If url was parsed by url.parse or new URL:
    // - hostname will be set
    // - host will be hostname[:port]
    // - port will be set if it was explicit in the parsed string
    // Otherwise, url was from request options:
    // - hostname or host may be set
    // - host shall not have port encoded
    return {
        protocol: url.protocol,
        auth: url.auth,
        hostname: url.hostname || url.host || 'localhost',
        port: url.port,
        pathname: url.pathname,
        search: url.search
    };
}
CacheableRequest.RequestError = class extends Error {
    constructor(error){
        super(error.message);
        this.name = 'RequestError';
        Object.assign(this, error);
    }
};
CacheableRequest.CacheError = class extends Error {
    constructor(error){
        super(error.message);
        this.name = 'CacheError';
        Object.assign(this, error);
    }
};
module.exports = CacheableRequest;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/decompress-response/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { Transform, PassThrough } = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
const mimicResponse = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/decompress-response/node_modules/mimic-response/index.js [app-ssr] (ecmascript)");
module.exports = (response)=>{
    const contentEncoding = (response.headers['content-encoding'] || '').toLowerCase();
    if (![
        'gzip',
        'deflate',
        'br'
    ].includes(contentEncoding)) {
        return response;
    }
    // TODO: Remove this when targeting Node.js 12.
    const isBrotli = contentEncoding === 'br';
    if (isBrotli && typeof zlib.createBrotliDecompress !== 'function') {
        response.destroy(new Error('Brotli is not supported on Node.js < 12'));
        return response;
    }
    let isEmpty = true;
    const checker = new Transform({
        transform (data, _encoding, callback) {
            isEmpty = false;
            callback(null, data);
        },
        flush (callback) {
            callback();
        }
    });
    const finalStream = new PassThrough({
        autoDestroy: false,
        destroy (error, callback) {
            response.destroy();
            callback(error);
        }
    });
    const decompressStream = isBrotli ? zlib.createBrotliDecompress() : zlib.createUnzip();
    decompressStream.once('error', (error)=>{
        if (isEmpty && !response.readable) {
            finalStream.end();
            return;
        }
        finalStream.destroy(error);
    });
    mimicResponse(response, finalStream);
    response.pipe(checker).pipe(decompressStream).pipe(finalStream);
    return finalStream;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/quick-lru/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class QuickLRU {
    constructor(options = {}){
        if (!(options.maxSize && options.maxSize > 0)) {
            throw new TypeError('`maxSize` must be a number greater than 0');
        }
        this.maxSize = options.maxSize;
        this.onEviction = options.onEviction;
        this.cache = new Map();
        this.oldCache = new Map();
        this._size = 0;
    }
    _set(key, value) {
        this.cache.set(key, value);
        this._size++;
        if (this._size >= this.maxSize) {
            this._size = 0;
            if (typeof this.onEviction === 'function') {
                for (const [key, value] of this.oldCache.entries()){
                    this.onEviction(key, value);
                }
            }
            this.oldCache = this.cache;
            this.cache = new Map();
        }
    }
    get(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
            const value = this.oldCache.get(key);
            this.oldCache.delete(key);
            this._set(key, value);
            return value;
        }
    }
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.set(key, value);
        } else {
            this._set(key, value);
        }
        return this;
    }
    has(key) {
        return this.cache.has(key) || this.oldCache.has(key);
    }
    peek(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
            return this.oldCache.get(key);
        }
    }
    delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
            this._size--;
        }
        return this.oldCache.delete(key) || deleted;
    }
    clear() {
        this.cache.clear();
        this.oldCache.clear();
        this._size = 0;
    }
    *keys() {
        for (const [key] of this){
            yield key;
        }
    }
    *values() {
        for (const [, value] of this){
            yield value;
        }
    }
    *[Symbol.iterator]() {
        for (const item of this.cache){
            yield item;
        }
        for (const item of this.oldCache){
            const [key] = item;
            if (!this.cache.has(key)) {
                yield item;
            }
        }
    }
    get size() {
        let oldCacheSize = 0;
        for (const key of this.oldCache.keys()){
            if (!this.cache.has(key)) {
                oldCacheSize++;
            }
        }
        return Math.min(this._size + oldCacheSize, this.maxSize);
    }
}
module.exports = QuickLRU;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/agent.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const tls = __turbopack_context__.r("[externals]/tls [external] (tls, cjs)");
const http2 = __turbopack_context__.r("[externals]/http2 [external] (http2, cjs)");
const QuickLRU = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/quick-lru/index.js [app-ssr] (ecmascript)");
const kCurrentStreamsCount = Symbol('currentStreamsCount');
const kRequest = Symbol('request');
const kOriginSet = Symbol('cachedOriginSet');
const kGracefullyClosing = Symbol('gracefullyClosing');
const nameKeys = [
    // `http2.connect()` options
    'maxDeflateDynamicTableSize',
    'maxSessionMemory',
    'maxHeaderListPairs',
    'maxOutstandingPings',
    'maxReservedRemoteStreams',
    'maxSendHeaderBlockLength',
    'paddingStrategy',
    // `tls.connect()` options
    'localAddress',
    'path',
    'rejectUnauthorized',
    'minDHSize',
    // `tls.createSecureContext()` options
    'ca',
    'cert',
    'clientCertEngine',
    'ciphers',
    'key',
    'pfx',
    'servername',
    'minVersion',
    'maxVersion',
    'secureProtocol',
    'crl',
    'honorCipherOrder',
    'ecdhCurve',
    'dhparam',
    'secureOptions',
    'sessionIdContext'
];
const getSortedIndex = (array, value, compare)=>{
    let low = 0;
    let high = array.length;
    while(low < high){
        const mid = low + high >>> 1;
        /* istanbul ignore next */ if (compare(array[mid], value)) {
            // This never gets called because we use descending sort. Better to have this anyway.
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
};
const compareSessions = (a, b)=>{
    return a.remoteSettings.maxConcurrentStreams > b.remoteSettings.maxConcurrentStreams;
};
// See https://tools.ietf.org/html/rfc8336
const closeCoveredSessions = (where, session)=>{
    // Clients SHOULD NOT emit new requests on any connection whose Origin
    // Set is a proper subset of another connection's Origin Set, and they
    // SHOULD close it once all outstanding requests are satisfied.
    for (const coveredSession of where){
        if (// The set is a proper subset when its length is less than the other set.
        coveredSession[kOriginSet].length < session[kOriginSet].length && // And the other set includes all elements of the subset.
        coveredSession[kOriginSet].every((origin)=>session[kOriginSet].includes(origin)) && // Makes sure that the session can handle all requests from the covered session.
        coveredSession[kCurrentStreamsCount] + session[kCurrentStreamsCount] <= session.remoteSettings.maxConcurrentStreams) {
            // This allows pending requests to finish and prevents making new requests.
            gracefullyClose(coveredSession);
        }
    }
};
// This is basically inverted `closeCoveredSessions(...)`.
const closeSessionIfCovered = (where, coveredSession)=>{
    for (const session of where){
        if (coveredSession[kOriginSet].length < session[kOriginSet].length && coveredSession[kOriginSet].every((origin)=>session[kOriginSet].includes(origin)) && coveredSession[kCurrentStreamsCount] + session[kCurrentStreamsCount] <= session.remoteSettings.maxConcurrentStreams) {
            gracefullyClose(coveredSession);
        }
    }
};
const getSessions = ({ agent, isFree })=>{
    const result = {};
    // eslint-disable-next-line guard-for-in
    for(const normalizedOptions in agent.sessions){
        const sessions = agent.sessions[normalizedOptions];
        const filtered = sessions.filter((session)=>{
            const result = session[Agent.kCurrentStreamsCount] < session.remoteSettings.maxConcurrentStreams;
            return isFree ? result : !result;
        });
        if (filtered.length !== 0) {
            result[normalizedOptions] = filtered;
        }
    }
    return result;
};
const gracefullyClose = (session)=>{
    session[kGracefullyClosing] = true;
    if (session[kCurrentStreamsCount] === 0) {
        session.close();
    }
};
class Agent extends EventEmitter {
    constructor({ timeout = 60000, maxSessions = Infinity, maxFreeSessions = 10, maxCachedTlsSessions = 100 } = {}){
        super();
        // A session is considered busy when its current streams count
        // is equal to or greater than the `maxConcurrentStreams` value.
        // A session is considered free when its current streams count
        // is less than the `maxConcurrentStreams` value.
        // SESSIONS[NORMALIZED_OPTIONS] = [];
        this.sessions = {};
        // The queue for creating new sessions. It looks like this:
        // QUEUE[NORMALIZED_OPTIONS][NORMALIZED_ORIGIN] = ENTRY_FUNCTION
        //
        // The entry function has `listeners`, `completed` and `destroyed` properties.
        // `listeners` is an array of objects containing `resolve` and `reject` functions.
        // `completed` is a boolean. It's set to true after ENTRY_FUNCTION is executed.
        // `destroyed` is a boolean. If it's set to true, the session will be destroyed if hasn't connected yet.
        this.queue = {};
        // Each session will use this timeout value.
        this.timeout = timeout;
        // Max sessions in total
        this.maxSessions = maxSessions;
        // Max free sessions in total
        // TODO: decreasing `maxFreeSessions` should close some sessions
        this.maxFreeSessions = maxFreeSessions;
        this._freeSessionsCount = 0;
        this._sessionsCount = 0;
        // We don't support push streams by default.
        this.settings = {
            enablePush: false
        };
        // Reusing TLS sessions increases performance.
        this.tlsSessionCache = new QuickLRU({
            maxSize: maxCachedTlsSessions
        });
    }
    static normalizeOrigin(url, servername) {
        if (typeof url === 'string') {
            url = new URL(url);
        }
        if (servername && url.hostname !== servername) {
            url.hostname = servername;
        }
        return url.origin;
    }
    normalizeOptions(options) {
        let normalized = '';
        if (options) {
            for (const key of nameKeys){
                if (options[key]) {
                    normalized += `:${options[key]}`;
                }
            }
        }
        return normalized;
    }
    _tryToCreateNewSession(normalizedOptions, normalizedOrigin) {
        if (!(normalizedOptions in this.queue) || !(normalizedOrigin in this.queue[normalizedOptions])) {
            return;
        }
        const item = this.queue[normalizedOptions][normalizedOrigin];
        // The entry function can be run only once.
        // BUG: The session may be never created when:
        // - the first condition is false AND
        // - this function is never called with the same arguments in the future.
        if (this._sessionsCount < this.maxSessions && !item.completed) {
            item.completed = true;
            item();
        }
    }
    getSession(origin, options, listeners) {
        return new Promise((resolve, reject)=>{
            if (Array.isArray(listeners)) {
                listeners = [
                    ...listeners
                ];
                // Resolve the current promise ASAP, we're just moving the listeners.
                // They will be executed at a different time.
                resolve();
            } else {
                listeners = [
                    {
                        resolve,
                        reject
                    }
                ];
            }
            const normalizedOptions = this.normalizeOptions(options);
            const normalizedOrigin = Agent.normalizeOrigin(origin, options && options.servername);
            if (normalizedOrigin === undefined) {
                for (const { reject } of listeners){
                    reject(new TypeError('The `origin` argument needs to be a string or an URL object'));
                }
                return;
            }
            if (normalizedOptions in this.sessions) {
                const sessions = this.sessions[normalizedOptions];
                let maxConcurrentStreams = -1;
                let currentStreamsCount = -1;
                let optimalSession;
                // We could just do this.sessions[normalizedOptions].find(...) but that isn't optimal.
                // Additionally, we are looking for session which has biggest current pending streams count.
                for (const session of sessions){
                    const sessionMaxConcurrentStreams = session.remoteSettings.maxConcurrentStreams;
                    if (sessionMaxConcurrentStreams < maxConcurrentStreams) {
                        break;
                    }
                    if (session[kOriginSet].includes(normalizedOrigin)) {
                        const sessionCurrentStreamsCount = session[kCurrentStreamsCount];
                        if (sessionCurrentStreamsCount >= sessionMaxConcurrentStreams || session[kGracefullyClosing] || // Unfortunately the `close` event isn't called immediately,
                        // so `session.destroyed` is `true`, but `session.closed` is `false`.
                        session.destroyed) {
                            continue;
                        }
                        // We only need set this once.
                        if (!optimalSession) {
                            maxConcurrentStreams = sessionMaxConcurrentStreams;
                        }
                        // We're looking for the session which has biggest current pending stream count,
                        // in order to minimalize the amount of active sessions.
                        if (sessionCurrentStreamsCount > currentStreamsCount) {
                            optimalSession = session;
                            currentStreamsCount = sessionCurrentStreamsCount;
                        }
                    }
                }
                if (optimalSession) {
                    /* istanbul ignore next: safety check */ if (listeners.length !== 1) {
                        for (const { reject } of listeners){
                            const error = new Error(`Expected the length of listeners to be 1, got ${listeners.length}.\n` + 'Please report this to https://github.com/szmarczak/http2-wrapper/');
                            reject(error);
                        }
                        return;
                    }
                    listeners[0].resolve(optimalSession);
                    return;
                }
            }
            if (normalizedOptions in this.queue) {
                if (normalizedOrigin in this.queue[normalizedOptions]) {
                    // There's already an item in the queue, just attach ourselves to it.
                    this.queue[normalizedOptions][normalizedOrigin].listeners.push(...listeners);
                    // This shouldn't be executed here.
                    // See the comment inside _tryToCreateNewSession.
                    this._tryToCreateNewSession(normalizedOptions, normalizedOrigin);
                    return;
                }
            } else {
                this.queue[normalizedOptions] = {};
            }
            // The entry must be removed from the queue IMMEDIATELY when:
            // 1. the session connects successfully,
            // 2. an error occurs.
            const removeFromQueue = ()=>{
                // Our entry can be replaced. We cannot remove the new one.
                if (normalizedOptions in this.queue && this.queue[normalizedOptions][normalizedOrigin] === entry) {
                    delete this.queue[normalizedOptions][normalizedOrigin];
                    if (Object.keys(this.queue[normalizedOptions]).length === 0) {
                        delete this.queue[normalizedOptions];
                    }
                }
            };
            // The main logic is here
            const entry = ()=>{
                const name = `${normalizedOrigin}:${normalizedOptions}`;
                let receivedSettings = false;
                try {
                    const session = http2.connect(origin, {
                        createConnection: this.createConnection,
                        settings: this.settings,
                        session: this.tlsSessionCache.get(name),
                        ...options
                    });
                    session[kCurrentStreamsCount] = 0;
                    session[kGracefullyClosing] = false;
                    const isFree = ()=>session[kCurrentStreamsCount] < session.remoteSettings.maxConcurrentStreams;
                    let wasFree = true;
                    session.socket.once('session', (tlsSession)=>{
                        this.tlsSessionCache.set(name, tlsSession);
                    });
                    session.once('error', (error)=>{
                        // Listeners are empty when the session successfully connected.
                        for (const { reject } of listeners){
                            reject(error);
                        }
                        // The connection got broken, purge the cache.
                        this.tlsSessionCache.delete(name);
                    });
                    session.setTimeout(this.timeout, ()=>{
                        // Terminates all streams owned by this session.
                        // TODO: Maybe the streams should have a "Session timed out" error?
                        session.destroy();
                    });
                    session.once('close', ()=>{
                        if (receivedSettings) {
                            // 1. If it wasn't free then no need to decrease because
                            //    it has been decreased already in session.request().
                            // 2. `stream.once('close')` won't increment the count
                            //    because the session is already closed.
                            if (wasFree) {
                                this._freeSessionsCount--;
                            }
                            this._sessionsCount--;
                            // This cannot be moved to the stream logic,
                            // because there may be a session that hadn't made a single request.
                            const where = this.sessions[normalizedOptions];
                            where.splice(where.indexOf(session), 1);
                            if (where.length === 0) {
                                delete this.sessions[normalizedOptions];
                            }
                        } else {
                            // Broken connection
                            const error = new Error('Session closed without receiving a SETTINGS frame');
                            error.code = 'HTTP2WRAPPER_NOSETTINGS';
                            for (const { reject } of listeners){
                                reject(error);
                            }
                            removeFromQueue();
                        }
                        // There may be another session awaiting.
                        this._tryToCreateNewSession(normalizedOptions, normalizedOrigin);
                    });
                    // Iterates over the queue and processes listeners.
                    const processListeners = ()=>{
                        if (!(normalizedOptions in this.queue) || !isFree()) {
                            return;
                        }
                        for (const origin of session[kOriginSet]){
                            if (origin in this.queue[normalizedOptions]) {
                                const { listeners } = this.queue[normalizedOptions][origin];
                                // Prevents session overloading.
                                while(listeners.length !== 0 && isFree()){
                                    // We assume `resolve(...)` calls `request(...)` *directly*,
                                    // otherwise the session will get overloaded.
                                    listeners.shift().resolve(session);
                                }
                                const where = this.queue[normalizedOptions];
                                if (where[origin].listeners.length === 0) {
                                    delete where[origin];
                                    if (Object.keys(where).length === 0) {
                                        delete this.queue[normalizedOptions];
                                        break;
                                    }
                                }
                                // We're no longer free, no point in continuing.
                                if (!isFree()) {
                                    break;
                                }
                            }
                        }
                    };
                    // The Origin Set cannot shrink. No need to check if it suddenly became covered by another one.
                    session.on('origin', ()=>{
                        session[kOriginSet] = session.originSet;
                        if (!isFree()) {
                            // The session is full.
                            return;
                        }
                        processListeners();
                        // Close covered sessions (if possible).
                        closeCoveredSessions(this.sessions[normalizedOptions], session);
                    });
                    session.once('remoteSettings', ()=>{
                        // Fix Node.js bug preventing the process from exiting
                        session.ref();
                        session.unref();
                        this._sessionsCount++;
                        // The Agent could have been destroyed already.
                        if (entry.destroyed) {
                            const error = new Error('Agent has been destroyed');
                            for (const listener of listeners){
                                listener.reject(error);
                            }
                            session.destroy();
                            return;
                        }
                        session[kOriginSet] = session.originSet;
                        {
                            const where = this.sessions;
                            if (normalizedOptions in where) {
                                const sessions = where[normalizedOptions];
                                sessions.splice(getSortedIndex(sessions, session, compareSessions), 0, session);
                            } else {
                                where[normalizedOptions] = [
                                    session
                                ];
                            }
                        }
                        this._freeSessionsCount += 1;
                        receivedSettings = true;
                        this.emit('session', session);
                        processListeners();
                        removeFromQueue();
                        // TODO: Close last recently used (or least used?) session
                        if (session[kCurrentStreamsCount] === 0 && this._freeSessionsCount > this.maxFreeSessions) {
                            session.close();
                        }
                        // Check if we haven't managed to execute all listeners.
                        if (listeners.length !== 0) {
                            // Request for a new session with predefined listeners.
                            this.getSession(normalizedOrigin, options, listeners);
                            listeners.length = 0;
                        }
                        // `session.remoteSettings.maxConcurrentStreams` might get increased
                        session.on('remoteSettings', ()=>{
                            processListeners();
                            // In case the Origin Set changes
                            closeCoveredSessions(this.sessions[normalizedOptions], session);
                        });
                    });
                    // Shim `session.request()` in order to catch all streams
                    session[kRequest] = session.request;
                    session.request = (headers, streamOptions)=>{
                        if (session[kGracefullyClosing]) {
                            throw new Error('The session is gracefully closing. No new streams are allowed.');
                        }
                        const stream = session[kRequest](headers, streamOptions);
                        // The process won't exit until the session is closed or all requests are gone.
                        session.ref();
                        ++session[kCurrentStreamsCount];
                        if (session[kCurrentStreamsCount] === session.remoteSettings.maxConcurrentStreams) {
                            this._freeSessionsCount--;
                        }
                        stream.once('close', ()=>{
                            wasFree = isFree();
                            --session[kCurrentStreamsCount];
                            if (!session.destroyed && !session.closed) {
                                closeSessionIfCovered(this.sessions[normalizedOptions], session);
                                if (isFree() && !session.closed) {
                                    if (!wasFree) {
                                        this._freeSessionsCount++;
                                        wasFree = true;
                                    }
                                    const isEmpty = session[kCurrentStreamsCount] === 0;
                                    if (isEmpty) {
                                        session.unref();
                                    }
                                    if (isEmpty && (this._freeSessionsCount > this.maxFreeSessions || session[kGracefullyClosing])) {
                                        session.close();
                                    } else {
                                        closeCoveredSessions(this.sessions[normalizedOptions], session);
                                        processListeners();
                                    }
                                }
                            }
                        });
                        return stream;
                    };
                } catch (error) {
                    for (const listener of listeners){
                        listener.reject(error);
                    }
                    removeFromQueue();
                }
            };
            entry.listeners = listeners;
            entry.completed = false;
            entry.destroyed = false;
            this.queue[normalizedOptions][normalizedOrigin] = entry;
            this._tryToCreateNewSession(normalizedOptions, normalizedOrigin);
        });
    }
    request(origin, options, headers, streamOptions) {
        return new Promise((resolve, reject)=>{
            this.getSession(origin, options, [
                {
                    reject,
                    resolve: (session)=>{
                        try {
                            resolve(session.request(headers, streamOptions));
                        } catch (error) {
                            reject(error);
                        }
                    }
                }
            ]);
        });
    }
    createConnection(origin, options) {
        return Agent.connect(origin, options);
    }
    static connect(origin, options) {
        options.ALPNProtocols = [
            'h2'
        ];
        const port = origin.port || 443;
        const host = origin.hostname || origin.host;
        if (typeof options.servername === 'undefined') {
            options.servername = host;
        }
        return tls.connect(port, host, options);
    }
    closeFreeSessions() {
        for (const sessions of Object.values(this.sessions)){
            for (const session of sessions){
                if (session[kCurrentStreamsCount] === 0) {
                    session.close();
                }
            }
        }
    }
    destroy(reason) {
        for (const sessions of Object.values(this.sessions)){
            for (const session of sessions){
                session.destroy(reason);
            }
        }
        for (const entriesOfAuthority of Object.values(this.queue)){
            for (const entry of Object.values(entriesOfAuthority)){
                entry.destroyed = true;
            }
        }
        // New requests should NOT attach to destroyed sessions
        this.queue = {};
    }
    get freeSessions() {
        return getSessions({
            agent: this,
            isFree: true
        });
    }
    get busySessions() {
        return getSessions({
            agent: this,
            isFree: false
        });
    }
}
Agent.kCurrentStreamsCount = kCurrentStreamsCount;
Agent.kGracefullyClosing = kGracefullyClosing;
module.exports = {
    Agent,
    globalAgent: new Agent()
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/incoming-message.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { Readable } = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
class IncomingMessage extends Readable {
    constructor(socket, highWaterMark){
        super({
            highWaterMark,
            autoDestroy: false
        });
        this.statusCode = null;
        this.statusMessage = '';
        this.httpVersion = '2.0';
        this.httpVersionMajor = 2;
        this.httpVersionMinor = 0;
        this.headers = {};
        this.trailers = {};
        this.req = null;
        this.aborted = false;
        this.complete = false;
        this.upgrade = null;
        this.rawHeaders = [];
        this.rawTrailers = [];
        this.socket = socket;
        this.connection = socket;
        this._dumped = false;
    }
    _destroy(error) {
        this.req._request.destroy(error);
    }
    setTimeout(ms, callback) {
        this.req.setTimeout(ms, callback);
        return this;
    }
    _dump() {
        if (!this._dumped) {
            this._dumped = true;
            this.removeAllListeners('data');
            this.resume();
        }
    }
    _read() {
        if (this.req) {
            this.req._request.resume();
        }
    }
}
module.exports = IncomingMessage;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/url-to-options.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* istanbul ignore file: https://github.com/nodejs/node/blob/a91293d4d9ab403046ab5eb022332e4e3d249bd3/lib/internal/url.js#L1257 */ module.exports = (url)=>{
    const options = {
        protocol: url.protocol,
        hostname: typeof url.hostname === 'string' && url.hostname.startsWith('[') ? url.hostname.slice(1, -1) : url.hostname,
        host: url.host,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        href: url.href,
        path: `${url.pathname || ''}${url.search || ''}`
    };
    if (typeof url.port === 'string' && url.port.length !== 0) {
        options.port = Number(url.port);
    }
    if (url.username || url.password) {
        options.auth = `${url.username || ''}:${url.password || ''}`;
    }
    return options;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/proxy-events.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = (from, to, events)=>{
    for (const event of events){
        from.on(event, (...args)=>to.emit(event, ...args));
    }
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/is-request-pseudo-header.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = (header)=>{
    switch(header){
        case ':method':
        case ':scheme':
        case ':authority':
        case ':path':
            return true;
        default:
            return false;
    }
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/errors.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* istanbul ignore file: https://github.com/nodejs/node/blob/master/lib/internal/errors.js */ const makeError = (Base, key, getMessage)=>{
    module.exports[key] = class NodeError extends Base {
        constructor(...args){
            super(typeof getMessage === 'string' ? getMessage : getMessage(args));
            this.name = `${super.name} [${key}]`;
            this.code = key;
        }
    };
};
makeError(TypeError, 'ERR_INVALID_ARG_TYPE', (args)=>{
    const type = args[0].includes('.') ? 'property' : 'argument';
    let valid = args[1];
    const isManyTypes = Array.isArray(valid);
    if (isManyTypes) {
        valid = `${valid.slice(0, -1).join(', ')} or ${valid.slice(-1)}`;
    }
    return `The "${args[0]}" ${type} must be ${isManyTypes ? 'one of' : 'of'} type ${valid}. Received ${typeof args[2]}`;
});
makeError(TypeError, 'ERR_INVALID_PROTOCOL', (args)=>{
    return `Protocol "${args[0]}" not supported. Expected "${args[1]}"`;
});
makeError(Error, 'ERR_HTTP_HEADERS_SENT', (args)=>{
    return `Cannot ${args[0]} headers after they are sent to the client`;
});
makeError(TypeError, 'ERR_INVALID_HTTP_TOKEN', (args)=>{
    return `${args[0]} must be a valid HTTP token [${args[1]}]`;
});
makeError(TypeError, 'ERR_HTTP_INVALID_HEADER_VALUE', (args)=>{
    return `Invalid value "${args[0]} for header "${args[1]}"`;
});
makeError(TypeError, 'ERR_INVALID_CHAR', (args)=>{
    return `Invalid character in ${args[0]} [${args[1]}]`;
});
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/client-request.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const http2 = __turbopack_context__.r("[externals]/http2 [external] (http2, cjs)");
const { Writable } = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const { Agent, globalAgent } = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/agent.js [app-ssr] (ecmascript)");
const IncomingMessage = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/incoming-message.js [app-ssr] (ecmascript)");
const urlToOptions = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/url-to-options.js [app-ssr] (ecmascript)");
const proxyEvents = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/proxy-events.js [app-ssr] (ecmascript)");
const isRequestPseudoHeader = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/is-request-pseudo-header.js [app-ssr] (ecmascript)");
const { ERR_INVALID_ARG_TYPE, ERR_INVALID_PROTOCOL, ERR_HTTP_HEADERS_SENT, ERR_INVALID_HTTP_TOKEN, ERR_HTTP_INVALID_HEADER_VALUE, ERR_INVALID_CHAR } = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/errors.js [app-ssr] (ecmascript)");
const { HTTP2_HEADER_STATUS, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_METHOD_CONNECT } = http2.constants;
const kHeaders = Symbol('headers');
const kOrigin = Symbol('origin');
const kSession = Symbol('session');
const kOptions = Symbol('options');
const kFlushedHeaders = Symbol('flushedHeaders');
const kJobs = Symbol('jobs');
const isValidHttpToken = /^[\^`\-\w!#$%&*+.|~]+$/;
const isInvalidHeaderValue = /[^\t\u0020-\u007E\u0080-\u00FF]/;
class ClientRequest extends Writable {
    constructor(input, options, callback){
        super({
            autoDestroy: false
        });
        const hasInput = typeof input === 'string' || input instanceof URL;
        if (hasInput) {
            input = urlToOptions(input instanceof URL ? input : new URL(input));
        }
        if (typeof options === 'function' || options === undefined) {
            // (options, callback)
            callback = options;
            options = hasInput ? input : {
                ...input
            };
        } else {
            // (input, options, callback)
            options = {
                ...input,
                ...options
            };
        }
        if (options.h2session) {
            this[kSession] = options.h2session;
        } else if (options.agent === false) {
            this.agent = new Agent({
                maxFreeSessions: 0
            });
        } else if (typeof options.agent === 'undefined' || options.agent === null) {
            if (typeof options.createConnection === 'function') {
                // This is a workaround - we don't have to create the session on our own.
                this.agent = new Agent({
                    maxFreeSessions: 0
                });
                this.agent.createConnection = options.createConnection;
            } else {
                this.agent = globalAgent;
            }
        } else if (typeof options.agent.request === 'function') {
            this.agent = options.agent;
        } else {
            throw new ERR_INVALID_ARG_TYPE('options.agent', [
                'Agent-like Object',
                'undefined',
                'false'
            ], options.agent);
        }
        if (options.protocol && options.protocol !== 'https:') {
            throw new ERR_INVALID_PROTOCOL(options.protocol, 'https:');
        }
        const port = options.port || options.defaultPort || this.agent && this.agent.defaultPort || 443;
        const host = options.hostname || options.host || 'localhost';
        // Don't enforce the origin via options. It may be changed in an Agent.
        delete options.hostname;
        delete options.host;
        delete options.port;
        const { timeout } = options;
        options.timeout = undefined;
        this[kHeaders] = Object.create(null);
        this[kJobs] = [];
        this.socket = null;
        this.connection = null;
        this.method = options.method || 'GET';
        this.path = options.path;
        this.res = null;
        this.aborted = false;
        this.reusedSocket = false;
        if (options.headers) {
            for (const [header, value] of Object.entries(options.headers)){
                this.setHeader(header, value);
            }
        }
        if (options.auth && !('authorization' in this[kHeaders])) {
            this[kHeaders].authorization = 'Basic ' + Buffer.from(options.auth).toString('base64');
        }
        options.session = options.tlsSession;
        options.path = options.socketPath;
        this[kOptions] = options;
        // Clients that generate HTTP/2 requests directly SHOULD use the :authority pseudo-header field instead of the Host header field.
        if (port === 443) {
            this[kOrigin] = `https://${host}`;
            if (!(':authority' in this[kHeaders])) {
                this[kHeaders][':authority'] = host;
            }
        } else {
            this[kOrigin] = `https://${host}:${port}`;
            if (!(':authority' in this[kHeaders])) {
                this[kHeaders][':authority'] = `${host}:${port}`;
            }
        }
        if (timeout) {
            this.setTimeout(timeout);
        }
        if (callback) {
            this.once('response', callback);
        }
        this[kFlushedHeaders] = false;
    }
    get method() {
        return this[kHeaders][HTTP2_HEADER_METHOD];
    }
    set method(value) {
        if (value) {
            this[kHeaders][HTTP2_HEADER_METHOD] = value.toUpperCase();
        }
    }
    get path() {
        return this[kHeaders][HTTP2_HEADER_PATH];
    }
    set path(value) {
        if (value) {
            this[kHeaders][HTTP2_HEADER_PATH] = value;
        }
    }
    get _mustNotHaveABody() {
        return this.method === 'GET' || this.method === 'HEAD' || this.method === 'DELETE';
    }
    _write(chunk, encoding, callback) {
        // https://github.com/nodejs/node/blob/654df09ae0c5e17d1b52a900a545f0664d8c7627/lib/internal/http2/util.js#L148-L156
        if (this._mustNotHaveABody) {
            callback(new Error('The GET, HEAD and DELETE methods must NOT have a body'));
            /* istanbul ignore next: Node.js 12 throws directly */ return;
        }
        this.flushHeaders();
        const callWrite = ()=>this._request.write(chunk, encoding, callback);
        if (this._request) {
            callWrite();
        } else {
            this[kJobs].push(callWrite);
        }
    }
    _final(callback) {
        if (this.destroyed) {
            return;
        }
        this.flushHeaders();
        const callEnd = ()=>{
            // For GET, HEAD and DELETE
            if (this._mustNotHaveABody) {
                callback();
                return;
            }
            this._request.end(callback);
        };
        if (this._request) {
            callEnd();
        } else {
            this[kJobs].push(callEnd);
        }
    }
    abort() {
        if (this.res && this.res.complete) {
            return;
        }
        if (!this.aborted) {
            process.nextTick(()=>this.emit('abort'));
        }
        this.aborted = true;
        this.destroy();
    }
    _destroy(error, callback) {
        if (this.res) {
            this.res._dump();
        }
        if (this._request) {
            this._request.destroy();
        }
        callback(error);
    }
    async flushHeaders() {
        if (this[kFlushedHeaders] || this.destroyed) {
            return;
        }
        this[kFlushedHeaders] = true;
        const isConnectMethod = this.method === HTTP2_METHOD_CONNECT;
        // The real magic is here
        const onStream = (stream)=>{
            this._request = stream;
            if (this.destroyed) {
                stream.destroy();
                return;
            }
            // Forwards `timeout`, `continue`, `close` and `error` events to this instance.
            if (!isConnectMethod) {
                proxyEvents(stream, this, [
                    'timeout',
                    'continue',
                    'close',
                    'error'
                ]);
            }
            // Wait for the `finish` event. We don't want to emit the `response` event
            // before `request.end()` is called.
            const waitForEnd = (fn)=>{
                return (...args)=>{
                    if (!this.writable && !this.destroyed) {
                        fn(...args);
                    } else {
                        this.once('finish', ()=>{
                            fn(...args);
                        });
                    }
                };
            };
            // This event tells we are ready to listen for the data.
            stream.once('response', waitForEnd((headers, flags, rawHeaders)=>{
                // If we were to emit raw request stream, it would be as fast as the native approach.
                // Note that wrapping the raw stream in a Proxy instance won't improve the performance (already tested it).
                const response = new IncomingMessage(this.socket, stream.readableHighWaterMark);
                this.res = response;
                response.req = this;
                response.statusCode = headers[HTTP2_HEADER_STATUS];
                response.headers = headers;
                response.rawHeaders = rawHeaders;
                response.once('end', ()=>{
                    if (this.aborted) {
                        response.aborted = true;
                        response.emit('aborted');
                    } else {
                        response.complete = true;
                        // Has no effect, just be consistent with the Node.js behavior
                        response.socket = null;
                        response.connection = null;
                    }
                });
                if (isConnectMethod) {
                    response.upgrade = true;
                    // The HTTP1 API says the socket is detached here,
                    // but we can't do that so we pass the original HTTP2 request.
                    if (this.emit('connect', response, stream, Buffer.alloc(0))) {
                        this.emit('close');
                    } else {
                        // No listeners attached, destroy the original request.
                        stream.destroy();
                    }
                } else {
                    // Forwards data
                    stream.on('data', (chunk)=>{
                        if (!response._dumped && !response.push(chunk)) {
                            stream.pause();
                        }
                    });
                    stream.once('end', ()=>{
                        response.push(null);
                    });
                    if (!this.emit('response', response)) {
                        // No listeners attached, dump the response.
                        response._dump();
                    }
                }
            }));
            // Emits `information` event
            stream.once('headers', waitForEnd((headers)=>this.emit('information', {
                    statusCode: headers[HTTP2_HEADER_STATUS]
                })));
            stream.once('trailers', waitForEnd((trailers, flags, rawTrailers)=>{
                const { res } = this;
                // Assigns trailers to the response object.
                res.trailers = trailers;
                res.rawTrailers = rawTrailers;
            }));
            const { socket } = stream.session;
            this.socket = socket;
            this.connection = socket;
            for (const job of this[kJobs]){
                job();
            }
            this.emit('socket', this.socket);
        };
        // Makes a HTTP2 request
        if (this[kSession]) {
            try {
                onStream(this[kSession].request(this[kHeaders]));
            } catch (error) {
                this.emit('error', error);
            }
        } else {
            this.reusedSocket = true;
            try {
                onStream(await this.agent.request(this[kOrigin], this[kOptions], this[kHeaders]));
            } catch (error) {
                this.emit('error', error);
            }
        }
    }
    getHeader(name) {
        if (typeof name !== 'string') {
            throw new ERR_INVALID_ARG_TYPE('name', 'string', name);
        }
        return this[kHeaders][name.toLowerCase()];
    }
    get headersSent() {
        return this[kFlushedHeaders];
    }
    removeHeader(name) {
        if (typeof name !== 'string') {
            throw new ERR_INVALID_ARG_TYPE('name', 'string', name);
        }
        if (this.headersSent) {
            throw new ERR_HTTP_HEADERS_SENT('remove');
        }
        delete this[kHeaders][name.toLowerCase()];
    }
    setHeader(name, value) {
        if (this.headersSent) {
            throw new ERR_HTTP_HEADERS_SENT('set');
        }
        if (typeof name !== 'string' || !isValidHttpToken.test(name) && !isRequestPseudoHeader(name)) {
            throw new ERR_INVALID_HTTP_TOKEN('Header name', name);
        }
        if (typeof value === 'undefined') {
            throw new ERR_HTTP_INVALID_HEADER_VALUE(value, name);
        }
        if (isInvalidHeaderValue.test(value)) {
            throw new ERR_INVALID_CHAR('header content', name);
        }
        this[kHeaders][name.toLowerCase()] = value;
    }
    setNoDelay() {
    // HTTP2 sockets cannot be malformed, do nothing.
    }
    setSocketKeepAlive() {
    // HTTP2 sockets cannot be malformed, do nothing.
    }
    setTimeout(ms, callback) {
        const applyTimeout = ()=>this._request.setTimeout(ms, callback);
        if (this._request) {
            applyTimeout();
        } else {
            this[kJobs].push(applyTimeout);
        }
        return this;
    }
    get maxHeadersCount() {
        if (!this.destroyed && this._request) {
            return this._request.session.localSettings.maxHeaderListSize;
        }
        return undefined;
    }
    set maxHeadersCount(_value) {
    // Updating HTTP2 settings would affect all requests, do nothing.
    }
}
module.exports = ClientRequest;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/calculate-server-name.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const net = __turbopack_context__.r("[externals]/net [external] (net, cjs)");
/* istanbul ignore file: https://github.com/nodejs/node/blob/v13.0.1/lib/_http_agent.js */ module.exports = (options)=>{
    let servername = options.host;
    const hostHeader = options.headers && options.headers.host;
    if (hostHeader) {
        if (hostHeader.startsWith('[')) {
            const index = hostHeader.indexOf(']');
            if (index === -1) {
                servername = hostHeader;
            } else {
                servername = hostHeader.slice(1, -1);
            }
        } else {
            servername = hostHeader.split(':', 1)[0];
        }
    }
    if (net.isIP(servername)) {
        return '';
    }
    return servername;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/auto.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
const https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
const resolveALPN = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/resolve-alpn/index.js [app-ssr] (ecmascript)");
const QuickLRU = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/quick-lru/index.js [app-ssr] (ecmascript)");
const Http2ClientRequest = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/client-request.js [app-ssr] (ecmascript)");
const calculateServerName = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/calculate-server-name.js [app-ssr] (ecmascript)");
const urlToOptions = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/utils/url-to-options.js [app-ssr] (ecmascript)");
const cache = new QuickLRU({
    maxSize: 100
});
const queue = new Map();
const installSocket = (agent, socket, options)=>{
    socket._httpMessage = {
        shouldKeepAlive: true
    };
    const onFree = ()=>{
        agent.emit('free', socket, options);
    };
    socket.on('free', onFree);
    const onClose = ()=>{
        agent.removeSocket(socket, options);
    };
    socket.on('close', onClose);
    const onRemove = ()=>{
        agent.removeSocket(socket, options);
        socket.off('close', onClose);
        socket.off('free', onFree);
        socket.off('agentRemove', onRemove);
    };
    socket.on('agentRemove', onRemove);
    agent.emit('free', socket, options);
};
const resolveProtocol = async (options)=>{
    const name = `${options.host}:${options.port}:${options.ALPNProtocols.sort()}`;
    if (!cache.has(name)) {
        if (queue.has(name)) {
            const result = await queue.get(name);
            return result.alpnProtocol;
        }
        const { path, agent } = options;
        options.path = options.socketPath;
        const resultPromise = resolveALPN(options);
        queue.set(name, resultPromise);
        try {
            const { socket, alpnProtocol } = await resultPromise;
            cache.set(name, alpnProtocol);
            options.path = path;
            if (alpnProtocol === 'h2') {
                // https://github.com/nodejs/node/issues/33343
                socket.destroy();
            } else {
                const { globalAgent } = https;
                const defaultCreateConnection = https.Agent.prototype.createConnection;
                if (agent) {
                    if (agent.createConnection === defaultCreateConnection) {
                        installSocket(agent, socket, options);
                    } else {
                        socket.destroy();
                    }
                } else if (globalAgent.createConnection === defaultCreateConnection) {
                    installSocket(globalAgent, socket, options);
                } else {
                    socket.destroy();
                }
            }
            queue.delete(name);
            return alpnProtocol;
        } catch (error) {
            queue.delete(name);
            throw error;
        }
    }
    return cache.get(name);
};
module.exports = async (input, options, callback)=>{
    if (typeof input === 'string' || input instanceof URL) {
        input = urlToOptions(new URL(input));
    }
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    options = {
        ALPNProtocols: [
            'h2',
            'http/1.1'
        ],
        ...input,
        ...options,
        resolveSocket: true
    };
    if (!Array.isArray(options.ALPNProtocols) || options.ALPNProtocols.length === 0) {
        throw new Error('The `ALPNProtocols` option must be an Array with at least one entry');
    }
    options.protocol = options.protocol || 'https:';
    const isHttps = options.protocol === 'https:';
    options.host = options.hostname || options.host || 'localhost';
    options.session = options.tlsSession;
    options.servername = options.servername || calculateServerName(options);
    options.port = options.port || (isHttps ? 443 : 80);
    options._defaultAgent = isHttps ? https.globalAgent : http.globalAgent;
    const agents = options.agent;
    if (agents) {
        if (agents.addRequest) {
            throw new Error('The `options.agent` object can contain only `http`, `https` or `http2` properties');
        }
        options.agent = agents[isHttps ? 'https' : 'http'];
    }
    if (isHttps) {
        const protocol = await resolveProtocol(options);
        if (protocol === 'h2') {
            if (agents) {
                options.agent = agents.http2;
            }
            return new Http2ClientRequest(options, callback);
        }
    }
    return http.request(options, callback);
};
module.exports.protocolCache = cache;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const http2 = __turbopack_context__.r("[externals]/http2 [external] (http2, cjs)");
const agent = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/agent.js [app-ssr] (ecmascript)");
const ClientRequest = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/client-request.js [app-ssr] (ecmascript)");
const IncomingMessage = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/incoming-message.js [app-ssr] (ecmascript)");
const auto = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/http2-wrapper/source/auto.js [app-ssr] (ecmascript)");
const request = (url, options, callback)=>{
    return new ClientRequest(url, options, callback);
};
const get = (url, options, callback)=>{
    // eslint-disable-next-line unicorn/prevent-abbreviations
    const req = new ClientRequest(url, options, callback);
    req.end();
    return req;
};
module.exports = {
    ...http2,
    ClientRequest,
    IncomingMessage,
    ...agent,
    request,
    get,
    auto
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/resolve-alpn/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const tls = __turbopack_context__.r("[externals]/tls [external] (tls, cjs)");
module.exports = (options = {}, connect = tls.connect)=>new Promise((resolve, reject)=>{
        let timeout = false;
        let socket;
        const callback = async ()=>{
            await socketPromise;
            socket.off('timeout', onTimeout);
            socket.off('error', reject);
            if (options.resolveSocket) {
                resolve({
                    alpnProtocol: socket.alpnProtocol,
                    socket,
                    timeout
                });
                if (timeout) {
                    await Promise.resolve();
                    socket.emit('timeout');
                }
            } else {
                socket.destroy();
                resolve({
                    alpnProtocol: socket.alpnProtocol,
                    timeout
                });
            }
        };
        const onTimeout = async ()=>{
            timeout = true;
            callback();
        };
        const socketPromise = (async ()=>{
            try {
                socket = await connect(options, callback);
                socket.on('error', reject);
                socket.once('timeout', onTimeout);
            } catch (error) {
                reject(error);
            }
        })();
    });
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/p-cancelable/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class CancelError extends Error {
    constructor(reason){
        super(reason || 'Promise was canceled');
        this.name = 'CancelError';
    }
    get isCanceled() {
        return true;
    }
}
class PCancelable {
    static fn(userFn) {
        return (...arguments_)=>{
            return new PCancelable((resolve, reject, onCancel)=>{
                arguments_.push(onCancel);
                // eslint-disable-next-line promise/prefer-await-to-then
                userFn(...arguments_).then(resolve, reject);
            });
        };
    }
    constructor(executor){
        this._cancelHandlers = [];
        this._isPending = true;
        this._isCanceled = false;
        this._rejectOnCancel = true;
        this._promise = new Promise((resolve, reject)=>{
            this._reject = reject;
            const onResolve = (value)=>{
                if (!this._isCanceled || !onCancel.shouldReject) {
                    this._isPending = false;
                    resolve(value);
                }
            };
            const onReject = (error)=>{
                this._isPending = false;
                reject(error);
            };
            const onCancel = (handler)=>{
                if (!this._isPending) {
                    throw new Error('The `onCancel` handler was attached after the promise settled.');
                }
                this._cancelHandlers.push(handler);
            };
            Object.defineProperties(onCancel, {
                shouldReject: {
                    get: ()=>this._rejectOnCancel,
                    set: (boolean)=>{
                        this._rejectOnCancel = boolean;
                    }
                }
            });
            return executor(onResolve, onReject, onCancel);
        });
    }
    then(onFulfilled, onRejected) {
        // eslint-disable-next-line promise/prefer-await-to-then
        return this._promise.then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return this._promise.catch(onRejected);
    }
    finally(onFinally) {
        return this._promise.finally(onFinally);
    }
    cancel(reason) {
        if (!this._isPending || this._isCanceled) {
            return;
        }
        this._isCanceled = true;
        if (this._cancelHandlers.length > 0) {
            try {
                for (const handler of this._cancelHandlers){
                    handler();
                }
            } catch (error) {
                this._reject(error);
                return;
            }
        }
        if (this._rejectOnCancel) {
            this._reject(new CancelError(reason));
        }
    }
    get isCanceled() {
        return this._isCanceled;
    }
}
Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);
module.exports = PCancelable;
module.exports.CancelError = CancelError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/delayed-stream/lib/delayed_stream.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Stream;
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
module.exports = DelayedStream;
function DelayedStream() {
    this.source = null;
    this.dataSize = 0;
    this.maxDataSize = 1024 * 1024;
    this.pauseStream = true;
    this._maxDataSizeExceeded = false;
    this._released = false;
    this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);
DelayedStream.create = function(source, options) {
    var delayedStream = new this();
    options = options || {};
    for(var option in options){
        delayedStream[option] = options[option];
    }
    delayedStream.source = source;
    var realEmit = source.emit;
    source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
    };
    source.on('error', function() {});
    if (delayedStream.pauseStream) {
        source.pause();
    }
    return delayedStream;
};
Object.defineProperty(DelayedStream.prototype, 'readable', {
    configurable: true,
    enumerable: true,
    get: function() {
        return this.source.readable;
    }
});
DelayedStream.prototype.setEncoding = function() {
    return this.source.setEncoding.apply(this.source, arguments);
};
DelayedStream.prototype.resume = function() {
    if (!this._released) {
        this.release();
    }
    this.source.resume();
};
DelayedStream.prototype.pause = function() {
    this.source.pause();
};
DelayedStream.prototype.release = function() {
    this._released = true;
    this._bufferedEvents.forEach((function(args) {
        this.emit.apply(this, args);
    }).bind(this));
    this._bufferedEvents = [];
};
DelayedStream.prototype.pipe = function() {
    var r = Stream.prototype.pipe.apply(this, arguments);
    this.resume();
    return r;
};
DelayedStream.prototype._handleEmit = function(args) {
    if (this._released) {
        this.emit.apply(this, args);
        return;
    }
    if (args[0] === 'data') {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
    }
    this._bufferedEvents.push(args);
};
DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
    if (this._maxDataSizeExceeded) {
        return;
    }
    if (this.dataSize <= this.maxDataSize) {
        return;
    }
    this._maxDataSizeExceeded = true;
    var message = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
    this.emit('error', new Error(message));
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/combined-stream/lib/combined_stream.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Stream;
var DelayedStream = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/delayed-stream/lib/delayed_stream.js [app-ssr] (ecmascript)");
module.exports = CombinedStream;
function CombinedStream() {
    this.writable = false;
    this.readable = true;
    this.dataSize = 0;
    this.maxDataSize = 2 * 1024 * 1024;
    this.pauseStreams = true;
    this._released = false;
    this._streams = [];
    this._currentStream = null;
    this._insideLoop = false;
    this._pendingNext = false;
}
util.inherits(CombinedStream, Stream);
CombinedStream.create = function(options) {
    var combinedStream = new this();
    options = options || {};
    for(var option in options){
        combinedStream[option] = options[option];
    }
    return combinedStream;
};
CombinedStream.isStreamLike = function(stream) {
    return typeof stream !== 'function' && typeof stream !== 'string' && typeof stream !== 'boolean' && typeof stream !== 'number' && !Buffer.isBuffer(stream);
};
CombinedStream.prototype.append = function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
            var newStream = DelayedStream.create(stream, {
                maxDataSize: Infinity,
                pauseStream: this.pauseStreams
            });
            stream.on('data', this._checkDataSize.bind(this));
            stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
            stream.pause();
        }
    }
    this._streams.push(stream);
    return this;
};
CombinedStream.prototype.pipe = function(dest, options) {
    Stream.prototype.pipe.call(this, dest, options);
    this.resume();
    return dest;
};
CombinedStream.prototype._getNext = function() {
    this._currentStream = null;
    if (this._insideLoop) {
        this._pendingNext = true;
        return; // defer call
    }
    this._insideLoop = true;
    try {
        do {
            this._pendingNext = false;
            this._realGetNext();
        }while (this._pendingNext)
    } finally{
        this._insideLoop = false;
    }
};
CombinedStream.prototype._realGetNext = function() {
    var stream = this._streams.shift();
    if (typeof stream == 'undefined') {
        this.end();
        return;
    }
    if (typeof stream !== 'function') {
        this._pipeNext(stream);
        return;
    }
    var getStream = stream;
    getStream((function(stream) {
        var isStreamLike = CombinedStream.isStreamLike(stream);
        if (isStreamLike) {
            stream.on('data', this._checkDataSize.bind(this));
            this._handleErrors(stream);
        }
        this._pipeNext(stream);
    }).bind(this));
};
CombinedStream.prototype._pipeNext = function(stream) {
    this._currentStream = stream;
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
        stream.on('end', this._getNext.bind(this));
        stream.pipe(this, {
            end: false
        });
        return;
    }
    var value = stream;
    this.write(value);
    this._getNext();
};
CombinedStream.prototype._handleErrors = function(stream) {
    var self = this;
    stream.on('error', function(err) {
        self._emitError(err);
    });
};
CombinedStream.prototype.write = function(data) {
    this.emit('data', data);
};
CombinedStream.prototype.pause = function() {
    if (!this.pauseStreams) {
        return;
    }
    if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == 'function') this._currentStream.pause();
    this.emit('pause');
};
CombinedStream.prototype.resume = function() {
    if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
    }
    if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == 'function') this._currentStream.resume();
    this.emit('resume');
};
CombinedStream.prototype.end = function() {
    this._reset();
    this.emit('end');
};
CombinedStream.prototype.destroy = function() {
    this._reset();
    this.emit('close');
};
CombinedStream.prototype._reset = function() {
    this.writable = false;
    this._streams = [];
    this._currentStream = null;
};
CombinedStream.prototype._checkDataSize = function() {
    this._updateDataSize();
    if (this.dataSize <= this.maxDataSize) {
        return;
    }
    var message = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
    this._emitError(new Error(message));
};
CombinedStream.prototype._updateDataSize = function() {
    this.dataSize = 0;
    var self = this;
    this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
            return;
        }
        self.dataSize += stream.dataSize;
    });
    if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
    }
};
CombinedStream.prototype._emitError = function(err) {
    this._reset();
    this.emit('error', err);
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/mime-types/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module dependencies.
 * @private
 */ var db = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/mime-db/index.js [app-ssr] (ecmascript)");
var extname = __turbopack_context__.r("[externals]/path [external] (path, cjs)").extname;
/**
 * Module variables.
 * @private
 */ var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
var TEXT_TYPE_REGEXP = /^text\//i;
/**
 * Module exports.
 * @public
 */ exports.charset = charset;
exports.charsets = {
    lookup: charset
};
exports.contentType = contentType;
exports.extension = extension;
exports.extensions = Object.create(null);
exports.lookup = lookup;
exports.types = Object.create(null);
// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types);
/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */ function charset(type) {
    if (!type || typeof type !== 'string') {
        return false;
    }
    // TODO: use media-typer
    var match = EXTRACT_TYPE_REGEXP.exec(type);
    var mime = match && db[match[1].toLowerCase()];
    if (mime && mime.charset) {
        return mime.charset;
    }
    // default text/* to utf-8
    if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return 'UTF-8';
    }
    return false;
}
/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */ function contentType(str) {
    // TODO: should this even be in this module?
    if (!str || typeof str !== 'string') {
        return false;
    }
    var mime = str.indexOf('/') === -1 ? exports.lookup(str) : str;
    if (!mime) {
        return false;
    }
    // TODO: use content-type or other module
    if (mime.indexOf('charset') === -1) {
        var charset = exports.charset(mime);
        if (charset) mime += '; charset=' + charset.toLowerCase();
    }
    return mime;
}
/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */ function extension(type) {
    if (!type || typeof type !== 'string') {
        return false;
    }
    // TODO: use media-typer
    var match = EXTRACT_TYPE_REGEXP.exec(type);
    // get extensions
    var exts = match && exports.extensions[match[1].toLowerCase()];
    if (!exts || !exts.length) {
        return false;
    }
    return exts[0];
}
/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */ function lookup(path) {
    if (!path || typeof path !== 'string') {
        return false;
    }
    // get the extension ("ext" or ".ext" or full path)
    var extension = extname('x.' + path).toLowerCase().substr(1);
    if (!extension) {
        return false;
    }
    return exports.types[extension] || false;
}
/**
 * Populate the extensions and types maps.
 * @private
 */ function populateMaps(extensions, types) {
    // source preference (least -> most)
    var preference = [
        'nginx',
        'apache',
        undefined,
        'iana'
    ];
    Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
            return;
        }
        // mime -> extensions
        extensions[type] = exts;
        // extension -> mime
        for(var i = 0; i < exts.length; i++){
            var extension = exts[i];
            if (types[extension]) {
                var from = preference.indexOf(db[types[extension]].source);
                var to = preference.indexOf(mime.source);
                if (types[extension] !== 'application/octet-stream' && (from > to || from === to && types[extension].substr(0, 12) === 'application/')) {
                    continue;
                }
            }
            // set the extension -> mime
            types[extension] = type;
        }
    });
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/defer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = defer;
/**
 * Runs provided function on next iteration of the event loop
 *
 * @param {function} fn - function to run
 */ function defer(fn) {
    var nextTick = typeof setImmediate == 'function' ? setImmediate : typeof process == 'object' && typeof process.nextTick == 'function' ? process.nextTick : null;
    if (nextTick) {
        nextTick(fn);
    } else {
        setTimeout(fn, 0);
    }
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/async.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var defer = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/defer.js [app-ssr] (ecmascript)");
// API
module.exports = async;
/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */ function async(callback) {
    var isAsync = false;
    // check if async happened
    defer(function() {
        isAsync = true;
    });
    return function async_callback(err, result) {
        if (isAsync) {
            callback(err, result);
        } else {
            defer(function nextTick_callback() {
                callback(err, result);
            });
        }
    };
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/abort.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// API
module.exports = abort;
/**
 * Aborts leftover active jobs
 *
 * @param {object} state - current state object
 */ function abort(state) {
    Object.keys(state.jobs).forEach(clean.bind(state));
    // reset leftover jobs
    state.jobs = {};
}
/**
 * Cleans up leftover job by invoking abort function for the provided job id
 *
 * @this  state
 * @param {string|number} key - job id to abort
 */ function clean(key) {
    if (typeof this.jobs[key] == 'function') {
        this.jobs[key]();
    }
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/iterate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var async = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/async.js [app-ssr] (ecmascript)"), abort = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/abort.js [app-ssr] (ecmascript)");
// API
module.exports = iterate;
/**
 * Iterates over each job object
 *
 * @param {array|object} list - array or object (named list) to iterate over
 * @param {function} iterator - iterator to run
 * @param {object} state - current job status
 * @param {function} callback - invoked when all elements processed
 */ function iterate(list, iterator, state, callback) {
    // store current index
    var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;
    state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
        // don't repeat yourself
        // skip secondary callbacks
        if (!(key in state.jobs)) {
            return;
        }
        // clean up jobs
        delete state.jobs[key];
        if (error) {
            // don't process rest of the results
            // stop still active jobs
            // and reset the list
            abort(state);
        } else {
            state.results[key] = output;
        }
        // return salvaged results
        callback(error, state.results);
    });
}
/**
 * Runs iterator over provided job element
 *
 * @param   {function} iterator - iterator to invoke
 * @param   {string|number} key - key/index of the element in the list of jobs
 * @param   {mixed} item - job description
 * @param   {function} callback - invoked after iterator is done with the job
 * @returns {function|mixed} - job abort function or something else
 */ function runJob(iterator, key, item, callback) {
    var aborter;
    // allow shortcut if iterator expects only two arguments
    if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
    } else {
        aborter = iterator(item, key, async(callback));
    }
    return aborter;
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/state.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// API
module.exports = state;
/**
 * Creates initial state object
 * for iteration over list
 *
 * @param   {array|object} list - list to iterate over
 * @param   {function|null} sortMethod - function to use for keys sort,
 *                                     or `null` to keep them as is
 * @returns {object} - initial state object
 */ function state(list, sortMethod) {
    var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
    };
    if (sortMethod) {
        // sort array keys based on it's values
        // sort object's keys just on own merit
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
            return sortMethod(list[a], list[b]);
        });
    }
    return initState;
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/terminator.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var abort = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/abort.js [app-ssr] (ecmascript)"), async = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/async.js [app-ssr] (ecmascript)");
// API
module.exports = terminator;
/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */ function terminator(callback) {
    if (!Object.keys(this.jobs).length) {
        return;
    }
    // fast forward iteration index
    this.index = this.size;
    // abort jobs
    abort(this);
    // send back results we have so far
    async(callback)(null, this.results);
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/parallel.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var iterate = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/iterate.js [app-ssr] (ecmascript)"), initState = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/state.js [app-ssr] (ecmascript)"), terminator = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/terminator.js [app-ssr] (ecmascript)");
// Public API
module.exports = parallel;
/**
 * Runs iterator over provided array elements in parallel
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */ function parallel(list, iterator, callback) {
    var state = initState(list);
    while(state.index < (state['keyedList'] || list).length){
        iterate(list, iterator, state, function(error, result) {
            if (error) {
                callback(error, result);
                return;
            }
            // looks like it's the last one
            if (Object.keys(state.jobs).length === 0) {
                callback(null, state.results);
                return;
            }
        });
        state.index++;
    }
    return terminator.bind(state, callback);
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/serialOrdered.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var iterate = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/iterate.js [app-ssr] (ecmascript)"), initState = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/state.js [app-ssr] (ecmascript)"), terminator = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/lib/terminator.js [app-ssr] (ecmascript)");
// Public API
module.exports = serialOrdered;
// sorting helpers
module.exports.ascending = ascending;
module.exports.descending = descending;
/**
 * Runs iterator over provided sorted array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */ function serialOrdered(list, iterator, sortMethod, callback) {
    var state = initState(list, sortMethod);
    iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
            callback(error, result);
            return;
        }
        state.index++;
        // are we there yet?
        if (state.index < (state['keyedList'] || list).length) {
            iterate(list, iterator, state, iteratorHandler);
            return;
        }
        // done here
        callback(null, state.results);
    });
    return terminator.bind(state, callback);
}
/*
 * -- Sort methods
 */ /**
 * sort helper to sort array elements in ascending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */ function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
/**
 * sort helper to sort array elements in descending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */ function descending(a, b) {
    return -1 * ascending(a, b);
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/serial.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var serialOrdered = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/serialOrdered.js [app-ssr] (ecmascript)");
// Public API
module.exports = serial;
/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */ function serial(list, iterator, callback) {
    return serialOrdered(list, iterator, null, callback);
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    parallel: __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/parallel.js [app-ssr] (ecmascript)"),
    serial: __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/serial.js [app-ssr] (ecmascript)"),
    serialOrdered: __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/serialOrdered.js [app-ssr] (ecmascript)")
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-object-atoms/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ module.exports = Object;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ module.exports = Error;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/eval.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./eval')} */ module.exports = EvalError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/range.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./range')} */ module.exports = RangeError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/ref.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./ref')} */ module.exports = ReferenceError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/syntax.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./syntax')} */ module.exports = SyntaxError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/type.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./type')} */ module.exports = TypeError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/uri.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./uri')} */ module.exports = URIError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/abs.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./abs')} */ module.exports = Math.abs;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/floor.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./floor')} */ module.exports = Math.floor;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/max.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./max')} */ module.exports = Math.max;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/min.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./min')} */ module.exports = Math.min;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/pow.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./pow')} */ module.exports = Math.pow;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/round.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./round')} */ module.exports = Math.round;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/isNaN.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./isNaN')} */ module.exports = Number.isNaN || function isNaN(a) {
    return a !== a;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/sign.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $isNaN = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/isNaN.js [app-ssr] (ecmascript)");
/** @type {import('./sign')} */ module.exports = function sign(number) {
    if ($isNaN(number) || number === 0) {
        return number;
    }
    return number < 0 ? -1 : +1;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/gopd/gOPD.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./gOPD')} */ module.exports = Object.getOwnPropertyDescriptor;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/gopd/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ var $gOPD = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/gopd/gOPD.js [app-ssr] (ecmascript)");
if ($gOPD) {
    try {
        $gOPD([], 'length');
    } catch (e) {
        // IE 8 has a broken gOPD
        $gOPD = null;
    }
}
module.exports = $gOPD;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-define-property/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
    try {
        $defineProperty({}, 'a', {
            value: 1
        });
    } catch (e) {
        // IE 8 has a broken defineProperty
        $defineProperty = false;
    }
}
module.exports = $defineProperty;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/has-symbols/shams.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./shams')} */ /* eslint complexity: [2, 18], max-statements: [2, 33] */ module.exports = function hasSymbols() {
    if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
        return false;
    }
    if (typeof Symbol.iterator === 'symbol') {
        return true;
    }
    /** @type {{ [k in symbol]?: unknown }} */ var obj = {};
    var sym = Symbol('test');
    var symObj = Object(sym);
    if (typeof sym === 'string') {
        return false;
    }
    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
        return false;
    }
    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
        return false;
    }
    // temp disabled per https://github.com/ljharb/object.assign/issues/17
    // if (sym instanceof Symbol) { return false; }
    // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
    // if (!(symObj instanceof Symbol)) { return false; }
    // if (typeof Symbol.prototype.toString !== 'function') { return false; }
    // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
    var symVal = 42;
    obj[sym] = symVal;
    for(var _ in obj){
        return false;
    } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
    if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
        return false;
    }
    if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
        return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === 'function') {
        // eslint-disable-next-line no-extra-parens
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
        }
    }
    return true;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/has-symbols/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/has-symbols/shams.js [app-ssr] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== 'function') {
        return false;
    }
    if (typeof Symbol !== 'function') {
        return false;
    }
    if (typeof origSymbol('foo') !== 'symbol') {
        return false;
    }
    if (typeof Symbol('bar') !== 'symbol') {
        return false;
    }
    return hasSymbolSham();
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/Reflect.getPrototypeOf.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./Reflect.getPrototypeOf')} */ module.exports = typeof Reflect !== 'undefined' && Reflect.getPrototypeOf || null;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/Object.getPrototypeOf.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $Object = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-object-atoms/index.js [app-ssr] (ecmascript)");
/** @type {import('./Object.getPrototypeOf')} */ module.exports = $Object.getPrototypeOf || null;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var reflectGetProto = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/Reflect.getPrototypeOf.js [app-ssr] (ecmascript)");
var originalGetProto = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/Object.getPrototypeOf.js [app-ssr] (ecmascript)");
var getDunderProto = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/dunder-proto/get.js [app-ssr] (ecmascript)");
/** @type {import('.')} */ module.exports = reflectGetProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return reflectGetProto(O);
} : originalGetProto ? function getProto(O) {
    if (!O || typeof O !== 'object' && typeof O !== 'function') {
        throw new TypeError('getProto: not an object');
    }
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return originalGetProto(O);
} : getDunderProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return getDunderProto(O);
} : null;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/function-bind/implementation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint no-invalid-this: 1 */ var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';
var concatty = function concatty(a, b) {
    var arr = [];
    for(var i = 0; i < a.length; i += 1){
        arr[i] = a[i];
    }
    for(var j = 0; j < b.length; j += 1){
        arr[j + a.length] = b[j];
    }
    return arr;
};
var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for(var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1){
        arr[j] = arrLike[i];
    }
    return arr;
};
var joiny = function(arr, joiner) {
    var str = '';
    for(var i = 0; i < arr.length; i += 1){
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};
module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
        if (this instanceof bound) {
            var result = target.apply(this, concatty(args, arguments));
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for(var i = 0; i < boundLength; i++){
        boundArgs[i] = '$' + i;
    }
    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/function-bind/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var implementation = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/function-bind/implementation.js [app-ssr] (ecmascript)");
module.exports = Function.prototype.bind || implementation;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/functionCall.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./functionCall')} */ module.exports = Function.prototype.call;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/functionApply.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./functionApply')} */ module.exports = Function.prototype.apply;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/reflectApply.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./reflectApply')} */ module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/actualApply.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/function-bind/index.js [app-ssr] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/functionApply.js [app-ssr] (ecmascript)");
var $call = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/functionCall.js [app-ssr] (ecmascript)");
var $reflectApply = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/reflectApply.js [app-ssr] (ecmascript)");
/** @type {import('./actualApply')} */ module.exports = $reflectApply || bind.call($call, $apply);
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/function-bind/index.js [app-ssr] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/type.js [app-ssr] (ecmascript)");
var $call = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/functionCall.js [app-ssr] (ecmascript)");
var $actualApply = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/actualApply.js [app-ssr] (ecmascript)");
/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */ module.exports = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== 'function') {
        throw new $TypeError('a function is required');
    }
    return $actualApply(bind, $call, args);
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/dunder-proto/get.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var callBind = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/index.js [app-ssr] (ecmascript)");
var gOPD = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/gopd/index.js [app-ssr] (ecmascript)");
var hasProtoAccessor;
try {
    // eslint-disable-next-line no-extra-parens, no-proto
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ [].__proto__ === Array.prototype;
} catch (e) {
    if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
        throw e;
    }
}
// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, '__proto__');
var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;
/** @type {import('./get')} */ module.exports = desc && typeof desc.get === 'function' ? callBind([
    desc.get
]) : typeof $getPrototypeOf === 'function' ? /** @type {import('./get')} */ function getDunder(value) {
    // eslint-disable-next-line eqeqeq
    return $getPrototypeOf(value == null ? value : $Object(value));
} : false;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/hasown/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/function-bind/index.js [app-ssr] (ecmascript)");
/** @type {import('.')} */ module.exports = bind.call(call, $hasOwn);
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-intrinsic/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var undefined1;
var $Object = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-object-atoms/index.js [app-ssr] (ecmascript)");
var $Error = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/index.js [app-ssr] (ecmascript)");
var $EvalError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/eval.js [app-ssr] (ecmascript)");
var $RangeError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/range.js [app-ssr] (ecmascript)");
var $ReferenceError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/ref.js [app-ssr] (ecmascript)");
var $SyntaxError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/syntax.js [app-ssr] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/type.js [app-ssr] (ecmascript)");
var $URIError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/uri.js [app-ssr] (ecmascript)");
var abs = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/abs.js [app-ssr] (ecmascript)");
var floor = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/floor.js [app-ssr] (ecmascript)");
var max = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/max.js [app-ssr] (ecmascript)");
var min = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/min.js [app-ssr] (ecmascript)");
var pow = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/pow.js [app-ssr] (ecmascript)");
var round = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/round.js [app-ssr] (ecmascript)");
var sign = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/math-intrinsics/sign.js [app-ssr] (ecmascript)");
var $Function = Function;
// eslint-disable-next-line consistent-return
var getEvalledConstructor = function(expressionSyntax) {
    try {
        return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
    } catch (e) {}
};
var $gOPD = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/gopd/index.js [app-ssr] (ecmascript)");
var $defineProperty = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-define-property/index.js [app-ssr] (ecmascript)");
var throwTypeError = function() {
    throw new $TypeError();
};
var ThrowTypeError = $gOPD ? function() {
    try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
        arguments.callee; // IE 8 does not throw here
        return throwTypeError;
    } catch (calleeThrows) {
        try {
            // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
            return $gOPD(arguments, 'callee').get;
        } catch (gOPDthrows) {
            return throwTypeError;
        }
    }
}() : throwTypeError;
var hasSymbols = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/has-symbols/index.js [app-ssr] (ecmascript)")();
var getProto = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/index.js [app-ssr] (ecmascript)");
var $ObjectGPO = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/Object.getPrototypeOf.js [app-ssr] (ecmascript)");
var $ReflectGPO = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-proto/Reflect.getPrototypeOf.js [app-ssr] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/functionApply.js [app-ssr] (ecmascript)");
var $call = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/call-bind-apply-helpers/functionCall.js [app-ssr] (ecmascript)");
var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);
var INTRINSICS = {
    __proto__: null,
    '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
    '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
    '%AsyncFromSyncIteratorPrototype%': undefined,
    '%AsyncFunction%': needsEval,
    '%AsyncGenerator%': needsEval,
    '%AsyncGeneratorFunction%': needsEval,
    '%AsyncIteratorPrototype%': needsEval,
    '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
    '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
    '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
    '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
    '%Boolean%': Boolean,
    '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
    '%Date%': Date,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': $Error,
    '%eval%': eval,
    '%EvalError%': $EvalError,
    '%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
    '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
    '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
    '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
    '%Function%': $Function,
    '%GeneratorFunction%': needsEval,
    '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
    '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
    '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
    '%JSON%': typeof JSON === 'object' ? JSON : undefined,
    '%Map%': typeof Map === 'undefined' ? undefined : Map,
    '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
    '%Math%': Math,
    '%Number%': Number,
    '%Object%': $Object,
    '%Object.getOwnPropertyDescriptor%': $gOPD,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
    '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
    '%RangeError%': $RangeError,
    '%ReferenceError%': $ReferenceError,
    '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
    '%RegExp%': RegExp,
    '%Set%': typeof Set === 'undefined' ? undefined : Set,
    '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
    '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
    '%String%': String,
    '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
    '%Symbol%': hasSymbols ? Symbol : undefined,
    '%SyntaxError%': $SyntaxError,
    '%ThrowTypeError%': ThrowTypeError,
    '%TypedArray%': TypedArray,
    '%TypeError%': $TypeError,
    '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
    '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
    '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
    '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
    '%URIError%': $URIError,
    '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
    '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
    '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
    '%Function.prototype.call%': $call,
    '%Function.prototype.apply%': $apply,
    '%Object.defineProperty%': $defineProperty,
    '%Object.getPrototypeOf%': $ObjectGPO,
    '%Math.abs%': abs,
    '%Math.floor%': floor,
    '%Math.max%': max,
    '%Math.min%': min,
    '%Math.pow%': pow,
    '%Math.round%': round,
    '%Math.sign%': sign,
    '%Reflect.getPrototypeOf%': $ReflectGPO
};
if (getProto) {
    try {
        null.error; // eslint-disable-line no-unused-expressions
    } catch (e) {
        // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
        var errorProto = getProto(getProto(e));
        INTRINSICS['%Error.prototype%'] = errorProto;
    }
}
var doEval = function doEval(name) {
    var value;
    if (name === '%AsyncFunction%') {
        value = getEvalledConstructor('async function () {}');
    } else if (name === '%GeneratorFunction%') {
        value = getEvalledConstructor('function* () {}');
    } else if (name === '%AsyncGeneratorFunction%') {
        value = getEvalledConstructor('async function* () {}');
    } else if (name === '%AsyncGenerator%') {
        var fn = doEval('%AsyncGeneratorFunction%');
        if (fn) {
            value = fn.prototype;
        }
    } else if (name === '%AsyncIteratorPrototype%') {
        var gen = doEval('%AsyncGenerator%');
        if (gen && getProto) {
            value = getProto(gen.prototype);
        }
    }
    INTRINSICS[name] = value;
    return value;
};
var LEGACY_ALIASES = {
    __proto__: null,
    '%ArrayBufferPrototype%': [
        'ArrayBuffer',
        'prototype'
    ],
    '%ArrayPrototype%': [
        'Array',
        'prototype'
    ],
    '%ArrayProto_entries%': [
        'Array',
        'prototype',
        'entries'
    ],
    '%ArrayProto_forEach%': [
        'Array',
        'prototype',
        'forEach'
    ],
    '%ArrayProto_keys%': [
        'Array',
        'prototype',
        'keys'
    ],
    '%ArrayProto_values%': [
        'Array',
        'prototype',
        'values'
    ],
    '%AsyncFunctionPrototype%': [
        'AsyncFunction',
        'prototype'
    ],
    '%AsyncGenerator%': [
        'AsyncGeneratorFunction',
        'prototype'
    ],
    '%AsyncGeneratorPrototype%': [
        'AsyncGeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%BooleanPrototype%': [
        'Boolean',
        'prototype'
    ],
    '%DataViewPrototype%': [
        'DataView',
        'prototype'
    ],
    '%DatePrototype%': [
        'Date',
        'prototype'
    ],
    '%ErrorPrototype%': [
        'Error',
        'prototype'
    ],
    '%EvalErrorPrototype%': [
        'EvalError',
        'prototype'
    ],
    '%Float32ArrayPrototype%': [
        'Float32Array',
        'prototype'
    ],
    '%Float64ArrayPrototype%': [
        'Float64Array',
        'prototype'
    ],
    '%FunctionPrototype%': [
        'Function',
        'prototype'
    ],
    '%Generator%': [
        'GeneratorFunction',
        'prototype'
    ],
    '%GeneratorPrototype%': [
        'GeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%Int8ArrayPrototype%': [
        'Int8Array',
        'prototype'
    ],
    '%Int16ArrayPrototype%': [
        'Int16Array',
        'prototype'
    ],
    '%Int32ArrayPrototype%': [
        'Int32Array',
        'prototype'
    ],
    '%JSONParse%': [
        'JSON',
        'parse'
    ],
    '%JSONStringify%': [
        'JSON',
        'stringify'
    ],
    '%MapPrototype%': [
        'Map',
        'prototype'
    ],
    '%NumberPrototype%': [
        'Number',
        'prototype'
    ],
    '%ObjectPrototype%': [
        'Object',
        'prototype'
    ],
    '%ObjProto_toString%': [
        'Object',
        'prototype',
        'toString'
    ],
    '%ObjProto_valueOf%': [
        'Object',
        'prototype',
        'valueOf'
    ],
    '%PromisePrototype%': [
        'Promise',
        'prototype'
    ],
    '%PromiseProto_then%': [
        'Promise',
        'prototype',
        'then'
    ],
    '%Promise_all%': [
        'Promise',
        'all'
    ],
    '%Promise_reject%': [
        'Promise',
        'reject'
    ],
    '%Promise_resolve%': [
        'Promise',
        'resolve'
    ],
    '%RangeErrorPrototype%': [
        'RangeError',
        'prototype'
    ],
    '%ReferenceErrorPrototype%': [
        'ReferenceError',
        'prototype'
    ],
    '%RegExpPrototype%': [
        'RegExp',
        'prototype'
    ],
    '%SetPrototype%': [
        'Set',
        'prototype'
    ],
    '%SharedArrayBufferPrototype%': [
        'SharedArrayBuffer',
        'prototype'
    ],
    '%StringPrototype%': [
        'String',
        'prototype'
    ],
    '%SymbolPrototype%': [
        'Symbol',
        'prototype'
    ],
    '%SyntaxErrorPrototype%': [
        'SyntaxError',
        'prototype'
    ],
    '%TypedArrayPrototype%': [
        'TypedArray',
        'prototype'
    ],
    '%TypeErrorPrototype%': [
        'TypeError',
        'prototype'
    ],
    '%Uint8ArrayPrototype%': [
        'Uint8Array',
        'prototype'
    ],
    '%Uint8ClampedArrayPrototype%': [
        'Uint8ClampedArray',
        'prototype'
    ],
    '%Uint16ArrayPrototype%': [
        'Uint16Array',
        'prototype'
    ],
    '%Uint32ArrayPrototype%': [
        'Uint32Array',
        'prototype'
    ],
    '%URIErrorPrototype%': [
        'URIError',
        'prototype'
    ],
    '%WeakMapPrototype%': [
        'WeakMap',
        'prototype'
    ],
    '%WeakSetPrototype%': [
        'WeakSet',
        'prototype'
    ]
};
var bind = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/function-bind/index.js [app-ssr] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/hasown/index.js [app-ssr] (ecmascript)");
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */ var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */ 
var stringToPath = function stringToPath(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === '%' && last !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
    } else if (last === '%' && first !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
    });
    return result;
};
/* end adaptation */ var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = '%' + alias[0] + '%';
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
            value = doEval(intrinsicName);
        }
        if (typeof value === 'undefined' && !allowMissing) {
            throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
        }
        return {
            alias: alias,
            name: intrinsicName,
            value: value
        };
    }
    throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};
module.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== 'string' || name.length === 0) {
        throw new $TypeError('intrinsic name must be a non-empty string');
    }
    if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
        throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
    var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([
            0,
            1
        ], alias));
    }
    for(var i = 1, isOwn = true; i < parts.length; i += 1){
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
            throw new $SyntaxError('property names with quotes must have matching quotes');
        }
        if (part === 'constructor' || !isOwn) {
            skipFurtherCaching = true;
        }
        intrinsicBaseName += '.' + part;
        intrinsicRealName = '%' + intrinsicBaseName + '%';
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
            if (!(part in value)) {
                if (!allowMissing) {
                    throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                }
                return void undefined;
            }
            if ($gOPD && i + 1 >= parts.length) {
                var desc = $gOPD(value, part);
                isOwn = !!desc;
                // By convention, when a data property is converted to an accessor
                // property to emulate a data property that does not suffer from
                // the override mistake, that accessor's getter is marked with
                // an `originalValue` property. Here, when we detect this, we
                // uphold the illusion by pretending to see that original data
                // property, i.e., returning the value rather than the getter
                // itself.
                if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                    value = desc.get;
                } else {
                    value = value[part];
                }
            } else {
                isOwn = hasOwn(value, part);
                value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
                INTRINSICS[intrinsicRealName] = value;
            }
        }
    }
    return value;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/has-tostringtag/shams.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var hasSymbols = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/has-symbols/shams.js [app-ssr] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-set-tostringtag/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var GetIntrinsic = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/get-intrinsic/index.js [app-ssr] (ecmascript)");
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var hasToStringTag = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/has-tostringtag/shams.js [app-ssr] (ecmascript)")();
var hasOwn = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/hasown/index.js [app-ssr] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-errors/type.js [app-ssr] (ecmascript)");
var toStringTag = hasToStringTag ? Symbol.toStringTag : null;
/** @type {import('.')} */ module.exports = function setToStringTag(object, value) {
    var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
    var nonConfigurable = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
    if (typeof overrideIfSet !== 'undefined' && typeof overrideIfSet !== 'boolean' || typeof nonConfigurable !== 'undefined' && typeof nonConfigurable !== 'boolean') {
        throw new $TypeError('if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans');
    }
    if (toStringTag && (overrideIfSet || !hasOwn(object, toStringTag))) {
        if ($defineProperty) {
            $defineProperty(object, toStringTag, {
                configurable: !nonConfigurable,
                enumerable: false,
                value: value,
                writable: false
            });
        } else {
            object[toStringTag] = value; // eslint-disable-line no-param-reassign
        }
    }
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/form-data/lib/populate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// populates missing values
module.exports = function(dst, src) {
    Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
    });
    return dst;
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/form-data/lib/form_data.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var CombinedStream = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/combined-stream/lib/combined_stream.js [app-ssr] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
var http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
var https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
var parseUrl = __turbopack_context__.r("[externals]/url [external] (url, cjs)").parse;
var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
var mime = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/mime-types/index.js [app-ssr] (ecmascript)");
var asynckit = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/asynckit/index.js [app-ssr] (ecmascript)");
var setToStringTag = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/es-set-tostringtag/index.js [app-ssr] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/hasown/index.js [app-ssr] (ecmascript)");
var populate = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/form-data/lib/populate.js [app-ssr] (ecmascript)");
/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
 */ function FormData(options) {
    if (!(this instanceof FormData)) {
        return new FormData(options);
    }
    this._overheadLength = 0;
    this._valueLength = 0;
    this._valuesToMeasure = [];
    CombinedStream.call(this);
    options = options || {};
    for(var option in options){
        this[option] = options[option];
    }
}
// make it a Stream
util.inherits(FormData, CombinedStream);
FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';
FormData.prototype.append = function(field, value, options) {
    options = options || {};
    // allow filename as single option
    if (typeof options === 'string') {
        options = {
            filename: options
        };
    }
    var append = CombinedStream.prototype.append.bind(this);
    // all that streamy business can't handle numbers
    if (typeof value === 'number' || value == null) {
        value = String(value);
    }
    // https://github.com/felixge/node-form-data/issues/38
    if (Array.isArray(value)) {
        /*
     * Please convert your array into string
     * the way web server expects it
     */ this._error(new Error('Arrays are not supported.'));
        return;
    }
    var header = this._multiPartHeader(field, value, options);
    var footer = this._multiPartFooter();
    append(header);
    append(value);
    append(footer);
    // pass along options.knownLength
    this._trackLength(header, value, options);
};
FormData.prototype._trackLength = function(header, value, options) {
    var valueLength = 0;
    /*
   * used w/ getLengthSync(), when length is known.
   * e.g. for streaming directly from a remote server,
   * w/ a known file a size, and not wanting to wait for
   * incoming file to finish to get its size.
   */ if (options.knownLength != null) {
        valueLength += Number(options.knownLength);
    } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
    } else if (typeof value === 'string') {
        valueLength = Buffer.byteLength(value);
    }
    this._valueLength += valueLength;
    // @check why add CRLF? does this account for custom/multiple CRLFs?
    this._overheadLength += Buffer.byteLength(header) + FormData.LINE_BREAK.length;
    // empty or either doesn't have path or not an http response
    if (!value || !value.path && !(value.readable && hasOwn(value, 'httpVersion'))) {
        return;
    }
    // no need to bother with the length
    if (!options.knownLength) {
        this._valuesToMeasure.push(value);
    }
};
FormData.prototype._lengthRetriever = function(value, callback) {
    if (hasOwn(value, 'fd')) {
        /*
     * take read range into a account
     * `end` = Infinity –> read file till the end
     *
     * TODO: Looks like there is bug in Node fs.createReadStream
     * it doesn't respect `end` options without `start` options
     * Fix it when node fixes it.
     * https://github.com/joyent/node/issues/7819
     */ if (value.end != null && value.end !== Infinity && value.start != null) {
            /*
       * when end specified
       * no need to calculate range
       * inclusive, starts with 0
       */ callback(null, value.end + 1 - (value.start ? value.start : 0));
        // not that fast snoopy
        } else {
            // still need to fetch file size from fs
            fs.stat(value.path, function(err, stat) {
                var fileSize;
                if (err) {
                    callback(err);
                    return;
                }
                // update final size based on the range options
                fileSize = stat.size - (value.start ? value.start : 0);
                callback(null, fileSize);
            });
        }
    // or http response
    } else if (hasOwn(value, 'httpVersion')) {
        callback(null, Number(value.headers['content-length']));
    // or request stream http://github.com/mikeal/request
    } else if (hasOwn(value, 'httpModule')) {
        // wait till response come back
        value.on('response', function(response) {
            value.pause();
            callback(null, Number(response.headers['content-length']));
        });
        value.resume();
    // something else
    } else {
        callback('Unknown stream');
    }
};
FormData.prototype._multiPartHeader = function(field, value, options) {
    /*
   * custom header specified (as string)?
   * it becomes responsible for boundary
   * (e.g. to handle extra CRLFs on .NET servers)
   */ if (typeof options.header === 'string') {
        return options.header;
    }
    var contentDisposition = this._getContentDisposition(value, options);
    var contentType = this._getContentType(value, options);
    var contents = '';
    var headers = {
        // add custom disposition as third element or keep it two elements if not
        'Content-Disposition': [
            'form-data',
            'name="' + field + '"'
        ].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        'Content-Type': [].concat(contentType || [])
    };
    // allow custom headers.
    if (typeof options.header === 'object') {
        populate(headers, options.header);
    }
    var header;
    for(var prop in headers){
        if (hasOwn(headers, prop)) {
            header = headers[prop];
            // skip nullish headers.
            if (header == null) {
                continue; // eslint-disable-line no-continue, no-restricted-syntax
            }
            // convert all headers to arrays.
            if (!Array.isArray(header)) {
                header = [
                    header
                ];
            }
            // add non-empty headers.
            if (header.length) {
                contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
            }
        }
    }
    return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};
FormData.prototype._getContentDisposition = function(value, options) {
    var filename, contentDisposition;
    if (typeof options.filepath === 'string') {
        // custom filepath for relative paths
        filename = path.normalize(options.filepath).replace(/\\/g, '/');
    } else if (options.filename || value && (value.name || value.path)) {
        /*
     * custom filename take precedence
     * formidable and the browser add a name property
     * fs- and request- streams have path property
     */ filename = path.basename(options.filename || value && (value.name || value.path));
    } else if (value && value.readable && hasOwn(value, 'httpVersion')) {
        // or try http response
        filename = path.basename(value.client._httpMessage.path || '');
    }
    if (filename) {
        contentDisposition = 'filename="' + filename + '"';
    }
    return contentDisposition;
};
FormData.prototype._getContentType = function(value, options) {
    // use custom content-type above all
    var contentType = options.contentType;
    // or try `name` from formidable, browser
    if (!contentType && value && value.name) {
        contentType = mime.lookup(value.name);
    }
    // or try `path` from fs-, request- streams
    if (!contentType && value && value.path) {
        contentType = mime.lookup(value.path);
    }
    // or if it's http-reponse
    if (!contentType && value && value.readable && hasOwn(value, 'httpVersion')) {
        contentType = value.headers['content-type'];
    }
    // or guess it from the filepath or filename
    if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
    }
    // fallback to the default content type if `value` is not simple value
    if (!contentType && value && typeof value === 'object') {
        contentType = FormData.DEFAULT_CONTENT_TYPE;
    }
    return contentType;
};
FormData.prototype._multiPartFooter = function() {
    return (function(next) {
        var footer = FormData.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
            footer += this._lastBoundary();
        }
        next(footer);
    }).bind(this);
};
FormData.prototype._lastBoundary = function() {
    return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};
FormData.prototype.getHeaders = function(userHeaders) {
    var header;
    var formHeaders = {
        'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
    };
    for(header in userHeaders){
        if (hasOwn(userHeaders, header)) {
            formHeaders[header.toLowerCase()] = userHeaders[header];
        }
    }
    return formHeaders;
};
FormData.prototype.setBoundary = function(boundary) {
    if (typeof boundary !== 'string') {
        throw new TypeError('FormData boundary must be a string');
    }
    this._boundary = boundary;
};
FormData.prototype.getBoundary = function() {
    if (!this._boundary) {
        this._generateBoundary();
    }
    return this._boundary;
};
FormData.prototype.getBuffer = function() {
    var dataBuffer = Buffer.alloc(0);
    var boundary = this.getBoundary();
    // Create the form content. Add Line breaks to the end of data.
    for(var i = 0, len = this._streams.length; i < len; i++){
        if (typeof this._streams[i] !== 'function') {
            // Add content to the buffer.
            if (Buffer.isBuffer(this._streams[i])) {
                dataBuffer = Buffer.concat([
                    dataBuffer,
                    this._streams[i]
                ]);
            } else {
                dataBuffer = Buffer.concat([
                    dataBuffer,
                    Buffer.from(this._streams[i])
                ]);
            }
            // Add break after content.
            if (typeof this._streams[i] !== 'string' || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
                dataBuffer = Buffer.concat([
                    dataBuffer,
                    Buffer.from(FormData.LINE_BREAK)
                ]);
            }
        }
    }
    // Add the footer and return the Buffer object.
    return Buffer.concat([
        dataBuffer,
        Buffer.from(this._lastBoundary())
    ]);
};
FormData.prototype._generateBoundary = function() {
    // This generates a 50 character boundary similar to those used by Firefox.
    // They are optimized for boyer-moore parsing.
    this._boundary = '--------------------------' + crypto.randomBytes(12).toString('hex');
};
/*
 * Note: getLengthSync DOESN'T calculate streams length
 * As workaround one can calculate file size manually
 * and add it as knownLength option
 */ FormData.prototype.getLengthSync = function() {
    var knownLength = this._overheadLength + this._valueLength;
    /*
   * Don't get confused, there are 3 "internal" streams for each keyval pair
   * so it basically checks if there is any value added to the form
   */ if (this._streams.length) {
        knownLength += this._lastBoundary().length;
    }
    // https://github.com/form-data/form-data/issues/40
    if (!this.hasKnownLength()) {
        /*
     * Some async length retrievers are present
     * therefore synchronous length calculation is false.
     * Please use getLength(callback) to get proper length
     */ this._error(new Error('Cannot calculate proper length in synchronous way.'));
    }
    return knownLength;
};
/*
 * Public API to check if length of added values is known
 * https://github.com/form-data/form-data/issues/196
 * https://github.com/form-data/form-data/issues/262
 */ FormData.prototype.hasKnownLength = function() {
    var hasKnownLength = true;
    if (this._valuesToMeasure.length) {
        hasKnownLength = false;
    }
    return hasKnownLength;
};
FormData.prototype.getLength = function(cb) {
    var knownLength = this._overheadLength + this._valueLength;
    if (this._streams.length) {
        knownLength += this._lastBoundary().length;
    }
    if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
    }
    asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
            cb(err);
            return;
        }
        values.forEach(function(length) {
            knownLength += length;
        });
        cb(null, knownLength);
    });
};
FormData.prototype.submit = function(params, cb) {
    var request;
    var options;
    var defaults = {
        method: 'post'
    };
    /*
   * parse provided url if it's string
   * or treat it as options object
   */ if (typeof params === 'string') {
        params = parseUrl(params);
        options = populate({
            port: params.port,
            path: params.pathname,
            host: params.hostname,
            protocol: params.protocol
        }, defaults);
    // use custom params
    } else {
        options = populate(params, defaults);
        // if no port provided use default one
        if (!options.port) {
            options.port = options.protocol === 'https:' ? 443 : 80;
        }
    }
    // put that good code in getHeaders to some use
    options.headers = this.getHeaders(params.headers);
    // https if specified, fallback to http in any other case
    if (options.protocol === 'https:') {
        request = https.request(options);
    } else {
        request = http.request(options);
    }
    // get content length and fire away
    this.getLength((function(err, length) {
        if (err) {
            this._error(err);
            return;
        }
        // add content length
        request.setHeader('Content-Length', length);
        this.pipe(request);
        if (cb) {
            var onResponse;
            var callback = function(error, responce) {
                request.removeListener('error', callback);
                request.removeListener('response', onResponse);
                return cb.call(this, error, responce);
            };
            onResponse = callback.bind(this, null);
            request.on('error', callback);
            request.on('response', onResponse);
        }
    }).bind(this));
    return request;
};
FormData.prototype._error = function(err) {
    if (!this.error) {
        this.error = err;
        this.pause();
        this.emit('error', err);
    }
};
FormData.prototype.toString = function() {
    return '[object FormData]';
};
setToStringTag(FormData, 'FormData');
module.exports = FormData;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-link-header.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Like https://github.com/thlorenz/lib/parse-link-header but without any
// additional dependencies.
function parseParam(param) {
    var parts = param.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
    if (!parts) return null;
    return {
        key: parts[1],
        value: parts[2]
    };
}
function parseLink(link) {
    var parts = link.match(/<?([^>]*)>(.*)/);
    if (!parts) return null;
    var linkUrl = parts[1];
    var linkParams = parts[2].split(';');
    var rel = null;
    var parsedLinkParams = linkParams.reduce(function(result, param) {
        var parsed = parseParam(param);
        if (!parsed) return result;
        if (parsed.key === 'rel') {
            if (!rel) {
                rel = parsed.value;
            }
            return result;
        }
        result[parsed.key] = parsed.value;
        return result;
    }, {});
    if (!rel) return null;
    return {
        url: linkUrl,
        rel: rel,
        params: parsedLinkParams
    };
}
/**
 * Parse a Link header.
 *
 * @param {string} linkHeader
 * @returns {{
 *   [string]: {
 *     url: string,
 *     params: { [string]: string }
 *   }
 * }}
 */ function parseLinkHeader(linkHeader) {
    if (!linkHeader) return {};
    return linkHeader.split(/,\s*</).reduce(function(result, link) {
        var parsed = parseLink(link);
        if (!parsed) return result;
        // rel value can be multiple whitespace-separated rels.
        var splitRel = parsed.rel.split(/\s+/);
        splitRel.forEach(function(rel) {
            if (!result[rel]) {
                result[rel] = {
                    url: parsed.url,
                    params: parsed.params
                };
            }
        });
        return result;
    }, {});
}
module.exports = parseLinkHeader;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-response.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parseLinkHeader = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-link-header.js [app-ssr] (ecmascript)");
/**
 * A Mapbox API response.
 *
 * @class MapiResponse
 * @property {Object} body - The response body, parsed as JSON.
 * @property {string} rawBody - The raw response body.
 * @property {number} statusCode - The response's status code.
 * @property {Object} headers - The parsed response headers.
 * @property {Object} links - The parsed response links.
 * @property {MapiRequest} request - The response's originating `MapiRequest`.
 */ /**
 * @ignore
 * @param {MapiRequest} request
 * @param {Object} responseData
 * @param {Object} responseData.headers
 * @param {string} responseData.body
 * @param {number} responseData.statusCode
 */ function MapiResponse(request, responseData) {
    this.request = request;
    this.headers = responseData.headers;
    this.rawBody = responseData.body;
    this.statusCode = responseData.statusCode;
    try {
        this.body = JSON.parse(responseData.body || '{}');
    } catch (parseError) {
        this.body = responseData.body;
    }
    this.links = parseLinkHeader(this.headers.link);
}
/**
 * Check if there is a next page that you can fetch.
 *
 * @returns {boolean}
 */ MapiResponse.prototype.hasNextPage = function hasNextPage() {
    return !!this.links.next;
};
/**
 * Create a request for the next page, if there is one.
 * If there is no next page, returns `null`.
 *
 * @returns {MapiRequest | null}
 */ MapiResponse.prototype.nextPage = function nextPage() {
    if (!this.hasNextPage()) return null;
    return this.request._extend({
        path: this.links.next.url
    });
};
module.exports = MapiResponse;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {
    API_ORIGIN: 'https://api.mapbox.com',
    EVENT_PROGRESS_DOWNLOAD: 'downloadProgress',
    EVENT_PROGRESS_UPLOAD: 'uploadProgress',
    EVENT_ERROR: 'error',
    EVENT_RESPONSE: 'response',
    ERROR_HTTP: 'HttpError',
    ERROR_REQUEST_ABORTED: 'RequestAbortedError'
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var constants = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/constants.js [app-ssr] (ecmascript)");
/**
 * A Mapbox API error.
 *
 * If there's an error during the API transaction,
 * the Promise returned by `MapiRequest`'s [`send`](#send)
 * method should reject with a `MapiError`.
 *
 * @class MapiError
 * @hideconstructor
 * @property {MapiRequest} request - The errored request.
 * @property {string} type - The type of error. Usually this is `'HttpError'`.
 *   If the request was aborted, so the error was
 *   not sent from the server, the type will be
 *   `'RequestAbortedError'`.
 * @property {number} [statusCode] - The numeric status code of
 *   the HTTP response.
 * @property {Object | string} [body] - If the server sent a response body,
 *   this property exposes that response, parsed as JSON if possible.
 * @property {string} [message] - Whatever message could be derived from the
 *   call site and HTTP response.
 *
 * @param {MapiRequest} options.request
 * @param {number} [options.statusCode]
 * @param {string} [options.body]
 * @param {string} [options.message]
 * @param {string} [options.type]
 */ function MapiError(options) {
    var errorType = options.type || constants.ERROR_HTTP;
    var body;
    if (options.body) {
        try {
            body = JSON.parse(options.body);
        } catch (e) {
            body = options.body;
        }
    } else {
        body = null;
    }
    var message = options.message || null;
    if (!message) {
        if (typeof body === 'string') {
            message = body;
        } else if (body && typeof body.message === 'string') {
            message = body.message;
        } else if (errorType === constants.ERROR_REQUEST_ABORTED) {
            message = 'Request aborted';
        }
    }
    this.message = message;
    this.type = errorType;
    this.statusCode = options.statusCode || null;
    this.request = options.request;
    this.body = body;
}
module.exports = MapiError;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/node/node-layer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var xtend = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var got = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/got/dist/source/index.js [app-ssr] (ecmascript)");
var FormData = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/form-data/lib/form_data.js [app-ssr] (ecmascript)");
var MapiResponse = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-response.js [app-ssr] (ecmascript)");
var MapiError = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-error.js [app-ssr] (ecmascript)");
var constants = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/constants.js [app-ssr] (ecmascript)");
var methodsWithBodies = new Set([
    'PUT',
    'PATCH',
    'POST'
]);
// Keys are request IDs, values are objects with
// clientRequest and gotStream properties.
var requestsUnderway = {};
function nodeAbort(request) {
    var streams = requestsUnderway[request.id];
    if (!streams) return;
    streams.clientRequest.abort();
    delete requestsUnderway[request.id];
}
function normalizeGotProgressEvent(progress) {
    return xtend(progress, {
        percent: progress.percent * 100
    });
}
function createRequestStreams(request) {
    var url = request.url(request.client.accessToken);
    var gotOptions = {
        method: request.method,
        headers: request.headers,
        retries: 0,
        followRedirect: false,
        throwHttpErrors: false
    };
    if (typeof request.file === 'string') {
        if (request.sendFileAs && request.sendFileAs === 'form') {
            const form = new FormData();
            form.append('file', fs.createReadStream(request.file));
            gotOptions.body = form;
        } else {
            gotOptions.body = fs.createReadStream(request.file);
        }
    } else if (request.file && request.file.pipe) {
        if (request.sendFileAs && request.sendFileAs === 'form') {
            const form = new FormData();
            form.append('file', request.file);
            gotOptions.body = form;
        } else {
            gotOptions.body = request.file;
        }
    } else if (typeof request.body === 'string') {
        // matching service needs to send a www-form-urlencoded request
        gotOptions.body = request.body;
    } else if (request.body) {
        gotOptions.body = JSON.stringify(request.body);
    }
    if ([
        'POST',
        'PUT',
        'PATCH',
        'DELETE'
    ].includes(request.method) && !request.body) {
        gotOptions.body = '';
    }
    var gotStream = got.stream(url, gotOptions);
    gotStream.setEncoding(request.encoding);
    gotStream.on('downloadProgress', function(progress) {
        request.emitter.emit(constants.EVENT_PROGRESS_DOWNLOAD, normalizeGotProgressEvent(progress));
    });
    gotStream.on('uploadProgress', function(progress) {
        request.emitter.emit(constants.EVENT_PROGRESS_UPLOAD, normalizeGotProgressEvent(progress));
    });
    return new Promise(function(resolve) {
        gotStream.on('request', function(req) {
            var clientRequest = req;
            var streams = {
                clientRequest: clientRequest,
                gotStream: gotStream
            };
            requestsUnderway[request.id] = streams;
            resolve(streams);
        });
        // Got will not end the stream for methods that *can* have
        // bodies if you don't provide a body, so we'll do it manually.
        if (methodsWithBodies.has(request.method) && gotOptions.body === undefined) {
            gotStream.end();
        }
    });
}
function nodeSend(request) {
    return Promise.resolve().then(function() {
        return createRequestStreams(request);
    }).then(function(result) {
        return sendStreams(result.gotStream, result.clientRequest);
    });
    //TURBOPACK unreachable
    ;
    function sendStreams(gotStream, clientRequest) {
        return new Promise(function(resolve, reject) {
            var errored = false;
            clientRequest.on('abort', function() {
                var mapiError = new MapiError({
                    request: request,
                    type: constants.ERROR_REQUEST_ABORTED
                });
                errored = true;
                reject(mapiError);
            });
            var httpsResponse = void 0;
            var statusCode = void 0;
            gotStream.on('response', function(res) {
                httpsResponse = res;
                statusCode = res.statusCode;
            });
            var body = '';
            gotStream.on('data', function(chunk) {
                body += chunk;
            });
            gotStream.on('end', function() {
                if (errored || !httpsResponse) return;
                if (statusCode < 200 || statusCode >= 400) {
                    var mapiError = new MapiError({
                        request: request,
                        body: body,
                        statusCode: statusCode
                    });
                    reject(mapiError);
                    return;
                }
                try {
                    var response = new MapiResponse(request, {
                        body: body,
                        headers: httpsResponse.headers,
                        statusCode: httpsResponse.statusCode
                    });
                    resolve(response);
                } catch (responseError) {
                    reject(responseError);
                }
            });
            gotStream.on('error', function(error) {
                errored = true;
                reject(error);
            });
        });
    }
}
module.exports = {
    nodeAbort: nodeAbort,
    nodeSend: nodeSend
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/helpers/url-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Encode each item of an array individually. The comma
// delimiters should not themselves be encoded.
function encodeArray(arrayValue) {
    return arrayValue.map(encodeURIComponent).join(',');
}
function encodeValue(value) {
    if (Array.isArray(value)) {
        return encodeArray(value);
    }
    return encodeURIComponent(String(value));
}
/**
 * Append a query parameter to a URL.
 *
 * @param {string} url
 * @param {string} key
 * @param {string|number|boolean|Array<*>>} [value] - Provide an array
 *   if the value is a list and commas between values need to be
 *   preserved, unencoded.
 * @returns {string} - Modified URL.
 */ function appendQueryParam(url, key, value) {
    if (value === false || value === null) {
        return url;
    }
    var punctuation = /\?/.test(url) ? '&' : '?';
    var query = encodeURIComponent(key);
    if (value !== undefined && value !== '' && value !== true) {
        query += '=' + encodeValue(value);
    }
    return '' + url + punctuation + query;
}
/**
 * Derive a query string from an object and append it
 * to a URL.
 *
 * @param {string} url
 * @param {Object} [queryObject] - Values should be primitives.
 * @returns {string} - Modified URL.
 */ function appendQueryObject(url, queryObject) {
    if (!queryObject) {
        return url;
    }
    var result = url;
    Object.keys(queryObject).forEach(function(key) {
        var value = queryObject[key];
        if (value === undefined) {
            return;
        }
        if (Array.isArray(value)) {
            value = value.filter(function(v) {
                return v !== null && v !== undefined;
            }).join(',');
        }
        result = appendQueryParam(result, key, value);
    });
    return result;
}
/**
 * Prepend an origin to a URL. If the URL already has an
 * origin, do nothing.
 *
 * @param {string} url
 * @param {string} origin
 * @returns {string} - Modified URL.
 */ function prependOrigin(url, origin) {
    if (!origin) {
        return url;
    }
    if (url.slice(0, 4) === 'http') {
        return url;
    }
    var delimiter = url[0] === '/' ? '' : '/';
    return '' + origin.replace(/\/$/, '') + delimiter + url;
}
/**
 * Interpolate values into a route with express-style,
 * colon-prefixed route parameters.
 *
 * @param {string} route
 * @param {Object} [params] - Values should be primitives
 *   or arrays of primitives. Provide an array if the value
 *   is a list and commas between values need to be
 *   preserved, unencoded.
 * @returns {string} - Modified URL.
 */ function interpolateRouteParams(route, params) {
    if (!params) {
        return route;
    }
    return route.replace(/\/:([a-zA-Z0-9]+)/g, function(_, paramId) {
        var value = params[paramId];
        if (value === undefined) {
            throw new Error('Unspecified route parameter ' + paramId);
        }
        var preppedValue = encodeValue(value);
        return '/' + preppedValue;
    });
}
module.exports = {
    appendQueryObject: appendQueryObject,
    appendQueryParam: appendQueryParam,
    prependOrigin: prependOrigin,
    interpolateRouteParams: interpolateRouteParams
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-request.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parseToken = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/parse-mapbox-token/index.js [app-ssr] (ecmascript)");
var xtend = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var EventEmitter = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/eventemitter3/index.js [app-ssr] (ecmascript)");
var urlUtils = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/helpers/url-utils.js [app-ssr] (ecmascript)");
var constants = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/constants.js [app-ssr] (ecmascript)");
var requestId = 1;
/**
 * A Mapbox API request.
 *
 * Note that creating a `MapiRequest` does *not* send the request automatically.
 * Use the request's `send` method to send it off and get a `Promise`.
 *
 * The `emitter` property is an `EventEmitter` that emits the following events:
 *
 * - `'response'` - Listeners will be called with a `MapiResponse`.
 * - `'error'` - Listeners will be called with a `MapiError`.
 * - `'downloadProgress'` - Listeners will be called with `ProgressEvents`.
 * - `'uploadProgress'` - Listeners will be called with `ProgressEvents`.
 *   Upload events are only available when the request includes a file.
 *
 * @class MapiRequest
 * @property {EventEmitter} emitter - An event emitter. See above.
 * @property {MapiClient} client - This request's `MapiClient`.
 * @property {MapiResponse|null} response - If this request has been sent and received
 *   a response, the response is available on this property.
 * @property {MapiError|Error|null} error - If this request has been sent and
 *   received an error in response, the error is available on this property.
 * @property {boolean} aborted - If the request has been aborted
 *   (via [`abort`](#abort)), this property will be `true`.
 * @property {boolean} sent - If the request has been sent, this property will
 *   be `true`. You cannot send the same request twice, so if you need to create
 *   a new request that is the equivalent of an existing one, use
 *   [`clone`](#clone).
 * @property {string} path - The request's path, including colon-prefixed route
 *   parameters.
 * @property {string} origin - The request's origin.
 * @property {string} method - The request's HTTP method.
 * @property {Object} query - A query object, which will be transformed into
 *   a URL query string.
 * @property {Object} params - A route parameters object, whose values will
 *   be interpolated the path.
 * @property {Object} headers - The request's headers.
 * @property {Object|string|null} body - Data to send with the request.
 *   If the request has a body, it will also be sent with the header
 *   `'Content-Type: application/json'`.
 * @property {Blob|ArrayBuffer|string|ReadStream} file - A file to
 *   send with the request. The browser client accepts Blobs and ArrayBuffers;
 *   the Node client accepts strings (filepaths) and ReadStreams.
 * @property {string} encoding - The encoding of the response.
 * @property {string} sendFileAs - The method to send the `file`. Options are
 *   `data` (x-www-form-urlencoded) or `form` (multipart/form-data).
 */ /**
 * @ignore
 * @param {MapiClient} client
 * @param {Object} options
 * @param {string} options.method
 * @param {string} options.path
 * @param {Object} [options.query={}]
 * @param {Object} [options.params={}]
 * @param {string} [options.origin]
 * @param {Object} [options.headers]
 * @param {Object} [options.body=null]
 * @param {Blob|ArrayBuffer|string|ReadStream} [options.file=null]
 * @param {string} [options.encoding=utf8]
 */ function MapiRequest(client, options) {
    if (!client) {
        throw new Error('MapiRequest requires a client');
    }
    if (!options || !options.path || !options.method) {
        throw new Error('MapiRequest requires an options object with path and method properties');
    }
    var defaultHeaders = {};
    if (options.body) {
        defaultHeaders['content-type'] = 'application/json';
    }
    var headersWithDefaults = xtend(defaultHeaders, options.headers);
    // Disallows duplicate header names of mixed case,
    // e.g. Content-Type and content-type.
    var headers = Object.keys(headersWithDefaults).reduce(function(memo, name) {
        memo[name.toLowerCase()] = headersWithDefaults[name];
        return memo;
    }, {});
    this.id = requestId++;
    this._options = options;
    this.emitter = new EventEmitter();
    this.client = client;
    this.response = null;
    this.error = null;
    this.sent = false;
    this.aborted = false;
    this.path = options.path;
    this.method = options.method;
    this.origin = options.origin || client.origin;
    this.query = options.query || {};
    this.params = options.params || {};
    this.body = options.body || null;
    this.file = options.file || null;
    this.encoding = options.encoding || 'utf8';
    this.sendFileAs = options.sendFileAs || null;
    this.headers = headers;
}
/**
 * Get the URL of the request.
 *
 * @param {string} [accessToken] - By default, the access token of the request's
 *   client is used.
 * @return {string}
 */ MapiRequest.prototype.url = function url(accessToken) {
    var url = urlUtils.prependOrigin(this.path, this.origin);
    url = urlUtils.appendQueryObject(url, this.query);
    var routeParams = this.params;
    var actualAccessToken = accessToken == null ? this.client.accessToken : accessToken;
    if (actualAccessToken) {
        url = urlUtils.appendQueryParam(url, 'access_token', actualAccessToken);
        var accessTokenOwnerId = parseToken(actualAccessToken).user;
        routeParams = xtend({
            ownerId: accessTokenOwnerId
        }, routeParams);
    }
    url = urlUtils.interpolateRouteParams(url, routeParams);
    return url;
};
/**
 * Send the request. Returns a Promise that resolves with a `MapiResponse`.
 * You probably want to use `response.body`.
 *
 * `send` only retrieves the first page of paginated results. You can get
 * the next page by using the `MapiResponse`'s [`nextPage`](#nextpage)
 * function, or iterate through all pages using [`eachPage`](#eachpage)
 * instead of `send`.
 *
 * @returns {Promise<MapiResponse>}
 */ MapiRequest.prototype.send = function send() {
    var self = this;
    if (self.sent) {
        throw new Error('This request has already been sent. Check the response and error properties. Create a new request with clone().');
    }
    self.sent = true;
    return self.client.sendRequest(self).then(function(response) {
        self.response = response;
        self.emitter.emit(constants.EVENT_RESPONSE, response);
        return response;
    }, function(error) {
        self.error = error;
        self.emitter.emit(constants.EVENT_ERROR, error);
        throw error;
    });
};
/**
 * Abort the request.
 *
 * Any pending `Promise` returned by [`send`](#send) will be rejected with
 * an error with `type: 'RequestAbortedError'`. If you've created a request
 * that might be aborted, you need to catch and handle such errors.
 *
 * This method will also abort any requests created while fetching subsequent
 * pages via [`eachPage`](#eachpage).
 *
 * If the request has not been sent or has already been aborted, nothing
 * will happen.
 */ MapiRequest.prototype.abort = function abort() {
    if (this._nextPageRequest) {
        this._nextPageRequest.abort();
        delete this._nextPageRequest;
    }
    if (this.response || this.error || this.aborted) return;
    this.aborted = true;
    this.client.abortRequest(this);
};
/**
 * Invoke a callback for each page of a paginated API response.
 *
 * The callback should have the following signature:
 *
 * ```js
 * (
 *   error: MapiError,
 *   response: MapiResponse,
 *   next: () => void
 * ) => void
 * ```
 *
 * **The next page will not be fetched until you've invoked the
 * `next` callback**, indicating that you're ready for it.
 *
 * @param {Function} callback
 */ MapiRequest.prototype.eachPage = function eachPage(callback) {
    var self = this;
    function handleResponse(response) {
        function getNextPage() {
            delete self._nextPageRequest;
            var nextPageRequest = response.nextPage();
            if (nextPageRequest) {
                self._nextPageRequest = nextPageRequest;
                getPage(nextPageRequest);
            }
        }
        callback(null, response, getNextPage);
    }
    function handleError(error) {
        callback(error, null, function() {});
    }
    function getPage(request) {
        request.send().then(handleResponse, handleError);
    }
    getPage(this);
};
/**
 * Clone this request.
 *
 * Each request can only be sent *once*. So if you'd like to send the
 * same request again, clone it and send away.
 *
 * @returns {MapiRequest} - A new `MapiRequest` configured just like this one.
 */ MapiRequest.prototype.clone = function clone() {
    return this._extend();
};
/**
 * @ignore
 */ MapiRequest.prototype._extend = function _extend(options) {
    var extendedOptions = xtend(this._options, options);
    return new MapiRequest(this.client, extendedOptions);
};
module.exports = MapiRequest;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parseToken = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/parse-mapbox-token/index.js [app-ssr] (ecmascript)");
var MapiRequest = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-request.js [app-ssr] (ecmascript)");
var constants = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/constants.js [app-ssr] (ecmascript)");
/**
 * A low-level Mapbox API client. Use it to create service clients
 * that share the same configuration.
 *
 * Services and `MapiRequest`s use the underlying `MapiClient` to
 * determine how to create, send, and abort requests in a way
 * that is appropriate to the configuration and environment
 * (Node or the browser).
 *
 * @class MapiClient
 * @property {string} accessToken - The Mapbox access token assigned
 *   to this client.
 * @property {string} [origin] - The origin
 *   to use for API requests. Defaults to https://api.mapbox.com.
 */ function MapiClient(options) {
    if (!options || !options.accessToken) {
        throw new Error('Cannot create a client without an access token');
    }
    // Try parsing the access token to determine right away if it's valid.
    parseToken(options.accessToken);
    this.accessToken = options.accessToken;
    this.origin = options.origin || constants.API_ORIGIN;
}
MapiClient.prototype.createRequest = function createRequest(requestOptions) {
    return new MapiRequest(this, requestOptions);
};
module.exports = MapiClient;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/node/node-client.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var node = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/node/node-layer.js [app-ssr] (ecmascript)");
var MapiClient = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js [app-ssr] (ecmascript)");
function NodeClient(options) {
    MapiClient.call(this, options);
}
NodeClient.prototype = Object.create(MapiClient.prototype);
NodeClient.prototype.constructor = NodeClient;
NodeClient.prototype.sendRequest = node.nodeSend;
NodeClient.prototype.abortRequest = node.nodeAbort;
/**
 * Create a client for Node.
 *
 * @param {Object} options
 * @param {string} options.accessToken
 * @param {string} [options.origin]
 * @returns {MapiClient}
 */ function createNodeClient(options) {
    return new NodeClient(options);
}
module.exports = createNodeClient;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/client.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// The "browser" field in "package.json" instructs browser
// bundlers to override this an load browser/browser-client, instead.
var nodeClient = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/node/node-client.js [app-ssr] (ecmascript)");
module.exports = nodeClient;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var client = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/client.js [app-ssr] (ecmascript)");
module.exports = client;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/validator.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var xtend = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var v = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/fusspot/lib/index.js [app-ssr] (ecmascript)");
function file(value) {
    // If we're in a browser so Blob is available, the file must be that.
    // In Node, however, it could be a filepath or a pipeable (Readable) stream.
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (typeof value === 'string' || value.pipe !== undefined) {
        return;
    }
    return 'Filename or Readable stream';
}
function assertShape(validatorObj, apiName) {
    return v.assert(v.strictShape(validatorObj), apiName);
}
function date(value) {
    var msg = 'date';
    if (typeof value === 'boolean') {
        return msg;
    }
    try {
        var date = new Date(value);
        if (date.getTime && isNaN(date.getTime())) {
            return msg;
        }
    } catch (e) {
        return msg;
    }
}
function coordinates(value) {
    return v.tuple(v.number, v.number)(value);
}
module.exports = xtend(v, {
    file: file,
    date: date,
    coordinates: coordinates,
    assertShape: assertShape
});
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/pick.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Create a new object by picking properties off an existing object.
 * The second param can be overloaded as a callback for
 * more fine grained picking of properties.
 * @param {Object} source
 * @param {Array<string>|function(string, Object):boolean} keys
 * @returns {Object}
 */ function pick(source, keys) {
    var filter = function(key, val) {
        return keys.indexOf(key) !== -1 && val !== undefined;
    };
    if (typeof keys === 'function') {
        filter = keys;
    }
    return Object.keys(source).filter(function(key) {
        return filter(key, source[key]);
    }).reduce(function(result, key) {
        result[key] = source[key];
        return result;
    }, {});
}
module.exports = pick;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/object-map.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function objectMap(obj, cb) {
    return Object.keys(obj).reduce(function(result, key) {
        result[key] = cb(key, obj[key]);
        return result;
    }, {});
}
module.exports = objectMap;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/stringify-booleans.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var objectMap = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/object-map.js [app-ssr] (ecmascript)");
/**
 * Stringify all the boolean values in an object, so true becomes "true".
 *
 * @param {Object} obj
 * @returns {Object}
 */ function stringifyBoolean(obj) {
    return objectMap(obj, function(_, value) {
        return typeof value === 'boolean' ? JSON.stringify(value) : value;
    });
}
module.exports = stringifyBoolean;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/create-service-factory.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var MapiClient = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js [app-ssr] (ecmascript)");
// This will create the environment-appropriate client.
var createClient = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/lib/client.js [app-ssr] (ecmascript)");
function createServiceFactory(ServicePrototype) {
    return function(clientOrConfig) {
        var client;
        if (MapiClient.prototype.isPrototypeOf(clientOrConfig)) {
            client = clientOrConfig;
        } else {
            client = createClient(clientOrConfig);
        }
        var service = Object.create(ServicePrototype);
        service.client = client;
        return service;
    };
}
module.exports = createServiceFactory;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/geocoding.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var xtend = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var v = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/validator.js [app-ssr] (ecmascript)");
var pick = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/pick.js [app-ssr] (ecmascript)");
var stringifyBooleans = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/stringify-booleans.js [app-ssr] (ecmascript)");
var createServiceFactory = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/mapbox-sdk/services/service-helpers/create-service-factory.js [app-ssr] (ecmascript)");
/**
 * Geocoding API service.
 *
 * Learn more about this service and its responses in
 * [the HTTP service documentation](https://docs.mapbox.com/api/search/#geocoding).
 */ var Geocoding = {};
var featureTypes = [
    'country',
    'region',
    'postcode',
    'district',
    'place',
    'locality',
    'neighborhood',
    'address',
    'poi',
    'poi.landmark'
];
/**
 * Search for a place.
 *
 * See the [public documentation](https://docs.mapbox.com/api/search/#forward-geocoding).
 *
 * @param {Object} config
 * @param {string} config.query - A place name.
 * @param {'mapbox.places'|'mapbox.places-permanent'} [config.mode="mapbox.places"] - Either `mapbox.places` for ephemeral geocoding, or `mapbox.places-permanent` for storing results and batch geocoding.
 * @param {Array<string>} [config.countries] - Limits results to the specified countries.
 *   Each item in the array should be an [ISO 3166 alpha 2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
 * @param {Coordinates|'ip'} [config.proximity] - Bias local results based on a provided coordinate location or a user's IP address.
 * @param {Array<'country'|'region'|'postcode'|'district'|'place'|'locality'|'neighborhood'|'address'|'poi'|'poi.landmark'>} [config.types] - Filter results by feature types.
 * @param {boolean} [config.autocomplete=true] - Return autocomplete results or not.
 * @param {BoundingBox} [config.bbox] - Limit results to a bounding box.
 * @param {number} [config.limit=5] - Limit the number of results returned.
 * @param {Array<string>} [config.language] - Specify the language to use for response text and, for forward geocoding, query result weighting.
 *  Options are [IETF language tags](https://en.wikipedia.org/wiki/IETF_language_tag) comprised of a mandatory
 *  [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and optionally one or more IETF subtags for country or script.
 * @param {boolean} [config.routing=false] - Specify whether to request additional metadata about the recommended navigation destination. Only applicable for address features.
 * @param {boolean} [config.fuzzyMatch=true] - Specify whether the Geocoding API should attempt approximate, as well as exact, matching.
 * @param {String} [config.worldview="us"] - Filter results to geographic features whose characteristics are defined differently by audiences belonging to various regional, cultural, or political groups.
 * @param {String} [config.session_token] - A unique session identifier generated by the client.
 * @return {MapiRequest}
 *
 * @example
 * geocodingClient.forwardGeocode({
 *   query: 'Paris, France',
 *   limit: 2
 * })
 *   .send()
 *   .then(response => {
 *     const match = response.body;
 *   });
 *
 * @example
 * // geocoding with proximity
 * geocodingClient.forwardGeocode({
 *   query: 'Paris, France',
 *   proximity: [-95.4431142, 33.6875431]
 * })
 *   .send()
 *   .then(response => {
 *     const match = response.body;
 *   });
 *
 * // geocoding with countries
 * geocodingClient.forwardGeocode({
 *   query: 'Paris, France',
 *   countries: ['fr']
 * })
 *   .send()
 *   .then(response => {
 *     const match = response.body;
 *   });
 *
 * // geocoding with bounding box
 * geocodingClient.forwardGeocode({
 *   query: 'Paris, France',
 *   bbox: [2.14, 48.72, 2.55, 48.96]
 * })
 *   .send()
 *   .then(response => {
 *     const match = response.body;
 *   });
 */ Geocoding.forwardGeocode = function(config) {
    v.assertShape({
        query: v.required(v.string),
        mode: v.oneOf('mapbox.places', 'mapbox.places-permanent'),
        countries: v.arrayOf(v.string),
        proximity: v.oneOf(v.coordinates, 'ip'),
        types: v.arrayOf(v.oneOf(featureTypes)),
        autocomplete: v.boolean,
        bbox: v.arrayOf(v.number),
        limit: v.number,
        language: v.arrayOf(v.string),
        routing: v.boolean,
        fuzzyMatch: v.boolean,
        worldview: v.string,
        session_token: v.string
    })(config);
    config.mode = config.mode || 'mapbox.places';
    var query = stringifyBooleans(xtend({
        country: config.countries
    }, pick(config, [
        'proximity',
        'types',
        'autocomplete',
        'bbox',
        'limit',
        'language',
        'routing',
        'fuzzyMatch',
        'worldview',
        'session_token'
    ])));
    return this.client.createRequest({
        method: 'GET',
        path: '/geocoding/v5/:mode/:query.json',
        params: pick(config, [
            'mode',
            'query'
        ]),
        query: query
    });
};
/**
 * Search for places near coordinates.
 *
 * See the [public documentation](https://docs.mapbox.com/api/search/#reverse-geocoding).
 *
 * @param {Object} config
 * @param {Coordinates} config.query - Coordinates at which features will be searched.
 * @param {'mapbox.places'|'mapbox.places-permanent'} [config.mode="mapbox.places"] - Either `mapbox.places` for ephemeral geocoding, or `mapbox.places-permanent` for storing results and batch geocoding.
 * @param {Array<string>} [config.countries] - Limits results to the specified countries.
 *   Each item in the array should be an [ISO 3166 alpha 2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
 * @param {Array<'country'|'region'|'postcode'|'district'|'place'|'locality'|'neighborhood'|'address'|'poi'|'poi.landmark'>} [config.types] - Filter results by feature types.
 * @param {BoundingBox} [config.bbox] - Limit results to a bounding box.
 * @param {number} [config.limit=1] - Limit the number of results returned. If using this option, you must provide a single item for `types`.
 * @param {Array<string>} [config.language] - Specify the language to use for response text and, for forward geocoding, query result weighting.
 *  Options are [IETF language tags](https://en.wikipedia.org/wiki/IETF_language_tag) comprised of a mandatory
 *  [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and optionally one or more IETF subtags for country or script.
 * @param {'distance'|'score'} [config.reverseMode='distance'] - Set the factors that are used to sort nearby results.
 * @param {boolean} [config.routing=false] - Specify whether to request additional metadata about the recommended navigation destination. Only applicable for address features.
 * @param {String} [config.worldview="us"] - Filter results to geographic features whose characteristics are defined differently by audiences belonging to various regional, cultural, or political groups.
 * @param {String} [config.session_token] - A unique session identifier generated by the client.
 * @return {MapiRequest}
 *
 * @example
 * geocodingClient.reverseGeocode({
 *   query: [-95.4431142, 33.6875431]
 * })
 *   .send()
 *   .then(response => {
 *     // GeoJSON document with geocoding matches
 *     const match = response.body;
 *   });
 */ Geocoding.reverseGeocode = function(config) {
    v.assertShape({
        query: v.required(v.coordinates),
        mode: v.oneOf('mapbox.places', 'mapbox.places-permanent'),
        countries: v.arrayOf(v.string),
        types: v.arrayOf(v.oneOf(featureTypes)),
        bbox: v.arrayOf(v.number),
        limit: v.number,
        language: v.arrayOf(v.string),
        reverseMode: v.oneOf('distance', 'score'),
        routing: v.boolean,
        worldview: v.string,
        session_token: v.string
    })(config);
    config.mode = config.mode || 'mapbox.places';
    var query = stringifyBooleans(xtend({
        country: config.countries
    }, pick(config, [
        'country',
        'types',
        'bbox',
        'limit',
        'language',
        'reverseMode',
        'routing',
        'worldview',
        'session_token'
    ])));
    return this.client.createRequest({
        method: 'GET',
        path: '/geocoding/v5/:mode/:query.json',
        params: pick(config, [
            'mode',
            'query'
        ]),
        query: query
    });
};
module.exports = createServiceFactory(Geocoding);
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/base-64/base64.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */ ;
(function(root) {
    // Detect free variables `exports`.
    var freeExports = ("TURBOPACK compile-time value", "object") == 'object' && exports;
    // Detect free variable `module`.
    var freeModule = ("TURBOPACK compile-time value", "object") == 'object' && module && module.exports == freeExports && module;
    // Detect free variable `global`, from Node.js or Browserified code, and use
    // it as `root`.
    var freeGlobal = ("TURBOPACK compile-time value", "object") == 'object' && /*TURBOPACK member replacement*/ __turbopack_context__.g;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
    }
    /*--------------------------------------------------------------------------*/ var InvalidCharacterError = function(message) {
        this.message = message;
    };
    InvalidCharacterError.prototype = new Error;
    InvalidCharacterError.prototype.name = 'InvalidCharacterError';
    var error = function(message) {
        // Note: the error messages used throughout this file match those used by
        // the native `atob`/`btoa` implementation in Chromium.
        throw new InvalidCharacterError(message);
    };
    var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // http://whatwg.org/html/common-microsyntaxes.html#space-character
    var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;
    // `decode` is designed to be fully compatible with `atob` as described in the
    // HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
    // The optimized base64-decoding algorithm used is based on @atk’s excellent
    // implementation. https://gist.github.com/atk/1020396
    var decode = function(input) {
        input = String(input).replace(REGEX_SPACE_CHARACTERS, '');
        var length = input.length;
        if (length % 4 == 0) {
            input = input.replace(/==?$/, '');
            length = input.length;
        }
        if (length % 4 == 1 || // http://whatwg.org/C#alphanumeric-ascii-characters
        /[^+a-zA-Z0-9/]/.test(input)) {
            error('Invalid character: the string to be decoded is not correctly encoded.');
        }
        var bitCounter = 0;
        var bitStorage;
        var buffer;
        var output = '';
        var position = -1;
        while(++position < length){
            buffer = TABLE.indexOf(input.charAt(position));
            bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
            // Unless this is the first of a group of 4 characters…
            if (bitCounter++ % 4) {
                // …convert the first 8 bits to a single ASCII character.
                output += String.fromCharCode(0xFF & bitStorage >> (-2 * bitCounter & 6));
            }
        }
        return output;
    };
    // `encode` is designed to be fully compatible with `btoa` as described in the
    // HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
    var encode = function(input) {
        input = String(input);
        if (/[^\0-\xFF]/.test(input)) {
            // Note: no need to special-case astral symbols here, as surrogates are
            // matched, and the input is supposed to only contain ASCII anyway.
            error('The string to be encoded contains characters outside of the ' + 'Latin1 range.');
        }
        var padding = input.length % 3;
        var output = '';
        var position = -1;
        var a;
        var b;
        var c;
        var d;
        var buffer;
        // Make sure any padding is handled outside of the loop.
        var length = input.length - padding;
        while(++position < length){
            // Read three bytes, i.e. 24 bits.
            a = input.charCodeAt(position) << 16;
            b = input.charCodeAt(++position) << 8;
            c = input.charCodeAt(++position);
            buffer = a + b + c;
            // Turn the 24 bits into four chunks of 6 bits each, and append the
            // matching character for each of them to the output.
            output += TABLE.charAt(buffer >> 18 & 0x3F) + TABLE.charAt(buffer >> 12 & 0x3F) + TABLE.charAt(buffer >> 6 & 0x3F) + TABLE.charAt(buffer & 0x3F);
        }
        if (padding == 2) {
            a = input.charCodeAt(position) << 8;
            b = input.charCodeAt(++position);
            buffer = a + b;
            output += TABLE.charAt(buffer >> 10) + TABLE.charAt(buffer >> 4 & 0x3F) + TABLE.charAt(buffer << 2 & 0x3F) + '=';
        } else if (padding == 1) {
            buffer = input.charCodeAt(position);
            output += TABLE.charAt(buffer >> 2) + TABLE.charAt(buffer << 4 & 0x3F) + '==';
        }
        return output;
    };
    var base64 = {
        'encode': encode,
        'decode': decode,
        'version': '0.1.0'
    };
    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
            return base64;
        }(__turbopack_context__.r, exports, module));
    } else if (freeExports && !freeExports.nodeType) {
        if (freeModule) {
            freeModule.exports = base64;
        } else {
            for(var key in base64){
                base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
            }
        }
    } else {
        root.base64 = base64;
    }
})(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/parse-mapbox-token/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var base64 = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/base-64/base64.js [app-ssr] (ecmascript)");
var tokenCache = {};
function parseToken(token) {
    if (tokenCache[token]) {
        return tokenCache[token];
    }
    var parts = token.split('.');
    var usage = parts[0];
    var rawPayload = parts[1];
    if (!rawPayload) {
        throw new Error('Invalid token');
    }
    var parsedPayload = parsePaylod(rawPayload);
    var result = {
        usage: usage,
        user: parsedPayload.u
    };
    if (has(parsedPayload, 'a')) result.authorization = parsedPayload.a;
    if (has(parsedPayload, 'exp')) result.expires = parsedPayload.exp * 1000;
    if (has(parsedPayload, 'iat')) result.created = parsedPayload.iat * 1000;
    if (has(parsedPayload, 'scopes')) result.scopes = parsedPayload.scopes;
    if (has(parsedPayload, 'client')) result.client = parsedPayload.client;
    if (has(parsedPayload, 'll')) result.lastLogin = parsedPayload.ll;
    if (has(parsedPayload, 'iu')) result.impersonator = parsedPayload.iu;
    tokenCache[token] = result;
    return result;
}
function parsePaylod(rawPayload) {
    try {
        return JSON.parse(base64.decode(rawPayload));
    } catch (parseError) {
        throw new Error('Invalid token');
    }
}
function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
module.exports = parseToken;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/eventemitter3/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var has = Object.prototype.hasOwnProperty, prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events){
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++){
        ee[i] = handlers[i].fn;
    }
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
            case 1:
                return listeners.fn.call(listeners.context), true;
            case 2:
                return listeners.fn.call(listeners.context, a1), true;
            case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for(i = 1, args = new Array(len - 1); i < len; i++){
            args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++){
                        args[j - 1] = arguments[j];
                    }
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
        }
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++){
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
            }
        }
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
    } else {
        this._events = new Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;
//
// Expose the module.
//
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = EventEmitter;
}
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/is-plain-obj/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toString = Object.prototype.toString;
module.exports = function(x) {
    var prototype;
    return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/@mapbox/fusspot/lib/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Validators are functions which assert certain type.
 * They can return a string which can then be used
 * to display a helpful error message.
 * They can also return a function for a custom error message.
 */ var isPlainObject = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/is-plain-obj/index.js [app-ssr] (ecmascript)");
var xtend = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var DEFAULT_ERROR_PATH = 'value';
var NEWLINE_INDENT = '\n  ';
var v = {};
/**
 * Runners
 *
 * Take root validators and run assertion
 */ v.assert = function(rootValidator, options) {
    options = options || {};
    return function(value) {
        var message = validate(rootValidator, value);
        // all good
        if (!message) {
            return;
        }
        var errorMessage = processMessage(message, options);
        if (options.apiName) {
            errorMessage = options.apiName + ': ' + errorMessage;
        }
        throw new Error(errorMessage);
    };
};
/**
 * Higher Order Validators
 *
 * validators which take other validators as input
 * and output a new validator
 */ v.shape = function shape(validatorObj) {
    var validators = objectEntries(validatorObj);
    return function shapeValidator(value) {
        var validationResult = validate(v.plainObject, value);
        if (validationResult) {
            return validationResult;
        }
        var key, validator;
        var errorMessages = [];
        for(var i = 0; i < validators.length; i++){
            key = validators[i].key;
            validator = validators[i].value;
            validationResult = validate(validator, value[key]);
            if (validationResult) {
                // return [key].concat(validationResult);
                errorMessages.push([
                    key
                ].concat(validationResult));
            }
        }
        if (errorMessages.length < 2) {
            return errorMessages[0];
        }
        // enumerate all the error messages
        return function(options) {
            errorMessages = errorMessages.map(function(message) {
                var key = message[0];
                var renderedMessage = processMessage(message, options).split('\n').join(NEWLINE_INDENT); // indents any inner nesting
                return '- ' + key + ': ' + renderedMessage;
            });
            var objectId = options.path.join('.');
            var ofPhrase = objectId === DEFAULT_ERROR_PATH ? '' : ' of ' + objectId;
            return 'The following properties' + ofPhrase + ' have invalid values:' + NEWLINE_INDENT + errorMessages.join(NEWLINE_INDENT);
        };
    };
};
v.strictShape = function strictShape(validatorObj) {
    var shapeValidator = v.shape(validatorObj);
    return function strictShapeValidator(value) {
        var shapeResult = shapeValidator(value);
        if (shapeResult) {
            return shapeResult;
        }
        var invalidKeys = Object.keys(value).reduce(function(memo, valueKey) {
            if (validatorObj[valueKey] === undefined) {
                memo.push(valueKey);
            }
            return memo;
        }, []);
        if (invalidKeys.length !== 0) {
            return function() {
                return 'The following keys are invalid: ' + invalidKeys.join(', ');
            };
        }
    };
};
v.arrayOf = function arrayOf(validator) {
    return createArrayValidator(validator);
};
v.tuple = function tuple() {
    var validators = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
    return createArrayValidator(validators);
};
// Currently array validation fails when the first invalid item is found.
function createArrayValidator(validators) {
    var validatingTuple = Array.isArray(validators);
    var getValidator = function(index) {
        if (validatingTuple) {
            return validators[index];
        }
        return validators;
    };
    return function arrayValidator(value) {
        var validationResult = validate(v.plainArray, value);
        if (validationResult) {
            return validationResult;
        }
        if (validatingTuple && value.length !== validators.length) {
            return 'an array with ' + validators.length + ' items';
        }
        for(var i = 0; i < value.length; i++){
            validationResult = validate(getValidator(i), value[i]);
            if (validationResult) {
                return [
                    i
                ].concat(validationResult);
            }
        }
    };
}
v.required = function required(validator) {
    function requiredValidator(value) {
        if (value == null) {
            return function(options) {
                return formatErrorMessage(options, isArrayCulprit(options.path) ? 'cannot be undefined/null.' : 'is required.');
            };
        }
        return validator.apply(this, arguments);
    }
    requiredValidator.__required = true;
    return requiredValidator;
};
v.oneOfType = function oneOfType() {
    var validators = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
    return function oneOfTypeValidator(value) {
        var messages = validators.map(function(validator) {
            return validate(validator, value);
        }).filter(Boolean);
        // If we don't have as many messages as no. of validators,
        // then at least one validator was ok with the value.
        if (messages.length !== validators.length) {
            return;
        }
        // check primitive type
        if (messages.every(function(message) {
            return message.length === 1 && typeof message[0] === 'string';
        })) {
            return orList(messages.map(function(m) {
                return m[0];
            }));
        }
        // Complex oneOfTypes like
        // `v.oneOftypes(v.shape({name: v.string})`, `v.shape({name: v.number}))`
        // are complex ¯\_(ツ)_/¯. For the current scope only returning the longest message.
        return messages.reduce(function(max, arr) {
            return arr.length > max.length ? arr : max;
        });
    };
};
/**
 * Meta Validators
 * which take options as argument (not validators)
 * and return a new primitive validator
 */ v.equal = function equal(compareWith) {
    return function equalValidator(value) {
        if (value !== compareWith) {
            return JSON.stringify(compareWith);
        }
    };
};
v.oneOf = function oneOf() {
    var options = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
    var validators = options.map(function(value) {
        return v.equal(value);
    });
    return v.oneOfType.apply(this, validators);
};
v.range = function range(compareWith) {
    var min = compareWith[0];
    var max = compareWith[1];
    return function rangeValidator(value) {
        var validationResult = validate(v.number, value);
        if (validationResult || value < min || value > max) {
            return 'number between ' + min + ' & ' + max + ' (inclusive)';
        }
    };
};
/**
 * Primitive validators
 *
 * simple validators which return a string or undefined
 */ v.any = function any() {
    return;
};
v.boolean = function boolean(value) {
    if (typeof value !== 'boolean') {
        return 'boolean';
    }
};
v.number = function number(value) {
    if (typeof value !== 'number') {
        return 'number';
    }
};
v.plainArray = function plainArray(value) {
    if (!Array.isArray(value)) {
        return 'array';
    }
};
v.plainObject = function plainObject(value) {
    if (!isPlainObject(value)) {
        return 'object';
    }
};
v.string = function string(value) {
    if (typeof value !== 'string') {
        return 'string';
    }
};
v.func = function func(value) {
    if (typeof value !== 'function') {
        return 'function';
    }
};
function validate(validator, value) {
    // assertions are optional by default unless wrapped in v.require
    if (value == null && !validator.hasOwnProperty('__required')) {
        return;
    }
    var result = validator(value);
    if (result) {
        return Array.isArray(result) ? result : [
            result
        ];
    }
}
function processMessage(message, options) {
    // message array follows the convention
    // [...path, result]
    // path is an array of object keys / array indices
    // result is output of the validator
    var len = message.length;
    var result = message[len - 1];
    var path = message.slice(0, len - 1);
    if (path.length === 0) {
        path = [
            DEFAULT_ERROR_PATH
        ];
    }
    options = xtend(options, {
        path: path
    });
    return typeof result === 'function' ? result(options) // allows customization of result
     : formatErrorMessage(options, prettifyResult(result));
}
function orList(list) {
    if (list.length < 2) {
        return list[0];
    }
    if (list.length === 2) {
        return list.join(' or ');
    }
    return list.slice(0, -1).join(', ') + ', or ' + list.slice(-1);
}
function prettifyResult(result) {
    return 'must be ' + addArticle(result) + '.';
}
function addArticle(nounPhrase) {
    if (/^an? /.test(nounPhrase)) {
        return nounPhrase;
    }
    if (/^[aeiou]/i.test(nounPhrase)) {
        return 'an ' + nounPhrase;
    }
    if (/^[a-z]/i.test(nounPhrase)) {
        return 'a ' + nounPhrase;
    }
    return nounPhrase;
}
function formatErrorMessage(options, prettyResult) {
    var arrayCulprit = isArrayCulprit(options.path);
    var output = options.path.join('.') + ' ' + prettyResult;
    var prepend = arrayCulprit ? 'Item at position ' : '';
    return prepend + output;
}
function isArrayCulprit(path) {
    return typeof path[path.length - 1] == 'number' || typeof path[0] == 'number';
}
function objectEntries(obj) {
    return Object.keys(obj || {}).map(function(key) {
        return {
            key: key,
            value: obj[key]
        };
    });
}
v.validate = validate;
v.processMessage = processMessage;
module.exports = v;
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/nanoid/url-alphabet/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// Same as in non-secure/index.js
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
module.exports = {
    urlAlphabet
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/nanoid/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

let crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
let { urlAlphabet } = __turbopack_context__.r("[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/nanoid/url-alphabet/index.cjs [app-ssr] (ecmascript)");
// It is best to make fewer, larger requests to the crypto module to
// avoid system call overhead. So, random numbers are generated in a
// pool. The pool is a Buffer that is larger than the initial random
// request size by this multiplier. The pool is enlarged if subsequent
// requests exceed the maximum buffer size.
const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
let fillPool = (bytes)=>{
    if (!pool || pool.length < bytes) {
        pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
        crypto.randomFillSync(pool);
        poolOffset = 0;
    } else if (poolOffset + bytes > pool.length) {
        crypto.randomFillSync(pool);
        poolOffset = 0;
    }
    poolOffset += bytes;
};
let random = (bytes)=>{
    // `|=` convert `bytes` to number to prevent `valueOf` abusing and pool pollution
    fillPool(bytes |= 0);
    return pool.subarray(poolOffset - bytes, poolOffset);
};
let customRandom = (alphabet, defaultSize, getRandom)=>{
    // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
    // values closer to the alphabet size. The bitmask calculates the closest
    // `2^31 - 1` number, which exceeds the alphabet size.
    // For example, the bitmask for the alphabet size 30 is 31 (00011111).
    let mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
    // Though, the bitmask solution is not perfect since the bytes exceeding
    // the alphabet size are refused. Therefore, to reliably generate the ID,
    // the random bytes redundancy has to be satisfied.
    // Note: every hardware random generator call is performance expensive,
    // because the system call for entropy collection takes a lot of time.
    // So, to avoid additional system calls, extra bytes are requested in advance.
    // Next, a step determines how many random bytes to generate.
    // The number of random bytes gets decided upon the ID size, mask,
    // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
    // according to benchmarks).
    let step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
    return (size = defaultSize)=>{
        let id = '';
        while(true){
            let bytes = getRandom(step);
            // A compact alternative for `for (let i = 0; i < step; i++)`.
            let i = step;
            while(i--){
                // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
                id += alphabet[bytes[i] & mask] || '';
                if (id.length === size) return id;
            }
        }
    };
};
let customAlphabet = (alphabet, size = 21)=>customRandom(alphabet, size, random);
let nanoid = (size = 21)=>{
    // `|=` convert `size` to number to prevent `valueOf` abusing and pool pollution
    fillPool(size |= 0);
    let id = '';
    // We are reading directly from the random pool to avoid creating new array
    for(let i = poolOffset - size; i < poolOffset; i++){
        // It is incorrect to use bytes exceeding the alphabet size.
        // The following mask reduces the random byte in the 0-255 value
        // range to the 0-63 value range. Therefore, adding hacks, such
        // as empty string fallback or magic numbers, is unneccessary because
        // the bitmask trims bytes down to the alphabet size.
        id += urlAlphabet[pool[i] & 63];
    }
    return id;
};
module.exports = {
    nanoid,
    customAlphabet,
    customRandom,
    urlAlphabet,
    random
};
}),
"[project]/Documents/GitHub/iwts-bloom-watch/frontend/node_modules/subtag/subtag.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

!function(root, name, make) {
    if (("TURBOPACK compile-time value", "object") != 'undefined' && module.exports) module.exports = make();
    else root[name] = make();
}(/*TURBOPACK member replacement*/ __turbopack_context__.e, 'subtag', function() {
    var empty = '';
    var pattern = /^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|[0-9]{3})(?=$|[_-]+))?/;
    function match(tag) {
        return tag.match(pattern) || [];
    }
    function split(tag) {
        return match(tag).filter(function(v, i) {
            return v && i;
        });
    }
    function api(tag) {
        tag = match(tag);
        return {
            language: tag[1] || empty,
            extlang: tag[2] || empty,
            script: tag[3] || empty,
            region: tag[4] || empty
        };
    }
    function expose(target, key, value) {
        Object.defineProperty(target, key, {
            value: value,
            enumerable: true
        });
    }
    function part(position, pattern, type) {
        function method(tag) {
            return match(tag)[position] || empty;
        }
        expose(method, 'pattern', pattern);
        expose(api, type, method);
    }
    part(1, /^[a-zA-Z]{2,3}$/, 'language');
    part(2, /^[a-zA-Z]{3}$/, 'extlang');
    part(3, /^[a-zA-Z]{4}$/, 'script');
    part(4, /^[a-zA-Z]{2}$|^[0-9]{3}$/, 'region');
    expose(api, 'split', split);
    return api;
});
}),
];

//# sourceMappingURL=10452_ee8ab7bb._.js.map
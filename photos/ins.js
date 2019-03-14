/******/
(function(modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId])
        /******/
            return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            exports: {},
            /******/
            id: moduleId,
            /******/
            loaded: false
            /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.loaded = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = &quot;/dist/&quot;;
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(0);
    /******/
})
/************************************************************************/
/******/
([
    /* 0 */
    /***/
    function(module, exports, __webpack_require__) {

        &apos;use strict&apos;;

        __webpack_require__(1);

        var _view = __webpack_require__(2);

        var _view2 = _interopRequireDefault(_view);

        function _interopRequireDefault(obj) {
            return obj &amp;&amp; obj.__esModule ? obj : {
                default: obj
            };
        }

        /**
         * @name impush-client
         * @description &#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x8BA9;&#x6211;&#x53D1;&#x5BB6;&#x81F4;&#x5BCC;&#x2026;
         * @date 2016-12-1
         */

        var _collection = [];
        var _count = 0;
        var searchData;

        function addMask(elem) {
            var rect = elem.getBoundingClientRect();
            var style = getComputedStyle(elem, null);

            var mask = document.createElement(&apos;i&apos;);
            mask.className = &apos;icon-film&apos;;
            mask.style.color = &apos;#fff&apos;;
            mask.style.fontSize = &apos;26px&apos;;
            mask.style.position = &apos;absolute&apos;;
            mask.style.right = &apos;10px&apos;;
            mask.style.bottom = &apos;10px&apos;;
            mask.style.zIndex = 1;
            elem.parentNode.appendChild(mask);
        }

        var createVideoIncon = function createVideoIncon() {
            var $videoImg = document.querySelectorAll(&apos;.thumb a[data-type=&quot;video&quot;]&apos;);
            for (var i = 0, len = $videoImg.length; i &lt; len; i++) {
                addMask($videoImg[i]);
            }
        };
        var render = function render(res) {
            var ulTmpl = &quot;&quot;;
            for (var j = 0, len2 = res.list.length; j &lt; len2; j++) {
                var data = res.list[j].arr;
                var liTmpl = &quot;&quot;;
                for (var i = 0, len = data.link.length; i &lt; len; i++) {
                    var minSrc = &apos;https://raw.githubusercontent.com/wugenqiang/myblog_album/master/min_photos/&apos; + data.link[i];
                    var src = &apos;https://raw.githubusercontent.com/wugenqiang/myblog_album/master/photos/&apos; + data.link[i];
                    var type = data.type[i];
                    var target = src + (type === &apos;video&apos; ? &apos;.mp4&apos; : &apos;.jpg&apos;);
                    src += &apos;&apos;;
                    liTmpl += &apos;<figure class="thumb" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">\
            <a href="&apos; + src + &apos;" itemprop="contentUrl" data-size="1080x1080" data-type="&apos; + type + &apos;" data-target="&apos; + src + &apos;">\
              <img class="reward-img" data-type="&apos; + type + &apos;" data-src="&apos; + minSrc + &apos;" src="assets/img/empty.png" itemprop="thumbnail" onload="lzld(this)">\
            </a>\
            <figcaption style="display:none" itemprop="caption description">&apos; + data.text[i] + &apos;</figcaption>\
        </figure>&apos;;
                }
                ulTmpl = ulTmpl + &apos;<section class="archives album"><h1 class="year">&apos; + data.year + &apos;&#x5E74;<em>&apos; + data.month + &apos;&#x6708;</em></h1>\
    <ul class="img-box-ul">&apos; + liTmpl + &apos;</ul>\
    </section>&apos;;
            }
            document.querySelector(&apos;.instagram&apos;).innerHTML = &apos;<div class="photos" itemscope itemtype="http://schema.org/ImageGallery">&apos; + ulTmpl + &apos;</div>&apos;;
            createVideoIncon();
            _view2.default.init();
        };

        var replacer = function replacer(str) {
            var arr = str.split(&quot;/&quot;);
            return &quot;/assets/ins/&quot; + arr[arr.length - 1];
        };

        var ctrler = function ctrler(data) {
            var imgObj = {};
            for (var i = 0, len = data.length; i &lt; len; i++) {
                var y = data[i].y;
                var m = data[i].m;
                var src = replacer(data[i].src);
                var text = data[i].text;
                var key = y + &quot;&quot; + ((m + &quot;&quot;).length == 1 ? &quot;0&quot; + m : m);
                if (imgObj[key]) {
                    imgObj[key].srclist.push(src);
                    imgObj[key].text.push(text);
                } else {
                    imgObj[key] = {
                        year: y,
                        month: m,
                        srclist: [src],
                        text: [text]
                    };
                }
            }
            render(imgObj);
        };

        function loadData(success) {
            if (!searchData) {
                var xhr = new XMLHttpRequest();
                xhr.open(&apos;GET&apos;, &apos;./data.json?t=&apos; + +new Date(), true);

                xhr.onload = function() {
                    if (this.status &gt;= 200 &amp;&amp; this.status &lt; 300) {
                        var res = JSON.parse(this.response);
                        searchData = res;
                        success(searchData);
                    } else {
                        console.error(this.statusText);
                    }
                };

                xhr.onerror = function() {
                    console.error(this.statusText);
                };

                xhr.send();
            } else {
                success(searchData);
            }
        }

        var Ins = {
            init: function init() {
                loadData(function(data) {
                    render(data);
                });
            }
        };

        Ins.init();

        // export default impush;

        /***/
    },
    /* 1 */
    /***/
    function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function(global) {
            &apos;use strict&apos;;

            var inViewport = __webpack_require__(3);
            var lazyAttrs = [&apos;data-src&apos;];

            global.lzld = lazyload();

            // Provide libs using getAttribute early to get the good src
            // and not the fake data-src
            replaceGetAttribute(&apos;Image&apos;);
            replaceGetAttribute(&apos;IFrame&apos;);

            function registerLazyAttr(attr) {
                if (indexOf.call(lazyAttrs, attr) === -1) {
                    lazyAttrs.push(attr);
                }
            }

            function lazyload(opts) {
                opts = merge({
                    &apos;offset&apos;: 333,
                    &apos;src&apos;: &apos;data-src&apos;,
                    &apos;container&apos;: false
                }, opts || {});

                if (typeof opts.src === &apos;string&apos;) {
                    registerLazyAttr(opts.src);
                }

                var elts = [];

                function show(elt) {
                    var src = findRealSrc(elt);

                    if (src) {
                        elt.src = src;
                    }

                    elt.setAttribute(&apos;data-lzled&apos;, true);
                    elts[indexOf.call(elts, elt)] = null;
                }

                function findRealSrc(elt) {
                    if (typeof opts.src === &apos;function&apos;) {
                        return opts.src(elt);
                    }

                    return elt.getAttribute(opts.src);
                }

                function register(elt) {
                    elt.onload = null;
                    elt.removeAttribute(&apos;onload&apos;);
                    elt.onerror = null;
                    elt.removeAttribute(&apos;onerror&apos;);

                    if (indexOf.call(elts, elt) === -1) {
                        inViewport(elt, opts, show);
                    }
                }

                return register;
            }

            function replaceGetAttribute(elementName) {
                var fullname = &apos;HTML&apos; + elementName + &apos;Element&apos;;
                if (fullname in global === false) {
                    return;
                }

                var original = global[fullname].prototype.getAttribute;
                global[fullname].prototype.getAttribute = function(name) {
                    if (name === &apos;src&apos;) {
                        var realSrc;
                        for (var i = 0, max = lazyAttrs.length; i &lt; max; i++) {
                            realSrc = original.call(this, lazyAttrs[i]);
                            if (realSrc) {
                                break;
                            }
                        }

                        return realSrc || original.call(this, name);
                    }

                    // our own lazyloader will go through theses lines
                    // because we use getAttribute(opts.src)
                    return original.call(this, name);
                };
            }

            function merge(defaults, opts) {
                for (var name in defaults) {
                    if (opts[name] === undefined) {
                        opts[name] = defaults[name];
                    }
                }

                return opts;
            }

            // http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
            function indexOf(value) {
                for (var i = this.length; i-- &amp;&amp; this[i] !== value;) {}
                return i;
            }

            module.exports = lazyload;

            // export default impush;
            /* WEBPACK VAR INJECTION */
        }.call(exports, (function() {
            return this;
        }())))

        /***/
    },
    /* 2 */
    /***/
    function(module, exports) {

        &apos;use strict&apos;;

        var initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM(gallerySelector) {

            // parse slide data (url, title, size ...) from DOM elements
            // (children of gallerySelector)
            var parseThumbnailElements = function parseThumbnailElements(el) {
                el = el.parentNode.parentNode;
                var thumbElements = el.getElementsByClassName(&apos;thumb&apos;),
                    numNodes = thumbElements.length,
                    items = [],
                    figureEl,
                    linkEl,
                    size,
                    type,
                    // video or not
                    target,
                    item;

                for (var i = 0; i &lt; numNodes; i++) {

                    figureEl = thumbElements[i]; //

                    // include only element nodes
                    if (figureEl.nodeType !== 1) {
                        continue;
                    }

                    linkEl = figureEl.children[0]; //

                    size = linkEl.getAttribute(&apos;data-size&apos;).split(&apos;x&apos;);
                    type = linkEl.getAttribute(&apos;data-type&apos;);
                    target = linkEl.getAttribute(&apos;data-target&apos;);
                    // create slide object
                    item = {
                        src: linkEl.getAttribute(&apos;href&apos;),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };

                    if (figureEl.children.length &gt; 1) {
                        item.title = figureEl.children[1].innerHTML;
                    }

                    if (linkEl.children.length &gt; 0) {
                        item.msrc = linkEl.children[0].getAttribute(&apos;src&apos;);
                        item.type = type;
                        item.target = target;
                        item.html = &apos;<video src="&apos; + target + &apos;" controls="controls" autoplay="autoplay"></video>&apos;;
                        if (type === &apos;video&apos;) {
                            //item.src = null;
                        }
                    }

                    item.el = figureEl; // save link to element for getThumbBoundsFn
                    items.push(item);
                }

                return items;
            };

            // find nearest parent element
            var closest = function closest(el, fn) {
                return el &amp;&amp; (fn(el) ? el : closest(el.parentNode, fn));
            };

            // triggers when user clicks on thumbnail
            var onThumbnailsClick = function onThumbnailsClick(e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                // find root element of slide
                var clickedListItem = closest(eTarget, function(el) {
                    return el.tagName &amp;&amp; el.tagName.toUpperCase() === &apos;FIGURE&apos;;
                });

                if (!clickedListItem) {
                    return;
                }

                // find index of clicked item by looping through all child nodes
                // alternatively, you may define index via data- attribute
                var clickedGallery = clickedListItem.parentNode,

                    // childNodes = clickedListItem.parentNode.childNodes,
                    // numChildNodes = childNodes.length,
                    childNodes = document.getElementsByClassName(&apos;thumb&apos;),
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

                for (var i = 0; i &lt; numChildNodes; i++) {
                    if (childNodes[i].nodeType !== 1) {
                        continue;
                    }

                    if (childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }

                if (index &gt;= 0) {
                    // open PhotoSwipe if valid index found
                    openPhotoSwipe(index, clickedGallery);
                }
                return false;
            };

            // parse picture index and gallery index from URL (#&amp;pid=1&amp;gid=2)
            var photoswipeParseHash = function photoswipeParseHash() {
                var hash = window.location.hash.substring(1),
                    params = {};

                if (hash.length &lt; 5) {
                    return params;
                }

                var vars = hash.split(&apos;&amp;&apos;);
                for (var i = 0; i &lt; vars.length; i++) {
                    if (!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split(&apos;=&apos;);
                    if (pair.length &lt; 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if (params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll(&apos;.pswp&apos;)[0],
                    gallery,
                    options,
                    items;

                items = parseThumbnailElements(galleryElement);
                // define options (if needed)
                options = {

                    // define gallery index (for URL)
                    galleryUID: galleryElement.getAttribute(&apos;data-pswp-uid&apos;),

                    getThumbBoundsFn: function getThumbBoundsFn(index) {
                        // See Options -&gt; getThumbBoundsFn section of documentation for more info
                        var thumbnail = items[index].el.getElementsByTagName(&apos;img&apos;)[0],
                            // find thumbnail
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width
                        };
                    }

                };

                // PhotoSwipe opened from URL
                if (fromURL) {
                    if (options.galleryPIDs) {
                        // parse real index when custom PIDs are used
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for (var j = 0; j &lt; items.length; j++) {
                            if (items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        // in URL indexes start from 1
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if (isNaN(options.index)) {
                    return;
                }

                if (disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();

                var $tempVideo;
                var stopVideoHandle = function stopVideoHandle() {
                    if ($tempVideo) {
                        $tempVideo.remove();
                        $tempVideo = null;
                    }
                };
                var changeHandle = function changeHandle() {
                    var item = gallery.currItem;
                    stopVideoHandle();
                    if (item.type === &apos;video&apos;) {
                        var $ctn = item.container;
                        var style = $ctn.getElementsByClassName(&apos;pswp__img&apos;)[0].style;
                        var $video = document.createElement(&apos;video&apos;);
                        $video.setAttribute(&apos;autoplay&apos;, &apos;autoplay&apos;);
                        $video.setAttribute(&apos;controls&apos;, &apos;controls&apos;);
                        $video.setAttribute(&apos;src&apos;, item.target);
                        $video.style.width = style.width;
                        $video.style.height = style.height;
                        $video.style.position = &apos;absolute&apos;;
                        $video.style.zIndex = 2;
                        $tempVideo = $video;
                        $ctn.appendChild($video);
                    }
                };
                gallery.listen(&apos;initialZoomIn&apos;, changeHandle);
                gallery.listen(&apos;afterChange&apos;, changeHandle);
                gallery.listen(&apos;initialZoomOut&apos;, stopVideoHandle);
            };

            // loop through all gallery elements and bind events
            var galleryElements = document.querySelectorAll(gallerySelector);
            for (var i = 0, l = galleryElements.length; i &lt; l; i++) {
                galleryElements[i].setAttribute(&apos;data-pswp-uid&apos;, i + 1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&amp;pid=3&amp;gid=1
            var hashData = photoswipeParseHash();
            if (hashData.pid &amp;&amp; hashData.gid) {
                openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
            }
        };

        var Viewer = function() {
            function init() {
                initPhotoSwipeFromDOM(&apos;.photos&apos;);
            }
            return {
                init: init
            };
        }();

        module.exports = Viewer;

        /***/
    },
    /* 3 */
    /***/
    function(module, exports) {

        /* WEBPACK VAR INJECTION */
        (function(global) {
            module.exports = inViewport;

            var instances = [];
            var supportsMutationObserver = typeof global.MutationObserver === &apos;function&apos;;

            function inViewport(elt, params, cb) {
                var opts = {
                    container: global.document.body,
                    offset: 0
                };

                if (params === undefined || typeof params === &apos;function&apos;) {
                    cb = params;
                    params = {};
                }

                var container = opts.container = params.container || opts.container;
                var offset = opts.offset = params.offset || opts.offset;

                for (var i = 0; i &lt; instances.length; i++) {
                    if (instances[i].container === container) {
                        return instances[i].isInViewport(elt, offset, cb);
                    }
                }

                return instances[
                instances.push(createInViewport(container)) - 1
                    ].isInViewport(elt, offset, cb);
            }

            function addEvent(el, type, fn) {
                if (el.attachEvent) {
                    el.attachEvent(&apos;on&apos; + type, fn);
                } else {
                    el.addEventListener(type, fn, false);
                }
            }

            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this,
                        args = arguments;
                    var callNow = immediate &amp;&amp; !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);

                    function later() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    }
                };
            }

            // https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
            var contains = function() {
                if (!global.document) {
                    return true;
                }
                return global.document.documentElement.compareDocumentPosition ?
                    function(a, b) {
                        return !!(a.compareDocumentPosition(b) &amp; 16);
                    } :
                    global.document.documentElement.contains ?
                        function(a, b) {
                            return a !== b &amp;&amp; (a.contains ? a.contains(b) : false);
                        } :
                        function(a, b) {
                            while (b = b.parentNode) {
                                if (b === a) {
                                    return true;
                                }
                            }
                            return false;
                        };
            }

            function createInViewport(container) {
                var watches = createWatches();

                var scrollContainer = container === global.document.body ? global : container;
                var debouncedCheck = debounce(watches.checkAll(watchInViewport), 15);

                addEvent(scrollContainer, &apos;scroll&apos;, debouncedCheck);

                if (scrollContainer === global) {
                    addEvent(global, &apos;resize&apos;, debouncedCheck);
                }

                if (supportsMutationObserver) {
                    observeDOM(watches, container, debouncedCheck);
                }

                // failsafe check, every 200ms we check for visible images
                // usecase: a hidden parent containing eleements
                // when the parent becomes visible, we have no event that the children
                // became visible
                setInterval(debouncedCheck, 150);

                function isInViewport(elt, offset, cb) {
                    if (!cb) {
                        return isVisible(elt, offset);
                    }

                    var remote = createRemote(elt, offset, cb);
                    remote.watch();
                    return remote;
                }

                function createRemote(elt, offset, cb) {
                    function watch() {
                        watches.add(elt, offset, cb);
                    }

                    function dispose() {
                        watches.remove(elt);
                    }

                    return {
                        watch: watch,
                        dispose: dispose
                    };
                }

                function watchInViewport(elt, offset, cb) {
                    if (isVisible(elt, offset)) {
                        watches.remove(elt);
                        cb(elt);
                    }
                }

                function isVisible(elt, offset) {
                    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
                        return false;
                    }

                    // Check if the element is visible
                    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
                    if (!elt.offsetWidth || !elt.offsetHeight) {
                        return false;
                    }

                    var eltRect = elt.getBoundingClientRect();
                    var viewport = {};

                    if (container === global.document.body) {
                        viewport = {
                            top: -offset,
                            left: -offset,
                            right: global.document.documentElement.clientWidth + offset,
                            bottom: global.document.documentElement.clientHeight + offset
                        };
                    } else {
                        var containerRect = container.getBoundingClientRect();
                        viewport = {
                            top: containerRect.top - offset,
                            left: containerRect.left - offset,
                            right: containerRect.right + offset,
                            bottom: containerRect.bottom + offset
                        };
                    }

                    // The element must overlap with the visible part of the viewport
                    var visible =
                        (
                            (eltRect.right &gt; viewport.left) &amp;&amp;
                            (eltRect.left &lt; viewport.right) &amp;&amp;
                            (eltRect.bottom &gt; viewport.top) &amp;&amp;
                            (eltRect.top &lt; viewport.bottom)
                        );

                    return visible;
                }

                return {
                    container: container,
                    isInViewport: isInViewport
                };
            }

            function createWatches() {
                var watches = [];

                function add(elt, offset, cb) {
                    if (!isWatched(elt)) {
                        watches.push([elt, offset, cb]);
                    }
                }

                function remove(elt) {
                    var pos = indexOf(elt);
                    if (pos !== -1) {
                        watches.splice(pos, 1);
                    }
                }

                function indexOf(elt) {
                    for (var i = watches.length - 1; i &gt;= 0; i--) {
                        if (watches[i][0] === elt) {
                            return i;
                        }
                    }
                    return -1;
                }

                function isWatched(elt) {
                    return indexOf(elt) !== -1;
                }

                function checkAll(cb) {
                    return function() {
                        for (var i = watches.length - 1; i &gt;= 0; i--) {
                            cb.apply(this, watches[i]);
                        }
                    };
                }

                return {
                    add: add,
                    remove: remove,
                    isWatched: isWatched,
                    checkAll: checkAll
                };
            }

            function observeDOM(watches, container, cb) {
                var observer = new MutationObserver(watch);
                var filter = Array.prototype.filter;
                var concat = Array.prototype.concat;

                observer.observe(container, {
                    childList: true,
                    subtree: true,
                    // changes like style/width/height/display will be catched
                    attributes: true
                });

                function watch(mutations) {
                    // some new DOM nodes where previously watched
                    // we should check their positions
                    if (mutations.some(knownNodes) === true) {
                        setTimeout(cb, 0);
                    }
                }

                function knownNodes(mutation) {
                    var nodes = concat.call([],
                        Array.prototype.slice.call(mutation.addedNodes),
                        mutation.target
                    );
                    return filter.call(nodes, watches.isWatched).length &gt; 0;
                }
            }

            /* WEBPACK VAR INJECTION */
        }.call(exports, (function() {
            return this;
        }())))

        /***/
    }
    /******/
]);<script>
        document.querySelectorAll('.github-emoji')
          .forEach(el => {
            if (!el.dataset.src) { return; }
            const img = document.createElement('img');
            img.style = 'display:none !important;';
            img.src = el.dataset.src;
            img.addEventListener('error', () => {
              img.remove();
              el.style.color = 'inherit';
              el.style.backgroundImage = 'none';
              el.style.background = 'none';
            });
            img.addEventListener('load', () => {
              img.remove();
            });
            document.body.appendChild(img);
          });
      </script>
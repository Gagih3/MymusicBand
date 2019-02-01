
jQuery.fn.PhoneMaskv2 = function (pattern, state) {
    const element = this; // element обьект jQuery на который вешается эта функция (хз поч но просто this это Node)
    const sheme = pattern; // регулярное выражение

    // check browser
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome = window.navigator.appVersion.includes("Chrome");
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    isFirefox ? document.execCommand("defaultParagraphSeparator",false,"br") : false ; // if Firefox turnoff div wrapping
    element.attr("style","white-space:pre");

    function Chrome_cursor_pos () { // work perfect in late versions of chrome
        var sel = document.getSelection();
        sel.modify("extend", "backward", "documentboundary");
        var pos = sel.toString().length;
        if(sel.anchorNode != undefined){
            sel.collapseToEnd();
        }
        return pos;
    };

    function Get_caret_pos(Node) { // it probably work fine for me
        if (Node.childNodes.length === 1) { // for fist node
            let range = document.getSelection().getRangeAt(0);
            return range.endOffset;
        }  { // if number of nodes grows up
            let range = document.getSelection().getRangeAt(0);
            let caretpos = range.cloneRange();
                caretpos.selectNodeContents(Node);
                caretpos.setEnd(range.endContainer,range.endOffset);
            return caretpos.toString().length;
        }
    }


    function Handler(e) {
        var caret;
        try {
            caret = isChrome ? Chrome_cursor_pos(): Get_caret_pos(e.target);
        } catch {
            caret = Get_caret_pos(e.target);
        }
        console.log(caret,e.target.innerText);

    }

    if (state === "bind") {
        element.bind("input", Handler);
    } else if (state === "unbind") {
        element.unbind("input", Handler);
    } else {
        throw "state get 2 options 'bind' or 'unbind'.";
    }
};
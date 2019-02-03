
jQuery.fn.PhoneMask = function (pattern, state) {
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

    function splitValue(value, index, key) { // rework it every time i press enter the index get wrong data
        let val1 = value.replace(/\s|\n/gm,"");
        let idx = index;
        if (value === "\n"){
            return key
        } else {
            let retval = val1.substring(0, idx) + key + val1.substring(idx);
            return retval.replace(/\+/gm,"\n+");
        }

    }


    var caret;
    var str = ""; // вводимый текст
    function Handler(e) {
        var key = e.key || e.originalEvent.key;
        switch (e.type) {
            case "keypress": // по нажатию клавиши
                if (!isNaN(key) || key === "-" || key === "+") {
                    try {
                        caret = isChrome ? Chrome_cursor_pos(): Get_caret_pos(e.target);
                    } catch {
                        caret = Get_caret_pos(e.target);
                    }
                    str = splitValue(e.target.innerText,caret||0,key);
                    str = str.replace(/^\n|\n$/g,"");
                    let match = str.match(sheme);
                    if (match !== null) {
                        let m = match.toString().replace(/(\,)/gm,"");
                        m = m.replace(/\+/gm,"\n+");
                        m = m.replace(/^\n|\n$/g,"");
                        if (m === str && !m.includes("+\n+")) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if (e.keyCode === 13) { // для enter

                } else {
                    return false;
                }
                break;
            case "paste": // при вставке

                break;
            default:
                break;
        }
    }



    // вешаем или снимаем 3 лиснера
    ["paste","keypress"].forEach(function (etype) {
        if (state === "bind") {
            element.bind(etype, Handler);
        } else if (state === "unbind") {
            element.unbind(etype, Handler);
        } else {
            throw "state get 2 options 'bind' or 'unbind'.";
        }
    });
};
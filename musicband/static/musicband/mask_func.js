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

    function Chrome_cursor_pos () { // work perfect in chrome
        var sel = document.getSelection();
        sel.modify("extend", "backward", "documentboundary");
        var pos = sel.toString().length;
        if(sel.anchorNode != undefined){
            sel.collapseToEnd();
        }
        return pos;
    };

    function Get_caret_pos(Node) {
        if(Node.childNodes.length === 1){ // for fist node
            let range = document.getSelection().getRangeAt(0);
            return range.endOffset;
        }else {

            return 0;
        }
    }


    function splitValue(value, index, key) {
        return value.substring(0, index) + key + value.substring(index);
    }

    var caret;
    var str = ""; // вводимый текст
    function Handler(e) {

        switch (e.type) {
            case "click":

                break;
            case "keyup": // по поднятию клавиши
                    caret = isChrome ? Chrome_cursor_pos(): "";
                    str = splitValue(e.target.innerText,caret || 0,e.key);
                    console.log(Get_caret_pos(e.target));
                break;
            case "keypress": // по нажатию клавиши
                var key = e.key || e.originalEvent.key;
                if (!isNaN(key) || key === "-" || key === "+") {
                    str = splitValue(e.target.innerText,caret || 0,e.key);
                    let match = str.match(sheme);
                    if (match !== null) {
                        let m = match.toString().replace(/(\,)/gm,"");
                        if (m === str.replace(/Enter|\r?\n|\r/g,"")) {
                            return true;
                        } else {
                            // return false;
                        }
                    } else {
                        // return false;
                    }
                } else if (e.keyCode === 13) { // для enter

                } else {
                    // return false;
                }
                break;
            case "paste": // при вставке

                break;
            default:
                break;
        }
    }



    // вешаем или снимаем 3 лиснера
    ["paste","keypress","keyup","click"].forEach(function (etype) {
        if (state === "bind") {
            element.bind(etype, Handler);
        } else if (state === "unbind") {
            element.unbind(etype, Handler);
        } else {
            throw "state get 2 options 'bind' or 'unbind'.";
        }
    });
};
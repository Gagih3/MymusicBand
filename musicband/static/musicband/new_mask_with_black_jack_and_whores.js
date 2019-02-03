jQuery.fn.PhoneMaskv2 = function (pattern, state) {
    const element = this; // element обьект jQuery на который вешается эта функция (хз поч но просто this это Node)
    const sheme = pattern; // регулярное выражение
    document.execCommand("defaultParagraphSeparator",false,"br");

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
        if (e.type === "input") {
            var text = e.target.innerText;
            var matches = text.match(sheme) === null ? "" : text.match(sheme);
            matches = matches.toString().replace(/\,/gm, "\n");
            if (matches !== text.replace(/\n$/gm, "")) { //
                $(e.target).css("color","red");
            } else {
                $(e.target).css("color","green")
            }
        } else {
            if (/[^0-9\+\-]/.test(e.key) && e.key !== "Enter"){
                return false;
            }
        }
    }

    if (state === "bind") {
        element.bind("input keypress", Handler);
    } else if (state === "unbind") {
        element.unbind("input keypress", Handler);
    } else {
        throw "state get 2 options 'bind' or 'unbind'.";
    }
};
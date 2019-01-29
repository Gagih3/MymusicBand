jQuery.fn.PhoneMask = function (pattern, state) {
    const element = this; // element обьект jQuery на который вешается эта функция (хз поч но просто this это Node)
    const sheme = pattern; // регулярное выражение
    var caret;
    var str = ""; // вводимый текст
    function getCaretPosition() { // получить позицию коретки
          if (window.getSelection && window.getSelection().getRangeAt) {
                var range = window.getSelection().getRangeAt(0);
                var selectedObj = window.getSelection();
                var rangeCount = 0;
                var childNodes = selectedObj.anchorNode.parentNode.childNodes;
                for (var i = 0; i < childNodes.length; i++) {
                    if (childNodes[i] == selectedObj.anchorNode) {
                        break;
                    }
                    if (childNodes[i].outerHTML) {
                        rangeCount += childNodes[i].outerHTML.length;
                    } else if (childNodes[i].nodeType == 3) {
                        rangeCount += childNodes[i].textContent.length;
                    }
                }
                return range.startOffset + rangeCount;
            }
            return -1;
        }

    function splitValue(value, index, key) {
        return value.substring(0, index) + key + value.substring(index);
    }

    function Handler(e) {

        switch (e.type) {
            case "keyup": // по поднятию клавиши
                    caret = getCaretPosition();
                    str = splitValue(e.target.innerText,caret || 0,e.key);
                break;
            case "keypress": // по нажатию клавиши
                if (!isNaN(e.key) || e.keyCode === 43 || e.keyCode === 45) { // с числами по стабильнее но в целом 0-1ms
                    str = splitValue(e.target.innerText,caret || 0,e.key);
                    let m_result = "";
                    let i_result = "";
                    let m;
                    while ((m = sheme.exec(str)) !== null) {
                        if (m.index === sheme.lastIndex) {
                            sheme.lastIndex++;
                        }

                        m.forEach((match) => {
                            if (match !== undefined) {
                                console.log(match,typeof match);
                                m_result = match;
                                i_result = m.input.replace(/Enter|\r?\n|\r/g,"");
                            }
                        });
                    }
                    console.log(m_result,i_result);
                    if (m_result === i_result && m_result !== ""){
                        return true;
                    } else {
                        // return false;
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
    ["paste","keypress","keyup"].forEach(function (etype) {
        if (state === "bind") {
            element.bind(etype, Handler);
        } else if (state === "unbind") {
            element.unbind(etype, Handler);
        } else {
            throw "state get 2 options 'bind' or 'unbind'.";
        }
    });
};
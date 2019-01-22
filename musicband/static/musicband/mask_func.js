function setCaret(obj,row_index,caret_index) { // перемещение каретки на заданный идекс
    var range = document.createRange();
    var selection = window.getSelection();
    range.setStart(obj.childNodes[row_index],caret_index);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range)
}

var targ = $("#11");
var text1 = "+7-";
var text2 = "-";
$(targ).bind("keydown",function (event) {
    event.preventDefault(); // предотвращает стандартные действия(не пишет буквы)
    if (!isNaN(event.key)){ // позволяет вводить только числа
        if (text1.length != 8){
            text1 += event.key;
        }else{
            if(text2.length != 6){
                text2 += event.key;
            }
        }
        if (text2 == "-"){
            event.target.innerText = `${text1}`;
        } else{
            event.target.innerText = `${text1}${text2}`;
        }
    }

    if (event.keyCode == 13 && tel.exec(event.target.innerText) != null){ // Enter pressed
        event.target.innerHTML += "<br>\n"+"<br>";
        setCaret(event.target,2,0)
    }
});


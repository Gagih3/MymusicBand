function setCaret(obj,row_index,caret_index) { // перемещение каретки на заданный идекс
    var range = document.createRange();
    var selection = window.getSelection();
    range.setStart(obj.childNodes[row_index],caret_index);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range)
}

var targ = $("#11");
var pattern = "+7-_____-_____";
var row_couner = 0;
var caret_couner = 3;
$(targ).bind("keydown",function (event) {
    var target = event.target;
    event.preventDefault(); // предотвращает стандартные действия(не пишет буквы)
    if (!isNaN(event.key)){ // позволяет вводить только числа
        pattern = pattern.replace("_",event.key);
        caret_couner++;
        if(row_couner == 0){
            target.innerHTML = "<div>"+ pattern.slice(0,caret_couner) + "</div>";
        }else{
            target.childNodes[row_couner].innerText = pattern.slice(0,caret_couner);
        }
    }else{
        switch (event.keyCode){
            case 13: // enter
                if(tel.exec(pattern)){ // pattern refresh if it full
                    pattern = pattern.replace(/\d{5}-\d{5}/,"_____-_____");
                    row_couner ++; // row append
                    caret_couner = 3; //caret move
                    $(target).append("<div></div>");
                }
                break;
            case 8: // backspace

                break;
            case 17 && 86: // ctrl + v

                break;
            default:
                break;
        }
    }
});


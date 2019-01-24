function setCaret(obj,row_index,caret_index) { // перемещение каретки на заданный идекс
    var range = document.createRange();
    var selection = window.getSelection();
    range.setStart(obj.childNodes[row_index],caret_index);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range)
}

var targ = $("#11");
const tel = /^\+7-\d{5}-\d{5}$/; //регулярка телефона российского
var pattern = "+7-_____-_____";
var row_couner = 0;
var caret_couner = 3;
$(targ).bind("keydown",function (event) {
    var target = event.target;
    event.preventDefault(); // предотвращает стандартные действия(не пишет буквы)
    if (!isNaN(event.key)){ // позволяет вводить только числа
        pattern = pattern.replace("_",event.key);
        caret_couner < 13 ? caret_couner++ : caret_couner;
        if(row_couner === 0){
            target.innerHTML = "<div>"+ pattern.slice(0,caret_couner >= 8 ? caret_couner + 1: caret_couner) + "</div>";
            console.log(caret_couner)
        }else{
            target.childNodes[row_couner].innerText = pattern.slice(0,caret_couner >= 8 ? caret_couner + 1: caret_couner);
        }
    }else{
        switch (event.keyCode){
            case 13: // enter
                if(tel.test(pattern)){ // pattern refresh if it full
                    pattern = pattern.replace(/\d{5}-\d{5}/,"_____-_____");
                    row_couner ++; // row append
                    caret_couner = 3; //caret move
                    $(target).append("<div></div>");
                }
                break;
            case 8: // backspace
                if(row_couner == 0){
                    caret_couner === 3 ? caret_couner : caret_couner--;
                    pattern = pattern.replace(/\d(?=_)|\d$|\d(?=-_{5}$)/,"_");
                    target.innerText = pattern.slice(0,caret_couner <= 8 ? caret_couner : caret_couner +1);
                    console.log(caret_couner)
                }else{
                    caret_couner === 3 ? caret_couner : caret_couner--;
                    pattern = pattern.replace(/\d(?=_)|\d$|\d(?=-_{5}$)/,"_");
                    target.childNodes[row_couner].innerText = pattern.slice(0,caret_couner <= 8 ? caret_couner : caret_couner +1);
                    console.log(caret_couner)
                }
                break;
            case 17 && 86: // ctrl + v

                break;
            default:
                break;
        }
    }
});


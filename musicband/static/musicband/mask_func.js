var targ = $("#11").children()[2];

jQuery.fn.PhoneMask = function (pattern) {
    const element = this; // element обьект jQuery на который вешается эта функция (хз поч но просто this это Node)
    var text = "";
    function Handler(e) {
        switch (e.type){
            case "keyup": // по поднятию клавиши
                text = e.target.innerText.replace(/Enter|\r?\n|\r/g,"");
                console.log(text);
                break;
            case "keypress": // по нажатию клавиши
                if(!isNaN(e.key) || e.keyCode === 43 || e.keyCode === 45){ // с числами по стабильнее но в целом 0-1ms
                    console.time("comparison");
                    text = (e.target.innerText).replace(/Enter|\r?\n|\r/g,""); // то что уже есть в поле


                    console.timeEnd("comparison")
                } else if (e.keyCode === 13){ // для enter
                    // if (text.includes("\n")){
                    //     e.preventDefault();
                    // }
                } else {
                    e.preventDefault();
                }
                break;
            case "paste": // при вставке

                break;
            default:
                break;
        }
    }


    if(typeof pattern === "string"){
       //add three event listeners
        ["paste","keypress","keyup"].forEach(function (etype) {
            if (this.addEventListener){
                this.addEventListener(etype,Handler,false);
            } else if (this.attachEvent){
                this.attachEvent(etype,Handler);
            }
        });
    }else {
        throw "pattern must be string like +_-_____-_____ as you see _ underscore is placeholder for number";
    }
};

$(targ).PhoneMask("+_-_____-_____");
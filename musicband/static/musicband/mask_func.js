const new_regex = /(?:^\+|(?<=\+)\d|(?<=\+\d)\-|(?<=\-)\d{1,5}|(?<=\+\d\-\d{5})\-)/gm;
var targ = $("#11");
const allowed_keys = [13,40,43,45,48,49,50,51,52,53,54,55,56,57];
$(targ).keypress(function (e) {
    if(allowed_keys.includes(e.keyCode)){ // разрешает вводить только цифры и + -
        var str = e.target.innerText + e.key; // строка для сравнения (падает правильно все)
        let m_result = "";
        let i_result = "";
        let m;
        while ((m = new_regex.exec(str)) !== null) {
            if (m.index === new_regex.lastIndex) {
                new_regex.lastIndex++;
            }
            m.forEach((match) => {
                m_result+=match;
                i_result=m.input.replace(/Enter|\r?\n|\r/g,"");
            });
        }
        if(m_result==i_result && m_result !== ""){
            return true;
        }else{
            return false;
        }
    }else {
        return false;
    };
});


const new_regex = /(?:^\+|(?<=\+)\d|(?<=\+\d)\-|(?<=\-)\d{1,5}|(?<=\+\d\-\d{5})\-)/gm;
var targ = $("#11");
const allowed_keys = [187,189,48,49,50,51,52,53,54,55,56,57,107,109];
const meta_keys = [8,13,17,37,38,39,40,46];
$(targ).keydown(function (e) {
    let ctrl_v = e.ctrlKey && e.keyCode === 86,ctrl_z = e.ctrlKey && e.keyCode === 90,ctrl_c = e.ctrlKey && e.keyCode === 67;
    if (ctrl_c || ctrl_z || ctrl_v || meta_keys.includes(e.keyCode)){ // стандартные команды
        return true
    }
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
        console.log(i_result);
        if(m_result===i_result && m_result !== ""){
            return true;
        }else{
            return false;
        }
    }else {
        return false;
    }
});


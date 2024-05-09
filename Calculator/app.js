var input = decument.getElementById('inputBox');
var buttons = document.querySelectorAll('button');

var string = "";
var arr = Array.from(buttons);
arr.forEch(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
        }
    })
})
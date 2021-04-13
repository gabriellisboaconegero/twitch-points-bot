
function openSetting(){
    if (this.className.indexOf("active") == -1){
        let current = document.getElementsByClassName("active");
        if (current.length){
            current[0].className = current[0].className.replace(" active", "");
        }
    }
    this.classList.toggle('active');
}
let o = document.getElementsByClassName("setting-name")
for (let i = 0; i < o.length; i++){
    o[i].addEventListener("click", openSetting);
}
function warning(elm){
    console.log(elm.checked);
    if (elm.checked){
        elm.parentNode.nextElementSibling.className += ' show';
    }else{
        elm.parentNode.nextElementSibling.className = elm.parentNode.nextElementSibling.className.replace(" show", "");
    }
}


function openSetting(){
    if (this.className.indexOf("active") == -1){
        let current = document.getElementsByClassName("active");
        if (current.length){
            current[0].className = current[0].className.replace(" active", "");
        }
    }
    this.classList.toggle('active');
    scrollindicator(this);
}

function warning(){
    if (this.checked){
        this.parentNode.nextElementSibling.className += ' show';
    }else{
        this.parentNode.nextElementSibling.className = this.parentNode.nextElementSibling.className.replace(" show", "");
    }
}

function scrollindicator(elm){
    var winScroll = document.body.scrollTop || elm.scrollTop
    var height = elm.scrollHeight - elm.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-ind').style.width = (scrolled + (scrolled <= 95? 5: 0)) + "%";
}
let o = document.getElementsByClassName("setting-name");
for (let i = 0; i < o.length; i++){
    o[i].addEventListener("click", openSetting);
}
let al = document.getElementsByClassName("warning");
for (let i = 0; i < al.length; i++) {
    al[i].previousElementSibling.firstElementChild.addEventListener("input", warning);    
}

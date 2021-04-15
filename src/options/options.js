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

function scrollindicator(){
    var winScroll = document.body.scrollTop || this.scrollTop
    var height = this.scrollHeight - this.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-ind').style.width = (scrolled + (scrolled <= 95? 5: 0)) + "%";
}

function addStreamer(){
    if (this.channelName.value === ''){
        alert("coloque um nome");
        this.parentNode.parentNode.previusElementSibling.classList.add("active");
        return;
    }
    chrome.storage.sync.get(['channelsData', "settings"], results => {
        let data = results.channelsData;
        let defaultSettings = results.settings;
        data.push(
            {
                name: this.channelName.value,
                image: "<img src='https://static-cdn.jtvnw.net/channel-points-icons/166681140/7160e8ba-bf7c-45c9-9902-c7212dc58e30/icon-1.png' width='15px' height='15px'>",
                points: "150",
                pointsName: "Esmeroldiers",
                online: true,
                settings: {
                    audio: defaultSettings.audio,
                    farm: defaultSettings.farm,
                    raid:defaultSettings.raid
                }                   
            },
        );
        chrome.storage.sync.set({channelsData: data}, main);
    });
}

let o = document.getElementsByClassName("setting-name");
for (let i = 0; i < o.length; i++){
    o[i].addEventListener("click", openSetting);
}
let al = document.getElementsByClassName("warning");
for (let i = 0; i < al.length; i++) {
    al[i].previousElementSibling.firstElementChild.addEventListener("input", warning);    
}
document.getElementsByClassName("scroll")[0].nextElementSibling.addEventListener("scroll", scrollindicator);

document.forms.novoCanal.addEventListener("submit", addStreamer);

function main(){
    chrome.storage.sync.get(['channelsData', "settings"], results => {
        let data = results.channelsData;
        let streamersContent = streamersTemplate(data);
        document.querySelector('.settings .setting-content').innerHTML = streamersContent;
    });
}
main();

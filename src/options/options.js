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

function addStreamer(event){
    let newChannel = this.channelName.value;
    if (newChannel === ""){
        event.preventDefault();
        console.log("coloque um nome");
        return;
    }

    chrome.storage.sync.get(["channelsData", "settings"], data => {
        let channelsData = data.channelsData;
        let defaultSettings = data.settings;
        channelsData.push(
            {
                "name": newChannel,
                "image": "<svg type='color-fill-current' width='20px' height='20px' version='1.1' viewBox='0 0 20 20' x='0px' y='0px' class='ScSvg-sc-1j5mt50-1 jLaQtw'><g><path d='M10 6a4 4 0 014 4h-2a2 2 0 00-2-2V6z'></path><path fill-rule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z' clip-rule='evenodd'></path></g></svg>",
                "points": 0,
                "pointsName": undefined,
                "online": false,
                "settings": {
                    "audio": defaultSettings.audio,
                    "farm": defaultSettings.farm,
                    "raid":defaultSettings.raid
                }
            }
        );
        chrome.storage.sync.set({channelsData});
        main();
    });

    

}

function main(){
    chrome.storage.sync.get(['channelsData', "settings"], results => {
        let data = results.channelsData;
        let streamersContent = streamers(data);
        document.querySelector('.settings .setting-content').innerHTML = streamersContent;

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
    });
}
main();

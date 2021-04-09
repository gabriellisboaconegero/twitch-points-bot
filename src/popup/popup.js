chrome.storage.sync.get(["channelsData", "watchingNow"], function(data){
    // open settings
    document.getElementsByClassName("settings")[0].addEventListener("click", settings);

    //canais que estão no storage
    const channels = data.channelsData;
    //canal sendo visto agr
    const watching = data.watchingNow;

    if (!channels.length){
        let ul = document.createElement("ul");
        ul.innerHTML = popupHTML(channels)
        document.getElementsByTagName("main")[0].appendChild(ul);
        // adiciona o evento de click na div para poder mudar o watchingNow do storage
        for (const channelName in channels) {
            document.getElementsByClassName(channelName)[0].addEventListener("click", function(element){
                if (channelName !== watching){
                    chrome.runtime.sendMessage({"msg": "select_and_move_to_tab", channelName, wasWatching:watching});
                }
            });
        }
    }
    else{
        document.getElementsByTagName("main")[0].innerHTML = `
            <div class="ch off">
                <span>No channels in live</span>
            </div>`;
    }

    // pega o canal que está sendo assistido agr e seta uma nova backgroundColor e um img de sound
    if (watching !== 'none'){
        let chosen = document.getElementsByClassName(watching)[0];
        chosen.style.backgroundColor = "#c347c7";
        chosen.firstElementChild.insertAdjacentHTML("beforeend", `<img src="../icons/volume.png" alt="volume">`);
    }
});

function settings(){
    chrome.tabs.create({url: chrome.runtime.getURL("../options/options.html")});
}
chrome.storage.sync.get(["channelsData", "watchingNow"], function(data){
    const channels = data.channelsData;
    const watching = data.watchingNow;

    var template = '';

    for (const channelName in channels) {

        let channelData = channels[channelName];
        console.log(channelData);
        
        if (channelData.online){
            let image = channelData.image;
            let isChannelFarming = channelData.farming
            let channelPoints = channelData.points;
            let channelPointsName = channelData.pointsName;
            let templateString = `
                <li>
                    <div class="ch ${channelName}">

                        <div class="ch-name ch-flex">
                            <img src="../icons/${isChannelFarming}.png" alt="${isChannelFarming? 'checked': 'unchecked'}">
                            <span>${channelName}</span>
                        </div>

                        <div class="ch-pts ch-flex" title="${channelPointsName}">
                            ${image}
                            <span>${channelPoints}</span>
                        </div>

                        <div style="clear:both"></div>
                    </div>
                </li>
            `;

            template += templateString;
        }
        
    }
    document.getElementsByTagName('ul')[0].innerHTML += template;

    for (const channelName in channels) {
        document.getElementsByClassName(channelName)[0].addEventListener("click", function(element){
            if (channelName !== watching){
                chrome.runtime.sendMessage({"msg": "select_and_move_to_tab", channelName, wasWatching:watching});
            }
        });
    }

    let chosen = document.getElementsByClassName(watching)[0];
    chosen.style.backgroundColor = "#c347c7";
    chosen.firstElementChild.insertAdjacentHTML("beforeend", `<img src="../icons/volume.png" alt="volume">`);
});
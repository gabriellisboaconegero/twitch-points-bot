chrome.storage.sync.get(["channelsData", "watchingNow"], function(data){
    //canais que estão no storage
    const channels = data.channelsData;
    //canal sendo visto agr
    const watching = data.watchingNow;

    document.getElementsByTagName('ul')[0].innerHTML += popupHTML(channels);

    // adiciona o evento de click na div para poder mudar o watchingNow do storage
    for (const channelName in channels) {
        document.getElementsByClassName(channelName)[0].addEventListener("click", function(element){
            if (channelName !== watching){
                chrome.runtime.sendMessage({"msg": "select_and_move_to_tab", channelName, wasWatching:watching});
            }
        });
    }

    // pega o canal que está sendo assistido agr e seta uma nova backgroundColor e um img de sound
    let chosen = document.getElementsByClassName(watching)[0];
    chosen.style.backgroundColor = "#c347c7";
    chosen.firstElementChild.insertAdjacentHTML("beforeend", `<img src="../icons/volume.png" alt="volume">`);
});

function popupHTML(channels){
    var template = '';

    // para cada canal e vai pegar e criar uma string template de como deve ser o html
    for (const channelName in channels) {

        let channelData = channels[channelName];
        console.log(channelData);
        
        if (channelData.online){
            // essa image pode ser tanto img ou svg, por isso as configurações são setadas antes
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
    // retorna o template do html completo
    return template;
}
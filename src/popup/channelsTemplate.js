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
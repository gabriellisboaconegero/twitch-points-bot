function popupHTML(channels){
    var template = '';

    // para cada canal e vai pegar e criar uma string template de como deve ser o html
    for (const channel of channels) {      
        if (channel.online){
            // essa image pode ser tanto img ou svg, por isso as configurações são setadas antes
            let image = channel.image;
            let isChannelFarming = channel.settings.farm;
            let channelPoints = channel.points;
            let channelPointsName = channel.pointsName;
            let templateString = `
                <li>
                    <div class="ch ${channel.name}">

                        <div class="ch-name ch-flex">
                            <img src="../icons/${isChannelFarming}.png" alt="${isChannelFarming? 'checked': 'unchecked'}">
                            <span>${channel.name}</span>
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
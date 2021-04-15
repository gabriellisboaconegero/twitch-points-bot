function streamersTemplate(data){
    let template;
    if (data.length !== 0){
        template = '<ul>' + data.reduce((template, channel, index, array) => {
            let audio = channel.settings.audio? "checked": '';
            let farm = channel.settings.farm? "checked": '';
            let raid = channel.settings.raid? "checked": '';
            let streamerTemplate = `
            <li>
                <div class="ch">
                    <div class="ch-name">
                        <span>${channel.name[0].toUpperCase() + channel.name.slice(1)}</span>
                    </div>
                    <div class="ch-pts ch-flex" title="channelPointsName">
                        ${channel.image}
                        <span>${channel.points}</span>
                    </div>
                    <div class="ch-settings">
                        <ul>
                            <li>
                                <div class="setting-container sound">
                                    <div class="setting">
                                        <label for="channelSound-${channel.name}">Deixar áudio fechado ao abrir a aba</label>
                                    </div>
                                    <div class="switch">
                                        <input type="checkbox" name="channelSound" id="channelSound-${channel.name} "${audio}>
                                        <label for="channelSound-${channel.name}" class="slider"></label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="setting-container farm">
                                    <div class="setting">
                                        <label for="channelFarming-${channel.name}">Habiliatar farming nesse streamer</label>
                                    </div>
                                    <div class="switch">
                                        <input type="checkbox" name="channelFarming" id="channelFarming-${channel.name}" ${farm}>
                                        <label for="channelFarming-${channel.name}" class="slider"></label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="setting-container raid-farm">
                                    <div class="setting">
                                        <label for="channelRaidFarm-${channel.name}">Farmar pontos em uma raid</label>
                                    </div>
                                    <div class="switch">
                                        <input type="checkbox" name="channelRaidFarm" id="channelRaidFarm-${channel.name}" ${raid}>
                                        <label for="channelRaidFarm-${channel.name}" class="slider"></label>
                                    </div>
                                    <div class="warning ${channel.name}">
                                        <div class="message">
                                            <span>Se você habilitar essa opção, o canal da raid será adicionado ao seus canais de farm</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            `; 
            return template + streamerTemplate;
        }, '') + "</ul>";       
    }else{
        template = `<p>nenhum canal</p>`
    }
    return template;
}
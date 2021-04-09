const muteUnmuteCommand =  `document.querySelector("button[data-a-target='player-mute-unmute-button']").click();`

chrome.runtime.onInstalled.addListener(() => {
    let channelsData = getChannelsData();
    chrome.storage.sync.set({channelsData: channelsData, watchingNow: 'button'}, function(){
        console.log("Channesldata valued to", channelsData);
    });
});

function toglleSound(tab){
    setTimeout(chrome.tabs.executeScript(tab[0].id, {
        code: muteUnmuteCommand
    }), 5000);
    
}

function selectChannel(channelName, wasWatching){
    chrome.tabs.query({url: `*://*.twitch.tv/${channelName}`}, function(tab){
                    if (!tab.length){
                        chrome.tabs.create({active: true, url: `https://www.twitch.tv/${channelName}`}, toglleSound);
                    }else{
                        chrome.tabs.update(tab[0].id, {active: true, muted: false}, toglleSound);
                    }
                    chrome.storage.sync.set({watchingNow:channelName}, function(){
                        chrome.tabs.query({url: `*://*.twitch.tv/${wasWatching}`}, toglleSound);
                    });
                }); 
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.msg == "select_and_move_to_tab"){
            selectChannel(request.channelName, request.wasWatching);
        }
});

function getChannelsData(){
    let data = {
        jukiaq:{
                image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/166681140/7160e8ba-bf7c-45c9-9902-c7212dc58e30/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
                farming: true,
                points: '150',
                pointsName: 'Esmeroldiers',
                online: true
            },
        jessjessjessu:{
                image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/95009092/dd7e4104-dc63-4204-909b-056a817ab59b/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
                farming: false,
                points: '9.8 mil',
                pointsName: 'Não sei',
                online: true
            },
        einbru: {
                image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/470224575/b7a97335-572f-486f-bdae-3610ee23c3ac/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
                farming: false,
                points: '340',
                pointsName: 'Bruédas',
                online: true
            },
        knadez: {
                image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/48816734/f7129ae2-4974-47dd-998e-c70a19a4c783/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
                farming: true,
                points: '560',
                pointsName: 'KnadezPoints',
                online: true
            },
        Gaules: {
                image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/47125717/0447e333-9ea8-41b3-8605-94f0559a9b59/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
                farming: false,
                points: '20 mil',
                pointsName: 'Dletinhos',
                online: true
            },
        button: {
                image: `<svg type="color-fill-current" width="20px" height="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScSvg-sc-1j5mt50-1 jLaQtw"><g><path d="M10 6a4 4 0 014 4h-2a2 2 0 00-2-2V6z"></path><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" clip-rule="evenodd"></path></g></svg>`,
                farming: true,
                points: '250',
                pointsName: 'Buts',
                online: true
            }
    };
    return data;
}
// verificar se o script está na aba
function scriptIsInPage(tab){
    console.log(tab);
    setTimeout(function(){
        chrome.tabs.sendMessage(tab.id, {question: "are_u_there"}, function(response){
            console.log(tab, response);
            if (chrome.runtime.lastError){
                response = {};
            } 
            if (response.awnser === "yes"){
                console.log('já foi adicionado');
            }else{
                console.log('não ta na page');
                chrome.tabs.executeScript(tab.id, {file: "auto_click.js"});
            }
        });
    }, 5000);   
}

function openPages(){
    setTimeout(function(){
        chrome.storage.sync.get("channelsData", function(data){
            let channels = data.channelsData;
            for (channel of channels){
                if (channel.farming && channel.online){
                    selectChannel(channel.name, scriptIsInPage, false);
                }
            }
        });
    } ,1000);
    return true;
}

// Ao instalar, fazer update ou update do google cgrome ela vai ser cahamada, seta os valores iniciais dos canais
chrome.runtime.onInstalled.addListener(() => {
    let channelsData = getChannelsData();
    chrome.storage.sync.set({channelsData: channelsData, watchingNow: "none"}, function(){
        console.log("Channesldata valued to", channelsData);
    });
});

// seleciona o canal
function selectChannel(channelName, cb=function(tab){console.log(tab)}, active=true){
    chrome.tabs.query({url: `*://*.twitch.tv/${channelName}`}, function(tab){
        if (!tab.length){
            chrome.tabs.create({active: active, url: `https://www.twitch.tv/${channelName}`}, cb);
        }
        else{
            chrome.tabs.update(tab[0].id, {active: true, muted: false}, cb);
        }
        chrome.storage.sync.set({watchingNow:channelName}, function(){
            console.log(channelName);
        });
    }); 
}


// onMesage handler
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse){
    console.log(request);
    // selecionar aba
    if (request.msg == "select_and_move_to_tab"){
            selectChannel(request.channel);
    }
    // update pontos de canal
    if (request.msg === "update-channel-points"){
        sendResponse({msg: "deu certo"});
        chrome.storage.sync.get("channelsData", channelsData => {
            let channels = channelsData.channelsData;
            let channel = channels.filter((value, index, array) => {return value.name === request.name})[0]
            let id = channels.indexOf(channel);
            console.log('old', channels[id]);
            channels[id].points = request.points;
            console.log('new', channels[id]);
            chrome.storage.sync.set({channelsData: channels}, () => {});
        });
    }
    return true;
});

// função temporaria que será substituida, mas a função é retornar uma objeto com as especificações do canal
function getChannelsData(){
    let data = [
        {
            name: "danielhe4rt",
            image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/166681140/7160e8ba-bf7c-45c9-9902-c7212dc58e30/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
            farming: false,
            points: '150',
            pointsName: 'Esmeroldiers',
            online: true
        },
        {
            name: "DletGamer",
            image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/95009092/dd7e4104-dc63-4204-909b-056a817ab59b/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
            farming: true,
            points: '9.8 mil',
            pointsName: 'Não sei',
            online: true
        },
        {
            name: "einebru",
            image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/470224575/b7a97335-572f-486f-bdae-3610ee23c3ac/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
            farming: false,
            points: '340',
            pointsName: 'Bruédas',
            online: true
        },
        {
            name: "JonBams",
            image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/48816734/f7129ae2-4974-47dd-998e-c70a19a4c783/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
            farming: false,
            points: '560',
            pointsName: 'KnadezPoints',
            online: true
        },
        {
            name: "maiconkusterkay",
            image: `<img src="https://static-cdn.jtvnw.net/channel-points-icons/47125717/0447e333-9ea8-41b3-8605-94f0559a9b59/icon-1.png" alt="{channelPointsName}" width="15px" height="15px">`,
            farming: false,
            points: '20 mil',
            pointsName: 'Dletinhos',
            online: true
        },
        {
            name: "button",
            image: `<svg type="color-fill-current" width="20px" height="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScSvg-sc-1j5mt50-1 jLaQtw"><g><path d="M10 6a4 4 0 014 4h-2a2 2 0 00-2-2V6z"></path><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" clip-rule="evenodd"></path></g></svg>`,
            farming: false,
            points: '250',
            pointsName: 'Buts',
            online: true
        }
    ];
    return data;
}

function main(){
    console.log("Iniciando extesão");
    openPages();
}

main();
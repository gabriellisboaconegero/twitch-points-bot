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
                if (channel.settings.farm && channel.online){
                    selectChannel(channel.name, scriptIsInPage, false);
                }
            }
        });
    } ,1000);
}

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

// função temporaria que será substituida, mas a função é retornar uma objeto com as especificações do canal
async function setData(){
    let data = await fetch("options.json")
        .then(results => results.json())
        .then(data => {return data;}); 

    console.log(data);
    let channelsData = data.channelsData;
    let watchingNow = data.watchingNow;
    let active = data.active;
    let settings = data.settings;

    chrome.storage.sync.set({channelsData, watchingNow, active, settings}, () => {});
    return;
}
// Ao instalar, fazer update ou update do google cgrome ela vai ser cahamada, seta os valores iniciais dos canais
// chrome.runtime.onInstalled.addListener(getData);

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

function main(){
    chrome.storage.sync.clear(async () => {
        await setData();
        chrome.storage.sync.get('active', data => {
            if (data.active){
                console.log("Iniciando extesão");
                openPages();
            }
        });
    });   
}

main();
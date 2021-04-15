// manda resposta se tiver na aba
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request, sender);
    if (request.question === "are_u_there"){
        sendResponse({awnser: 'yes'});
    }
    
});

function update_channel_points(elm){
    elm = elm || document.querySelector(".community-points-summary .channel-points-icon");
    let points = elm.parentNode.nextSibling.innerText;
    let channelName = document.URL.slice(document.URL.lastIndexOf('/')+1, document.URL.length);
    console.log("novos pontos", points, channelName);
    chrome.extension.sendMessage({msg: 'update-channel-points', name: channelName, points}, (response) => {
        console.log("mensagem enviada", response);
    });     
}

// espera o elemento aparecer na tela
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
// espera o eleemento desaparecer da tela
function waitForElmToLeft(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector) == null) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector) == null) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function colectPoints(elm){
    let pointsBtn = elm.parentNode.parentNode;
    console.log("apareceu o botão", pointsBtn);
    pointsBtn.click();
    update_channel_points();
    // espera o botão desaparecer para só então verificar quando vai aparecer denovo
    waitForElmToLeft(".claimable-bonus__icon").then(() => {    
            console.log("Elemento desapareceu");
            conectObserver();
    }).catch((reason) => console.log(reason));
}

function conectObserver(){
    console.log("iniciando observer");
    waitForElm(".claimable-bonus__icon").then(colectPoints);
}

function main(){
    setTimeout(function(){
        conectObserver();
        waitForElm(".community-points-summary .channel-points-icon").then(update_channel_points);
    }, 10000);
}

main();
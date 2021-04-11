chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request, sender);
    if (request.question === "are_u_there"){
        sendResponse({awnser: 'yes'});
    }
    
});


function update_channel_points(){
        let points = document.querySelector(".community-points-summary .channel-points-icon").parentNode.nextSibling.innerText;
        let channelName = document.URL.slice(document.URL.lastIndexOf('/')+1, document.URL.length);
        console.log("novos pontos", points, channelName);
        chrome.runtime.sendMessage({newPoints: points});

        
}

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
    waitForElmToLeft(".claimable-bonus__icon").then(() => {
            console.log("Elemento desapareceu");
            conectObserver();
    });
}

function conectObserver(){
    setTimeout(() => {
        console.log("iniciando observer");
        waitForElm(".claimable-bonus__icon").then(colectPoints);
    }, 2000); 
}

function main(){
    setTimeout(function(){
        conectObserver();
    }, 10000);
}

main();
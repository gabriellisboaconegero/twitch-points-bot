chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request, sender);
    if (request.question === "are_u_there"){
        sendResponse({awnser: 'yes'});
    }
    
});


function update_channel_points(){
        setTimeout(function(){
            let points = document.getElementsByClassName("channel-points-icon")[0].parentNode.nextSibling.textContent;
            let channelName = document.URL.slice(document.URL.lastIndexOf('/')+1, document.URL.length);
            console.log(points, channelName);
            // chrome.runtime.sendMessage()
        }, 10000)
        
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

function colectPoints(elm){
    let pointsBtn = elm.parentNode.parentNode;
    console.log(pointsBtn);
    pointsBtn.click();
    update_channel_points();
}

function main(){
    setTimeout(function(){
        waitForElm(".claimable-bonus__icon").then(colectPoints);
        // waitForElm(".community-points-summary").then(e => console.log(e));
    }, 10000);
}

main();
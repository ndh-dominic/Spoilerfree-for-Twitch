chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({'toggle': 'on'}, function() {
        //
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type == "status"){
            chrome.storage.local.get(['toggle'], function(result) {
                sendResponse({response: result.toggle});
            });
            return true;
        }
        if (request.type == "toggle"){
            toggleOnOff();
        }
        if( request.message === "github" ) {
            openGithub();
        }
    }
);

function toggleOnOff(){
    chrome.storage.local.get(['toggle'], function(result) {
        var toggle;
        if(result.toggle == 'on'){
            toggle = 'off';
        } else {
            toggle = 'on';
        }
        chrome.storage.local.set({
            'toggle': toggle
        }, function () {
            console.log("Spoilerfree for Twitch: " + toggle);
        });
        
    });
}

function openGithub(){
    chrome.tabs.create({"url": request.url});
}
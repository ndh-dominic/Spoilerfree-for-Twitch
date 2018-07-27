chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({'toggle': 'on'}, function() {
        //
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                //pageUrl: {hostEquals: 'developer.chrome.com'},
            })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
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
            toggleOnOff(sender.id);
            return true;
        }
        if( request.message == "github" ) {
            openGithub(request);
            return true;
        }
    }
);

function toggleOnOff(id){
    //Change and store variable
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

    //Update UI
    chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true},function(tab){
        chrome.tabs.sendMessage(tab[0].id, {type: "contentToggle"});
    });
    
}

function openGithub(request){
    chrome.tabs.create({"url": request.url});
}
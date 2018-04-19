function status(){
    chrome.runtime.sendMessage({type: "status"}, function(response) {
        var status = false;
        if(response.response == "on") status = true;

        document.getElementById('toggle').checked = status;
    });
}

function toggle(){
    chrome.runtime.sendMessage({type: "toggle"});
}

function github(){
    chrome.runtime.sendMessage({'message': 'github', 'url': 'https://github.com/ndh-dominic/Spoilerfree-for-Twitch'});
}

window.onload = function() {
    status(); 
}
document.getElementById('toggle').onclick = toggle;
document.getElementById('github').onclick = github;
function toggle(){
    chrome.runtime.sendMessage({"message": "github", "url": "https://github.com/ndh-dominic/Spoilerfree-for-Twitch"});

}

function github(){
    chrome.runtime.sendMessage({'message': 'github', 'url': 'https://github.com/ndh-dominic/Spoilerfree-for-Twitch'});
}

document.getElementById('github').onclick = github;
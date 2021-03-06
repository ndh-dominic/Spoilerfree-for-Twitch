chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if(message.type == "contentToggle"){
            checkStatus();
            return true;
        }
    }
);

checkStatus();

function checkStatus(){
    chrome.runtime.sendMessage({type: "status"}, function(response) {
        if(response.response == "on"){
            hideProgress();
        } else {
            showProgress();
        }
    });
}

function hideProgress(){
    setProgress("hidden");
}

function showProgress(){
    setProgress("visible");
}

function setProgress(visibility) {
    var css = [
	    ".player-seek, .length, .progress-bar-wrapper, .video-preview-card__preview-overlay-stat, .tw-progress-bar, .pl-card__info",
	    "    {",
	    "        visibility: " + visibility + ";",
	    "    }"
    ].join("\n");

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            document.documentElement.appendChild(node);
        }
    }
};
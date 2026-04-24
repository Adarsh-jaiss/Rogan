console.log("Content script loaded!!!")
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "HELLO" ) {
        console.log('hello from content script')
        document.body.style.background = "lightyellow"
    }
})
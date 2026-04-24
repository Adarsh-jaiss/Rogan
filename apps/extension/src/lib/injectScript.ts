// injects content-script to the page as soon as it receives message without reloding the page

export const injectContentScript = async (tabId : number) => {
    if (!tabId) {
        console.log('injectContentScript -> tab is is empty')
        return 
    }
    return new Promise<void>((resolve, reject) => {
        chrome.scripting.executeScript(
            {
                target:{tabId},
                files:['content.js']
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                }else{
                    resolve()
                }
            }
        )
    })
}
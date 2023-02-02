import { ESettings, loadJar, loadSettings } from "../utils/crud";

const findSimilarQuery = async (searchText: string): Promise<void> => {
    const queryJar = await loadJar();
    const settings = await loadSettings();
    const results = queryJar?.filter((data) => data.body.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    const autoDetectOn = Boolean(settings?.includes(ESettings.LISTEN));

    if (results?.length > 0 && autoDetectOn) {
        const sendBack = results[0].name.toUpperCase();
        chrome.notifications.create(
            {
                type: "basic",
                iconUrl: chrome.runtime.getURL("queryjarsolid.png"),
                title: "Similar Query Detected",
                message: `${sendBack} might be what you are looking for.`,
                silent: false
            },
            () => { 
                return;
            }
        )
    } else {
        // remind to index
        return;
    }
}

// try {

//     chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//         if (changeInfo.status == 'complete') {
//             chrome.scripting.executeScript({
//                 files: ['content-script.js'],
//                 target: {tabId: tab.id ?? 0}
//             })
//         }
//     })

// } catch(e) {
//     console.log(e);
// }


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.from === 'sql-suggest') {
//     const searchText= message.body;
//     chrome.windows.create({
//         focused: true,
//         width: 400,
//         height: 600,
//         type: 'popup',
//         url: 'modal.html',
//         top: 0,
//         left: 100
//       },
//       () => {})
//     findSimilarQuery(searchText).then(sendResponse);
//     return true;
//   }
// });


  


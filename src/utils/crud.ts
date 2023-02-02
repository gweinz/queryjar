import { format } from 'sql-formatter';

export enum ESettings {
    LISTEN = 'LISTEN',
    CTE = 'CTE',
  }
  

export interface Query {
    id: string;
    name: string;
    desc?: string;
    body: string;
    creator: string;
    created_at: string;
    updated_at: string;
}

export const addQueryToLocalJar = ( request: Query ): Promise<void> => {
    return new Promise<void>( ( resolve: () => void ) => {
        chrome.storage.local.get({queryJar: []}, function (result) {
            var queryJar = result.queryJar;
            // format query to proper language
            queryJar.push(request);
            // set the new array value to the same key
            chrome.storage.local.set({queryJar: queryJar}, resolve);
        });
    });
}

export const removeFromLocalJar = ( request: Query ): Promise<void> => {
    return new Promise<void>( ( resolve: () => void ) => {
        chrome.storage.local.get({queryJar: []}, function (result) {
            const newJar = result.queryJar.filter((el: Query) => { return el.id != request.id; });
            chrome.storage.local.set({queryJar: newJar}, resolve);
        });
    });
}

export const updateQuery = ( request: Query, name: string, desc: string, body: string): Promise<void> => {
    return new Promise<void>( ( resolve: () => void ) => {
        chrome.storage.local.get({queryJar: []}, function (result) {
            const newJar = result.queryJar.map((el: Query) => {
                    // Replace old element with new only update if vals are diff
                    if (el.id === request.id)  {
                        const upDate = new Date();
                        return {...el, name, desc, body, updated_at: upDate.toString()}
                    }
                    return el;
                }
            );
            chrome.storage.local.set({queryJar: newJar}, resolve);
        });
    });
}

export const loadJar = (): Promise<Query[]> => {
    return new Promise(resolve => {
        chrome.storage.local.get('queryJar', function(items) {
            resolve(items.queryJar);
        })
    })
}

export const updateSettings = ( request: string[]): Promise<void> => {
    return new Promise<void>( ( resolve: () => void ) => {
        chrome.storage.local.set({settings: request}, resolve);
    });
}

export const loadSettings = (): Promise<string[]> => {
    return new Promise(resolve => {
        chrome.storage.local.get('settings', function(items) {
            resolve(items.settings);
        });
    })
}

export const copyToClipboard = (query: Query, asCTE: boolean) => {
    const queryBody =  query.body;

    if (asCTE) {
        const newCopy = `
            with ${query.name.replace(/ /g, '_')} as (
                ${queryBody}
            );
        `
        navigator.clipboard.writeText(newCopy);
    } else {
        navigator.clipboard.writeText(queryBody);
    }
}

// export const getUserEmail = (): Promise<string> => {
//     return new Promise(resolve => {
//         chrome.identity.getProfileUserInfo(function(userInfo) {
//             /* Use userInfo.email, or better (for privacy) userInfo.id
//             They will be empty if user is not signed in in Chrome */
//             resolve(userInfo.email);
//         });   
//     });
// }

// export const saveTextToAnalyze =(textToAnalyze: string): Promise<void> => {
//     return new Promise<void>( ( resolve: () => void ) => {
//         chrome.storage.local.get({textToAnalyze: ""}, function (result) {
//             chrome.storage.local.set({textToAnalyze}, resolve);
//         });
//     });
// }

// export const getTextToAnalyze= (): Promise<string> => {
//     return new Promise(resolve => {
//         return new Promise(resolve => {
//             chrome.storage.local.get('textToAnalyze', function(result) {
//                 resolve(result.textToAnalyze);
//             });
//         })
//     });
// }


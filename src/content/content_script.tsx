
import React from 'react';
import ReactDOM from 'react-dom';
import QuickCreateNew from '../injections/QuickCreateNew';
import QuickShowExisting from '../injections/QuickShowExisting';
import { ESettings, loadJar, loadSettings, Query } from '../utils/crud';
import { listenActiveElement } from '../utils/listen';

const handleInput = async(text: string): Promise<void> => {
  const SQLWords = ["SELECT", "UPDATE", "DELETE"];

  const sqlBody = text.toUpperCase();
  if (SQLWords.some(v => sqlBody.includes(v))) {
    // delete if already exists
    const existingApp = document.getElementById("query-jar-root");
    if (existingApp) ReactDOM.unmountComponentAtNode(existingApp);
    await prompt(text);
  } else {
    return;
  }
}


const promptSuggest = (query: Query, copyAsCTE: boolean) => {
  const app = document.createElement('div');
  const onClose = () => ReactDOM.unmountComponentAtNode(app);
  app.style.width = '50px';
  app.style.position  = 'fixed';
  app.style.top = '0px';
  app.style.right =  '50px';
  app.style.zIndex = '2147483647';
  app.id = "query-jar-root";
  document.body.appendChild(app);
  ReactDOM.render(<QuickShowExisting queryToSuggest={query} asCTE={copyAsCTE} onClose={onClose} />, app);
}

const promptAdd = (text: string) => {
  const app = document.createElement('div');
  const onClose = () => ReactDOM.unmountComponentAtNode(app);
  app.style.width = '240px';
  app.style.position  = 'fixed';
  app.style.top = '50px';
  app.style.right =  '50px';
  app.style.zIndex = '2147483647';
  app.style.boxShadow = '0px 0px 2px #5e17eb'
  app.style.borderColor = '#5e17eb';
  app.style.borderWidth = '1px';
  app.style.backgroundColor = 'white';
  app.style.borderRadius = "12px";
  app.id = "query-jar-root";
  document.body.appendChild(app);
  ReactDOM.render(<QuickCreateNew onClose={onClose} starterBody={text} />, app);
}

const prompt = async (text: string) => {
  const queryJar = await loadJar();
  const settings = await loadSettings();
  const results = queryJar?.filter((data) => data.body.toLowerCase().indexOf(text.toLowerCase()) !== -1);
  const autoDetectOn = Boolean(settings?.includes(ESettings.LISTEN));
  const copyAsCTE = Boolean(settings?.includes(ESettings.CTE));

  if (!autoDetectOn) return;

  if (results?.length > 0) {
    promptSuggest(results[0], copyAsCTE);
  } else {
    //TODO: update the add modal to look better
    // promptAdd(text);
  }
}


const listenToTyping = (element: HTMLInputElement) => {
  let timer: any | null; // Timer identifier
  let activeTypingTimer: any | null; // Timer identifier
  const waitTime = 5000; // Wait time in milliseconds
  let lastInput = element.value
  let haveAlerted = false;
  let activelyTyping = false
  let lastTypeTime = new Date().getTime();

  element.addEventListener("keydown", (e) => {
    activelyTyping = true;
    lastTypeTime = new Date().getTime();
  })


  // Listen for `keyup` event
  element.addEventListener("keyup", (e) => {
    const target = e.target as HTMLInputElement;

    let text = target.value;

    // If text is undefined, the element is a editable div
    if(text === undefined) {
      text = target.innerText;
    }
    
    if(timer) {
      // Clear timer
      clearTimeout(timer);
    }
    
    if(activeTypingTimer) {
      clearTimeout(activeTypingTimer);
    }
    
    const activeTypingCheckTime = waitTime - 1000;

    
    activeTypingTimer = setTimeout(() => {
      if(activelyTyping) {
        const now = new Date().getTime();

        if(now > lastTypeTime + activeTypingCheckTime) {
          activelyTyping = false;
        }
      }
    }, activeTypingCheckTime)

    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      if(text !== lastInput && !haveAlerted) {
        if(!activelyTyping) {
          handleInput(text);
          lastInput = text;
        }
      }
    }, waitTime);
  });
};

listenActiveElement((element: HTMLInputElement) => {
  listenToTyping(element);
});

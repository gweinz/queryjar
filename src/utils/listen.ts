export const isTextAreaOrInput = (element: Element | null): boolean => {
    if (!element) {
      return false;
    }
    // Always compare with uppercase
    const tagName = element.tagName.toUpperCase();
  
    if (tagName === "TEXTAREA" || tagName === "INPUT") {
      return true;
    }
  
    // Check if content is editable
    const isContentEditable = element.getAttribute('contenteditable');
  
    if(isContentEditable) {
      return true;
    }
  
    return false;
  };
  
export const listenActiveElement = (callback: any) => {
    // Initial check
    let lastActiveElement = document.activeElement;
    // Check if element is textarea or input
    if (isTextAreaOrInput(lastActiveElement)) {
      callback(lastActiveElement);
    }
  
    // Handle if focus changes
    const detectFocus = () => {
      if (lastActiveElement !== document.activeElement) {
        lastActiveElement = document.activeElement;
        if (isTextAreaOrInput(lastActiveElement)) {
          callback(lastActiveElement);
        }
      }
    };
  
    window.addEventListener("focus", detectFocus, true);
  };
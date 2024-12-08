document.addEventListener("keydown", (event) => {
    // Ensure the event is for editable elements
    const activeElement = document.activeElement;
    if (!activeElement.isContentEditable && activeElement.tagName !== "TEXTAREA" && activeElement.tagName !== "INPUT") {
      return;
    }
  
    // Check if text is selected
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
  
    const selectedText = selection.toString();
    if (!selectedText) {
      return;
    }
  
    // Uppercase with Ctrl + Shift + U
    if (event.ctrlKey && event.shiftKey && event.key === "U") {
      event.preventDefault();
      replaceSelection(activeElement, selectedText.toUpperCase());
    }
  
    // Lowercase with Ctrl + Shift + L
    if (event.ctrlKey && event.shiftKey && event.key === "L") {
      event.preventDefault();
      replaceSelection(activeElement, selectedText.toLowerCase());
    }
  });
  
  function replaceSelection(activeElement, newText) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
  
    // Preserve the selection
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(activeElement);
    selection.addRange(newRange);
  }
  
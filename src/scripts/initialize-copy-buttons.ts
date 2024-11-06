const COPY_BUTTON_CLASS = 'copy-button';
const COPIED_BUTTON_CLASS = 'copied-button';
const COPIED_BUTTON_HIDDEN_CLASS = 'hidden';
const DATA_CLIPBOARD_TEXT_ATTRIBUTE = 'data-clipboard-text';

export const initializeCopyButtons = () => {
  const copyButtons = document.querySelectorAll(`.${COPY_BUTTON_CLASS}`);
  copyButtons.forEach((copyButton) => {
    attachCopyEvent(copyButton);
  });
};

const attachCopyEvent = (copyButton: Element) => {
  copyButton.addEventListener('click', handleCopyClick.bind(null, copyButton));
};

const handleCopyClick = (copyButton: Element) => {
  const textToCopy = copyButton.getAttribute(DATA_CLIPBOARD_TEXT_ATTRIBUTE) || '';
  navigator.clipboard.writeText(textToCopy);
  showCopiedFeedback(copyButton);
};

const showCopiedFeedback = (copyButton: Element) => {
  const copiedButtonElement = copyButton.querySelector(`.${COPIED_BUTTON_CLASS}`);
  if (copiedButtonElement) {
    copiedButtonElement.classList.remove(COPIED_BUTTON_HIDDEN_CLASS);
    setTimeout(() => {
      copiedButtonElement.classList.add(COPIED_BUTTON_HIDDEN_CLASS);
    }, 500);
  }
};
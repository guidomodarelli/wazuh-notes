import { createCopyButton } from "../ui/utils/create-copy-button";

export const initializeCopyButtonsForCodeBlocks = () => {
  addContentClassToCodeBlocks();
  document.querySelectorAll('pre:has(> code)').forEach(addCopyButtonToCodeBlock);
  document.querySelectorAll('*:has(> pre > code)').forEach(addRelativeClass);
};

const addCopyButtonToCodeBlock = (preElement: Element) => {
  const codeContent = (preElement.textContent || '').replace(/"/g, '&quot;');
  preElement.insertAdjacentHTML('afterend', createCopyButton(codeContent));
};

const addRelativeClass = (element: Element) => {
  element.classList.add('relative');
};

const addContentClassToCodeBlocks = () => {
  // I want to select all <pre> elements that contain a <code> element 
  // within them and do not have a <div class="content"> as their first child.
  const codeBlocks = document.querySelectorAll(':not(:has(div.content > pre:first-child)) > pre:has(> code)');
  codeBlocks.forEach((codeBlock) => {
    const contentElement = document.createElement('div');
    contentElement.innerHTML = codeBlock.outerHTML;
    codeBlock.replaceWith(contentElement);
  });
};
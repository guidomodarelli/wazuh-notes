import debounce from 'lodash.debounce';

export const transformCodeElementsForCopyTheirContent = () => {
  const codeElements = document.querySelectorAll(':not(pre) > code');
  codeElements.forEach(transformCodeElement);
};

const transformCodeElement = (codeElement: Element) => {
  codeElement.addEventListener('click', debounce(handleCodeElementClick.bind(null, codeElement), 150));
};

const handleCodeElementClick = (codeElement: Element) => {
  const codeContent = codeElement.textContent || '';
  navigator.clipboard.writeText(codeContent);
  createCopiedFeedback(codeElement);
};

const createCopiedFeedback = (codeElement: Element) => {
  codeElement.classList.add('tooltip', 'hover');
  codeElement.querySelector('.tooltip-text')?.remove();

  // save the original text content
  const originalTextContent = codeElement.textContent;

  // <span class="tooltip-text">Copied</span>;
  const tooltipTextElement = document.createElement('span');
  tooltipTextElement.classList.add('tooltip-text');
  tooltipTextElement.textContent = 'Copied';

  codeElement.append(tooltipTextElement);

  setTimeout(() => {
    codeElement.textContent = originalTextContent;
    tooltipTextElement.remove();
  }, 500);
};

import type { Cheerio } from 'cheerio';
import type { Element } from 'domhandler';

export function createCopyButton(codeBlock: Cheerio<Element>) {
  return /* html */ `
    <button type="button" class="copy-button" data-clipboard-text="${codeBlock
      .text()
      .replace(/"/g, '&quot;')}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
        <span class="copied-button hidden">Copied</span>
      </button>
      <script>
        var copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach((copyButton) => {
          copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(copyButton.dataset.clipboardText);
            copyButton.querySelector('.copied-button').classList.remove('hidden');
            setTimeout(() => {
              copyButton.querySelector('.copied-button').classList.add('hidden');
            }, 500);
          });
        });
      </script>`;
}
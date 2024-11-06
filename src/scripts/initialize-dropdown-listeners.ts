import type { DropdownButton } from "../components/SearchWithDropdown.astro";
import { hide, toggleVisibility } from "../ui/utils/show-hide";

export const initializeDropdownListeners = () => {
  const dropdownButton = document.querySelector('#dropdown-button') as HTMLElement;
  const dropdown = document.querySelector('#dropdown') as HTMLElement;
  const dropdownButtons = document.querySelectorAll('[data-dropdown-button]') as NodeListOf<HTMLElement>;

  const filterCardsByType = (dropdownButtonData: DropdownButton) => {
    const cards = document.querySelectorAll('[data-card]') as NodeListOf<HTMLElement>;

    const shouldShowCard = (cardType: string | undefined, key: string): boolean => {
      return key === 'all' || cardType === key;
    };

    cards.forEach((card) => {
      const cardType = card.dataset.cardType;
      if (shouldShowCard(cardType, dropdownButtonData.key)) {
        delete card.dataset.cardDontShowOnType;
      } else {
        card.dataset.cardDontShowOnType = '';
      }
    });
  };

  const handleDropdownButtonClick = (button: HTMLElement) => {
    button.addEventListener('click', () => {
      const dropdownButtonData = JSON.parse(button.dataset.dropdownButton ?? '{}') as DropdownButton;
      // change the dropdown button label
      dropdownButton.querySelector('span')!.textContent = dropdownButtonData.label;
      filterCardsByType(dropdownButtonData);
      hide(dropdown);
    });
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (!dropdown.contains(event.target as Node) && !dropdownButton.contains(event.target as Node)) {
      hide(dropdown);
    }
  };

  dropdownButton.addEventListener('click', toggleVisibility.bind(null, dropdown));
  dropdownButtons.forEach(handleDropdownButtonClick);
  document.addEventListener('click', handleDocumentClick);
};

import { filterOptions } from "../constants/filter-options";
import { COLLECTION } from "../content/constants";
import { hide, toggleVisibility } from '../ui/utils/show-hide';
import type { FilterOption } from "../types/filter-option";
import { UrlQueryParam, UrlService } from "./url-service";

export const initializeDropdownListeners = () => {
  const dropdownButton = document.querySelector('#dropdown-button') as HTMLElement;
  const dropdown = document.querySelector('#dropdown') as HTMLElement;
  const dropdownButtons = document.querySelectorAll('[data-dropdown-button]') as NodeListOf<HTMLElement>;

  dropdownButton.addEventListener('click', toggleVisibility.bind(null, dropdown));
  dropdownButtons.forEach(handleDropdownButtonClick(dropdown, dropdownButton));
  document.addEventListener('click', handleDocumentClick(dropdown, dropdownButton));

  initializeTypeFromQuery(dropdownButton);
};

const filterCardsByType = (key: string) => {
  const cards = document.querySelectorAll('[data-card]') as NodeListOf<HTMLElement>;

  cards.forEach((card) => {
    const cardType = card.dataset.cardType;
    if (shouldShowCard(cardType, key)) {
      delete card.dataset.cardDontShowOnType;
    } else {
      card.dataset.cardDontShowOnType = '';
    }
  });
};

const shouldShowCard = (cardType: string | undefined, key: string): boolean => {
  return key === 'all' || cardType === key;
};

const handleDropdownButtonClick =
  (dropdown: HTMLElement, dropdownButton: HTMLElement) => (button: HTMLElement) => {
    button.addEventListener('click', () => {
      const dropdownButtonData = JSON.parse(button.dataset.dropdownButton ?? '{}') as FilterOption;
      // change the dropdown button label
      dropdownButton.querySelector('span')!.textContent = dropdownButtonData.label;
      filterCardsByType(dropdownButtonData.key);
      hide(dropdown);
    });
  };

const handleDocumentClick = (dropdown: HTMLElement, dropdownButton: HTMLElement) => (event: MouseEvent) => {
  if (!dropdown.contains(event.target as Node) && !dropdownButton.contains(event.target as Node)) {
    hide(dropdown);
  }
};

const isKnownType = (type: string) => {
  return Object.values(COLLECTION).includes(type as COLLECTION);
};

const getFilterOption = (type: string) => {
  const knownTypes = [COLLECTION.APPS, COLLECTION.FAQS, COLLECTION.VAGRANTS] as string[];
  return filterOptions.find((option) => knownTypes.includes(option.key) && option.key === type);
}

const initializeTypeFromQuery = (dropdownButton: HTMLElement) => {
  const type = UrlService.getQueryParam(UrlQueryParam.TYPE);

  // if the type is defined and is a known type
  if (type && isKnownType(type)) {
    // change the dropdown button label
    dropdownButton.querySelector('span')!.textContent = getFilterOption(type)!.label;
    filterCardsByType(type);
  }
};

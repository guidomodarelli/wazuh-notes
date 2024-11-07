import type { Props as CardProps } from '../components/Card.astro';
import { includesText } from '../utils/includes-text';
import debounce from 'lodash.debounce';
import { UrlQueryParam, UrlService } from './url-service';

export const setupSearch = () => {
  const searchForm = document.querySelector('#search-dropdown-form') as HTMLFormElement;
  const searchInput = document.querySelector('#search-dropdown') as HTMLInputElement;
  const cards = document.querySelectorAll('[data-card]') as NodeListOf<HTMLElement>;

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  searchInput.focus();

  searchInput.addEventListener('input', (event) => {
    const inputText = (event.target as HTMLInputElement)?.value.toLowerCase().trim();

    // set URL query parameter
    debounce(() => {
      console.log(inputText);
      UrlService.setQueryParam(UrlQueryParam.QUERY, inputText);
    }, 350)();

    const doesCardMatchSearch = (card: HTMLElement): boolean => {
      const { title, description, tags } = JSON.parse(card.dataset.card ?? '{}') as CardProps;
      return (
        includesText(inputText)(title) ||
        includesText(inputText)(description) ||
        tags?.some(includesText(inputText)) ||
        false
      );
    };

    cards.forEach((card) => {
      if (!inputText || doesCardMatchSearch(card)) {
        delete card.dataset.cardDontMatchSearch;
      } else {
        card.dataset.cardDontMatchSearch = '';
      }
    });
  });

  initializeSearchFromQuery(searchInput);
};

const initializeSearchFromQuery = (searchInput: HTMLInputElement) => {
  searchInput.value = UrlService.getQueryParam(UrlQueryParam.QUERY);
  searchInput.dispatchEvent(new Event('input'));
};

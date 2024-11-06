import type { Props as CardProps } from "../components/Card.astro";
import { includesText } from "../utils/includes-text";

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

    const doesCardMatchSearch = (card: HTMLElement): boolean => {
      const { title, description, tags } = JSON.parse(
        card.dataset.card ?? '{}',
      ) as CardProps;
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

  const searchQuery = new URLSearchParams(window.location.search).get('q');
  if (searchQuery) {
    searchInput.value = searchQuery;
    searchInput.dispatchEvent(new Event('input'));
  }
};
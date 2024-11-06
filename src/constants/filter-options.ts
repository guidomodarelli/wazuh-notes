import { COLLECTION } from "../content/constants";
import type { FilterOption } from "../types/filter-option";

export const filterOptions: FilterOption[] = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: COLLECTION.APPS,
    label: 'Apps',
  },
  {
    key: COLLECTION.FAQS,
    label: 'FAQs',
  },
  {
    key: COLLECTION.VAGRANTS,
    label: 'Vagrants',
  },
];
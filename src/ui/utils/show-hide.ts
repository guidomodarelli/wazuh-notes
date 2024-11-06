export const show = (element: HTMLElement) => {
  element.classList.remove('hidden');
  element.classList.add('block');
};

export const hide = (element: HTMLElement) => {
  element.classList.remove('block');
  element.classList.add('hidden');
};

export const toggleVisibility = (element: HTMLElement) => {
  if (element.classList.contains('hidden')) {
    show(element);
  } else {
    hide(element);
  } 
};
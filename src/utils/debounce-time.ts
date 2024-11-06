export const debounceTime = (delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (callback: () => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};
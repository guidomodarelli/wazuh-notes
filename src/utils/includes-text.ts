export const includesText = (searchQuery: string) => {
  return (text?: string) => text?.toLowerCase().includes(searchQuery?.toLowerCase());
};
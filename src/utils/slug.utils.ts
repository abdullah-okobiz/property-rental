const SlugUtils = {
  generateSlug: (text: string): string => {
    return text
      .replace(/[।!?,./'"“”‘’`~@#$%^&*()_|+=<>[\]{}\\]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  },
};

export default SlugUtils;

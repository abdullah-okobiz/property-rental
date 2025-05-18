import { customAlphabet } from 'nanoid';
const generate4DigitNumber = customAlphabet('1234567890', 4);

const SlugUtils = {
  generateSlug: (text: string): string => {
    const baseSlug = text
      .replace(/[।!?,./'"“”‘’`~@#$%^&*()_|+=<>[\]{}\\]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    const randomDigits = generate4DigitNumber();
    return `${baseSlug}-${randomDigits}`;
  },
};

export default SlugUtils;

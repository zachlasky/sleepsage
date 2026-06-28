type TGetQueryString = {
  product?: string[] | string;
  supplement?: string[] | string;
};

const getQueryString = ({ product, supplement }: TGetQueryString) => {
  if (!supplement && !product) {
    return '';
  }

  const params = new URLSearchParams();

  const appendUniqueParam = (key: string, value: string | string[]) => {
    const uniqueValues = new Set<string>(); // Ensures uniqueness

    if (Array.isArray(value)) {
      value.forEach((v) => uniqueValues.add(parseOrDefault(v)));
    } else {
      uniqueValues.add(parseOrDefault(value));
    }

    uniqueValues.forEach((v) => params.append(key, v));
  };

  const parseOrDefault = (value: string): string => {
    const num = Number(value);
    return Number.isInteger(num) ? num.toString() : '0';
  };

  if (product) appendUniqueParam('product', product);
  if (supplement) appendUniqueParam('supplement', supplement);

  return params.toString() ? `?${params.toString()}` : '';
};

export { getQueryString };

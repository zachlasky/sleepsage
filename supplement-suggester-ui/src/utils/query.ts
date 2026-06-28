import type { TGetProductsQueryString, TGetSupplementsQueryString } from '@/types';

const getSupplementsQueryString = ({ interaction, risk, symptom }: TGetSupplementsQueryString) => {
  if (!interaction && !risk && !symptom) {
    return '';
  }

  const params = new URLSearchParams();

  if (interaction) {
    if (typeof interaction === 'string') {
      params.append('interaction', interaction);
    } else {
      (interaction as string[]).forEach((int) => {
        params.append('interaction', int);
      });
    }
  }

  if (risk) {
    if (typeof risk === 'string') {
      params.append('risk', risk);
    } else {
      (risk as string[]).forEach((r) => {
        params.append('risk', r);
      });
    }
  }

  if (symptom) {
    if (typeof symptom === 'string') {
      params.append('symptom', symptom);
    } else {
      (symptom as string[]).forEach((s) => {
        params.append('symptom', s);
      });
    }
  }

  return params.toString() ? `?${params.toString()}` : '';
};

const getProductsQueryString = ({ category }: TGetProductsQueryString) => {
  if (!category) {
    return '';
  }

  const params = new URLSearchParams();

  if (category) {
    if (typeof category === 'string') {
      params.append('category', category);
    } else {
      (category as string[]).forEach((c) => {
        params.append('category', c);
      });
    }
  }

  return params.toString() ? `?${params.toString()}` : '';
};

export { getProductsQueryString, getSupplementsQueryString };

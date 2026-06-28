type TProduct = {
  Id: string;
  Name: string;
  Description: string;
  ImageUrl: string;
  LinkUrl: string;
};

type TSupplement = {
  Id: string;
  Name: string;
  Definition: string;
  ImageUrl: string;
  LinkUrl: string;
};

type TResult = {
  Products: TProduct[];
  Supplements: TSupplement[];
};

type TInteractionsRisksSymptoms = {
  Interactions: string[];
  Risks: string[];
  Symptoms: string[];
};

type TGetSupplementsQueryString = {
  interaction?: string[] | string;
  risk?: string[] | string;
  symptom?: string[] | string;
};

type TGetProductsQueryString = {
  category?: string[] | string;
};

type TOption = { label: string; value: string };

export type {
  TGetProductsQueryString,
  TGetSupplementsQueryString,
  TInteractionsRisksSymptoms,
  TOption,
  TResult,
  TSupplement,
  TProduct
};

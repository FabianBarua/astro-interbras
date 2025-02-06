import { getRelativeLocaleUrl } from "astro:i18n";

export interface Root {
  products: Category[];
}

export interface Category {
  id: string;
  name: string;
  children: Children[];
  description: string;
  shortDescription: string;
}

export interface Children {
  id: string;
  name: string;
  popular: boolean;
  info: Info;
  variants: Variant[];
}

export interface Info {
  review: string;
  included: string | null;
  specs: string;
}

export interface Variant {
  id: string;
  name: string;
  color: string;
  photos: string[];
  catalogId?: string[];
  stockAvailable?: string[]
}

export const data: Root = {
  products: [
    tvs,
    scooters,
    aires,
    hoverboards,
    airfryer,
    mixteras,
    cocinas,
    hervidoras,
    cafeteras,
    planchas,
    licuadoras,
    beauty,
    batidoras,
    arroceras,
    bebederos,
  ],
};

export interface Urls {
  name: string;
  url: string;
}

export const getUrls = ({
  currentLocale,
}: {
  currentLocale: string | undefined;
}): Urls[] => {
  const i18n = getI18NProducts({ currentLocale });

  const t = (key: string) => getValueFromKey(key, i18n);

  const urls: Urls[] = data.products.map((product) => {
    return {
      name: t(product.name),
      url: "/productos/" + convertToSlug(t(product.name)),
    };
  });
  return urls;
};

export const getUrlCategoryById = ({
  id,
  currentLocale,
}: {
  id: string;
  currentLocale: string;
}) => {
  const category = data.products.find((product) => product.id === id);
  const i18n = getI18NProducts({ currentLocale });
  const t = (key: string) => getValueFromKey(key, i18n);
  return category
    ? getRelativeLocaleUrl(
        currentLocale,
        `/productos/${convertToSlug(t(category.name))}`,
      )
    : "/";
};

export const getCategories = (): Category[] => {
  return data.products;
};

export const getCategory = ({ id }: { id: string }): Category => {
  const product = data.products.find((product) => product.id === id);
  return product as Category;
};

export const getProductsByCategory = ({ id }: { id: string }): Category => {
  const products = data.products.filter((product) => product.id === id)[0];
  return products;
};

import {
  aires,
  airfryer,
  arroceras,
  batidoras,
  beauty,
  bebederos,
  cafeteras,
  cocinas,
  hervidoras,
  hoverboards,
  licuadoras,
  mixteras,
  planchas,
  scooters,
  tvs,
} from "./data";
import { getI18NProducts, getValueFromKey } from "@/i18n";


export function convertToSlug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export const getCategorySelected = ({
  category,
  currentLocale,
}: {
  category: string | undefined;
  currentLocale: string | undefined;
}) => {
  const i18n = getI18NProducts({ currentLocale });
  const t = (key: string) => getValueFromKey(key, i18n);

  return getCategories().find((cat) => convertToSlug(t(cat.name)) === category);
};

export const getModelSelected = ({
  children,
  model,
  currentLocale,
}: {
  children: Children[];
  model: string | undefined;
  currentLocale: string | undefined;
}) => {
  const i18n = getI18NProducts({ currentLocale });
  const t = (key: string) => getValueFromKey(key, i18n);

  return children.find((child) => convertToSlug(t(child.name)) === model);
};

export const getProductUrl = ({
  category,
  product,
  currentLocale,
}: {
  category: string;
  product: string;
  currentLocale: string | undefined;
}) => {
  const i18n = getI18NProducts({ currentLocale });
  const t = (key: string) => {
    return getValueFromKey(key, i18n);
  };
  const categorySlug = convertToSlug(t(category));
  const productSlug = convertToSlug(t(product));
  const url = `/productos/${categorySlug}/${productSlug}`;
  return getRelativeLocaleUrl(currentLocale || "", url);
};

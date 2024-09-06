import { motion } from "framer-motion";
import { HomeProductCard } from "@/components/react/HomeProductCard";
import { getI18NGlobal, getValueFromKey } from "@/i18n";
import { getLangFromUrl } from "@/i18n/utils";
import type { ProductItemHome } from "@/shared/types";

const Titulo = ({ lang }: { lang: string }) => {
  const i18n = getI18NGlobal({
    currentLocale: lang,
  });

  const t = (key: string) => {
    return getValueFromKey(key, i18n);
  };

  return (
    <>
      <p>{t("home.title.primary")}</p>
      <strong>{t("home.title.secondary")}</strong>
    </>
  );
};

const getDelay = (
  i: number,
  j: number,
  n: number,
  productRowN: number,
): number => {
  const mitad = Math.floor(n / 2) + 1;
  const mitadRow = Math.floor(productRowN / 2) + 1;
  if (i === mitad && j === mitadRow) return 0;
  if (i < mitad)
    return (mitad - i) * 0.2 + (mitadRow === j ? 0 : mitadRow > j ? 0.1 : 0.2);
  return (i - mitad) * 0.2 + (mitadRow === j ? 0 : mitadRow > j ? 0.1 : 0.2);
};

export const ProductsAnimated = ({ currentUrl }: { currentUrl: URL }) => {
  const lang = getLangFromUrl(new URL(currentUrl));

  const products: ProductItemHome[][] = [
    [
      {
        name: "airfryer",
        url: "/product/airfryer",
        photo: "/home/5.webp",
        isMagic: false,
      },
      {
        name: "hervidoras",
        url: "/product/hervidoras",
        photo: "/home/13.webp",
        isMagic: false,
      },
    ],
    [
      {
        name: "airfryer",
        url: "/product/airfryer",
        photo: "/home/6.webp",
        isMagic: false,
      },
      {
        name: "airfryer",
        url: "/product/airfryer",
        photo: "/home/3.webp",
        isMagic: false,
      },
      {
        name: "arroceras",
        url: "/product/arroceras",
        photo: "/home/11.webp",
        isMagic: false,
      },
    ],
    [
      {
        name: "airfryer",
        url: "/product/airfryer",
        photo: "/home/2.webp",
        isMagic: false,
      },
      {
        name: "arroceras",
        url: "/product/arroceras",
        photo: "/home/10.webp",
        isMagic: false,
      },
      {
        name: "scooters",
        url: "/product/scooters",
        photo: "/home/14.webp",
        isMagic: false,
      },
    ],
    [
      {
        name: "hervidoras",
        url: "/product/aires",
        photo: "/home/15.webp",
        isMagic: false,
      },
      {
        name: <Titulo lang={lang} />,
        url: "/",
        photo: "/home/logo.webp",
        isMagic: true,
      },
      {
        name: "airfryer",
        url: "/product/airfryer",
        photo: "/home/4.webp",
        isMagic: false,
      },
    ],
    [
      {
        name: "licuadora",
        url: "/product/licuadoras",
        photo: "/home/9.webp",
        isMagic: false,
      },
      {
        name: "hervidoras",
        url: "/product/hervidoras",
        photo: "/home/12.webp",
        isMagic: false,
      },
      {
        name: "beauty",
        url: "/product/beauty",
        photo: "/home/20.webp",
        isMagic: false,
      },
    ],
    [
      {
        name: "beauty",
        url: "/product/beauty",
        photo: "/home/17.webp",
        isMagic: false,
      },
      {
        name: "planchas",
        url: "/product/planchas",
        photo: "/home/19.webp",
        isMagic: false,
      },
      {
        name: "cocinas",
        url: "/product/cocinas",
        photo: "/home/18.webp",
        isMagic: false,
      },
    ],
    [
      {
        name: "licuadora",
        url: "/product/licuadoras",
        photo: "/home/7.webp",
        isMagic: false,
      },
      {
        name: "airfryer",
        url: "/product/tvs",
        photo: "/home/16.webp",
        isMagic: false,
      },
    ],
  ];

  return (
    <div className="  h-full  w-full py-12 flex   justify-center px-5 sm:px-0  gap-3 md:gap-4 lg:gap-6 xl:gap-8 ">
      {products.map((productRow, i) => (
        <div
          key={i}
          className={` flex flex-col items-center justify-center custom-gap-${i} 
                        ${
                          i === 0 || i === 6 || i === 1 || i === 5
                            ? " sm:flex hidden"
                            : " "
                        }
              `}
        >
          {productRow.map((product, j) => (
            <motion.div
              key={j}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: getDelay(
                  i + 1,
                  j + 1,
                  products.length,
                  productRow.length,
                ),
              }}
            >
              <HomeProductCard
                lang={lang}
                name={product.name}
                url={product.url}
                photo={product.photo}
                isMagic={product.isMagic}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

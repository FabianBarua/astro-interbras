import { motion } from "framer-motion";
import { HomeProductCard } from "@/components/react/HomeProductCard";
import { getI18NGlobal, getValueFromKey } from "@/i18n";
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

export const ProductsAnimated2 = ({ lang }: { lang: string }) => {

  const products: ProductItemHome[][] = [
    [
      {
        name: "airfryer",
        url: "/productos/airfryer",
        photo: "/home/5.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "hervidoras",
        url: "/productos/hervidoras",
        photo: "/home/13.webp",
        isMagic: false,
        bgColor: 0
      },
    ],
    [
      {
        name: "airfryer",
        url: "/productos/airfryer",
        photo: "/home/6.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "airfryer",
        url: "/productos/airfryer",
        photo: "/home/3.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "arroceras",
        url: "/productos/arroceras",
        photo: "/home/11.webp",
        isMagic: false,
        bgColor: 0
      },
    ],
    [
      {
        name: "airfryer",
        url: "/productos/airfryer",
        photo: "/home/2.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "arroceras",
        url: "/productos/arroceras",
        photo: "/home/10.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "scooters",
        url: "/productos/scooters",
        photo: "/home/14.webp",
        isMagic: false,
        bgColor: 0
      },
    ],
    [
      {
        name: "hervidoras",
        url: "/productos/aires",
        photo: "/home/15.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: <Titulo lang={lang} />,
        url: "/",
        photo: "/home/logo.webp",
        isMagic: true,
        bgColor: 0
      },
      {
        name: "airfryer",
        url: "/productos/airfryer",
        photo: "/home/4.webp",
        isMagic: false,
        bgColor: 0
      },
    ],
    [
      {
        name: "licuadora",
        url: "/productos/licuadoras",
        photo: "/home/9.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "hervidoras",
        url: "/productos/hervidoras",
        photo: "/home/12.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "beauty",
        url: "/productos/beauty",
        photo: "/home/20.webp",
        isMagic: false,
        bgColor: 0
      },
    ],
    [
      {
        name: "beauty",
        url: "/productos/beauty",
        photo: "/home/17.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "planchas",
        url: "/productos/planchas",
        photo: "/home/19.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "cocinas",
        url: "/productos/cocinas",
        photo: "/home/18.webp",
        isMagic: false,
        bgColor: 0
      },
    ],
    [
      {
        name: "licuadora",
        url: "/productos/licuadoras",
        photo: "/home/7.webp",
        isMagic: false,
        bgColor: 0
      },
      {
        name: "airfryer",
        url: "/productos/tvs",
        photo: "/home/16.webp",
        isMagic: false,
        bgColor: 0
      },
    ],
  ];

  const verifyDisplay = (index: number) => {

    const isDeskTop = window.innerWidth > 640;
    if (isDeskTop) return "flex";

    if (index === 2 || index === 3 || index === 4) return "flex";


    return "none";
  }

  return (

    <>
    {
        products.map((productColumn, ColumnIndex) => (

          <div 
            key={ColumnIndex} 
            className=" flex-col gap-3 md:gap-4 lg:gap-6 xl:gap-8 justify-center "
            style={
              {
                display: verifyDisplay(ColumnIndex)
              }
            }
            >
            {
              productColumn.map((productRow, RowIndex) => (
                <motion.div
                  key={RowIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 
                    getDelay(
                      ColumnIndex + 1,
                      RowIndex + 1,
                      products.length,
                      productColumn.length,
                    )
                   }}
                >
                  <HomeProductCard
                    {...productRow}
                    lang={lang}
                  />
                </motion.div>
              ))
            }
          </div>


        ))
      }
    </>


  );
};

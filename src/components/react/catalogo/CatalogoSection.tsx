import { useEffect, useState } from "react";
import { Filters } from "./Filters";
import { motion } from "framer-motion";
import { DefaultList, TriciclosList } from "./list";
import { getI18NProducts, getI18NCatalog, getValueFromKey } from "@/i18n";

export interface ProductInfo {
    review: string;
    included: string | null;
    specs: string;
  }
  
  export interface ProductData {
    code: string;
    name: string;
    productCode: string | null;
    price: string;
    color: string;
    show: boolean;
    productPerBox: number;
    volt: string | null;
    registered: boolean;
    originalName: string;
    info: ProductInfo;
    photo: string | undefined;
  }
  
export interface GroupedByCategory {
[key: string]: {
    products: ProductData[];
    categoryName: string;
    categoryDescription: string;
    categoryShortDescription: string;
};
}


export const CatalogoSection = (
    {
       currentLocale
    }: {
        currentLocale: string
    }
) => {

    
    const i18n = getI18NProducts({ currentLocale });
    const i18n_catalog = getI18NCatalog({ currentLocale });
  
    const t = (key: string) => getValueFromKey(key, i18n);
    const t_catalog = (key: string) => getValueFromKey(key, i18n_catalog);
  
    const [selectedProducts, setSelectedProducts] = useState<GroupedByCategory | {}>({});
    const [groupedByCategory, setGroupedByCategory] = useState<GroupedByCategory | {}>({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const init = async () => {
        const f = await fetch("https://interbras-dashboard.vercel.app/api/catalog/latest");
        const data = await f.json() as GroupedByCategory;
        setGroupedByCategory(data);
        setSelectedProducts(data);
        
        // Procesamiento de datos
        for (const category in data) {
          const { products } = data[category];
          products.forEach((product, index) => {
            data[category].products[index].color = t(product.color);
            data[category].products[index].originalName = t(product.originalName);
            data[category].products[index].info.review = t(product.info.review);
            data[category].products[index].info.specs = t(product.info.specs);
            data[category].products[index].info.included = data[category].products[index].info.included ? t(data[category].products[index].info.included ) : null;
          });
          data[category].categoryName = t(data[category].categoryName);
          data[category].categoryDescription = t(data[category].categoryDescription);
          data[category].categoryShortDescription = t(data[category].categoryShortDescription);
        }
        
        setLoading(false); // Cuando los datos ya se han cargado, ponemos loading en false
      };
  
      init();
    }, []);


    return (
        <>
        {loading ? (
          <div className="loading-screen">
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="loading-text text-center my-10"
            >
              Cargando productos...
            </motion.div>
          </div>
        ) : (
          <div className="px-4">
            <Filters
              groupedByCategory={groupedByCategory}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              id="catalogScroll"
              className="mx-auto overflow-auto h-0 xl:h-auto"
            >
              <div id="catalog" className="flex flex-col gap-8 w-[1360px] mx-auto">
                {Object.keys(selectedProducts).map((category, i) => {
                  const { categoryName, products, categoryDescription } = (selectedProducts as GroupedByCategory)[category]
                  return (
                    <section
                      key={categoryName + `-${i}`}
                      id="catalogSection"
                      className="flex bg-interbrasGreen-500 text-white rounded-[50px]"
                    >
                      <div className="mx-8 my-16 flex flex-col">
                        <h2 className="text-3xl font-bold">{categoryName}</h2>
                        <h2 className="text-lg mt-2 max-w-80 leading-5">{categoryDescription}</h2>
                        <h3 className="text-base max-w-80 mt-3 leading-5 text-white/70">
                          {products[0].info.review}
                        </h3>
  
                        {products[0].registered && (
                          <div className="w-full mt-10 bg-interbrasGreen-600 rounded-xl py-10">
                            <img
                              className="max-w-72 w-full rounded-3xl object-contain mx-auto z-10"
                              src={products[0].photo || ""}
                              alt=""
                            />
                            <h3 className="max-w-44 text-center mx-auto font-bold text-xl mt-3">
                              {products[0].originalName}
                            </h3>
                          </div>
                        )}
                      </div>
                      {category === "triciclos" ? (
                        <TriciclosList products={products} t_catalog={t_catalog} />
                      ) : (
                        <DefaultList products={products} t_catalog={t_catalog} />
                      )}
                    </section>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </>
    )
}
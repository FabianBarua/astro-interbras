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

//   {
//     "tvs": {
//         "products": [
//             {
//                 "code": "156",
//                 "productCode": "IN7500TV",
//                 "name": "IN 7500TV LED HD- INTERBRAS",
//                 "price": "555",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "tvs.children.6.name",
//                 "volt": null,
//                 "info": {
//                     "review": "tvs.children.6.info.review",
//                     "included": null,
//                     "specs": "tvs.children.6.info.specs"
//                 },
//                 "photo": "/productos/tvs/IN7500TV-1.webp"
//             },
//             {
//                 "code": "159",
//                 "productCode": "IN6500TV",
//                 "name": "IN 6500TV LED HD- INTERBRAS",
//                 "price": "385",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "tvs.children.5.name",
//                 "volt": null,
//                 "info": {
//                     "review": "tvs.children.5.info.review",
//                     "included": null,
//                     "specs": "tvs.children.5.info.specs"
//                 },
//                 "photo": "/productos/tvs/IN6500TV-1.webp"
//             },
//             {
//                 "code": "167",
//                 "productCode": "IN8500TV",
//                 "name": "IN 8500TV LED HD- INTERBRAS",
//                 "price": "955",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "tvs.children.7.name",
//                 "volt": null,
//                 "info": {
//                     "review": "tvs.children.7.info.review",
//                     "included": null,
//                     "specs": "tvs.children.7.info.specs"
//                 },
//                 "photo": "/productos/tvs/IN8500TV-1.webp"
//             },
//             {
//                 "code": "269",
//                 "productCode": "IN3200TV",
//                 "name": "IN 3200TV LED HD- INTERBRAS",
//                 "price": "110",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "tvs.children.1.name",
//                 "volt": null,
//                 "info": {
//                     "review": "tvs.children.1.info.review",
//                     "included": null,
//                     "specs": "tvs.children.1.info.specs"
//                 },
//                 "photo": "/productos/tvs/IN3200TV-1.webp"
//             }
//         ],
//         "categoryName": "tvs.name",
//         "categoryDescription": "tvs.description",
//         "categoryShortDescription": "tvs.shortDescription"
//     },
//     "aires": {
//         "products": [
//             {
//                 "code": "80",
//                 "productCode": "itb-18000iv",
//                 "name": "AIRE ACOND ITB 18000BTU IV INTERBRAS",
//                 "price": "400",
//                 "color": "colors.white",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "aires.children.5.name",
//                 "volt": "110V",
//                 "info": {
//                     "review": "aires.children.5.info.review",
//                     "included": null,
//                     "specs": "aires.children.5.info.specs"
//                 },
//                 "photo": "/productos/aires/general.webp"
//             },
//             {
//                 "code": "82",
//                 "productCode": "itb-24000iv",
//                 "name": "AIRE ACOND ITB 24000BTU IV INTERBRAS",
//                 "price": "600",
//                 "color": "colors.white",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "aires.children.6.name",
//                 "volt": "110V",
//                 "info": {
//                     "review": "aires.children.6.info.review",
//                     "included": null,
//                     "specs": "aires.children.6.info.specs"
//                 },
//                 "photo": "/productos/aires/general.webp"
//             }
//         ],
//         "categoryName": "aires.name",
//         "categoryDescription": "aires.description",
//         "categoryShortDescription": "aires.shortDescription"
//     },
//     "scooters": {
//         "products": [
//             {
//                 "code": "252",
//                 "productCode": "8.5",
//                 "name": "X-SCOOTER PRO 8,5 NEGRO- INTERBRAS",
//                 "price": "180",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "scooters.children.85.name",
//                 "volt": null,
//                 "info": {
//                     "review": "scooters.children.85.info.review",
//                     "included": null,
//                     "specs": "scooters.children.85.info.specs"
//                 },
//                 "photo": "/productos/scooters/8.5-v1-1.webp"
//             },
//             {
//                 "code": "253",
//                 "productCode": "8.5",
//                 "name": "X-SCOOTER PRO 8,5 BLANCO-INTERBRAS",
//                 "price": "180",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "scooters.children.85.name",
//                 "volt": null,
//                 "info": {
//                     "review": "scooters.children.85.info.review",
//                     "included": null,
//                     "specs": "scooters.children.85.info.specs"
//                 },
//                 "photo": "/productos/scooters/8.5-v1-1.webp"
//             },
//             {
//                 "code": "254",
//                 "productCode": "10.5pro",
//                 "name": "X-SCOOTER PRO 10,5  NEGRO - INTERBRAS",
//                 "price": "265",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "scooters.children.10pro.name",
//                 "volt": null,
//                 "info": {
//                     "review": "scooters.children.10pro.info.review",
//                     "included": null,
//                     "specs": "scooters.children.10pro.info.specs"
//                 },
//                 "photo": "/productos/scooters/10.5pro-v1-1.webp"
//             }
//         ],
//         "categoryName": "scooters.name",
//         "categoryDescription": "scooters.description",
//         "categoryShortDescription": "scooters.shortDescription"
//     },
//     "hoverboards": {
//         "products": [
//             {
//                 "code": "255",
//                 "productCode": "hoverboards7",
//                 "name": "HOOVER BOARD 6,5 - ROXO GALAXIA (4)-INTERBRAS",
//                 "price": "60",
//                 "color": "colors.purple",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "hoverboards.children.hoverboards7.name",
//                 "volt": null,
//                 "info": {
//                     "review": "hoverboards.children.hoverboards7.info.review",
//                     "included": null,
//                     "specs": "hoverboards.children.hoverboards7.info.specs"
//                 },
//                 "photo": "/productos/hoverboards/hoverboards7-1.webp"
//             },
//             {
//                 "code": "256",
//                 "productCode": "hoverboards6",
//                 "name": "HOOVER BOARD 6,5- ROSA CAMUFLADO (13)-INTERBRAS",
//                 "price": "60",
//                 "color": "colors.pinkCamouflage",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "hoverboards.children.hoverboards6.name",
//                 "volt": null,
//                 "info": {
//                     "review": "hoverboards.children.hoverboards6.info.review",
//                     "included": null,
//                     "specs": "hoverboards.children.hoverboards6.info.specs"
//                 },
//                 "photo": "/productos/hoverboards/hoverboards6-1.webp"
//             },
//             {
//                 "code": "257",
//                 "productCode": "hoverboards3",
//                 "name": "HOOVER BOARD 6,5-AZUL FUEGO (14)-INTERBRAS",
//                 "price": "60",
//                 "color": "colors.blueFire",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "hoverboards.children.hoverboards3.name",
//                 "volt": null,
//                 "info": {
//                     "review": "hoverboards.children.hoverboards3.info.review",
//                     "included": null,
//                     "specs": "hoverboards.children.hoverboards3.info.specs"
//                 },
//                 "photo": "/productos/hoverboards/hoverboards3-1.webp"
//             },
//             {
//                 "code": "258",
//                 "productCode": "hoverboards1",
//                 "name": "HOOVER BOARD 6,5-BLACK -INTERBRAS",
//                 "price": "60",
//                 "color": "colors.black",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "hoverboards.children.hoverboards1.name",
//                 "volt": null,
//                 "info": {
//                     "review": "hoverboards.children.hoverboards1.info.review",
//                     "included": null,
//                     "specs": "hoverboards.children.hoverboards1.info.specs"
//                 },
//                 "photo": "/productos/hoverboards/hoverboards1-1.webp"
//             },
//             {
//                 "code": "259",
//                 "productCode": "hoverboards8",
//                 "name": "HOOVER BOARD 6,5 - AZUL CAMUFLADO (8)INTERBRAS",
//                 "price": "60",
//                 "color": "colors.blueCamouflage",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "hoverboards.children.hoverboards8.name",
//                 "volt": null,
//                 "info": {
//                     "review": "hoverboards.children.hoverboards8.info.review",
//                     "included": null,
//                     "specs": "hoverboards.children.hoverboards8.info.specs"
//                 },
//                 "photo": "/productos/hoverboards/hoverboards8-1.webp"
//             },
//             {
//                 "code": "263",
//                 "productCode": "hoverboards9",
//                 "name": "HOOVER BOARD 6,5-ROSA PINK - INTERBRAS",
//                 "price": "60",
//                 "color": "colors.rosePink",
//                 "show": true,
//                 "productPerBox": 1,
//                 "registered": true,
//                 "originalName": "hoverboards.children.hoverboards9.name",
//                 "volt": null,
//                 "info": {
//                     "review": "hoverboards.children.hoverboards9.info.review",
//                     "included": null,
//                     "specs": "hoverboards.children.hoverboards9.info.specs"
//                 },
//                 "photo": "/productos/hoverboards/hoverboards9-1.webp"
//             }
//         ],
//         "categoryName": "hoverboards.name",
//         "categoryDescription": "hoverboards.description",
//         "categoryShortDescription": "hoverboards.shortDescription"
//     },
// "xxxx": {....}
// }


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

    useEffect(() => {
        const init = async () => {
            const f = await fetch('https://interbras-dashboard.vercel.app/api/catalog/latest')
            const data = await f.json() as GroupedByCategory;
            setGroupedByCategory(data);
            setSelectedProducts(data);

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

        }

        init();
    }, [] );


    return (
        <>

            <div className=" px-4">
                <Filters
                    groupedByCategory={groupedByCategory}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                />
            </div>


            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}

                id="catalogScroll" className="mx-auto overflow-auto w-screen h-0 xl:h-auto ">
                <div id="catalog" className="flex flex-col gap-8 w-[1360px] mx-auto">
                    {
                        Object.keys(selectedProducts).map((category, i) => {
                            const { categoryName, products, categoryDescription } =
                                (selectedProducts as GroupedByCategory)[category];
                            return (
                                <section
                                    id="catalogSection"
                                    key={categoryName + `-${i}`}
                                    className=" flex bg-interbrasGreen-500 text-white rounded-[50px] "
                                >
                                    <div className="mx-8 my-16 flex flex-col">
                                        <h2 className="text-3xl font-bold">{categoryName}</h2>
                                        <h2 className="text-lg mt-2 max-w-80 leading-5">
                                            {categoryDescription}
                                        </h2>
                                        <h3 className="text-base max-w-80 mt-3 leading-5 text-white/70">
                                            {products[0].info.review}
                                        </h3>

                                        {products[0].registered && (
                                            <div className=" w-full mt-10 bg-interbrasGreen-600 rounded-xl  py-10">
                                                <img
                                                    className=" max-w-72 w-full rounded-3xl object-contain  mx-auto z-10"
                                                    src={products[0].photo || ""}
                                                    alt=""
                                                />
                                                <h3 className=" max-w-44 text-center mx-auto font-bold text-xl mt-3">
                                                    {products[0].originalName}
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                    {
                                        category === "triciclos" ?
                                            <TriciclosList
                                                products={products}
                                                t_catalog={t_catalog}
                                            /> :
                                            <DefaultList
                                                products={products}
                                                t_catalog={t_catalog}
                                            />
                                    }



                                </section>
                            );
                        })
                    }
                </div>
            </motion.div>
        </>
    )
}
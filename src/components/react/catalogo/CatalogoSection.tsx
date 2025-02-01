import type { grouped } from "@/components/pages/Catalogo.astro";
import { getI18NCatalog, getValueFromKey } from "@/i18n";
import { Button } from "@heroui/react";
import { useState } from "react";
import { Filters } from "./Filters";
import { motion } from "framer-motion";

export const CatalogoSection = (
    {
        groupedByCategory,
        currentLocale
    }: {
        groupedByCategory: grouped,
        currentLocale: string
    }
) => {

    const [selectedProducts, setSelectedProducts] = useState<grouped>(groupedByCategory);

    const i18n_catalog = getI18NCatalog({ currentLocale });
    const t_catalog = (key: string) => getValueFromKey(key, i18n_catalog);

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
                                selectedProducts[category];
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
                                    <ul
                                        className={`
                                        flex-1 bg-white text-black m-4 rounded-t-[50px] rounded-b-3xl grid grid-cols-2 p-3 gap-2  
                                        [&>*:nth-child(1)]:rounded-tl-[50px] [&>*:nth-child(2)]:rounded-tr-[50px]
                                        
                                        `}
                                    >
                                        {products
                                            .sort((a, b) =>
                                                (a.productCode || "").localeCompare(b.productCode || "")
                                            )
                                            .map((product) => {
                                                if (!product.show) return null;

                                                return (
                                                    <li
                                                        key={product.productCode + '-' + product.code}
                                                        className={`bg-[#f2f2f293] p-5 relative min-h-72 h-min rounded-3xl`}
                                                    >
                                                        <div className="flex gap-4">
                                                            {product.registered && (
                                                                <>
                                                                    <img
                                                                        className="w-52 h-44  rounded-3xl rounded-tl-[50px] p-2 object-contain mx-auto"
                                                                        src={product.photo || ""}
                                                                        alt=""
                                                                    />
                                                                    <div className="flex-1">
                                                                        <h3 className="text-xl font-medium">
                                                                            {t_catalog("specs")}
                                                                        </h3>
                                                                        <ul>
                                                                            {product.info.specs
                                                                                ?.split("\n")
                                                                                .slice(0, 7)
                                                                                .map((spec: string, i: number) => {
                                                                                    return <li className="text-sm" key={i}
                                                                                    >{spec}</li>;
                                                                                })}
                                                                        </ul>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="flex  mt-4 px-2 gap-3">
                                                            <div>
                                                                <h3 className="text-xl bg-interbrasGreen-500 text-white px-3 py-1 rounded-tr-xl rounded-bl-xl h-min text-nowrap">
                                                                    USD {product.price}
                                                                </h3>

                                                                {product.volt && (
                                                                    <div className="bg-interbrasGreen-100  text-interbrasGreen-500 py-[2px] rounded-tr-xl rounded-bl-xl text-xl flex-1 w-full text-center mt-1 ">
                                                                        <p>{product.volt}</p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className=" border-l border-2 border-black/5" />

                                                            <div className=" flex flex-col justify-center">
                                                                <h3 className="text-2xl  font-medium line-clamp-3 leading-6">
                                                                    {product.originalName}
                                                                </h3>
                                                                <ul className=" flex mt-2 gap-1 font-light">
                                                                    <span className=" px-2 bg-interbrasGreen-900 rounded-lg text-interbrasGreen-300">
                                                                        SKU {product.code}
                                                                    </span>

                                                                    <span className=" px-2 bg-interbrasGreen-900 rounded-lg text-interbrasGreen-300">
                                                                        {
                                                                            product.productPerBox
                                                                        } {t_catalog("perBox")}
                                                                    </span>

                                                                </ul>

                                                                {product.info.included && (
                                                                    <h4 className=" leading-5">
                                                                        <strong>{t_catalog("included")}:</strong>
                                                                        {product.info.included}
                                                                    </h4>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </section>
                            );
                        })
                    }
                </div>
            </motion.div>
        </>
    )
}
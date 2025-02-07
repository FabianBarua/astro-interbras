import type { GroupedByCategory } from "@/components/pages/Catalogo.astro";
import { getI18NCatalog, getValueFromKey } from "@/i18n";
import { useState } from "react";
import { Filters } from "./Filters";
import { motion } from "framer-motion";
import { DefaultList, TriciclosList } from "./list";


export const CatalogoSection = (
    {
        groupedByCategory,
        currentLocale
    }: {
        groupedByCategory: GroupedByCategory,
        currentLocale: string
    }
) => {

    const [selectedProducts, setSelectedProducts] = useState<GroupedByCategory>(groupedByCategory);

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
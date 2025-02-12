import type { ProductData } from './CatalogoSection';

const formatPriceUSD = (price: Number) => {
    return price.toFixed(2).toString().replace('.', ',');
}


interface IDefaultList {
    products: ProductData[],
    t_catalog: (key: string) => any
}
export const DefaultList = ({
    products,
    t_catalog
}: IDefaultList) => {
    return (
        <ul
            className={`
            flex-1 bg-white text-black m-4 rounded-[40px] grid grid-cols-2 p-3 gap-2  
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
                            className={`bg-[#f2f2f293] p-5 relative  justify-between flex  flex-1 max-h-[28rem] flex-col rounded-3xl `}
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
                                            <ul className="">
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

                            <div className="flex  mt-4 px-2 gap-3 ">
                                <div className=" justify-center flex flex-col items-center h-min my-auto ">
                                    <h3 className="text-xl bg-interbrasGreen-500 text-white px-3 py-1 rounded-tr-xl rounded-bl-xl h-min text-nowrap">
                                        USD {
                                            formatPriceUSD(Number(product.price))
                                        }
                                    </h3>

                                    {product.volt && (
                                        <div className="bg-interbrasGreen-100  h-min text-interbrasGreen-500 py-[2px] rounded-tr-xl rounded-bl-xl text-xl flex-1 w-full text-center mt-1 ">
                                            <p>{product.volt}</p>
                                        </div>
                                    )}
                                </div>

                                <div className=" border-l border-2 border-black/5" />

                                <div className=" flex flex-col justify-center">
                                    <h3 className="text-2xl  font-medium line-clamp-3 leading-6">
                                        {product.originalName}
                                    </h3>
                                    <ul className=" flex mt-2 gap-1 font-light text-nowrap">
                                        <span className=" px-2 bg-interbrasGreen-100 rounded-lg text-interbrasGreen-600 line-clamp">
                                            COD {product.code}
                                        </span>

                                        <span className=" px-2 bg-interbrasGreen-100 rounded-lg text-interbrasGreen-600 line-clamp-1">
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
    )

}

interface Joined extends ProductData {
    sizes: string[]
}

const TricicloCard = ({ product }: { product: Joined }) => {
    return (
        <li className=" h-44 w-[165px] p-3 flex justify-between  relative flex-col bg-gray-50 rounded-xl border border-gray-200">
            <img src={product.photo} alt="" className=" h-32 object-contain relative z-10" />
            <p className=" text-center leading-5 text-nowrap bg-interbrasGreen-100 text-interbrasGreen-600 rounded-xl px-2 py-1">
                {product.originalName}
            </p>
            <span className=" absolute px-2  top-2 right-2 bg-gray-100 text-gray-400 rounded-md z-0">
                {product.sizes.join(" / ")}
            </span>
        </li>
    )
}

export const TriciclosList = ({ products, t_catalog }: IDefaultList) => {
    const Joined: Joined[] = [];
    const Prices: { price: string, size: string }[] = [];

    products.forEach((product) => {
        const index = Joined.findIndex(
            (p) => p.originalName.split("-")[1] === product.originalName.split("-")[1]
        );

        const size = product.originalName.includes("6.5") ? "6.5" : "8";

        const priceIndex = Prices.findIndex((p) => p.size === size);
        if (priceIndex === -1) {
            Prices.push({ price: product.price, size });
        }

        if (index === -1) {
            Joined.push({ ...product, sizes: [size] });
        } else {
            Joined[index].sizes.push(size);
        }
    });

    return (
        <>
            <div className="flex-1 bg-white text-black m-4 rounded-[40px] p-3 gap-2">
                <ul className="flex flex-wrap justify-center gap-2">
                    {Joined.map((product) => (
                        <TricicloCard key={product.code} product={product} />
                    ))}
                    <li className="w-full p-2 flex justify-end gap-5">
                        <div className="flex-1 flex items-end flex-col">
                            <h3 className="text-xl font-medium">Triciclos</h3>
                            <p className="w-72 my-2 text-gray-500 leading-5 text-right">
                                Los enumerados con 6.5 y 8 corresponden a los precios de abajo
                            </p>
                            <div className="flex flex-col gap-1 justify-end items-end">
                                {Prices.map((p) => (
                                    <div
                                        className="flex gap-2 bg-interbrasGreen-200 pl-2 rounded-lg"
                                        key={p.size}
                                    >
                                        <h4 className="text-lg">USD {formatPriceUSD(Number(p.price))}</h4>
                                        <h4 className="text-lg bg-interbrasGreen-500 text-white rounded-lg w-12 flex justify-center items-center">
                                            {p.size}''
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-full border"></div>
                        <div className="w-fit">
                            <h3 className="text-xl font-medium">{t_catalog("specs")}</h3>
                            <ul className="max-w-md">
                                {products[0].info.specs
                                    ?.split("\n")
                                    .slice(0, 7)
                                    .map((spec: string, i: number) => (
                                        <li className="text-sm text-wrap" key={i}>
                                            {spec}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
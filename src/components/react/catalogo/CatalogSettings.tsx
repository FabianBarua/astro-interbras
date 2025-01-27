import { data, type Category, type Root } from "@/shared/utils";
import { useEffect, useRef, useState } from "react";

const JsonOriginal = ({
  catalogJson,
  setCatalogJson,
}: {
  catalogJson: string | undefined;
  setCatalogJson: (value: string) => void;
}) => {
  return (
    <div className=" flex w-full justify-between items-center gap-10">
      <div>
        <h1 className=" text-4xl font-bold">Json original</h1>
        <button
          className=" bg-gray-800 text-white p-2 rounded-xl w-full mt-3"
          onClick={() => setCatalogJson("")}
        >
          Clear
        </button>

        <button
          className=" bg-gray-800 text-white p-2 rounded-xl w-full mt-1"
          onClick={() => setCatalogJson(JSON.stringify(data))}
        >
          Load
        </button>
      </div>

      <textarea
        className=" bg-gray-800 h-32 resize-none text-white w-96  rounded-xl p-3 focus:outline-none"
        value={catalogJson}
        onChange={(e) => setCatalogJson(e.target.value)}
      ></textarea>
    </div>
  );
};

interface ProductStock {
  id: string;
  name: string;
  price: number;
  show: number;
}

const SelectProduct = ({
  productExcel,
  clickedOnExcelProduct,
}: {
  productExcel: ProductStock[];
  clickedOnExcelProduct: (id: string) => void;
}) => {
  const [query, setQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductStock[]>([]);

  return (
    <>
      <input
        className=" w-full bg-gray-900 h-9 rounded-lg mt-3 focus:outline-none px-2 "
        type="text"
        onBlur={() =>
          setTimeout(() => {
            setFilteredProducts([]);
          }, 500)
        }
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setFilteredProducts(
            productExcel.filter((product) =>
              product.name.toLowerCase().includes(e.target.value.toLowerCase()),
            ),
          );
        }}
      />
      <ul className=" absolute bg-gray-800 w-full rounded-lg mt-1 overflow-y-auto max-h-96">
        {filteredProducts?.map((product) => (
          <li
            onClick={() => clickedOnExcelProduct(product.id)}
            key={product.id}
            className=" bg-gray-700 w-full p-1 rounded-lg mt-1 cursor-pointer hover:bg-gray-600"
          >
            <p className="text-sm">{product.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export const CatalogSettings = () => {
  const [catalogJson, setCatalogJson] = useState<string | undefined>("");
  const [products, setProducts] = useState<Root>();
  const [filteredProducts, setFilteredProducts] = useState<Root>();
  
  useEffect(() => {
    setFilteredProducts(products);
  } , [products])

  const temporalData = useRef('')

  const [productExcel, setProductExcel] = useState<ProductStock[]>();

  const firstLoad = useRef(true);
  useEffect(() => {
    if (!firstLoad.current) {
      if (catalogJson) {
        const data = JSON.parse(catalogJson) as Root;
        setProducts(data);
      } else {
        setProducts(undefined);
      }
    }
    firstLoad.current = false;
  }, [catalogJson]);

  return (
    <div className=" bg-gray-950 text-white min-h-dvh p-10 flex flex-col w-full ">
        <button className=" mx-auto  justify-center bg-gray-600 px-2 py-1 text-xl rounded-lg"
            onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(products));
            }}
        >
            Copy
        </button>
      <div className=" max-w-7xl mx-auto w-full">
        <JsonOriginal
          catalogJson={catalogJson}
          setCatalogJson={setCatalogJson}
        />

        <div className=" flex w-full justify-between items-center gap-10">
          <div>
            <h1 className=" text-4xl font-bold">Products in excel</h1>
            <p>Cantidad: {productExcel?.length || 0}</p>
          </div>

          <textarea
            className=" bg-gray-800 h-32 resize-none text-white w-96  rounded-xl p-3 focus:outline-none"
            value={productExcel ? JSON.stringify(productExcel) : ""}
            onChange={(e) => {
              const newData = e.target.value.split("\n").map((line) => {
                const [id, name, price, show] = line.split("\t");
                return {
                  id,
                  name,
                  price: parseFloat(price),
                  show: parseInt(show),
                };
              });
              setProductExcel(newData);
              temporalData.current = e.target.value;

            }}
          ></textarea>
        </div>
      </div>

        <input type="text" className=" max-w-7xl mx-auto w-full mt-8 bg-gray-900 h-12 rounded-xl px-3" placeholder="Buscar"
            onChange={
                (e) => {
                    const newProducts = products?.products.map((product) => {
                        return {
                            ...product,
                            children: product.children.map((child) => {
                                return {
                                    ...child,
                                    variants: child.variants.filter((variant) => {
                                        return variant.name.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase());
                                    })
                                }
                            })
                        }
                    })
                    
                    setFilteredProducts({
                        ...products,
                        products: newProducts || []
                    })

                }
            }
        />

      <div className=" w-full grid grid-cols-4 max-w-7xl  mx-auto mt-8">
        {filteredProducts?.products.map((product) =>
          product.children.map((child) =>
            child.variants.map((child) => (
              <div key={child.id} className=" bg-gray-800 p-4 rounded-xl m-4">
                <p>{child.id}</p>
                <img src={child.photos[0]} alt="" />
                <h1 className=" text-2xl font-bold">{child.name}</h1>

                <div className="relative">
                  <SelectProduct
                    clickedOnExcelProduct={(id) => {

                      setProducts((prev) => {
                        const newProducts = prev?.products.map((innerProduct) => ({
                          ...innerProduct,
                          children: innerProduct.children.map((innerChild) => ({
                            ...innerChild,
                            variants: innerChild.variants.map(
                                (innerVariant) => {
                                    if (
                                        child.id === innerVariant.id
                                    ) {
                                        innerVariant.catalogId = [...(innerVariant.catalogId || []), id];
                                    }
                                    return innerVariant;
                                }
                            ) 
                          })),
                        }));

                        return {
                          ...prev,
                          products: newProducts || [],
                        };
                      });

                      
                    setProductExcel((prev) => {
                        return prev?.filter((product) => product.id !== id);
                    })

                    }
                }


                    productExcel={productExcel || []}
                  />
                </div>

                <div className=" flex flex-row mt-2 gap-2 flex-wrap">
                {child.catalogId?.map((id) => (
                  <p
                    key={id}
                    className=" flex gap-2 bg-gray-700 w-min p-1 rounded-lg mt-2"
                  >
                    <button
                      onClick={() => {
                        setProducts((prev) => {
                          const newProducts = prev?.products.map((product) => ({
                            ...product,
                            children: product.children.map((child) => ({
                              ...child,
                              variants: child.variants.map((variant) => ({
                                ...variant,
                                catalogId: variant.catalogId?.filter(
                                  (catalogId) => catalogId !== id,
                                ),
                              })),
                            })),
                          }));

                          return {
                            ...prev,
                            products: newProducts || [],
                          };
                        });

                        // add to excelProduct
                        const productMocked = temporalData.current.split("\n").map((line) => {
                            const [id, name, price, show] = line.split("\t");
                            return {
                              id,
                              name,
                              price: parseFloat(price),
                              show: parseInt(show),
                            };
                          })

                        const product = productMocked.find((product) => product.id === id);
                        if (product) {
                          setProductExcel((prev) => prev ? [...prev, product] : [product]);
                        }

                      }}
                      className=" size-6 rounded-lg bg-gray-800 hover:bg-red-700 flex justify-center items-center text-sm "
                    >
                      X
                    </button>
                    {id}
                  </p>
                ))}
                </div>
              </div>
            )),
          ),
        )}
      </div>
    </div>
  );
};

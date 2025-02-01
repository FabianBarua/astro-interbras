import type { grouped } from "@/components/pages/Catalogo.astro";
import { Alert, Button, Card, cn, Input, Select, SelectItem, Switch } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { OpenSelect } from "./OpenSelect";
import { useDebouncedCallback } from 'use-debounce';

const categories = (grouped: grouped) => {
    return Object.keys(grouped).map((category) => {
        return {
            key: category,
            label: grouped[category].categoryName,
        };
    });
}

const all_voltages = (grouped: grouped) => {
    const voltages = new Set<string>();
    Object.keys(grouped).map((category) => {
        return grouped[category].products.map((product) => {
            if (!voltages.has(product.volt || 'null')) {
                voltages.add(product.volt || 'null');
            }
        });
    })
    return voltages;
}

export const Filters = (
    {
        groupedByCategory,
        selectedProducts,
        setSelectedProducts,
    }: {
        groupedByCategory: grouped;
        selectedProducts: grouped;
        setSelectedProducts: React.Dispatch<React.SetStateAction<grouped>>;
    }
) => {

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(
        Object.keys(groupedByCategory)
    ));
    const [voltagesSelected, setVoltagesSelected] = React.useState(
        new Set(all_voltages(groupedByCategory))
    )
    const [search, setSearch] = React.useState('');

    const debounced = useDebouncedCallback(
        // function
        (value: string) => {
            console.log('debounced', value);
            setSearch(value);
        },
        // delay in ms
        100
    );

    useEffect(() => {
        filter();
    }, [selectedKeys, voltagesSelected, search]);

    const filter = () => {
        // by voltage
        const selectedByVoltage = Object.keys(groupedByCategory).reduce((acc: grouped, category) => {
            const products = groupedByCategory[category].products.filter((product) => {
                return voltagesSelected.has(product.volt || 'null');
            });
            if (products.length > 0) {
                acc[category] = {
                    ...groupedByCategory[category],
                    products,
                };
            }
            return acc;
        }, {});

        // by category
        const selectedByCategory = Object.keys(selectedByVoltage).reduce((acc: grouped, category) => {
            if (selectedKeys.has(category)) {
                acc[category] = selectedByVoltage[category];
            }
            return acc;
        }, {});


        if (!search) {
            console.log('selectedByCategory', selectedByCategory);
            setSelectedProducts(selectedByCategory);
            return;
        }

        const searchFiltered = Object.keys(selectedByCategory).reduce((acc: grouped, category) => {
            const products = selectedByCategory[category].products.filter((product) => {
                return product.name.toLowerCase().includes(search?.toLowerCase()) && product.show
            });
            if (products.length > 0) {
                acc[category] = {
                    ...selectedByCategory[category],
                    products,
                };
            }
            return acc;
        }, {});

        setSelectedProducts(searchFiltered);
    }



    return (
        <>

            <Card className=" max-w-[1360px] mx-auto my-5 p-7 fade  overflow-visible  relative flex-row gap-2 z-10">

                <div className=" w-full  lg:block hidden">
                    <Input
                        label="Buscar"
                        labelPlacement={'outside-left'}
                        placeholder="Nombre del producto"
                        type="text"
                        className=" w-full flex-shrink"
                        onChange={(e) =>
                            debounced(e.target.value)
                        }
                        classNames={
                            {
                                input: "w-full",
                                label: "text-gray-500",
                                inputWrapper: "w-full flex-shrink bg",
                                mainWrapper: "w-full flex-shrink",
                            }
                        }
                    />
                </div>


                <div className=" flex gap-2 w-full items-center justify-end">
                    <OpenSelect
                        title="Categorías"
                        options={categories(groupedByCategory)}
                        selectedKeys={selectedKeys}
                        setSelectedKeys={setSelectedKeys}
                    />

                    <OpenSelect
                        title="Voltaje"
                        options={
                            Array.from(all_voltages(groupedByCategory)).map((voltage) => {
                                return {
                                    key: voltage || 'null',
                                    label: voltage === 'null' ? 'Sin voltaje' : voltage,
                                }
                            })
                        }

                        selectedKeys={voltagesSelected}
                        setSelectedKeys={setVoltagesSelected}
                    />

                </div>
            </Card >



        </>

    );
}
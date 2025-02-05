import { db } from "@root/db/config";
import { Category, Color, Photo, Product, Variant, Volt } from "@root/db/schema";
import { and, eq, inArray } from "drizzle-orm";


type getProductsProps = Partial<{
    id? : string | string[],
    category_id? : string | string[]
}>;

export type Volt = {
    id: number
    name: string
}

export type Color = {
    id: number
    color: string
}

export type Photo = {
    id: number
    url: string
    order: number
}

const getProducts = async (settings: getProductsProps = {}) => {
    
    const filters = [];
    
    if (settings.id) {
        Array.isArray(settings.id) 
            ? filters.push(inArray(Product.id, settings.id)) 
            : filters.push(eq(Product.id, settings.id));
    }
    
    if (settings.category_id) {
        Array.isArray(settings.category_id) 
            ? filters.push(inArray(Product.category_id, settings.category_id)) 
            : filters.push(eq(Product.category_id, settings.category_id));
    }

    const products = await db.select().from(Product)
        .fullJoin(Variant, eq(Variant.product_id, Product.id))
        .fullJoin(Photo, eq(Photo.variant_id, Variant.id))
        .fullJoin(Category, eq(Category.id, Product.category_id))
        .fullJoin(Color, eq(Color.id, Variant.color_id))
        .fullJoin(Volt, eq(Volt.id, Variant.volt_id))
        .where(and(...filters))

    type Category = {
        id: string
        name: string
        description: string
        shortDescription: string
    }

    type finalProducts = {
        id: string
        name: string
        review: string
        included: string | null
        specs: string
        category: Category
        variants: {
            id: number
            color: Color | null
            volt: Volt | null
            photos: Photo[]
        }[]
    }

    const finalProducts : finalProducts[] = []

    products.forEach(product => {
        const productIndex = finalProducts.findIndex(p => p.id === product.product?.id)

        const photo : Photo = {
            id: product.photo?.id || 0,
            url: product.photo?.url || '',
            order: product.photo?.order || 0
        }

        const color : Color = {
            id: product.color?.id || 0,
            color: product.color?.color || ''
        }

        const volt : Volt = {
            id: product.volt?.id || 0,
            name: product.volt?.name || ''
        }


        if (productIndex === -1) {
            const productToAdd = {
                id: product.product?.id || '',
                name: product.product?.name || '',
                review: product.product?.review || '',
                included: product.product?.included ?? null,
                specs: product.product?.specs || '',
                category: {
                    id: product.category?.id || '',
                    name: product.category?.name || '',
                    description: product.category?.description || '',
                    shortDescription: product.category?.shortDescription || ''
                },
                variants: [
                    {
                        id: product.variant?.id || 0,
                        color: color,
                        volt: volt,
                        photos: [photo]
                    }
                ]
            }

            finalProducts.push(productToAdd)
            
        } else {
            const variantIndex = finalProducts[productIndex].variants.findIndex(v => v.id === product.variant?.id)
            if (variantIndex === -1) {
                finalProducts[productIndex].variants.push({
                    id: product.variant?.id || 0,
                    color: color,
                    volt: volt,
                    photos: [photo]
                })
            } else {
                finalProducts[productIndex].variants[variantIndex].photos.push(photo)
            }
        }
    })

    return finalProducts
};

export { getProducts }

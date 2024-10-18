import React, { useEffect, useRef, useState } from 'react'

import { type Children } from '@/shared/utils'
import { motion } from 'framer-motion'


import type { Category } from '@/shared/utils'
import { getI18NProducts, getValueFromKey } from '@/i18n'
import { ProductCard } from '@/components/react/ProductCard'
import { PhotoViewer } from '@/components/react/PhotoViewer'

import { ProductInfo } from '@/components/react/ProductInfo'
import { CarrouselCategory } from '@/components/react/CarrouselCategory'

interface ProductPageProps {
  category: Category;
  lang: string;
}

export const ProductPage: React.FC<ProductPageProps> = ({ category, lang }) => {



  const productSelected = category

  interface scroll {
    scrollY: number
  }

  const [scrolling, setScrolling] = useState<scroll>({
    scrollY: 0
  })
  const [scrollY, setScrollY] = useState<number>(0)

  const [childSelected, setChildSelected] = useState<Children>(
    productSelected.children[0]
  )

  useEffect(
  () =>{

    const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get('model');
    if (model) {
      const child = productSelected.children.find((child) => child.id === model)
      if (child) {
        setChildSelected(child)
      }
    }

  },
  []
  )

  useEffect(
  ()=>{

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('model', childSelected.id)
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

    
  },[
    childSelected
  ]
  )


  const contaiterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setScrollY(
      prev => {
        if (contaiterRef.current != null) {
          return contaiterRef.current.scrollHeight - contaiterRef.current.clientHeight - 20
        }
        return prev
      }
    )
  }, [])


  const getAllPhotosOfAllVariants = (): string[] => {
    const photos: string[] = []
    childSelected.variants.forEach((variant) => {
      variant.photos.forEach((photo) => {
        photos.push(photo)
      })
    })
    return photos
  }

  const i18n = getI18NProducts({
    currentLocale: lang,
  });
  
  const t = (key: string) => {
    return getValueFromKey(key, i18n);
  };
  

  const name = t(productSelected.name)
  const description = t(productSelected.description)

  return (
    <>


      <motion.main
        className=' w-full flex flex-col mx-auto flex-1 py-16 '
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className=' sm:w-[60%] w-[90%] flex lg:flex-row flex-col justify-center gap-10  mx-auto '>
          <div className=' no-select '>
            <PhotoViewer
              key={childSelected.name}
              name={name}
              photos={getAllPhotosOfAllVariants()}
            />
          </div>
          <div className='  flex-1 w-full '>
            <h1 className=' text-4xl font-semibold'>{name}</h1>
            <h2 className=' text-lg  mt-1 font-light leading-5'>
              {description.split('\n').map((line:string, index:number) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <h3 className=' mt-4  text-lg font-medium text-neutral-800/3'>
              {t('whatDoYouWant')}
            </h3>

            <div className='  relative mt-3'>
              <div
                onScrollCapture={
                  (e) => {
                    setScrolling({
                      scrollY: e.currentTarget.scrollTop
                    })
                  }
                }
                style={{
                  overflow: 'auto'
                }}

            
                ref={contaiterRef}
                className='hideScrollBar  transition-all w-full  flex flex-col gap-1 relative  h-auto sm:h-[23rem]  '
              >
                {productSelected.children.map((child, index) => (
                  <ProductCard
                    child={child}
                    key={index}
                    active={childSelected === child}
                    change={(child) => {
                      setChildSelected(child)
                    }}
                    lang={lang}
                  />
                ))}
              </div>

              <div
                style={{
                  height: scrolling.scrollY < scrollY ? '40px' : '0px',
                }}
                className=' w-full h-20 mask  bottom-0 absolute transition-all z-10 pointer-events-none bg-[#ffffff] hidden sm:block '
              />
              <div
                style={{
                  height: scrolling.scrollY > 0 ? '40px' : '0px',
                }}
                className=' w-full h-20 mask top-0 absolute transition-all z-10 rotate-180 pointer-events-none bg-[#ffffff] hidden sm:block '
              />
            </div>
          </div>
        </div>
        <ProductInfo lang={lang} {...childSelected.info} />
        <CarrouselCategory lang={lang} />
      </motion.main>
    </>
  )
}



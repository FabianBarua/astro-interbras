import { getI18NProducts, getValueFromKey, getI18NGlobal } from '@/i18n'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useState } from 'react'
import { getCategories } from '@/shared/utils'

import {getRelativeLocaleUrl} from 'astro:i18n'


interface CarrouselCategoryProps {
  lang: string
}

export const CarrouselCategory: React.FC<CarrouselCategoryProps> = ({lang}) => {
  const categories  = getCategories()

  const i18n = getI18NProducts({
    currentLocale: lang,
  });

  const t = (key: string) => {
    return getValueFromKey(key, i18n);
  };
    
  const i18nGlobal = getI18NGlobal({
    currentLocale: lang,
  })

  const t2 = (key: string) => {
    return getValueFromKey(key, i18nGlobal);
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true
  }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)

  emblaApi?.on('select', () => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }
  )

  return (
    <>
      <h3 className=' text-center text-3xl mt-12 mb-8 text-black/80 font-light'>
        {
          t('youMayAlsoBeInteresed')
        }
      </h3>
      <div
        ref={emblaRef}
        className={
          `
          w-full relative flex overflow-hidden scroller
          lg:after:w-96 after:absolute after:z-50 after:h-full after:bg-[linear-gradient(to_left,transparent_10%,#f2f2f2_80%)]
          lg:before:w-96 before:absolute before:z-50 before:h-full before:bg-[linear-gradient(to_right,transparent_10%,#f2f2f2_80%)] before:right-0
          `
        }
      >
        <ul className=' flex w-full'>
          {
    categories.map((item, index) => (
      <li
        key={item.id.toString() + index.toString()}
        className={
          `
          py-4  mx-5
          no-select 
          `
        }
      >
        <div className={
            ` 
            ${
            index === selectedIndex
              ? ' bg-interbrasGray scale-110 border-interbrasGreen-500'
              : 'bg-[#E7E7E7]'
            }
             
            mx-2 duration-1000
            py-6 transition-all w-72  h-min flex items-center flex-col rounded-3xl border-2  
            `
        }
        >

          <p className={
            `
             text-2xl transition-colors font-medium text-center 
             ${
                index === selectedIndex ? ' text-white' : 'text-[#636363]'
             }
            `
          }
          >
            {t(item.name)}
          </p>
          <p className={
            `
            ${
              index === selectedIndex ? ' text-white' : 'text-[#787878]'
            }
            text-xl  transition-colors duration-100 font-light text-center
            `
          }
          >
            {t(item.shortDescription)}
          </p>
          <a
            href={
              getRelativeLocaleUrl(
                lang,
                `/productos/${item.id}`
              )
            }
            onClick={
              () => {
                window.scrollTo(0, 0)
              }
            }
            className={
              `
              ${
                index === selectedIndex ? ' bg-interbrasGreen-500' : 'bg-[#A2A2A2]'
                }
                transition-colors  buttonMore bg-interbrasGreen-500 w-min font-light text-nowrap mt-2 mx-auto text-white px-4 py-1 rounded-xl
                `
              }
          >
            {
            t2('moreProducts')
            }
          </a>
        </div>

      </li>
    )
    )
    }
        </ul>

      </div>
    </>
  )
}

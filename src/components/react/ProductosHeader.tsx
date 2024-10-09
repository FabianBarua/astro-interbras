import { getI18NGlobal, getI18NProducts, getValueFromKey } from '@/i18n'
import { getLangFromUrl } from '@/i18n/utils'
import { getUrls } from '@/shared/utils'
import { motion } from 'framer-motion'
import React from 'react'

interface ProductosHeaderProps {
  clicked?: () => void
}

interface LinkItemProps {
  to: string
  children: React.ReactNode
  lang: string
  clicked?: () => void
}

const LinkItem: React.FC<LinkItemProps> = ({ to, children, clicked, lang }) => {
  return (
    <a hrefLang={lang === "pt" ? "pt-BR" : lang || "es"} 
      className=' opacity-55 hover:opacity-100 transition-colors'
      href={to}
      onClick={
        () => {
          if (clicked !== undefined) {
            clicked()
          }
        }
      }
    >
      {children}
    </a>
  )
}

export const ProductosHeader: React.FC<ProductosHeaderProps> = ({
  clicked
}) => {
 const urls = getUrls()

    const lang = getLangFromUrl(
        new URL(window.location.href)
    )

    const i18nProduct = getI18NProducts({
        currentLocale: lang,
    });


    const i18nGlobal = getI18NGlobal({
        currentLocale: lang,
    })

    const t = (key: string) => {
        return getValueFromKey(key, i18nGlobal);
    }

    const t2 = (key: string) => {
        return getValueFromKey(key, i18nProduct);
    };
        

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className=' h-full w-full flex justify-center'
    >
      <div className=' mt-5 lg:mt-auto mx-3  lg:mx-0 text-white flex lg:my-auto lg:flex-row flex-col gap-6 '>
        <img loading="lazy"  src='/productosHeader.webp' className='  h-64 ' alt='Arrow' />
        <div className=' flex flex-col items-left'>
          <h3 className='text-lg  font-bold'>
            {t('header.products.text')}
          </h3>
          <div className=' flex gap-16 mt-2'>
            <div className=' flex-col flex'>
              {
                urls.slice(0, 8).map(url => (
                  <LinkItem
                    lang={lang}
                    clicked={clicked} to={url.url}
                    key={'id-header-' + t2(url.name)}
                  >
                    {t2(url.name)}
                  </LinkItem>
                ))
              }
            </div>
            <div className=' flex-col flex'>
              {
                urls.slice(8, urls.length).map(url => (
                  <LinkItem
                    lang={lang}
                    clicked={clicked} to={url.url}
                    key={'id-header-' + url.name}
                  >
                    {t2(url.name)}
                  </LinkItem>
                ))
              }
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

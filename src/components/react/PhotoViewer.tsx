import { ShowMore } from '@/components/react/ShowMore'
import '@fabianbarua/react-photo-view/dist/react-photo-view.css'
import { PhotoProvider, PhotoView } from '@fabianbarua/react-photo-view'
import { useRef } from 'react'

interface PhotoViewProps {
  name: string
  photos: string[]
}

export const PhotoViewer: React.FC<PhotoViewProps> = ({
  name,
  photos
}) => {
  const ref = useRef<HTMLDivElement>(null)
  // make onlcick to show more photos
  const handleClick = (): void => {
    ref.current?.click()
  }

  const viewPhotos = photos.slice(0, 3)
  const hiddenPhotos = photos.slice(3)

  return (
    <>
      <PhotoProvider>
        <PhotoView
          key={
            photos[0] + '-main-photo'
          }
          src={photos[0]}
        >
          <img
            ref={ref as React.LegacyRef<HTMLImageElement>}
            src={photos[0]} alt={name} className=' object-contain p-7  size-[400px] w-full lg:min-w-[400px] lg:w-[402px]  bg-white rounded-3xl'
          />
        </PhotoView>

        <div className=' flex gap-[6px] overflow-auto w-full mt-2'>
          {
            viewPhotos?.slice(0, 3)
              .map((photo, index) => (
                <div
                  key={index}
                  className=' cursor-pointer size-24 justify-center items-center flex bg-white rounded-3xl border-2 hover:bg-neutral-200 text-neutral-500 p-2'
                >

                  <PhotoView
                    key={
                    photos[0] + '-photo-' + index.toString()
                  }
                    src={photo}
                  >
                    <img
                      src={photo}
                      alt={name}
                      className=' size-24 object-contain'
                    />
                  </PhotoView>
                </div>
              ))
        }

          <div
            onClick={
              handleClick
            } className=' cursor-pointer size-24 justify-center items-center flex bg-white rounded-3xl border-2 hover:bg-neutral-200 text-neutral-500 p-6'
          >
            <ShowMore />
          </div>

        </div>

        <div className=' hidden'>
          {
            hiddenPhotos.map((photo, index) => (
              <PhotoView
                key={index}
                src={photo}
              >
                <img
                  src={photo}
                  alt={name}
                  className='hidden'
                />
              </PhotoView>
            ))
            }
        </div>
      </PhotoProvider>
    </>
  )
}

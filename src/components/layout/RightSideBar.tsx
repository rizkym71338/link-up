import { NextImage } from '@/components'

export const RightSideBar = () => {
  return (
    <section className="custom-scrollbar sticky right-0 top-0 hidden h-screen w-full max-w-[350px] overflow-auto border-l border-dark-2 p-6 lg:block">
      <NextImage
        src="/assets/ad.jpg"
        alt="ad"
        className="aspect-video w-full rounded-lg"
        useSkeleton
      />
    </section>
  )
}

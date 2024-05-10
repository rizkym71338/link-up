import { NextImage } from '@/components'

export const RightSideBar = () => {
  return (
    <section className="custom-scrollbar sticky right-0 top-0 hidden h-screen w-full max-w-[350px] overflow-auto border-l border-dark-2 p-6 lg:block">
      <h1 className="mb-6 text-heading3-bold">Sponsored</h1>
      <NextImage
        src="/assets/ad.jpg"
        alt="ad"
        className="mb-6 aspect-[4/3] w-full rounded-lg object-cover"
        useSkeleton
      />
    </section>
  )
}

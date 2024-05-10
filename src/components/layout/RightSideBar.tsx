import { NextImage } from '@/components'

export const RightSideBar = () => {
  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-10 h-screen w-full max-w-[300px] overflow-auto border-l border-dark-2 p-4 max-lg:hidden">
      <h1 className="mb-4 text-heading3-bold">Sponsored</h1>
      <NextImage
        src="/assets/ad.jpg"
        alt="ad"
        className="mb-4 aspect-[4/3] w-full rounded-lg object-cover"
        useSkeleton
      />
      <p className="mb-4 text-body-bold">Febreze Air Freshener</p>
      <p className="mb-4 text-small-semibold text-light-2">
        Instant odor fighting and a burst of freshness. Amazing summer scent. It
        is so light and fruity and if you are a scent person it has major happy
        vibes.
      </p>
    </section>
  )
}

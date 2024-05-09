export const RightSideBar = () => {
  return (
    <div className="custom-scrollbar sticky right-0 top-0 hidden h-screen w-[300px] flex-col gap-12 overflow-auto p-6 pr-10 md:flex xl:w-[350px]">
      <div className="flex flex-col gap-4">
        <h4 className="text-heading4-bold">Following</h4>
        <div className="flex flex-col gap-4">Maping Users</div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-heading4-bold">Suggested People</h4>
        <div className="flex flex-col gap-4">Maping Users</div>
      </div>
    </div>
  )
}

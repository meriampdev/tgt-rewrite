export default function Featured() {
  return (
    <div className="marketing relative md:pt-16 pb-16">
      <div className="marketing-cards flex absolute px-5 md:px-32 w-full justify-center">
        <div className="w-auto md:w-11/12 mx-auto">
          <div className="bg-white cards-wrapper rounded-sm flex flex-col md:flex-row items-center justify-between px-5 md:px-10">
            <div className="marketing-card flex flex-col justify-center items-center p-5">
              <div className="h-10 md:h-16 mb-2">
                <img className="h-full object-contain" src="/images/icons/groceries.svg" alt="" />
              </div>
              <span className="text-xs md:text-sm text-green-700 font-bold">Fresh Products</span>
              <span className="hidden md:flex text-xs">Lorem ipsum dolor sit amet</span>
            </div>
            <div className="marketing-card flex flex-col justify-center items-center p-5">
              <div className="h-10 md:h-16 mb-2">
                <img className="h-full object-contain" src="/images/icons/sanitize.svg" alt="" />
              </div>
              <span className="text-xs md:text-sm text-green-700 font-bold">{`Safe & Sanitized`}</span>
              <span className="hidden md:flex text-xs">Lorem ipsum dolor sit amet</span>
            </div>
            <div className="marketing-card flex flex-col justify-center items-center p-5">
              <div className="h-10 md:h-16 mb-2">
                <img className="h-full object-contain" src="/images/icons/money.svg" alt="" />
              </div>
              <span className="text-xs md:text-sm text-green-700 font-bold">Secure Payment</span>
              <span className="hidden md:flex text-xs">Lorem ipsum dolor sit amet</span>
            </div>
            <div className="marketing-card flex flex-col justify-center items-center p-5">
              <div className="h-10 md:h-16 mb-2">
                <img className="h-full object-contain" src="/images/icons/delivery.svg" alt="" />
              </div>
              <span className="text-xs md:text-sm text-green-700 font-bold">Delivery Schedule</span>
              <span className="hidden md:flex text-xs">Lorem ipsum dolor sit amet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
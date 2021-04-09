import Link from 'next/link'

export default function MainBanner() {
  return (
    <>
      <div className="main-banner">
        <div className="hero-text-container px-10 sm:px-6 sm:py-24 lg:px-20">
          <h1 className="text-center md:text-left text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="block text-white font-bold">Online Shopping</span>
            <span className="block text-white">Made Easy</span>
          </h1>
          <p className="mt-6 max-w-lg text-center md:text-left text-xl text-white sm:max-w-2xl">
            <span>We Supply Fresh & Locally Grown Produce</span><br />
            <span>Fruits and Vegetables</span>
          </p>
          <div className="mt-6 bg-green-700 max-w-sm mx-auto md:mx-1 md:max-w-sm md:max-w-sm ">
            <Link href='/shop'>
              <a href="/shop" className="text-white shop-now-btn flex items-center justify-center px-4 py-3 border border-transparent text-xl font-bold rounded-sm shadow-sm sm:px-8">
                Shop Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
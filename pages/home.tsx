import Head from 'next/head'
import MainBanner from '../components/home/main-banner'

export default function Home() {
  return (
    <div className="landing-page">
      <Head><title>Home | The Green Table</title></Head>
      <MainBanner />
    </div>
  )
}

import Header from './header'
import Search from './search'
import Footer from './footer'

interface IProps {
  children: any
}
export default function Layout(props: IProps) {
  return (
    <div className="app-layout">
      {/* <Header /> */}
      <Search />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
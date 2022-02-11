import Nav from './Nav'
import Search from './Search'
export default function Header() {
  return (
    <header className="ht-header">
        <div className="container">
          <Nav />
          <Search />
        </div>
      </header>
  )
}
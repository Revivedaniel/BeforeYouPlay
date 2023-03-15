import Nav from './Nav'
import Search from './Search'
export default function Header({setLogin, setSignUp}) {
  return (
    <header className="ht-header">
        <div className="container" style={{paddingBottom: "12px"}}>
          <Nav setLogin={setLogin} setSignUp={setSignUp}/>
          <Search />
        </div>
      </header>
  )
}
import Jumbotron from "./Jumbotron";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";

export default function Nav({setLogin, setSignUp}) {
  return (
    <nav className="navbar navbar-default navbar-custom">
      <Jumbotron />
      <div
        className="collapse navbar-collapse flex-parent"
        id="bs-example-navbar-collapse-1"
      >
        <MenuLeft />
        <MenuRight setLogin={setLogin} setSignUp={setSignUp}/>
      </div>
    </nav>
  );
}

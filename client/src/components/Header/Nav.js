import Jumbotron from "./Jumbotron";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";

export default function Nav() {
  return (
    <nav className="navbar navbar-default navbar-custom">
      <Jumbotron />
      <div
        className="collapse navbar-collapse flex-parent"
        id="bs-example-navbar-collapse-1"
      >
        <MenuLeft />
        <MenuRight />
      </div>
    </nav>
  );
}

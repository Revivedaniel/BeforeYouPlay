export default function Jumbotron() {
  return (
    <div className="navbar-header logo">
      <div
        className="navbar-toggle"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
      >
        <span className="sr-only">Toggle navigation</span>
        <div id="nav-icon1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <a href="index.html">
        <img
          className="logo"
          src="images/logo1.png"
          alt=""
          width="119"
          height="58"
        />
      </a>
    </div>
  );
}

import css from "./Jumbotron.module.css";

export default function Jumbotron() {
  return (
    <a href="/" className={css.a}>
      <img
        src="/images/logo1.png"
        alt="Before You Play Logo"
        width="119"
        height="58"
      />
    </a>
  );
}

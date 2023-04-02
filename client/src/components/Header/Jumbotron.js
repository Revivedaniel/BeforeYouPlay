import css from "./Jumbotron.module.css";
import Link from 'next/link'

export default function Jumbotron() {
  return (
    <Link href="/" className={css.a}>
      <img
        src="/images/logo1.png"
        alt="Before You Play Logo"
        width="119"
        height="58"
      />
    </Link>
  );
}

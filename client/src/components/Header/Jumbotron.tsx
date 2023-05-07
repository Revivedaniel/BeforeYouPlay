import Image from "next/image";
import css from "./Jumbotron.module.css";
import Link from 'next/link'
import logo from "../../assets/logo1.webp"

export default function Jumbotron() {
  return (
    <Link href="/" passHref className={css.a}>
        <Image
          src={logo}
          alt="Before You Play Logo"
        />
    </Link>
  );
}

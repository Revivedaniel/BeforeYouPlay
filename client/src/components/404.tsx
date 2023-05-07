import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import logo from "../assets/logo1.png";

export default function FourOhFour(): JSX.Element {

  useEffect(() => {
    document.title = "404 - Page Not Found";
  })

  return (
    <div className="page-single-2">
      <div className="container">
        <div className="row">
          <div className="middle-content">
            <Link href="/">
              <Image src={logo} alt="Before You Play Logo" />
            </Link>
            {/* <img src="images/uploads/err-img.png" alt="" /> */}
            <h1>Page not found</h1>
            <Link href="/" className="redbtn">
              go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

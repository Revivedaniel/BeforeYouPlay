import { ListItemButton } from "@mui/material";
import Link from "next/link";
import Auth from "../../utils/auth";
import css from "./MenuRight.module.css";

interface MenuRightProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuRight({ setLogin, setSignUp }: MenuRightProps) {
  const handleLogin = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setLogin(true);
  };
  const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setSignUp(true);
  };

  return (
    <>
      {!Auth.loggedIn() ? (
        <>
          <ListItemButton
            href="#"
            onClick={handleLogin}
            className={css.login}
          >
            Login
          </ListItemButton>
          <ListItemButton
            href="#"
            onClick={handleSignUp}
            sx={{
              position: "relative",
              display: "block",
              padding: "10px 15px",
              color: "var(--primary-dark)",
            }}
            className={css.signup}
          >
            sign up
          </ListItemButton>
        </>
      ) : (
        <Link
          href="/"
          passHref
          style={{
            position: "relative",
            display: "block",
            padding: "10px 15px",
            color: "var(--primary-dark)",
          }}
          onClick={() => Auth.logout()}
          className={css.a}
        >
          Logout
        </Link>
      )}
    </>
  );
}

import { ListItemButton } from "@mui/material";
import Link from "next/link";
import Auth from "../../utils/auth";

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
            sx={{
              position: "relative",
              display: "block",
              padding: "10px 15px",
              color: "var(--cta-dark)",
              backgroundColor: "var(--primary-dark)",
            }}
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
        >
          Logout
        </Link>
      )}
    </>
  );
}

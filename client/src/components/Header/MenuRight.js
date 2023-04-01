import { ListItem, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function MenuRight({ setLogin, setSignUp }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(true);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setSignUp(true);
  };
  return (
    <>
      {!Auth.loggedIn() ? (
        <>
          <ListItemButton
            onClick={handleLogin}
            style={{
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
            onClick={handleSignUp}
            style={{
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

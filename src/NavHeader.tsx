import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const auth = useAuth()


  return (
    <nav>
      <ul>
        <li>
          {/* <a href="/">Home</a> */}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          {/* <a href="/categories">Categories</a> */}
          <NavLink to="/categories">Categories</NavLink>
        </li>
        <li>
          {/* <a href="/recipes">Recipes</a> */}
          <NavLink to="/recipes">Recipes</NavLink>
        </li>
        {auth.isLoggedIn() && (
          <li>
            {/* <a href="/add">Add</a> */}
            <NavLink to="/add">Add</NavLink>
          </li>
        )}

        <li>
          {/* <a href="/add">Add</a> */}
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <AuthStatus />
      </ul>
    </nav>
  );
}

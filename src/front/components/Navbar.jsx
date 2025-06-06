import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CloseSession } from "./CloseSession";

export const Navbar = () => {
  const { store } = useGlobalReducer();

  return (
    <nav className="navbar ">
      <div className="container">
        <div className="gap-5 d-flex align-items-end ">
          <Link to="/">
            <img src="/petscue.png" alt="petscue-logo" width="200" />
          </Link>
          <Link to="/inicio" className=" mb-3 nav-bar-link text-black">
            All the Pets
          </Link>
            <Link to="/about-us" className=" mb-3 nav-bar-link text-black">
            🐾About Petscue
          </Link>
        </div>

        <div className="ml-auto gap-3 d-flex align-items-center">
          {store.token ? (
            <>
              <Link to="/profile" className="m-auto btn-lemon">
                Profile
              </Link>
              <CloseSession />
             
            </>
          ) : (
            <>
              {" "}
              <Link to="/login" className=" m-auto btn-lemon text-black">
                Access your Account
              </Link>
              <Link to="/register" className="btn-orange">
                Register
              </Link>
            
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

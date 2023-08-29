import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useLogin } from "../../store";

function Navbar() {
    const [toggleUser, setToggleUser] = useState(false);
    const { isLogin, setIsLogin } = useLogin();
    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                toast("Signed out successfully", {
                    type: "success",
                    autoClose: 3000,
                    closeOnClick: true,
                });
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
        setToggleUser(false);
        setIsLogin("");
    };
    return (
        <nav className="main-nav">
            <div className="navigation">
                <div className="logo">
                    <Link to="/">MOVIER</Link>
                </div>
                <div className="navbar">
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                            >
                                <path
                                    d="M12.9008 12.2956L12.2997 12.8967L17.403 18L18.0041 17.3989L12.9008 12.2956Z"
                                    stroke="#FDFDFD"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.80066 14.6013C11.5566 14.6013 14.6013 11.5566 14.6013 7.80066C14.6013 4.04476 11.5566 1 7.80066 1C4.04476 1 1 4.04476 1 7.80066C1 11.5566 4.04476 14.6013 7.80066 14.6013Z"
                                    stroke="#FDFDFD"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </li>
                        <li className="navbar-item">
                            <NavLink className="navbar-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className="navbar-link" to="/movies">
                                Movies
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className="navbar-link" to="/tv-shows">
                                TV Shows
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="19"
                                viewBox="0 0 16 19"
                                fill="none"
                            >
                                <path
                                    d="M6.1042 14.6H9.5042C9.7677 14.9485 9.9292 15.399 9.9292 15.875C9.9292 17.048 8.9772 18 7.8042 18C6.6312 18 5.6792 17.048 5.6792 15.875C5.6792 15.399 5.8407 14.9485 6.1042 14.6Z"
                                    stroke="#FDFDFD"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.45605 3.73058C6.88557 3.61287 7.3376 3.55 7.80413 3.55C8.27065 3.55 8.72268 3.61287 9.1522 3.73058C9.3785 3.44272 9.50413 3.08811 9.50413 2.7C9.50413 1.765 8.73913 1 7.80413 1C6.86913 1 6.10413 1.765 6.10413 2.7C6.10413 3.08811 6.22975 3.44272 6.45605 3.73058Z"
                                    stroke="#FDFDFD"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M2.70415 11.2L1.00415 14.6H14.6042L12.9042 11.2V8.64999C12.9042 5.83649 10.6177 3.54999 7.80415 3.54999C4.99065 3.54999 2.70415 5.83649 2.70415 8.64999V11.2Z"
                                    stroke="#FDFDFD"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </li>
                        <li className="navbar-item">
                            {isLogin ? (
                                <button
                                    onClick={() =>
                                        setToggleUser((curr) => !curr)
                                    }
                                    className="btn-user"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="19"
                                        viewBox="0 0 20 19"
                                        fill="none"
                                    >
                                        <path
                                            d="M10.0041 9.5C5.36733 9.5 1.60413 13.084 1.60413 17.5C1.62093 17.5 18.4041 17.5 18.4041 17.5C18.4041 13.084 14.6409 9.5 10.0041 9.5Z"
                                            stroke="#FDFDFD"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10.0041 9.5C12.3237 9.5 14.2041 7.70914 14.2041 5.5C14.2041 3.29086 12.3237 1.5 10.0041 1.5C7.68448 1.5 5.80408 3.29086 5.80408 5.5C5.80408 7.70914 7.68448 9.5 10.0041 9.5Z"
                                            stroke="#FDFDFD"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            ) : (
                                <Link to="login" className="login-link">
                                    Login
                                </Link>
                            )}
                            {toggleUser && (
                                <ul className="profile">
                                    <li className="profile-item">
                                        <a href="#!" className="profile-link">
                                            settings
                                        </a>
                                    </li>
                                    <li className="profile-item">
                                        <a
                                            href="#!"
                                            onClick={handleLogout}
                                            className="profile-link"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

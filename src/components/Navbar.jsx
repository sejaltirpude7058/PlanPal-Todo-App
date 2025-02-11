import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/firebaseContext";
import "./navbar.css";

const NavbarLink = ({ to, children, onClick }) => (
  <NavLink to={to} onClick={onClick} className="navbar-link">
    {children}
  </NavLink>
);

function Navbar() {
  const firebase = useFirebase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false); // Function to close the menu

  const links = firebase.isLoggedIn
    ? [
        { to: "/", label: "Home" },
        { to: "/addnewtask", label: "Add New Task" },
        { to: "/tasks", label: "Your Tasks" },
        {
          to: "/",
          label: "Logout",
          onClick: () => {
            firebase.signOutUser();
            closeMenu();
          },
        },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Sign Up" },
      ];

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">Plan Pal</div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`navbar-links ${isMenuOpen ? "show-menu" : ""}`}>
          {links.map((link, index) => (
            <NavbarLink
              key={index}
              to={link.to}
              onClick={() => {
                if (link.onClick) link.onClick();
                closeMenu(); // Automatically close the menu when a link is clicked
              }}
            >
              {link.label}
            </NavbarLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

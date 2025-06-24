import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedProfile = localStorage.getItem("profileImage");

    setIsLoggedIn(loggedIn);
    setProfileImage(storedProfile || "https://cdn-icons-png.flaticon.com/512/747/747545.png");
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tech News", path: "/news" },
    { name: "Tech Memes", path: "/meme" },
    { name: "Tech Projects", path: "/notes" },
  ];

  const activeStyle = {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1a73e8",
    padding: "10px",
    borderRadius: "12px",
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.siteTitle}>TechiSpot</span>
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ""}`}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <NavLink
              exact
              to={item.path}
              className={styles.navLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          </li>
        ))}

        <li className={styles.navItem}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={profileImage} alt="Profile" className={styles.profilePic} />
              <button onClick={handleLogout} className={styles.navLink} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              exact
              to="/signup"
              className={styles.navLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.menuText}>Sign In</span>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

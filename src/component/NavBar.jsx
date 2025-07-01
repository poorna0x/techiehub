// Import React hooks and routing components
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Import scoped CSS module styles
import styles from "./NavBar.module.css";

// NavBar component definition
export default function NavBar() {
  // State to control mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // State to track login status and user profile image
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  // On component mount, check localStorage for login status and profile image
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedProfile = localStorage.getItem("profileImage");

    setIsLoggedIn(loggedIn);
    setProfileImage(storedProfile || "https://cdn-icons-png.flaticon.com/512/747/747545.png");
  }, []);

  // Define navigation menu items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tech News", path: "/news" },
    { name: "Tech Memes", path: "/meme" },
    { name: "Tech Projects", path: "/notes" },
  ];

  // Custom styling for the active NavLink
  const activeStyle = {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1a73e8",
    padding: "10px",
    borderRadius: "12px",
  };

  // Logout function: clear session and update state
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  // Render the navigation bar
  return (
    <nav className={styles.navbar}>
      {/* Brand/logo section */}
      <div className={styles.brand}>
        <span className={styles.siteTitle}>TechiSpot</span>

        {/* Mobile menu toggle button */}
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Navigation list, shown/hidden based on menuOpen */}
      <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ""}`}>
        {/* Map through navItems and generate NavLinks */}
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <NavLink
              exact
              to={item.path}
              className={styles.navLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => setMenuOpen(false)} // Close menu on link click
            >
              {item.name}
            </NavLink>
          </li>
        ))}

        {/* Conditional rendering based on login status */}
        <li className={styles.navItem}>
          {isLoggedIn ? (
            // If logged in: show profile image and logout button
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={profileImage} alt="Profile" className={styles.profilePic} />
              <button
                onClick={handleLogout}
                className={styles.navLink}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            // If not logged in: show Sign In link
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

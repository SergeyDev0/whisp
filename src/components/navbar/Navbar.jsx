import React from "react";
import styles from "./Navbar.module.scss";
import {
  AlignJustify,
  MessageCircle,
  Settings,
  UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("");

  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("chats");
    } else if (location.pathname === "/users") {
      setActiveTab("users");
    } else if (location.pathname === "/settings") {
      setActiveTab("settings");
    }
  }, [location.pathname]);
  return (
    <div
      className={`${
        isOpenSidebar ? `${styles.sidebar} ${styles.open}` : styles.sidebar
      }`}
    >
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
              <AlignJustify />
              <span>Меню</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/"
              className={activeTab === "chats" ? styles.active : ""}
              onClick={() => setActiveTab("chats")}
            >
              <MessageCircle />
              <span>Чаты</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/users"
              className={activeTab === "users" ? styles.active : ""}
              onClick={() => setActiveTab("users")}
            >
              <UsersRound />
              <span>Пользователи</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Link
        to="/settings"
        className={
          styles.hide + (activeTab === "settings" ? ` ${styles.active}` : "")
        }
        onClick={() => setActiveTab("settings")}
      >
        <Settings />
        <span>Настройки</span>
      </Link>
    </div>
  );
};

export default Navbar;

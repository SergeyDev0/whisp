import React from "react";
import styles from "./Header.module.scss";
import { ArrowLeft, Plus, Search, ShieldBan, BrushCleaning, LogOut } from "lucide-react";
import { authStore } from "../../store/authStore";

const Header = () => {
  const searchInputRef = React.useRef(null);
	const menuRef = React.useRef(null);
  const [isSearchActive, setIsSearchActive] = React.useState(false);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      const timeout = setTimeout(() => {
        searchInputRef.current && searchInputRef.current.focus();
      }, 201);
      return () => clearTimeout(timeout);
    }
  }, [isSearchActive]);

  const handleSearchButtonClick = () => {
    setIsSearchActive(true);
  };

  React.useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.logo}>Whisp</span>
      </div>
      <div className={styles.right}>
        <div
          className={`${styles.searchWrapper} ${
            isSearchActive ? styles.active : ""
          }`}
        >
          <button
            className={styles.searchBack}
            onClick={() => setIsSearchActive(false)}
          >
            <ArrowLeft />
          </button>
          <input
            type="text"
            className={styles.search}
            placeholder="Поиск..."
            ref={searchInputRef}
          />
          <button
            className={styles.searchButton}
            onClick={handleSearchButtonClick}
          >
            <Search />
          </button>
        </div>
        <ul className={styles.accountList}>
          <li className={styles.accountAdd}>
            <button>
              <Plus />
            </button>
          </li>
          <li className={styles.account}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              ref={menuRef}
            >
              <img
                src="https://avatars.githubusercontent.com/u/63641324?v=4"
                alt="Avatar"
              />
              <ul
                className={
                  isMenuOpen
                    ? `${styles.settingsMenu} ${styles.open}`
                    : styles.settingsMenu
                }
              >
                <li className={styles.settingsItem}>
                  <BrushCleaning />
                  <span>Очистить чат</span>
                </li>
                <li className={styles.settingsItem}>
                  <ShieldBan />
                  <span>Заблокировать</span>
                </li>
                <li 
								className={styles.settingsItem} 
								onClick={() => {
									authStore.logOut();
									navigate("/auth");
								}}
								>
                  <LogOut />
                  <span>Выйти из аккаунта</span>
                </li>
              </ul>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

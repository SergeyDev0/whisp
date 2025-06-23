import React from "react";
import { BrushCleaning, ShieldBan, Trash } from "lucide-react";
import styles from "./ChatUserItem.module.scss";

const SettingsMenu = ({ id, isMenuOpen, setIsMenuOpen, menuPosition, menuRef }) => {
  return (
    <ul
      ref={menuRef}
      style={{ top: menuPosition.y, left: menuPosition.x }}
      className={
        isMenuOpen
          ? `${styles.settingsMenu} ${styles.open}`
          : styles.settingsMenu
      }
    >
      <li className={styles.settingsItem} onClick={() => setIsMenuOpen(false)}>
        <BrushCleaning />
        <span>Очистить чат</span>
      </li>
      <li className={styles.settingsItem} onClick={() => setIsMenuOpen(false)}>
        <ShieldBan />
        <span>Заблокировать</span>
      </li>
      <li className={styles.settingsItem} onClick={() => { setIsMenuOpen(false); console.log(id); }}>
        <Trash />
        <span>Удалить чат</span>
      </li>
    </ul>
  );
};

const ChatUserItem = ({ users, setOpenChat, openChat }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 });
  const menuRef = React.useRef(null);

  const { id, name, avatar, isOnline } = users;

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

  const handleUserClick = (id) => {
    const url = new URL(window.location);
    url.searchParams.set("user", id);
    window.history.replaceState({}, "", url);
    setOpenChat(id);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const menuWidth = 200; // ширина меню в px
    const menuHeight = 150; // примерная высота меню
    const padding = 8;
    let x = e.clientX;
    let y = e.clientY;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    if (x + menuWidth + padding > winWidth) {
      x = winWidth - menuWidth - padding;
    }
    if (y + menuHeight + padding > winHeight) {
      y = winHeight - menuHeight - padding;
    }
    setIsMenuOpen(true);
    setMenuPosition({ x, y });
  };

  return (
    <li
      onContextMenu={handleContextMenu}
      className={
        openChat == id ? `${styles.user} ${styles.active}` : styles.user
      }
      onClick={() => handleUserClick(id)}
    >
      <SettingsMenu
        id={id}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuPosition={menuPosition}
        menuRef={menuRef}
      />
      <div className={styles.row}>
        <img src={avatar} alt={name} />
        <div className={styles.col}>
          <h3 className={styles.name}>{name}</h3>
          <p
            className={
              isOnline ? `${styles.status} ${styles.online}` : styles.status
            }
          >
            {isOnline ? "Онлайн" : "Оффлайн"}
          </p>
        </div>
      </div>
      <div className={styles.lastActivity}>
        <span>12:34</span>
      </div>
    </li>
  );
};

export default ChatUserItem;

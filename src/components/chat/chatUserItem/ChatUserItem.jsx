import React from "react";
import styles from "./ChatUserItem.module.scss";

const ChatUserItem = ({ users, setOpenChat, openChat }) => {
  const { id, name, avatar, isOnline } = users;
  const handleUserClick = (id) => {
    const url = new URL(window.location);
    url.searchParams.set("user", id);
    window.history.replaceState({}, "", url);
		setOpenChat(id);
  };
  return (
    <li 
			className={openChat == id ? `${styles.user} ${styles.active}` : styles.user}
			onClick={() => handleUserClick(id)}
		>
      <div className={styles.row}>
        <img src={avatar} alt={name} />
        <div className={styles.col}>
          <h3 className={styles.name}>{name}</h3>
          <p 
						className={isOnline ? `${styles.status} ${styles.online}` : styles.status}
					>{isOnline ? "Онлайн" : "Оффлайн"}</p>
        </div>
      </div>
			<div className={styles.lastActivity}>
				<span>12:34</span>
			</div>
    </li>
  );
};

export default ChatUserItem;

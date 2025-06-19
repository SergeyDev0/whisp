import React, { useRef } from "react";
import {
  BrushCleaning,
  Ellipsis,
  Paperclip,
  Send,
  ShieldBan,
  Trash,
} from "lucide-react";
import styles from "./Chat.module.scss";

const Chat = ({ openChat, data }) => {
  const messages = [
    {
      id: 1,
      role: "sender",
      text: "Hi! How ar u?",
      time: "12:32",
    },
    {
      id: 2,
      role: "sender",
      text: "I love Russians",
      time: "12:32",
    },
    {
      id: 3,
      role: "sender",
      text: "and Russia :)",
      time: "12:33",
    },
    {
      id: 4,
      role: "recipient",
      text: "Hello! I'm fine",
      time: "12:34",
    },
    {
      id: 5,
      role: "recipient",
      text: "Thx, bro",
      time: "12:34",
    },
    {
      id: 6,
      role: "recipient",
      text: "very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message, very long message",
      time: "12:34",
    },
  ];
  const [message, setMessage] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("send");
    setMessage("");
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

  const groupedMessages = messages.reduce((groups, message, index) => {
    const prevMessage = messages[index - 1];
    const sameGroup =
      prevMessage &&
      prevMessage.role === message.role &&
      prevMessage.time === message.time;

    if (sameGroup) {
      groups[groups.length - 1].push(message);
    } else {
      groups.push([message]);
    }

    return groups;
  }, []);

  return (
    <>
      <div className={styles.header}>
        {openChat && (
          <>
            <div className={styles.left}>
              <img src={data.avatar} alt={data.name} />
              <div className={styles.col}>
                <h3 className={styles.name}>{data.name}</h3>
                <p
                  className={`${styles.status} ${
                    data.isOnline ? styles.online : ""
                  }`}
                >
                  {data.isOnline ? "Онлайн" : "Оффлайн"}
                </p>
              </div>
            </div>
            <div className={styles.right}>
              <button
                className={styles.settings}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                ref={menuRef}
                type="button"
              >
                <Ellipsis />
                <ul className={isMenuOpen ? `${styles.settingsMenu} ${styles.open}` : styles.settingsMenu}>
                  <li className={styles.settingsItem}>
                    <BrushCleaning />
                    <span>Очистить чат</span>
                  </li>
                  <li className={styles.settingsItem}>
                    <ShieldBan />
                    <span>Заблокировать</span>
                  </li>
                  <li className={styles.settingsItem}>
                    <Trash />
                    <span>Удалить чат</span>
                  </li>
                </ul>
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.body}>
        {openChat ? (
          <div className={styles.chat}>
            <ul className={styles.messageList}>
              {groupedMessages.map((group) => (
                <li
                  key={group[0].id}
                  className={
                    group[0].role === "recipient"
                      ? `${styles.messageWrapper} ${styles.recipient}`
                      : styles.messageWrapper
                  }
                >
                  {group.length > 1 ? (
                    <div className={styles.messageGroup}>
                      {group.map((message, index) => (
                        <div
                          key={message.id}
                          className={`${styles.message} ${
                            index === group.length - 1 ? styles.lastInGroup : ""
                          }`}
                        >
                          <p className={styles.messageText}>{message.text}</p>
                          {index === group.length - 1 && (
                            <p className={styles.messageTime}>{message.time}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`${styles.message} ${styles.lastInGroup}`}>
                      <p className={styles.messageText}>{group[0].text}</p>
                      <p className={styles.messageTime}>{group[0].time}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.chatInput}>
              <input className={styles.file} type="file" id="file" />
              <label htmlFor="file" className={styles.fileLabel}>
                <Paperclip />
              </label>
              <form className={styles.inputWrapper} onSubmit={sendMessage}>
                <textarea
                  className={styles.input}
                  placeholder="Сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={1}
                />
                <button className={styles.send} type="submit">
                  <Send />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.info}>
            <h1>Whisp</h1>
            <h2>Добро пожаловать!</h2>
            <p>
              Здесь вы можете начать общаться с вашими друзьями и знакомыми.
            </p>
            <h3>Выберите чат в разделе "Сообщения"</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;

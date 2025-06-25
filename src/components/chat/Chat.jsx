import React, { useEffect } from "react";
import {
  BrushCleaning,
  Check,
  Copy,
  Edit2,
  Ellipsis,
  Paperclip,
  Send,
  ShieldBan,
  Trash,
  X,
} from "lucide-react";
import styles from "./Chat.module.scss";

const SettingsMenu = ({
  id,
  isSettingsMenuOpen,
  setIsSettingsMenuOpen,
  menuPosition,
  menuRef,
  text,
  messageId,
  onEdit,
  role,
}) => {
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsSettingsMenuOpen(false);
    }
  };
  return (
    <ul
      ref={menuRef}
      style={{ top: menuPosition.y, left: menuPosition.x }}
      className={
        isSettingsMenuOpen
          ? `${styles.settingsMenu} ${styles.open}`
          : styles.settingsMenu
      }
    >
      <li className={styles.settingsItem} onClick={handleCopy}>
        <Copy />
        <span>Копировать</span>
      </li>
      {(role === "recipient") && (
        <li
          className={styles.settingsItem}
          onClick={() => {
            setIsSettingsMenuOpen(false);
            onEdit(messageId, text);
          }}
        >
          <Edit2 />
          <span>Редактировать</span>
        </li>
      )}
      <li
        className={styles.settingsItem}
        onClick={() => {
          setIsSettingsMenuOpen(false);
          console.log(id);
        }}
      >
        <Trash />
        <span>Удалить</span>
      </li>
    </ul>
  );
};

const Chat = ({ openChat, data }) => {
  const [messages, setMessages] = React.useState([
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
  ]);
  const [message, setMessage] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = React.useState(null);
  const [selectedMessageId, setSelectedMessageId] = React.useState(null);
  const [editingMessageId, setEditingMessageId] = React.useState(null);
  const [textareaHeight, setTextareaHeight] = React.useState(50);
  const textareaRef = React.useRef(null);
  const menuRef = React.useRef(null);

  useEffect(() => {
    if (editingMessageId && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingMessageId]);

  const handleEditMessage = (id, text) => {
    setEditingMessageId(id);
    setMessage(text);
    setIsSettingsMenuOpen(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = text;
        handleTextareaInput({ target: textareaRef.current });
      }
    }, 0);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    if(editingMessageId) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingMessageId
            ? { ...msg, text: message, role: "recipient" }
            : msg
        )
      );
      setEditingMessageId(null);
      setMessage("");
      setTextareaHeight(50);
      if (textareaRef.current) {
        textareaRef.current.value = "";
        handleTextareaInput({ target: textareaRef.current });
      }
    } else {
      setMessages((prev) => [...prev, {
        id: prev.length + 1,
        role: "recipient",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage("");
      setTextareaHeight(50);
      if (textareaRef.current) {
        textareaRef.current.value = "";
        handleTextareaInput({ target: textareaRef.current });
      }
    }
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
    setMessage("");
    setTextareaHeight(50);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      handleTextareaInput({ target: textareaRef.current });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.ctrlKey || e.shiftKey) {
        e.preventDefault();
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newText = message.slice(0, start) + "\n" + message.slice(end);
        setMessage(newText);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        });
      } else {
        e.preventDefault();
        sendMessage(e);
      }
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isSettingsMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsSettingsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isSettingsMenuOpen]);

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

  const handleContextMenu = (e, messageId, messageText, messageRole) => {
    e.preventDefault();
    const menuWidth = 200;
    const menuHeight = 150;
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
    setSelectedMessage({ text: messageText, role: messageRole });
    setSelectedMessageId(messageId);
    if (isSettingsMenuOpen) {
      setIsSettingsMenuOpen(false);
      setTimeout(() => {
        setMenuPosition({ x, y });
        setIsSettingsMenuOpen(true);
      }, 200);
    } else {
      setMenuPosition({ x, y });
      setIsSettingsMenuOpen(true);
    }
  };

  const handleTextareaInput = (e) => {
    const el = e.target;
    el.style.height = 'auto';
    const newHeight = Math.min(el.scrollHeight, 250);
    el.style.height = newHeight + 'px';
    setTextareaHeight(newHeight);
  };

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
                <ul
                  className={
                    isMenuOpen
                      ? `${styles.settingsMenu} ${styles.open}`
                      : styles.settingsMenu
                  }
                  ref={menuRef}
                >
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
      <div className={styles.body} onContextMenu={(e) => e.preventDefault()}>
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
                  <SettingsMenu
                    id={data.id}
                    isSettingsMenuOpen={isSettingsMenuOpen}
                    setIsSettingsMenuOpen={setIsSettingsMenuOpen}
                    menuPosition={menuPosition}
                    menuRef={menuRef}
                    text={selectedMessage?.text}
                    messageId={selectedMessageId}
                    onEdit={handleEditMessage}
                    role={selectedMessage?.role}
                  />
                  {group.length > 1 ? (
                    <div className={styles.messageGroup}>
                      {group.map((message, index) => (
                        <div
                          onContextMenu={(e) =>
                            handleContextMenu(e, message.id, message.text, message.role)
                          }
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
                    <div
                      onContextMenu={(e) =>
                        handleContextMenu(e, group[0].id, group[0].text, group[0].role)
                      }
                      className={`${styles.message} ${styles.lastInGroup}`} 
                    >
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
              <div className={styles.inputWrapper}>
                <textarea
                  className={styles.input}
                  placeholder="Сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onInput={handleTextareaInput}
                  rows={1}
                  ref={textareaRef}
                />
                {editingMessageId ? (
                  <div className={styles.editButtons}>
                    <button
                      className={styles.editButton}
                      onClick={handleEditCancel}
                    >
                      <X />
                    </button>
                    <button
                      type="submit"
                      className={styles.send}
                      onClick={sendMessage}
                    >
                      <Send />
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.send}
                    type="button"
                    onClick={sendMessage}
                  >
                    <Send />
                  </button>
                )}
              </div>
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

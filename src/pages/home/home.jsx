import React from "react";
import styles from "./Home.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import ChatUserItem from "../../components/chat/chatUserItem/ChatUserItem";
import Chat from './../../components/chat/Chat';

const Home = () => {
  const [openChat, setOpenChat] = React.useState(null);
  const [users, setUsers] = React.useState([
		{
      id: 1,
      name: "Илон Маск",
      avatar: "https://s0.rbk.ru/v6_top_pics/media/img/8/39/347018551077398.jpeg",
      isOnline: true,
    },
    {
      id: 2,
      name: "Джон Доу",
      avatar: "https://avatars.mds.yandex.net/i?id=8aaa11696e50ad771270e35c636ff1a9_l-4864053-images-thumbs&n=13",
      isOnline: true,
    },
    {
      id: 3,
      name: "Джейн Смит",
      avatar: "https://i.pinimg.com/736x/da/96/a1/da96a148300809939af2cfd104b644ef.jpg",
      isOnline: false,
    },
		{
      id: 4,
      name: "Камерон Филлипс",
      avatar: "https://avatars.mds.yandex.net/get-entity_search/5098099/970311391/S600xU_2x",
      isOnline: false,
    },
    {
      id: 5,
      name: "Дженсон Стейтем",
      avatar: "https://avatars.mds.yandex.net/get-entity_search/7765675/952131935/S600xU_2x",
      isOnline: false,
    },
    {
      id: 6,
      name: "Сара Коннор",
      avatar: "https://avatars.mds.yandex.net/get-entity_search/2295215/1156046580/S600xU_2x",
      isOnline: false,
    }
  ]);

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const userId = searchParams.get("user");
    if (userId) {
      setOpenChat(userId);
    }
  }, [searchParams]);

  return (
    <div className={styles.home}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Сообщения</h2>
        </div>
        <div className={styles.body}>
          {users.length > 0 ? (
            <ul className={styles.usersList}>
              {users.map((user) => (
                <ChatUserItem
                  key={user.id}
                  users={user}
                  setOpenChat={setOpenChat}
                  openChat={openChat}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.info}>
              <h2>Здесь пусто</h2>
              <p>Вы можете искать людей в разделе "Пользователи"</p>
              <Link to="/users">Перейти к поиску</Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <Chat 
					openChat={openChat}
					data={users.find(user => user.id === parseInt(openChat))}
				/>
      </div>
    </div>
  );
};

export default Home;

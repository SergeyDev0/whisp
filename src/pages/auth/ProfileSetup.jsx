import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputMask } from "@react-input/mask";
import Avatar from "../../assets/icons/avatar.svg";
import styles from "./Auth.module.scss";

const ProfileSetup = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const isValid = name.trim().length > 1 && dob.trim().length > 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      localStorage.setItem("profileName", name);
      localStorage.setItem("profileDob", dob);
      navigate("/");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.setupBox}>
        <h1 className={styles.logo}>Whisp</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Заполните данные профиля и выберите фотографию</h2>
          <div className={styles.avatar}>
            <label htmlFor="avatar" className={styles.avatarLabel}>
              <img src={Avatar} alt="avatar" />
            </label>
            <input type="file" id="avatar" className={styles.avatarInput} />
          </div>
					<input
					style={{ marginBottom: "1rem" }}
              className={styles.input}
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
            />
          <div className={styles.inputWrapper}>
            <InputMask
              mask="dd.mm.yyyy"
              replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              onBlur={() => setTouched(true)}
              className={styles.input}
              placeholder="Ваша дата рождения"
            />
          </div>
          {touched && !isValid && (
            <div className={styles.error}>
              Заполните имя и корректную ссылку на аватар
            </div>
          )}
          <button className={styles.button} type="submit" disabled={!isValid}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;

import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import vk from "../../assets/icons/vk.svg";
import styles from "./Auth.module.scss";
import 'react-phone-number-input/style.css';
import { authStore } from "../../store/authStore";

const Auth = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);

	const navigate = useNavigate();
  const isValid = phone && isValidPhoneNumber(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      authStore.setPhone(phone);
      navigate("/");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.logo}>Whisp</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
          	<PhoneInput
	            international
	            defaultCountry="RU"
	            value={phone}
	            onChange={setPhone}
	            onBlur={() => setTouched(true)}
	            className={styles.input}
	            placeholder="Введите номер телефона"
	          />
	          {touched && !isValid && (
	            <div className={styles.error}>Введите корректный номер телефона</div>
	          )}
          </div>
          <button className={styles.button} type="submit" disabled={!isValid}>Войти</button>
          <p className={styles.policy}>Нажимая на кнопку, вы соглашаетесь с <a href="#">политикой конфиденциальности</a></p>
        </form>
        <div className={styles.or}>или</div>
        <div className={styles.socials}>
          <button className={styles.socialButton}>
            <img src={google} alt="Google" />
          </button>
          <button className={styles.socialButton}>
            <img src={apple} alt="Apple" />
          </button>
          <button className={styles.socialButton}>
            <img src={vk} alt="VK" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth; 
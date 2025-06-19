import React from "react";
import Header from './../header/Header';
import Navbar from "../navbar/Navbar";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className={styles.main}>
				<Header />
				{children}
			</main>
		</>
	)
};

export default Layout;

import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from './components/layout/Layout';
import Home from './pages/home/home';
import Auth from "./pages/auth/Auth";
import ProfileSetup from "./pages/auth/ProfileSetup";
import { authStore } from "./store/authStore";
import { observer } from "mobx-react-lite";

const pageVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
	exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function isProfileFilled() {
	return Boolean(localStorage.getItem("profileName")) && Boolean(localStorage.getItem("profileDob"));
}

function PrivateRoute({ children }) {
	const phone = authStore.phone;
	if (!phone) return <Navigate to="/auth" replace />;
	if (!isProfileFilled()) return <Navigate to="/profile-setup" replace />;
	return <Layout>{children}</Layout>;
}

function PublicRoute({ children }) {
	const phone = authStore.phone;
	if (!phone) return children;
	if (phone && !isProfileFilled()) return <Navigate to="/profile-setup" replace />;
	return <Navigate to="/" replace />;
}

function ProfileSetupRoute({ children }) {
	const phone = authStore.phone;
	if (!phone) return <Navigate to="/auth" replace />;
	if (isProfileFilled()) return <Navigate to="/" replace />;
	return children;
}

const App = () => {
	const location = useLocation();

	React.useEffect(() => {
		authStore.logIn();
	}, []);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				className="animate"
				key={location.pathname}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={pageVariants}
				style={{ height: '100%' }}
			>
				<Routes location={location}>
					<Route
						path="/auth"
						element={
							<PublicRoute>
								<Auth />
							</PublicRoute>
						}
					/>
					<Route
						path="/profile-setup"
						element={
							<ProfileSetupRoute>
								<ProfileSetup />
							</ProfileSetupRoute>
						}
					/>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<Navigate to={authStore.phone ? (isProfileFilled() ? "/" : "/profile-setup") : "/auth"} replace />} />
				</Routes>
			</motion.div>
		</AnimatePresence>
	);
};

export default observer(App);
import { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import '../styles/index.css';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import '@fortawesome/fontawesome-free/css/all.css';
import { SessionProvider } from 'next-auth/react';
import Router from 'next/router'
// import Spinner from '../components/Spinner'
function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
	const [isMounted, setIsMounted] = useState(false);
	const [loading, setLoading] = useState(false);
	Router.events.on("routeChangeStart", (url) => {
		console.log("Route is changing");
		setLoading(true);
	})
	Router.events.on("routeChangeComplete", (url) => {
		console.log("Route is changing");
		setLoading(false);
	})
	useEffect(() => {
		setIsMounted(true);
	}, []);
	return (
		<ThemeProvider attribute="class">
			<SessionProvider session={session}>
				<AnimatePresence>
					{/* {loading && <Spinner />} */}
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
			</SessionProvider>
		</ThemeProvider>
	);
}
export default MyApp;

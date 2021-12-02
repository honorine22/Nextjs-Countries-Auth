import { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import '../styles/index.css';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'next-auth/client';
function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	return (
		<Provider session={pageProps.session}>
			<ThemeProvider>
				<AnimatePresence exitBeforeEnter>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
			</ThemeProvider>
		</Provider>
	);
}
export default MyApp;

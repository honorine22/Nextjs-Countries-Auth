import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Login from './forms/login';
import Spinner from '../components/Spinner';
function AuthPage() {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				router.replace('/');
			} else {
				setLoading(false);
			}
		});
	}, []);
	if (loading) {
		return <Spinner />;
	}
	return (
		<>
			<Navbar />
			<Login />
		</>
	)
}

export default AuthPage;

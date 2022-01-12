// import { useRouter } from 'next/router';
// import { getSession } from 'next-auth/client';
// import { useEffect, useState } from 'react';
// import Login from './forms/login';
// import Spinner from '../components/Spinner';
// import Layout from '../components/layout';

// function AuthPage() {
// 	const [loading, setLoading] = useState(true);
// 	const router = useRouter();
// 	useEffect(() => {
// 		getSession().then((session) => {
// 			if (session) {
// 				router.replace('/');
// 			} else {
// 				setLoading(false);
// 			}
// 		});
// 	}, []);
// 	if (loading) {
// 		return <Spinner />;
// 	}
// 	return (
// 		<>
// 			<Layout>
// 			<Login />
// 			</Layout>
// 		</>
// 	)
// }

// export default AuthPage;

// import { signIn, signOut, useSession } from "next-auth/client";
import { useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layout'
import cookie from 'js-cookie';

const Login = () => {
	// const [session] = useSession();
	const [loginError, setLoginError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		//call api
		fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((r) => {
				return r.json();
			})
			.then((data) => {
				if (data && data.error) {
					setLoginError(data.message);
				}
				if (data && data.token) {
					//set cookie
					cookie.set('token', data.token, { expires: 2 });
					Router.push('/dashboard');
				}
			});
	}
	return (
		<Layout>
			<div className="w-full min-h-screen">
				<div className="lg:flex justify-around">
					<div className="py-16 lg:mt-24">
						<img src="/loginImg.png" alt="Log in Illustration" />
					</div>

					<div className="pt-8 pb-2 px-8 mt-24 rounded-lg bg-white dark:bg-gray-800 dark:text-white">
						<div className="flex">
							<p className="text-xl">
								Welcome to
								<span className="text-2xl text-blue-400"> ready</span>
								<span className="text-2xl text-yellow-400">to</span>
								<span className="text-2xl text-blue-400">go</span>
								<span className="text-2xl text-yellow-400">out.</span>
							</p>
						</div>
						<form onSubmit={handleSubmit}>
							<p className="w-60 py-4 text-center text-md">We would be pleased to have you in this community.</p>
							<div className="mt-4">
								<label className="text-sm dark:text-white text-gray-600">Email</label>
								<input
									className="w-full h-10 px-3 bg-white bg-gray-50 dark:bg-gray-700 placeholder-gray-300 border rounded-xl focus:outline-none"
									type="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<label className="text-sm dark:text-white text-gray-600">Password</label>
								<input
									className="w-full h-10 bg-white px-3 bg-gray-50 dark:bg-gray-700 placeholder-gray-300 border rounded-xl focus:outline-none"
									type="password"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="mt-4 flex">
								<input type="checkbox" className="mt-4 bg-white" name="check" className="" id="" />
								<span className="text-sm dark:text-white text-gray-600 px-4">Remember me.</span>
							</div>
							<div className="flex justify-center mt-4">
								<button type="submit" value="submit" className="h-10 mt-2 px-8 bg-blue-400 hover:bg-blue-700 text-white font-bold md:py-0 rounded-md">
									<span>Log In</span>
								</button>
							</div>

							{/* {!session && (
								<>
									Not signed in <br />
									<button onClick={() => signIn("github")}>Sign in</button>
								</>
							)}
							{session && (
								<>
									Now you are signed in, only signed in user can see the following button
									<button onClick={() => signOut()}>Sign out</button>
								</>
							)} */}

						</form>
					</div>

				</div>
			</div>
		</Layout>
	);
}
export default Login;

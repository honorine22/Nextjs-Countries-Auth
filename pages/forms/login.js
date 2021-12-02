// import withTransition from '../../HOC/withTransition';
import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

function Login() {

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();
	async function loginSubmitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// optional: Add validation

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});

			if (!result.error) {
				// set some auth state
				router.replace('/profile');
			}
		} else {
			try {
				const result = await createUser(enteredEmail, enteredPassword);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	}
	return (
		<div className="bg-blue-100 dark:bg-gray-900 dark:text-white w-full">
			<div className="lg:flex justify-around">
				<div className="py-16 lg:mt-24">
					<img src="/loginImg.png" alt="Log in Illustration" />
				</div>

				<div className="pt-8 pb-2 dark:bg-gray-900 dark:text-white px-8 mt-24 rounded-lg bg-white">
					<div className="flex">
						<p className="text-xl">
							Welcome to
							<span className="text-2xl text-blue-400"> ready</span>
							<span className="text-2xl text-yellow-400">to</span>
							<span className="text-2xl text-blue-400">go</span>
							<span className="text-2xl text-yellow-400">out.</span>
						</p>
					</div>
					<form onSubmit={loginSubmitHandler}>
						<p className="w-60 py-4 text-center text-md">We would be pleased to have you in this community.</p>
						<div className="mt-4">
							<label className="text-sm dark:text-white text-gray-600">Email</label>
							<input
								className="w-full h-10 px-3 dark:bg-gray-200 bg-gray-50 placeholder-gray-300 border rounded-xl focus:outline-none"
								type="email"
								name="email"
								ref={emailInputRef}
							/>
						</div>
						<div className="mt-4">
							<label className="text-sm dark:text-white text-gray-600">Password</label>
							<input
								className="w-full h-10 dark:bg-gray-200 px-3 bg-gray-50 placeholder-gray-300 border rounded-xl focus:outline-none"
								type="password"
								name="password"
								ref={passwordInputRef}
							/>
						</div>
						<div className="mt-4 flex">
							<input type="checkbox" className="mt-4 dark:bg-gray-200 bg-white" name="check" className="" id="" />
							<span className="text-sm dark:text-white text-gray-600 px-4">Remember me.</span>
						</div>
						<div className="flex justify-center mt-4">
							<button className="h-10 mt-2 px-8 bg-blue-400 hover:bg-blue-700 text-white font-bold md:py-0 rounded-md">
								<span>Log In</span>
							</button>
						</div>
					</form>
				</div>

			</div>
		</div>
	);
}
export default Login;

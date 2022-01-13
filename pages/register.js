import React, { useRef, useState } from "react";
import cookie from 'js-cookie';
import Router from 'next/router';
import Layout from '../components/layout';
const Register = () => {
	const namesRef = useRef();
	const emailRef = useRef();
	const dobRef = useRef();
	const countryRef = useRef();
	const passwordRef = useRef();
	const acceptTermsRef = useRef();
	const [registerError, setRegisterError] = useState('');

	const handleSubmit = async (e) => {
		// await fetchAPI(data)
		e.preventDefault();
		//Getting value from useRef()
		const enteredNames = namesRef.current.value;
		const enteredEmail = emailRef.current.value;
		const enteredDob = dobRef.current.value;
		const enteredCountry = countryRef.current.value;
		const enteredPassword = passwordRef.current.value;
		const enteredAcceptTerms = acceptTermsRef.current.value;
		//POST form values
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				names: enteredNames,
				email: enteredEmail,
				password: enteredPassword,
				dob: enteredDob,
				country: enteredCountry,
				acceptTerms: enteredAcceptTerms
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data && data.error) {
					setRegisterError(data.message);
				}
				if (data && data.token) {
					// Set cookies
					cookie.set('token', data.token, { expires: 2 });
					Router.push('/login');
				}
			});

	}
	return (
		<Layout>
			<div className="w-full min-h-screen">
				<div className="lg:flex justify-around">
					<div className="pt-16 lg:flex flex-col">
						<div className="flex">
							<p className="text-xl">
								Welcome to
								<span className="text-2xl text-blue-400"> ready</span>
								<span className="text-2xl text-yellow-400">to</span>
								<span className="text-2xl text-blue-400">go</span>
								<span className="text-2xl text-yellow-400">out.</span>
							</p>
						</div>
						<p className="w-52 pt-2 text-center text-md">Sign up to plan and visit your favorite country!</p>
						<img src="/Nomad.png" alt="Sign up Illustration" />
					</div>
					<form onSubmit={handleSubmit} >
						<div className="pt-8 bg-white dark:bg-gray-800 dark:text-white pb-2 px-8 mt-20 rounded-lg">
							<div>
								<label className="text-sm  dark:text-white text-gray-600">Names</label>
								<input
									className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-700 placeholder-gray-300 border rounded-xl focus:outline-none"
									type="text"
									name="names"
									ref={namesRef}
								/>
							</div>
							<div className="mt-2">
								<label className="text-sm dark:text-white text-gray-600">Email</label>
								<input
									className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-700 placeholder-gray-300 border rounded-xl focus:outline-none"
									type="email"
									name="email"
									ref={emailRef}
								/>
							</div>
							{/* valueAsDate: true  */}
							<div className="mt-2">
								<label className="text-sm  dark:text-white text-gray-600">Date Of Birth</label>
								<input
									className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-700 placeholder-gray-300 border rounded-xl focus:outline-none"
									type="date"
									name="dob"
									ref={dobRef}
								/>
							</div>
							<div className="mt-2">
								<label className="text-sm  dark:text-white text-gray-600">Country</label>
								<input
									className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-700 placeholder-gray-300 border rounded-xl focus:outline-none"
									type="text"
									name="country"
									ref={countryRef}
								/>
							</div>
							<div className="mt-2">
								<label className="text-sm  dark:text-white text-gray-600">Password</label>
								<input
									className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-700 placeholder-gray-300 border rounded-xl focus:outline-none"
									type="password"
									name="password"
									ref={passwordRef}
								/>
							</div>
							<div className="mt-2 flex">
								<input
									ref={acceptTermsRef}
									type="checkbox" className="mt-4 bg-white" name="acceptTerms" className="" id="" />
								<span className="text-sm dark:text-white text-gray-600 px-4">I agree to all terms and conditions.</span>
							</div>
							<div className="flex justify-center mt-2">
								<button type="submit"
									value="submit"
									className="h-10 mt-2 px-8 bg-blue-400 hover:bg-blue-700 text-white font-bold md:py-0 rounded-md">
									<span>Sign up</span>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}

export default Register;

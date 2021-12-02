import React, { useRef } from "react";
import { useForm } from 'react-hook-form';
// import withTransition from '../../HOC/withTransition';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';

function Register() {
	const namesRef = useRef();
	const emailRef = useRef();
	const dobRef = useRef();
	const countryRef = useRef();
	const passwordRef = useRef();
	const acceptTermsRef = useRef();

	const onSubmit = async (data, e) => {
		// await fetchAPI(data)
		e.preventDefault();
		//Getting value from useRef()
		const enteredNames = namesRef.current.value;
		const enteredEmail = emailRef.current.value;
		const enteredDob = dobRef.current.value;
		const enteredCountry = countryRef.current.value;
		const enteredPassword = passwordRef.current.value;
		const enteredAcceptTerms = acceptTermsRef.current.value;

		//Validation
		if (!email || !email.includes('@') || !password || !names || !dob || !country || !acceptTerms) {
			alert('Invalid details');
			return;
		}
		//POST form values
		const res = await fetch('/api/auth/signup', {
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
		});
		//Await for data for any desirable next steps
		const dataOutput = await res.json();
		console.log(dataOutput);
		if (!res.ok) {
			throw new Error(dataOutput.message || 'Something went wrong!');
		}

		return dataOutput;
	};

	// async function registerSubmitHandler(e) {
	// 	e.preventDefault();
	// };

	// Form Validation rules
	const validationSchema = Yup.object().shape({
		names: Yup.string().required('Names are required'),
		email: Yup.string()
			.required('Email is required')
			.email('Email is invalid'),
		dob: Yup.string()
			.required('Date of Birth is required')
			.matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
		country: Yup.string().required('Country is required'),

		acceptTerms: Yup.bool()
			.oneOf([true], 'Accept Ts & Cs is required'),

		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required')
	});

	const formOptions = { resolver: yupResolver(validationSchema) };

	// prevent submitting invalid or empty emails
	const { register, handleSubmit, formState: { errors }, formState } = useForm();
	// set default form values if in edit mode

	return (
		<div className="bg-blue-100 dark:bg-gray-900 dark:text-white w-full">
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
				<form onSubmit={handleSubmit(onSubmit)} ></form>
				<div className="pt-8 bg-white dark:bg-gray-900 dark:text-white pb-2 px-8 mt-20 rounded-lg">
					<div>
						<label className="text-sm  dark:text-white text-gray-600">Names</label>
						<input
							{...register('names')} className={`form-control ${errors.names ? 'is-invalid' : ''}`}
							className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-200 placeholder-gray-300 border rounded-xl focus:outline-none"
							type="text"
							name="names"
							ref={namesRef}
						/>
						<div className="invalid-feedback">{errors.names?.message}</div>
					</div>
					<div className="mt-2">
						<label className="text-sm dark:text-white text-gray-600">Email</label>
						<input
							{...register('email', {
								required: true
							})} className={`form-control ${errors.email ? 'is-invalid' : ''}`}
							className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-200 placeholder-gray-300 border rounded-xl focus:outline-none"
							type="email"
							name="email"
							ref={emailRef}
						/>
						<div className="invalid-feedback">{errors.email?.message}</div>
					</div>
					{/* valueAsDate: true  */}
					<div className="mt-2">
						<label className="text-sm  dark:text-white text-gray-600">Date Of Birth</label>
						<input
							{...register('dob', {
								required: true
							})} className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
							className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-200 placeholder-gray-300 border rounded-xl focus:outline-none"
							type="date"
							name="dob"
							ref={dobRef}
						/>
						<div className="invalid-feedback">{errors.dob?.message}</div>
					</div>
					<div className="mt-2">
						<label className="text-sm  dark:text-white text-gray-600">Country</label>
						<input
							{...register('country')} className={`form-control ${errors.country ? 'is-invalid' : ''}`}
							className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-200 placeholder-gray-300 border rounded-xl focus:outline-none"
							type="text"
							name="country"
							ref={countryRef}
						/>
						<div className="invalid-feedback">{errors.country?.message}</div>
					</div>
					<div className="mt-2">
						<label className="text-sm  dark:text-white text-gray-600">Password</label>
						<input
							{...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} className={`form-control ${errors.password ? 'is-invalid' : ''}`}
							className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-200 placeholder-gray-300 border rounded-xl focus:outline-none"
							type="password"
							name="password"
							ref={passwordRef}
						/>
						<div className="invalid-feedback">{errors.password?.message}</div>
					</div>
					<div className="mt-2 flex">
						<input
							ref={acceptTermsRef}
							{...register('acceptTerms')} className={`form-control ${errors.acceptTerms ? 'is-invalid' : ''}`}
							type="checkbox" className="mt-4 dark:bg-gray-200 bg-white" name="acceptTerms" className="" id="" />
						<span className="text-sm dark:text-white text-gray-600 px-4">I agree to all terms and conditions.</span>
						<div className="invalid-feedback">{errors.acceptTerms?.message}</div>
					</div>
					<div className="flex justify-center mt-2">
						<button type="submit" className="h-10 mt-2 px-8 bg-blue-400 hover:bg-blue-700 text-white font-bold md:py-0 rounded-md"><span>Sign up</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;

import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import Toggle from '../theme/themeToggle';
import { useState } from 'react';

export default function Navbar() {
	const { data: session } = useSession()
	const [active, setActive] = useState(false);

	const handleClick = () => {
		setActive(!active);
	};
	return (
		<nav className="lg:bg-white z-40 bg-gray-600 h-16 fixed top-0 w-full shadow-md dark:bg-gray-900 dark:text-white">
			<div className="lg:flex cursor-pointer justify-around md:flex">
				{/* Align Name with Toggle Icon */}
				<div className="flex items-center justify-between">
					<div className="text-xl py-4 font-semibold">
						<h2 className="text-2xl font-bold dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
							<span className="cursor-pointer">
								<span className="text-blue-400">ready</span>
								<span className="text-yellow-400">to</span>
								<span className="text-blue-400">go</span>
								<span className="text-yellow-400">out</span>
							</span>
						</h2>
					</div>
					{/* Mobile menu button */}
					<div className="flex md:hidden lg:hidden">
						<button onClick={handleClick}
							type="button"
							className="bg-white rounded-md p-2 text-gray-400  hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								{!active ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
									></path>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>
				<li className={`${active ? 'bg-gray-600' : 'hidden'} py-4 mt-2 sm:flex block text-sm text-white dark:text-white lg:text-gray-600 capitalize hover:text-blue-700`}>
					<Link href="/">
						<a> Home</a>
					</Link>
				</li>

				<li className="py-4 mt-2 sm:flex block text-sm text-white dark:text-white lg:text-gray-600 capitalize hover:text-blue-700">
					<Link href="/">
						<a>All Countries</a>
					</Link>
				</li>
				<li className="py-4 mt-2 sm:flex block text-sm 
				text-white dark:text-white lg:text-gray-600 capitalize 
				hover:text-blue-700">
					{session ? (
						<>
							{session.user.email} <button onClick={() => signOut()}>Sign out</button>
						</>
					) : (
						<button onClick={() => signIn()}>Sign in</button>
					)}
				</li>

				<div className="lg:flex-row flex md:flex-row flex-col cursor-pointer lg:justify-end">
					<button className="h-10 mt-2 px-4 dark:text-white bg-blue-400 hover:bg-blue-700 text-white font-bold md:py-0 rounded-lg lg:rounded-xl">
						<Link href="/login">
							<a>
								<span>Login</span>
							</a>
						</Link>
					</button>

					<button className="h-10 border-1 dark:text-blue-400 hover:border-blue-700 border-blue-400 lg:ml-8 mt-2 px-4 border-blue border text-blue-400 font-bold md:py-0 rounded-lg lg:rounded-xl">
						<Link href="/register">
							<a>
								<span>Sign Up</span>
							</a>
						</Link>
					</button>
				</div>

				<li className="py-2 sm:flex block text-sm dark:text-white text-white lg:text-gray-600 capitalize hover:text-blue-700">
					<Toggle />
				</li>
			</div>
		</nav>
	)
}

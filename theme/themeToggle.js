import React from 'react';
import { useTheme } from 'next-themes';
import { IoSunny, IoMoon } from 'react-icons/io5';

const Toggle = () => {
	const { theme, setTheme } = useTheme();

	const switchTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<div className="p-2 transition duration-500 ease-in-out rounded-full">
			{theme === 'dark' ? (
				<IoSunny onClick={switchTheme} className="text-2xl cursor-pointer" />
			) : (
				<IoMoon onClick={switchTheme} className="text-2xl cursor-pointer" />
			)}
		</div>
	);
};

export default Toggle;

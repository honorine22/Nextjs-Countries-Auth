import { GoSearch } from "react-icons/go";
const Searchbar = ({ ...rest }) => {
	return (
		<div className="flex items-center mb-4 overflow-hidden text-gray-400 rounded-md shadow focus-within:ring">
			<GoSearch className="mx-8 transform scale-150" />
			<input
				className="w-full px-40 py-4 focus:outline-none"
				autoComplete="off"
				type="search"
				id="userSearch"
				{...rest}
			/>
		</div>
	);
};

export default Searchbar;
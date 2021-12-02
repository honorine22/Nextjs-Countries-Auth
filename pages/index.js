import SearchBar from '../components/SearchBar';
import Footer from '../components/footer';
import CountryCard from '../components/CountryCard';
import { useState } from 'react';
import Navbar from '../components/navbar';
function Home({ countries }) {
	const [keyword, setKeyword] = useState("");
	const onInputChange = (e) => {
		e.preventDefault();

		setKeyword(e.target.value.toLowerCase());
	};
	return (
		<div className="text-gray-900 bg-white dark:bg-gray-900 dark:text-white">
			<Navbar />
			<div className="flex-row items-center flex lg:ml-80 justify-between pt-24 sm:flex sm:mb-16">
				<SearchBar placeholder="search by country, region, or subregion" onChange={onInputChange} />
			</div>
			<CountryCard keyword={keyword} countries={countries} />
			<Footer />
		</div>
	);
}

export default Home;

export const getStaticProps = async () => {
	console.log("get static props")
	const res = await fetch("https://restcountries.com/v2/all");
	const countries = await res.json();

	return {
		props: {
			countries,
		},
	};
}
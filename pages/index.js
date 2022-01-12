import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import { useState } from 'react';
import Layout from '../components/layout';

function Home({ countries }) {
	const [keyword, setKeyword] = useState("");

	const onInputChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};
	return (
		<Layout>
			<div className="flex-row items-center flex lg:ml-80 justify-between pt-24 sm:flex sm:mb-16">
				<SearchBar placeholder="search by country, region, or subregion" onChange={onInputChange} />
			</div>
			<CountryCard keyword={keyword} countries={countries} />
		</Layout>

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
import Link from 'next/link';
import Layout from '../../components/layout'
import { useState, useEffect } from 'react';
import { GoArrowLeft } from 'react-icons/go';

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
	const country = await res.json();

	return country;
};

export default function DetailPage({ country }) {
	const [borders, setBorders] = useState([]);

	const getBorders = async () => {
		if (country.borders) {
			const borders = await Promise.all(country.borders.map((border) => getCountry(border)));
			setBorders(borders);
		}
	};

	useEffect(() => {
		getBorders();
	}, []);
	return (
		<Layout>
			<div className="flex py-8 mx-8 md:mx-16 lg:mb-8 xl:max-w-screen-xl xl:mx-auto">
				<Link href="/">
					<button className="flex md:ml-40 items-center px-8 pt-4 mt-16 rounded shadow focus-within:ring bg-light-elements dark:bg-dark-elements focus:outline-none hover:bg-opacity-5">
						<GoArrowLeft /> Back
					</button>
				</Link>
			</div>

			<div className="max-w-screen-xl gap-24 pb-8 mx-8 md:pb-12 lg:pb-0 lg:items-center md:mx-24 xl:px-12 lg:mx-32 xl:flex xl:mx-auto">
				<img
					className="w-full h-auto rounded-md md:max-w-2xl xl:max-w-xl"
					src={country.flag}
					alt={`The flag of ${country.name}`}
				/>

				<div className="items-center justify-center pt-12 xl:p-0 md:flex-row">
					<h1 className="mb-8 text-2xl font-bold">{country.name}</h1>
					<div className="gap-12 md:flex">
						<ul className="leading-relaxed">
							<li>
								<span className="font-semibold">Native Name: </span>
								{country.nativeName}
							</li>
							<li>
								<span className="font-semibold">Population: </span>
								{country.population.toLocaleString()}
							</li>
							<li>
								<span className="font-semibold">Region: </span>
								{country.region}
							</li>
							<li>
								<span className="font-semibold">Sub Region: </span>
								{country.subregion}
							</li>
							<li>
								<span className="font-semibold">Capital: </span>
								{country.capital}
							</li>
						</ul>
						<ul className="mt-4 leading-relaxed md:mt-0">
							<li>
								<span className="font-semibold">Top level Domain: </span>
								{country.topLevelDomain}
							</li>
							<li>
								<span className="font-semibold">Currencies: </span>
								{country.currencies[0].name}
							</li>
							<li>
								<span className="font-semibold">Languages: </span>
								{country.languages
									.map((language) => {
										return language.name;
									})
									.join(',  ')}
							</li>
						</ul>
					</div>
					<div className="mt-8 xl:max-w-lg">
						<span className="font-semibold">Borders: </span>
						<br />
						{borders > 0 ? (borders.map(({ flag, name }) => (
							<div className="px-4 py-2 mt-2 mr-2 rounded shadow focus-within:ring bg-light-elements dark:bg-dark-elements focus:outline-none hover:bg-opacity-5 dark:hover:bg-opacity-75" key={name}>
								<img src={flag} alt={name}></img>

								<div className="">{name}</div>
							</div>
						))) : (
							<p>None</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export const getStaticPaths = async () => {
	const res = await fetch("https://restcountries.com/v2/all");
	const countries = await res.json();

	const paths = countries.map((country) => ({
		params: { id: country.alpha3Code },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const country = await getCountry(params.id);

	return {
		props: {
			country,
		},
	};
};

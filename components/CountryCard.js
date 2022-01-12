import Link from "next/link";
const CountryCard = ({ countries, keyword }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-x-16 gap-y-8 px-4">
			{countries &&
				countries
					.filter(
						(country) =>
							country.name.toLowerCase().includes(keyword) ||
							country.region.toLowerCase().includes(keyword) ||
							country.subregion.toLowerCase().includes(keyword)
					).map((country) => (
						<Link href={`/country/${country.alpha3Code}`} key={country.name}>
							<div className="overflow-hidden cursor-pointer dark:bg-dark-elements dark:text-light-elements transition-transform duration-300 ease-out transform rounded-lg shadow cursor-pointer xl:hover:scale-105">
								<img
									className="object-cover w-full h-56 md:h-48 lg:h-72 xl:h-48"
									src={country.flag}
									alt={`The flag of ${country.name}`}
								/>

								<div className="p-8 leading-relaxed">
									<h2 className="mb-4 text-lg font-bold">{country.name}</h2>
									<div>
										<span className="font-semibold">Population: </span>
										{country.population.toLocaleString()}
									</div>
									<div>
										<span className="font-semibold">Region: </span>
										{country.region}
									</div>
									<div>
										<span className="font-semibold">Capital: </span>
										{country.capital}
									</div>
								</div>
							</div>
						</Link>
					))}
		</div>
	);
};

export default CountryCard;

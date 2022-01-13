import React from 'react'
// import { getSession } from "next-auth/react"
import Sidebar from '../components/sidebar';
import Footer from '../components/footer'
function Dashboard({ countries }) {

    const data = [
        { id: 1, num: 4, activity: 'Countries Visited', color: 'bg-blue-500' },
        { id: 2, num: 4, activity: 'Planned Countries', color: 'bg-blue-300' },
        { id: 3, num: 8, activity: 'Visited&Planned', color: 'bg-yellow-500' },
        { id: 4, num: 256, activity: 'All Countries', color: 'bg-yellow-300' }
    ];
    return (
        <div className="flex flex-wrap">
            <div className='lg:bg-white px-2 z-40 bg-gray-600 rounded-tr-3xl rounded-tl-3xl h-16 fixed top-0 w-full shadow-md dark:bg-gray-900 dark:text-white'>
                <div className="flex items-center justify-between">
                    <div className="text-xl py-2 font-semibold">
                        <h2 className="text-2xl font-bold dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                            <span className="cursor-pointer">
                                <span className="text-blue-400">ready</span>
                                <span className="text-yellow-400">to</span>
                                <span className="text-blue-400">go</span>
                                <span className="text-yellow-400">out</span>
                            </span>
                        </h2>
                    </div>
                    <li className="py-4 sm:flex block text-sm text-white dark:text-white lg:text-gray-600 capitalize hover:text-blue-700">
                        <div className="flex items-stretch">
                            <i className="py-2 px-4 fas fa-search text-lg"></i>
                            <input type="text" name="name" placeholder="Search country here..."
                                className="border-b-0 border-gray-600 outline-none" />
                        </div>
                    </li>
                    <li className="py-2 sm:flex block text-sm text-white dark:text-white lg:text-gray-600 capitalize hover:text-blue-700">
                        <div className='flex items-stretch'>
                            <img
                                src="https://source.unsplash.com/100x100/?portrait"
                                alt="Cameron Williamson"
                                className="w-12 h-12 rounded-full"
                            />
                            <p className='text-md px-4 py-4'>Cameron Williamson</p>
                            <span className='py-4'><i className="fas text-lg fa-angle-down"></i></span>
                        </div>
                    </li>
                </div>
            </div>
            <div className='mt-12 flex'>
                <Sidebar />
                <div className='flex mt-8 flex-row'>
                    {data && data.map((item) => {
                        return (
                            <div key={item.id} className="px-8">
                                <div className="flex items-center p-8 bg-white h-24 shadow rounded-lg">
                                    <div className={`${item.color} inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 rounded-full mr-6`}>
                                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                        </svg>
                                        <i className="far fa-chart-bar"></i>
                                    </div>
                                    <div>
                                        <span className="inline-block text-2xl font-bold">{item.num}</span>
                                        <span className="block text-gray-500">{item.activity}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row'>
                    <p className='text-lg'>Names</p>
                    <p className='text-lg'>Dialing Code</p>
                    <p className='text-lg'>Population</p>
                    <p className='text-lg'>Currencies</p>
                    <p className='text-lg'>Region</p>
                </div>


                {countries && countries.map((country) => {
                    return (
                        <div key={country.alpha3Code} className='flex flex-row'>
                            <img
                                src={country.flag} alt={country.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <p>{country.name}</p>
                            <p>{country.alpha3Code}</p>
                            <p>{country.population.toLocaleString()}</p>
                            {/* <p>{country.currencies[0].name}</p> */}
                            <p>{country.region}</p>
                        </div>
                    )
                })
                }
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard

export const getStaticProps = async () => {
    console.log("get static props")

    const plannedCountries = await fetch("https://restcountries.com/v2/all");
    const countries = await plannedCountries.json();

    return {
        props: {
            countries,
        },
    };
}

// export async function getServerSideProps({ req, res }) {
//     const session = await getSession({ req })
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }
//     return {
//         props: {},
//     };
// }
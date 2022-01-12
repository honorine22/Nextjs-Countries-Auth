import React, { useState, useEffect } from 'react'
import { getSession } from "next-auth/react"

const fetchData = async () => {
    const res = await fetch('/api/dashboard', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    const json = await res.json();

    if (!res.ok) {
        throw json
    }

    return json
}

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData().then(data => {
            setData(data)
        })

    }, [])

    return (
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {data.map((item) => {
                return (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div className="flex items-center p-8 bg-white shadow rounded-lg">
                            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
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
    )
}
export async function getServerSideProps({ req, res }) {
    const session = await getSession({ req })
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    };
}
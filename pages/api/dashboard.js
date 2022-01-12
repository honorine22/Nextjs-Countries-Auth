import { getSession } from 'next-auth/react'

const data = [
    { num: 4, activity: 'Countries Visited' },
    { num: 4, activity: 'Planned Countries' },
    { num: 8, activity: 'Visited&Planned' },
    { num: 256, activity: 'All Countries' }
];

export default async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.redirect('/')
    }
    res.status(200).json(data)
}
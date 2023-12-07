import { prisma } from './getToken.js';

export const BASE_URL = "https://api.intra.42.fr";

export default async (req, res) => {
	try {
        let campus_list = await prisma.campus.findMany();
		res.status(200).json({ campus_list }); 
	} catch (error) {
		if (error.response && error.response.data)
    		res.status(500).json({ error: error.response.data }); 
		else
    		res.status(500).json({ error: 'Something went wrong here' });
	}
};
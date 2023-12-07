import axios from 'axios/dist/node/axios.cjs';
// import axios from 'axios';
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const BASE_URL = "https://api.intra.42.fr";

export default async (req, res) => {
	try {
		let code = req.body.code;
		let response = await axios.post(BASE_URL + "/oauth/token" +
			"?grant_type=authorization_code" +
			"&client_id=" + process.env.CLIENT_ID +
			"&client_secret=" + process.env.CLIENT_SECRET +
			"&code=" + code +
			 "&redirect_uri=https://www.42rank.xyz"
			// "&redirect_uri=http://localhost:3000"
		);
		let user = await axios.get(BASE_URL + "/v2/me",
		{
			headers: {
				Authorization: `Bearer ${response.data.access_token}`
			}
		});
		let campus_id = user.data.campus[0].id;
		let cursus_id = user.data.cursus_users[user.data.cursus_users.length - 1].cursus_id;
		// 
		let students = await prisma.$queryRaw`
			SELECT CAST(id AS TEXT), cursus_id, campus_id, level, first_name, last_name, login,
				image, CAST(ROW_NUMBER() OVER (PARTITION BY campus_id, cursus_id ORDER BY level DESC) AS INT) AS rank
			FROM "Students"
			WHERE campus_id = ${campus_id}
			AND cursus_id = ${cursus_id}
			ORDER BY level DESC
			LIMIT 50;
		`;

		let totalCount = await prisma.students.count({
			orderBy: {
				level: "desc"
			},
			where: {
				campus_id: campus_id,
				cursus_id: cursus_id
			}
		})
		res.status(200).json({ student: user.data, students: students, totalCount: totalCount }); 
	} catch (error) {
		console.log(error.response?.data || error.response || error)
		if (error.response && error.response.data)
    		res.status(500).json({ error: error.response.data }); 
		else
    		res.status(500).json({ error: 'Something went wrong here' });
	}
};
import { prisma } from './getToken.js';

export default async (req, res) => {
	try {
        let page = parseInt(req.query.page);
        let campus_id = parseInt(req.query.campus_id);
        let cursus_id = parseInt(req.query.cursus_id);
        if (!campus_id){
            let students = await prisma.$queryRaw`
                SELECT CAST(id AS TEXT), cursus_id, campus_id, level, first_name, last_name, login,
                    image, CAST(ROW_NUMBER() OVER (PARTITION BY cursus_id ORDER BY level DESC) AS INT) AS rank
                FROM "Students"
                WHERE cursus_id = ${cursus_id}
                ORDER BY level DESC
                OFFSET ${(page - 1) * 50}
                LIMIT 50;
            `;
    
            let totalCount = await prisma.students.count({
                orderBy: {
                    level: "desc"
                },
                where: {
                    cursus_id: cursus_id
                }
            })
    
            res.status(200).json({ students, totalCount });
        } else {
            let students = await prisma.$queryRaw`
                SELECT CAST(id AS TEXT), cursus_id, campus_id, level, first_name, last_name, login,
                    image, CAST(ROW_NUMBER() OVER (PARTITION BY campus_id, cursus_id ORDER BY level DESC) AS INT) AS rank
                FROM "Students"
                WHERE campus_id = ${campus_id}
                AND cursus_id = ${cursus_id}
                ORDER BY level DESC
                OFFSET ${(page - 1) * 50}
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
    
            res.status(200).json({ students, totalCount });
        }
    } catch(error) {
        console.log(error)
        if (error.response && error.response.data)
            res.status(500).json({ error: error.response.data }); 
        else
            res.status(500).json({ error: "Something wrong" });
    }
}
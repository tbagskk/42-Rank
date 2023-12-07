import "./Leaderboard.css"
import "./Leaderboard_responsive.css"
import Profil from "../Profil/Profil.js"

export default function Leaderboard({students}){
    return (
        <div className="leaderboard">
            {students.map((student, index) => (<Profil student={student} key={index}/>))}  
        </div>
    );
}
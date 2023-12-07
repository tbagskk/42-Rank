import "./Dropdown.css"
import { useState } from "react";
import arrow from "../../assets/arrow.png"

export default function Dropdown({placeholder, drop_function, values, disable})
{
    let [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`bar dropdown ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(disable ? false : !isOpen)}>
            <p className="p_bar">{placeholder || values.find(e => e.current)?.placeholder || ""}</p>
            <img alt="arrow" className="img_arrow" src={arrow}></img>
            <div className={"dropdown-content" + (values.length > 10 ? " first" : "")}>
                {values.map((value, index) => (
                    <div key={index} onClick={() => drop_function(value.drop_value)}>{value.placeholder}</div>
                ))}
            </div>
        </div>
    );
}
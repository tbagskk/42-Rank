import "./PageButtons.css"

export default function PageButtons({page, nbPages, setPage, setStudents}){
    let buttons = [];

    let update_page = (event) => {
        setStudents([]);
        setPage(parseInt(event.target.textContent));
    }

    if (nbPages > 7){
        if (page > 3 && page <= nbPages - 3)
        {
            buttons.push(
                <button key={1} className={"page_button" + (1 === page ? " current" : "")} onClick={(event) => update_page(event)}>{1}</button>,
            )
            for(let i = page - 2; i <= page + 2; i++)
                buttons.push(
                    <button key={i} className={"page_button" + (i === page ? " current" : "")} onClick={(event) => update_page(event)}>{i}</button>,
                )
            buttons.push(
                <button key={nbPages} className={"page_button" + (nbPages === page ? " current" : "")} onClick={(event) => update_page(event)}>{nbPages}</button>,
            )
        }
        else if (page < 5){
            for(let i = 1; i <= 6; i++)
                buttons.push(
                    <button key={i} className={"page_button" + (i === page ? " current" : "")} onClick={(event) => update_page(event)}>{i}</button>,
                )
            buttons.push(
                <button key={nbPages} className={"page_button" + (nbPages === page ? " current" : "")} onClick={(event) => update_page(event)}>{nbPages}</button>,
            )
        }
        else {
            buttons.push(
                <button key={1} className={"page_button" + (1 === page ? " current" : "")} onClick={(event) => update_page(event)}>{1}</button>,
            )
            for(let i = nbPages - 5; i <= nbPages; i++)
                buttons.push(
                    <button key={i} className={"page_button" + (i === page ? " current" : "")} onClick={(event) => update_page(event)}>{i}</button>,
                )
        }
    } else {
        for(let i = 1; i <= nbPages; i++)
            buttons.push(
                <button key={i} className={"page_button" + (i === page ? " current" : "")} onClick={(event) => update_page(event)}>{i}</button>
            );
    }
    return (
        buttons
    );
}

export default function Paginado1({ activitiesPerPage, allActivities, paginado1 }) {

    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allActivities/activitiesPerPage); i++){
        pageNumbers.push(i + 1);
    }


    return (
        <nav>
            {
                pageNumbers?.map(number => (
                    <button className="btn" key={number} onClick={() => paginado1(number)}>
                        {number}
                    </button>
                ))
            }
        </nav>
    )
}
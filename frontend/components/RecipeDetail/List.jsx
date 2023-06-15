function List({ title, list }) {
    return (
        <div className="mt-8">
            <h1 className="font-bold text-[40px] mb-2">{title}</h1>

            <ul className={title === 'Ingredients' ? 'red-bullet' : ''}>
                {list.map((item, index) =>
                    title === 'Ingredients' ? (
                        <li key={item.id} className="mb-3">
                            {item.value}
                        </li>
                    ) : (
                        <li key={item.id} className="mb-5">
                            {list.length > 1 && <h2 className="font-bold mb-1">Step {index + 1}</h2>}
                            <p className="text-justify">{item.value}</p>
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
}

export default List;

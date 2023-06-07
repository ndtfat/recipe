import Image from 'next/image';

function Card({ food }) {
    return (
        <div>
            <Image alt={food.name} src={food.thumb} />
        </div>
    );
}

export default Card;

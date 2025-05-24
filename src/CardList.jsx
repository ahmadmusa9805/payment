import { useEffect, useState } from 'react';

export default function CardList({ userId, onCardSelected }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      const res = await fetch(`http://localhost:5001/api/v1/cards/all-cards/${userId}`);
      const data = await res.json();
       console.log(data, 'musa'); // check what data looks like
    //   setCards(data.data);
     setCards(Array.isArray(data) ? data : data.data || data.cards || []);
      setLoading(false);
    }
    if (userId) fetchCards();
  }, [userId]);

  if (loading) return <div>Loading cards...</div>;

  if (cards.length === 0) return <div>No saved cards</div>;

  return (
    <ul>
      {cards?.map((card) => (
        <li key={card._id}>
          {card.cardBrand.toUpperCase()} **** **** **** {card.last4} - Exp: {card.expMonth}/{card.expYear}{' '}
          <button onClick={() => onCardSelected(card)}>Pay with this card</button>
        </li>
      ))}
    </ul>
  );
}

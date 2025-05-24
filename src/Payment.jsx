import { useState } from 'react';
import CardInputForm from './CardInputForm';
import CardList from './CardList';
import PaymentProcessor from './PaymentProcessor';

export default function PaymentPage() {
  const userId = '67de6fe54f815ca7f35292ad'; // replace with actual logged-in user id
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsUpdated, setCardsUpdated] = useState(false);

  function onCardSaved(newCard) {
    console.log(newCard, "from payment page");
    alert('Card saved!');
    setCardsUpdated((v) => !v); // trigger CardList reload
  }

  function onCardSelected(card) {
    setSelectedCard(card);
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Add New Card</h2>
      <CardInputForm userId={userId} onCardSaved={onCardSaved} />
       <br />
       <br />
       <br />
      <h2>Your Saved Cards</h2>
      <CardList userId={userId} onCardSelected={onCardSelected} key={cardsUpdated} />

      {selectedCard && (
        <>
          <h2>Pay with Selected Card</h2>
          <PaymentProcessor userId={userId} card={selectedCard} />
        </>
      )}
    </div>
  );
}

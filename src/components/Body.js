import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';

import jsonData from '../utils/data.json';
import Liste from './Liste';

const Body = () => {

    const [ cards, setCards ] = useState(jsonData);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(update(cards, {
          $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
          ],
      }));
      }, [cards]);

      const renderCard = (card, index) => {
        return (
          <Liste 
            key={card.id} 
            index={index} 
            list={card}
            moveCard={moveCard}
          />
        );
      };


    return (
        <section id="body">
            <div className="create">
                <div className="circle-check"></div>
                <input type="text" id="name" placeholder="Create a new todo..." />
            </div>
                <div className="todo-list">
                {
                    cards.map((card, i) => renderCard(card, i))
                }
                </div>
        </section>
    )
}

export default Body
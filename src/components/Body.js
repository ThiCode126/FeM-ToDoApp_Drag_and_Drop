import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';

import jsonData from '../utils/data.json';
import Liste from './Liste';

const Body = () => {

    const [ cards, setCards ] = useState(jsonData);
    const [ newData, setNewData ] = useState({
        "id": cards.length,
        "name": "",
        "active": true
    });

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(update(cards, {
          $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
          ],
      }));
      }, [cards]);

    const handleChangeName = e => {
        let data = { ...newData};
        data.name = e.target.value;
        setNewData(data);
    }
 
    const addData = e => {
        e.preventDefault();
        let data =  [...cards];
        console.log(data)
        data.push(newData);
        setCards(data);
        setNewData({
            "id": data.length,
            "name": "",
            "active": true
        }); 
    }

    const toggleActive = id => {
        let data =  [...cards];
        data[id].active = !data[id].active;
        setCards(data);
    }

      const renderCard = (card, index) => {
        return (
          <Liste 
            key={card.id} 
            index={index} 
            list={card}
            moveCard={moveCard}
            toggleActive={toggleActive}
          />
        );
      };


    return (
        <section id="body">
            <div className="create">
                <div className="circle-check"></div>
                <form onSubmit={addData} >
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Create a new todo..." 
                        value={newData.name}
                        onChange={handleChangeName}
                    />
                    <button type="submit" className="btn-sub"></button>
                </form>
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
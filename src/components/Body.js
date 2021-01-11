import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';

import jsonData from '../utils/data.json';
import Liste from './Liste';
import Filter from './Filter';

import useWindowDimensions from '../utils/useWindowDimension'


const Body = () => {

    const { width } = useWindowDimensions();

    const isSmallWidth = width < 1440 ? true : false ;
    const [ cards, setCards ] = useState(jsonData);
    const [ cardsFilter, setCardsFilter ] = useState([...cards]);
    const [ numberItemLeft, setNumberItemLeft ] = useState(0);
    const [ newData, setNewData ] = useState({
        "id": cards.length,
        "name": "",
        "active": true
    });
    const [ filter, setFilter ] = useState(null);

    useEffect(() => {
        let n = 0;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].active) {
                n++;
            }
        }
        setNumberItemLeft(n);

    }, [cards, numberItemLeft]);

    useEffect(() => {
        let newCardsFilter = []
        if (filter === true) {
            newCardsFilter = cards.filter(item => item.active === true);
        } else if (filter === false) {
            newCardsFilter = cards.filter(item => item.active === false);
        } else {
            newCardsFilter = [...cards]
        }

        setCardsFilter(newCardsFilter)

    }, [cards, filter]);

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

    const removeItem = id => {
        let data =  [...cards];
        data.splice(id, 1);
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
            removeItem={removeItem}
            />
        );
    };

    const removeCompleted = () => {
        let data =  [...cards];
        const dataFilter = data.filter(item => item.active === true);
        setCards(dataFilter);

    }

    const handleFilter = (status) => {
        setFilter(status)
    }

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
                    cardsFilter.map((card, i) => renderCard(card, i))
                }
                <div 
                    className={`list list-info ${isSmallWidth ? 'list-mobile' : 'list-desktop'}`} 
                    draggable="false"
                >
                    <span>{numberItemLeft} items left</span>
                    {
                        !isSmallWidth && 
                        <Filter
                            type="desktop"
                            handleFilter={handleFilter}
                            filter={filter}
                        />
                    }
                    <span className="pointer clear" onClick={removeCompleted}>Clear Completed</span>
                </div>
            </div>
            {
                isSmallWidth && 
                <Filter
                    type="mobile"
                    handleFilter={handleFilter}
                    filter={filter}
                />
            }
        </section>
    )
}

export default Body
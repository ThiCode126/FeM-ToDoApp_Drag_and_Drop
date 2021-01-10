import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ItemTypes } from '../utils/ItemTypes';
import SvgIconCross from './IconCross';
import SvgIconCheck from './IconCheck';

const Liste = ({list, index, moveCard, toggleActive, removeItem}) => {

    const { id, name, active } = list;

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
            return;
          }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          // Time to actually perform the action
          moveCard(dragIndex, hoverIndex);
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex;
        }
      });

    const [{ isDragging }, drag] = useDrag({
        item: { id, type: ItemTypes.CARD, index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
      })
      const opacity = isDragging ? 0 : 1;
      drag(drop(ref));
    return (
        <div 
            className="list list-grid"  style={{opacity }}
            id={`id-${id}`} 
            ref={ref}
        >
            <div 
                className={`circle-check ${active ? 'active' : 'completed'}`}
                onClick={() => toggleActive(index)}
            >
                {
                    active ?  '' : <SvgIconCheck />
                }
            </div>

           <span className={`name-value ${active ? 'active' : 'completed'}`}>
               {name}
           </span>
           <span className="pointer" onClick={() => removeItem(index)}>
               <SvgIconCross />
           </span>
        </div>
    )
}

export default Liste
// import React, { useState } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// const playerList = [
//   { id: 1, content: 'First task' },
//   { id: 2, content: 'Second task' },
//   { id: 3, content: 'Third task' },
//   { id: 4, content: 'Fourth task' },
//   { id: 5, content: 'Fifth task' },
//   { id: 6, content: 'First task' },
//   { id: 7, content: 'Second task' },
//   { id: 8, content: 'Third task' },
//   { id: 9, content: 'Fourth task' },
//   { id: 10, content: 'Fifth task' },
//   { id: 11, content: 'First task' },
//   { id: 12, content: 'Second task' },
//   { id: 13, content: 'Third task' },
// ];
// const rowsFromBackend = {
//   FW: {
//     name: 'FW',
//     items: [],
//   },
//   FW2: {
//     name: 'FW2',
//     items: [],
//   },
//   MF: {
//     name: 'MF',
//     items: [],
//   },
//   DF: {
//     name: 'DF',
//     items: [],
//   },
//   GK: {
//     name: 'GK',
//     items: [],
//   },
//   List: {
//     name: 'List',
//     items: playerList,
//   },
// };

// const onDragEnd = (result: any, rows: any, setRows: any) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = rows[source.droppableId];
//     const destColumn = rows[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setRows({
//       ...rows,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems,
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems,
//       },
//     });
//   } else {
//     const column = rows[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setRows({
//       ...rows,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems,
//       },
//     });
//   }
// };

// const DragAndDrop = () => {
//   const [rows, setRows] = useState(rowsFromBackend);
//   const check = () => {
//     if (
//       rows.GK.items.length +
//         rows.DF.items.length +
//         rows.MF.items.length +
//         rows.FW2.items.length +
//         rows.FW.items.length !=
//       11
//     ) {
//       console.log('11명이 아니다');
//     }
//     // if(rows.GK.items.length == 1) {
//     //   console.log('안녕')
//     // }
//   };
//   console.log(rows.GK.items.length);
//   return (
//     <>
//       <div>
//         <div>
//           <button onClick={() => check()}>dd</button>
//           <button onClick={() => check()}>dd</button>
//           <button onClick={() => check()}>dd</button>
//         </div>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             flexDirection: 'column',
//             height: '60rem',
//           }}
//         >
//           <DragDropContext
//             onDragEnd={(result) => onDragEnd(result, rows, setRows)}
//           >
//             {Object.entries(rows).map(([columnId, column], index) => {
//               return (
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     alignContent: 'center',
//                   }}
//                   key={columnId}
//                 >
//                   <div>
//                     <Droppable
//                       droppableId={columnId}
//                       key={columnId}
//                       direction="vertical"
//                       // justifyContent="center"
//                       // alignContent="center"
//                     >
//                       {(provided, snapshot) => {
//                         return (
//                           <div
//                             {...provided.droppableProps}
//                             ref={provided.innerRef}
//                             style={{
//                               background: snapshot.isDraggingOver
//                                 ? 'lightblue'
//                                 : 'white',
//                               padding: 4,
//                               display: 'flex',
//                               flexDirection: 'row',
//                               overflowX: 'auto',
//                               width: '100vw',
//                               justifyContent: 'space-around',
//                               minHeight: '8rem',
//                               alignContent: 'center',
//                             }}
//                           >
//                             {column.items.map((item, index) => {
//                               return (
//                                 <Draggable
//                                   key={item.id}
//                                   draggableId={item.id.toString()}
//                                   index={index}
//                                 >
//                                   {(provided, snapshot) => {
//                                     return (
//                                       <div
//                                         ref={provided.innerRef}
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                         style={{
//                                           userSelect: 'none',
//                                           padding: 4,
//                                           height: '6rem',
//                                           minHeight: '6rem',
//                                           width: '4rem',
//                                           minWidth: '4rem',
//                                           backgroundColor: snapshot.isDragging
//                                             ? '#263B4A'
//                                             : '#456C86',
//                                           color: 'white',
//                                           border: '1px solid black',
//                                           ...provided.draggableProps.style,
//                                         }}
//                                       >
//                                         {item.content}
//                                       </div>
//                                     );
//                                   }}
//                                 </Draggable>
//                               );
//                             })}
//                             {provided.placeholder}
//                           </div>
//                         );
//                       }}
//                     </Droppable>
//                   </div>
//                 </div>
//               );
//             })}
//           </DragDropContext>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DragAndDrop;

import Image from 'next/image';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png',
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png',
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png',
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png',
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png',
  },
];

const DragAble = () => {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="characters-thumb">
                            <Image src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from{' '}
        <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
          Final Space Wiki
        </a>
      </p>
    </div>
  );
};

export default DragAble;

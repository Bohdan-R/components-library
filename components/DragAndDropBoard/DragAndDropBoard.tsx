import React, { useState } from 'react';
import styles from './DragAndDropBoard.module.scss';

function DragAndDropBoard() {
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: 'Create',
            items: [
                { id: 1, title: 'Create Button' },
                { id: 2, title: 'BBBBB' },
                { id: 3, title: 'CCCCCC' },
            ],
        },
        {
            id: 2,
            title: 'In progress',
            items: [
                { id: 4, title: 'DragAndDrop' },
                { id: 5, title: 'AAAAAA' },
                { id: 6, title: 'OOOOOOO' },
            ],
        },
        {
            id: 3,
            title: 'Finished',
            items: [
                { id: 7, title: 'Input component' },
                { id: 8, title: 'Select component' },
                { id: 9, title: 'KKKKKKKK' },
            ],
        },
    ]);
    return (
        <div className={styles.container}>
            {boards.map(board => (
                <div key={board.id} className={styles.board}>
                    <div className={styles.boardTitle}>{board.title}</div>
                    {board.items.map(item => (
                        <div key={item.id} className={styles.item}>
                            {item.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default DragAndDropBoard;

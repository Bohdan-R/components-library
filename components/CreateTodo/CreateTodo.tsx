import React, { useState } from 'react';
import shortid from '../../node_modules/shortid';
import InputField from '../InputField/InputField';
import Button from '../Button';
import { ITodo } from '../../interfaces/interfaces';
import styles from './CreateTodo.module.scss';
import Modal from '../Modal';

function CreateTodos() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleTitle = (value: string) => {
        setTitle(value);
    };

    const handleDescription = (value: string) => {
        setDescription(value);
    };

    const hendleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo = {
            id: shortid.generate(),
            title: title,
            description: description,
            completed: false,
        };
        setTodos(prev => [...prev, todo]);
        handleTitle('');
        handleDescription('');
    };

    console.log('TODOS:', todos);
    return (
        <>
            <div className={styles.container}>
                <div className={styles['form-container']}>
                    <h1 className={styles.title}>Create new todos</h1>
                    <form noValidate autoComplete="off" onSubmit={hendleSubmit}>
                        <div className={styles['input-wrap']}>
                            <InputField
                                as="input"
                                color="pink"
                                type="text"
                                size="medium"
                                label="Title"
                                value={title}
                                onChange={handleTitle}
                            />
                        </div>
                        <div className={styles['input-wrap']}>
                            <InputField
                                as="textarea"
                                color="pink"
                                size="medium"
                                rows={4}
                                label="Description"
                                value={description}
                                onChange={handleDescription}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="pink"
                            size="large"
                            as="button"
                            label="Submit"
                            type="submit"
                            disabled={false}
                        />
                    </form>
                </div>
            </div>
            <Button
                variant="contained"
                color="pink"
                size="large"
                as="button"
                label="Open modal"
                type="button"
                /* onClick={handleOpenModal} */
            />
            <Modal active={isOpen} setActive={setIsOpen}></Modal>
        </>
    );
}

export default CreateTodos;

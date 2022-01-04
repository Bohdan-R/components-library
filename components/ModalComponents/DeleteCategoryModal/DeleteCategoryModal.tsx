import React from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { ICategory } from '../../../interfaces/interfaces';
import { deleteCategory } from '../../../store/categories/CategoriesActionCreator';
import IconButton from '../../IconButton';
import Modal from '../../Modal';
import styles from './DeleteCategoryModal.module.scss';

interface DeleteCategoryModalProps {
    isOpen: boolean;
    setIsOpen(): void;
    categories: ICategory[];
}

function DeleteCategoryModal({ isOpen, setIsOpen, categories }: DeleteCategoryModalProps) {
    const dispatch = useAppDispatch();
    return (
        <Modal active={isOpen} setActive={setIsOpen}>
            <div className={styles.container}>
                <p className={styles.title}>Delete category</p>
                <ul className={styles.list}>
                    {categories &&
                        categories.map(category => (
                            <li key={category.id} className={styles.item}>
                                <p className={styles.itemTitle}>{category.category}</p>
                                <IconButton
                                    type="button"
                                    variant="delete"
                                    size="medium"
                                    onClick={() => dispatch(deleteCategory(category.id))}
                                    className={styles.deleteBtn}
                                />
                            </li>
                        ))}
                </ul>

                <IconButton
                    type="button"
                    variant="close"
                    size="medium"
                    onClick={setIsOpen}
                    className={styles.closeBtn}
                />
            </div>
        </Modal>
    );
}

export default DeleteCategoryModal;

import React from 'react';
import Button from '../../Button';
import IconButton from '../../IconButton';
import InputField from '../../InputField';
import Modal from '../../Modal';
import styles from './AddCategoryModal.module.scss';

interface AddCategoryModalProps<T> {
    isOpen: boolean;
    setIsOpen(): void;
    submitFunc(e: React.FormEvent<HTMLFormElement>): void;
    inputValue: string;
    onChangeFunc(value: string): void;
}

function AddCategoryModal<T>({
    isOpen,
    setIsOpen,
    submitFunc,
    inputValue,
    onChangeFunc,
}: AddCategoryModalProps<T>) {
    return (
        <Modal active={isOpen} setActive={setIsOpen}>
            <div className={styles.container}>
                <p className={styles.title}>Add category for payment</p>
                <form
                    className={styles.addForm}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitFunc(e)}
                >
                    <InputField
                        color="pink"
                        size="medium"
                        label="New category"
                        type="text"
                        value={inputValue}
                        as="input"
                        onChange={onChangeFunc}
                    />
                    <Button
                        color="pink"
                        size="medium"
                        variant="contained"
                        type="submit"
                        label="Submit"
                        as="button"
                        disabled={inputValue === '' && true}
                        className={styles.btn}
                    />
                    <IconButton
                        type="button"
                        variant="close"
                        size="medium"
                        onClick={setIsOpen}
                        className={styles.closeBtn}
                    />
                </form>
            </div>
        </Modal>
    );
}

export default AddCategoryModal;

import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineClose } from 'react-icons/ai';
import Portal from '../Portal';
import styles from './Modal.module.scss';
import IconButton from '../IconButton';

interface ModalProps {
    active: boolean;
    setActive(bool: boolean): void;
    children: React.ReactChild | React.ReactNode;
}

const cx = classNames.bind(styles);
const KEYCODE = 'Escape';

function Modal({ active, setActive, children }: ModalProps) {
    const combineClassesBackdrop = cx('backdrop', {
        open: active === true,
    });
    const combineClassesContent = cx('content', {
        open: active === true,
    });

    useEffect(() => {
        function handleEscapeKeydown(this: Window, e: KeyboardEvent) {
            if (e.key === KEYCODE) {
                setActive(false);
            }
        }
        window.addEventListener('keydown', handleEscapeKeydown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeydown);
        };
    }, [setActive]);

    return (
        <Portal>
            <div className={combineClassesBackdrop} onClick={() => setActive(false)}>
                <div
                    className={combineClassesContent}
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        e.stopPropagation()
                    }
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
}

export default Modal;

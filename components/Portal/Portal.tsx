import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactChild | React.ReactNode;
}

function Portal({ children }: PortalProps) {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted
        ? createPortal(children, document.querySelector('#portal'))
        : null;
}

export default Portal;

import React, { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Accordion from '../components/Accordion';

const classes = {
    div: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

const accordionItems = [
    {
        title: 'Title 1',
        content:
            'asd p[odfhfgdp sfdkgfdjgpsd opdsgjfophposd odpgjdsopgjsdp sdpfgokdsgopjdssdf',
    },
    {
        title: 'Title 2',
        content:
            'asd p[odfhfgdp sfdkgfdjgpsd opdsgjfophposd odpgjdsopgjsdp sdpfgokdsgopjdssdf',
    },
    {
        title: 'Title 3',
        content:
            'asd p[odfhfgdp sfdkgfdjgpsd opdsgjfophposd odpgjdsopgjsdp sdpfgokdsgopjdssdf',
    },
    {
        title: 'Title 4',
        content:
            'asd p[odfhfgdp sfdkgfdjgpsd opdsgjfophposd odpgjdsopgjsdp sdpfgokdsgopjdssdf',
    },
];

function Notes() {
    const [active, setActive] = useState<string | null>(null);

    const handleActive = (value: string) => {
        if (active === value) {
            return setActive(null);
        }

        return setActive(value);
    };

    return (
        <div /* style={classes.div} */>
            <Accordion
                active={active}
                setActive={handleActive}
                items={accordionItems}
            />
        </div>
    );
}

export default Notes;

import React, { useState } from 'react';
import RadioButton from '../components/RadioButton/RadioButton';
import Select from '../components/Select';

const items = ['React', 'Next', 'TS'];

function CreateNote() {
    const [radio, setRadio] = useState<string>('');
    const [selected, setSelected] = useState<string>('');

    return (
        <>
            <div style={{ padding: '15px' }}>
                <RadioButton
                    label="dollars"
                    color="pink"
                    name="costs"
                    selectedRadio={radio}
                    onChange={setRadio}
                />
                <RadioButton
                    label="euro"
                    color="pink"
                    name="costs"
                    selectedRadio={radio}
                    onChange={setRadio}
                />
            </div>
            <div style={{ width: 150 }}>
                <Select
                    label="Choose category"
                    items={items}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </>
    );
}

export default CreateNote;

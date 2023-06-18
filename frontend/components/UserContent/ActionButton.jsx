'use client';
import { FaSort } from '@react-icons/all-files/fa/FaSort';
import { useEffect } from 'react';
import { useState } from 'react';

import Modal from '../common/Modal';

function ActionButton({ checkedIds, actions }) {
    const [actionIndex, setActionIndex] = useState(0);

    const handleSelectAction = () => {
        setActionIndex((prev) => (prev + 1 > actions.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        if (!actions[actionIndex]) setActionIndex(0);
    });

    return (
        <div className="flex items-center">
            <Modal
                text={actions[actionIndex]?.text}
                disabled={checkedIds.value.length < 1}
                onConfirm={actions[actionIndex]?.function}
            >
                <button disabled={checkedIds.value.length < 1} className={`btn btn-sm bg-indigo-800`}>
                    {actions[actionIndex]?.icon}{' '}
                </button>
            </Modal>

            {actions.length > 1 && <FaSort className="ml-1 cursor-pointer" onClick={handleSelectAction} />}
        </div>
    );
}

export default ActionButton;

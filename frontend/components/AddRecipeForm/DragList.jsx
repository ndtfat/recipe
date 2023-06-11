'use client';

import { Reorder, useDragControls } from 'framer-motion';
import { memo, useState } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { GrDrag } from 'react-icons/gr';
import { SlClose } from 'react-icons/sl';
import { TbReplaceFilled } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';

import { useEffect } from 'react';
import { Button, Input } from '../common';

function DragList({ textarea = false, placeholder = 'placeholder', list = [], dispatch, onSetList }) {
    const controls = useDragControls();
    const [localList, setLocalList] = useState(list);
    const [isReorder, setIsReorder] = useState(false);

    useEffect(() => {
        dispatch(onSetList(localList));
    }, [localList]);

    const handleAddIngredient = () => {
        setLocalList((prev) => {
            return [...prev, { id: uuidv4(), value: '', placeholder: `Add another ${placeholder}` }];
        });
    };

    const handleRemove = (id) => {
        console.log('remove');

        if (list.length > 1) {
            setLocalList((prev) => {
                const newList = prev.filter((item) => item.id !== id);

                return newList;
            });
        }
    };

    const handleItemValue = (id, value) => {
        setLocalList((prev) => {
            const newList = prev.map((item) => {
                return item.id === id ? { ...item, value: value } : item;
            });

            return newList;
        });
    };

    return (
        <div>
            <span
                onClick={() => setIsReorder((prev) => !prev)}
                className="flex items-start justify-end cursor-pointer font-bold mb-2 text-[14px] hover:text-primary"
            >
                {isReorder ? <FaCheck size={16} className="mr-2" /> : <TbReplaceFilled size={20} className="mr-2" />}
                {isReorder ? 'DONE' : 'REORDER'}
            </span>

            <Reorder.Group values={list} onReorder={setLocalList}>
                {localList.map((item) => (
                    <Reorder.Item
                        key={item.id}
                        value={item}
                        dragListener={false}
                        dragControls={controls}
                        className="flex items-center mb-[10px]"
                    >
                        <Input
                            required
                            textarea={textarea}
                            mb={0}
                            typeInput={2}
                            value={item.value}
                            onChange={(e) => handleItemValue(item.id, e.target.value)}
                            placeholder={item.placeholder}
                        />

                        {isReorder ? (
                            <GrDrag
                                size={30}
                                className="ml-[20px] cursor-grab"
                                onPointerDown={(e) => controls.start(e)}
                            />
                        ) : (
                            <SlClose
                                size={30}
                                className="ml-[20px] cursor-pointer"
                                onClick={() => handleRemove(item.id)}
                            />
                        )}
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <Button
                typeBtn="outline"
                onClick={handleAddIngredient}
                className="inline-flex items-center text-[16px] font-medium mt-[10px] px-4 py-3"
            >
                <FaPlus className="mr-2" />
                ADD {placeholder.toUpperCase()}
            </Button>
        </div>
    );
}

export default memo(DragList);

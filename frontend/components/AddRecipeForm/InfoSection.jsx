'use client';

import { memo, useState, useEffect } from 'react';
import Image from 'next/image';

import { Input } from '../common';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import addImage from '@/public/add-recipe/your-photo-here.jpg';
import actions from './actions';
import storage from '@/services/firebase';

function Info({ info, dispatch }) {
    const [imageFile, setImageFile] = useState();
    const [downloadURL, setDownloadURL] = useState(addImage);
    const [progress, setProgress] = useState(0);

    const handleSelectedFile = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    useEffect(() => {
        if (imageFile) {
            const storageRef = ref(storage, `images/${imageFile.name}}`);
            const uploadFile = uploadBytesResumable(storageRef, imageFile);

            uploadFile.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.log({ error, message: 'Upload fail' });
                },
                () => {
                    getDownloadURL(uploadFile.snapshot.ref).then((url) => {
                        setDownloadURL(url);
                        dispatch(actions.setImgURL(url));
                    });
                },
            );
        }
    }, [imageFile]);

    return (
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <Input
                    typeInput={2}
                    label="Recipe Title"
                    placeholder="Give your recipe a title."
                    value={info.title}
                    onChange={(e) => dispatch(actions.setTitle(e.target.value))}
                />

                <Input
                    typeInput={2}
                    label="Type of dish"
                    placeholder="Main dish, healthy, drink,..."
                    value={info.dishType}
                    onChange={(e) => dispatch(actions.setDishType(e.target.value))}
                />

                <Input
                    textarea
                    typeInput={2}
                    label="Description"
                    placeholder="Share story behind your recipe and what make it special."
                    value={info.desc}
                    onChange={(e) => dispatch(actions.setDesc(e.target.value))}
                />
            </div>
            <div className="ml-[50px]">
                <Input
                    hidden
                    type="file"
                    accept="image/*"
                    label="Photo"
                    typeInput={2}
                    onInput={handleSelectedFile}
                    // onChange={(e) => console.log(e.target.files[0])}
                />

                <label htmlFor="Photo">
                    <Image
                        priority
                        alt="add-your-photo"
                        src={downloadURL}
                        width={200}
                        height={200}
                        id="image"
                        className="mt-[-12px] h-[200px] cursor-pointer object-cover"
                    />
                    <progress
                        className="progress progress-primary w-[200px]"
                        value={progress * 100}
                        max="100"
                    ></progress>
                </label>

                {/* <span className="text-[12px] mt-1">Must be at least 960 x 960</span> */}
            </div>
        </div>
    );
}

export default memo(Info);

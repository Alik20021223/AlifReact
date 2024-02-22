import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Recipe } from '../../store/reducers/post';
import { removePost, setPost, updatePost, addPost } from '../../store/slices/postSlice';

const Wall = () => {
    const posts = useSelector((state: { post: Recipe[] }) => state.post);
    const [isUpdateClick, setUpdateClick] = useState<boolean>(false);
    const [isCreateClick, setCreateClick] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        description: '',
        timeCook: '',
        listProduct: '',
        avatar: '',
    });
    const dispatch = useDispatch();
    const url = 'https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/recept';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('bad http request');
                }

                const body = await res.json();
                dispatch(setPost(body));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch, url]);

    const handleUpdateClick = (post: Recipe) => {
        setUpdateClick(true);
        setFormData({
            id: post.id,
            title: post.title,
            description: post.description,
            timeCook: post.timeCook,
            listProduct: post.listProduct,
            avatar: post.avatar,
        });
    };

    const handleUpdatePost = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updatePost(formData));
        setUpdateClick(false);
        resetFormData();
    };

    const handleCreatePost = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const createdPost = await response.json();
            dispatch(addPost(createdPost));
            resetFormData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const resetFormData = () => {
        setFormData({
            id: 0,
            title: '',
            description: '',
            timeCook: '',
            listProduct: '',
            avatar: '',
        });
    };

    return (
        <div>
            <button onClick={() => setCreateClick(!isCreateClick)}>Create post</button>
            {isCreateClick && (
                <form onSubmit={handleCreatePost}>
                    <textarea
                        name='title'
                        placeholder='Title'
                        value={formData.title}
                        onChange={handleInputChange}
                        rows={3}
                    />
                    <input
                        name='description'
                        type='text'
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        name='timeCook'
                        type='text'
                        placeholder='Time to Cook'
                        value={formData.timeCook}
                        onChange={handleInputChange}
                    />
                    <input
                        name='listProduct'
                        type='text'
                        placeholder='List of Products'
                        value={formData.listProduct}
                        onChange={handleInputChange}
                    />
                    <input
                        name='avatar'
                        type='text'
                        placeholder='URL'
                        value={formData.avatar}
                        onChange={handleInputChange}
                    />
                    <button type='submit'>Create</button>
                </form>
            )}
            {posts?.map((post: Recipe) => (
                <div key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <p>{post.timeCook}</p>
                    <p>{post.listProduct}</p>
                    <button onClick={() => dispatch(removePost(post.id))}>Delete</button>
                    <button onClick={() => handleUpdateClick(post)}>Update</button>
                </div>
            ))}
            {isUpdateClick && (
                <form onSubmit={handleUpdatePost}>
                    <textarea
                        name='title'
                        placeholder='Title'
                        value={formData.title}
                        onChange={handleInputChange}
                        rows={3}
                    />
                    <input
                        name='description'
                        type='text'
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        name='timeCook'
                        type='text'
                        placeholder='Time to Cook'
                        value={formData.timeCook}
                        onChange={handleInputChange}
                    />
                    <input
                        name='listProduct'
                        type='text'
                        placeholder='List of Products'
                        value={formData.listProduct}
                        onChange={handleInputChange}
                    />
                    <input
                        name='avatar'
                        type='text'
                        placeholder='URL'
                        value={formData.avatar}
                        onChange={handleInputChange}
                    />
                    <button type='submit'>Update</button>
                </form>
            )}
        </div>
    );
};

export default Wall;

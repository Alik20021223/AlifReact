import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { recipeFail, recipeSuccess } from '../../store/actions';
import { Recipe } from '../../store/reducers/post';

const Wall = () => {
    const posts = useSelector((state: { posts: Recipe[] }) => state?.posts)
    const dispatch = useDispatch()
    const url = 'https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/recept'

    console.log(posts);

    useEffect(() => {
        fetch(url).then((res) => {
            if (!res.ok) {
                throw new Error('bad http request')
            }

            return res.json()
        }).then((body) => {
            dispatch(recipeSuccess(body))
        }).catch(error => {
            dispatch(recipeFail(error))
          })
    }, [dispatch])
    return (
        <div>
            {posts?.map((post: Recipe) => (
                <div key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <p>{post.timeCook}</p>
                    <p>{post.listProduct}</p>
                </div>
            ))}
        </div>
    )
}

export default Wall
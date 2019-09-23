import * as React from 'react';
import { useState, useEffect }  from 'react';
import { getPosts } from '../../api/endpoints/posts/posts'
import { useSelector } from 'react-redux'
import {getProductsError, getProducts, getProductsPending} from '../../redux/reducers/postReducer';
import { addNewPost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import  fetchPosts  from '../../redux/async/fetchPosts'
import { useDispatch } from 'react-redux'
import * as io from 'socket.io-client'
import { MAIN_API_URL } from '../../api/axios-instances'

export interface HelloProps { 
    fetchPosts: () => Promise<void> 
}

const socket = io(MAIN_API_URL)
const POST = 'post'

const PostListComponent = ({ fetchPosts }: HelloProps) => {
    const products = useSelector(getProducts)
    const pending = useSelector(getProductsPending)
    const dispatch = useDispatch()

    console.log(products)
    useEffect(() => {
        fetchPosts()
        socket.on(POST, data => {
            dispatch(addNewPost(data.post))
        })
    }, [])

    return (
        pending 
        ? <span>Loading...</span> 
        : (
            <div>
                {products.map((product, index) => {
                    return <div key={index}>{product.addedAt}</div>
                })}
            </div>
        )
    )
};

const mapDispatch = {
    fetchPosts,
};

export default connect(null, mapDispatch)(PostListComponent)
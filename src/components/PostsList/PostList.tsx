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
import { addPosts } from '../../api/endpoints/posts/posts'

export interface HelloProps { 
    fetchPosts: () => Promise<void> 
}

const socket = io(MAIN_API_URL)
const POST = 'post'

const PostListComponent = ({ fetchPosts }: HelloProps) => {
    const products = useSelector(getProducts)
    const pending = useSelector(getProductsPending)
    const dispatch = useDispatch()
    const [text, setText] = React.useState("")
    console.log(products)
    useEffect(() => {
        fetchPosts()
        socket.on(POST, data => {
            console.log(data)
            dispatch(addNewPost(data.post))
        })
    }, [])

    const handleChange = (event) => {
        const value = event.target.value

        setText(value)
    }

    const handleClick = async () => {
        await addPosts({
            post: text,
            userName: 'elo'
        })
    }

    return (
        <div>
            <input type="text" onChange={handleChange}/>
            <button onClick={handleClick}>KLIKNIJ</button>
            {
                pending 
                ? <span>Loading...</span> 
                : (
                    <div>
                        {products.map((product, index) => {
                            return <div key={index}>{product.postContent}</div>
                        })}
                    </div>
                )
            }
        </div>
    )
};

const mapDispatch = {
    fetchPosts,
};

export default connect(null, mapDispatch)(PostListComponent)
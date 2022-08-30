import AppLayout from '@/components/Layouts/AppLayout'
import Button from '@/components/Button'
import Link from 'next/link'
import Head from 'next/head'
import axios from "axios";
import { useEffect, useState } from "react";

function PostsList() {
    const [posts, setPosts] = useState('');

    const csrf = () => axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')

    const deletePost = async (id) => {
        await csrf()

        //To make this work I had to remove authorization and csrf token
        axios.delete("http://127.0.0.1:8000/api/posts/"+id)
            .then((response) => {
                console.log(response.data)
                fetchPosts();
            }).catch((error) => {
                console.error(error);
            })
    }
    // const showPost = async (id) => {
    //     // await csrf()

    //     axios
    //         .get("http://localhost:8000/api/posts/"+id)
    //         .then((response) => {
    //             console.log(response.data.body);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    const fetchPosts = async () => {
        axios
        .get("http://127.0.0.1:8000/api/posts")
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <AppLayout
            header={
                <div className='flex'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Posts
                    </h2>
                    <Link href="/posts/create">
                        <a className="px-3 py-1 text-blue-100 no-underline bg-green-500 rounded hover:bg-blue-600 hover:text-blue-200 ml-3">
                            CREATE
                        </a>
                    </Link>
                </div>
            }>

            <Head>
                <title>Posts</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {
                                posts.length > 0 && posts.map((post) =>
                                    <div key={ post.id } className="pb-8">
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                            <span className="bg-gray-400 rounded-full p-1 ">{post.id}</span>
                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6 bg-white border-b border-gray-200  bg-blue-100">
                                                    <h1 className="uppercase bg-gray-300 rounded"><strong>{post.title}</strong></h1>
                                                    <p>{post.body}</p>
                                                    <Link href={`/posts/${post.id}`}>
                                                        <a className="px-3 py-1 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:text-blue-200 ml-1">SHOW</a>
                                                    </Link>

                                                    <Link href={`/posts/${post.id}/edit`}>
                                                        <a className="px-3 py-1 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:text-blue-200 ml-1">Edit</a>
                                                    </Link>

                                                    <Button onClick={()=>deletePost(post.id)} className="bg-red-500 text-sm text-white-600 hover:text-gray-900 px-2 py-1 ml-3">Delete</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default PostsList;

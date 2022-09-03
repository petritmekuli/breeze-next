import AppLayout from '@/components/Layouts/AppLayout'
import Button from '@/components/Button'
import Link from 'next/link'
import Head from 'next/head'
import axios from "axios";
import { useEffect, useState } from "react";
import { usePost } from '@/hooks/post';

function PostsList() {
    const [posts, setPosts] = useState('');
    const [user, setUser] = useState({ id: 1 });

    const { destroy } = usePost();
    const { fetchPosts } = usePost();
    // const { fetchUser } = usePost();

    useEffect(() => {
        fetchPosts({ setPosts })
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
                                                        {post.user_id == user.id ?
                                                        <>
                                                        <Link href={`/posts/${post.id}/edit`}>
                                                            <a className="px-3 py-1 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:text-blue-200 ml-1">Edit</a>
                                                        </Link>
                                                            <Button onClick={() => destroy({post, setPosts})} className="bg-red-500 text-sm text-white-600 hover:text-gray-900 px-2 py-1 ml-3">Delete</Button>
                                                        </>
                                                    :
                                                        ""
                                                    }
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

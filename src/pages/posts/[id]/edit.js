import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { usePost } from '@/hooks/post'
import axios from "axios";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function EditPost() {
    const { update } = usePost()

    // const [post, setPost] = useState('');
    // const [id, setId] = useState();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({ 'title': '', 'body': '' });

    const router = useRouter();
    const id = router.query.id

    const submitForm = event => {
        event.preventDefault()

        // updatePost()
        update({ id, title, body, setErrors })
    }

    const fetchPost = async () => {
        axios
        .get("http://127.0.0.1:8000/api/posts/"+id)
        .then((response) => {
            setTitle(response.data.title);
            setBody(response.data.body);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    // const updatePost = async () => {
    //     axios
    //     .patch("http://127.0.0.1:8000/api/posts/" + id, { 'title':title, 'body':body })
    //     .then(() => mutate())
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }
    useEffect(() => {
        fetchPost()
    }, [])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post
                </h2>
            }>

            <Head>
                <title>Posts</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submitForm}>
                                {/* Title */}
                                <div>
                                    <Label htmlFor="title">Title</Label>

                                    <Input
                                        id="title"
                                        type="text"
                                        value={title}
                                        className="block mt-1 w-full"
                                        onChange={event => setTitle(event.target.value)}
                                        required
                                        autoFocus
                                    />

                                    <InputError messages={errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="body">Body</Label>

                                    <Input
                                        id="body"
                                        type="text"
                                        value={body}
                                        className="block mt-1 w-full"
                                        onChange={event => setBody(event.target.value)}
                                        required
                                        autoFocus
                                    />

                                    <InputError messages={errors.body} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4">Update Post</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default EditPost;

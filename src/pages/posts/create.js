import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { usePost } from '@/hooks/post'
import { useState } from 'react'

function CreatePost() {
    const { create } = usePost();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        create({ title, body, setErrors })
    }

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
                                    <Button className="ml-4">Create Post</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default CreatePost;

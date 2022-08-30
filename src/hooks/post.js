import axios from '@/lib/axios'
import { redirect } from 'next/dist/server/api-utils'

export const usePost = () => {

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const create = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/api/posts/store', props)
            .then((response) => {
                console.log(response.data)
                window.location = "http://localhost:3000/posts";
            })
            .catch((error) => {
                if (error.response.status !== 422)throw error
                setErrors(error.response.data.errors)
            })
    }
    const update = async ({ id, setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .patch('http://127.0.0.1:8000/api/posts/'+id, props)

            .then((response) => {
                console.log(response.data)
                window.location = "http://localhost:3000/posts/"+id;
            })
            .catch((error) => {
                if (error.response.status !== 422)throw error

                setErrors(error.response.data.errors)
            })
    }
    const show = async ({ setTitle, setBody, id }) => {
        if(!id) id=1
        axios
            .get(`http://localhost:8000/api/posts/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setBody(response.data.body);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return {
        create,
        update,
        show
    }
}

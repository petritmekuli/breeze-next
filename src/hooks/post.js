import axios from '@/lib/axios'
import { redirect } from 'next/dist/server/api-utils'

export const usePost = () => {

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const create = async ({ setErrors, ...props }) => {
        // await csrf()
        await axios.get('/sanctum/csrf-cookie')

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
        await csrf() //writing it manually is working somehow.

        setErrors([])

        axios
        .patch('http://127.0.0.1:8000/api/posts/'+id, props)
        .then((response) => {
            console.log(response.data)
            // fetchPosts({setPosts})
            window.location = "http://localhost:3000/posts";
            // window.location = "http://localhost:3000/posts/"+id;
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 403) {
                console.log("Unauthorized action.")
                return "Unauthorized action."
            }
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
    const fetchUser = async ({ setUser }) => {
        axios
        .get("http://127.0.0.1:8000/api/user")
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    const destroy = async ({ post, setPosts }) => {
        await csrf()

        //To make this work I had to remove authorization and csrf token
        axios.delete("http://127.0.0.1:8000/api/posts/"+post.id)
        .then((response) => {
            console.log(response.data)
            // window.location = "http://localhost:3000/posts";
            fetchPosts({setPosts});
        }).catch((error) => {
            console.error(error);
        })
    }

    const fetchPost = async ({setTitle, setBody, id}) => {
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

    const fetchPosts = async ({ setPosts }) => {
        axios
        .get("http://127.0.0.1:8000/api/posts")
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return {
        create,
        update,
        show,
        destroy,
        fetchPost,
        fetchPosts,
        // fetchUser
    }
}

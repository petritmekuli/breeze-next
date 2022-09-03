import PostLink from "./PostLink"
import Link from 'next/link'
import Button from '@/components/Button'


const Post = ({ post = null }) => (
    <div class="pb-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <span class="bg-gray-400 rounded-full p-1 ">{post.id}</span>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200  bg-blue-100">
                    <h1 class="uppercase bg-gray-300 rounded"><strong>{post.title}</strong></h1>
                    <p>{post.body}</p>
                    <PostLink href="/posts/show" color="blue" id={post.id}>
                        SHOW
                    </PostLink>
                    {/* <Link href="/show" id={post.id}> */}
                    {/* <Link href="/show">
                        <a className="underline text-sm text-gray-600 hover:text-gray-900">
                            SHOW 2
                        </a>
                    </Link> */}
                    <Button onClick={()=>edit(post.id)} className="underline text-sm text-gray-600 hover:text-gray-900">Register</Button>

                </div>
            </div>
        </div>
    </div>
)

export default Post

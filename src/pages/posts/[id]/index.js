import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

export const getStaticPaths = async () => {
  const res = await fetch('http://127.0.0.1:8000/api/posts');
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.map(post => {
    return {
      params: { id: post.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('http://127.0.0.1:8000/api/posts/' + id);
  const data = await res.json();

  return {
    props: { post: data }
  }
}

const ShowPost = ({ post }) => {
    return (
        <AppLayout
            header={
                <div className='flex'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Post Details
                    </h2>
                </div>
            }>

            <Head>
                <title>Posts</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {post.title}
                            <hr/>
                            {post.body}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default ShowPost;

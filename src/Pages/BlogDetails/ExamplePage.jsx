import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ExamplePage.module.css';
import Recent from '../Home/Recent/Recent';
import { useFetchBlogs } from '../../Js/useFetchBlogs';
import LoadingScreen from '../../Js/LoadingScreen/LoadingScreen'; 

const ExamplePage = () => {
  const { id } = useParams();
  const { blogs, loading, error, apiUrl } = useFetchBlogs(); 

  const blog = blogs.find((post) => post.id.toString() === id);

  const getImageUrl = (imagePath) => {
    return imagePath ? `${apiUrl}${imagePath}` : '/media/blog_images/default.png'; 
  };

  if (loading || !blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingScreen /> 
      </div>
    );
  }

  if (error) {
    return <div>Error loading blog</div>;
  }

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div>
      <div className={`${styles.Post}`}>
        <div className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8 mb-20">
          <div className="flex mt-4 select-none">
            <p className="font-bold cursor-pointer">{blog.category || 'Uncategorized'}</p>
            <p className='smallParagraphText ml-4 text-text-grey select-none'>{blog.created_at}</p>
          </div>
          <h3 className={`mt-10 mb-16 select-none ${styles.post_title}`}>{blog.title}</h3>
          <img src={getImageUrl(blog.image)} alt={blog.title} className='scale-110 w-[100%] rounded-[10px]' />
          <div className="mt-28 text-text-grey">
            <h6 dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
      <Recent />
    </div>
  );
}

export default ExamplePage;

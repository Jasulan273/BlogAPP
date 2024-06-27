import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Blog.module.css';
import { useFetchBlogs } from '../../Js/useFetchBlogs';

export default function Blog() {
  const { blogs, loading, error } = useFetchBlogs();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <div className={styles.Blog}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex justify-between items-center flex-wrap mb-16'>
          <h3 className='mt-16 mx-auto font-bold md:text-lg'>Our Posts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className={styles.card}>
              <img src={`https://web-production-62359.up.railway.app${blog.image}`} className='w-[100%] h-[50%] rounded-[18px]' alt={blog.title} />
              <div className={`flex w-100 mt-8 ${styles.card_info}`}>
                <h6 className='font-bold'>{blog.category}</h6>
                <h6 className='text-text-grey ml-4'>{blog.created_at}</h6>
              </div>
              <div className='card_desc'>
                <h6 className={`font-bold w-[100%] mt-2 ${styles.card_title}`}>{blog.title}</h6>
                <p className='text-text-grey mt-2'>{blog.short_description}</p>
                <button onClick={() => navigate(`/blog/${blog.id}`)} className="text-background underline w-[35%] h-[10%] text-left mt-8 hover:text-purple-900">
                  Read More...
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
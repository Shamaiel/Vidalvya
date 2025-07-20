import React from 'react';
// import { coursesData } from '../utils/constants';
import CourseCard from '../components/CourseCard';

const coursesData = [
  {
    title: 'Advanced Web Development',
    description: 'Master modern web technologies including React, Node.js, and cloud deployment',
    price: '$199',
    duration: '12 weeks',
    students: '2,847',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Data Science Fundamentals',
    description: 'Learn Python, machine learning, and data visualization from industry experts',
    price: '$299',
    duration: '16 weeks',
    students: '1,923',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to SEO, social media marketing, and conversion optimization',
    price: '$149',
    duration: '8 weeks',
    students: '3,156',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/7414032/pexels-photo-7414032.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const Courses = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Full Course Catalog</h1>
          <p className="text-xl text-gray-600">Explore a wide range of topics to boost your career.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
          {/* Add more courses here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Courses;
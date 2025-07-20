import { Globe, Shield, Zap, Award } from 'lucide-react';

export const coursesData = [
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

export const testimonialsData = [
  {
    name: 'Sarah Chen',
    role: 'Software Developer',
    content:
      'This platform transformed my career. The instructors are world-class and the content is always up-to-date with industry trends.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Marcus Johnson',
    role: 'Data Analyst',
    content: 'I landed my dream job within 3 months of completing the Data Science course. The hands-on projects were invaluable.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Marketing Director',
    content: 'The digital marketing course gave me practical skills I use every day. ROI on this investment was incredible.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export const featuresData = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Learn Anywhere',
    description: 'Access courses from any device, anywhere in the world with our responsive platform',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Industry Experts',
    description: 'Learn from professionals working at top companies like Google, Meta, and Netflix',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Hands-on Projects',
    description: 'Build real-world projects that you can add to your portfolio and show to employers',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Certified Learning',
    description: 'Earn industry-recognized certificates that boost your credibility and career prospects',
  },
];
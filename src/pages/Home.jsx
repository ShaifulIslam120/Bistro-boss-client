import React from 'react';
import Banner from './Banner';
import SectionTitle from './reusable/SectionTitle';
import CatagoriesSwiper from './CatagoriesSwiper';
import Banner2 from './Banner2';
import Popularsection from './Popularsection';
import FeaturedSection from './FeaturedSection';
import Testiomonial from './Testiomonial';
import img from '../assets/home/chef-service.jpg'
import CoverSection from './reusable/CoverSection';

const Home = () => {
    return (
        <div className=''>
            
            <Banner></Banner>
            <div className='max-w-screen-xl mx-auto'>
            <SectionTitle
        topText="From 11:00am to 10:00pm" 
        mainText="ORDER ONLINE" 
      />
            <CatagoriesSwiper></CatagoriesSwiper>
            <CoverSection
     backgroundImage={img}
     title="BISTRO BOSS"
     description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."
   />            <Popularsection></Popularsection>
            <FeaturedSection></FeaturedSection>
            <Testiomonial></Testiomonial>
            </div>

        </div>
    );
};

export default Home;
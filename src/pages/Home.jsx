import React from 'react';
import Banner from './Banner';
import SectionTitle from './reusable/SectionTitle';
import CatagoriesSwiper from './CatagoriesSwiper';
import Banner2 from './Banner2';
import Popularsection from './Popularsection';
import FeaturedSection from './FeaturedSection';
import Testiomonial from './Testiomonial';

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
            <Banner2></Banner2>
            <Popularsection></Popularsection>
            <FeaturedSection></FeaturedSection>
            <Testiomonial></Testiomonial>
            </div>

        </div>
    );
};

export default Home;
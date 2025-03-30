import React from 'react';
import img1 from '../assets/home/featured.jpg'
const FeaturedSection = () => {
    return (
        <div>
         <section className="py-16 relative bg-cover bg-center bg-no-repeat " 
      style={{ backgroundImage: `url(${img1})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-center mb-8">
          <span className="text-yellow-400 text-lg">---Check it out---</span>
          <h2 className="text-3xl font-bold mt-2 text-white">FROM OUR MENU</h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src={img1} 
              alt="Appetizer plate with garnish" 
              className="rounded-lg w-full h-auto shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <span className="text-gray-300">March 20, 2023</span>
            <h3 className="text-2xl font-semibold text-white">WHERE CAN I GET SOME?</h3>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas
              quasi. Eaque repellat recusandae ad laudantium tempore
              consequatur consequuntur omnis ullam maxime tenetur.
            </p>
            <button className="border-2 border-white text-white px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default FeaturedSection;

import chefService from '../assets/home/chef-service.jpg';

const Banner2 = () => {
  return (
    <div className='mt-5'>
        <div 
      className="relative h-[400px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${chefService})` }}
    >
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-8 md:p-12 max-w-2xl mx-4 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">BISTRO BOSS</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum
              deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto
              ducimus incidunt quibusdam nemo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
import React from 'react';
import contactimg from '../../assets/contact/banner.jpg'
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../reusable/SectionTitle';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
const ContactUs = () => {
    return (
        <div>
            
                        <Helmet>
                            <title>Bistro Boss | Contact</title>
                        </Helmet>
                         <div className="relative h-[200px] sm:h-[300px] md:h-[400px] bg-cover bg-center bg-fixed" style={{
                                        backgroundImage: `url(${contactimg})`
                                    }}>
                                        <div 
                                            className="absolute inset-0 sm:inset-10 md:inset-20 flex flex-col items-center justify-center text-white"
                                            style={{
                                                background: 'linear-gradient(rgba(21, 21, 21, 0.7), rgba(21, 21, 21, 0.7))'
                                            }}
                                        >
                                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2 sm:mb-4">CONTACT US</h1>
                                            <p className="text-sm sm:text-lg md:text-xl tracking-wider px-4 text-center">
                                                WOULD YOU LIKE TO TRY A DISH?
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                    <SectionTitle
                                     topText="Visit Us" 
                                      mainText="OUR LOCATION" 
                                     />
                                    </div>
                                    <ContactInfo></ContactInfo>
                                    <div>
                                    <SectionTitle
                                     topText="Send Us a Message" 
                                      mainText="CONTACT FORM" 
                                     />
                                     <ContactForm></ContactForm>
                                    </div>
        </div>

    );
};

export default ContactUs;
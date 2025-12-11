import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about_img}
          alt=""
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          
         <p>
  <b>Forever</b> was born out of a passion for <i>innovation</i> and a desire to
  revolutionize the way people interact with fashion. What began as a simple
  vision has evolved into a movement dedicated to offering <b>unique</b>,
  <i>trend-forward</i> pieces that empower individuals to express their identity
  with confidence and authenticity.
</p>

<p>
  Since our inception, we've worked tirelessly to curate a <b>diverse selection</b>
  of styles that cater to all tastes and preferences. From <i>timeless classics</i>
  to <b>bold contemporary designs</b>, our collection is crafted to ensure that
  everyone discovers something that truly resonates with their personal style and
  celebrates their individuality.
</p>

          <b className='text-gray-800'>Our Mission</b>

         <p>
  Our mission is to forever inspire confidence and self-expression through
  thoughtfully crafted fashion that adapts to every individual.
</p>


        </div>
      </div>


      <div className='text-xl py-4 '> 
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
    
    <div className='flex flex-col md:flex-row text-sm mb-20'>

  <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Quality Assurance:</b>
    <p className='text-gray-600'>
      We meticulously select and vet each product to ensure that only top-quality
      items make it to our collection.
    </p>
  </div>

  <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Convenience:</b>
    <p className='text-gray-600'>
      With our user-friendly interface and hassle-free online experience, shopping
      becomes smoother and more enjoyable.
    </p>
  </div>

  <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Exceptional Customer Service:</b>
    <p className='text-gray-600'>
      Our team of dedicated professionals is here to assist you at every step. We
      pride ourselves on delivering quick.
    </p>
  </div>

</div>
<NewsLetterBox />

    </div>
  );
};


export default About

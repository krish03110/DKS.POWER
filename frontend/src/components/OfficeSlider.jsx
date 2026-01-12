import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import img1 from '../officepicture/1.jpg';
import img2 from '../officepicture/2.jpg';
import img3 from '../officepicture/3.jpg';
import img4 from '../officepicture/4.jpg';
import img5 from '../officepicture/5.jpeg';

const OfficeSlider = () => {
  const slides = [
    {
      id: 1,
      image: img1,
      title: "Our Modern Workspace",
      subtitle: "Designed for innovation and collaboration."
    },
    {
      id: 2,
      image: img2,
      title: "Our Expert Team",
      subtitle: "Dedicated professionals powering your solar needs."
    },
    {
      id: 3,
      image: img3,
      title: "Operations Center",
      subtitle: "Monitoring solar efficiency across Madhya Pradesh."
    },
    {
      id: 4,
      image: img4,
      title: "Client Meeting Area",
      subtitle: "Planning sustainable futures for our clients."
    },
    {
      id: 5,
      image: img5,
      title: "On-Site Execution",
      subtitle: "Quality installation by our skilled workforce."
    },

  ];

  return (
    <section className="slider-container">
      <div className="container">
        <h2 className="section-title">Life at Our Office</h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect={'fade'} // Smooth fade transition
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="office-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="slide-content">
                <img src={slide.image} alt={slide.title} className="slide-image" />
                <div className="slide-overlay">
                  <h3>{slide.title}</h3>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OfficeSlider;
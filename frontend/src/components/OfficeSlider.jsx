import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import axios from 'axios';

// Fallback images in case API is not available

const OfficeSlider = () => {
  const fallbackSlides = [

  ];

  const [slides, setSlides] = useState(fallbackSlides);

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const fetchSliderImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/slider-images');
      if (res.data && res.data.length > 0) {
        const uploadedSlides = res.data.map((image) => ({
          id: image._id,
          image: image.imageUrl,
          title: image.title,
          subtitle: image.subtitle,
          isDefault: false,
        }));
        // Combine old images with new uploaded images
        setSlides([...fallbackSlides, ...uploadedSlides]);
      } else {
        // If no uploaded images, just use fallback
        setSlides(fallbackSlides);
      }
    } catch (err) {
      console.error('Failed to fetch slider images, using fallback images', err);
      // Keep fallback images if API fails
      setSlides(fallbackSlides);
    }
  };

  return (
    <section className="slider-container">
      <div className="container">
        <h2 className="section-title">Life at Our Office</h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect={'fade'}
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
                  {slide.subtitle && <p>{slide.subtitle}</p>}
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
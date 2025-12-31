import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      quote: "Novashine transformed my home! Their attention to detail and eco-friendly cleaning solutions exceeded my expectations. My house has never felt more fresh and inviting.",
      rating: 5,
      service: "Home Deep Cleaning"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Office Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      quote: "Professional, reliable, and thorough. Our office space has never looked better. The team's consistency and attention to detail make them our go-to cleaning service.",
      rating: 5,
      service: "Commercial Cleaning"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Restaurant Owner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote: "Novashine's green cleaning approach aligns perfectly with our values. They keep our restaurant spotless while being environmentally conscious.",
      rating: 5,
      service: "Restaurant Cleaning"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      quote: "Managing multiple properties requires reliable partners. Novashine delivers consistent quality across all our locations. Highly recommended!",
      rating: 5,
      service: "Property Maintenance"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <FaStar key={index} className="text-yellow-400 animate-pulse hover:scale-110 transition-all duration-300" />
    ));
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-xl text-gray-600 font-light">
            Real experiences from satisfied customers
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 md:px-4 py-4 md:py-8"
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-lg md:hover:shadow-xl border border-white/20">
                    <div className="flex items-center justify-center mb-4 md:mb-8 relative">
                      <div className="absolute w-16 md:w-24 h-16 md:h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow opacity-20"></div>
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 md:w-24 h-16 md:h-24 rounded-full object-cover ring-2 md:ring-4 ring-white"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
                          }}
                        />
                        <div className="absolute -top-2 md:-top-3 -left-2 md:-left-3 text-blue-600 bg-white rounded-full p-1 md:p-2 shadow-lg">
                          <FaQuoteLeft className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-center mb-4 md:mb-8 px-2 md:px-0">
                      <p className="text-gray-700 text-base md:text-xl font-light leading-relaxed italic mb-3 md:mb-6">
                        {testimonial.quote}
                      </p>
                      <div className="flex justify-center mb-2 md:mb-4 space-x-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </blockquote>

                    <div className="text-center space-y-1 md:space-y-2">
                      <p className="font-bold text-lg md:text-xl text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm md:text-base font-medium">{testimonial.role}</p>
                      <div className="inline-block px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-xs md:text-sm font-medium">
                        {testimonial.service}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrevious}
            className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 md:p-4 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 group z-10"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-blue-500 w-4 h-4 md:w-6 md:h-6 group-hover:scale-125 transition-transform duration-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 md:p-4 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 group z-10"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-blue-500 w-4 h-4 md:w-6 md:h-6 group-hover:scale-125 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex justify-center mt-6 md:mt-12 space-x-2 md:space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoPlay(false);
              }}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                currentIndex === index
                ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

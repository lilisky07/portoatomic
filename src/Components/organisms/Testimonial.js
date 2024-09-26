import React from 'react';
import '../Styles/TestimonialCss.css'; // Import the CSS file
import TestimonialCard from '../molecules/Testimonial'; // Import the TestimonialCard molecule

const testimonials = [
  {
    id: 1,
    text: "Layanan luar biasa dan sangat profesional. Selalu memuaskan!",
    name: "Budi Santoso",
    rating: 5,
    image: "/ClientImage.png"
  },
  {
    id: 2,
    text: "Pengalaman yang sangat positif",
    name: "Siti Aisyah",
    rating: 5,
    image: "/ClientImage.png"
  },
  {
    id: 3,
    text: "Kualitas kerja sangat baik dan tepat waktu.",
    name: "Ahmad Rizal",
    rating: 5,
    image: "/ClientImage.png"
  },
  {
    id: 4,
    text: "Sangat memuaskan! Pelayanan sangat cepat dan ramah.",
    name: "Lia Sari",
    rating: 5,
    image: "/ClientImage.png"
  },
  {
    id: 5,
    text: "Hasil kerja melebihi ekspektasi. Terima kasih!",
    name: "Joko Widodo",
    rating: 5,
    image: "/ClientImage.png"
  },
  {
    id: 6,
    text: "Prosesnya sangat mudah dan hasilnya fantastis.",
    name: "Maya Fitri",
    rating: 5,
    image: "/ClientImage.png"
  }
];

const Testimonial = () => {
  return (
    <div className="testimonial-section">
         <h2 className="latest-work-title">Testimonial</h2>
      {testimonials.map((testimonial) => (
        <TestimonialCard 
          key={testimonial.id}
          text={testimonial.text}
          name={testimonial.name}
          rating={testimonial.rating}
          image={testimonial.image}
        />
      ))}
    </div>
  );
};

export default Testimonial;

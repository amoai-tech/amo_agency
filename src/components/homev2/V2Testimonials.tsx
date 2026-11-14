export default function V2Testimonials() {
  const testimonials = [
    {
      quote: "AMO AI didn't just build a system—they transformed how we operate. The results exceeded every expectation.",
      author: 'Sarah Chen',
      role: 'Head of Operations',
      company: 'TechCorp',
      image: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      quote: "Their strategic approach and technical excellence delivered measurable ROI faster than we thought possible.",
      author: 'Michael Rodriguez',
      role: 'VP of Innovation',
      company: 'FinanceHub',
      image: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      quote: "Working with AMO AI felt like gaining an extension of our team. Their dedication to our success is unmatched.",
      author: 'Emily Watson',
      role: 'Chief Strategy Officer',
      company: 'HealthFirst',
      image: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
  ];

  return (
    <section className="bg-[#FAF8F6] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-block px-3.5 py-1.5 border mb-5" style={{ backgroundColor: 'rgba(0,135,90,0.08)', borderColor: 'rgba(0,135,90,0.15)', borderRadius: '4px' }}>
            <span className="text-xs tracking-widest uppercase" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
              Client Stories
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl leading-[1.05]" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
            Trusted by industry leaders
          </h2>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group"
            >
              {/* Profile Image */}
              <div className="aspect-[3/4] mb-6 overflow-hidden relative">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay with Company */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-xs tracking-widest uppercase" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
                    {testimonial.company}
                  </div>
                </div>
              </div>
              
              {/* Quote */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: '#1A1A1A' }}>
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="space-y-1">
                  <div className="text-lg" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
                    {testimonial.author}
                  </div>
                  <div className="text-sm" style={{ color: '#6B6B63' }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
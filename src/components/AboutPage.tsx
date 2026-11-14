export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl tracking-tight mb-6">About</h1>
        <div className="space-y-6 text-lg text-gray-600">
          <p>
            AMO AI is a premium AI services company focused on building
            real systems for real businesses.
          </p>
          <p>
            We don't believe in AI hype. We believe in practical solutions that
            solve actual problems and deliver measurable results.
          </p>
          <p>
            Our team combines technical expertise with business understanding to
            create AI systems that integrate seamlessly into your operations.
          </p>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl tracking-tight mb-8">Our Approach</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl mb-2">Business First</h3>
              <p className="text-gray-600">
                We start with your business goals, not the technology
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2">Real Solutions</h3>
              <p className="text-gray-600">
                Practical systems that work in the real world
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2">Long-term Partnership</h3>
              <p className="text-gray-600">
                We're here to support you beyond the launch
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Clock, Zap, TrendingUp, CheckCircle, Users } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: Clock,
      title: 'Hours Saved Weekly',
      description: 'Eliminate repetitive work and focus on strategic tasks',
      impact: '15-30 hours per team member',
    },
    {
      icon: Zap,
      title: 'Faster Response Times',
      description: 'Instant replies to leads and customer inquiries',
      impact: 'From hours to seconds',
    },
    {
      icon: TrendingUp,
      title: 'More Qualified Leads',
      description: 'Intelligent scoring and prioritization of opportunities',
      impact: '2-3x conversion rate',
    },
    {
      icon: CheckCircle,
      title: 'Predictable Execution',
      description: 'Tasks completed consistently without human variability',
      impact: '100% process adherence',
    },
    {
      icon: Users,
      title: 'Scale Without Hiring',
      description: 'Expand capacity through AI, not headcount',
      impact: '5-10x operational leverage',
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-gray-900 mb-6">
            What This Unlocks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable improvements in efficiency, revenue, and scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="border border-gray-200 p-8 hover:border-[#F59E0B] transition-colors duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-gray-200 mb-6">
                <outcome.icon className="w-6 h-6 text-[#F59E0B]" />
              </div>

              <h3 className="font-serif text-2xl text-gray-900 mb-3">
                {outcome.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {outcome.description}
              </p>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-[#F59E0B]">
                  {outcome.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-center bg-[#FDFCFB] border border-gray-200 p-8">
          <p className="text-gray-600 leading-relaxed">
            Results vary by business and implementation. These are real outcomes achieved by AMO AI clients,
            not hypothetical projections. We focus on practical value, not hype.
          </p>
        </div>
      </div>
    </section>
  );
}

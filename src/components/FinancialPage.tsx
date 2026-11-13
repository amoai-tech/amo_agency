import {
  FinancialHero,
  FinancialServiceCards,
  FinancialRelatedServices,
  FinancialAIBanner,
  FinancialApproach,
  FinancialClientSuccess,
  FinancialSolutions,
  FinancialExpand,
  FinancialLeaders,
  FinancialInsights,
  FinancialExploreMore,
} from './financial';

export default function FinancialPage() {
  return (
    <div>
      {/* 1. Hero */}
      <FinancialHero />

      {/* 2. Financial Sector Services (6 image cards) */}
      <FinancialServiceCards />

      {/* 3. Related Services (pill links) */}
      <FinancialRelatedServices />

      {/* 4. AI Transformation Banner */}
      <FinancialAIBanner />

      {/* 5. Our Approach to Reimagining Finance */}
      <FinancialApproach />

      {/* 6. Client Success (dark section with stats + images) */}
      <FinancialClientSuccess />

      {/* 7. Solutions for Financial Services */}
      <FinancialSolutions />

      {/* 8. AMO AI Expand CTA */}
      <FinancialExpand />

      {/* 9. Consulting Leaders */}
      <FinancialLeaders />

      {/* 10. Insights */}
      <FinancialInsights />

      {/* 11. Explore More */}
      <FinancialExploreMore />
    </div>
  );
}

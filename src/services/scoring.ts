export type Domain = 'O' | 'C' | 'E' | 'A' | 'N';

export interface ScoreResult {
  domains: Record<Domain, number>;
  facets: Record<string, number>;
  summary: Record<Domain, 'High' | 'Neutral' | 'Low'>;
}

export interface QuestionData {
  id: string;
  domain: string;
  facet: number;
  keyed: string;
}

export function calculateScores(answers: Record<string, number>, questions: QuestionData[]): ScoreResult {
  const domainTotals: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const domainCounts: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  
  const facetTotals: Record<string, number> = {};
  const facetCounts: Record<string, number> = {};

  for (const question of questions) {
    const rawValue = answers[question.id];
    if (rawValue === undefined) continue;

    // Apply keyed logic
    const score = question.keyed === 'plus' ? rawValue : 6 - rawValue;

    // Update Domain stats
    const d = question.domain;
    domainTotals[d] = (domainTotals[d] || 0) + score;
    domainCounts[d] = (domainCounts[d] || 0) + 1;

    // Update Facet stats
    const f = `${d}${question.facet}`;
    facetTotals[f] = (facetTotals[f] || 0) + score;
    facetCounts[f] = (facetCounts[f] || 0) + 1;
  }

  const domains: any = {};
  const summary: any = {};
  const facets: any = {};

  // Compute Domain averages and categories
  for (const d of ['O', 'C', 'E', 'A', 'N'] as Domain[]) {
    const avg = domainCounts[d] > 0 ? domainTotals[d] / domainCounts[d] : 0;
    domains[d] = Number(avg.toFixed(2));
    
    if (avg > 3.5) summary[d] = 'High';
    else if (avg < 2.5) summary[d] = 'Low';
    else summary[d] = 'Neutral';
  }

  // Compute Facet averages
  for (const f in facetTotals) {
    facets[f] = Number((facetTotals[f] / facetCounts[f]).toFixed(2));
  }

  return { domains, facets, summary };
}

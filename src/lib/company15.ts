export type CompanyDecision = { id: string; label: string; outcome: string; risk: string }
export type MarketSegment = {
  id: 'a' | 'b' | 'c'; name: string; examples: string; implications: string[]
  monthlyPrice: number; acquisitionCost: number; grossMargin: number; customers: [number, number, number]
  productEmphasis: string[]; positioning: string; headline: string; channels: string[]; primaryPain: string; profile: string
}
export type CompanyEmployee = { id: string; role: string; task: string; deliverable: string }
export type Company15Config = {
  title: string; tagline: string; company: string; product: string; concept: string; valueProposition: string
  employees: CompanyEmployee[]; segments: Record<MarketSegment['id'], MarketSegment>
  launchChoices: CompanyDecision[]; governanceChoices: CompanyDecision[]
  roadmap: { days: string; work: string }[]; risks: string[]
}

export const fifteenMinuteCompany: Company15Config = {
  title: 'THE 15-MINUTE COMPANY', tagline: 'FIVE AI EMPLOYEES. ONE HUMAN LEADER. THIRTY DAYS TO MARKET.',
  company: 'NOVA', product: 'NOVA ONE', concept: 'AN AI-POWERED OPERATIONS ASSISTANT FOR SMALL BUSINESSES',
  valueProposition: 'GIVE EVERY SMALL BUSINESS ITS OWN AI OPERATIONS TEAM.',
  employees: [
    { id: '001', role: 'CHIEF OF STAFF / ORCHESTRATOR', task: 'COORDINATE THE MISSION', deliverable: 'EXECUTIVE BRIEF' },
    { id: '014', role: 'FINANCE + STRATEGY', task: 'MODEL BUSINESS ECONOMICS', deliverable: 'BUSINESS CASE' },
    { id: '021', role: 'PRODUCT + EXPERIENCE', task: 'DESIGN THE MVP', deliverable: 'PRODUCT PROTOTYPE' },
    { id: '032', role: 'GROWTH + MARKETING', task: 'CREATE GO-TO-MARKET', deliverable: 'LAUNCH CAMPAIGN' },
    { id: '045', role: 'OPERATIONS + RISK', task: 'PLAN A CONTROLLED LAUNCH', deliverable: '30-DAY ROADMAP' },
  ],
  segments: {
    a: { id: 'a', name: 'INDEPENDENT SERVICE BUSINESSES', examples: 'SALONS · REPAIR SHOPS · LOCAL PROFESSIONALS', implications: ['FASTER FEEDBACK', 'LOWER CONTRACT VALUE', 'FRAGMENTED ACQUISITION'], monthlyPrice: 99, acquisitionCost: 240, grossMargin: .75, customers: [100, 500, 1500], productEmphasis: ['INQUIRY RESPONSE', 'APPOINTMENTS', 'FOLLOW-UPS'], positioning: 'A READY-TO-WORK AI OPERATIONS TEAM', headline: 'YOUR BUSINESS NEVER MISSES AN OPPORTUNITY.', channels: ['LOCAL PARTNERS', 'PAID SEARCH', 'REFERRAL'], primaryPain: 'MISSED INQUIRIES BECOME LOST REVENUE', profile: 'OWNER-OPERATED · 2–20 EMPLOYEES' },
    b: { id: 'b', name: 'SMALL PROFESSIONAL FIRMS', examples: 'CONSULTANTS · ACCOUNTANTS · AGENCIES', implications: ['HIGHER WILLINGNESS TO PAY', 'COMPLEX WORKFLOWS', 'MORE INTEGRATION'], monthlyPrice: 179, acquisitionCost: 520, grossMargin: .72, customers: [60, 300, 900], productEmphasis: ['CLIENT INTAKE', 'FOLLOW-UP WORKFLOWS', 'HUMAN APPROVAL'], positioning: 'THE AI CLIENT-OPERATIONS LAYER', headline: 'EVERY CLIENT MOMENT, FOLLOWED THROUGH.', channels: ['PROFESSIONAL NETWORKS', 'CONTENT', 'INTEGRATION PARTNERS'], primaryPain: 'CLIENT WORK IS LOST BETWEEN SYSTEMS AND PEOPLE', profile: 'KNOWLEDGE FIRM · 5–50 EMPLOYEES' },
    c: { id: 'c', name: 'ENTERPRISE DISTRIBUTION PARTNERS', examples: 'BANKS · TELECOMS · BUSINESS PLATFORMS', implications: ['LARGE DISTRIBUTION', 'LONGER SALES CYCLES', 'PARTNER DEPENDENCY'], monthlyPrice: 38, acquisitionCost: 45, grossMargin: .65, customers: [1000, 5000, 15000], productEmphasis: ['WHITE-LABEL SERVICE', 'PARTNER CONTROLS', 'PORTFOLIO INSIGHT'], positioning: 'AI OPERATIONS AS A PARTNER-DELIVERED SERVICE', headline: 'GIVE EVERY BUSINESS CUSTOMER AN OPERATIONS TEAM.', channels: ['STRATEGIC PARTNERS', 'EMBEDDED DISTRIBUTION', 'CO-SELL'], primaryPain: 'SMB CUSTOMERS NEED SUPPORT BEYOND CORE SERVICES', profile: 'PLATFORM WITH 10,000+ BUSINESS CUSTOMERS' },
  },
  launchChoices: [
    { id: 'a', label: 'APPROVE LAUNCH', outcome: 'MOVE TO CONTROLLED AUTHORIZATION', risk: 'Commits capital before every dependency is resolved.' },
    { id: 'b', label: 'REQUEST A PIVOT', outcome: 'REWORK STRATEGY BEFORE AUTHORIZATION', risk: 'Improves fit but consumes the 30-day window.' },
    { id: 'c', label: 'STOP THE PROJECT', outcome: 'PRESERVE CAPITAL · FORGO THE OPPORTUNITY', risk: 'Avoids execution risk while competitors continue moving.' },
  ],
  governanceChoices: [
    { id: 'a', label: 'CANCEL THE INITIATIVE', outcome: 'RISK REMOVED · OPPORTUNITY LOST', risk: 'A safe exit, but no learning or commercial option remains.' },
    { id: 'b', label: 'IGNORE + PROCEED', outcome: 'AUTHORIZATION WITHHELD', risk: 'Secondary data use lacks an established lawful basis, notices, or contractual permission.' },
    { id: 'c', label: 'REDESIGN WITH GOVERNANCE BUILT IN', outcome: 'CONTROLLED PATH FORWARD', risk: 'Higher cost and narrower initial scope, subject to legal and operational review.' },
  ],
  roadmap: [
    { days: 'DAY 01–07', work: 'MVP SCOPE · CUSTOMER VALIDATION · GOVERNANCE' }, { days: 'DAY 08–14', work: 'PROTOTYPE · INTEGRATIONS · PILOT PREPARATION' },
    { days: 'DAY 15–21', work: 'CONTROLLED PILOT · FEEDBACK · ITERATION' }, { days: 'DAY 22–30', work: 'READINESS · COMMERCIAL ACTIVATION · MONITORING' },
  ],
  risks: ['SECONDARY DATA USE', 'INTEGRATION READINESS', 'CUSTOMER TRUST', 'HUMAN ESCALATION', 'PRODUCTION RELIABILITY'],
}

export function calculateFinancials(segment: MarketSegment, customers: number) {
  const mrr = segment.monthlyPrice * customers
  const arr = mrr * 12
  const monthlyGrossProfit = mrr * segment.grossMargin
  const cacPaybackMonths = segment.acquisitionCost / (segment.monthlyPrice * segment.grossMargin)
  return { mrr, arr, monthlyGrossProfit, cacPaybackMonths }
}

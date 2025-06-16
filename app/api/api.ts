export interface Paginated<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  first: boolean;
  last: boolean;
}

export interface VisitorDto {
  id: number;
  sessionId: string;
  domain: string;
  visitCount: number;
  firstSeen: string;
  lastSeen: string;
  pageViews: PageViewDto[];
  company: CompanyInfoDto | null;
}

export interface DomainVisitDto {
  domain: string;
  visits: number;
}

export interface PageViewDto {
  id: number;
  timestamp: string;
  url: string;
  referrer: string | null;
}

export interface CompanyInfoDto {
  domain: string;
  name: string;
  industry: string;
  location: string;
  employeeCount: number;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://egain-insights-backend-1047983983694.us-west1.run.app";

export async function fetchVisitors(
  domain?: string,
  page = 0,
  size = 10
): Promise<Paginated<VisitorDto>> {
  const params = new URLSearchParams();
  if (domain) params.append("domain", domain);
  params.append("page", String(page));
  params.append("size", String(size));
  if (!domain) {
    return {
      content: [],
      number: 0,
      size: size,
      totalElements: 0,
      first: true,
      last: true,
    };
  }
  console.log(
    `Fetching visitors from: ${BASE_URL}/api/visitors?${params.toString()}`
  );
  const res = await fetch(`${BASE_URL}/api/visitors?${params.toString()}`);
  return res.json();
}

export async function fetchVisitorById(id: number): Promise<VisitorDto> {
  const res = await fetch(`${BASE_URL}/api/visitors/${id}`);
  return res.json();
}

export async function fetchFrequentVisitors(
  days: number
): Promise<DomainVisitDto[]> {
  const params = new URLSearchParams({ days: days.toString() });
  const res = await fetch(`${BASE_URL}/api/visitors/frequent?${params}`);
  if (!res.ok) throw new Error("Failed to load frequent visitors");
  return res.json();
}

export async function fetchCompanyByDomain(
  domain: string
): Promise<CompanyInfoDto> {
  const res = await fetch(
    `${BASE_URL}/api/companies/${encodeURIComponent(domain)}`
  );
  if (!res.ok) throw new Error();
  return res.json();
}

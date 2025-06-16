"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CompanyInsights from "../../components/CompanyInsights";
import VisitorTable from "../../components/VisitorTable";
import {
  fetchCompanyByDomain,
  fetchVisitors,
  CompanyInfoDto,
  Paginated,
  VisitorDto,
} from "../../api/api";

export default function CompanyPage() {
  const { domain } = useParams() as { domain?: string };
  const [company, setCompany] = useState<CompanyInfoDto | null>(null);
  const [visitors, setVisitors] = useState<Paginated<VisitorDto>>({
    content: [],
    number: 0,
    size: 10,
    totalElements: 0,
    first: true,
    last: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCompany = async (d: string) => {
    setLoading(true);
    setError(null);
    try {
      const ci = await fetchCompanyByDomain(d);
      setCompany(ci);
    } catch {
      setError("Could not load company info");
    } finally {
      setLoading(false);
    }
  };

  const loadVisitors = async (page: number, d: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchVisitors(d, page);
      setVisitors(result);
    } catch {
      setError("Could not load visitor sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!domain) return;
    loadCompany(domain);
    loadVisitors(0, domain);
  }, [domain]);

  if (!domain) {
    return <p className="p-4 text-center">No company selected.</p>;
  }
  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }
  if (loading && !company) {
    return <p className="p-4 text-center">Loading…</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company: {domain}</h1>
      {company && <CompanyInsights info={company} />}

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Visitor Sessions</h2>
        <VisitorTable
          visitors={visitors}
          onPageChange={(page) => loadVisitors(page, domain)}
        />
      </section>
    </div>
  );
}

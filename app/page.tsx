"use client";

import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import VisitorTable from "./components/VisitorTable";
import { fetchVisitors, VisitorDto, Paginated } from "./api/api";

export default function Home() {
  const [domain, setDomain] = useState<string>("");
  const [data, setData] = useState<Paginated<VisitorDto>>({
    content: [],
    number: 0,
    size: 10,
    totalElements: 0,
    first: true,
    last: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // page is zero-based
  const load = async (page: number, forDomain?: string) => {
    const d = forDomain !== undefined ? forDomain : domain;
    //    if (!d || d.trim.length == 0) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchVisitors(d, page);
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0, "");
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">eGain Visitor Insights</h1>

      <SearchForm
        onSearch={(d) => {
          const trimmed = d.trim();
          if (!trimmed) {
            alert("Please enter a domain to search");
            return;
          }
          setDomain(trimmed);
          load(0, trimmed);
        }}
      />

      {error && <p className="text-red-600 my-2">{error}</p>}
      {loading ? (
        <p className="my-4">Loading…</p>
      ) : (
        <VisitorTable visitors={data} onPageChange={(page) => load(page)} />
      )}
    </div>
  );
}

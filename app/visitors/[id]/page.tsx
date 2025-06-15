"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VisitorDetail from "../../components/VisitorDetail";
import { fetchVisitorById, VisitorDto } from "../../api/api";

export default function VisitorPage() {
  const { id } = useParams(); // get the dynamic segment
  const [visitor, setVisitor] = useState<VisitorDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const visitorId = Number(id);
    fetchVisitorById(visitorId)
      .then(setVisitor)
      .catch((err) => {
        console.error(err);
        setError("Failed to load visitor");
      });
  }, [id]);

  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }
  if (!visitor) {
    return <p className="p-4 text-center">Loading visitor details…</p>;
  }

  return <VisitorDetail visitor={visitor} />;
}

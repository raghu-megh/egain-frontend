import { FC } from "react";
import { VisitorDto } from "../api/api";
import CompanyInsights from "./CompanyInsights";

interface Props {
  visitor: VisitorDto;
}
const VisitorDetail: FC<Props> = ({ visitor }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-2">Session {visitor.sessionId}</h2>
    <p>
      <strong>Domain:</strong> {visitor.domain}
    </p>
    <p>
      <strong>Visits:</strong> {visitor.visitCount}
    </p>
    <h3 className="mt-4 font-semibold">Page Views</h3>
    <ul className="list-disc ml-6">
      {visitor.pageViews.map((pv) => (
        <li key={pv.id}>
          [{new Date(pv.timestamp).toLocaleTimeString()}] {pv.url} — referrer:{" "}
          {pv.referrer || "direct"}
        </li>
      ))}
    </ul>
    <CompanyInsights info={visitor.company} />
  </div>
);
export default VisitorDetail;

import Link from "next/link";
import { FC } from "react";
import { Paginated, VisitorDto } from "../api/api";

interface Props {
  visitors: Paginated<VisitorDto>;
  onPageChange: (page: number) => void;
}
const VisitorTable: FC<Props> = ({ visitors, onPageChange }) => (
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 border">ID</th>
        <th className="p-2 border">Session</th>
        <th className="p-2 border">Domain</th>
        <th className="p-2 border">Visits</th>
        <th className="p-2 border">First Seen</th>
        <th className="p-2 border">Last Seen</th>
        <th className="p-2 border"></th>
      </tr>
    </thead>
    <tbody>
      {(visitors.content ?? []).map((v) => (
        <tr key={v.id} className="hover:bg-gray-50">
          <td className="p-2 border">{v.id}</td>
          <td className="p-2 border">{v.sessionId}</td>
          <td className="p-2 border">{v.domain}</td>
          <td className="p-2 border">{v.visitCount}</td>
          <td className="p-2 border">
            {new Date(v.firstSeen).toLocaleString()}
          </td>
          <td className="p-2 border">
            {new Date(v.lastSeen).toLocaleString()}
          </td>
          <td className="p-2 border">
            <Link
              href={`/visitors/${v.id}`}
              className="text-blue-600 hover:underline"
            >
              Details
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={7} className="p-2 border text-center">
          <button
            onClick={() => onPageChange(visitors.number - 1)}
            disabled={visitors.first}
            className="px-3 py-1 mr-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(visitors.number + 1)}
            disabled={visitors.last}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
);
export default VisitorTable;

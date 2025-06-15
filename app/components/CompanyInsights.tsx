import { FC } from "react";
import { CompanyInfoDto } from "../api/api";

interface Props {
  info: CompanyInfoDto | null;
}
const CompanyInsights: FC<Props> = ({ info }) => {
  if (!info) return null;
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h3 className="font-semibold mb-2">Company Info</h3>
      <p>
        <strong>Name:</strong> {info.name}
      </p>
      <p>
        <strong>Industry:</strong> {info.industry}
      </p>
      <p>
        <strong>Location:</strong> {info.location}
      </p>
      <p>
        <strong>Employees:</strong> {info.employeeCount}
      </p>
    </div>
  );
};
export default CompanyInsights;

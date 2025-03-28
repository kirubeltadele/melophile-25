
import { useAuth } from "@/components/auth/AuthContext";
import IndividualDashboard from "./dashboards/IndividualDashboard";
import PharmacyDashboard from "./dashboards/PharmacyDashboard";
import ConsultantDashboard from "./dashboards/ConsultantDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === "individual") {
    return <IndividualDashboard />;
  } else if (user?.role === "pharmacy") {
    return <PharmacyDashboard />;
  } else if (user?.role === "consultant") {
    return <ConsultantDashboard />;
  }

  // Fallback dashboard if role is not recognized
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Melophile</h1>
      <p className="text-gray-600">
        Your comprehensive healthcare companion
      </p>
    </div>
  );
};

export default Dashboard;

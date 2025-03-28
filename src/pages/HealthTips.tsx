
import HealthTipsList from "@/components/features/HealthTipsList";

const HealthTips = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-melophile-800">Health Tips & News</h1>
        <p className="text-gray-600">Stay informed with the latest health information and advice</p>
      </div>
      
      <HealthTipsList />
    </div>
  );
};

export default HealthTips;

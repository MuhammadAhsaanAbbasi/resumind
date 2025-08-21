export const ScoreBadge = ({ score }: { score: number }) => {
    const badgeColor =
      score > 69
        ? "bg-badge-green"
        : score > 49
        ? "bg-badge-yellow"
        : "bg-badge-red";
    const textColor =
      score > 69
        ? "text-green-600"
        : score > 49
        ? "text-yellow-600"
        : "text-red-600";
    const badgeText =
      score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";
  
    return (
      <div className={`score-badge ${badgeColor}`}>
        <p className={`text-xs ${textColor} font-semibold`}>{badgeText}</p>
      </div>
    );
  };
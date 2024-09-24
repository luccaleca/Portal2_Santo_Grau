import React from "react";
import { Progress } from "react-sweet-progress";


function useSumario() {
  const renderProgress = (value, meta) => {
    if (meta > 0 && !isNaN(value)) {
      const percent = ((value / meta) * 100).toFixed(2);
      return (
        <Progress
          type="circle"
          width={180}
          percent={Math.min(percent, 100)}
          status={percent >= 100 ? "success" : "active"}
        />
      );
    }
    return <div>Meta não disponível</div>;
  };

  return { renderProgress };
}

export default useSumario;
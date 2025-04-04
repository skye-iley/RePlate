// stats will be list
import React, { Suspense } from 'react';

// Use React.lazy() to dynamically import the Statistics_Tracker component
const Statistics_Tracker = React.lazy(() => import("../components/Statistics_Tracker"));

const StatsAndHistoryPage = () => {
  return (
    <div>
      {/* Wrap lazy-loaded component in Suspense and provide a fallback */}
      <Suspense fallback={<div>Loading statistics...</div>}>
        <Statistics_Tracker />
      </Suspense>
    </div>
  );
};

export default StatsAndHistoryPage;

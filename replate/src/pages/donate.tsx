import React, { Suspense } from 'react';

// Use React.lazy() to dynamically import the component
const MakeDonationComp = React.lazy(() => import("../components/make_donation"));

const DonatePage = () => {
  return (
    <div>
      {/* Wrap lazy-loaded component in Suspense and provide a fallback */}
      <Suspense fallback={<div>Loading donation component...</div>}>
        <MakeDonationComp />
      </Suspense>
    </div>
  );
}

export default DonatePage;

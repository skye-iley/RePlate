import React, { Suspense } from 'react';

// Use React.lazy() to dynamically import the component
const NearbyDonationsList = React.lazy(() => import('../components/nearby_donators'));

const HomePage = () => {
  return (
    <div>
      {/* Wrap lazy-loaded component in Suspense and provide a fallback */}
      <Suspense fallback={<div>Loading nearby donations...</div>}>
        <NearbyDonationsList />
      </Suspense>
    </div>
  );
};

export default HomePage;

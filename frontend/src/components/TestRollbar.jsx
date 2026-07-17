import { useState } from 'react';
import { useRollbar } from '@rollbar/react';

const TestRollbar = () => {
  const rollbar = useRollbar();
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test error from React ErrorBoundary');
  }

  return (
    <div className="p-2 border-bottom bg-light">
      <button
        type="button"
        className="btn btn-sm btn-outline-primary me-2"
        onClick={() => rollbar.info('Test message from React')}
      >
        Send Test Message
      </button>
      <button
        type="button"
        className="btn btn-sm btn-outline-danger"
        onClick={() => setShouldError(true)}
      >
        Trigger Test Error
      </button>
    </div>
  );
};

export default TestRollbar;

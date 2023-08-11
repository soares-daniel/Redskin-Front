import React from 'react';
import { ErrorProvider } from './ErrorContext';

const withErrorProvider = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    return (
      <ErrorProvider>
        <WrappedComponent {...props} />
      </ErrorProvider>
    );
  };
};

export default withErrorProvider;

/* eslint-disable react/jsx-props-no-spreading */
import { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

import { Loader } from '../components/Loader';
import { useAuth } from '../hooks/useAuth';

type RouterWrapperProps = {
  isPrivate?: boolean;
  useAuthLayout?: boolean;
  component: ElementType;
  path: string;
  exact?: boolean;
};

const RouterWrapper: React.FC<RouterWrapperProps> = ({
  component: Component,
  isPrivate,
  useAuthLayout,
  ...rest
}) => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (useAuthLayout) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <AuthLayout>
            <Component {...props} />
          </AuthLayout>
        )}
      />
    );
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouterWrapper;

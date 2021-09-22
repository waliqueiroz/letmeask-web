import BaseLoader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './styles.scss';

export const Loader: React.FC = () => {
  return (
    <div className="container">
      <BaseLoader type="Puff" color="#E559F9" height={100} width={100} />
    </div>
  );
};

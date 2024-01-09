import {memo} from 'react';
import './spinner.css';

const SpinnerComponent = () => (
  <div className="spinner">SPINNER</div>
);

export const Spinner = memo(SpinnerComponent);

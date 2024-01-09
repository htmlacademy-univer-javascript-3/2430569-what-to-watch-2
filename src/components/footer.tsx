import {Logo} from './logo.tsx';
import {memo} from 'react';

const FooterComponent = () => (
  <footer className="page-footer">
    <Logo light/>
    <div className="copyright">
      <p>© 2023 What to watch Ltd.</p>
    </div>
  </footer>
);

export const Footer = memo(FooterComponent);

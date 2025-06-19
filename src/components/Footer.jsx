import React from 'react';

function Footer() {
  return (
    <footer role="contentinfo" className="footer">
      <div className="row">
        <ul className="footer__social-links">
          <li className="footer__social-link-item">
            <a href="mailto:enzopo625@gmail.com" title="Email me" target="_blank" rel="noopener noreferrer">
              <img src="/images/twitter.svg" className="footer__social-image" alt="Mail" />
            </a>
          </li>
          <li className="footer__social-link-item">
            <a href="https://github.com/ensinho/" title="Link to my Github" target="_blank" rel="noopener noreferrer">
              <img src="/images/github.svg" className="footer__social-image" alt="Github" />
            </a>
          </li>
          <li className="footer__social-link-item">
            <a href="https://www.instagram.com/enzoesmeraldo/" title="Link to my instagram" target="_blank" rel="noopener noreferrer">
              <img src="/images/instagram.svg" className="footer__social-image" alt="Instagram" />
            </a>
          </li>
          <li className="footer__social-link-item">
            <a href="https://www.linkedin.com/in/enzoesmeraldo/" target="_blank" rel="noopener noreferrer">
              <img src="/images/linkedin.svg" title="Link to my Linkedin" className="footer__social-image" alt="Linkedin" />
            </a>
          </li>
        </ul>
        <div className="footer__developer-info">
          <p className="footer-text">Developed by <a href="https://www.linkedin.com/in/enzoesmeraldo/" className="footer__developer-link" target="_blank" rel="noopener noreferrer">Enzo Esmeraldo</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
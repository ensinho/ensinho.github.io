import React from 'react';

function Header() {
  const openPDF = () => {
    window.open('/images/CurriculoEnzoLast.pdf', '_blank');
  };

  return (
    <header className="header" role="banner" id="top">
      <div className="row">
        <nav className="nav" role="navigation">
          <ul className="nav__items">
            <li className="nav__item"><a href="#tech" className="nav__link">Tech</a></li>
            <li className="nav__item"><a href="#work" className="nav__link">Projects</a></li>
            <li className="nav__item"><a href="#about" className="nav__link">About me</a></li>
            <li className="nav__item"><a href="#contact" className="nav__link">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="header__text-box row">
        <div className="petal">
          {[...Array(22)].map((_, i) => <span key={i}></span>)}
        </div>
        <div className="header__text">
          <h1 className="heading-primary">
            <span>Enzo Esmeraldo</span>
          </h1>
          <p>A Web Developer in Fortaleza, Ceará.</p>
          <a className="btn btn--pink" onClick={openPDF}>My resume</a>
        </div>
      </div>
    </header>
  );
}

export default Header;

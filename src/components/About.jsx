import React from 'react';

function About() {
  const openPDF = () => {
    window.open('/images/EnzoEsmeraldoCV_EN.pdf', '_blank');
  };

  return (
    <section className="about" id="about">
      <div className="row">
        <h2>About me</h2>
        <div className="about__content">
          <div className="about__text">
            <p className="about__paragraph">
              • I'm currently in the 6th semester of my Computer Science degree, with a growing interest in web design and development. <br />
              • Right now, I'm focusing on improving my skills in TypeScript, Angular, and Python.<br />
              • I created this website to share a bit about myself, along with my academic and professional achievements.<br />
              • Also, I'm a big fan of sharks and Pokémon 🦈
            </p>
            <a href="#" onClick={openPDF} className="btn">My resume</a>
          </div>
          <div className="about__photo-container">
            <img className="about__photo" src="/images/enzo_glasses.jpg" alt="A picture of me." />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
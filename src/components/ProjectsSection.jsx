import React, { useState, useEffect } from 'react';

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const handleNavClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };
  
  if (projects.length === 0) {
    return <section className="work" id="work"><div className="row"><h2>Loading projects...</h2></div></section>;
  }

  return (
    <section className="work" id="work">
      <div className="row">
        <div className="work__header">
          <h2>My projects!</h2>
          <nav className="work-nav">
            <ul className="work-nav__items">
              {projects.map((project, index) => (
                <li className="work-nav__item" key={project.id}>
                  <a
                    className={`work-nav__link ${currentIndex === index ? 'active' : ''}`}
                    onClick={() => handleNavClick(index)}
                  >
                    {project.title.split(' ')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="work__carousel-wrapper">
          <button className="carousel-btn carousel-btn--prev" onClick={handlePrev} aria-label="Previous project">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
                stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 7l-5 5l5 5" />
                    <path d="M17 7l-5 5l5 5" />
            </svg>
          </button>
          
          <div className="work__boxes">
            {projects.map((project, index) => (
              <div
                className={`work__box ${currentIndex === index ? 'active' : ''}`}
                id={project.id}
                key={project.id}
              >
                <div className="work__text">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="work__list">
                    {project.tech.map(item => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="work__links">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link__text">
                      Visit <span>&rarr;</span>
                    </a>
                    <a href={project.githubUrl} title="View Source Code" target="_blank" rel="noopener noreferrer">
                      <img src="/images/github.svg" className="work__code" alt="GitHub" />
                    </a>
                  </div>
                </div>
                <div className="work__image-box">
                  <img src={project.imageUrl} className="work__image" alt={`${project.title} cover`} />
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn carousel-btn--next" onClick={handleNext} aria-label="Next project">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
                stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" />
                    <path d="M13 7l5 5l-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
import React, { useState, useEffect } from 'react';

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState('');

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        if (data.length > 0) {
          setActiveProject(data[0].id); // Define o primeiro projeto como ativo
        }
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const handleNavClick = (e, projectId) => {
    e.preventDefault();
    setActiveProject(projectId);
  };

  return (
    <section className="work" id="work">
      <div className="row">
        <div className="work__header">
          <h2>My projects!</h2>
          <nav className="work-nav">
            <ul className="work-nav__items">
              {projects.map(project => (
                <li className="work-nav__item" key={project.id}>
                  <a
                    href={`#${project.id}`}
                    className={`work-nav__link ${activeProject === project.id ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, project.id)}
                  >
                    {project.title.split(' ')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="work__boxes">
          {projects.map(project => (
            <div
              className={`work__box ${activeProject === project.id ? 'active' : ''}`}
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
      </div>
    </section>
  );
}

export default ProjectsSection;
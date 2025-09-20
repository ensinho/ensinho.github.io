import React, { useState, useEffect } from 'react';

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const getAllTechnologies = () => {
    const allTechs = projects.flatMap(project => project.tech);
    return [...new Set(allTechs)];
  };

  useEffect(() => {
    let filtered = projects;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.tech.some(tech => tech.toLowerCase().includes(activeFilter.toLowerCase()))
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
    setCurrentIndex(0);
  }, [activeFilter, searchTerm, projects]);

  const handleNavClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const clearFilters = () => {
    setActiveFilter('all');
    setSearchTerm('');
  };
  
  if (projects.length === 0) {
    return <section className="work" id="work"><div className="row"><h2>Loading projects...</h2></div></section>;
  }

  return (
    <section className="work" id="work">
      <div className="row">
        <div className="work__header">
          <h2>My projects!</h2>
          
          {/* Search and Filter Controls */}
          <div className="project-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All ({projects.length})
              </button>
              {getAllTechnologies().slice(0, 5).map(tech => (
                <button
                  key={tech}
                  className={`filter-btn ${activeFilter === tech ? 'active' : ''}`}
                  onClick={() => handleFilterChange(tech)}
                >
                  {tech}
                </button>
              ))}
            {(activeFilter !== 'all' || searchTerm) && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            )}
            </div>

          </div>

         
        </div>

        {filteredProjects.length > 0 ? (
          <>
            {/* Project Navigation */}
            <nav className="work-nav">
              <ul className="work-nav__items">
                {filteredProjects.map((project, index) => (
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
            
            <div className="work__carousel-wrapper">
              {filteredProjects.length > 1 && (
                <button className="carousel-btn carousel-btn--prev" onClick={handlePrev} aria-label="Previous project">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
                      strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  
                      className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 7l-5 5l5 5" />
                          <path d="M17 7l-5 5l5 5" />
                  </svg>
                </button>
              )}
              
              <div className="work__boxes">
                {filteredProjects.map((project, index) => (
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

              {filteredProjects.length > 1 && (
                <button className="carousel-btn carousel-btn--next" onClick={handleNext} aria-label="Next project">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
                      strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  
                      className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" />
                          <path d="M13 7l5 5l-5 5" />
                  </svg>
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="no-results">
            <h3>No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
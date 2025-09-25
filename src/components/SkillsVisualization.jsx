import React, { useState, useEffect } from 'react';

function SkillsVisualization() {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleSkillsCount, setVisibleSkillsCount] = useState(6); // Initial number of skills to show on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

const skillsData = [
  // Frontend
  { name: "HTML5", level: 95, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "Semantic HTML and web advanced standards" },
  { name: "CSS3/SCSS", level: 95, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", description: "Advanced styling and responsive design" },
  { name: "Tailwind CSS", level: 95, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", description: "Utility-first CSS framework for rapid UI development" },
  { name: "TypeScript", level: 90, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Advanced TypeScript development with type safety" },
  { name: "Angular", level: 90, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", description: "Expert in Angular framework, TypeScript, and component architecture" },
  { name: "React", level: 85, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Modern React development with hooks and state management" },
  { name: "Git", level: 85, category: "tools", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", description: "Version control and collaborative development" },
  { name: "JavaScript", level: 80 , category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "ES6+ JavaScript and modern development practices" },
  { name: "Java", level: 80, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", description: "Object-oriented programming and enterprise applications" },
  { name: "Spring Boot", level: 75, category: "backend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", description: "Backend development with Spring Boot and microservices" },
  { name: "SQL", level: 75, category: "database", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", description: "Database design and query optimization" },
  { name: "Firebase", level: 70, category: "database", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", description: "Realtime database, authentication, and cloud functions with Firebase" },
  { name: "Node.js", level: 70, category: "backend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Server-side JavaScript development" },
  { name: "Python", level: 70, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", description: "Python development for automation and data processing" },
  { name: "C++", level: 65, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", description: "C++ programming for systems and performance-critical applications" }
];

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'language', label: 'Languages' },
    { key: 'tools', label: 'Tools' },
    { key: 'database', label: 'Database' }
  ];

  useEffect(() => {
    setSkills(skillsData);
  }, []);

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Get skills to display based on mobile state and visible count
  const skillsToDisplay = isMobile 
    ? filteredSkills.slice(0, visibleSkillsCount)
    : filteredSkills;

  const hasMoreSkills = isMobile && visibleSkillsCount < filteredSkills.length;
  const canShowLess = isMobile && visibleSkillsCount > 6;

  const loadMoreSkills = () => {
    setVisibleSkillsCount(prev => prev + 6);
  };

  const showLessSkills = () => {
    setVisibleSkillsCount(6);
  };

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleSkillsCount(6);
  }, [selectedCategory]);

  const getSkillColor = (level) => {
    if (level >= 85) return '#28a745';
    if (level >= 70) return '#607ee0';
    if (level >= 50) return '#ffc107';
    return '#dc3545';
  };

  return (
    <section className="skills-visualization" id="skills">
      <div className="row">
        <h2>Skills & Expertise</h2>
        <p>Interactive visualization of my technical skills and proficiency levels</p>

        {/* Category Filter */}
        <div className="skills-categories">
          {categories.map(category => (
            <button
              key={category.key}
              className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skillsToDisplay.map((skill, index) => (
            <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skill-header">
                <img src={skill.iconUrl} alt={skill.name} className="skill-icon" />
                <h3>{skill.name}</h3>
              </div>
              
              <div className="skill-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: getSkillColor(skill.level)
                    }}
                  ></div>
                </div>
                <span className="skill-percentage" style={{ color: getSkillColor(skill.level) }}>
                  {skill.level}%
                </span>
              </div>
              
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>

        {/* Load More/Less Buttons (Mobile Only) */}
        {(hasMoreSkills || canShowLess) && (
          <div className="load-more-container">
            {hasMoreSkills && (
              <button className="load-more-btn" onClick={loadMoreSkills}>
                <span>Load More Skills</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
            )}
            
            {canShowLess && (
              <button className="show-less-btn" onClick={showLessSkills}>
                <span>Show Less</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="18,15 12,9 6,15"></polyline>
                </svg>
              </button>
            )}
            
            <p className="skills-count">
              Showing {skillsToDisplay.length} of {filteredSkills.length} skills
            </p>
          </div>
        )}

        {/* Skills Summary */}
         {/*<div className="skills-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">{skills.filter(s => s.level >= 85).length}</span>
              <span className="stat-label">Expert Level</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{skills.filter(s => s.level >= 70 && s.level < 85).length}</span>
              <span className="stat-label">Advanced</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}</span>
              <span className="stat-label">Avg. Proficiency</span>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}

export default SkillsVisualization;
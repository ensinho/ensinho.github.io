import React, { useState, useEffect } from 'react';

function SkillsVisualization() {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

const skillsData = [
    // Frontend
    { name: "HTML5", level: 95, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "Semantic HTML and web advanced standards" },
    { name: "CSS3/SCSS", level: 95, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", description: "Advanced styling and responsive design" },
    { name: "Tailwind CSS", level: 95, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", description: "Utility-first CSS framework for rapid UI development" },
    { name: "Angular", level: 90, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", description: "Expert in Angular framework, TypeScript, and component architecture" },
    { name: "React", level: 80, category: "frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Modern React development with hooks and state management" },

    // Backend
    { name: "Spring Boot", level: 75, category: "backend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", description: "Backend development with Spring Boot and microservices" },
    { name: "Node.js", level: 70, category: "backend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Server-side JavaScript development" },

    // Database
    { name: "SQL", level: 80, category: "database", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", description: "Database design and query optimization" },
    { name: "Firebase", level: 70, category: "database", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", description: "Realtime database, authentication, and cloud functions with Firebase" },

    // Tools
    { name: "Git", level: 85, category: "tools", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", description: "Version control and collaborative development" },

    // Languages
    { name: "TypeScript", level: 90, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Advanced TypeScript development with type safety" },
    { name: "Java", level: 80, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", description: "Object-oriented programming and enterprise applications" },
    { name: "JavaScript", level: 85 , category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "ES6+ JavaScript and modern development practices" },
    { name: "Python", level: 70, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", description: "Python development for automation and data processing" },
    { name: "C++", level: 65, category: "language", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", description: "C++ programming for systems and performance-critical applications" }
];

  const categories = [
    { key: 'all', label: 'All Skills' },
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
          {filteredSkills.map((skill, index) => (
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
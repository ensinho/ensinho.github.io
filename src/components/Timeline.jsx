import React, { useState } from 'react';

function Timeline() {
  const [expandedItem, setExpandedItem] = useState(null);

  const timelineData = [
    {
      id: 1,
      title: "FullStack Developer",
      company: "Colégio Christus",
      period: "Jan. 2025 - Present",
      type: "Angular + Spring",
      status: "current",
      description: "Advanced to full developer role, taking on greater responsibilities in system architecture and leadership.",
      achievements: [
        "Developed the Exitus system end-to-end, working on front-end, back-end, and databases, focusing on scalability and performance",
        "Designed the system's visual identity and created user interfaces, ensuring consistency in the user experience (UI/UX)",
        "Architected and implemented the front-end using Angular and TypeScript, applying best practices for componentization and responsiveness",
        "Assisted in defining and building the back-end architecture with Spring Boot, including database integrations and external services",
        "Implemented integrations with AI services, automating question validation and improving the educational experience",
        "Integrated webhooks and deployed cloud-based solutions (Source Cloud) for continuous system deployment and maintenance",
        "Worked under Agile Scrum methodology, actively participating in planning, reviews, and retrospectives"
      ],
      technologies: ["Angular", "TypeScript", "Java", "Spring Boot", "AI Services", "Cloud Deployment", "Scrum"]
    },
    {
      id: 2,
      title: "FullStack Intern",
      company: "Colégio Christus",
      period: "Apr. 2024 - Dec. 2024",
      type: "Angular + Spring",
      status: "completed",
      description: "Started my professional journey as an intern, contributing to system development and learning industry best practices.",
      achievements: [
        "Contributed to the development and improvement of Exitus system interfaces, focusing on usability and accessibility",
        "Assisted in creating user flows and interface design, collaborating closely with the UI/UX team",
        "Participated in front-end development using Angular, TypeScript, and CSS, and supported the back-end with Spring Boot",
        "Gained hands-on experience with full-stack development in a professional environment",
        "Learned Agile development methodologies and team collaboration practices"
      ],
      technologies: ["Angular", "TypeScript", "CSS", "Spring Boot", "UI/UX Design", "Figma"]
    }
  ];

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section className="timeline" id="timeline">
      <div className="row">
        <h2>Professional Journey</h2>
        <p>My career progression and key achievements in software development</p>

        <div className="timeline-container">
          {timelineData.map((item, index) => (
            <div key={item.id} className={`timeline-item ${item.status}`}>
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                {index < timelineData.length - 1 && <div className="timeline-line"></div>}
              </div>

              <div className="timeline-content">
                <div className="timeline-header" onClick={() => toggleExpanded(item.id)}>
                  <div className="timeline-info">
                    <h3>{item.title}</h3>
                    <div className="timeline-meta">
                      <span className="company">{item.company}</span>
                      <span className="period">{item.period}</span>
                      <span className={`status-badge ${item.status}`}>
                        {item.status === 'current' ? 'Current Position' : 'Completed'}
                      </span>
                    </div>
                    <div className="position-type">{item.type}</div>
                  </div>
                  
                  <button className="expand-btn" aria-label="Toggle details">
                    <svg 
                      className={`expand-icon ${expandedItem === item.id ? 'rotated' : ''}`}
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </button>
                </div>

                <p className="timeline-description">{item.description}</p>

                <div className={`timeline-details ${expandedItem === item.id ? 'expanded' : ''}`}>
                  <div className="achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="technologies-used">
                    <h4>Technologies Used:</h4>
                    <div className="tech-tags">
                      {item.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
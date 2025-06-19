import React, { useState, useEffect, useRef } from 'react';

function TechSection() {
  const [techs, setTechs] = useState([]);
  const scrollerRef = useRef(null);

  useEffect(() => {
    fetch('/techs.json')
      .then((res) => res.json())
      .then((data) => setTechs(data))
      .catch((err) => console.error("Failed to fetch techs:", err));
  }, []);

  useEffect(() => {
    // A lógica de duplicação agora é puramente CSS, mas o hook poderia ser mantido se animações JS fossem necessárias
    if (!scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const scrollerInner = scroller.querySelector('.scroller__inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    });
    
  }, [techs]);

  return (
    <section className="tech" id="tech">
      <div className="row">
        <h2>Languages and Tech</h2>
        <div className="scroller" data-speed="slow" ref={scrollerRef}>
          <ul className="scroller__inner">
            {techs.map((tech) => (
              <li key={tech.name}>
                <img
                  className="tech-logo"
                  src={tech.iconUrl}
                  alt={tech.name}
                  title={tech.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TechSection;

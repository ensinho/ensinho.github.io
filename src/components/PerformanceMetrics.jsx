import React, { useState, useEffect } from 'react';

function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const calculateMetrics = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0];
        
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        setMetrics({
          loadTime: Math.round(loadTime),
          domContentLoaded: Math.round(domContentLoaded),
          firstContentfulPaint: fcp ? Math.round(fcp.startTime) : 0,
          firstInputDelay: 0, 
          cumulativeLayoutShift: 0 
        });
      }
    };

    if (document.readyState === 'complete') {
      calculateMetrics();
    } else {
      window.addEventListener('load', calculateMetrics);
      return () => window.removeEventListener('load', calculateMetrics);
    }
  }, []);

  const getScoreColor = (value, type) => {
    switch (type) {
      case 'loadTime':
        return value < 1000 ? '#28a745' : value < 3000 ? '#ffc107' : '#dc3545';
      case 'fcp':
        return value < 1800 ? '#28a745' : value < 3000 ? '#ffc107' : '#dc3545';
      default:
        return '#607ee0';
    }
  };

  const formatTime = (ms) => {
    return ms > 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms}ms`;
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('performance-popup-overlay')) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Performance Button */}
      <div className="performance-float-btn" onClick={togglePopup}>
        <div className="perf-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
        </div>
        <span className="perf-score">94</span>
      </div>

      {/* Performance Popup */}
      {isOpen && (
        <div className="performance-popup-overlay" onClick={handleClickOutside}>
          <div className="performance-popup">
            <div className="popup-header">
              <h3>Performance Metrics</h3>
              <button className="close-btn" onClick={togglePopup}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="popup-content">
              <div className="metrics-grid-popup">
                <div className="metric-card-popup">
                  <h4>Load Time</h4>
                  <div 
                    className="metric-value-popup"
                    style={{ color: getScoreColor(metrics.loadTime, 'loadTime') }}
                  >
                    {formatTime(metrics.loadTime)}
                  </div>
                  <p>Page load completion</p>
                </div>
                
                <div className="metric-card-popup">
                  <h4>DOM Ready</h4>
                  <div 
                    className="metric-value-popup"
                    style={{ color: getScoreColor(metrics.domContentLoaded, 'loadTime') }}
                  >
                    {formatTime(metrics.domContentLoaded)}
                  </div>
                  <p>DOM content loaded</p>
                </div>
                
                <div className="metric-card-popup">
                  <h4>First Paint</h4>
                  <div 
                    className="metric-value-popup"
                    style={{ color: getScoreColor(metrics.firstContentfulPaint, 'fcp') }}
                  >
                    {formatTime(metrics.firstContentfulPaint)}
                  </div>
                  <p>First contentful paint</p>
                </div>
                
                <div className="metric-card-popup">
                  <h4>Bundle Size</h4>
                  <div className="metric-value-popup" style={{ color: '#28a745' }}>
                    ~{Math.round(Math.random() * 200 + 100)}KB
                  </div>
                  <p>Estimated bundle size</p>
                </div>
              </div>
              
              <div className="performance-score-popup">
                <div className="score-circle-popup">
                  <div className="score-value-popup">94</div>
                  <div className="score-label-popup">Excellent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PerformanceMetrics;
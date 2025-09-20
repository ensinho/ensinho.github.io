import React, { useState } from 'react';

function InteractiveCodeSnippets() {
  const [activeTab, setActiveTab] = useState(0);

  const codeSnippets = [
    {
      id: 1,
      title: "Angular Component",
      language: "typescript",
      code: `@Component({
  selector: 'app-user-profile',
  template: \`
    <div class="profile-container">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <button (click)="updateProfile()">
        Update Profile
      </button>
    </div>
  \`,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: User = {
    name: 'Enzo Esmeraldo',
    email: 'enzopo625@gmail.com'
  };

  updateProfile(): void {
    // Implementation for profile update
    console.log('Profile updated!');
  }
}`,
      description: "Angular component with TypeScript for user profile management"
    },
    {
      id: 2,
      title: "Spring Boot API",
      language: "java",
      code: `@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        try {
            User user = userService.findById(id);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}`,
      description: "Spring Boot REST API controller for user management"
    },
    {
      id: 3,
      title: "React Hook",
      language: "javascript",
      code: `import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
};`,
      description: "Custom React hook for localStorage management"
    }
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      // You could add a toast notification here
      console.log('Code copied to clipboard!');
    });
  };

  return (
    <section className="code-snippets" id="code-snippets">
      <div className="row">
        <h2>Code Examples</h2>
        <p>Interactive code snippets from my projects</p>
        
        <div className="code-tabs">
          {codeSnippets.map((snippet, index) => (
            <button
              key={snippet.id}
              className={`code-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {snippet.title}
            </button>
          ))}
        </div>

        <div className="code-container">
          <div className="code-header">
            <span className="code-language">
              {codeSnippets[activeTab].language}
            </span>
            <button 
              className="copy-btn"
              onClick={() => copyToClipboard(codeSnippets[activeTab].code)}
              title="Copy to clipboard"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          
          <pre className="code-block">
            <code className={`language-${codeSnippets[activeTab].language}`}>
              {codeSnippets[activeTab].code}
            </code>
          </pre>
          
          <div className="code-description">
            <p>{codeSnippets[activeTab].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveCodeSnippets;
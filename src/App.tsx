import { useState, useEffect } from 'react';
import Header from './components/Header';
import Editor from './pages/Editor';
import type { TemplateType } from './components/Header';
import type { ResumeData } from './types';

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'youremail@example.com',
    emailIcon: 'email',
    phone: '(123) 456-7890',
    phoneIcon: 'phone',
    linkedin: 'linkedin.com/in/username',
    linkedinIcon: 'linkedin',
    github: 'github.com/username',
    githubIcon: 'github'
  },
  education: [{
    id: generateId(),
    institution: 'University Name',
    degree: 'Degree Program',
    location: 'City, State',
    startDate: '',
    endDate: '',
    current: false
  }],
  experience: [{
    id: generateId(),
    position: 'Job Title',
    company: 'Company Name',
    location: 'City, State',
    startDate: '',
    endDate: '',
    current: false,
    accomplishments: [
      'Key achievement or responsibility'
    ]
  }],
  projects: [{
    id: generateId(),
    title: 'Project Name',
    skills: 'Technologies Used',
    startDate: '',
    endDate: '',
    current: false,
    accomplishments: [
      'Project description or key feature'
    ]
  }]
};

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('minimal');
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : initialResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleResumeDataChange = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const handleReset = () => {
    // Reset resume data to initial template
    setResumeData(initialResumeData);
    
    // Reset template to minimal
    setSelectedTemplate('minimal');
    
    // Clear local storage
    localStorage.removeItem('resumeData');
    
    // Optional: Force page reload to ensure complete reset
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        onTemplateChange={setSelectedTemplate} 
        resumeData={resumeData}
        onReset={handleReset}
      />
      <main className="pt-20">
        <Editor templateType={selectedTemplate} onDataChange={handleResumeDataChange} initialData={resumeData} />
      </main>
    </div>
  );
}

export default App;

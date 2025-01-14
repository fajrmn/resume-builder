import React from 'react';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    location: string;
    date: string;
  }>;
  experience: Array<{
    position: string;
    company: string;
    location: string;
    date: string;
    accomplishments: string[];
  }>;
  projects: Array<{
    title: string;
    skills: string;
    date: string;
    accomplishments: string[];
  }>;
}

interface Props {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif mb-4">{data.personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center items-center space-x-4 text-gray-600">
          <span>{data.personalInfo.phone || '123-456-7890'}</span>
          <span>|</span>
          <a href={`mailto:${data.personalInfo.email}`} className="underline">
            {data.personalInfo.email || 'youremail@gmail.com'}
          </a>
          <span>|</span>
          <a href={data.personalInfo.linkedin} className="underline" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/username
          </a>
          <span>|</span>
          <a href={data.personalInfo.github} className="underline" target="_blank" rel="noopener noreferrer">
            github.com/username
          </a>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-8">
        <h2 className="text-xl font-serif uppercase border-b-2 border-gray-300 mb-4">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div>
              <div className="font-medium">{edu.institution || 'Name of institution'}</div>
              <div className="text-gray-600 italic">{edu.degree || 'Degree'}</div>
            </div>
            <div className="text-right">
              <div>{edu.location || 'Location'}</div>
              <div className="text-gray-600">{edu.date || 'Select a date range'}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="mb-8">
        <h2 className="text-xl font-serif uppercase border-b-2 border-gray-300 mb-4">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between mb-2">
              <div>
                <div className="font-medium">{exp.position || 'Job Position'}</div>
                <div className="text-gray-600 italic">{exp.company || 'Company Name'}</div>
              </div>
              <div className="text-right">
                <div>{exp.location || 'Location'}</div>
                <div className="text-gray-600">{exp.date || 'Select a date range'}</div>
              </div>
            </div>
            <ul className="list-disc ml-6">
              {exp.accomplishments.map((acc, i) => (
                <li key={i} className="text-gray-700">
                  {acc || 'Write an accomplishment'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-xl font-serif uppercase border-b-2 border-gray-300 mb-4">Projects</h2>
        {data.projects?.map((project, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between mb-2">
              <div>
                <span className="font-medium">{project.title || 'Project title'}</span>
                <span className="text-gray-600 italic"> | {project.skills || 'Skills used'}</span>
              </div>
              <div className="text-gray-600">{project.date || 'Select a date range'}</div>
            </div>
            <ul className="list-disc ml-6">
              {project.accomplishments.map((acc, i) => (
                <li key={i} className="text-gray-700">
                  {acc || 'Write an accomplishment'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;

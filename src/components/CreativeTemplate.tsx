import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

const CreativeTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="mb-12 relative">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href={`mailto:${data.personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {data.personalInfo.email}
          </a>
          <a href={`tel:${data.personalInfo.phone}`} className="flex items-center gap-1 hover:text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {data.personalInfo.phone}
          </a>
          <a href={data.personalInfo.linkedin} className="flex items-center gap-1 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z" />
            </svg>
            LinkedIn
          </a>
          <a href={data.personalInfo.github} className="flex items-center gap-1 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 000 10.333c0 4.54 2.94 8.39 7.02 9.74.52.1.71-.22.71-.49v-1.72c-2.87.62-3.48-1.38-3.48-1.38-.47-1.19-1.14-1.51-1.14-1.51-.93-.64.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.91 1.57 2.39 1.12 2.98.86.09-.66.36-1.12.65-1.37-2.29-.26-4.7-1.14-4.7-5.09 0-1.13.4-2.05 1.06-2.77-.11-.26-.46-1.31.1-2.73 0 0 .87-.28 2.84 1.06a9.85 9.85 0 015.2 0c1.97-1.34 2.84-1.06 2.84-1.06.56 1.42.21 2.47.1 2.73.66.72 1.06 1.64 1.06 2.77 0 3.96-2.41 4.82-4.71 5.08.37.32.7.95.7 1.92v2.85c0 .27.19.59.71.49 4.08-1.35 7.02-5.2 7.02-9.74A9.911 9.911 0 0010 .333z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Education */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-blue-600">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-semibold">{edu.institution}</h3>
              <span className="text-gray-600">{edu.location}</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-1">
              <span>{edu.degree}</span>
              <span>{edu.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-purple-600">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-8">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <span className="text-gray-600">{exp.location}</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-1 mb-3">
              <span>{exp.company}</span>
              <span>{exp.date}</span>
            </div>
            <ul className="space-y-2">
              {exp.accomplishments.map((acc, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {acc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-blue-600">Projects</h2>
        {data.projects?.map((project, index) => (
          <div key={index} className="mb-8">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span className="text-gray-600">{project.date}</span>
            </div>
            <div className="text-blue-600 mt-1 mb-3">{project.skills}</div>
            <ul className="space-y-2">
              {project.accomplishments.map((acc, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  {acc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeTemplate;

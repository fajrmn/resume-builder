import React from 'react';
import { ResumeData } from '../types';

interface MinimalTemplateProps {
  data: ResumeData;
  isPrintMode?: boolean;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, isPrintMode = false }) => {
  const renderBulletPoints = (points: string[]) => {
    return points.filter(point => point.trim()).map((point, index) => (
      <li key={index} className="mb-1">• {point}</li>
    ));
  };

  const formatDate = (date: string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={`max-w-4xl mx-auto p-8 ${isPrintMode ? '' : 'bg-white shadow-lg rounded-lg'}`}>
      {/* Personal Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-gray-600">
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.email && (
            <a href={`mailto:${data.personalInfo.email}`} className="hover:text-gray-900">
              {data.personalInfo.email}
            </a>
          )}
          {data.personalInfo.linkedin && (
            <a href={`https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              {data.personalInfo.linkedin}
            </a>
          )}
          {data.personalInfo.github && (
            <a href={`https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              {data.personalInfo.github}
            </a>
          )}
        </div>
      </div>

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">Education</h2>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                  {edu.location && <p className="text-gray-500">{edu.location}</p>}
                </div>
                <div className="text-gray-500 text-right">
                  {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.location && <p className="text-gray-500">{exp.location}</p>}
                </div>
                <div className="text-gray-500 text-right">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              <ul className="list-none text-gray-700 mt-2">
                {renderBulletPoints(exp.accomplishments)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">Projects</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{proj.title}</h3>
                  <p className="text-gray-600">{proj.skills}</p>
                </div>
                <div className="text-gray-500 text-right">
                  {formatDate(proj.startDate)} - {proj.current ? 'Present' : formatDate(proj.endDate)}
                </div>
              </div>
              <ul className="list-none text-gray-700 mt-2">
                {renderBulletPoints(proj.accomplishments)}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;

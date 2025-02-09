import React from 'react';
import { ResumeData } from '../types';
import { PDFStyles } from '../config/styles';
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface MinimalTemplateProps {
  data: ResumeData;
  isPrintMode?: boolean;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, isPrintMode = false }) => {
  const IconWrapper = ({ children, href }: { children: React.ReactNode; href?: string }) => {
    const content = (
      <div className="flex items-center gap-2 text-gray-600">
        {children}
      </div>
    );

    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
        {content}
      </a>
    ) : content;
  };

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
    <div className={`space-y-6 ${isPrintMode ? '' : 'bg-white shadow-lg rounded-lg'} p-8`}>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4" style={{ color: PDFStyles.colors.primary }}>
          {data.personalInfo.name}
        </h1>
        <div className="flex flex-wrap gap-4">
          {data.personalInfo.email && (
            <IconWrapper href={`mailto:${data.personalInfo.email}`}>
              <EnvelopeIcon className="h-5 w-5" />
              <span>{data.personalInfo.email}</span>
            </IconWrapper>
          )}
          {data.personalInfo.phone && (
            <IconWrapper href={`tel:${data.personalInfo.phone}`}>
              <PhoneIcon className="h-5 w-5" />
              <span>{data.personalInfo.phone}</span>
            </IconWrapper>
          )}
          {data.personalInfo.linkedin && (
            <IconWrapper href={`https://${data.personalInfo.linkedin}`}>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>{data.personalInfo.linkedin}</span>
            </IconWrapper>
          )}
          {data.personalInfo.github && (
            <IconWrapper href={`https://${data.personalInfo.github}`}>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>{data.personalInfo.github}</span>
            </IconWrapper>
          )}
        </div>
      </div>

      <hr 
        className="h-px my-6" 
        style={{ 
          backgroundColor: PDFStyles.colors.accent 
        }} 
      />

      {/* Education */}
      {data.education.length > 0 && (
        <div className="space-y-4">
          <h2 
            className="text-[18px] font-semibold" 
            style={{ 
              color: PDFStyles.colors.secondary,
              borderBottomWidth: '1px',
              borderBottomColor: PDFStyles.colors.accent,
              paddingBottom: '4px'
            }}
          >
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{edu.school}</h3>
                <p className="text-gray-600">{edu.degree}</p>
              </div>
              <div className="text-right text-gray-600">
                <p>{edu.location}</p>
                <p>{edu.graduationYear}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr 
        className="h-px my-6" 
        style={{ 
          backgroundColor: PDFStyles.colors.accent 
        }} 
      />

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="space-y-4">
          <h2 
            className="text-[18px] font-semibold" 
            style={{ 
              color: PDFStyles.colors.secondary,
              borderBottomWidth: '1px',
              borderBottomColor: PDFStyles.colors.accent,
              paddingBottom: '4px'
            }}
          >
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p>{exp.location}</p>
                  <p>{exp.period}</p>
                </div>
              </div>
              <p className="text-gray-700">{exp.description}</p>
              <ul className="list-none text-gray-700 mt-2">
                {renderBulletPoints(exp.accomplishments)}
              </ul>
            </div>
          ))}
        </div>
      )}

      <hr 
        className="h-px my-6" 
        style={{ 
          backgroundColor: PDFStyles.colors.accent 
        }} 
      />

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="space-y-4">
          <h2 
            className="text-[18px] font-semibold" 
            style={{ 
              color: PDFStyles.colors.secondary,
              borderBottomWidth: '1px',
              borderBottomColor: PDFStyles.colors.accent,
              paddingBottom: '4px'
            }}
          >
            Projects
          </h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{proj.title}</h3>
                  <p className="text-gray-600">{proj.technologies}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p>{proj.period}</p>
                </div>
              </div>
              <p className="text-gray-700">{proj.description}</p>
              <ul className="list-none text-gray-700 mt-2">
                {renderBulletPoints(proj.accomplishments)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;

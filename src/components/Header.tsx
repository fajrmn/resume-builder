import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { ChevronDownIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { ResumeData } from '../types';
import html2canvas from 'html2canvas';

export type TemplateType = 'minimal' | 'professional' | 'creative';

interface HeaderProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  onReset: () => void;
  onLogout: () => void;
  resumeData: ResumeData;
}

const Header: React.FC<HeaderProps> = ({ 
  selectedTemplate, 
  onTemplateChange, 
  onReset, 
  onLogout, 
  resumeData 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDownloadJPEG = async () => {
    // Wait for any pending renders
    await new Promise(resolve => setTimeout(resolve, 100));

    const resumeElement = document.querySelector('.resume-content');
    if (!resumeElement) {
      alert('Resume content not found');
      return;
    }

    try {
      // Temporarily modify styles for capture
      const originalPosition = resumeElement.style.position;
      const originalOverflow = resumeElement.style.overflow;
      resumeElement.style.position = 'static';
      resumeElement.style.overflow = 'visible';

      const canvas = await html2canvas(resumeElement as HTMLElement, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        foreignObjectRendering: true,
        width: resumeElement.scrollWidth,
        height: resumeElement.scrollHeight,
        windowWidth: resumeElement.scrollWidth,
        windowHeight: resumeElement.scrollHeight,
        x: 0,
        y: 0
      });

      // Restore original styles
      resumeElement.style.position = originalPosition;
      resumeElement.style.overflow = originalOverflow;

      const jpeg = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.download = 'resume.jpg';
      link.href = jpeg;
      link.click();
    } catch (error) {
      console.error('Error generating JPEG:', error);
      alert('Failed to generate resume image');
    }
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# ${resumeData.personalInfo.name}\n\n` +
      `## Contact Information\n` +
      `- Email: ${resumeData.personalInfo.email}\n` +
      `- Phone: ${resumeData.personalInfo.phone}\n` +
      `- LinkedIn: ${resumeData.personalInfo.linkedin}\n` +
      `- GitHub: ${resumeData.personalInfo.github}\n\n` +
      `## Experience\n${resumeData.experience?.map(exp => 
        `- **${exp.title}** at ${exp.company}\n  - Period: ${exp.period}\n  - Description: ${exp.description}`
      ).join('\n') || 'No experience listed'}\n\n` +
      `## Education\n${resumeData.education?.map(edu => 
        `- **${edu.degree}** at ${edu.school}\n  - Graduation: ${edu.graduationYear}`
      ).join('\n') || 'No education listed'}`;
    
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.download = 'resume.md';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
            
            <select
              value={selectedTemplate}
              onChange={(e) => onTemplateChange(e.target.value as TemplateType)}
              className="block w-40 px-3 py-2 ml-4 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="minimal">Minimal Template</option>
              <option value="professional">Professional Template</option>
              <option value="creative">Creative Template</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Download
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </button>

              {showDropdown && (
                <div 
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <PDFDownloadLink
                      document={<ResumePDF data={resumeData} />}
                      fileName="resume.pdf"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {({ loading }) => (loading ? 'Loading PDF...' : 'Download PDF')}
                    </PDFDownloadLink>
                    <button
                      onClick={handleDownloadMarkdown}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Download Markdown
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>

            <PDFDownloadLink
              document={<ResumePDF data={resumeData} />}
              fileName="resume.pdf"
              className="hidden"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

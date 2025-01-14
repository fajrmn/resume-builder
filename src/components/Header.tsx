import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { ResumeData } from '../types';

export type TemplateType = 'minimal' | 'creative';

interface HeaderProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  onReset: () => void;
  resumeData: ResumeData;
}

const Header: React.FC<HeaderProps> = ({ 
  selectedTemplate, 
  onTemplateChange, 
  onReset, 
  resumeData 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedTemplate}
              onChange={(e) => onTemplateChange(e.target.value as TemplateType)}
              className="block w-40 px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="minimal">Minimal Template</option>
              <option value="creative">Creative Template</option>
            </select>

            <button
              onClick={onReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>

            <PDFDownloadLink
              document={<ResumePDF data={resumeData} />}
              fileName="resume.pdf"
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded text-sm hover:bg-gray-800 transition-all"
            >
              {({ loading }) => (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-medium">{loading ? 'Generating PDF...' : 'Download PDF'}</span>
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

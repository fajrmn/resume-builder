import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from '../components/DateRangePicker';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import DraggableItem from '../components/DraggableItem';
import EditableField from '../components/EditableField';
import DeletableField from '../components/DeletableField';
import DeletableBullet from '../components/DeletableBullet';
import IconDropdown from '../components/IconDropdown';
import type { ResumeData } from '../types';

interface EditorProps {
  templateType: string;
  onDataChange: (data: ResumeData) => void;
  initialData: ResumeData;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const Editor: React.FC<EditorProps> = ({ templateType, onDataChange, initialData }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [editingField, setEditingField] = useState<{
    section: string;
    index: number;
    field: string;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent, section: 'education' | 'experience' | 'projects') => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = resumeData[section].findIndex(item => `${section}-${item.id}` === active.id);
      const newIndex = resumeData[section].findIndex(item => `${section}-${item.id}` === over?.id);
      
      const newData = {
        ...resumeData,
        [section]: arrayMove(resumeData[section], oldIndex, newIndex),
      };
      
      setResumeData(newData);
      onDataChange(newData);
    }
  };

  const handleInlineEdit = (section: string, index: number, field: string, value: string) => {
    const updatedData = { ...resumeData };
    
    switch (section) {
      case 'education':
        updatedData.education[index] = {
          ...updatedData.education[index],
          [field]: value
        };
        break;
      case 'experience':
        updatedData.experience[index] = {
          ...updatedData.experience[index],
          [field]: value
        };
        break;
      case 'projects':
        updatedData.projects[index] = {
          ...updatedData.projects[index],
          [field]: value
        };
        break;
      case 'additionalItems':
        updatedData.additionalItems[index] = {
          ...updatedData.additionalItems[index],
          [field]: value
        };
        break;
    }
    
    setResumeData(updatedData);
    onDataChange(updatedData);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    const newData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    };
    setResumeData(newData);
    onDataChange(newData);
  };

  const handlePersonalInfoDelete = (field: string) => {
    const { [field]: removedField, [`${field}Icon`]: removedIcon, ...remainingPersonalInfo } = resumeData.personalInfo;
    
    const newData = {
      ...resumeData,
      personalInfo: remainingPersonalInfo,
    };
    
    setResumeData(newData);
    onDataChange(newData);
  };

  const addNewItem = (section: 'education' | 'experience' | 'projects') => {
    const newItem = {
      id: generateId(),
      ...(section === 'education' ? {
        institution: '',
        degree: '',
        location: '',
        date: '',
        current: false,
      } : section === 'experience' ? {
        position: '',
        company: '',
        location: '',
        date: '',
        current: false,
        accomplishments: [''],
      } : {
        title: '',
        skills: '',
        location: '',
        date: '',
        current: false,
        accomplishments: [''],
      }),
    };

    const newData = {
      ...resumeData,
      [section]: [...resumeData[section], newItem],
    };
    setResumeData(newData);
    onDataChange(newData);
  };

  const addAccomplishment = (section: 'experience' | 'projects', index: number) => {
    const newData = {
      ...resumeData,
      [section]: resumeData[section].map((item, i) => 
        i === index ? {
          ...item,
          accomplishments: [...item.accomplishments, ''],
        } : item
      ),
    };
    setResumeData(newData);
    onDataChange(newData);
  };

  const handleAccomplishmentChange = (
    section: 'experience' | 'projects',
    itemIndex: number,
    accIndex: number,
    value: string
  ) => {
    setEditingField(null);
    const newData = {
      ...resumeData,
      [section]: resumeData[section].map((item, i) => 
        i === itemIndex ? {
          ...item,
          accomplishments: item.accomplishments.map((acc, j) => 
            j === accIndex ? value : acc
          ),
        } : item
      ),
    };
    setResumeData(newData);
    onDataChange(newData);
  };

  const handleDeleteEducation = (id: string) => {
    const updatedEducation = resumeData.education.filter(edu => edu.id !== id);
    const newData = { ...resumeData, education: updatedEducation };
    setResumeData(newData);
    onDataChange(newData);
  };

  const handleDeleteExperience = (id: string) => {
    const updatedExperience = resumeData.experience.filter(exp => exp.id !== id);
    const newData = { ...resumeData, experience: updatedExperience };
    setResumeData(newData);
    onDataChange(newData);
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = resumeData.projects.filter(proj => proj.id !== id);
    const newData = { ...resumeData, projects: updatedProjects };
    setResumeData(newData);
    onDataChange(newData);
  };

  const handleDeleteAccomplishment = (section: 'experience' | 'projects', itemId: string, index: number) => {
    const newData = { ...resumeData };
    const item = newData[section].find(item => item.id === itemId);
    if (item) {
      item.accomplishments = item.accomplishments.filter((_, i) => i !== index);
      setResumeData(newData);
      onDataChange(newData);
    }
  };

  const handleAddAccomplishment = (section: 'experience' | 'projects', itemId: string) => {
    const newData = { ...resumeData };
    const item = newData[section].find(item => item.id === itemId);
    if (item) {
      item.accomplishments = [...item.accomplishments, ''];
      setResumeData(newData);
      onDataChange(newData);
    }
  };

  const handleUpdateAccomplishment = (section: 'experience' | 'projects', itemId: string, index: number, value: string) => {
    const newData = { ...resumeData };
    const item = newData[section].find(item => item.id === itemId);
    if (item) {
      item.accomplishments[index] = value;
      setResumeData(newData);
      onDataChange(newData);
    }
  };

  const handleDeletePersonalInfo = (field: keyof PersonalInfo) => {
    const newData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: ''
      }
    };
    setResumeData(newData);
    onDataChange(newData);
  };

  const handleAddBullet = (section: string, index: number) => {
    const newResumeData = { ...resumeData };
    
    switch (section) {
      case 'experience':
        newResumeData.experience[index].accomplishments.push('');
        break;
      case 'projects':
        newResumeData.projects[index].accomplishments.push('');
        break;
    }
    
    setResumeData(newResumeData);
    onDataChange(newResumeData);
  };

  const handleDeleteBullet = (section: string, index: number, bulletIndex: number) => {
    const newResumeData = { ...resumeData };
    
    switch (section) {
      case 'experience':
        newResumeData.experience[index].accomplishments.splice(bulletIndex, 1);
        break;
      case 'projects':
        newResumeData.projects[index].accomplishments.splice(bulletIndex, 1);
        break;
    }
    
    setResumeData(newResumeData);
    onDataChange(newResumeData);
  };

  const handleBulletChange = (section: string, index: number, bulletIndex: number, value: string) => {
    const newResumeData = { ...resumeData };
    
    switch (section) {
      case 'experience':
        newResumeData.experience[index].accomplishments[bulletIndex] = value;
        break;
      case 'projects':
        newResumeData.projects[index].accomplishments[bulletIndex] = value;
        break;
    }
    
    setResumeData(newResumeData);
    onDataChange(newResumeData);
  };

  const availableContactFields = [
    'email',
    'phone',
    'linkedin',
    'github',
    'website'
  ];

  const handleAddContactField = (field: string) => {
    // Prevent adding if the field already exists
    if (resumeData.personalInfo[field]) return;

    const newData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: '', // Add empty field
        [`${field}Icon`]: field as ContactIconType // Add default icon
      }
    };

    setResumeData(newData);
    onDataChange(newData);
  };

  const renderPersonalInfo = () => {
    // Get all fields except 'name' and icon fields
    const contactFields = Object.keys(resumeData.personalInfo)
      .filter(field => 
        field !== 'name' && 
        !field.endsWith('Icon') && 
        resumeData.personalInfo[field] !== undefined
      );

    // Determine which fields can be added
    const addableFields = availableContactFields.filter(
      field => !resumeData.personalInfo[field]
    );

    return (
      <div className="space-y-4">
        <DeletableField
          value={resumeData.personalInfo.name}
          onChange={(value) => handlePersonalInfoChange('name', value)}
          onDelete={() => handlePersonalInfoChange('name', '')}
          placeholder="Your Name"
          isName={true}
        />
        <div className="grid grid-cols-3 gap-4">
          {contactFields.map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <IconDropdown 
                currentIcon={resumeData.personalInfo[`${field}Icon`] || 'none'}
                onChange={(icon) => {
                  if (icon === 'none') {
                    // Remove the entire field if 'none' is selected
                    handlePersonalInfoDelete(field);
                  } else {
                    handlePersonalInfoChange(`${field}Icon`, icon);
                  }
                }}
              />
              <DeletableField
                value={resumeData.personalInfo[field]}
                onChange={(value) => handlePersonalInfoChange(field, value)}
                onDelete={() => handlePersonalInfoDelete(field)}
                placeholder={`Your ${field}`}
              />
            </div>
          ))}
          
          {addableFields.length > 0 && (
            <div className="relative group">
              <button 
                onClick={() => {
                  const fieldToAdd = addableFields[0];
                  handleAddContactField(fieldToAdd);
                }}
                className="flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 opacity-50 group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add {addableFields[0]}
              </button>
              
              {addableFields.length > 1 && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {addableFields.map((field) => (
                    <button
                      key={field}
                      onClick={() => handleAddContactField(field)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Add {field}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBulletPoints = (items: string[], section: string, index: number) => {
    return (
      <div className="space-y-2">
        {items.map((item, i) => (
          <DeletableBullet
            key={i}
            value={item}
            onChange={(value) => handleBulletChange(section, index, i, value)}
            onDelete={() => handleDeleteBullet(section, index, i)}
            placeholder="Add an accomplishment"
          />
        ))}
        <button
          onClick={() => handleAddBullet(section, index)}
          className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1 pl-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add point</span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="resume-content w-full max-w-3xl mx-auto bg-white shadow-sm my-8 p-8" style={{ position: 'static', overflow: 'visible' }}>
        {/* Personal Information */}
        <div className="mb-12 space-y-4">
          {renderPersonalInfo()}
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-medium text-gray-800">Education</h2>
            <button
              onClick={() => addNewItem('education')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, 'education')}
          >
            <SortableContext
              items={resumeData.education.map(edu => `education-${edu.id}`)}
              strategy={verticalListSortingStrategy}
            >
              {resumeData.education.map((edu, index) => (
                <DraggableItem 
                  key={`education-${edu.id}`} 
                  id={`education-${edu.id}`}
                  onDelete={() => handleDeleteEducation(edu.id)}
                >
                  <div className="pl-4 mb-6 border-l-2 border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-lg font-medium">
                          <EditableField
                            value={edu.institution}
                            section="education"
                            index={index}
                            field="institution"
                            placeholder="Institution name"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                        <div className="text-gray-600">
                          <EditableField
                            value={edu.degree}
                            section="education"
                            index={index}
                            field="degree"
                            placeholder="Degree"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-gray-600">
                          <EditableField
                            value={edu.location}
                            section="education"
                            index={index}
                            field="location"
                            placeholder="Location"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                        <div className="text-gray-500">
                          <EditableField
                            value={edu.date}
                            section="education"
                            index={index}
                            field="date"
                            placeholder="Date Range (e.g. 2020 - 2024)"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </DraggableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-medium text-gray-800">Experience</h2>
            <button
              onClick={() => addNewItem('experience')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, 'experience')}
          >
            <SortableContext
              items={resumeData.experience.map(exp => `experience-${exp.id}`)}
              strategy={verticalListSortingStrategy}
            >
              {resumeData.experience.map((exp, index) => (
                <DraggableItem 
                  key={`experience-${exp.id}`} 
                  id={`experience-${exp.id}`}
                  onDelete={() => handleDeleteExperience(exp.id)}
                >
                  <div className="pl-4 mb-6 border-l-2 border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <div className="text-lg font-medium">
                          <EditableField
                            value={exp.position}
                            section="experience"
                            index={index}
                            field="position"
                            placeholder="Job Position"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                        <div className="text-gray-600">
                          <EditableField
                            value={exp.company}
                            section="experience"
                            index={index}
                            field="company"
                            placeholder="Company Name"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-gray-600">
                          <EditableField
                            value={exp.location}
                            section="experience"
                            index={index}
                            field="location"
                            placeholder="Location"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                        <div className="text-gray-500">
                          <EditableField
                            value={exp.date}
                            section="experience"
                            index={index}
                            field="date"
                            placeholder="Date Range (e.g. 2020 - 2024)"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                      </div>
                    </div>
                    {renderBulletPoints(exp.accomplishments, 'experience', index)}
                  </div>
                </DraggableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-medium text-gray-800">Projects</h2>
            <button
              onClick={() => addNewItem('projects')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, 'projects')}
          >
            <SortableContext
              items={resumeData.projects.map(proj => `projects-${proj.id}`)}
              strategy={verticalListSortingStrategy}
            >
              {resumeData.projects.map((proj, index) => (
                <DraggableItem 
                  key={`projects-${proj.id}`} 
                  id={`projects-${proj.id}`}
                  onDelete={() => handleDeleteProject(proj.id)}
                >
                  <div className="pl-4 mb-6 border-l-2 border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 flex-grow">
                        <div className="text-lg font-medium flex items-center">
                          <EditableField
                            value={proj.title}
                            section="projects"
                            index={index}
                            field="title"
                            placeholder="Project Title"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                        <div className="text-gray-600 flex items-center">
                          <EditableField
                            value={proj.skills}
                            section="projects"
                            index={index}
                            field="skills"
                            placeholder="Skills Used"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-gray-600">
                          <EditableField
                            value={proj.location}
                            section="projects"
                            index={index}
                            field="location"
                            placeholder="Location"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                        <div className="text-gray-500">
                          <EditableField
                            value={proj.date}
                            section="projects"
                            index={index}
                            field="date"
                            placeholder="Date Range (e.g. 2020 - 2024)"
                            onEdit={handleInlineEdit}
                          />
                        </div>
                      </div>
                    </div>
                    {renderBulletPoints(proj.accomplishments, 'projects', index)}
                  </div>
                </DraggableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default Editor;

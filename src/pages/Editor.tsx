import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from '../components/DateRangePicker';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import DraggableItem from '../components/DraggableItem';
import EditableField from '../components/EditableField';
import DeletableField from '../components/DeletableField';
import DeletableBullet from '../components/DeletableBullet';
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
    if (section === 'personalInfo') {
      const newData = {
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          [field]: value,
        },
      };
      setResumeData(newData);
      onDataChange(newData);
      return;
    }

    const newData = {
      ...resumeData,
      [section]: resumeData[section as keyof ResumeData].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
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
        startDate: '',
        endDate: undefined,
        current: false,
      } : section === 'experience' ? {
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: undefined,
        current: false,
        accomplishments: [''],
      } : {
        title: '',
        skills: '',
        startDate: '',
        endDate: undefined,
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

  const handleDateRangeChange = (
    section: 'education' | 'experience' | 'projects', 
    index: number, 
    startDate: string | null, 
    endDate: string | null, 
    current: boolean
  ) => {
    const newData = {
      ...resumeData,
      [section]: resumeData[section].map((item, i) => 
        i === index ? { 
          ...item, 
          startDate: startDate || '', 
          endDate: endDate || undefined,
          current 
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

  const renderPersonalInfo = () => {
    const contactIcons = {
      email: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      phone: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      linkedin: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      github: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    };

    return (
      <div className="space-y-4">
        <DeletableField
          value={resumeData.personalInfo.name}
          onChange={(value) => handleInlineEdit('personalInfo', 0, 'name', value)}
          onDelete={() => handleDeletePersonalInfo('name')}
          placeholder="Your Name"
        />
        <div className="grid grid-cols-2 gap-4">
          {(Object.keys(contactIcons) as Array<keyof typeof contactIcons>).map((field) => (
            <DeletableField
              key={field}
              value={resumeData.personalInfo[field]}
              onChange={(value) => handleInlineEdit('personalInfo', 0, field, value)}
              onDelete={() => handleDeletePersonalInfo(field)}
              placeholder={`Your ${field}`}
              icon={contactIcons[field]}
            />
          ))}
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
    <div className="min-h-screen p-4 bg-white">
      <div className="max-w-3xl mx-auto">
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
                          <DateRangePicker
                            startDate={edu.startDate}
                            endDate={edu.endDate}
                            current={edu.current}
                            onChange={(startDate, endDate, current) => 
                              handleDateRangeChange('education', index, startDate, endDate, current)
                            }
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
                          <DateRangePicker
                            startDate={exp.startDate}
                            endDate={exp.endDate}
                            current={exp.current}
                            onChange={(startDate, endDate, current) => 
                              handleDateRangeChange('experience', index, startDate, endDate, current)
                            }
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
                        <div className="text-gray-500">
                          <DateRangePicker
                            startDate={proj.startDate}
                            endDate={proj.endDate}
                            current={proj.current}
                            onChange={(startDate, endDate, current) => 
                              handleDateRangeChange('projects', index, startDate, endDate, current)
                            }
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

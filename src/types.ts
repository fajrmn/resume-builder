export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  accomplishments: string[];
}

export interface Project {
  id: string;
  title: string;
  skills: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  accomplishments: string[];
}

export type ContactIconType = 'phone' | 'email' | 'contact' | 'linkedin' | 'github' | 'website' | 'none';

export interface PersonalInfo {
  name: string;
  [key: string]: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

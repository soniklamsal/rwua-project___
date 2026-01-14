
export interface ImpactStory {
  id: string;
  name: string;
  location: string;
  content: string;
  imageUrl: string;
  category: 'Entrepreneurship' | 'Education' | 'Leadership' | 'Agriculture';
}

export interface ProjectLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  impactCount: number;
  description: string;
}

export interface ImpactDataPoint {
  year: string;
  womenReached: number;
  projectsCompleted: number;
}

// Added NewsUpdate interface to resolve export error in constants.tsx
export interface NewsUpdate {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string;
}

// Vacancy types
export interface VacancyCardProps {
  vacancy: {
    id: string;
    position: string;
    description: string;
    department: string;
    deadline: string;
    location: string;
    tags: string[];
    image?: string;
    status: 'open' | 'closed';
  };
  className?: string;
}

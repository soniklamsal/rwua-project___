// Basic WordPress types for Faust.js integration
export interface WordPressPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  status: 'publish' | 'draft' | 'private';
  author: {
    node: {
      name: string;
      slug: string;
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  tags: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface WordPressPage {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  modified: string;
  status: 'publish' | 'draft' | 'private';
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
}

export interface WordPressMenu {
  id: string;
  name: string;
  menuItems: {
    nodes: Array<{
      id: string;
      label: string;
      url: string;
      target?: string;
      cssClasses: string[];
      parentId?: string;
    }>;
  };
}

// Impact Hero specific types
export interface ImpactHeroFields {
  heroSubtitle: string;
  heroTitle1: string;
  heroTitleItalic: string;
  heroTitle2: string;
  heroTitleEnd: string;
  heroVision: string;
  heroMission: string;
  heroBadgeNum: string;
  heroQuote: string;
  heroImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface ImpactHero {
  title: string;
  impactHeroFields: ImpactHeroFields;
}

export interface ImpactHeroData {
  impactHeroes: {
    nodes: ImpactHero[];
  };
}

// Mission Section specific types
export interface MissionCard {
  cardLabel: string;
  cardImage?: {
    node?: {
      sourceUrl?: string;
    };
  } | null;
}

export interface MissionFields {
  missionTitle1: string;
  missionTitleItalic: string;
  missionGoal: string;
  missionCtaText: string;
  missionCards: MissionCard[];
}

export interface Mission {
  missionFields: MissionFields;
}

export interface MissionData {
  missions: {
    nodes: Mission[];
  };
}

// Focus Areas specific types
export interface FocusCard {
  title: string;
  desc: string;
  metric: string;
}

export interface FocusAreaFieldsType {
  focusCards: FocusCard[];
}

export interface FocusArea {
  title: string;
  focusAreaFieldsType: FocusAreaFieldsType;
}

export interface FocusAreasData {
  focusArea: FocusArea;
}

// Showcase Members specific types
export interface ShowcaseMember {
  id?: string;
  name: string;
  nepaliName: string;
  role: string;
  quote: string;
  phone: string;
  description?: string;
  imageUrl?: string;
  bgImageUrl?: string;
  altText?: string;
  accentColor?: string;
  memberUrl?: {
    node?: {
      sourceUrl?: string;
      mediaItemUrl?: string;
    };
  } | null;
  bgImage?: {
    node?: {
      sourceUrl?: string;
      mediaItemUrl?: string;
    };
  } | null;
}

export interface ShowcaseMemberFieldsType {
  members: ShowcaseMember[];
}

export interface ShowcaseMemberNode {
  id: string;
  title: string;
  showcaseMemberFieldsType: ShowcaseMemberFieldsType;
}

export interface ShowcaseMembersData {
  showcaseMembers: {
    nodes: ShowcaseMemberNode[];
  };
}

// About Section specific types
export interface AboutImageStack {
  tagline: string;
  cardImage?: {
    node?: {
      id?: string;
      sourceUrl?: string;
    };
  } | null;
}

export interface AboutPageFieldsType {
  sectionTitle: string;
  sectionTitleItalic: string;
  nepaliDescription: string;
  imageStack: AboutImageStack[];
}

export interface AboutFieldNode {
  aboutPageFieldsType: AboutPageFieldsType;
}

export interface AboutSectionData {
  aboutFields: {
    nodes: AboutFieldNode[];
  };
}

// Faust.js specific types
export interface FaustTemplate {
  Component: React.ComponentType<any>;
  variables?: (context: any) => Record<string, any>;
  query?: string;
}

export interface FaustContext {
  asPreview?: boolean;
  params?: Record<string, string | string[]>;
  query?: Record<string, string | string[]>;
}

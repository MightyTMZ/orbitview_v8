import { StaticImageData } from "next/image";

interface Link {
  title: string | null;
  link: string;
  icon?: React.ReactNode; // react icon for example
}

interface SocialLink {
  platform: "linkedin" | "github" | "twitter" | "website" | "other";
  url: string;
  username?: string; // e.g., "@tomsmith" for display
  icon?: React.ReactNode; // auto-generate based on platform
}

export interface Image {
  image: StaticImageData;
  url: string; // on CDN
  alt: string | null;
}

// for uploading context in files
export interface ContextFile {
  file: File;
  title: string;
  uploadedDate: string;
}

export interface Work {
  title: string;
  description: string;
  cover_image: Image | null;
  images?: Image[];
  links: Link[];
  status: "completed" | "in-progress" | "archived"; // instead of separate interface
  start_date?: string;
  end_date?: string;
  tags?: string[]; // e.g., ["AI/ML", "hackathon", "climate-tech"]
  impact?: string; // quantifiable results: "500+ users", "Won 1st place"
  tech_stack?: string[]; // ["React", "Python", "OpenAI"]
}


export interface Accomplishment {
  title: string;
  issuer: string;
  description: string;
  date: string;
  type: "award" | "publication" | "speaking" | "certification" | "competition";
  link?: string;
}

// when starting a conversation with an OrbitView profile, the user can select the tone it wants to talk the person in
// Phoebe Gates evaluating someone for Phia might want a professional, detailed tone
// A hackathon kid might want casual and witty
// Someone recruiting co-founders might want direct and values-forward
export interface AIPersonality {
  tone: "professional" | "casual" | "friendly" | "witty" | "technical";
  formality_level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 1 = very casual, 5 = very formal
  custom_instructions?: string; // "Always mention my passion for climate tech" or "Use analogies when explaining technical concepts"
  response_length: "concise" | "balanced" | "detailed";
  personality_traits?: string[]; // ["enthusiastic", "humble", "direct"]
}

export interface PrivacySettings {
  is_public: boolean; // default: false
  visibility: "private" | "unlisted" | "public";
  // private = only accessible if you have exact link
  // unlisted = not indexed, but link works
  // public = indexed, discoverable
  shareable_link_enabled: boolean; // can user share the link?
  password_protected?: string; // optional password for extra privacy
  allowed_domains?: string[]; // only people with @stanford.edu can view
}

export interface OrbitViewProfile {
  first_name: string;
  last_name: string;
  profile_picture: Image;
  username: string; // also must be unique
  metadata: {
    created_at: string;
    updated_at: string;
    is_public: boolean;
    profile_completion: number; // 0-100%
    custom_domain?: string; // for premium users: tom.dev instead of orbitview.com/tom
  };
  byline: string;
  aboutlines?: string[]; // World-class Engineer, First-Principles Polymath, etc.
  about: string;
  nicknames?: string[];
  works: Work[];
  social_links: SocialLink[];
  skills: string;
  values?: string[]; // ["Move fast", "Build in public", "First principles thinking"]
  working_style?: string; // prose description
  accomplishments?: Accomplishment[];
  context_files?: ContextFile[];
  looking_for?: {
    opportunities: string[]; // ["Co-founder", "Internship", "Collaborators"]
    ideal_role?: string;
    deal_breakers?: string[];
  };
  analytics: {
    total_views: number;
    total_conversations: number;
    popular_questions?: string[]; // most asked questions
  };
  privacy: PrivacySettings;
}

export interface Conversation {
  id: string;
  timestamp: string;
  messages: Message[];
  visitor_id?: string; // anonymous or authenticated
  // when starting a conversation with an OrbitView profile, the user can select the tone it wants to talk the person in
  // Phoebe Gates evaluating someone for Phia might want a professional, detailed tone
  // A hackathon kid might want casual and witty
  // Someone recruiting co-founders might want direct and values-forward
  ai_personality: AIPersonality;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}


export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  thumbnail: string;
  category: string;
  type: 'video' | 'audio' | 'text';
  audioUrl?: string;
  videoUrl?: string;
  notes: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: 'Service' | 'Conference' | 'Youth' | 'Community';
}

export interface Devotion {
  id: string;
  title: string;
  scripture: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

export interface ChurchSettings {
  accountNumber: string; // Mobile Money
  currency: string;
  bankName: string;
  bankAccountNumber: string;
  presetAmounts: string[];
}

export interface StaffMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimony {
  id: string;
  name: string;
  content: string;
  date: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  type: string;
  content: string;
  date: string;
  isUrgent: boolean;
  status: 'Pending' | 'Prayed' | 'Followed Up';
  pastoralResponse?: string;
}

export interface NewMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  interests: string[];
  date: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Member';
}

export type Page = 'home' | 'about' | 'ministries' | 'sermons' | 'events' | 'give' | 'prayer' | 'contact' | 'membership' | 'admin' | 'devotions';

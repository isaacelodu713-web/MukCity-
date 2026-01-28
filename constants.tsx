
import React from 'react';
import { Sermon, ChurchEvent, StaffMember, Devotion } from './types';
import { 
  Users, 
  Heart, 
  Music, 
  Baby, 
  ShieldCheck, 
  Mic2,
  Calendar,
  PlayCircle,
  Clock,
  MapPin
} from 'lucide-react';

export const CHURCH_NAME = "Suubira Victory Ministries";
export const SLOGAN = "A Home for Faith, Hope, and Love";

export const MOCK_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'Walking in Divine Purpose',
    preacher: 'Senior Pastor David Johnson',
    date: '2024-05-12',
    thumbnail: 'https://picsum.photos/seed/sermon1/800/450',
    category: 'Spiritual Growth',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    notes: 'Today we explore what it means to align your daily walk with the calling of God.',
  },
  {
    id: '2',
    title: 'The Power of Unwavering Faith',
    preacher: 'Associate Pastor Sarah Williams',
    date: '2024-05-05',
    thumbnail: 'https://picsum.photos/seed/sermon2/800/450',
    category: 'Faith',
    type: 'audio',
    audioUrl: 'https://example.com/audio.mp3',
    notes: 'Faith is not the absence of doubt, but the presence of belief in action.',
  },
  {
    id: '3',
    title: 'Living in the Spirit',
    preacher: 'Bishop Elijah Thompson',
    date: '2024-04-28',
    thumbnail: 'https://picsum.photos/seed/sermon3/800/450',
    category: 'Theology',
    type: 'text',
    notes: 'A deep dive into the fruits of the Spirit and their impact on community.',
  }
];

export const MOCK_EVENTS: ChurchEvent[] = [
  {
    id: 'e1',
    title: 'Annual Youth Revival',
    date: 'June 15-17, 2024',
    time: '6:30 PM',
    location: 'Main Sanctuary',
    description: 'A three-day encounter for the next generation. Join us for powerful worship and word.',
    image: 'https://picsum.photos/seed/event1/800/450',
    category: 'Youth'
  },
  {
    id: 'e2',
    title: 'Marriage Enrichment Seminar',
    date: 'July 10, 2024',
    time: '9:00 AM',
    location: 'Fellowship Hall',
    description: 'Building stronger foundations for families. Lunch will be provided.',
    image: 'https://picsum.photos/seed/event2/800/450',
    category: 'Community'
  }
];

export const MOCK_DEVOTIONS: Devotion[] = [
  {
    id: 'd1',
    title: 'Strength for the Journey',
    scripture: 'Isaiah 40:31',
    content: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint. In seasons of exhaustion, remember that God is the source of endless vitality...',
    author: 'Pastor David Johnson',
    date: '2024-05-20',
    image: 'https://picsum.photos/seed/devotion1/800/450'
  },
  {
    id: 'd2',
    title: 'The Peace of Presence',
    scripture: 'Psalm 23:1-3',
    content: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters... Today, take a moment to rest in His provision. The chaos of the world cannot penetrate the peace of His presence.',
    author: 'Sarah Williams',
    date: '2024-05-19',
    image: 'https://picsum.photos/seed/devotion2/800/450'
  }
];

export const MINISTRIES = [
  { name: 'Youth Ministry', icon: <Users size={24} />, description: 'Empowering the next generation to lead for Christ.' },
  { name: 'Womens Fellowship', icon: <Heart size={24} />, description: 'Connecting women through prayer and sisterhood.' },
  { name: 'Mens Ministry', icon: <ShieldCheck size={24} />, description: 'Building men of integrity and spiritual strength.' },
  { name: 'Childrens Church', icon: <Baby size={24} />, description: 'Nurturing little hearts in the way of the Lord.' },
  { name: 'Choir & Worship', icon: <Music size={24} />, description: 'Leading the congregation in spirit-filled praise.' },
  { name: 'Media & Tech', icon: <Mic2 size={24} />, description: 'Spreading the gospel through digital platforms.' },
];

export const STAFF: StaffMember[] = [
  {
    name: "Dr. David Johnson",
    role: "Senior Pastor",
    bio: "With over 20 years of ministry, Pastor David is passionate about community transformation.",
    image: "https://picsum.photos/seed/pastor1/400/400"
  },
  {
    name: "Pastor Sarah Williams",
    role: "Associate Pastor",
    bio: "A gifted teacher focused on discipleship and spiritual formation.",
    image: "https://picsum.photos/seed/pastor2/400/400"
  }
];

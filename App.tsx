
import React, { useState } from 'react';
import { Page, Sermon, ChurchEvent, PrayerRequest, NewMember, Devotion, ChurchSettings } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Ministries from './pages/Ministries';
import Sermons from './pages/Sermons';
import Events from './pages/Events';
import Give from './pages/Give';
import Prayer from './pages/Prayer';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Devotions from './pages/Devotions';
import SpiritualGuide from './components/SpiritualGuide';
import { MOCK_SERMONS, MOCK_EVENTS, MOCK_DEVOTIONS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Global State for data management
  const [sermons, setSermons] = useState<Sermon[]>(MOCK_SERMONS);
  const [events, setEvents] = useState<ChurchEvent[]>(MOCK_EVENTS);
  const [devotions, setDevotions] = useState<Devotion[]>(MOCK_DEVOTIONS);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [members, setMembers] = useState<NewMember[]>([]);
  const [settings, setSettings] = useState<ChurchSettings>({
    accountNumber: '0772000123',
    currency: 'UGX',
    bankName: 'Stanbic Bank',
    bankAccountNumber: '9030012345678',
    presetAmounts: ['5000', '10000', '20000', '50000', '100000']
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} sermons={sermons} devotions={devotions} />;
      case 'about':
        return <About />;
      case 'ministries':
        return <Ministries />;
      case 'sermons':
        return <Sermons sermons={sermons} />;
      case 'events':
        return <Events events={events} />;
      case 'give':
        return <Give settings={settings} />;
      case 'prayer':
        return <Prayer />;
      case 'membership':
        return <Membership />;
      case 'contact':
        return <Contact />;
      case 'devotions':
        return <Devotions devotions={devotions} />;
      case 'admin':
        return (
          <Admin 
            sermons={sermons} 
            setSermons={setSermons}
            events={events}
            setEvents={setEvents}
            devotions={devotions}
            setDevotions={setDevotions}
            prayerRequests={prayerRequests}
            setPrayerRequests={setPrayerRequests}
            members={members}
            setMembers={setMembers}
            settings={settings}
            setSettings={setSettings}
            isLoggedIn={isAdminLoggedIn}
            setIsLoggedIn={setIsAdminLoggedIn}
          />
        );
      default:
        return <Home setPage={setCurrentPage} sermons={sermons} devotions={devotions} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setPage={setCurrentPage}>
      {renderPage()}
      <SpiritualGuide />
    </Layout>
  );
};

export default App;

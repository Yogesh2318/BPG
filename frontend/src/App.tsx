import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FAB } from './components/FAB';
import { Dashboard } from './pages/Dashboard';
import { Collection } from './pages/Collection';
import { PlantDetail } from './pages/PlantDetail';
import { SunlightMap } from './pages/SunlightMap';
import { Scheduler } from './pages/Scheduler';
import { Gamification } from './pages/Gamification';
import { Sustainability } from './pages/Sustainability';
import { Settings } from './pages/Settings';
import {
  demoPlants,
  demoWaterEvents,
  demoUserProfile,
  demoWaterSavingsData,
  demoBalconyMap,
  demoSchedules,
  funFacts,
} from './utils/demoData';
import type { Plant, WaterEvent, UserProfile, BalconyMap, WaterSchedule } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline] = useState(true);
  
  // State management (simulating IndexedDB)
  const [plants, setPlants] = useState<Plant[]>(demoPlants);
  const [waterEvents, setWaterEvents] = useState<WaterEvent[]>(demoWaterEvents);
  const [userProfile, setUserProfile] = useState<UserProfile>(demoUserProfile);
  const [balconyMap, setBalconyMap] = useState<BalconyMap>(demoBalconyMap);
  const [schedules, setSchedules] = useState<WaterSchedule[]>(demoSchedules);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', userProfile.preferences.theme);
    document.documentElement.style.setProperty('--accent-user', userProfile.preferences.accentColor);
  }, [userProfile.preferences.theme, userProfile.preferences.accentColor]);
  
  // Navigation
  const handleNavigate = (page: string, plantId?: string) => {
    setCurrentPage(page);
    if (plantId) {
      setSelectedPlantId(plantId);
    }
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };
  
  // Water plant action
  const handleWaterPlant = (plantId: string, amount: number = 250) => {
    const newEvent: WaterEvent = {
      id: `w-${Date.now()}`,
      plantId,
      date: new Date(),
      amount,
    };
    
    setWaterEvents([...waterEvents, newEvent]);
    
    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        const nextWaterDue = new Date();
        nextWaterDue.setDate(nextWaterDue.getDate() + (plant.waterNeed === 'high' ? 1 : plant.waterNeed === 'medium' ? 3 : 7));
        return {
          ...plant,
          lastWatered: new Date(),
          nextWaterDue,
        };
      }
      return plant;
    }));
    
    // Update points
    setUserProfile({
      ...userProfile,
      points: userProfile.points + 2,
    });
    
    showNotification(`Watered ${plants.find(p => p.id === plantId)?.name} • +2 pts`);
  };
  
  // Toggle checklist item
  const handleToggleChecklistItem = (plantId: string, itemId: string) => {
    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        const updatedItems = plant.checklistItems.map(item => {
          if (item.id === itemId) {
            const completed = !item.completed;
            if (completed) {
              setUserProfile({
                ...userProfile,
                points: userProfile.points + item.points,
              });
              showNotification(`Checklist completed • +${item.points} pts`);
            }
            return {
              ...item,
              completed,
              completedAt: completed ? new Date() : undefined,
            };
          }
          return item;
        });
        return { ...plant, checklistItems: updatedItems };
      }
      return plant;
    }));
  };
  
  // Update preferences
  const handleUpdatePreferences = (preferences: Partial<UserProfile['preferences']>) => {
    setUserProfile({
      ...userProfile,
      preferences: { ...userProfile.preferences, ...preferences },
    });
    showNotification('Preferences updated');
  };
  
  // Export/Import data
  const handleExportData = () => {
    const data = {
      plants,
      waterEvents,
      userProfile,
      balconyMap,
      schedules,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `balconyfarm-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showNotification('Data exported successfully');
  };
  
  const handleImportData = () => {
    showNotification('Import feature coming soon');
  };
  
  // Snackbar notification
  const showNotification = (message: string) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };
  
  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            plants={plants}
            waterData={demoWaterSavingsData}
            userProfile={userProfile}
            funFacts={funFacts}
            onNavigate={handleNavigate}
            onWaterPlant={handleWaterPlant}
          />
        );
      
      case 'collection':
        return (
          <Collection
            plants={plants}
            onNavigate={handleNavigate}
            onWaterPlant={handleWaterPlant}
          />
        );
      
      case 'plant-detail':
        const selectedPlant = plants.find(p => p.id === selectedPlantId);
        if (!selectedPlant) {
          handleNavigate('collection');
          return null;
        }
        return (
          <PlantDetail
            plant={selectedPlant}
            waterEvents={waterEvents}
            onBack={() => handleNavigate('collection')}
            onWaterPlant={handleWaterPlant}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        );
      
      case 'map':
        return (
          <SunlightMap
            map={balconyMap}
            plants={plants}
            onSaveMap={(map) => {
              setBalconyMap(map);
              showNotification('Map saved successfully');
            }}
          />
        );
      
      case 'scheduler':
        return (
          <Scheduler
            schedules={schedules}
            plants={plants}
            onAddSchedule={() => showNotification('Add schedule feature coming soon')}
            onEditSchedule={(id) => showNotification(`Edit schedule ${id}`)}
            onDeleteSchedule={(id) => {
              setSchedules(schedules.filter(s => s.id !== id));
              showNotification('Schedule deleted');
            }}
          />
        );
      
      case 'gamification':
        return (
          <Gamification
            userProfile={userProfile}
            onShareBadge={(id) => showNotification('Badge shared!')}
          />
        );
      
      case 'sustainability':
        const totalWaterSaved = demoWaterSavingsData.reduce((sum, d) => sum + d.saved, 0) / 1000;
        return (
          <Sustainability
            totalWaterSaved={totalWaterSaved}
            plants={plants}
          />
        );
      
      case 'settings':
        return (
          <Settings
            userProfile={userProfile}
            onUpdatePreferences={handleUpdatePreferences}
            onExportData={handleExportData}
            onImportData={handleImportData}
          />
        );
      
      default:
        return <Dashboard plants={plants} waterData={demoWaterSavingsData} userProfile={userProfile} funFacts={funFacts} onNavigate={handleNavigate} onWaterPlant={handleWaterPlant} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#F3F1ED] overflow-x-hidden">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <Navigation
              currentPage={currentPage}
              onNavigate={handleNavigate}
              mobile
              onClose={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Two-Column Layout for Desktop */}
      <div className="flex overflow-x-hidden">
        {/* Left Column: Desktop Navigation */}
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        
        {/* Right Column: Main Content Area */}
        <div className="flex-1 min-h-screen flex flex-col min-w-0">
          <Header
            userName={userProfile.name}
            isOnline={isOnline}
            onMenuClick={() => setMobileMenuOpen(true)}
          />
          
          <main className="flex-1 px-4 lg:px-8 py-6 pb-24 max-w-[1600px] w-full mx-auto">
            {renderPage()}
          </main>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <FAB
        onAddPlant={() => showNotification('Add plant feature coming soon')}
        onWaterAll={() => {
          plants.filter(p => p.ownership === 'owned').forEach(p => handleWaterPlant(p.id));
          showNotification('All plants watered!');
        }}
        onEditMap={() => handleNavigate('map')}
      />
      
      {/* Snackbar */}
      <AnimatePresence>
        {showSnackbar && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--navy-900)] text-white px-6 py-3 rounded-[var(--radius-lg)] shadow-[var(--shadow-modal)] animate-fade-in"
            style={{
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            {snackbarMessage}
          </div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
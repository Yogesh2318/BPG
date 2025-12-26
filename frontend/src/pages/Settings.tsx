import React, { useState } from 'react';
import { User, Bell, Palette, Moon, Sun, Download, Upload, HelpCircle, ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import type { UserProfile } from '../types';

interface SettingsProps {
  userProfile: UserProfile;
  onUpdatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  onExportData: () => void;
  onImportData: () => void;
}

export function Settings({ userProfile, onUpdatePreferences, onExportData, onImportData }: SettingsProps) {
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'appearance' | 'data' | 'help'>('profile');
  
  const accentColors = [
    { name: 'Green', value: '#2F7A4A' },
    { name: 'Terracotta', value: '#C4563A' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#9333EA' },
    { name: 'Teal', value: '#14B8A6' },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">⚙️ Settings</h2>
        <p className="text-[var(--text-muted)]">Manage your preferences and account settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card paper className="p-4 h-fit">
          <nav className="space-y-2">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'appearance', label: 'Appearance', icon: Palette },
              { id: 'data', label: 'Data & Backup', icon: Download },
              { id: 'help', label: 'Help & Support', icon: HelpCircle },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center justify-between p-3 rounded-[var(--radius-md)] transition-all ${
                    activeSection === item.id
                      ? 'bg-[var(--green-100)] text-[var(--green-700)]'
                      : 'hover:bg-[var(--bg-tertiary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              );
            })}
          </nav>
        </Card>
        
        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSection === 'profile' && (
            <Card paper className="p-6">
              <h3 className="mb-6">👤 Profile Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-[var(--text-muted)] mb-2 block">Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    readOnly
                    className="w-full px-4 py-2 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)] bg-[var(--bg-primary)] cursor-not-allowed opacity-75"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-[var(--text-muted)] mb-2 block">Units</label>
                  <select
                    value={userProfile.preferences.units}
                    onChange={(e) => onUpdatePreferences({ units: e.target.value as any })}
                    className="w-full px-4 py-3 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)] bg-[var(--bg-primary)]"
                  >
                    <option value="liters">Liters (L, mL)</option>
                    <option value="gallons">Gallons (gal, oz)</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-[var(--muted-300)]">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div>
                      <p className="mb-1">Cloud Sync</p>
                      <p className="text-sm text-[var(--text-muted)]">Sync your data across devices</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.preferences.cloudSync}
                        onChange={(e) => onUpdatePreferences({ cloudSync: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-[var(--gray-300)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--green-200)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[var(--gray-300)] after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--green-600)]"></div>
                    </label>
                  </div>
                  
                  {!userProfile.preferences.cloudSync && (
                    <div className="p-5 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
                      <p className="text-sm">
                        <strong>Privacy:</strong> Your data is stored locally on this device only. 
                        Enable cloud sync to access your garden from anywhere.
                      </p>
                    </div>
                  )}
                </div>
                
                <Button variant="primary">Save Changes</Button>
              </div>
            </Card>
          )}
          
          {activeSection === 'notifications' && (
            <Card paper className="p-6">
              <h3 className="mb-6">🔔 Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Enable Notifications</p>
                    <p className="text-sm text-[var(--text-muted)]">Receive watering reminders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userProfile.preferences.notifications}
                      onChange={(e) => onUpdatePreferences({ notifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-[var(--gray-300)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--green-200)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[var(--gray-300)] after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--green-600)]"></div>
                  </label>
                </div>
                
                {userProfile.preferences.notifications && (
                  <>
                    <div className="pt-4 border-t border-[var(--muted-300)]">
                      <label className="text-sm text-[var(--text-muted)] mb-2 block">Quiet Hours</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[var(--text-muted)] mb-1 block">Start</label>
                          <input
                            type="time"
                            value={userProfile.preferences.quietHours.start}
                            onChange={(e) => onUpdatePreferences({
                              quietHours: { ...userProfile.preferences.quietHours, start: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)] bg-[var(--bg-primary)]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--text-muted)] mb-1 block">End</label>
                          <input
                            type="time"
                            value={userProfile.preferences.quietHours.end}
                            onChange={(e) => onUpdatePreferences({
                              quietHours: { ...userProfile.preferences.quietHours, end: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-[var(--muted-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--green-600)] bg-[var(--bg-primary)]"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
                      <p className="text-sm">
                        📱 <strong>Local notifications only:</strong> All reminders are generated on your device. 
                        No data is sent to external servers.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}
          
          {activeSection === 'appearance' && (
            <Card paper className="p-6">
              <h3 className="mb-6">🎨 Appearance</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-[var(--text-muted)] mb-3 block">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'high-contrast'].map(theme => (
                      <button
                        key={theme}
                        onClick={() => onUpdatePreferences({ theme: theme as any })}
                        className={`p-4 border-2 rounded-[var(--radius-md)] transition-all ${
                          userProfile.preferences.theme === theme
                            ? 'border-[var(--green-600)] bg-[var(--green-100)]'
                            : 'border-[var(--muted-300)] hover:border-[var(--green-400)]'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          {theme === 'light' && <Sun className="w-6 h-6" />}
                          {theme === 'dark' && <Moon className="w-6 h-6" />}
                          {theme === 'high-contrast' && <Palette className="w-6 h-6" />}
                        </div>
                        <p className="text-sm capitalize">{theme.replace('-', ' ')}</p>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-[var(--text-muted)] mb-3 block">Accent Color</label>
                  <div className="grid grid-cols-5 gap-3">
                    {accentColors.map(color => (
                      <button
                        key={color.value}
                        onClick={() => onUpdatePreferences({ accentColor: color.value })}
                        className={`aspect-square rounded-[var(--radius-md)] border-2 transition-all ${
                          userProfile.preferences.accentColor === color.value
                            ? 'border-[var(--text-primary)] scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
                  <p className="text-sm">
                    <strong>Note:</strong> Theme changes will apply immediately. 
                    Your preference is saved locally and persists across sessions.
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          {activeSection === 'data' && (
            <Card paper className="p-6">
              <h3 className="mb-6">💾 Data & Backup</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-[var(--green-100)] rounded-[var(--radius-md)]">
                  <p className="text-sm text-[var(--green-700)]">
                    <strong>Storage:</strong> All your plant data, watering logs, and settings are stored locally 
                    using IndexedDB. Your data remains private and under your control.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="primary" 
                    className="w-full"
                    icon={<Download className="w-5 h-5" />}
                    onClick={onExportData}
                  >
                    Export Data (JSON)
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    icon={<Upload className="w-5 h-5" />}
                    onClick={onImportData}
                  >
                    Import Data
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-[var(--muted-300)]">
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    Last backup: Never (cloud sync disabled)
                  </p>
                  
                  {!userProfile.preferences.cloudSync && (
                    <div className="p-4 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
                      <p className="text-sm mb-3">
                        <strong>Tip:</strong> Export your data regularly to prevent data loss. 
                        Enable cloud sync for automatic backups.
                      </p>
                      <Button variant="ghost" size="sm">
                        Enable Cloud Sync →
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-[var(--terracotta-300)]">
                  <Button variant="danger" className="w-full">
                    Clear All Data
                  </Button>
                  <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          {activeSection === 'help' && (
            <Card paper className="p-6">
              <h3 className="mb-6">❓ Help & Support</h3>
              
              <div className="space-y-4">
                <button className="w-full p-4 text-left border border-[var(--muted-300)] rounded-[var(--radius-md)] hover:bg-[var(--bg-tertiary)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">🎬 Replay Onboarding</p>
                      <p className="text-sm text-[var(--text-muted)]">Go through the welcome tutorial again</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                </button>
                
                <button className="w-full p-4 text-left border border-[var(--muted-300)] rounded-[var(--radius-md)] hover:bg-[var(--bg-tertiary)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">📖 User Guide</p>
                      <p className="text-sm text-[var(--text-muted)]">Learn about all features and best practices</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                </button>
                
                <button className="w-full p-4 text-left border border-[var(--muted-300)] rounded-[var(--radius-md)] hover:bg-[var(--bg-tertiary)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">💬 Contact Support</p>
                      <p className="text-sm text-[var(--text-muted)]">Get help via email</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                </button>
                
                <div className="pt-4 border-t border-[var(--muted-300)]">
                  <div className="p-4 bg-[var(--muted-100)] rounded-[var(--radius-md)]">
                    <p className="text-sm mb-2"><strong>About BalconyFarm Buddy</strong></p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Version 1.0.0<br />
                      A Progressive Web App for urban balcony gardeners<br />
                      Built with privacy and sustainability in mind
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
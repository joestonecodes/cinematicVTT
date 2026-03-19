import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CircleHelp, 
  Bell, 
  User, 
  Rocket, 
  Sparkles, 
  Package, 
  Layers, 
  MessageSquare, 
  Map as MapIcon, 
  LifeBuoy,
  Plus,
  ArrowRight,
  LayoutGrid,
  List,
  Maximize2,
  Settings as SettingsIcon,
  Search,
  Upload,
  History,
  Circle,
  Mic,
  X,
  Grid3X3,
  MousePointer2,
  PenTool,
  CloudOff,
  Users,
  Dices
} from 'lucide-react';
import { View, Campaign, MapAsset, GridSettings } from './types';

// --- Components ---

const TopBar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <nav className="fixed top-0 w-full z-50 glass-panel flex justify-between items-center px-8 h-16 border-none">
    <div className="flex items-center gap-8">
      <div className="text-xl font-extrabold tracking-tighter text-primary font-headline cursor-pointer" onClick={() => setView('dashboard')}>
        Cinematic VTT
      </div>
      <div className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => setView('dashboard')}
          className={`font-headline tracking-tight transition-colors ${currentView === 'dashboard' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Campaign
        </button>
        <button 
          onClick={() => setView('library')}
          className={`font-headline tracking-tight transition-colors ${currentView === 'library' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Library
        </button>
        <button className="text-on-surface-variant hover:text-on-surface font-headline tracking-tight transition-colors">Players</button>
        <button className="text-on-surface-variant hover:text-on-surface font-headline tracking-tight transition-colors">Settings</button>
      </div>
    </div>
    
    <div className="flex items-center gap-6">
      {currentView === 'tabletop' && (
        <div className="flex items-center gap-3 bg-surface-container-highest/40 px-4 py-2 rounded-full">
          <Circle className="w-2 h-2 fill-secondary text-secondary" />
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant">Session Live</span>
        </div>
      )}
      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant hover:text-on-surface transition-all p-2 rounded-full hover:bg-white/5">
          <CircleHelp className="w-5 h-5" />
        </button>
        <button className="text-on-surface-variant hover:text-on-surface transition-all p-2 rounded-full hover:bg-white/5 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface transition-all p-2 rounded-full hover:bg-white/5">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ setView, currentView, onGenerateMap }: { setView: (v: View) => void, currentView: View, onGenerateMap: () => void }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <aside className="fixed left-4 top-20 bottom-4 w-72 rounded-3xl bg-surface-container-low/80 backdrop-blur-lg flex flex-col p-4 z-40 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between px-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
            <Rocket className="w-5 h-5 text-on-primary fill-on-primary" />
          </div>
          <div>
            <h2 className="text-lg font-black text-tertiary font-headline uppercase tracking-wide leading-none">Banana Pro</h2>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-widest opacity-80">AI Engine Active</p>
          </div>
        </div>
        {currentView === 'tabletop' && (
          <button className="p-2 rounded-xl hover:bg-surface-container-highest text-on-surface-variant">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        <button className="w-full flex items-center gap-4 p-3 bg-secondary/10 text-secondary rounded-xl font-bold text-sm tracking-wide uppercase hover:translate-x-1 transition-transform">
          <Sparkles className="w-5 h-5" />
          <span>AI Prompt</span>
        </button>
        <button 
          onClick={() => setView('library')}
          className={`w-full flex items-center gap-4 p-3 rounded-xl font-body text-sm tracking-wide uppercase hover:translate-x-1 transition-transform ${currentView === 'library' ? 'bg-surface-container-highest text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'}`}
        >
          <Package className="w-5 h-5" />
          <span>Assets</span>
        </button>
        <button className="w-full flex items-center gap-4 p-3 text-on-surface-variant font-body text-sm tracking-wide uppercase hover:bg-surface-container-highest hover:text-on-surface hover:translate-x-1 transition-transform rounded-xl">
          <Layers className="w-5 h-5" />
          <span>Layers</span>
        </button>
        <button className="w-full flex items-center gap-4 p-3 text-on-surface-variant font-body text-sm tracking-wide uppercase hover:bg-surface-container-highest hover:text-on-surface hover:translate-x-1 transition-transform rounded-xl">
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </button>
      </nav>

      <div className="mt-auto space-y-4">
        {currentView === 'tabletop' && (
          <div className="relative">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-surface-container-highest border-none rounded-xl text-sm p-4 placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary min-h-[100px] resize-none text-on-surface" 
              placeholder="Describe your map..." 
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Mic className="w-4 h-4 text-on-surface-variant cursor-pointer hover:text-secondary" />
            </div>
          </div>
        )}
        <button 
          onClick={onGenerateMap}
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/10 hover:bg-primary-dim transition-colors scale-95 active:scale-90 flex items-center justify-center gap-2"
        >
          <MapIcon className="w-5 h-5" />
          Generate Map
        </button>
        <button className="w-full flex items-center gap-4 p-3 text-on-surface-variant font-body text-sm tracking-wide uppercase hover:bg-surface-container-highest hover:text-on-surface rounded-xl">
          <LifeBuoy className="w-5 h-5" />
          <span>Support</span>
        </button>
      </div>
    </aside>
  );
};

const Dashboard = ({ onResume }: { onResume: (c: Campaign) => void }) => {
  const campaigns: Campaign[] = [
    { id: '1', name: 'Shadows of Aetheria', players: 4, lastActive: '2h ago', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDFl6lO8XBpSpYXGy-sA9us__mtfuAS1kRGAWIl7QhRICU98vSyWmvKu3TsygueKQ4axeCuEppWBqG5ISIikbIUf9nOVHEZfDIhSeFNJH8uLQ3_GPSpuYe1clEYuXsFubgJm3_cLIUwJjt-kL3VI1fPstcV0WIT3j8R3F3g_H-uJBhjGFtr5hMeQq4FlrIszSDA-sjv70Xhouexy5REaZiR2F68kUGqPo7zZ2zSq00JF0PtVvd7pZadDjDBz1-0GTT9vf6G1B6rQ', status: 'live' },
    { id: '2', name: 'The Neon Underbelly', players: 5, lastActive: '1d ago', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGCKK42_a0YhZxPXv1e31h59xa30NOptYW2iuDukCdzqpVTKgtpDgf5k_cPK6yJgbl4HKdiMB1g3y9W-470LARsyVFvU3BjMDktsNtsrA0Mz-Ui1mRdE2jzVFGWqOlXGtaBMYqG-oF39EYQO8eBXoM19yWC9ys4nA28VOSuzfmcmFWUYDBrKhhbufxGhq9G_rUEJNGITrGh1ighpcI3CydEu_QWglbQvXoh4rm0_ET2pHIp60KUvnHfOpG7c8-uqerePYI3eXHoQ', status: 'lobby' },
  ];

  const maps: MapAsset[] = [
    { id: 'm1', name: 'Obsidian Caldera', gridSize: '45 x 30 Grids', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbN4it-m_RNp3TpqQJf9owpNk2T15XjhJvHDj8kWXetFBlhQudOqIsweqmXTuh2DAhP50WFKQvS40omQG5JYqF-Hb1nUpGZT1qxoBP6UtdxqXW8s98nKON4do9qw4EHAnOtRpB-GfKE_o2LhwUpTS-T-BmdS-k8AiGcCxu2yFd6TugByXyLXHtgNor0eRG85HEs2kt8tG8MM5sUIj0C320BixxYa87u1v5eC3uTv3cFadwl2Y4LvAaDhuoAKM6QU3QJhhdQNIhng', quality: '4K HD' },
    { id: 'm2', name: 'Eternal Frost Spires', gridSize: '60 x 60 Grids', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSeYgNy7OIbKAwfCU_PYCXkSYCns-Y7t8jGMoPPm_imicS0xCdqttF2kk5-uWk2-_OdLN35NNj5WX0kA8j-ZDL74IA0Igk_Fel2XF8qhqYRgSaGJJHMau9y4iZF9L695ls588BK5agTtyBF2NvjhCPchSr0sIscAWg9_lLduNaPX4YuvJdAxgZCAipTlfYQQbZBX6lXfT0PiIkniwu3bJkfgZAaCJWbVcsie-DjO39fD9IIZ-WQNJ3YGB-T3YDk5lRl3quhfRMlQ', quality: '' },
  ];

  return (
    <div className="ml-80 pt-24 pr-8 pb-32">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold font-headline tracking-tighter mb-2">Campaign Command</h1>
        <p className="text-on-surface-variant max-w-2xl">Manage your worlds, players, and cinematic encounters from a single ethereal dashboard.</p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Room Creation Card */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-6">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-headline mb-2">Initiate Session</h3>
            <p className="text-on-surface-variant text-sm mb-6">Spin up a new persistent room with integrated fog of war and dynamic lighting.</p>
          </div>
          <button className="w-full py-3 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 group">
            Create New Room
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Active Campaigns */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-3xl overflow-hidden border border-white/5">
          <div className="p-6 pb-2 flex justify-between items-center">
            <h3 className="text-xl font-bold font-headline">Active Campaigns</h3>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">3 Live Sessions</span>
          </div>
          <div className="p-4 space-y-3">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-highest transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-dim">
                  <img src={campaign.imageUrl} alt={campaign.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg leading-tight">{campaign.name}</h4>
                  <p className="text-xs text-on-surface-variant">{campaign.players} Players • Last active {campaign.lastActive}</p>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-surface-container bg-slate-${7-i}00`}></div>
                  ))}
                </div>
                <button 
                  onClick={() => onResume(campaign)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${campaign.status === 'live' ? 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-on-secondary' : 'bg-white/5 text-on-surface hover:bg-white/10'}`}
                >
                  {campaign.status === 'live' ? 'RESUME' : 'LOBBY'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cartography Vault */}
        <div className="col-span-12 bg-surface-container-low rounded-3xl p-8 border border-white/5">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold font-headline mb-1">Cartography Vault</h3>
              <p className="text-on-surface-variant text-sm">Your private collection of high-resolution battlemaps.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-surface-container-highest text-on-surface hover:text-primary transition-colors">
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maps.map(map => (
              <div key={map.id} className="group cursor-pointer">
                <div className="aspect-video rounded-2xl overflow-hidden bg-surface-container-highest mb-3 relative">
                  <img src={map.imageUrl} alt={map.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-primary" />
                  </div>
                  {map.quality && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-tertiary">{map.quality}</div>
                  )}
                </div>
                <h5 className="font-bold text-sm tracking-tight px-1">{map.name}</h5>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant px-1">{map.gridSize}</p>
              </div>
            ))}
            <div className="group cursor-pointer">
              <div className="aspect-video rounded-2xl overflow-hidden bg-surface-container-highest mb-3 relative border-2 border-dashed border-outline-variant flex flex-col items-center justify-center transition-colors hover:border-primary/50">
                <Upload className="w-8 h-8 text-outline-variant mb-2 group-hover:text-primary transition-colors" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline-variant group-hover:text-primary transition-colors">Import Custom</p>
              </div>
              <h5 className="font-bold text-sm tracking-tight px-1 text-outline">Add New Asset</h5>
            </div>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary-container/10 border border-secondary/20 flex flex-col items-center justify-center text-center p-4 group cursor-pointer hover:shadow-[0_0_30px_rgba(0,227,253,0.15)] transition-all">
              <Sparkles className="w-8 h-8 text-secondary mb-2 animate-pulse" />
              <h5 className="text-secondary font-bold text-sm tracking-tight mb-1">AI Map Builder</h5>
              <p className="text-[10px] text-on-surface-variant leading-tight">Describe a world and let the engine weave it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tabletop = () => {
  const [gridSettings, setGridSettings] = useState<GridSettings>({
    enabled: true,
    type: 'square',
    cellSize: 70,
    opacity: 20,
    snap: true,
    color: '#ffffff'
  });
  const [zoom, setZoom] = useState(100);
  const [showGridSettings, setShowGridSettings] = useState(false);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Map Background */}
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP_GWl2lvKp2CgxQ2RSRIlkGt8FCvwvgBRPqWyTdBMpgxGao4p2t4SMFXpM1j6cn3ncP8XedP6M6vJ0e3V-fcD8dYVVaiaXiPbeLJ7KqkUyKkC8D-EFcYSp6149mlDZj3U141QiNSeCDYo9wo6yzHjvSd927gZsCH3JNEn--4Z5RWMROzb6j3Q5NZXxG-o_5Ch9Eyj09aEUJ5KLo3Z7Ha7q-_h3c4oO4YDM1XKpic-j8g7w5fEXjpKEdroZ_9BwUQOztV9or58pg" 
        className="w-full h-full object-cover brightness-[0.6] saturate-[1.2]" 
        alt="Battlemap"
        referrerPolicy="no-referrer"
      />

      {/* Grid Overlay */}
      {gridSettings.enabled && (
        <div 
          className="absolute inset-0 pointer-events-none z-5"
          style={{
            opacity: gridSettings.opacity / 100,
            backgroundImage: gridSettings.type === 'square' 
              ? `linear-gradient(to right, ${gridSettings.color} 1px, transparent 1px), linear-gradient(to bottom, ${gridSettings.color} 1px, transparent 1px)`
              : 'none',
            backgroundSize: `${gridSettings.cellSize}px ${gridSettings.cellSize}px`
          }}
        />
      )}

      {/* Token */}
      <div className="absolute top-[40%] left-[55%] z-10">
        <div className="relative group cursor-pointer">
          <div 
            className="w-16 h-16 rounded-full border-2 border-tertiary token-pulse bg-cover bg-center overflow-hidden" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQKOT3lGu4TPgf6yDQN9k5cIH6HlHqnzr1N6k2yUPfn44ypg43wpUwFeQjNlM2fO8wVl4zQ6XiRb9WP60GzEy5y__O1HmJZ6mLVO0VGsA5t1u6JMGkVlo3NW6gAm3bZsnUyVJKrAD_ZLfmV5WyWaCWuQmoi5ZhnQ8GqtuFCDqZyJWZAMfeloDFMj6kLmtc1Kjgo2zSPYvCKi_kxdVlynKfHQcW8XGrwhU0mfi_hy2_GdDVPuiP8hJwm8mb8WFiDyeIfMYiLkokyg')" }}
          />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase text-tertiary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Valerius
          </div>
        </div>
      </div>

      {/* HUD Overlay */}
      <main className="relative z-20 flex-1 p-20 flex items-start justify-end pointer-events-none h-full">
        <div className="space-y-4 max-w-xs pointer-events-auto">
          <div className="glass-panel p-6 rounded-3xl border-l-4 border-primary">
            <h3 className="font-headline font-extrabold text-xl tracking-tighter mb-1">Forest Clearing</h3>
            <p className="text-xs text-on-surface-variant font-medium">Difficulty Check: <span className="text-primary">15</span></p>
            <div className="mt-4 flex gap-2">
              <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary">Dim Light</span>
              <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-tertiary">Difficult Terrain</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                <History className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Initiative</p>
                <p className="text-sm font-bold">Valerius (19)</p>
              </div>
            </div>
            <div className="space-y-3 opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="text-[10px] font-bold">14</span>
                </div>
                <p className="text-xs font-medium">Cave Bear</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="text-[10px] font-bold">12</span>
                </div>
                <p className="text-xs font-medium">Goblin Scout</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Grid Settings Panel */}
      <AnimatePresence>
        {showGridSettings && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-80 top-24 w-64 glass-panel rounded-3xl p-6 z-50 space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Grid3X3 className="w-5 h-5 text-primary" />
              <span className="font-bold text-xs tracking-widest uppercase text-primary">Grid Settings</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Toggle Grid</span>
                <button 
                  onClick={() => setGridSettings(s => ({ ...s, enabled: !s.enabled }))}
                  className={`w-9 h-5 rounded-full transition-colors relative ${gridSettings.enabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${gridSettings.enabled ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Grid Type</span>
                <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-highest rounded-lg">
                  {(['square', 'hex-v', 'hex-h'] as const).map(t => (
                    <button 
                      key={t}
                      onClick={() => setGridSettings(s => ({ ...s, type: t }))}
                      className={`py-1 rounded-md text-[9px] font-bold uppercase transition-colors ${gridSettings.type === t ? 'bg-surface-container-high text-on-surface' : 'text-on-surface-variant hover:bg-white/5'}`}
                    >
                      {t.replace('hex-', 'HX ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Cell Size</span>
                  <span className="text-[10px] font-bold text-primary">{gridSettings.cellSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="40" max="150" 
                  value={gridSettings.cellSize}
                  onChange={(e) => setGridSettings(s => ({ ...s, cellSize: parseInt(e.target.value) }))}
                  className="w-full h-1 bg-surface-container-highest rounded-full appearance-none accent-primary" 
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Opacity</span>
                  <span className="text-[10px] font-bold text-primary">{gridSettings.opacity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={gridSettings.opacity}
                  onChange={(e) => setGridSettings(s => ({ ...s, opacity: parseInt(e.target.value) }))}
                  className="w-full h-1 bg-surface-container-highest rounded-full appearance-none accent-primary" 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabletop Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-full flex items-center gap-8 py-3 px-6 z-50 shadow-2xl border-none">
        <button className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full w-12 h-12 scale-110 active:scale-90 transition-all">
          <MousePointer2 className="w-5 h-5 fill-on-primary" />
        </button>
        <button className="text-on-surface-variant hover:text-secondary transition-colors active:scale-90">
          <PenTool className="w-6 h-6" />
        </button>
        <button className="text-on-surface-variant hover:text-secondary transition-colors active:scale-90">
          <CloudOff className="w-6 h-6" />
        </button>
        <button className="text-on-surface-variant hover:text-secondary transition-colors active:scale-90">
          <Users className="w-6 h-6" />
        </button>
        <button className="text-on-surface-variant hover:text-secondary transition-colors active:scale-90">
          <Dices className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setShowGridSettings(!showGridSettings)}
          className={`transition-colors active:scale-90 ${showGridSettings ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
        >
          <Grid3X3 className="w-6 h-6" />
        </button>
      </div>

      {/* Viewport Controls */}
      <div className="fixed bottom-6 right-8 flex gap-4 z-40">
        <button className="w-12 h-12 rounded-2xl glass-panel text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all hover:translate-y-[-4px]">
          <Maximize2 className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 rounded-2xl glass-panel text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all hover:translate-y-[-4px]">
          <SettingsIcon className="w-5 h-5" />
        </button>
        <div className="h-12 flex items-center gap-2 bg-surface-container-low/90 px-4 rounded-2xl backdrop-blur-xl border border-white/5">
          <Search className="w-3 h-3 text-on-surface-variant" />
          <input 
            type="range" 
            min="10" max="200" 
            value={zoom}
            onChange={(e) => setZoom(parseInt(e.target.value))}
            className="w-24 h-1 bg-surface-container-highest rounded-full appearance-none accent-primary" 
          />
          <span className="text-[10px] font-bold text-on-surface-variant min-w-[2.5rem]">{zoom}%</span>
        </div>
      </div>
    </div>
  );
};

const Library = () => {
  return (
    <div className="ml-80 pt-24 pr-8 pb-32">
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-extrabold font-headline tracking-tighter mb-2">Asset Library</h1>
            <p className="text-on-surface-variant max-w-lg">Manage your campaign resources, sounds, and tokens with effortless cinematic precision.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
              <input 
                className="bg-surface-container-highest border-none rounded-xl pl-12 pr-4 h-12 w-80 focus:ring-2 focus:ring-secondary/50 font-body placeholder:text-outline transition-all text-on-surface" 
                placeholder="Search tokens, fog, music..." 
                type="text"
              />
            </div>
            <button className="bg-primary text-on-primary font-bold px-6 h-12 rounded-xl flex items-center gap-2 hover:bg-primary-dim transition-colors">
              <Plus className="w-5 h-5" />
              Add Asset
            </button>
          </div>
        </div>
        
        <div className="flex gap-4">
          {['All Assets', 'Hero Tokens', 'Enemy Tokens', 'Terrain', 'Soundscape'].map((cat, i) => (
            <button 
              key={cat}
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all border ${i === 0 ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface-container-high text-on-surface-variant border-outline-variant/10 hover:bg-surface-container-highest hover:text-on-surface'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container h-80 border border-white/5">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Wb0nSXY-Hzuh1yzwQzj1h3p6o2KdA62TCy9w2v4r1HVogd-m2EtjhJ9LTr_dNyuh5uCPPgxICqgO2CGgvW10c0gikcBxN1SFkGFHdtAyQm24W4to_eF1U_Z1kocynPw0WR_9BwCiBqMXO_N8WAKp_Y3is3eQKVmfl91bHJJWT3Hei4kgknnSftpc9RgBr4se_BtvVfClCa7_Bot_VCckChrQHlDNxtNscUKHHyx5lDEjBW-qCq63umnsk-1K6tn8jJcUA5MemA" alt="Featured Hero" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-2 py-1 rounded-sm mb-2 inline-block">Featured Hero</span>
              <h3 className="text-2xl font-bold font-headline">Sir Kaelen the Bright</h3>
              <p className="text-sm text-on-surface-variant">High-fidelity 2D Token • PNG • 4MB</p>
            </div>
            <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary hover:scale-110 active:scale-95 transition-all">
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="col-span-4 rounded-3xl bg-surface-container-high p-6 flex flex-col justify-between border border-white/5">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>skull</span>
            </div>
            <span className="text-xs font-bold text-outline uppercase tracking-tighter">42 Items</span>
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline mb-1">Enemy Tokens</h3>
            <p className="text-sm text-on-surface-variant mb-4">Orcs, Undead, & Beholders</p>
            <div className="flex -space-x-3">
              {[1, 2].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-slate-800 overflow-hidden">
                  <img src={`https://picsum.photos/seed/enemy${i}/100/100`} alt="Token" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface">
                +39
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  const handleGenerateMap = () => {
    // Logic to trigger AI generation
    console.log('Generating map...');
  };

  const handleResume = (campaign: Campaign) => {
    setView('tabletop');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopBar currentView={view} setView={setView} />
      <Sidebar currentView={view} setView={setView} onGenerateMap={handleGenerateMap} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard onResume={handleResume} />
            </motion.div>
          )}
          {view === 'tabletop' && (
            <motion.div 
              key="tabletop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabletop />
            </motion.div>
          )}
          {view === 'library' && (
            <motion.div 
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Library />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background Sync Status */}
      <div className="fixed bottom-10 right-10 flex flex-col items-end gap-4 pointer-events-none z-50">
        <div className="bg-surface-container-highest px-6 py-4 rounded-2xl glass-panel shadow-2xl flex items-center gap-4 pointer-events-auto border border-outline-variant/10">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm">BackgroundSync Active</div>
            <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Cloud Engine: Synced</div>
          </div>
        </div>
      </div>
    </div>
  );
}

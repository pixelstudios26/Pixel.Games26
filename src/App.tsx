import React, { useState, useMemo } from 'react';
import { Ghost, Star, Gamepad2, Search, User, LogIn, X } from 'lucide-react';
import { cn } from './lib/utils';

export const GAMES = [
  {
    id: 'minecraft',
    title: 'MINECRAFT',
    icon: Gamepad2,
    color: 'text-white',
    description: 'Classic block-building adventure.',
    tags: ['3D', 'SURVIVAL']
  },
  {
    id: 'granny',
    title: 'GRANNY',
    icon: Ghost,
    color: 'text-white',
    description: 'Can you escape the house in 5 days?',
    tags: ['HORROR', 'SURVIVAL']
  },
  {
    id: 'fnaf',
    title: 'FNAF',
    icon: Ghost,
    color: 'text-white',
    description: 'Survive the night at Freddy Fazbear\'s Pizza.',
    tags: ['HORROR', 'STRATEGY']
  },
  {
    id: 'gun-spin',
    title: 'GUN SPIN',
    icon: Gamepad2,
    color: 'text-white',
    description: 'Spin the gun and shoot to fly as far as possible.',
    tags: ['ACTION', 'PHYSICS']
  },
  {
    id: 'steal-a-brainrot',
    title: 'STEAL A BRAINROT',
    icon: Ghost,
    color: 'text-white',
    description: 'A quirky adventure where you steal... brainrot?',
    tags: ['ADVENTURE', 'MEME']
  },
  {
    id: 'snow-rider',
    title: 'SNOW RIDER',
    icon: Gamepad2,
    color: 'text-white',
    description: 'Experience the thrill of 3D snow riding.',
    tags: ['3D', 'RACING']
  }
];

export default function App() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const saved = localStorage.getItem('pixel_user');
    return saved ? JSON.parse(saved) : null;
  });

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem('pixel_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pixel_user');
  };

  const renderGame = () => {
    const game = GAMES.find(g => g.id === activeGame);
    if (!game) return null;

    const gameUrls: Record<string, string> = {
      minecraft: "https://classroomlesson.github.io/basic-ruffle-player/html/minecraft/index.html?school=1",
      granny: "https://classroomlesson.github.io/basic-ruffle-player/html/granny/index.html?school=1",
      fnaf: "https://classroomlesson.github.io/basic-ruffle-player/html/fnaf/index.html?school=1",
      'gun-spin': "https://classroomlesson.github.io/basic-ruffle-player/html/gun_spin/index.html?school=1",
      'steal-a-brainrot': "https://classroomlesson.github.io/basic-ruffle-player/html/steal_a_brainrot_2/index.html?school=1",
      'snow-rider': "https://classroomlesson.github.io/basic-ruffle-player/html/snow_rider_3d/index.html?school=1"
    };

    const handleFullscreen = () => {
      const iframe = document.getElementById('game-iframe');
      if (iframe) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if ((iframe as any).webkitRequestFullscreen) {
          (iframe as any).webkitRequestFullscreen();
        } else if ((iframe as any).msRequestFullscreen) {
          (iframe as any).msRequestFullscreen();
        }
      }
    };

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black gap-4">
        <iframe 
          id="game-iframe" 
          name="appFrame" 
          src={gameUrls[activeGame!]} 
          title="flashcard-frame" 
          allowFullScreen={true}
          allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write" 
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads" 
          scrolling="no" 
          className="w-full h-[600px] border-4 border-white pixel-border"
        />
        <button 
          onClick={handleFullscreen}
          className="pixel-button flex items-center gap-2"
        >
          ENTER FULLSCREEN
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="scanline" />
      
      {/* Navbar */}
      <nav className="border-b-4 border-white bg-black p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <button 
            onClick={() => { setActiveGame(null); setSearchQuery(''); }}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-10 h-10 bg-white flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Ghost className="text-black" size={24} />
            </div>
            <h1 className="font-pixel text-lg tracking-tighter hidden md:block">
              PIXEL <span className="text-white">GAMES</span>
            </h1>
          </button>

          {/* Search Bar */}
          {!activeGame && (
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text"
                placeholder="SEARCH GAMES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-white outline-none py-2 pl-10 pr-4 font-pixel text-[10px] transition-colors"
              />
            </div>
          )}

          <div className="flex gap-4 shrink-0">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-zinc-400 font-pixel text-[8px]">
                  <User size={12} />
                  <span>{user.username.toUpperCase()}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="pixel-button"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="pixel-button flex items-center gap-2"
              >
                <LogIn size={12} /> LOGIN
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {activeGame ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveGame(null)}
                className="text-zinc-500 font-pixel text-[10px] hover:text-white transition-colors"
              >
                &lt; BACK TO CATALOG
              </button>
              <h2 className="font-pixel text-xl text-white">
                {GAMES.find(g => g.id === activeGame)?.title}
              </h2>
            </div>
            <div className="bg-zinc-900/30 rounded-3xl border-2 border-white p-4 min-h-[650px] flex items-center justify-center">
              {renderGame()}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Hero */}
            <section className="py-12 text-center space-y-6">
              <div className="flex justify-center mb-4">
                <Ghost size={80} className="text-white animate-pulse" />
              </div>
              <h2 className="font-pixel text-4xl md:text-6xl text-white leading-tight">
                UNBLOCKED <br />
                <span className="text-white">GHOST MODE</span>
              </h2>
              <p className="text-zinc-500 font-pixel text-xs max-w-xl mx-auto leading-relaxed">
                Monochrome gaming experience. Pure gameplay, zero distractions.
              </p>
            </section>

            {/* Game Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.length > 0 ? filteredGames.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="group relative flex flex-col text-left bg-zinc-900/50 border-2 border-zinc-800 hover:border-white transition-all p-6 rounded-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <game.icon size={80} />
                  </div>
                  
                  <div className={cn("mb-4 p-3 rounded-lg bg-white w-fit", "text-black")}>
                    <game.icon size={24} />
                  </div>

                  <h3 className="font-pixel text-lg mb-2 group-hover:text-white transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-6 line-clamp-2">
                    {game.description}
                  </p>

                  <div className="mt-auto flex gap-2">
                    {game.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-pixel px-2 py-1 bg-zinc-800 text-zinc-400 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              )) : (
                <div className="col-span-full py-20 text-center">
                  <p className="font-pixel text-zinc-600 text-xs">NO GAMES FOUND MATCHING "{searchQuery.toUpperCase()}"</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-950 border-4 border-white p-8 relative pixel-border">
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h3 className="font-pixel text-xl mb-2">{isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}</h3>
              <p className="text-zinc-500 font-pixel text-[8px]">ENTER YOUR DETAILS TO CONTINUE</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-2">
                <label className="font-pixel text-[8px] text-zinc-400 block">USERNAME</label>
                <input 
                  required
                  name="username"
                  type="text"
                  placeholder="PLAYER_1"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-white outline-none p-3 font-pixel text-[10px]"
                />
              </div>
              <div className="space-y-2">
                <label className="font-pixel text-[8px] text-zinc-400 block">PASSWORD</label>
                <input 
                  required
                  type="password"
                  placeholder="********"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-white outline-none p-3 font-pixel text-[10px]"
                />
              </div>

              <button type="submit" className="w-full pixel-button py-4 text-sm">
                {isLogin ? 'START GAMING' : 'JOIN THE GHOSTS'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-pixel text-[8px] text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
              >
                {isLogin ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? LOGIN"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t-4 border-white p-12 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <Ghost className="text-black" size={16} />
              </div>
              <span className="font-pixel text-sm">PIXEL GAMES</span>
            </div>
            <p className="text-zinc-500 font-pixel text-[8px] leading-relaxed">
              The ultimate destination for unblocked retro gaming. 
              No downloads, no blocks, just pure 8-bit fun.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-pixel text-[10px] text-zinc-400">QUICK LINKS</h4>
            <ul className="space-y-2 font-pixel text-[8px] text-zinc-500">
              <li className="hover:text-white cursor-pointer">TOP GAMES</li>
              <li className="hover:text-white cursor-pointer">NEW RELEASES</li>
              <li className="hover:text-white cursor-pointer">CATEGORIES</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-pixel text-[10px] text-zinc-400">STATUS</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white animate-pulse rounded-full" />
              <span className="font-pixel text-[8px] text-zinc-500">SERVERS ONLINE</span>
            </div>
            <p className="text-zinc-600 font-pixel text-[8px]">
              VERSION 1.0.4-BETA
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-900 text-center space-y-2">
          <p className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest">
            MADE BY PIXEL STUDIOS // FOUNDER OF PIXEL STUDIOS IS MICHAEL EMMERLING
          </p>
          <p className="font-pixel text-[8px] text-zinc-700">
            &copy; 2026 PIXEL GAMES // BUILT FOR FUN
          </p>
        </div>
      </footer>
    </div>
  );
}

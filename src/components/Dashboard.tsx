import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import {
  Copy, Check, Lock, Code, Server, Plug, Search,
  ChevronDown, ChevronUp, Crown, Star, Zap, Package,
  MessageCircle, Music2, ExternalLink, Play, Pause, Volume2
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { currentUser, endpoints, musicUrl } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gudang' | 'musik'>('gudang');
  const [isPlaying, setIsPlaying] = useState(false);

  if (!currentUser) return null;

  const isPremium = currentUser.role === 'premium' || currentUser.role === 'admin';

  const filteredEndpoints = endpoints.filter(ep =>
    ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'plugin': return <Plug size={18} />;
      case 'case': return <Code size={18} />;
      case 'script': return <Zap size={18} />;
      default: return <Server size={18} />;
    }
  };

  const waNumber = '+81907042-4636';
  const waLink = `https://wa.me/819070424636?text=Halo%20kak%2C%20aku%20mau%20berlangganan%20Premium%20Gudang%20Nevano%20dong%20%F0%9F%99%8F`;

  // Spotify-style embed URL
  const getSpotifyEmbedUrl = (url: string) => {
    if (!url) return '';
    // Handle spotify track/playlist URLs
    const match = url.match(/spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
    if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    return url;
  };

  const spotifyEmbed = getSpotifyEmbedUrl(musicUrl || '');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/4 blur-2xl" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Package size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                    Gudang Nevano
                  </h1>
                  <p className="text-white/70 text-sm font-medium">WhatsApp Bot Feature Store</p>
                </div>
              </div>
              <p className="text-white/80 text-sm max-w-lg leading-relaxed mt-3">
                Tempat berbagi kode & fitur bot AI WhatsApp. Dapatkan plugin, script, dan case handler 
                untuk bot kamu — mulai dari fitur gratis hingga fitur eksklusif Premium! 🤖✨
              </p>
            </div>

            {/* Badge status */}
            <div className="shrink-0">
              {isPremium ? (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold shadow-lg shadow-amber-500/30">
                  <Crown size={20} className="shrink-0" />
                  <div>
                    <div className="text-xs opacity-80 font-normal">Status kamu</div>
                    <div className="text-base">PREMIUM ✦</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 backdrop-blur text-white font-bold">
                    <Star size={18} />
                    <div>
                      <div className="text-xs opacity-70 font-normal">Status kamu</div>
                      <div className="text-sm">BASIC Member</div>
                    </div>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-white font-bold text-sm transition-all shadow-lg shadow-green-500/30 hover:scale-105"
                  >
                    <MessageCircle size={16} />
                    Upgrade Premium
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1.5 rounded-2xl w-fit gap-1 shadow-inner">
        <button
          onClick={() => setActiveTab('gudang')}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
            activeTab === 'gudang'
              ? "bg-white dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400 shadow-md"
              : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          )}
        >
          <Package size={16} />
          Kode & Fitur
        </button>
        <button
          onClick={() => setActiveTab('musik')}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
            activeTab === 'musik'
              ? "bg-white dark:bg-neutral-800 text-green-600 dark:text-green-400 shadow-md"
              : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          )}
        >
          <Music2 size={16} />
          Musik
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'gudang' ? (
          <motion.div key="gudang" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur rounded-2xl p-4 border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                  <Package size={18} />
                </div>
                <div>
                  <div className="text-2xl font-black text-indigo-600">{endpoints.filter(e => e.accessLevel === 'basic').length}</div>
                  <div className="text-xs text-neutral-500">Kode Gratis</div>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur rounded-2xl p-4 border border-amber-100 dark:border-amber-900/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600">
                  <Crown size={18} />
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-600">{endpoints.filter(e => e.accessLevel === 'premium').length}</div>
                  <div className="text-xs text-neutral-500">Kode Premium</div>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/60 dark:bg-neutral-900/60 backdrop-blur rounded-2xl p-4 border border-purple-100 dark:border-purple-900/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600">
                  <Zap size={18} />
                </div>
                <div>
                  <div className="text-2xl font-black text-purple-600">{endpoints.length}</div>
                  <div className="text-xs text-neutral-500">Total Koleksi</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full mb-5">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                placeholder="🔍 Cari kode, plugin, script..."
              />
            </div>

            {/* Endpoint Cards */}
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredEndpoints.map((endpoint, i) => {
                  const isLocked = endpoint.accessLevel === 'premium' && !isPremium;
                  const isExpanded = expandedId === endpoint.id;
                  const previewCode = endpoint.codeSnippet?.split('\n').slice(0, 3).join('\n') + (endpoint.codeSnippet?.split('\n').length > 3 ? '\n...' : '');

                  return (
                    <motion.div
                      key={endpoint.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm",
                        isLocked
                          ? "border-amber-200 dark:border-amber-900/40"
                          : "border-indigo-100 dark:border-indigo-900/30 hover:shadow-xl hover:shadow-indigo-500/10"
                      )}
                    >
                      {/* Card Header */}
                      <div
                        className={cn(
                          "p-5 flex items-start sm:items-center justify-between gap-4",
                          !isLocked && "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        )}
                        onClick={() => !isLocked && setExpandedId(isExpanded ? null : endpoint.id)}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md",
                            endpoint.accessLevel === 'premium'
                              ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/30"
                              : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/30"
                          )}>
                            {endpoint.accessLevel === 'premium' ? <Crown size={20} /> : getIcon(endpoint.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-base">{endpoint.name}</h3>
                              {endpoint.accessLevel === 'premium' ? (
                                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white uppercase tracking-wider shadow-sm">
                                  ✦ Premium
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                                  Free
                                </span>
                              )}
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase">
                                {endpoint.type}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                              {endpoint.description}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-neutral-400">
                          {!isLocked && (isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
                        </div>
                      </div>

                      {/* Preview Code (selalu tampil) */}
                      <div className="px-5 pb-4">
                        <div className="relative rounded-xl overflow-hidden">
                          {/* Preview blur overlay for locked */}
                          <div className={cn(
                            "relative bg-neutral-950 rounded-xl overflow-hidden",
                            isLocked && "cursor-not-allowed"
                          )}>
                            <div className="flex items-center justify-between px-4 pt-3 pb-2">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                <span className="ml-2 text-[10px] text-neutral-500 font-mono uppercase">{endpoint.type}</span>
                              </div>
                              {!isLocked && !isExpanded && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setExpandedId(endpoint.id); }}
                                  className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                                >
                                  <ExternalLink size={11} /> Lihat Penuh
                                </button>
                              )}
                            </div>

                            <div className={cn("relative px-4 pb-4", isLocked && "select-none")}>
                              <pre className={cn(
                                "text-xs font-mono text-neutral-400 max-h-20 overflow-hidden leading-relaxed",
                                isLocked && "blur-[3px] opacity-80"
                              )}>
                                <code>{previewCode || '// kode tersembunyi'}</code>
                              </pre>

                              {/* Locked overlay */}
                              {isLocked && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-neutral-950/95 via-neutral-950/70 to-transparent px-4">
                                  <div className="text-center">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-500/40">
                                      <Lock size={18} className="text-white" />
                                    </div>
                                    <p className="text-white font-bold text-sm mb-0.5">Konten Eksklusif Premium</p>
                                    <p className="text-neutral-400 text-xs mb-3">
                                      Buka akses ke seluruh kode premium ✨
                                    </p>
                                    <a
                                      href={waLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-transform"
                                    >
                                      <MessageCircle size={13} />
                                      Langganan Sekarang
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Full Code */}
                      <AnimatePresence>
                        {isExpanded && !isLocked && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-neutral-100 dark:border-neutral-800"
                          >
                            <div className="p-5 space-y-4">
                              <p className="text-sm text-neutral-600 dark:text-neutral-300 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900/30">
                                {endpoint.description}
                              </p>

                              <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-500" />
                                <div className="relative bg-neutral-900 rounded-2xl overflow-hidden">
                                  <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                      <span className="ml-2 text-xs font-mono text-neutral-500 uppercase">{endpoint.type} — {endpoint.name}</span>
                                    </div>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleCopy(endpoint.codeSnippet, endpoint.id); }}
                                      className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg font-medium"
                                    >
                                      {copiedId === endpoint.id
                                        ? <><Check size={13} className="text-green-400" /> Copied!</>
                                        : <><Copy size={13} /> Copy Kode</>}
                                    </button>
                                  </div>
                                  <div className="p-5 overflow-x-auto max-h-[400px] overflow-y-auto">
                                    <pre className="text-sm font-mono text-neutral-300 leading-relaxed">
                                      <code>{endpoint.codeSnippet}</code>
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {filteredEndpoints.length === 0 && (
                  <div className="text-center py-16 text-neutral-500 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    <Package size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-semibold">Tidak ada kode ditemukan</p>
                    <p className="text-sm mt-1">Coba kata kunci lain</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ── MUSIK TAB ── */
          <motion.div key="musik" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="max-w-2xl mx-auto">
              {/* Musik Player Card */}
              <div className="bg-gradient-to-br from-[#1DB954]/10 to-[#1DB954]/5 border border-[#1DB954]/30 rounded-3xl p-6 shadow-xl">
                {/* Spotify Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#1DB954] flex items-center justify-center shadow-lg shadow-[#1DB954]/30">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1DB954]">Musik Nevano</h2>
                    <p className="text-sm text-neutral-500">Powered by Spotify</p>
                  </div>
                </div>

                {musicUrl ? (
                  <>
                    {spotifyEmbed ? (
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <iframe
                          src={spotifyEmbed}
                          width="100%"
                          height="352"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded-2xl"
                        />
                      </div>
                    ) : (
                      /* Fallback player for non-Spotify URLs */
                      <div className="bg-neutral-900 rounded-2xl p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#1DB954]/20 border-4 border-[#1DB954] flex items-center justify-center mx-auto mb-4">
                          <Music2 size={32} className="text-[#1DB954]" />
                        </div>
                        <p className="text-white font-bold mb-1">Now Playing</p>
                        <p className="text-neutral-400 text-sm mb-6 truncate">{musicUrl}</p>

                        <div className="flex items-center justify-center gap-6">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-14 h-14 rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#1DB954]/30"
                          >
                            {isPlaying ? <Pause size={24} className="text-black" /> : <Play size={24} className="text-black ml-0.5" />}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-2 text-neutral-500 text-xs">
                      <Volume2 size={13} />
                      <span>Kamu hanya bisa mendengarkan musik di sini</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-neutral-500">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                      <Music2 size={28} className="opacity-40" />
                    </div>
                    <p className="font-semibold">Belum ada musik</p>
                    <p className="text-sm mt-1">Admin belum mengatur URL musik</p>
                  </div>
                )}
              </div>

              {/* Info box */}
              <div className="mt-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#1DB954]/20 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1DB954]">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-500">
                  Musik dikurasi oleh Admin Nevano. Kamu bisa menikmati musik sambil browsing kode bot! 🎵
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

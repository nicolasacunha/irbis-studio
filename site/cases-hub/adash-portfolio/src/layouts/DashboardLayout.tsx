import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { PanelLeft, Sun, Moon } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import AIChat from '@/components/AIChat'
import { useTheme } from '@/lib/ThemeContext'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function DashboardLayout() {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [chatOpen, setChatOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const t = theme === 'light'

  const handleToggle = () => setSidebarOpen(v => !v)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: t ? '#F5F5F3' : '#0A0A0B' }}>
      <Sidebar open={sidebarOpen} onToggle={handleToggle} onAgentClick={() => setChatOpen(v => !v)} agentActive={chatOpen} />
      {chatOpen && <AIChat variant='floating' onClose={() => setChatOpen(false)} />}

      {/* Mobile overlay backdrop */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 35,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Main area */}
      <div style={{
        marginLeft: isMobile ? 0 : (sidebarOpen ? 260 : 0),
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
      }}>
        {/* Top bar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 30,
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 28px', borderBottom: `1px solid ${t ? '#E5E5E3' : '#1c1c22'}`,
          background: t ? 'rgba(255,255,255,0.9)' : 'rgba(10,10,11,0.85)', backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={handleToggle}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34, borderRadius: 8,
                border: `1px solid ${t ? '#E5E5E3' : '#1c1c22'}`, background: 'transparent',
                color: t ? '#9CA3AF' : '#7a7a85', cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = t ? '#ECECEA' : '#151518'; e.currentTarget.style.color = t ? '#111111' : '#F0EDE8' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = t ? '#9CA3AF' : '#7a7a85' }}
            >
              <PanelLeft size={16} />
            </button>

            <button
              onClick={toggleTheme}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34, borderRadius: 8,
                border: `1px solid ${t ? '#E5E5E3' : '#1c1c22'}`, background: 'transparent',
                color: t ? '#9CA3AF' : '#7a7a85', cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = t ? '#ECECEA' : '#151518'; e.currentTarget.style.color = t ? '#111111' : '#F0EDE8' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = t ? '#9CA3AF' : '#7a7a85' }}
            >
              {t ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: t ? '#111111' : '#F0EDE8', lineHeight: 1.2 }}>Rafael</div>
              <div style={{ fontSize: 10, color: t ? '#9CA3AF' : '#55555e' }}>Admin</div>
            </div>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: t
                ? 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.06))'
                : 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(212,168,83,0.05))',
              border: '1px solid rgba(212,168,83,0.22)',
              fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: '#D4A853',
            }}>
              AM
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{
          flex: 1, overflow: 'auto', padding: isMobile ? 16 : 32,
          background: t ? '#F5F5F3' : undefined,
        }}
          className={t ? undefined : 'mesh-gradient-1'}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

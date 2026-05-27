import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, BarChart3, Users, FileText,
  GraduationCap, Zap, FolderOpen, Settings,
} from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'

const nav = [
  { label: 'Visão Geral', icon: LayoutDashboard, to: '/' },
  { label: 'Performance', icon: BarChart3, to: '/performance' },
  { label: 'CRM', icon: Users, to: '/crm' },
  { label: 'Conteúdos', icon: FileText, to: '/conteudos' },
  { label: 'Treinamentos', icon: GraduationCap, to: '/treinamentos' },
  { label: 'Automação', icon: Zap, to: '/automacao' },
  { label: 'Documentos', icon: FolderOpen, to: '/documentos' },
  { label: 'Admin', icon: Settings, to: '/admin' },
]

export default function Sidebar({ open }: { open: boolean; onToggle: () => void }) {
  const { theme } = useTheme()
  const t = theme === 'light'

  return (
    <aside
      style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 40,
        width: 260, transform: open ? 'translateX(0)' : 'translateX(-260px)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
        background: t ? '#FFFFFF' : '#101013',
        borderRight: `1px solid ${t ? '#E5E5E3' : '#1c1c22'}`,
      }}
    >
      {/* Logo area */}
      <div style={{ padding: '24px 24px 8px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: t ? '#9CA3AF' : '#55555e', marginBottom: 12 }}>
          Cliente
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.04))',
            border: '1px solid rgba(212,168,83,0.18)',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#D4A853' }}>EX</span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: t ? '#111111' : '#F0EDE8', lineHeight: 1 }}>EX</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', color: t ? '#9CA3AF' : '#55555e', marginTop: 2 }}>Dashboard</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, margin: '16px 20px', background: t ? '#E5E5E3' : '#1c1c22' }} />

      {/* Nav */}
      <nav style={{ flex: 1, overflow: 'auto', padding: '4px 12px' }}>
        {nav.map((item) => (
          <NavLink
            key={item.to} to={item.to} end={item.to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px',
              borderRadius: 10, marginBottom: 2, textDecoration: 'none',
              fontSize: 13.5, fontWeight: 500, transition: 'all 0.15s',
              color: isActive ? '#D4A853' : (t ? '#6B7280' : '#7a7a85'),
              background: isActive ? 'rgba(212,168,83,0.06)' : 'transparent',
              borderLeft: isActive ? '3px solid #D4A853' : '3px solid transparent',
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} style={{ flexShrink: 0 }} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, margin: '8px 20px', background: t ? '#E5E5E3' : '#1c1c22' }} />

      {/* Plan */}
      <div style={{ padding: '16px 24px 24px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: t ? '#9CA3AF' : '#55555e' }}>Plano ativo</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: t ? '#111111' : '#F0EDE8', marginTop: 6 }}>Growth 360</div>
        <div style={{ marginTop: 12, height: 5, borderRadius: 3, background: t ? '#E5E5E3' : '#1c1c22', overflow: 'hidden' }}>
          <div style={{ width: '72%', height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #b8923f, #D4A853, #e8c97a)' }} />
        </div>
      </div>
    </aside>
  )
}

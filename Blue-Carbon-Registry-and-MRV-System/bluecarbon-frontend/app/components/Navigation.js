'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();

  const GovHeader = () => (
    <section style={{
      background: 'linear-gradient(135deg, rgba(240,253,244,0.97), rgba(236,253,245,0.97))',
      padding: '10px 24px',
      borderBottom: '1px solid rgba(22,163,74,0.1)',
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ color: '#5f7c6b' }}>தமிழ்நாடு அரசு</span>
        <span style={{ color: '#16a34a', fontWeight: 'bold' }}>TAMILNADU GOVERNMENT</span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <button
          onClick={() => router.push('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#16a34a',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Home
        </button>
        <span style={{ color: '#bbf7d0' }}>|</span>
        <img
          src="/tn_emblem.svg"
          alt="Ashok Stambha"
          style={{
            width: '30px',
            height: '30px',
            objectFit: 'contain',
            marginLeft: '5px'
          }}
        />
      </div>
    </section>
  );

  if (!isAuthenticated()) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <GovHeader />
        <nav className="nav" style={{ marginBottom: 0 }}>
          <div className="brand" style={{ cursor: 'pointer' }} onClick={() => router.push('/landing')}>
            <div className="logo">🌿</div>
            <div>
              <span style={{ color: '#14532d' }}>BlueCarbon</span> <span style={{ color: '#16a34a' }}>MRV</span>
              <div className="small" style={{ color: '#5f7c6b' }}>Registry & Tokenization</div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button onClick={() => router.push('/auth/login')} className="btn">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 0a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Login
            </button>
            <button onClick={() => router.push('/auth/register')} className="btn secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </button>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <GovHeader />
      <nav className="nav" style={{ marginBottom: 0 }}>
        <div className="brand" style={{ cursor: 'pointer' }} onClick={() => router.push('/projects')}>
          <div className="logo">🌿</div>
          <div>
            <span style={{ color: '#14532d' }}>BlueCarbon</span> <span style={{ color: '#16a34a' }}>Dashboard</span>
            <div className="small" style={{ color: '#5f7c6b' }}>Registry & Tokenization</div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {(user?.role === 'ngo' && !isAdmin()) && (
            <button onClick={() => router.push('/projects/new')} className="btn secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Project
            </button>
          )}

          {!isAdmin() && (
            <button onClick={() => router.push('/upload')} className="btn secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Evidence
            </button>
          )}

          <div className="flex items-center gap-4 pl-6" style={{ borderLeft: '1px solid rgba(22,163,74,0.2)' }}>
            <div className="text-right">
              <div className="text-sm font-semibold" style={{ color: '#14532d' }}>{user?.username}</div>
              <div className="text-xs" style={{ color: '#5f7c6b' }}>
                {user?.role?.toUpperCase()} {user?.organization_name && `• ${user.organization_name}`}
              </div>
            </div>
            <button
              onClick={logout}
              style={{
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}


'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', 'Outfit', sans-serif"
    }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(220, 38, 38, 0.1)',
        border: '1px solid rgba(220, 38, 38, 0.1)',
        padding: '40px',
        textAlign: 'center',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚫</div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#991b1b', // Red-800
            marginBottom: '10px'
          }}>
            Access Denied
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#ef4444', // Red-500
            lineHeight: '1.6'
          }}>
            You don't have permission to access this page. Please contact an administrator if you believe this is an error.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#16a34a',
              color: 'white',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
          >
            Go to Home
          </button>
          <button
            onClick={() => router.push('/auth/login')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#e2e8f0';
              e.target.style.color = '#1e293b';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.color = '#475569';
            }}
          >
            Login with Different Account
          </button>
        </div>
      </div>
    </div>
  );
}


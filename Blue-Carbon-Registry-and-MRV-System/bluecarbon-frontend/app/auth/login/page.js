'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { API_BASE } from '@/lib/api';

export default function LoginPage() {
  const [loginType, setLoginType] = useState('user');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();

      login(data.user, data.access_token);

      setTimeout(() => {
        if (data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/projects');
        }
      }, 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', 'Outfit', Arial, sans-serif",
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 30%, #d1fae5 60%, #a7f3d0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '48px 52px',
        borderRadius: '28px',
        boxShadow: '0 24px 64px rgba(22, 101, 52, 0.12), 0 0 0 1px rgba(22, 163, 74, 0.08)',
        border: '1px solid rgba(22, 163, 74, 0.1)',
        position: 'relative',
        animation: 'fade-in-up 0.6s ease-out'
      }}>
        {/* Leaf accent */}
        <div style={{ position: 'absolute', top: '-8px', right: '40px', fontSize: '28px', animation: 'leaf-sway 3s ease-in-out infinite' }}>
          🍃
        </div>

        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <button
            onClick={() => router.push('/landing')}
            style={{
              background: 'transparent',
              color: '#5f7c6b',
              border: 'none',
              padding: '8px 0',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => { e.target.style.color = '#16a34a'; }}
            onMouseOut={(e) => { e.target.style.color = '#5f7c6b'; }}
          >
            🏠 Back to Home
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌿</div>
          <h1 style={{
            fontSize: '30px',
            fontWeight: '700',
            marginBottom: '4px',
            color: '#14532d',
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#5f7c6b', fontSize: '14px', margin: 0 }}>Sign in to your carbon registry account</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            backgroundColor: '#f0fdf4',
            border: '2px solid rgba(22,163,74,0.15)',
            borderRadius: '14px',
            padding: '4px',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => setLoginType('user')}
              style={{
                flex: 1,
                padding: '12px 20px',
                border: 'none',
                backgroundColor: loginType === 'user' ? '#16a34a' : 'transparent',
                color: loginType === 'user' ? '#fff' : '#5f7c6b',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: loginType === 'user' ? '0 4px 14px rgba(22, 163, 74, 0.3)' : 'none'
              }}
            >
              👥 NGO / User
            </button>
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              style={{
                flex: 1,
                padding: '12px 20px',
                border: 'none',
                backgroundColor: loginType === 'admin' ? '#0f766e' : 'transparent',
                color: loginType === 'admin' ? '#fff' : '#5f7c6b',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: loginType === 'admin' ? '0 4px 14px rgba(15, 118, 110, 0.3)' : 'none'
              }}
            >
              🔐 Admin
            </button>
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          marginBottom: '24px',
          color: '#5f7c6b',
          textAlign: 'center'
        }}>
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/auth/register')}
            style={{
              background: 'linear-gradient(135deg, #16a34a, #059669)',
              color: 'white',
              border: 'none',
              padding: '5px 12px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            Sign up
          </button>
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '14px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid #fecaca',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '6px',
              color: '#14532d'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '13px 16px',
                border: '2px solid rgba(22,163,74,0.15)',
                borderRadius: '12px',
                fontSize: '15px',
                boxSizing: 'border-box',
                transition: 'all 0.25s ease',
                backgroundColor: '#fafff9',
                color: '#14532d'
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '6px',
              color: '#14532d'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  paddingRight: '70px',
                  border: '2px solid rgba(22,163,74,0.15)',
                  borderRadius: '12px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  transition: 'all 0.25s ease',
                  backgroundColor: '#fafff9',
                  color: '#14532d'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #16a34a, #0d9488)',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  letterSpacing: '0.03em'
                }}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '22px'
          }}>
            <input
              type="checkbox"
              id="keepLoggedIn"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              style={{
                marginRight: '8px',
                transform: 'scale(1.2)',
                accentColor: '#16a34a'
              }}
            />
            <label htmlFor="keepLoggedIn" style={{
              fontSize: '13px',
              color: '#5f7c6b',
              cursor: 'pointer'
            }}>
              Keep me logged in
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading ? '#94a3b8' : 'linear-gradient(135deg, #16a34a, #0d9488)',
              color: 'white',
              border: 'none',
              padding: '15px 24px',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '14px',
              boxShadow: isLoading ? 'none' : '0 6px 20px rgba(22, 163, 74, 0.3)',
              letterSpacing: '0.02em'
            }}
          >
            {isLoading ? '⌛ Signing in...' : '➜ Sign in'}
          </button>

          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              type="button"
              onClick={() => {
                if (loginType === 'admin') {
                  setFormData({ username: 'admin', password: 'admin123' });
                } else {
                  setFormData({ username: '', password: '' });
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #059669, #0d9488)',
                color: 'white',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 3px 10px rgba(5, 150, 105, 0.25)'
              }}
            >
              {loginType === 'admin' ? '⌨️ Fill Admin Credentials' : '🧹 Clear Form'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes leaf-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  );
}


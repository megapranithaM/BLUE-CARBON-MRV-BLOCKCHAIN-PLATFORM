'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/api';

export default function RegisterPage() {
  const [userRole, setUserRole] = useState('ngo');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization_name: '',
    wallet_address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: userRole,
          organization_name: formData.organization_name || null,
          wallet_address: formData.wallet_address || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_info', JSON.stringify(data.user));
      router.push('/projects');
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

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    border: '2px solid rgba(22,163,74,0.15)',
    borderRadius: '12px',
    fontSize: '15px',
    boxSizing: 'border-box',
    transition: 'all 0.25s ease',
    backgroundColor: '#fafff9',
    color: '#14532d'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#14532d'
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
        top: '-120px',
        left: '-120px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '44px 48px',
        borderRadius: '28px',
        boxShadow: '0 24px 64px rgba(22, 101, 52, 0.12), 0 0 0 1px rgba(22, 163, 74, 0.08)',
        border: '1px solid rgba(22, 163, 74, 0.1)',
        position: 'relative',
        animation: 'fade-in-up 0.6s ease-out'
      }}>
        {/* Leaf accent */}
        <div style={{ position: 'absolute', top: '-8px', left: '40px', fontSize: '28px', animation: 'leaf-sway 3s ease-in-out infinite' }}>
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

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌿</div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '4px',
            color: '#14532d',
          }}>
            Create Account
          </h1>
          <p style={{ color: '#5f7c6b', fontSize: '14px', margin: 0 }}>Join the Blue Carbon Registry</p>
        </div>

        <p style={{
          fontSize: '14px',
          marginBottom: '20px',
          color: '#5f7c6b',
          textAlign: 'center'
        }}>
          Already have an account?{' '}
          <button
            onClick={() => router.push('/auth/login')}
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
            Sign in
          </button>
        </p>

        {/* Role Selector */}
        <div style={{ marginBottom: '22px' }}>
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
              onClick={() => setUserRole('ngo')}
              style={{
                flex: 1,
                padding: '11px 14px',
                border: 'none',
                backgroundColor: userRole === 'ngo' ? '#16a34a' : 'transparent',
                color: userRole === 'ngo' ? '#fff' : '#5f7c6b',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: userRole === 'ngo' ? '0 4px 12px rgba(22, 163, 74, 0.3)' : 'none'
              }}
            >
              🏢 NGO
            </button>
            <button
              type="button"
              onClick={() => setUserRole('gram_panchayat')}
              style={{
                flex: 1,
                padding: '11px 14px',
                border: 'none',
                backgroundColor: userRole === 'gram_panchayat' ? '#059669' : 'transparent',
                color: userRole === 'gram_panchayat' ? '#fff' : '#5f7c6b',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: userRole === 'gram_panchayat' ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none'
              }}
            >
              🏘️ Gram Panchayat
            </button>
            <button
              type="button"
              onClick={() => setUserRole('individual')}
              style={{
                flex: 1,
                padding: '11px 14px',
                border: 'none',
                backgroundColor: userRole === 'individual' ? '#0d9488' : 'transparent',
                color: userRole === 'individual' ? '#fff' : '#5f7c6b',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: userRole === 'individual' ? '0 4px 12px rgba(13, 148, 136, 0.3)' : 'none'
              }}
            >
              👤 Individual
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '14px',
            borderRadius: '12px',
            marginBottom: '18px',
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
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Choose a username"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a strong password"
                style={{ ...inputStyle, paddingRight: '70px' }}
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
                  borderRadius: '8px'
                }}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={labelStyle}>Confirm Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                style={{ ...inputStyle, paddingRight: '70px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  borderRadius: '8px'
                }}
              >
                {showConfirmPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
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
              boxShadow: isLoading ? 'none' : '0 6px 20px rgba(22, 163, 74, 0.3)',
              letterSpacing: '0.02em'
            }}
          >
            {isLoading ? '⌛ Creating Account...' : '➜ Create Account'}
          </button>
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


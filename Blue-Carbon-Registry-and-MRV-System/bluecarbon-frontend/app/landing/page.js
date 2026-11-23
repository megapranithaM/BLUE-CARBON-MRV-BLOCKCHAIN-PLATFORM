'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/projects');
    }
  }, [isAuthenticated, router]);

  const navItems = [
    { icon: '📊', label: 'TOPICS', route: '/topics' },
    { icon: '🏛️', label: 'SERVICES', route: '/services' },
    { icon: '🏢', label: 'GOVERNMENT', route: '/my-government' },
    { icon: '👥', label: 'COMMUNITY', route: '/people-groups' },
    { icon: '🌊', label: 'BLUE CARBON', route: '/topics' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      overflowX: 'hidden'
    }}>
      {/* Premium GOI Strip */}
      <section style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(22, 163, 74, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '12px 0'
      }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/tn_emblem.svg" alt="Gov Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>தமிழ்நாடு அரசு</span>
              <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: '800', letterSpacing: '0.02em' }}>TAMILNADU GOVERNMENT</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <nav style={{ display: 'flex', gap: '24px', marginRight: '20px' }}>
              {['About', 'Services', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => router.push(`/${link.toLowerCase()}`)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#64748b',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#16a34a'}
                  onMouseOut={(e) => e.target.style.color = '#64748b'}
                >
                  {link}
                </button>
              ))}
            </nav>
            <button
              onClick={() => router.push('/auth/login')}
              style={{
                background: 'linear-gradient(135deg, #16a34a, #059669)',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(22, 163, 74, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.2)';
              }}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Modern Hero Section */}
      <section style={{
        padding: '80px 0 120px 0',
        background: 'radial-gradient(circle at top right, #f0fdf4, #f8fafc), radial-gradient(circle at bottom left, #ecfdf5, #f8fafc)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div style={{ animation: 'fadeInLeft 1s ease-out' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(22, 163, 74, 0.1)',
              borderRadius: '30px',
              marginBottom: '24px',
              border: '1px solid rgba(22, 163, 74, 0.2)'
            }}>
              <span style={{ fontSize: '18px' }}>🌿</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#16a34a', letterSpacing: '0.05em' }}>OFFICIAL GOVERNMENT PORTAL</span>
            </div>

            <h1 style={{
              fontSize: '64px',
              fontWeight: '900',
              lineHeight: '1.1',
              color: '#0f172a',
              marginBottom: '24px',
              letterSpacing: '-2px'
            }}>
              Blockchain Protocol for <span style={{
                background: 'linear-gradient(135deg, #16a34a, #0d9488)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Blue Carbon MRV</span> & Tokenized Credits
            </h1>

            <p style={{
              fontSize: '20px',
              color: '#475569',
              lineHeight: '1.6',
              marginBottom: '40px',
              maxWidth: '600px'
            }}>
              Join India's national initiative in coastal ecosystem restoration. Track, verify, and trade carbon credits with absolute transparency and AI-powered precision.
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                onClick={() => router.push('/auth/register')}
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '20px 40px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(22, 163, 74, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Register Your Project
              </button>
              <button
                onClick={() => document.getElementById('quick-nav')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'white',
                  color: '#0f172a',
                  border: '1px solid #e2e8f0',
                  padding: '20px 40px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#f1f5f9'}
                onMouseOut={(e) => e.target.style.background = 'white'}
              >
                Explore Services
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', animation: 'fadeInRight 1s ease-out' }}>
            {/* Main Stats Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(30px)',
              padding: '40px',
              borderRadius: '32px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 40px 80px rgba(22, 163, 74, 0.12)',
              position: 'relative',
              zIndex: 2
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px', color: '#1e293b', textAlign: 'center' }}>
                MRV Platform Stats
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  { label: 'Registered Projects', value: '840+', color: '#16a34a' },
                  { label: 'Carbon Credits', value: '2.4M', color: '#0d9488' },
                  { label: 'Coastal Areas', value: '12', color: '#3b82f6' },
                  { label: 'NGO Partners', value: '150+', color: '#f59e0b' }
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '16px', borderRadius: '20px', backgroundColor: 'rgba(240, 253, 244, 0.5)', border: '1px solid rgba(22, 163, 74, 0.05)' }}>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: stat.color, marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '32px', padding: '20px', borderRadius: '16px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white' }}>
                <p style={{ fontSize: '14px', fontStyle: 'italic', margin: 0, textAlign: 'center', color: '#94a3b8' }}>
                  "Transparency is the cornerstone of trust in carbon markets."
                </p>
              </div>
            </div>
            {/* Background blob */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, transparent 70%)',
              zIndex: 1,
              animation: 'float 6s ease-in-out infinite'
            }} />
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section id="quick-nav" style={{ padding: '60px 0', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px'
          }}>
            {navItems.map((item, i) => (
              <div
                key={i}
                onClick={() => router.push(item.route)}
                style={{
                  background: 'white',
                  padding: '30px 20px',
                  borderRadius: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(22, 163, 74, 0.1)';
                  e.currentTarget.style.borderColor = '#16a34a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(22, 163, 74, 0.05)',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 16px'
                }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '0.02em' }}>{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>

            {/* News Card */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '32px',
              padding: '40px',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Latest News</h3>
                <span style={{ fontSize: '24px' }}>📰</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { date: '21 Sep', title: 'Blue Carbon Projects Secure Exclusive Rights' },
                  { date: '18 Sep', title: 'MRV Framework Crucial for Global Carbon' },
                  { date: '15 Sep', title: 'New Satellite Data Verification Released' }
                ].map((news, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', cursor: 'pointer' }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <div style={{ padding: '8px 12px', background: 'white', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '14px', fontWeight: '900', color: '#16a34a' }}>{news.date.split(' ')[0]}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700' }}>{news.date.split(' ')[1]}</div>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#334155', lineHeight: '1.4' }}>{news.title}</div>
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: '40px',
                width: '100%',
                padding: '16px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                color: '#16a34a',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => e.target.style.background = '#f1f5f9'}
                onMouseOut={(e) => e.target.style.background = 'white'}
              >View All News →</button>
            </div>

            {/* Resources Card */}
            <div style={{
              background: 'linear-gradient(135deg, #16a34a, #059669)',
              borderRadius: '32px',
              padding: '40px',
              color: 'white',
              boxShadow: '0 20px 40px rgba(22, 163, 74, 0.2)'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px', color: 'white' }}>Registry Resources 📊</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Registration Guidelines 2025',
                  'Verification Process PDF',
                  'Assessment Methodology',
                  'Registry API Documentation',
                  'Coastal Ecosystem Forms'
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease'
                  }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    <span>→</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Initiatives Card */}
            <div style={{
              background: '#0f172a',
              borderRadius: '32px',
              padding: '40px',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '32px', color: '#38bdf8' }}>Ongoing Initiatives 🚀</h3>
              <div style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#e2e8f0' }}>International Year of Blue Carbon</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>India leads the global mission to protect 100,000 hectares of mangroves by 2030.</p>
              </div>
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '24px',
                padding: '24px'
              }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#86efac' }}>National Portal of Registry</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Unified platform for all carbon credit transactions across India's coastline.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#020617', color: 'white', padding: '80px 0 40px 0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '80px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <img src="/tn_emblem.svg" alt="Ashok Stambha" style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, letterSpacing: '0.05em' }}>தமிழ்நாடு அரசு</h3>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', margin: 0 }}>TAMILNADU GOVERNMENT</h3>
                </div>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.8' }}>
                Official National Blue Carbon Registry. Dedicated to preserving marine ecosystems and enabling sustainable carbon markets through advanced MRV technology.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.05em' }}>NAVIGATE</h4>
                {['About Us', 'Services', 'Topics', 'Home'].map(link => (
                  <button key={link} onClick={() => router.push(`/${link.toLowerCase().replace(' ', '-')}`)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', textAlign: 'left', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>{link}</button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.05em' }}>LEGAL</h4>
                {['Website Policy', 'Terms of Use', 'Privacy Policy'].map(link => (
                  <button key={link} onClick={() => router.push('/policy')} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', textAlign: 'left', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>{link}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>© 2025 Blue Carbon Registry. Built with 🌿 for India.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span style={{ fontSize: '13px', color: '#475569' }}>Last Updated: Sep 21, 2025</span>
              <span style={{ fontSize: '13px', color: '#4d7c0f', fontWeight: 'bold' }}>VERSION 4.0</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        button { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>
    </div>
  );
}


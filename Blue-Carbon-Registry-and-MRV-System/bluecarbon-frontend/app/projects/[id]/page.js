'use client'
import { use, useEffect, useState } from 'react'
import { getProjectById, getEvidences, getCredits } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'

export default function ProjectDetail({ params }) {
  // ✅ unwrap params (Next.js 13+ App Router gives params as Promise)
  const { id } = use(params)
  const router = useRouter()
  const { user, logout } = useAuth()

  const [project, setProject] = useState(null)
  const [evidences, setEvidences] = useState([])
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      // 1. Fetch core project data first
      const proj = await getProjectById(id)
      setProject(proj)

      // 2. Fetch evidences
      try {
        const ev = await getEvidences(id)
        setEvidences(ev)
      } catch (evErr) {
        console.error("Failed to load evidences:", evErr)
      }

      // 3. Fetch credit balance (non-blocking)
      if (proj && proj.owner) {
        try {
          const creditInfo = await getCredits(proj.owner)
          setCredits(creditInfo)
        } catch (creditErr) {
          console.error("Failed to load credits:", creditErr)
          // Set a fallback balance of 0 if fetch fails
          setCredits({ balance: 0, address: proj.owner, error: true })
        }
      }
    } catch (err) {
      console.error("Failed to load project core data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()

    // 🔄 refresh every 10s so uploads/credits show up
    const interval = setInterval(() => load(), 10000)
    return () => clearInterval(interval)
  }, [id])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', 'Outfit', sans-serif"
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #dcfce7',
          borderTop: '4px solid #16a34a',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', 'Outfit', sans-serif",
        color: '#dc2626',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Project not found.
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif"
    }}>
      {/* Top Header Bar */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(240,253,244,0.97), rgba(236,253,245,0.97))',
        padding: '10px 0',
        borderBottom: '1px solid rgba(22,163,74,0.1)',
        fontSize: '14px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
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
            <button
              onClick={logout || (() => router.push('/auth/login'))}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {user ? 'Logout' : 'Login'}
            </button>
            <img
              src="/tn_emblem.svg"
              alt="Ashok Stambha"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                marginLeft: '15px'
              }}
            />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Navigation / Header */}
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#16a34a',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            ← Back to Home
          </button>
          <h1 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d'
          }}>
            Project Details
          </h1>
        </div>

        {/* Project Info Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(22, 163, 74, 0.1)',
          border: '1px solid rgba(22, 163, 74, 0.1)',
          padding: '40px',
          marginBottom: '30px',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
            <div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #16a34a, #0d9488)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 10px 0'
              }}>
                {project.name}
              </h2>
              <p style={{ color: '#5f7c6b', fontSize: '16px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                📍 {project.location}
                <span style={{ width: '4px', height: '4px', backgroundColor: '#bbf7d0', borderRadius: '50%' }}></span>
                🌳 {project.hectares} Hectares
              </p>
            </div>

            <div style={{
              padding: '10px 20px',
              borderRadius: '12px',
              backgroundColor: project.totalIssuedCredits > 0 ? '#ecfdf5' : '#fff7ed',
              border: `1px solid ${project.totalIssuedCredits > 0 ? '#10b981' : '#f97316'}`,
              color: project.totalIssuedCredits > 0 ? '#047857' : '#c2410c',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {project.totalIssuedCredits > 0 ? "✅ Verified Project" : "⏳ Verification Pending"}
            </div>
          </div>

          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '10px' }}>
              Project Metadata
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 4px 0' }}>Owner Wallet</p>
                <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#334155', margin: 0, wordBreak: 'break-all' }}>
                  {project.owner}
                </p>
              </div>
              {credits && (
                <div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 4px 0' }}>Available Credits</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
                    {credits.balance} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>BCC</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Evidence Section */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          padding: '40px',
          border: '1px solid #f1f5f9'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📁 Evidence & Documentation
            <span style={{
              fontSize: '12px',
              backgroundColor: '#e2e8f0',
              padding: '2px 8px',
              borderRadius: '12px',
              color: '#64748b'
            }}>
              {evidences.length}
            </span>
          </h3>

          {evidences.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              {evidences.map(ev => (
                <div key={ev.evidenceId} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.2s',
                  backgroundColor: '#f8fafc',
                  cursor: 'default'
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: '#334155' }}>Evidence #{ev.evidenceId}</span>
                    <a
                      href={ev.evidenceURI}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '13px',
                        color: '#16a34a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      View Document ↗
                    </a>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    <p style={{ margin: '0 0 4px 0', fontFamily: 'monospace' }}>
                      <span style={{ color: '#94a3b8' }}>Hash:</span> {ev.evidenceHash?.slice(0, 20)}...
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ color: '#94a3b8' }}>Uploaded by:</span> {ev.uploader?.slice(0, 10)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#94a3b8',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px dashed #cbd5e1'
            }}>
              <p style={{ fontSize: '16px', margin: '0 0 8px 0' }}>Thinking...</p>
              <p style={{ margin: 0 }}>No evidence documents uploaded for this project yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

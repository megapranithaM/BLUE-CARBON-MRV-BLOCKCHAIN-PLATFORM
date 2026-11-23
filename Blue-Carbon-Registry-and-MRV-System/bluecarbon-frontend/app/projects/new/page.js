'use client'
import { useState } from 'react'
import { registerProject } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'

export default function NewProject() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    hectares: 0,
    owner: "",
    metadata: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await registerProject(form)
      router.push("/projects")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => router.push('/projects')}
              style={{
                background: 'none',
                border: 'none',
                color: '#5f7c6b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 auto'
              }}
            >
              ← Back to Dashboard
            </button>
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #16a34a, #0d9488)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            Register New Project
          </h1>
          <p style={{
            color: '#5f7c6b',
            fontSize: '16px',
            margin: 0
          }}>
            Create a new blue carbon project in the registry
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(22, 163, 74, 0.15)',
          border: '1px solid rgba(22, 163, 74, 0.1)',
          padding: '40px 50px'
        }}>
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '15px',
              borderRadius: '12px',
              marginBottom: '25px',
              fontSize: '15px',
              border: '1px solid #fecaca',
              fontWeight: '500'
            }}>
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Project Name *
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter project name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #dcfce7',
                  borderRadius: '12px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fafff9',
                  color: '#14532d'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Location *
              </label>
              <input
                name="location"
                type="text"
                placeholder="Enter project location"
                value={form.location}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #dcfce7',
                  borderRadius: '12px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fafff9',
                  color: '#14532d'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Area (Hectares) *
              </label>
              <input
                name="hectares"
                type="number"
                placeholder="Enter area in hectares"
                value={form.hectares}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #dcfce7',
                  borderRadius: '12px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fafff9',
                  color: '#14532d'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Owner Wallet Address *
              </label>
              <input
                name="owner"
                type="text"
                placeholder="Enter blockchain wallet address"
                value={form.owner}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #dcfce7',
                  borderRadius: '12px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fafff9',
                  color: '#14532d',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Project Metadata *
              </label>
              <textarea
                name="metadata"
                placeholder="Enter project metadata (JSON format or description)"
                value={form.metadata}
                onChange={handleChange}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #dcfce7',
                  borderRadius: '12px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fafff9',
                  color: '#14532d',
                  resize: 'vertical',
                  minHeight: '120px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #16a34a, #0d9488)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: loading ? 'none' : '0 4px 15px rgba(22, 163, 74, 0.3)'
                }}
              >
                {loading ? 'Creating Project...' : 'Create Project'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/projects')}
                style={{
                  background: 'linear-gradient(135deg, #5f7c6b, #3d5a3d)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(95, 124, 107, 0.3)'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


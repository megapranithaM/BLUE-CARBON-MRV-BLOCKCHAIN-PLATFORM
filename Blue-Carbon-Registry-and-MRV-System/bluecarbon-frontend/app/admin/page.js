'use client'
import { useState, useEffect } from 'react'
import { getProjects, getEvidences, verifyProject, getCredits } from '@/lib/api'
import { useAuth, withAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { API_BASE } from '@/lib/api'

// Add spinner animation CSS
const spinnerKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

function AdminPage() {
  const [projects, setProjects] = useState([])
  const [credits, setCredits] = useState([])
  const [verifications, setVerifications] = useState([])
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('projects')
  const [loading, setLoading] = useState(true)
  const { user, logout, getAuthToken } = useAuth()
  const router = useRouter()

  // 🔄 Load projects + evidences + credits
  async function loadData() {
    try {
      const proj = await getProjects()

      // fetch evidences for each project
      const projectsWithEvidences = await Promise.all(
        proj.map(async p => {
          const evidences = await getEvidences(p.id)
          return { ...p, evidences }
        })
      )
      setProjects(projectsWithEvidences)

      // credits for each project owner
      const creditData = await Promise.all(
        proj.map(p => getCredits(p.owner))
      )
      setCredits(creditData)
    } catch (err) {
      console.error("❌ Failed to load data", err)
    } finally {
      setLoading(false)
    }
  }

  // Load users (admin only)
  async function loadUsers() {
    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const usersData = await response.json()
        setUsers(usersData)
      }
    } catch (err) {
      console.error("❌ Failed to load users", err)
    }
  }

  useEffect(() => {
    loadData()
    if (activeTab === 'users') {
      loadUsers()
    }
  }, [activeTab])

  async function handleVerify(evidenceId, projectId, owner) {
    try {
      // Don't specify mint_amount - let backend use AI-calculated credits
      await verifyProject(evidenceId, { mint_receipt: true })

      // refresh after successful verification
      await loadData()

      setVerifications(prev => [
        ...prev,
        { id: 'v' + Date.now(), projectId, time: new Date().toISOString() }
      ])
      alert('✅ Evidence verified & credits minted')
    } catch (err) {
      console.error(err)
      alert('❌ Verification failed: ' + err.message)
    }
  }

  async function handleReject(evidenceId, projectId) {
    const reason = prompt('Please provide a reason for rejecting this evidence:')
    if (!reason) return

    try {
      const response = await fetch(`${API_BASE}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          evidence_id: evidenceId,
          reason: reason
        })
      })

      if (!response.ok) {
        throw new Error('Failed to reject evidence')
      }

      // refresh after successful rejection
      await loadData()
      alert('✅ Evidence rejected and removed')
    } catch (err) {
      console.error(err)
      alert('❌ Rejection failed: ' + err.message)
    }
  }

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: spinnerKeyframes }} />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: "'Inter', 'Outfit', sans-serif",
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)'
        }}>
          <div style={{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '50px 60px',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(22, 163, 74, 0.15)',
            border: '1px solid rgba(22, 163, 74, 0.1)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              border: '4px solid #dcfce7',
              borderTop: '4px solid #16a34a',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px auto'
            }}></div>
            <p style={{
              color: '#16a34a',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Loading admin dashboard...
            </p>
          </div>
        </div>
      </>
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
              onClick={logout}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Logout Admin
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

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Dashboard Title & Tabs */}
        <div style={{
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #16a34a, #0d9488)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              color: '#5f7c6b',
              fontSize: '16px',
              margin: 0
            }}>
              Manage projects, verify evidence, and mint carbon credits
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(255,255,255,0.6)',
            padding: '5px',
            borderRadius: '16px',
            border: '1px solid #dcfce7'
          }}>
            {[
              { id: 'projects', name: 'Projects & Verifications', icon: '🏛️' },
              { id: 'users', name: 'User Management', icon: '👥' },
              { id: 'stats', name: 'Statistics', icon: '📊' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? '#16a34a' : '#5f7c6b',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeTab === tab.id ? '0 4px 15px rgba(22, 163, 74, 0.1)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'projects' && (
            <div style={{ marginBottom: '30px' }}>
              {projects.length === 0 ? (
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  boxShadow: '0 10px 30px rgba(22, 163, 74, 0.1)',
                  border: '1px solid rgba(22, 163, 74, 0.1)',
                  padding: '60px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#14532d', marginBottom: '8px' }}>
                    No Projects Found
                  </h3>
                  <p style={{ color: '#5f7c6b', fontSize: '16px' }}>
                    There are currently no projects registered in the system.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {projects.map((project) => (
                    <div key={project.id} style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
                      border: '1px solid rgba(22, 163, 74, 0.1)',
                      overflow: 'hidden',
                      transition: 'transform 0.2s ease'
                    }}>
                      <div style={{ padding: '30px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          marginBottom: '25px',
                          borderBottom: '1px solid #f0fdf4',
                          paddingBottom: '20px'
                        }}>
                          <div>
                            <div style={{
                              display: 'inline-block',
                              padding: '6px 12px',
                              backgroundColor: '#f0fdf4',
                              color: '#16a34a',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600',
                              marginBottom: '10px'
                            }}>
                              PROJECT #{project.id}
                            </div>
                            <h3 style={{
                              fontSize: '24px',
                              fontWeight: '700',
                              color: '#14532d',
                              margin: '0 0 8px 0'
                            }}>
                              {project.name}
                            </h3>
                            <div style={{ display: 'flex', gap: '15px', color: '#5f7c6b', fontSize: '14px' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                📍 {project.location}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                📏 {project.hectares} hectares
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                👤 Owner: {project.owner}
                              </span>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{
                              backgroundColor: '#ecfdf5',
                              padding: '15px 25px',
                              borderRadius: '16px',
                              border: '1px solid #10b981'
                            }}>
                              <p style={{
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: '#047857',
                                margin: '0 0 5px 0',
                                fontWeight: '600'
                              }}>
                                Credits Issued
                              </p>
                              <p style={{
                                fontSize: '32px',
                                fontWeight: '800',
                                color: '#059669',
                                margin: 0
                              }}>
                                {project.totalIssuedCredits || 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Evidence Section */}
                        <div>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            📄 Evidence Submissions
                            <span style={{
                              backgroundColor: '#e5e7eb',
                              color: '#374151',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {project.evidences?.length || 0}
                            </span>
                          </h4>

                          {project.evidences && project.evidences.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                              {project.evidences.map(evidence => (
                                <div key={evidence.evidenceId} style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  backgroundColor: evidence.verified ? '#f0fdf4' : '#fffbeb',
                                  padding: '20px',
                                  borderRadius: '16px',
                                  border: `1px solid ${evidence.verified ? '#bbf7d0' : '#fcd34d'}`,
                                  transition: 'all 0.2s ease'
                                }}>
                                  <div style={{ flex: 1 }}>
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '10px',
                                      marginBottom: '8px'
                                    }}>
                                      <span style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: evidence.verified ? '#15803d' : '#92400e'
                                      }}>
                                        Evidence #{evidence.evidenceId}
                                      </span>
                                      {evidence.verified ? (
                                        <span style={{
                                          fontSize: '12px',
                                          backgroundColor: '#dcfce7',
                                          color: '#15803d',
                                          padding: '2px 8px',
                                          borderRadius: '8px',
                                          fontWeight: '600'
                                        }}>
                                          VERIFIED
                                        </span>
                                      ) : (
                                        <span style={{
                                          fontSize: '12px',
                                          backgroundColor: '#fef3c7',
                                          color: '#92400e',
                                          padding: '2px 8px',
                                          borderRadius: '8px',
                                          fontWeight: '600'
                                        }}>
                                          PENDING REVIEW
                                        </span>
                                      )}
                                    </div>
                                    <div style={{
                                      fontSize: '13px',
                                      color: '#4b5563',
                                      display: 'flex',
                                      gap: '15px',
                                      flexWrap: 'wrap'
                                    }}>
                                      <span>👤 {evidence.uploader}</span>
                                      <span>📍 {evidence.gps}</span>
                                      <span>☁️ CO2: {evidence.co2} tonnes</span>
                                      <span>📅 {new Date(evidence.timestamp || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                  </div>

                                  {!evidence.verified && (
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <button
                                        onClick={() => handleVerify(evidence.evidenceId, project.id, project.owner)}
                                        style={{
                                          padding: '10px 20px',
                                          background: 'linear-gradient(135deg, #16a34a, #0d9488)',
                                          color: 'white',
                                          border: 'none',
                                          borderRadius: '10px',
                                          fontSize: '13px',
                                          fontWeight: '600',
                                          cursor: 'pointer',
                                          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '6px'
                                        }}
                                      >
                                        <span>✅</span> Verify & Mint
                                      </button>
                                      <button
                                        onClick={() => handleReject(evidence.evidenceId, project.id)}
                                        style={{
                                          padding: '10px 20px',
                                          background: 'white',
                                          color: '#dc2626',
                                          border: '1px solid #fecaca',
                                          borderRadius: '10px',
                                          fontSize: '13px',
                                          fontWeight: '600',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '6px'
                                        }}
                                      >
                                        <span>🚫</span> Reject
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{
                              padding: '20px',
                              backgroundColor: '#f9fafb',
                              borderRadius: '12px',
                              color: '#6b7280',
                              fontSize: '14px',
                              textAlign: 'center',
                              fontStyle: 'italic'
                            }}>
                              No evidence uploaded for verification yet.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div style={{ marginBottom: '30px' }}>
              {users.length === 0 ? (
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(22, 163, 74, 0.1)',
                  padding: '60px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#64748b', fontSize: '16px' }}>No users found</p>
                </div>
              ) : (
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
                  border: '1px solid rgba(22, 163, 74, 0.1)',
                  overflow: 'hidden'
                }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f0fdf4' }}>
                          <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px' }}>User</th>
                          <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px' }}>Role</th>
                          <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px' }}>Organization</th>
                          <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                          <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px' }}>Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((userItem, index) => (
                          <tr key={userItem.id} style={{ borderBottom: index < users.length - 1 ? '1px solid #f0fdf4' : 'none' }}>
                            <td style={{ padding: '20px' }}>
                              <div style={{ fontWeight: '600', color: '#1f2937' }}>{userItem.username}</div>
                              <div style={{ fontSize: '13px', color: '#6b7280' }}>{userItem.email}</div>
                            </td>
                            <td style={{ padding: '20px' }}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                backgroundColor: userItem.role === 'admin' ? '#fef2f2' : '#f0fdf4',
                                color: userItem.role === 'admin' ? '#dc2626' : '#16a34a'
                              }}>
                                {userItem.role.toUpperCase()}
                              </span>
                            </td>
                            <td style={{ padding: '20px', color: '#4b5563' }}>{userItem.organization_name || '-'}</td>
                            <td style={{ padding: '20px' }}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                backgroundColor: userItem.is_active ? '#f0fdf4' : '#fef2f2',
                                color: userItem.is_active ? '#16a34a' : '#dc2626'
                              }}>
                                {userItem.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td style={{ padding: '20px', color: '#6b7280', fontSize: '14px' }}>
                              {new Date(userItem.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '25px'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
                border: '1px solid rgba(22, 163, 74, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: '#f0fdf4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px'
                }}>
                  🏛️
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Total Projects</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#14532d' }}>{projects.length}</div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
                border: '1px solid rgba(22, 163, 74, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px'
                }}>
                  👥
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Total Users</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#059669' }}>{users.length}</div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
                border: '1px solid rgba(22, 163, 74, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: '#fffbeb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px'
                }}>
                  ✅
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Verified Evidence</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#b45309' }}>
                    {projects.reduce((total, p) => total + (p.evidences?.filter(e => e.verified).length || 0), 0)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Export with admin authentication required
export default withAuth(AdminPage, 'admin')


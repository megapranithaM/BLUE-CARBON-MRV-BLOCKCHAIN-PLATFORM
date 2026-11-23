'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getProjects } from '@/lib/api'

// ethers v6 imports
import { ethers } from 'ethers'
import { keccak256, toUtf8Bytes } from 'ethers'

// ABI
import BlueCarbonRegistry from '@/artifacts/contracts/BlueCarbonRegistry.sol/BlueCarbonRegistry.json'

const REGISTRY_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318" // replace with deployed contract address

// Simple map component using Leaflet
const MapSelector = ({ coordinates, onCoordinatesChange }) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if (showMap && !mapLoaded) {
      // Load Leaflet CSS and JS dynamically
      const loadLeaflet = async () => {
        if (typeof window !== 'undefined' && !window.L) {
          // Load CSS
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)

          // Load JS
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.onload = () => {
            setMapLoaded(true)
            initializeMap()
          }
          document.head.appendChild(script)
        } else if (window.L) {
          setMapLoaded(true)
          initializeMap()
        }
      }

      loadLeaflet()
    }
  }, [showMap])

  const initializeMap = () => {
    if (!window.L) return

    // Default coordinates (center of world)
    const defaultLat = coordinates ? parseFloat(coordinates.split(',')[0]) : 0
    const defaultLng = coordinates ? parseFloat(coordinates.split(',')[1]) : 0

    const map = window.L.map('map-container').setView([defaultLat, defaultLng], 2)

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    let marker = null
    if (coordinates) {
      marker = window.L.marker([defaultLat, defaultLng]).addTo(map)
    }

    map.on('click', (e) => {
      const { lat, lng } = e.latlng
      const coordString = `${lat.toFixed(6)},${lng.toFixed(6)}`
      onCoordinatesChange(coordString)

      if (marker) {
        map.removeLayer(marker)
      }
      marker = window.L.marker([lat, lng]).addTo(map)
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
          }}
        >
          {showMap ? '📍 Hide Map' : '🗺️ Select from Map'}
        </button>

        {coordinates && (
          <button
            type="button"
            onClick={() => onCoordinatesChange('')}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)'
            }}
          >
            Clear Location
          </button>
        )}
      </div>

      {showMap && (
        <div style={{
          marginBottom: '15px',
          border: '2px solid #dcfce7',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div
            id="map-container"
            style={{
              height: '300px',
              width: '100%',
              backgroundColor: '#f0fdf4'
            }}
          >
            {!mapLoaded && (
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16a34a',
                fontSize: '16px'
              }}>
                Loading map...
              </div>
            )}
          </div>
          <div style={{
            padding: '10px 15px',
            backgroundColor: '#f0fdf4',
            fontSize: '13px',
            color: '#15803d',
            borderTop: '1px solid #dcfce7'
          }}>
            💡 Click anywhere on the map to select coordinates
          </div>
        </div>
      )}
    </div>
  )
}

export default function UploadPage() {
  const search = useSearchParams()
  const router = useRouter()
  const queryProjectId = search.get('projectId') || ''

  const [projectId, setProjectId] = useState(queryProjectId)
  const [projects, setProjects] = useState([])
  const [uploader, setUploader] = useState('')
  const [gps, setGps] = useState('')
  // Removed co2 state - now calculated automatically by AI
  // Removed files state - now using specific before/after image uploads
  const [status, setStatus] = useState('')

  // New fields for AI verification - separate before/after images
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const [projectAreaHectares, setProjectAreaHectares] = useState('')
  const [timePeriodYears, setTimePeriodYears] = useState('1.0')
  const [ecosystemType, setEcosystemType] = useState('mangrove')

  // Estimation state
  const [estimation, setEstimation] = useState(null)
  const [estimationLoading, setEstimationLoading] = useState(false)
  const [showEstimation, setShowEstimation] = useState(false)

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(err => setStatus("Failed to fetch projects: " + err.message))
  }, [])

  // Function to estimate carbon credits
  async function estimateCredits() {
    if (!projectAreaHectares || projectAreaHectares <= 0) {
      setStatus('Please enter a valid project area to get estimation')
      return
    }

    setEstimationLoading(true)
    setEstimation(null)

    try {
      const formData = new FormData()
      formData.append('project_area_hectares', projectAreaHectares)
      formData.append('time_period_years', timePeriodYears)
      formData.append('ecosystem_type', ecosystemType)

      // Add images if available (for AI analysis)
      if (beforeImage && afterImage) {
        // Both images available - AI analysis
        formData.append('before_image', beforeImage)
        formData.append('after_image', afterImage)
      } else if (beforeImage) {
        // Only before image
        formData.append('before_image', beforeImage)
      } else if (afterImage) {
        // Only after image  
        formData.append('after_image', afterImage)
      }

      const response = await fetch('http://127.0.0.1:8000/estimate-carbon-credits', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.detail || 'Estimation failed')
      }

      setEstimation(result)
      setShowEstimation(true)

    } catch (error) {
      console.error('Estimation error:', error)
      setStatus('Estimation failed: ' + error.message)
    } finally {
      setEstimationLoading(false)
    }
  }

  // Auto-estimate when key parameters change
  useEffect(() => {
    if (projectAreaHectares && parseFloat(projectAreaHectares) > 0) {
      const timer = setTimeout(() => {
        estimateCredits()
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timer)
    }
  }, [projectAreaHectares, timePeriodYears, ecosystemType, beforeImage, afterImage])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!projectId) {
      setStatus('Error: No project selected')
      return
    }

    setStatus('Uploading evidence...')

    try {
      // --- Step 1: upload files to backend ---
      const form = new FormData()
      form.append('project_id', projectId)
      form.append('uploader', uploader)
      form.append('gps', gps)
      // CO2 will be calculated automatically by AI analysis

      // Add new AI verification fields
      // Determine evidence type based on which images are uploaded
      let evidenceType = 'general'
      if (beforeImage && afterImage) {
        evidenceType = 'before_after_pair'
      } else if (beforeImage) {
        evidenceType = 'before'
      } else if (afterImage) {
        evidenceType = 'after'
      }

      form.append('evidence_type', evidenceType)
      if (projectAreaHectares) {
        form.append('project_area_hectares', projectAreaHectares)
      }
      form.append('time_period_years', timePeriodYears)

      // Add before/after images for AI analysis
      if (beforeImage) form.append('files', beforeImage)
      if (afterImage) form.append('files', afterImage)

      const resp = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: form
      })

      const data = await resp.json()
      if (!resp.ok) throw new Error(JSON.stringify(data))

      // --- Step 2: Use backend result (Backend already anchored to blockchain) ---
      const evidenceId = data.evidence_id || data.db_id

      setStatus(`Evidence uploaded and anchored successfully! ID: ${evidenceId}`)
      setTimeout(() => router.push('/'), 2000)

    } catch (err) {
      console.error(err)
      setStatus('Upload failed: ' + (err.message || err))
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
      fontFamily: "'Inter', 'Outfit', sans-serif",
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
              onClick={() => router.push('/auth/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#16a34a',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Login
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

      {/* Main Content Info */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #16a34a, #0d9488)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            Upload Field Evidence
          </h1>
          <p style={{
            color: '#5f7c6b',
            fontSize: '16px',
            margin: 0
          }}>
            Submit evidence for carbon sequestration verification
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
          <form onSubmit={handleSubmit}>
            {/* Project Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Project *
              </label>
              {projects.length ? (
                <select
                  value={projectId}
                  onChange={e => setProjectId(e.target.value)}
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
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{
                  padding: '16px 20px',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fbbf24',
                  borderRadius: '12px',
                  color: '#92400e',
                  fontSize: '15px'
                }}>
                  No projects found. Please register a project first.
                </div>
              )}
            </div>

            {/* Uploader */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Uploader *
              </label>
              <input
                type="text"
                value={uploader}
                onChange={e => setUploader(e.target.value)}
                placeholder="Name or wallet address"
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

            {/* GPS Coordinates */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                GPS Coordinates *
              </label>

              <MapSelector
                coordinates={gps}
                onCoordinatesChange={setGps}
              />

              <input
                type="text"
                value={gps}
                onChange={e => setGps(e.target.value)}
                placeholder="lat,lon (e.g. 40.7128,-74.0060) or select from map above"
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
                  fontFamily: 'monospace',
                  color: '#14532d'
                }}
              />
              <p style={{
                fontSize: '13px',
                color: '#5f7c6b',
                margin: '8px 0 0 0'
              }}>
                You can either click on the map above to select coordinates or manually enter them
              </p>
            </div>

            {/* CO2 will be calculated automatically by AI analysis */}

            {/* Before and After Image Uploads */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#14532d'
              }}>
                Before & After Images for AI Analysis
              </label>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '15px'
              }}>
                {/* Before Image Upload */}
                <div style={{
                  border: '2px dashed #dcfce7',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: beforeImage ? '#f0fdf4' : '#fafff9',
                  borderColor: beforeImage ? '#16a34a' : '#dcfce7',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{
                      fontSize: '24px',
                      marginBottom: '8px',
                      display: 'block'
                    }}>📷</span>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#14532d',
                      marginBottom: '5px'
                    }}>
                      Before Image
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#5f7c6b'
                    }}>
                      {beforeImage ? beforeImage.name : 'Land before restoration'}
                    </div>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setBeforeImage(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="before-image-input"
                  />

                  <button
                    type="button"
                    onClick={() => document.getElementById('before-image-input').click()}
                    style={{
                      padding: '8px 16px',
                      background: beforeImage ? 'linear-gradient(135deg, #16a34a, #0d9488)' : 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {beforeImage ? '✓ Selected' : 'Choose Before'}
                  </button>

                  {beforeImage && (
                    <button
                      type="button"
                      onClick={() => setBeforeImage(null)}
                      style={{
                        padding: '4px 8px',
                        background: 'transparent',
                        color: '#dc2626',
                        border: '1px solid #dc2626',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginLeft: '8px'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* After Image Upload */}
                <div style={{
                  border: '2px dashed #dcfce7',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: afterImage ? '#f0fdf4' : '#fafff9',
                  borderColor: afterImage ? '#16a34a' : '#dcfce7',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{
                      fontSize: '24px',
                      marginBottom: '8px',
                      display: 'block'
                    }}>🌱</span>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#14532d',
                      marginBottom: '5px'
                    }}>
                      After Image
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#5f7c6b'
                    }}>
                      {afterImage ? afterImage.name : 'Land after restoration'}
                    </div>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setAfterImage(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="after-image-input"
                  />

                  <button
                    type="button"
                    onClick={() => document.getElementById('after-image-input').click()}
                    style={{
                      padding: '8px 16px',
                      background: afterImage ? 'linear-gradient(135deg, #16a34a, #0d9488)' : 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {afterImage ? '✓ Selected' : 'Choose After'}
                  </button>

                  {afterImage && (
                    <button
                      type="button"
                      onClick={() => setAfterImage(null)}
                      style={{
                        padding: '4px 8px',
                        background: 'transparent',
                        color: '#dc2626',
                        border: '1px solid #dc2626',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginLeft: '8px'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: beforeImage && afterImage ? '#f0fdf4' : '#fef3c7',
                border: `1px solid ${beforeImage && afterImage ? '#22c55e' : '#f59e0b'}`,
                borderRadius: '8px',
                fontSize: '13px',
                color: beforeImage && afterImage ? '#15803d' : '#92400e'
              }}>
                {beforeImage && afterImage ? (
                  <span>✅ Both images uploaded! AI will analyze vegetation change for accurate credit estimation.</span>
                ) : (
                  <span>💡 Upload both before and after images to enable AI-powered greenery comparison and accurate carbon credit calculation.</span>
                )}
              </div>
            </div>

            {/* Project Area */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Project Area (hectares) *
              </label>
              <input
                type="number"
                value={projectAreaHectares}
                onChange={e => setProjectAreaHectares(e.target.value)}
                placeholder="e.g. 5.0"
                min="0"
                step="0.1"
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
              <p style={{
                fontSize: '13px',
                color: '#5f7c6b',
                margin: '8px 0 0 0'
              }}>
                Area of your carbon sequestration project in hectares
              </p>
            </div>

            {/* Ecosystem Type */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Ecosystem Type
              </label>
              <select
                value={ecosystemType}
                onChange={e => setEcosystemType(e.target.value)}
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
                  cursor: 'pointer'
                }}
              >
                <option value="mangrove">Mangrove</option>
                <option value="seagrass">Seagrass</option>
                <option value="saltmarsh">Saltmarsh</option>
                <option value="mixed">Mixed Blue Carbon</option>
              </select>
            </div>

            {/* Time Period */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#14532d'
              }}>
                Time Period (years)
              </label>
              <input
                type="number"
                value={timePeriodYears}
                onChange={e => setTimePeriodYears(e.target.value)}
                placeholder="e.g. 1.0"
                min="0.1"
                step="0.1"
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

            {/* Estimation Results */}
            {estimationLoading && (
              <div style={{
                padding: '20px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                marginBottom: '20px',
                textAlign: 'center',
                color: '#16a34a',
                border: '1px solid #dcfce7'
              }}>
                🔄 Calculating credits based on AI analysis...
              </div>
            )}

            {showEstimation && estimation && (
              <div style={{
                padding: '25px',
                backgroundColor: '#f0fdf4',
                borderRadius: '16px',
                border: '2px solid #22c55e',
                marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.1)'
              }}>
                <h3 style={{
                  color: '#14532d',
                  margin: '0 0 15px 0',
                  fontSize: '20px',
                  borderBottom: '1px solid #dcfce7',
                  paddingBottom: '10px'
                }}>
                  🤖 AI Carbon Estimation
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#5f7c6b' }}>Results:</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#16a34a' }}>
                      {estimation.estimated_credits} Credits
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#5f7c6b' }}>Price:</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0d9488' }}>
                      ${estimation.estimated_value_usd}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#5f7c6b', marginTop: '10px' }}>
                  * This is an AI-generated estimate. Final credits will be minted after verification.
                </div>
              </div>
            )}

            {status && (
              <div style={{
                padding: '16px 20px',
                borderRadius: '12px',
                marginBottom: '25px',
                backgroundColor: status.includes('success') ? '#f0fdf4' : '#fef2f2',
                color: status.includes('success') ? '#166534' : '#991b1b',
                border: `1px solid ${status.includes('success') ? '#bbf7d0' : '#fecaca'}`
              }}>
                {status}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #16a34a, #0d9488)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 10px 30px rgba(22, 163, 74, 0.25)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(22, 163, 74, 0.35)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(22, 163, 74, 0.25)'
              }}
            >
              Upload Evidence & Register on Blockchain
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


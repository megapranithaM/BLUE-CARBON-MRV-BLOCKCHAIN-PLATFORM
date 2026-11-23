'use client';

import { useRouter } from 'next/navigation';

export default function PeopleGroupsPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      backgroundColor: '#f0fdf4'
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

      {/* Main Header */}
      <section style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px 0',
        borderBottom: '1px solid #dcfce7'
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
            gap: '20px'
          }}>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#16a34a',
                lineHeight: '1.2'
              }}>
                People Groups
              </h1>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#15803d',
                fontStyle: 'italic'
              }}>
                citizen services and community groups
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Citizen Categories */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Citizen Categories
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              border: '1px solid #dcfce7',
              borderRadius: '16px',
              padding: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 6px rgba(22, 163, 74, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(22, 163, 74, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(22, 163, 74, 0.05)';
              }}>
              <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>🚢 Fishermen & Coastal Communities</h3>
              <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '15px' }}>
                Traditional fishing communities, coastal villages, and marine-dependent livelihoods.
              </p>
              <ul style={{ color: '#4b5563', fontSize: '14px', paddingLeft: '20px' }}>
                <li>Fishing licenses and permits</li>
                <li>Coastal livelihood schemes</li>
                <li>Marine insurance programs</li>
                <li>Training and skill development</li>
              </ul>
              <button style={{
                background: 'linear-gradient(135deg, #16a34a, #059669)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
                fontWeight: '500'
              }}>
                Access Services
              </button>
            </div>

            <div style={{
              border: '1px solid #dcfce7',
              borderRadius: '16px',
              padding: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 6px rgba(22, 163, 74, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(22, 163, 74, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(22, 163, 74, 0.05)';
              }}>
              <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>🔬 Researchers & Scientists</h3>
              <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '15px' }}>
                Academic institutions, research organizations, and environmental scientists.
              </p>
              <ul style={{ color: '#4b5563', fontSize: '14px', paddingLeft: '20px' }}>
                <li>Research permits and approvals</li>
                <li>Data access and sharing</li>
                <li>Collaboration opportunities</li>
                <li>Grant and funding information</li>
              </ul>
              <button style={{
                background: 'linear-gradient(135deg, #16a34a, #059669)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
                fontWeight: '500'
              }}>
                Research Portal
              </button>
            </div>

            <div style={{
              border: '1px solid #dcfce7',
              borderRadius: '16px',
              padding: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 6px rgba(22, 163, 74, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(22, 163, 74, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(22, 163, 74, 0.05)';
              }}>
              <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>🏭 Industry & Businesses</h3>
              <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '15px' }}>
                Coastal industries, tourism operators, and environmental businesses.
              </p>
              <ul style={{ color: '#4b5563', fontSize: '14px', paddingLeft: '20px' }}>
                <li>Environmental clearances</li>
                <li>Carbon credit registrations</li>
                <li>Compliance guidelines</li>
                <li>Business incentives</li>
              </ul>
              <button style={{
                background: 'linear-gradient(135deg, #16a34a, #059669)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
                fontWeight: '500'
              }}>
                Business Hub
              </button>
            </div>
          </div>
        </section>

        {/* Community Organizations */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Community Organizations
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                name: '🌊 Coastal Area Management Society',
                description: 'Local coastal zone management and conservation',
                members: '1,200+ members',
                location: 'All coastal states'
              },
              {
                name: '🐟 National Fishermen Federation',
                description: 'Representing fishing community interests',
                members: '50,000+ fishermen',
                location: 'National network'
              },
              {
                name: '🌱 Marine Conservation Groups',
                description: 'NGOs working on marine ecosystem protection',
                members: '150+ organizations',
                location: 'Pan-India'
              },
              {
                name: '🏫 Coastal Research Institutes',
                description: 'Academic and research collaborations',
                members: '85+ institutions',
                location: 'Research centers'
              },
              {
                name: '👨‍💼 Blue Economy Business Council',
                description: 'Private sector blue economy initiatives',
                members: '300+ companies',
                location: 'Industry network'
              },
              {
                name: '🎓 Student Environment Clubs',
                description: 'Youth environmental action groups',
                members: '500+ clubs',
                location: 'Educational institutions'
              }
            ].map((org, index) => (
              <div key={index} style={{
                border: '1px solid #dcfce7',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.borderColor = '#dcfce7';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <h4 style={{ color: '#166534', marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>{org.name}</h4>
                <p style={{ color: '#4b5563', margin: '8px 0', fontSize: '14px', lineHeight: '1.5' }}>
                  {org.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px'
                }}>
                  <div>
                    <p style={{ color: '#14532d', margin: 0, fontSize: '12px', fontWeight: 'bold' }}>
                      {org.members}
                    </p>
                    <p style={{ color: '#15803d', margin: 0, fontSize: '11px' }}>
                      {org.location}
                    </p>
                  </div>
                  <button style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    border: '1px solid #86efac',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#bbf7d0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dcfce7'}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Citizen Services */}
        <section>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Citizen Services
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '15px'
          }}>
            {[
              {
                service: '📋 Online Applications',
                desc: 'Submit permits and applications',
                status: 'Available'
              },
              {
                service: '📞 Helpline Support',
                desc: '24/7 citizen assistance',
                status: 'Active'
              },
              {
                service: '📊 Status Tracking',
                desc: 'Track application progress',
                status: 'Real-time'
              },
              {
                service: '💬 Public Consultation',
                desc: 'Participate in policy discussions',
                status: 'Open'
              },
              {
                service: '📚 Training Programs',
                desc: 'Skill development initiatives',
                status: 'Ongoing'
              },
              {
                service: '💰 Financial Assistance',
                desc: 'Government scheme information',
                status: 'Updated'
              },
              {
                service: '🔔 Alerts & Notifications',
                desc: 'Important updates and news',
                status: 'Instant'
              },
              {
                service: '📖 Educational Resources',
                desc: 'Awareness materials and guides',
                status: 'Comprehensive'
              }
            ].map((service, index) => (
              <div key={index} style={{
                border: '1px solid #dcfce7',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                  e.currentTarget.style.borderColor = '#16a34a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.borderColor = '#dcfce7';
                }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <h4 style={{ color: '#16a34a', margin: 0, fontSize: '14px', fontWeight: '600' }}>{service.service}</h4>
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {service.status}
                  </span>
                </div>
                <p style={{ color: '#4b5563', fontSize: '12px', margin: 0, lineHeight: '1.4' }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#14532d',
        color: 'white',
        padding: '40px 0',
        marginTop: '60px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <img
              src="/tn_emblem.svg"
              alt="Government Logo"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                marginRight: '15px'
              }}
            />
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Blue Carbon Registry</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Ministry of Environment, Forest and Climate Change</p>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
            © 2025 TAMILNADU GOVERNMENT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


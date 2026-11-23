'use client';

import { useRouter } from 'next/navigation';

export default function MyGovernmentPage() {
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
                My Government
              </h1>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#15803d',
                fontStyle: 'italic'
              }}>
                government departments and services
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
        {/* Government Departments */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Government Departments
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {[
              {
                title: 'Ministry of Environment, Forest and Climate Change',
                icon: '🌿',
                desc: 'Lead ministry for environmental protection, forest conservation, and climate change initiatives.'
              },
              {
                title: 'Ministry of Earth Sciences',
                icon: '🌊',
                desc: 'Responsible for ocean research, coastal zone management, and marine ecosystem studies.'
              },
              {
                title: 'Ministry of Fisheries, Animal Husbandry & Dairying',
                icon: '🐟',
                desc: 'Oversight of coastal fisheries and marine aquaculture development programs.'
              }
            ].map((dept, index) => (
              <div key={index} style={{
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
                <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>{dept.icon} {dept.title}</h3>
                <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '15px' }}>
                  {dept.desc}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #16a34a, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Visit Website
                  </button>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#16a34a',
                    border: '1px solid #16a34a',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Initiatives */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Key Government Initiatives
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                title: '🌱 National Action Plan on Climate Change',
                description: 'Comprehensive strategy for climate mitigation and adaptation',
                status: 'Active'
              },
              {
                title: '🏖️ Coastal Regulation Zone Guidelines',
                description: 'Framework for sustainable coastal development',
                status: 'Updated 2024'
              },
              {
                title: '💚 Green India Mission',
                description: 'Increasing forest and tree cover across the country',
                status: 'Ongoing'
              },
              {
                title: '🌊 Blue Economy Policy',
                description: 'Sustainable development of marine resources',
                status: 'New'
              },
              {
                title: '🔄 Carbon Neutral India 2070',
                description: 'National commitment to net-zero emissions',
                status: 'Target Set'
              },
              {
                title: '🐾 Biodiversity Conservation',
                description: 'Protection of coastal and marine biodiversity',
                status: 'Priority'
              }
            ].map((initiative, index) => (
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
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ color: '#166534', margin: 0, fontSize: '16px', fontWeight: '600' }}>{initiative.title}</h4>
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {initiative.status}
                  </span>
                </div>
                <p style={{ color: '#4b5563', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Quick Government Links
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {[
              { name: '🏛️ India.gov.in', desc: 'National Portal' },
              { name: '📋 MyGov.in', desc: 'Citizen Participation' },
              { name: '💼 Digital India', desc: 'Digital Services' },
              { name: '🌐 PMO India', desc: 'Prime Minister Office' },
              { name: '📊 Data.gov.in', desc: 'Open Government Data' },
              { name: '⚖️ Legislative Dept', desc: 'Law & Justice' },
              { name: '🎯 NITI Aayog', desc: 'Policy Think Tank' },
              { name: '📱 Aadhaar', desc: 'Identity Services' }
            ].map((link, index) => (
              <div key={index} style={{
                border: '1px solid #dcfce7',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
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
                <h4 style={{ color: '#16a34a', marginBottom: '5px', fontSize: '14px' }}>{link.name}</h4>
                <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>{link.desc}</p>
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


'use client';

import { useRouter } from 'next/navigation';

export default function TopicsPage() {
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
                Topics
              </h1>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#15803d',
                fontStyle: 'italic'
              }}>
                explore blue carbon topics and resources
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
        {/* Featured Topics */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Featured Topics
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
              <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>🌊 Blue Carbon Ecosystems</h3>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                Learn about mangroves, seagrass beds, and salt marshes that capture and store carbon dioxide.
              </p>
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
                Explore
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
              <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>📊 Carbon Registry</h3>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                Understanding the process of measuring, reporting, and verifying blue carbon projects.
              </p>
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
                Learn More
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
              <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>🌱 Conservation Methods</h3>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                Best practices for protecting and restoring coastal ecosystems.
              </p>
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
                Read Guide
              </button>
            </div>
          </div>
        </section>

        {/* Topic Categories */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Browse by Category
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px'
          }}>
            {[
              { title: '🔬 Research & Science', count: '15 articles' },
              { title: '📈 Policy & Governance', count: '12 articles' },
              { title: '💰 Financing & Markets', count: '8 articles' },
              { title: '🛠️ Technology & Tools', count: '10 articles' },
              { title: '🌍 Global Initiatives', count: '6 articles' },
              { title: '📚 Educational Resources', count: '20 articles' }
            ].map((category, index) => (
              <div key={index} style={{
                border: '1px solid #dcfce7',
                borderRadius: '12px',
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
                <h4 style={{ color: '#166534', marginBottom: '5px', fontWeight: '600' }}>{category.title}</h4>
                <p style={{ color: '#4b5563', fontSize: '14px', margin: 0 }}>{category.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Updates */}
        <section>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#14532d',
            marginBottom: '20px',
            borderBottom: '3px solid #16a34a',
            paddingBottom: '10px'
          }}>
            Recent Updates
          </h2>

          <div style={{
            border: '1px solid #dcfce7',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            overflow: 'hidden'
          }}>
            {[
              {
                date: 'Sep 20, 2025',
                title: 'New Guidelines for Mangrove Carbon Assessment',
                description: 'Updated methodologies for measuring carbon storage in mangrove ecosystems.'
              },
              {
                date: 'Sep 18, 2025',
                title: 'Blue Carbon Project Registration Portal',
                description: 'Streamlined process for registering new blue carbon initiatives.'
              },
              {
                date: 'Sep 15, 2025',
                title: 'International Blue Carbon Conference 2025',
                description: 'Key findings and recommendations from the global conference.'
              }
            ].map((update, index) => (
              <div key={index} style={{
                padding: '24px',
                borderBottom: index < 2 ? '1px solid #f0fdf4' : 'none',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ color: '#16a34a', margin: 0, fontSize: '16px', fontWeight: '600' }}>{update.title}</h4>
                  <span style={{ color: '#5f7c6b', fontSize: '14px', fontStyle: 'italic' }}>{update.date}</span>
                </div>
                <p style={{ color: '#374151', margin: 0, lineHeight: '1.6' }}>{update.description}</p>
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


'use client';

import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0fdf4, #ecfdf5)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 12px rgba(22,101,52,0.06)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#14532d' }}>
                  🌿 Blue Carbon Services Portal
                </h1>
                <p style={{ margin: 0, fontSize: '14px', color: '#5f7c6b' }}>Find Marine Conservation Services Faster</p>
              </div>
              <img
                src="/tn_emblem.svg"
                alt="India Portal Logo"
                style={{ height: '48px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b, #065f46, #0f766e)',
        color: 'white',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '800', margin: 0, marginBottom: '16px', letterSpacing: '-1px' }}>
              About the Portal
            </h2>
            <p style={{ fontSize: '18px', margin: 0, opacity: 0.9, color: '#a7f3d0' }}>
              Empowering Marine Conservation Through Digital Innovation
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: '12px 0', borderBottom: '1px solid rgba(22,163,74,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <ul style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: 0, listStyle: 'none', fontSize: '14px' }}>
            <li>
              <button
                onClick={() => router.push('/')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#16a34a',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Home
              </button>
            </li>
            <li style={{ color: '#5f7c6b' }}>›</li>
            <li style={{ color: '#14532d', fontWeight: '600' }}>About the Portal</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main id="skipCont" style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 4px 20px rgba(22,101,52,0.06)', padding: '40px', border: '1px solid rgba(22,163,74,0.08)' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#14532d',
              marginBottom: '24px',
              borderBottom: '3px solid #16a34a',
              paddingBottom: '8px'
            }}>
              About the Portal
            </h2>
          </div>

          <div style={{ fontSize: '16px', lineHeight: '1.7', color: '#2d4a2d' }}>
            <p style={{ marginBottom: '24px' }}>
              Many government entities at the Central, State, District and Local levels are providing online services for marine conservation and blue carbon initiatives that have made the life of coastal communities simpler and have also increased transparency and efficiency in environmental protection. These services are provided through multiple websites and platforms.
            </p>

            <p style={{ marginBottom: '24px' }}>
              In order to list these blue carbon and marine conservation services in a well categorised and searchable interface, the Blue Carbon Services Portal (
              <a href="/" style={{ color: '#16a34a', textDecoration: 'underline' }}>bluecarbon.gov.in</a>
              ) has been developed under the ambit of the{' '}
              <a href="https://www.india.gov.in/" target="_blank" rel="noopener" style={{ color: '#16a34a', textDecoration: 'underline' }}>
                India Portal
              </a>{' '}
              project which is being executed by{' '}
              <a href="https://www.nic.in/" target="_blank" rel="noopener" style={{ color: '#16a34a', textDecoration: 'underline' }}>
                NIC
              </a>{' '}
              in collaboration with the Ministry of Environment, Forest and Climate Change.
            </p>

            <p style={{ marginBottom: '32px' }}>
              The purpose of this portal is to facilitate the listing of online services related to blue carbon ecosystems, marine conservation, and coastal management provided by various government entities under one platform and ensuring standardization with respect to content architecture and classification of services.
            </p>

            {/* Mission Section */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
              padding: '24px',
              borderRadius: '16px',
              marginBottom: '32px',
              borderLeft: '4px solid #16a34a'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#14532d', marginBottom: '16px' }}>
                🌿 Our Mission
              </h3>
              <p style={{ margin: 0, color: '#2d4a2d' }}>
                To create a unified digital platform that promotes sustainable marine ecosystem management,
                facilitates blue carbon project development, and enables efficient access to government services
                for coastal communities, researchers, and environmental organizations across India.
              </p>
            </div>

            {/* Key Features */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#14532d', marginBottom: '20px' }}>
                Key Features
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {[
                  { icon: '🌊', title: 'Blue Carbon Registry', desc: 'Comprehensive registration and verification system for blue carbon projects including mangroves, seagrass beds, and salt marshes.' },
                  { icon: '📊', title: 'MRV System', desc: 'Measuring, Reporting, and Verification platform for carbon monitoring and compliance tracking.' },
                  { icon: '🏛️', title: 'Government Services', desc: 'Single-window access to environmental clearances, permits, and regulatory compliance services.' },
                  { icon: '🎓', title: 'Education Hub', desc: 'Training programs, certification courses, and educational resources for capacity building.' }
                ].map((item, i) => (
                  <div key={i} style={{ padding: '22px', backgroundColor: '#f0fdf4', borderRadius: '16px', border: '1px solid rgba(22,163,74,0.1)', transition: 'all 0.3s ease' }}>
                    <h4 style={{ color: '#16a34a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                      {item.icon} {item.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#5f7c6b', lineHeight: '1.5' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div style={{
              background: 'linear-gradient(135deg, #064e3b, #065f46)',
              color: 'white',
              padding: '36px',
              borderRadius: '20px',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '28px', margin: '0 0 28px 0' }}>
                🌍 Portal Impact
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                {[
                  { value: '2,847', label: 'Services Listed' },
                  { value: '13', label: 'Coastal States Covered' },
                  { value: '450+', label: 'Registered Projects' },
                  { value: '75,000+', label: 'Community Members' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '38px', fontWeight: '800', marginBottom: '8px', color: '#86efac' }}>{stat.value}</div>
                    <div style={{ fontSize: '14px', color: '#a7f3d0' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#14532d', marginBottom: '20px' }}>
                Partnership & Collaboration
              </h3>
              <p style={{ marginBottom: '16px' }}>
                This portal is developed in partnership with leading research institutions,
                coastal state governments, and international organizations working on blue carbon initiatives.
                Our collaborative approach ensures comprehensive coverage of marine conservation services
                and adherence to international standards for blue carbon accounting.
              </p>
              <p style={{ margin: 0 }}>
                We work closely with the Ministry of Earth Sciences, Ministry of Fisheries, Animal Husbandry & Dairying,
                and various coastal state pollution control boards to provide seamless access to environmental services.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Slider */}
      <section style={{ backgroundColor: '#f0fdf4', padding: '20px 0', borderTop: '1px solid rgba(22,163,74,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <a href="https://www.india.gov.in/" target="_blank" rel="noopener">
              <img src="/tn_emblem.svg" alt="India Gov" style={{ height: '40px', objectFit: 'contain', opacity: 0.7 }} />
            </a>
            {[
              { label: 'MyGov', color: '#16a34a', href: 'https://www.mygov.in/' },
              { label: 'Data Gov', color: '#059669', href: 'https://data.gov.in/' },
              { label: 'NIC', color: '#0d9488', href: 'http://www.nic.in/' }
            ].map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noopener">
                <div style={{
                  backgroundColor: item.color,
                  color: 'white',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: `0 4px 12px ${item.color}40`
                }}>
                  {item.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Count Section */}
      <section style={{ background: 'linear-gradient(135deg, #16a34a, #059669)', color: 'white', padding: '32px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '38px', fontWeight: '800', margin: 0 }}>2,847</p>
              <p style={{ fontSize: '16px', margin: 0 }}>Blue Carbon Services Listed</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0 }}>
                <a href="/recommend" style={{ color: 'white', textDecoration: 'none' }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                  Know a marine conservation service? <span style={{ fontWeight: '700' }}>Let us know.</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(135deg, #14532d, #1a3a2a)', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: 'About Us', route: '/about' },
              { label: 'Help', route: '/help' },
              { label: 'Terms and Conditions', route: '/terms' },
              { label: 'Site Map', route: '/sitemap' },
              { label: 'Website Policy', route: '/policy' },
              { label: 'Contact Us', route: '/contact' }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => router.push(item.route)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#86efac',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.target.style.color = '#bbf7d0'}
                onMouseOut={(e) => e.target.style.color = '#86efac'}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(134,239,172,0.2)', paddingTop: '16px', fontSize: '13px', color: '#6b8a6b' }}>
            <p style={{ margin: 0, marginBottom: '8px' }}>
              🌿 This is the Blue Carbon Services Portal of India, developed to enable single window access to marine conservation and blue carbon services provided by various Government entities.
            </p>
            <p style={{ margin: 0 }}>Last Updated: Sep 21, 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


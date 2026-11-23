'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Help() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I register a blue carbon project?",
      answer: "To register a blue carbon project, navigate to the Services section and select 'Project Registration'. You'll need to provide project details, location coordinates, baseline data, and conservation plans. All projects must comply with national blue carbon standards and undergo verification."
    },
    {
      question: "What is MRV (Monitoring, Reporting, and Verification)?",
      answer: "MRV is a systematic approach to measure, report, and verify blue carbon storage and sequestration. It involves regular monitoring of ecosystem health, carbon stock assessments, and third-party verification to ensure project credibility and carbon credit validity."
    },
    {
      question: "How are blue carbon credits calculated?",
      answer: "Blue carbon credits are calculated based on the amount of CO2 equivalent sequestered by marine ecosystems like mangroves, seagrass beds, and salt marshes. The calculation follows approved methodologies and requires baseline studies, monitoring data, and verification by certified agencies."
    },
    {
      question: "What documents are required for project verification?",
      answer: "Required documents include: Environmental Impact Assessment, Community Consent Letters, Baseline Carbon Stock Studies, Monitoring Plans, Satellite/Drone Imagery, Field Survey Reports, and Compliance Certificates from relevant authorities."
    },
    {
      question: "How long does the project approval process take?",
      answer: "The approval process typically takes 45-90 days depending on project complexity. This includes initial review (15 days), field verification (30 days), stakeholder consultation (15 days), and final approval (15-30 days). Incomplete applications may take longer."
    },
    {
      question: "Can international organizations participate?",
      answer: "Yes, international organizations can participate through partnerships with Indian entities. Foreign collaborators must register with relevant authorities and comply with FEMA regulations. Technical assistance and funding partnerships are encouraged under government guidelines."
    },
    {
      question: "What are the eligibility criteria for community participation?",
      answer: "Communities must have traditional or legal rights to the coastal area, demonstrate sustainable livelihood practices, and show commitment to long-term conservation. Priority is given to indigenous communities and those dependent on marine resources."
    },
    {
      question: "How do I access technical support for my project?",
      answer: "Technical support is available through our network of certified consultants, research institutions, and government agencies. Contact the helpdesk for expert guidance on methodology, monitoring protocols, and best practices."
    }
  ];

  const supportCategories = [
    {
      title: "Project Registration",
      description: "Step-by-step guidance for registering blue carbon projects",
      icon: "📋",
      topics: ["Documentation Requirements", "Eligibility Criteria", "Application Process", "Approval Timeline"]
    },
    {
      title: "MRV Guidelines",
      description: "Monitoring, Reporting, and Verification protocols",
      icon: "📊",
      topics: ["Monitoring Protocols", "Reporting Templates", "Verification Process", "Quality Assurance"]
    },
    {
      title: "Technical Assistance",
      description: "Expert support for methodological and technical queries",
      icon: "🔧",
      topics: ["Methodology Guidance", "Carbon Calculation", "Remote Sensing", "Field Protocols"]
    },
    {
      title: "Community Engagement",
      description: "Guidelines for stakeholder participation and consent",
      icon: "👥",
      topics: ["Consent Protocols", "Benefit Sharing", "Capacity Building", "Traditional Knowledge"]
    },
    {
      title: "Carbon Credits",
      description: "Information about blue carbon credit systems",
      icon: "🌿",
      topics: ["Credit Calculation", "Trading Mechanisms", "International Standards", "Registry Systems"]
    },
    {
      title: "Compliance & Legal",
      description: "Regulatory requirements and legal frameworks",
      icon: "⚖️",
      topics: ["Environmental Laws", "Coastal Regulations", "International Agreements", "Permit Requirements"]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      backgroundColor: '#f0fdf4'
    }}>
      {/* Main Header */}
      <section style={{
        backgroundColor: '#ffffff',
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
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#16a34a',
                margin: '0',
                cursor: 'pointer'
              }} onClick={() => router.push('/landing')}>
                Blue Carbon Services Portal
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#5f7c6b',
                margin: '5px 0 0 0'
              }}>
                Marine Ecosystem Conservation & Blue Carbon Registry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content">
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px'
        }}>
          {/* Breadcrumb */}
          <div style={{
            marginBottom: '30px',
            fontSize: '14px'
          }}>
            <button
              onClick={() => router.push('/landing')}
              style={{
                background: 'none',
                border: 'none',
                color: '#059669',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Home
            </button>
            <span style={{ margin: '0 10px', color: '#5f7c6b' }}>›</span>
            <span style={{ color: '#14532d' }}>Help & Support</span>
          </div>

          {/* Page Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#14532d',
              margin: '0'
            }}>
              Help & Support Center
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#5f7c6b',
              marginTop: '10px'
            }}>
              Find answers and get assistance for Blue Carbon Services Portal
            </p>
          </div>

          {/* Quick Help Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '50px'
          }}>
            <div style={{
              backgroundColor: '#ecfdf5',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid #a7f3d0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📞</div>
              <h3 style={{ color: '#047857', margin: '0 0 10px 0' }}>Helpdesk</h3>
              <p style={{ color: '#065f46', marginBottom: '15px' }}>
                Get immediate assistance from our support team
              </p>
              <p style={{ color: '#047857', fontWeight: 'bold', margin: '5px 0' }}>
                📧 bluecarbon.help@gov.in
              </p>
              <p style={{ color: '#047857', fontWeight: 'bold', margin: '5px 0' }}>
                📞 1800-XXX-XXXX (Toll Free)
              </p>
            </div>

            <div style={{
              backgroundColor: '#f0fdf4',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid #86efac',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📚</div>
              <h3 style={{ color: '#16a34a', margin: '0 0 10px 0' }}>Documentation</h3>
              <p style={{ color: '#166534', marginBottom: '15px' }}>
                Access comprehensive guides and manuals
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #16a34a, #059669)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                View Documents
              </button>
            </div>

            <div style={{
              backgroundColor: '#fff7ed',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid #fdba74',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎓</div>
              <h3 style={{ color: '#c2410c', margin: '0 0 10px 0' }}>Training</h3>
              <p style={{ color: '#9a3412', marginBottom: '15px' }}>
                Join workshops and capacity building programs
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                View Schedule
              </button>
            </div>
          </div>

          {/* Support Categories */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#14532d',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Support Categories
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '25px'
            }}>
              {supportCategories.map((category, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  border: '1px solid #dcfce7',
                  borderRadius: '24px',
                  padding: '25px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(22, 163, 74, 0.1)';
                    e.currentTarget.style.borderColor = '#22c55e';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = '#dcfce7';
                  }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span style={{ fontSize: '32px', marginRight: '15px' }}>{category.icon}</span>
                    <div>
                      <h3 style={{
                        color: '#166534',
                        margin: '0 0 5px 0',
                        fontSize: '20px'
                      }}>
                        {category.title}
                      </h3>
                      <p style={{
                        color: '#5f7c6b',
                        margin: 0,
                        fontSize: '14px'
                      }}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {category.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#14532d',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h2>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{
                  border: '1px solid #dcfce7',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  backgroundColor: 'white'
                }}>
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      backgroundColor: openFaq === index ? '#f0fdf4' : 'white',
                      border: 'none',
                      padding: '20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#166534'
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{
                      fontSize: '20px',
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      color: '#16a34a'
                    }}>
                      ▼
                    </span>
                  </button>

                  {openFaq === index && (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f0fdf4',
                      borderTop: '1px solid #dcfce7',
                      color: '#374151',
                      lineHeight: '1.6'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div style={{
            background: 'linear-gradient(135deg, #166534, #14532d)',
            color: 'white',
            padding: '40px',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(22, 101, 52, 0.2)'
          }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>Still Need Help?</h2>
            <p style={{ margin: '0 0 30px 0', fontSize: '16px', opacity: 0.9 }}>
              Our support team is here to assist you with any questions or technical issues
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginTop: '30px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#86efac' }}>Email Support</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>bluecarbon.help@gov.in</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.7 }}>Response within 24 hours</p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#86efac' }}>Phone Support</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>1800-XXX-XXXX</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.7 }}>Mon-Fri, 9:00 AM - 6:00 PM IST</p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#86efac' }}>Regional Offices</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>Contact nearest office</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.7 }}>In-person consultation available</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Services Count Section */}
      <section style={{
        background: 'linear-gradient(135deg, #16a34a, #0d9488)',
        color: 'white',
        padding: '32px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>2,847</p>
              <p style={{ fontSize: '18px', margin: 0 }}>Blue Carbon Services Listed</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0 }}>
                <a href="/recommend" style={{ color: 'white', textDecoration: 'none' }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                  Know a marine conservation service? <span style={{ fontWeight: '600' }}>Let us know.</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#14532d', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <button
              onClick={() => router.push('/about')}
              style={{
                background: 'none',
                border: 'none',
                color: '#86efac',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px'
              }}
              onMouseOver={(e) => e.target.style.color = '#dcfce7'}
              onMouseOut={(e) => e.target.style.color = '#86efac'}
            >
              About Us
            </button>
            <span style={{
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              Help
            </span>
            <button
              onClick={() => router.push('/terms')}
              style={{
                background: 'none',
                border: 'none',
                color: '#86efac',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px'
              }}
              onMouseOver={(e) => e.target.style.color = '#dcfce7'}
              onMouseOut={(e) => e.target.style.color = '#86efac'}
            >
              Terms and Conditions
            </button>
            <button
              onClick={() => router.push('/sitemap')}
              style={{
                background: 'none',
                border: 'none',
                color: '#86efac',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px'
              }}
              onMouseOver={(e) => e.target.style.color = '#dcfce7'}
              onMouseOut={(e) => e.target.style.color = '#86efac'}
            >
              Site Map
            </button>
            <button
              onClick={() => router.push('/policy')}
              style={{
                background: 'none',
                border: 'none',
                color: '#86efac',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px'
              }}
              onMouseOver={(e) => e.target.style.color = '#dcfce7'}
              onMouseOut={(e) => e.target.style.color = '#86efac'}
            >
              Website Policy
            </button>
            <button
              onClick={() => router.push('/contact')}
              style={{
                background: 'none',
                border: 'none',
                color: '#86efac',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px'
              }}
              onMouseOver={(e) => e.target.style.color = '#dcfce7'}
              onMouseOut={(e) => e.target.style.color = '#86efac'}
            >
              Contact Us
            </button>
          </div>

          <div style={{ borderTop: '1px solid #166534', paddingTop: '16px', fontSize: '14px', color: '#86efac' }}>
            <p style={{ margin: 0, marginBottom: '8px' }}>
              This is the Blue Carbon Services Portal of India, developed to enable single window access to marine conservation and blue carbon services provided by various Government entities.
            </p>
            <p style={{ margin: 0 }}>Last Updated: Sep 21, 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ContactUsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message. We will get back to you within 2-3 business days.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 2000);
  };

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
        backgroundColor: '#ffffff',
        padding: '20px 0',
        borderBottom: '1px solid #dcfce7',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)'
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

      {/* Main Content Area */}
      <main id="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', minHeight: '600px' }}>

        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#14532d',
            margin: '0 0 16px 0'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#5f7c6b',
            margin: 0
          }}>
            Get in touch with the Blue Carbon Services Portal team
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

          {/* Contact Form */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(22, 163, 74, 0.1)',
            border: '1px solid rgba(22, 163, 74, 0.1)',
            padding: '32px',
            animation: 'slideUp 0.5s ease-out'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#16a34a', marginBottom: '24px' }}>
              Send us a Message
            </h2>

            {submitMessage && (
              <div style={{
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderLeft: '4px solid #16a34a',
                borderRadius: '0 8px 8px 0',
                marginBottom: '24px',
                color: '#166534'
              }}>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#14532d' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #dcfce7',
                      borderRadius: '12px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafff9',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#16a34a';
                      e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#dcfce7';
                      e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.01)';
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#14532d' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #dcfce7',
                      borderRadius: '12px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafff9',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#16a34a';
                      e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#dcfce7';
                      e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.01)';
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#14532d' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #dcfce7',
                      borderRadius: '12px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafff9',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#16a34a';
                      e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#dcfce7';
                      e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.01)';
                    }}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#14532d' }}>
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #dcfce7',
                      borderRadius: '12px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafff9',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#16a34a';
                      e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#dcfce7';
                      e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.01)';
                    }}
                    placeholder="Organization name"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#14532d' }}>
                  Inquiry Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dcfce7',
                    borderRadius: '12px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fafff9',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#16a34a';
                    e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#dcfce7';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="project-registration">Project Registration</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="policy-inquiry">Policy Inquiry</option>
                  <option value="data-access">Data Access Request</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="media-inquiry">Media Inquiry</option>
                  <option value="feedback">Feedback/Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#14532d' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dcfce7',
                    borderRadius: '12px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fafff9',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#16a34a';
                    e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#dcfce7';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.01)';
                  }}
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#14532d' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dcfce7',
                    borderRadius: '12px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fafff9',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    resize: 'vertical',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#16a34a';
                    e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#dcfce7';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.01)';
                  }}
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '14px 28px',
                  background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #16a34a, #0d9488)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s ease',
                  boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            {/* Quick Contact */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.1)',
              padding: '32px',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#16a34a', marginBottom: '24px' }}>
                Quick Contact
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '24px', width: '40px', textAlign: 'center' }}>📧</div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>Email</h3>
                    <p style={{ margin: 0, color: '#059669', fontSize: '14px' }}>support@bluecarbonservices.gov.in</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '24px', width: '40px', textAlign: 'center' }}>📞</div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>Help Desk</h3>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Available through Help & Support section</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '24px', width: '40px', textAlign: 'center' }}>🕒</div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>Business Hours</h3>
                    <p style={{ margin: '0 0 2px 0', color: '#64748b', fontSize: '14px' }}>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Saturday: 9:00 AM - 1:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Contacts */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.1)',
              padding: '32px',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#16a34a', marginBottom: '24px' }}>
                Department Contacts
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#334155' }}>
                    Ministry of Environment, Forest and Climate Change
                  </h3>
                  <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
                    Primary contact for policy matters and environmental clearances
                  </p>
                  <p style={{ margin: 0, color: '#059669', fontSize: '14px' }}>
                    Email: moef@gov.in | Website: moef.gov.in
                  </p>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#334155' }}>
                    Ministry of Earth Sciences
                  </h3>
                  <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
                    Marine research, oceanographic services, and coastal studies
                  </p>
                  <p style={{ margin: 0, color: '#059669', fontSize: '14px' }}>
                    Email: moes@gov.in | Website: moes.gov.in
                  </p>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#334155' }}>
                    Ministry of Fisheries, Animal Husbandry & Dairying
                  </h3>
                  <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
                    Fisheries management and aquaculture development
                  </p>
                  <p style={{ margin: 0, color: '#059669', fontSize: '14px' }}>
                    Email: fisheries@gov.in | Website: dof.gov.in
                  </p>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div style={{
              backgroundColor: '#ecfdf5',
              borderRadius: '24px',
              border: '1px solid #10b981',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#16a34a', marginBottom: '16px' }}>
                Regional Support Centers
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>Western Coast</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Mumbai, Goa, Gujarat coastal regions</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>Eastern Coast</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>West Bengal, Odisha, Andhra Pradesh coastal areas</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>Southern Coast</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Tamil Nadu, Kerala, Karnataka coastal regions</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>Islands</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Andaman & Nicobar, Lakshadweep</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          marginTop: '60px',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
          border: '1px solid rgba(22, 163, 74, 0.1)',
          padding: '40px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#16a34a', marginBottom: '24px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '12px' }}>
                How quickly will I receive a response?
              </h3>
              <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>
                We aim to respond to all inquiries within 2-3 business days. Urgent technical issues are prioritized and may receive faster responses.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '12px' }}>
                What information should I include in my message?
              </h3>
              <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>
                Please provide as much detail as possible about your inquiry, including relevant project IDs, error messages, or specific requirements.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '12px' }}>
                Can I schedule a consultation?
              </h3>
              <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>
                Yes, consultations can be arranged for complex projects or policy matters. Please specify your consultation needs in your message.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '12px' }}>
                Do you provide technical support?
              </h3>
              <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>
                Yes, we provide technical support for portal usage, project registration, and data submission processes through our help desk.
              </p>
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
            <button
              onClick={() => router.push('/help')}
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
              Help
            </button>
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
            <span style={{
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              Contact Us
            </span>
          </div>

          <div style={{ borderTop: '1px solid #166534', paddingTop: '16px', fontSize: '14px', color: '#86efac' }}>
            <p style={{ margin: 0 }}>
              This is the Blue Carbon Services Portal of India, developed to enable single window access to marine conservation and blue carbon services provided by various Government entities.
            </p>
            <p style={{ margin: '8px 0 0 0' }}>
              Last Updated: Sep 21, 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


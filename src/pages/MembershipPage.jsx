import { useState } from 'react';
import Layout from '../components/Layout';
import { COLORS } from '../data';

const MEMBERSHIP_TIERS = [
  {
    id: 'professional',
    offerId: 'OFHCUON8GX0T',
    title: 'Annual Professional Membership',
    price: 295,
    icon: '🏛️',
    audience: 'For privacy professionals in the private sector',
    benefits: [
      'Full access to GDPA resource library',
      'Member pricing on certifications & training',
      'Weekly privacy law bulletin',
      'Access to members-only community forums',
      'Discounts on GDPA events and conferences',
    ],
    highlight: true,
  },
  {
    id: 'government',
    offerId: null, // TODO: replace with Piano Offer ID e.g. 'OFXXXXXXXX'
    title: 'Annual Government Membership',
    price: 110,
    icon: '🏛',
    audience: 'For employees of federal, state, or local government agencies',
    benefits: [
      'Full access to GDPA resource library',
      'Member pricing on certifications & training',
      'Weekly privacy law bulletin',
      'Access to members-only community forums',
      'Discounts on GDPA events and conferences',
    ],
    highlight: false,
  },
  {
    id: 'nonprofit',
    offerId: null, // TODO: replace with Piano Offer ID e.g. 'OFXXXXXXXX'
    title: 'Annual Not-For-Profit Membership',
    price: 110,
    icon: '🤝',
    audience: 'For employees of registered non-profit organizations',
    benefits: [
      'Full access to GDPA resource library',
      'Member pricing on certifications & training',
      'Weekly privacy law bulletin',
      'Access to members-only community forums',
      'Discounts on GDPA events and conferences',
    ],
    highlight: false,
  },
  {
    id: 'higher-ed',
    offerId: null, // TODO: replace with Piano Offer ID e.g. 'OFXXXXXXXX'
    title: 'Annual Higher Education Membership',
    price: 110,
    icon: '🎓',
    audience: 'For faculty, staff, and administrators at accredited institutions',
    benefits: [
      'Full access to GDPA resource library',
      'Member pricing on certifications & training',
      'Weekly privacy law bulletin',
      'Access to members-only community forums',
      'Discounts on GDPA events and conferences',
    ],
    highlight: false,
  },
  {
    id: 'retired',
    offerId: null, // TODO: replace with Piano Offer ID e.g. 'OFXXXXXXXX'
    title: 'Annual Retired Membership',
    price: 100,
    icon: '🌿',
    audience: 'For privacy professionals who have retired from full-time work',
    benefits: [
      'Full access to GDPA resource library',
      'Member pricing on certifications & training',
      'Weekly privacy law bulletin',
      'Access to members-only community forums',
    ],
    highlight: false,
  },
  {
    id: 'student',
    offerId: null, // TODO: replace with Piano Offer ID e.g. 'OFXXXXXXXX'
    title: 'Annual Student Membership',
    price: 50,
    icon: '📚',
    audience: 'For enrolled students at accredited colleges and universities',
    benefits: [
      'Access to student resource library',
      'Student pricing on select certifications',
      'Weekly privacy law bulletin',
      'Access to student community forums',
    ],
    highlight: false,
  },
];

function MembershipCard({ tier, onJoin }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 8,
        border: tier.highlight
          ? `2px solid ${COLORS.primary}`
          : `1px solid ${hovered ? COLORS.primary : COLORS.border}`,
        boxShadow: hovered
          ? '0 4px 16px rgba(0,0,0,0.10)'
          : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {tier.highlight && (
        <div style={{
          background: COLORS.primary,
          color: 'white',
          fontSize: 11,
          fontWeight: 700,
          textAlign: 'center',
          padding: '6px 0',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          fontFamily: "'Lato', sans-serif",
        }}>
          Most Popular
        </div>
      )}

      {/* Card header */}
      <div style={{
        background: tier.highlight ? `${COLORS.primary}08` : COLORS.neutralLight,
        padding: '28px 28px 20px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>{tier.icon}</div>
        <h3 style={{
          fontSize: 17,
          fontWeight: 700,
          color: COLORS.neutral,
          fontFamily: "'Lato', sans-serif",
          marginBottom: 8,
          lineHeight: 1.3,
        }}>
          {tier.title}
        </h3>
        <p style={{ fontSize: 13, color: '#777', lineHeight: 1.5, marginBottom: 16 }}>
          {tier.audience}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{
            fontSize: 36,
            fontWeight: 700,
            color: tier.highlight ? COLORS.primary : COLORS.neutral,
            fontFamily: "'Lato', sans-serif",
          }}>
            ${tier.price}
          </span>
          <span style={{ fontSize: 14, color: '#888' }}>/year</span>
        </div>
      </div>

      {/* Benefits list */}
      <div style={{ padding: '20px 28px', flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tier.benefits.map((benefit, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontSize: 13,
              color: '#555',
              lineHeight: 1.5,
              marginBottom: i < tier.benefits.length - 1 ? 10 : 0,
            }}>
              <span style={{ color: COLORS.primary, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 28px 28px' }}>
        <button
          onClick={() => onJoin(tier)}
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 6,
            border: tier.highlight ? 'none' : `1px solid ${COLORS.primary}`,
            background: tier.highlight ? COLORS.primary : 'white',
            color: tier.highlight ? 'white' : COLORS.primary,
            fontWeight: 700,
            fontSize: 14,
            fontFamily: "'Lato', sans-serif",
            cursor: 'pointer',
            letterSpacing: '0.3px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = COLORS.primary;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = tier.highlight ? COLORS.primary : 'white';
            e.currentTarget.style.color = tier.highlight ? 'white' : COLORS.primary;
          }}
        >
          {tier.id === 'student' ? 'Verify & Join' : 'Join Now'}
        </button>
      </div>
    </div>
  );
}

export default function MembershipPage() {
  const handleJoin = (tier) => {
    if (!tier.offerId) {
      // Offer ID not yet configured — log a reminder for the developer
      console.warn(`[GDPA] No Piano offerId set for tier "${tier.id}". Add it to MEMBERSHIP_TIERS in MembershipPage.jsx.`);
      return;
    }
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.push(['init', function () {
        window.tp.offer.show({
          offerId: tier.offerId,
          displayMode: 'modal',
        });
      }]);
    }
  };

  return (
    <Layout>
      {/* Page header */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 36,
          fontWeight: 700,
          marginBottom: 12,
          color: COLORS.neutral,
          fontFamily: "'Lato', sans-serif",
        }}>
          Individual Membership
        </h2>
        <p style={{ fontSize: 16, color: '#666', maxWidth: 640, lineHeight: 1.6 }}>
          Join the Global Data Privacy Alliance and get access to the tools, training,
          and community you need to advance your privacy career.
        </p>
      </div>

      {/* Promo banner */}
      <div style={{
        background: `${COLORS.secondary}12`,
        border: `1px solid ${COLORS.secondary}30`,
        borderRadius: 8,
        padding: '14px 24px',
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 18 }}>🎓</span>
        <p style={{ fontSize: 14, color: COLORS.secondary, fontWeight: 600, margin: 0 }}>
          Members save up to $200 on GDPA certifications and training courses.
        </p>
      </div>

      {/* Tier grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <MembershipCard key={tier.id} tier={tier} onJoin={handleJoin} />
        ))}
      </div>

      {/* Footer note */}
      <p style={{
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
        marginTop: 40,
        lineHeight: 1.6,
      }}>
        All memberships are valid for 12 months from date of purchase.
        Government, not-for-profit, higher education, and retired memberships
        may require verification. Student membership requires current enrollment verification.
      </p>
    </Layout>
  );
}

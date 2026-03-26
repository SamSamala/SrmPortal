// pages/api/og.js — generates the OG image as a real PNG via @vercel/og
import { ImageResponse } from 'next/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f0e17 0%, #1a1a2e 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(90deg, #6366f1, #3b82f6)',
          display: 'flex',
        }} />

        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-80px', left: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '-60px',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          padding: '52px 80px 0',
        }}>
          {/* Icon */}
          <div style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px',
          }}>🎓</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: '22px', fontWeight: 700 }}>SRM Portal</span>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>srm-campus-hub.vercel.app</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '12px',
          padding: '44px 80px 0',
          flex: 1,
        }}>
          <div style={{
            display: 'flex',
            color: 'white',
            fontSize: '68px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
          }}>
            Works on WiFi +
          </div>
          <div style={{
            display: 'flex',
            background: 'linear-gradient(90deg, #818cf8, #60a5fa)',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: '68px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
          }}>
            Mobile Data
          </div>
          <div style={{
            display: 'flex',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '24px',
            fontWeight: 400,
            marginTop: '8px',
          }}>
            Your SRM academics, finally clear.
          </div>
        </div>

        {/* Feature pills row */}
        <div style={{
          display: 'flex', gap: '14px',
          padding: '32px 80px 52px',
          alignItems: 'center',
        }}>
          {['📊  Attendance', '📝  Marks', '🗓️  Timetable', '📅  Calendar'].map((label) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.4)',
              color: 'rgba(255,255,255,0.82)',
              fontSize: '18px',
              fontWeight: 600,
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

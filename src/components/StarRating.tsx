import React, { useEffect, useState } from 'react';
import type { ResilienceScore } from '../../server/types';

interface StarRatingProps {
  score: ResilienceScore;
}

export const StarRating: React.FC<StarRatingProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score.total;
    if (start === end) return;

    const duration = 1000; // 1s animation
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += increment;
      setDisplayScore(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime || 10);

    return () => clearInterval(timer);
  }, [score.total]);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'EXCELLENT': return '#22c55e';
      case 'GOOD': return '#3b82f6';
      case 'MODERATE': return '#eab308';
      case 'POOR': return '#f97316';
      case 'CRITICAL': return '#ef4444';
      default: return '#fff';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ fontSize: '1rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
        Resilience Safety Rating
      </h3>

      {/* Star Sequence */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="animate-star"
            style={{
              fontSize: '3rem',
              color: star <= score.stars ? '#f59e0b' : '#374151',
              textShadow: star <= score.stars ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none',
              animationDelay: `${star * 0.1}s`,
              display: 'inline-block'
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Score and Grade */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
          {displayScore}
        </span>
        <span style={{ fontSize: '1.25rem', color: '#64748b' }}>
          /100
        </span>
      </div>

      <div style={{
        padding: '0.4rem 1.2rem',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: '#fff',
        backgroundColor: getGradeColor(score.grade),
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        boxShadow: `0 4px 10px ${getGradeColor(score.grade)}40`,
        marginBottom: '2rem'
      }}>
        {score.grade}
      </div>

      {/* Metric Breakdown */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <MetricBar label="Survival Rate" val={score.breakdown.survivalRate} color="#22c55e" />
        <MetricBar label="Recovery Score" val={score.breakdown.recoveryScore} color="#3b82f6" />
        <MetricBar label="Isolation Score" val={score.breakdown.isolationScore} color="#eab308" />
        <MetricBar label="Graceful Degradation" val={score.breakdown.gracefulDegradation} color="#a855f7" />
      </div>
    </div>
  );
};

interface MetricBarProps {
  label: string;
  val: number;
  color: string;
}

const MetricBar: React.FC<MetricBarProps> = ({ label, val, color }) => {
  const pct = Math.round(val * 100);
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.3rem' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          borderRadius: '3px',
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>
    </div>
  );
};

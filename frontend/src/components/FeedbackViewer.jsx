import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FeedbackViewer({ currentUser }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`/api/feedbacks/recipient/${currentUser.id}`);
        if (res.ok) {
          setFeedbacks(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [currentUser.id]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading feedback...</div>;
  }

  return (
    <div className="card">
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <MessageCircle size={20} className="text-primary" /> Parent Feedback
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {feedbacks.map(f => (
          <div key={f.id} className="card" style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.25rem', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{f.parent_name}</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Regarding: <strong>{f.child_name}</strong></p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {new Date(f.timestamp).toLocaleString()}
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
              {f.message}
            </p>
          </div>
        ))}
        {feedbacks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No feedback received yet.
          </div>
        )}
      </div>
    </div>
  );
}

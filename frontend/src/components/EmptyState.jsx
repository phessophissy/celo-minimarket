export default function EmptyState({ icon = '🛒', title, subtitle }) {
  return (
    <div className="empty-state animate-fadeIn">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title || 'No products listed yet'}</h3>
      <p className="empty-state-subtitle">{subtitle || 'Be the first vendor — list your product now! 🚀'}</p>
    </div>
  );
}

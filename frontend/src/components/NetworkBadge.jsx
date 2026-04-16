export default function NetworkBadge({ isConnected }) {
  return (
    <div className={`network-badge ${isConnected ? 'connected' : ''}`}>
      <span className="network-dot" />
      <span className="network-name">{isConnected ? 'Celo Mainnet' : 'Not Connected'}</span>
    </div>
  );
}

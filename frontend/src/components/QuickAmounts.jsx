const amounts = ['0.50', '1.00', '2.50', '5.00', '10.00'];

export default function QuickAmounts({ onSelect }) {
  return (
    <div className="quick-amounts">
      {amounts.map(a => (
        <button key={a} type="button" className="quick-amount-btn" onClick={() => onSelect(a)}>
          {a} cUSD
        </button>
      ))}
    </div>
  );
}

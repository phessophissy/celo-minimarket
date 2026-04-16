export default function Skeleton({ width, height = '1rem', radius = '4px', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ width: width || '100%', height, borderRadius: radius }}
        />
      ))}
    </>
  );
}

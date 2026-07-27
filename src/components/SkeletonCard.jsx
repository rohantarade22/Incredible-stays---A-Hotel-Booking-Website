export default function SkeletonCard() {
  return (
    <div className="card-elevated" style={{ height: "100%" }}>
      <div className="skeleton" style={{ height: 210, borderRadius: 0 }}></div>
      <div style={{ padding: "1.1rem" }}>
        <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10 }}></div>
        <div className="skeleton" style={{ height: 14, width: "45%", marginBottom: 16 }}></div>
        <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 8 }}></div>
        <div className="skeleton" style={{ height: 14, width: "60%" }}></div>
      </div>
    </div>
  );
}

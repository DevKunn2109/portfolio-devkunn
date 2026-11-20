export function ProjectVisual({ variant, label }: { variant: "api" | "product"; label: string }) {
  return (
    <div className={`project-visual project-visual-${variant}`} role="img" aria-label={label}>
      <div className="visual-aura" aria-hidden="true" />
      <div className="visual-window">
        <div className="visual-bar"><div><i /><i /><i /></div><span>{variant === "api" ? "api.workspace.local" : "devkuncare.app"}</span><b>↗</b></div>
        {variant === "api" ? (
          <div className="api-layout">
            <div className="api-rail"><strong>CF</strong><span className="active">Overview</span><span>Endpoints</span><span>Schema</span><span>Logs</span><i /></div>
            <div className="api-code">
              <div className="api-head"><p><span>GET</span>/v1/commerce/overview</p><b>200 OK</b></div>
              <div className="code-lines"><p><i>01</i>{`{`}</p><p><i>02</i><em>&quot;status&quot;</em>: <span>&quot;ready&quot;</span>,</p><p><i>03</i><em>&quot;latency&quot;</em>: <b>42</b>,</p><p><i>04</i><em>&quot;data&quot;</em>: {'['}...{']'}</p><p><i>05</i>{`}`}</p></div>
            </div>
          </div>
        ) : (
          <div className="product-layout">
            <div className="product-sidebar"><strong>DK</strong><i /><i /><i /><span /></div>
            <div className="product-main">
              <div className="product-heading"><div><small>GOOD MORNING</small><p>Care overview</p></div><i /></div>
              <div className="metric-row"><div><small>Appointments</small><b>24</b><span>+12%</span></div><div><small>Availability</small><b>86%</b><span>Live</span></div><div><small>Patients</small><b>1.2k</b><span>+8%</span></div></div>
              <div className="chart"><div className="chart-grid" />{[40, 58, 45, 72, 64, 86, 78, 96].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

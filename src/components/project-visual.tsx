export function ProjectVisual({ variant, label }: { variant: "api" | "product"; label: string }) {
  return (
    <div className={`project-visual project-visual-${variant}`} role="img" aria-label={label}>
      <div className="visual-window">
        <div className="visual-bar"><i /><i /><i /><span>{variant === "api" ? "/v1/workspace" : "devkuncare.app"}</span></div>
        {variant === "api" ? (
          <div className="api-layout">
            <div className="api-rail"><b>GET</b><span>POST</span><span>PATCH</span><span>DELETE</span></div>
            <div className="api-code"><span>200 OK</span><em>{`{`}</em><code>&quot;status&quot;: &quot;ready&quot;,</code><code>&quot;data&quot;: [...]</code><em>{`}`}</em></div>
          </div>
        ) : (
          <div className="product-layout">
            <div className="product-sidebar"><i /><i /><i /><i /></div>
            <div className="product-main"><div className="metric-row"><b /><b /><b /></div><div className="chart"><span /><span /><span /><span /><span /><span /></div></div>
          </div>
        )}
      </div>
    </div>
  );
}

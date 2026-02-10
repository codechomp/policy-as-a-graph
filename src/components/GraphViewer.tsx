import { useEffect, useRef, useState } from 'react';
import { Graph } from '@/types';

interface GraphViewerProps {
  data: Graph;
  title: string;
  height?: number;
}

export default function GraphViewer({ data, title, height = 500 }: GraphViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [galaxyMode, setGalaxyMode] = useState(false);
  const [filterNodeTypes, setFilterNodeTypes] = useState<Set<string>>(new Set());

  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = container.clientWidth * dpr;
    canvas.height = height * dpr;
    canvas.style.width = container.clientWidth + 'px';
    canvas.style.height = height + 'px';
    canvas.style.background = '#ffffff';
    canvas.style.cursor = 'grab';

    container.innerHTML = '';
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    
    // Filter nodes
    let nodes = data.nodes;
    if (!galaxyMode && filterNodeTypes.size > 0) {
      nodes = nodes.filter(n => !filterNodeTypes.has(n.type));
    }

    // Node positions with better circular layout
    const nodePositions = new Map<string, { x: number; y: number }>();
    const centerX = container.clientWidth / 2;
    const centerY = height / 2;

    // Group nodes by type for better layout
    const nodesByType = new Map<string, typeof nodes>();
    nodes.forEach(node => {
      if (!nodesByType.has(node.type)) {
        nodesByType.set(node.type, []);
      }
      nodesByType.get(node.type)!.push(node);
    });

    // Layout nodes in concentric circles by type
    const types = Array.from(nodesByType.keys());
    const baseRadius = Math.min(container.clientWidth, height) * 0.3;

    types.forEach((type, typeIndex) => {
      const typeNodes = nodesByType.get(type)!;
      const ringRadius = baseRadius + (typeIndex * 80);

      typeNodes.forEach((node, i) => {
        const angle = (i / typeNodes.length) * 2 * Math.PI + (typeIndex * 0.5);
        nodePositions.set(node.id, {
          x: centerX + ringRadius * Math.cos(angle),
          y: centerY + ringRadius * Math.sin(angle)
        });
      });
    });

    // Node size based on connectivity
    const nodeConnections = new Map<string, number>();
    data.edges.forEach(edge => {
      nodeConnections.set(edge.from, (nodeConnections.get(edge.from) || 0) + 1);
      nodeConnections.set(edge.to, (nodeConnections.get(edge.to) || 0) + 1);
    });

    const draw = () => {
      ctx.clearRect(0, 0, container.clientWidth, height);

      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // Draw edges with THICK arrows and better colors
      data.edges.forEach(edge => {
        const from = nodePositions.get(edge.from);
        const to = nodePositions.get(edge.to);
        if (from && to && nodes.find(n => n.id === edge.from) && nodes.find(n => n.id === edge.to)) {
          // Edge color based on type
          const edgeColorMap: Record<string, string> = {
            'relate_to': '#4299e1',
            'mention': '#48bb78',
            'hyperlink_to': '#9f7aea',
            'mention_in_context': '#ed8936',
            'maps_to': '#f56565',
            'has_section': '#38a169',
            'has_requirement': '#d69e2e',
            'requires': '#805ad5',
            'evidenced_by': '#3182ce',
            'violated_by': '#e53e3e',
            'supported_by': '#319795'
          };

          const edgeColor = edgeColorMap[edge.type] || '#718096';

          // Draw THICK line
          ctx.strokeStyle = edgeColor;
          ctx.lineWidth = Math.max(2, 3 / zoom); // Much thicker!
          ctx.globalAlpha = 0.7; // More opaque
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Draw BIGGER arrow
          const angle = Math.atan2(to.y - from.y, to.x - from.x);
          const arrowSize = Math.max(8, 10 / zoom); // Bigger arrow!
          const arrowX = to.x - Math.cos(angle) * 18;
          const arrowY = to.y - Math.sin(angle) * 18;

          ctx.fillStyle = edgeColor;
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
            arrowY - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
            arrowY - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fill();
        }
      });

      // Draw nodes with size based on connections
      nodes.forEach(node => {
        const pos = nodePositions.get(node.id)!;
        const connections = nodeConnections.get(node.id) || 0;
        const nodeSize = Math.max(8, Math.min(20, 8 + connections * 1.5));

        // Node color by type
        const colorMap: Record<string, string> = {
          'Document': '#2c5282',
          'Section': '#38a169',
          'Requirement': '#d69e2e',
          'Control': '#805ad5',
          'EvidenceType': '#dd6b20',
          'Finding': '#e53e3e',
          'Policy': '#3182ce',
          'Standard': '#319795',
          'RegulatoryGuideline': '#d53f8c',
          'SupportingDoc': '#718096',
          'Identifier': '#4299e1',
          'URL': '#38b2ac',
          'Email': '#38b2ac'
        };

        // Draw node shadow
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = colorMap[node.type] || '#4a5568';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeSize / zoom, 0, 2 * Math.PI);
        ctx.fill();

        ctx.shadowColor = 'transparent';

        // Draw node border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 / zoom;
        ctx.stroke();

        // Draw label with background
        if (zoom > 0.5 || node.type === 'Document' || connections > 5) {
          ctx.fillStyle = '#2d3748';
          ctx.font = `${Math.max(10, 12 / zoom)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          const label = node.label.length > 30 ? node.label.substring(0, 27) + '...' : node.label;
          const labelY = pos.y + (nodeSize / zoom) + 4;

          // Draw label background
          const metrics = ctx.measureText(label);
          const padding = 4;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillRect(
            pos.x - metrics.width / 2 - padding,
            labelY - padding,
            metrics.width + padding * 2,
            14 + padding * 2
          );

          // Draw label text
          ctx.fillStyle = '#2d3748';
          ctx.fillText(label, pos.x, labelY);
        }
      });

      ctx.restore();
    };

    draw();

    // Mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.1, Math.min(5, zoom * delta));

      // Zoom towards mouse position
      const zoomFactor = newZoom / zoom;
      setPan({
        x: mouseX - (mouseX - pan.x) * zoomFactor,
        y: mouseY - (mouseY - pan.y) * zoomFactor
      });
      setZoom(newZoom);
    };

    // Mouse drag pan
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      canvas.style.cursor = 'grab';
    };

    // Click to select node
    const handleClick = (e: MouseEvent) => {
      if (isDragging) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;

      for (const node of nodes) {
        const pos = nodePositions.get(node.id)!;
        const connections = nodeConnections.get(node.id) || 0;
        const nodeSize = Math.max(8, Math.min(20, 8 + connections * 1.5));
        const dx = x - pos.x;
        const dy = y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < nodeSize) {
          setSelectedNode(node);
          break;
        }
      }
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
    };
  }, [data, galaxyMode, filterNodeTypes, height, zoom, pan, isDragging, dragStart]);

  const nodeTypes = Array.from(new Set(data.nodes.map(n => n.type)));

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '_')}_graph.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h3 className="section-title" style={{ marginBottom: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              checked={galaxyMode}
              onChange={(e) => setGalaxyMode(e.target.checked)}
            />
            Galaxy Mode
          </label>
          <button
            className="button"
            onClick={handleReset}
            style={{ padding: '6px 12px', fontSize: '14px' }}
          >
            Reset View
          </button>
          <button
            className="button button-secondary"
            onClick={handleExport}
            style={{ padding: '6px 12px', fontSize: '14px' }}
            title="Download graph JSON for CustomGPT"
          >
            📥 Export for GPT
          </button>
          <div style={{ fontSize: '13px', color: '#4a5568', padding: '6px 12px', background: '#f7fafc', borderRadius: '4px' }}>
            Zoom: {(zoom * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '12px', padding: '12px', background: '#f7fafc', borderRadius: '6px', fontSize: '13px' }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>🖱️ Controls:</strong> Mouse wheel to zoom, Click & drag to pan, Click nodes for details
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px' }}>
          <div><span style={{ color: '#4299e1', fontWeight: 'bold' }}>━</span> relate_to</div>
          <div><span style={{ color: '#48bb78', fontWeight: 'bold' }}>━</span> mention</div>
          <div><span style={{ color: '#9f7aea', fontWeight: 'bold' }}>━</span> hyperlink_to</div>
          <div><span style={{ color: '#ed8936', fontWeight: 'bold' }}>━</span> mention_in_context</div>
          <div><span style={{ color: '#f56565', fontWeight: 'bold' }}>━</span> maps_to</div>
          <div><span style={{ color: '#38a169', fontWeight: 'bold' }}>━</span> has_section</div>
          <div><span style={{ color: '#d69e2e', fontWeight: 'bold' }}>━</span> has_requirement</div>
          <div><span style={{ color: '#805ad5', fontWeight: 'bold' }}>━</span> requires</div>
          <div><span style={{ color: '#3182ce', fontWeight: 'bold' }}>━</span> evidenced_by</div>
          <div><span style={{ color: '#e53e3e', fontWeight: 'bold' }}>━</span> violated_by</div>
          <div><span style={{ color: '#319795', fontWeight: 'bold' }}>━</span> supported_by</div>
        </div>
      </div>

      <div style={{ marginBottom: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {nodeTypes.map(type => (
          <label key={type} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input
              type="checkbox"
              checked={!filterNodeTypes.has(type)}
              onChange={(e) => {
                const newSet = new Set(filterNodeTypes);
                if (e.target.checked) {
                  newSet.delete(type);
                } else {
                  newSet.add(type);
                }
                setFilterNodeTypes(newSet);
              }}
            />
            <span className="badge badge-info">{type}</span>
          </label>
        ))}
      </div>

      <div className="graph-container" ref={containerRef} style={{ height: `${height}px`, position: 'relative', overflow: 'hidden' }} />

      {selectedNode && (
        <div className="card" style={{ marginTop: '16px', borderLeft: '4px solid #2c5282' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Selected Node</h4>
          <div style={{ fontSize: '14px' }}>
            <div><strong>Type:</strong> <span className="badge badge-info">{selectedNode.type}</span></div>
            <div style={{ marginTop: '6px' }}><strong>Label:</strong> {selectedNode.label}</div>
            {Object.keys(selectedNode.props).length > 0 && (
              <div style={{ marginTop: '6px' }}>
                <strong>Properties:</strong>
                <pre style={{ background: '#f7fafc', padding: '8px', borderRadius: '4px', fontSize: '12px', marginTop: '4px', maxHeight: '200px', overflow: 'auto' }}>
                  {JSON.stringify(selectedNode.props, null, 2)}
                </pre>
              </div>
            )}
            <div style={{ marginTop: '6px' }}>
              <strong>Connected Edges:</strong> {data.edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length}
            </div>
            <div style={{ marginTop: '6px' }}>
              <strong>Connections:</strong>
              <ul style={{ marginTop: '4px', paddingLeft: '20px', maxHeight: '150px', overflow: 'auto' }}>
                {data.edges
                  .filter(e => e.from === selectedNode.id || e.to === selectedNode.id)
                  .slice(0, 10)
                  .map((edge, i) => (
                    <li key={i} style={{ fontSize: '13px', marginBottom: '2px' }}>
                      {edge.from === selectedNode.id ? '→' : '←'} {edge.label || edge.type} {edge.from === selectedNode.id ? edge.to : edge.from}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <button
            className="button button-secondary"
            style={{ marginTop: '12px', padding: '6px 12px', fontSize: '14px' }}
            onClick={() => setSelectedNode(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

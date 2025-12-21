import './Results.css';

function Results({ results }) {
  const clusterInfo = {
    0: {
      name: 'Normal Stable Consumption',
      description: 'Regular and predictable energy usage with stable voltage and no overload conditions.',
      color: '#10b981',
      icon: '✅'
    },
    1: {
      name: 'High Load / Peak Demand Users',
      description: 'Users with heavy energy consumption, high grid dependency, and usage spikes during peak hours.',
      color: '#f59e0b',
      icon: '⚡'
    },
    2: {
      name: 'Renewable-Dominant Users',
      description: 'Users relying mostly on solar or wind energy with low grid dependency and stable consumption.',
      color: '#10b981',
      icon: '🌱'
    },
    3: {
      name: 'Unstable / Fault-Pattern Users',
      description: 'Abnormal energy behavior with voltage fluctuations, overload conditions, or potential transformer faults.',
      color: '#ef4444',
      icon: '⚠️'
    }
  };

  const getClusterInfo = (cluster) => {
    // Add 1 to cluster index to display as 1-4 instead of 0-3
    const displayCluster = cluster + 1;
    return clusterInfo[displayCluster] || {
      name: `Cluster ${displayCluster}`,
      description: 'Unknown cluster pattern.',
      color: '#6b7280',
      icon: '❓'
    };
  };

  const getAnomalyStatus = (isAnomaly) => {
    return isAnomaly ? 'Anomaly Detected' : 'Normal Operation';
  };

  const getAnomalyColor = (isAnomaly) => {
    return isAnomaly ? '#ef4444' : '#10b981';
  };

  const getAnomalyIcon = (isAnomaly) => {
    return isAnomaly ? '⚠️' : '✅';
  };

  const cluster = getClusterInfo(results.cluster);

  return (
    <div className="results-card">
      <h2 className="results-title">Analysis Results</h2>
      
      <div className="result-section cluster-section">
        <div className="result-header">
          <span className="result-icon">{cluster.icon}</span>
          <h3>Energy Cluster Classification</h3>
        </div>
        <div className="cluster-result">
          <div className="cluster-number" style={{ 
            background: `linear-gradient(135deg, ${cluster.color} 0%, ${cluster.color}dd 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {results.cluster + 1}
          </div>
          <div className="cluster-info">
            <div className="cluster-label" style={{ color: cluster.color }}>
              {cluster.name}
            </div>
            <div className="cluster-description">
              {cluster.description}
            </div>
          </div>
        </div>
      </div>

      <div className="result-section anomaly-section">
        <div className="result-header">
          <span className="result-icon">🔍</span>
          <h3>Anomaly Detection</h3>
        </div>
        <div 
          className="anomaly-result"
          style={{ borderColor: getAnomalyColor(results.is_anomaly) }}
        >
          <div className="anomaly-status">
            <span className="anomaly-icon">{getAnomalyIcon(results.is_anomaly)}</span>
            <span 
              className="anomaly-label"
              style={{ color: getAnomalyColor(results.is_anomaly) }}
            >
              {getAnomalyStatus(results.is_anomaly)}
            </span>
          </div>
          <div className="anomaly-score">
            <span className="score-label">Anomaly Score:</span>
            <span 
              className="score-value"
              style={{ color: getAnomalyColor(results.is_anomaly) }}
            >
              {results.anomaly_score.toFixed(4)}
            </span>
          </div>
        </div>
        {results.is_anomaly === 1 ? (
          <div className="alert alert-warning">
            <strong>⚠️ Warning:</strong> Unusual energy consumption pattern detected. 
            Please review the data for potential issues or irregularities.
          </div>
        ) : (
          <div className="alert alert-success">
            <strong>✅ All Good:</strong> Energy consumption is within normal parameters. 
            No anomalies detected in the system.
          </div>
        )}
      </div>

      <div className="result-section insights-section">
        <div className="result-header">
          <span className="result-icon">💡</span>
          <h3>Insights</h3>
        </div>
        <ul className="insights-list">
          <li>
            <strong>Pattern Classification:</strong> Your energy usage belongs to <span style={{ color: cluster.color }}>
            {cluster.name}</span> - {cluster.description}
          </li>
          <li>
            <strong>System Health:</strong> The anomaly score of {results.anomaly_score.toFixed(4)} 
            {results.is_anomaly ? ' indicates potential issues requiring attention.' : ' shows normal system operation.'}
          </li>
          <li>
            <strong>Recommendation:</strong> 
            {results.is_anomaly 
              ? ' Investigate the unusual patterns to prevent potential system failures or inefficiencies.'
              : ' Continue monitoring to maintain optimal energy efficiency.'}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Results;


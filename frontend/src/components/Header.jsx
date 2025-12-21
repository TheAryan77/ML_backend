import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <h1>Energy Analytics AI</h1>
        </div>
        <p className="subtitle">Smart Energy Monitoring & Anomaly Detection</p>
      </div>
    </header>
  );
}

export default Header;

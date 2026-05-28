import './App.css';

const categories = ['All Years', '2021', '2022', '2023'];
const funds = ['All Funds', 'General Fund', 'Special Revenue Fund'];

function App() {
  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">For non-technical users</p>
          <h1>GoldenInsights</h1>
          <p className="subheading">Washington State Fiscal Data Explorer</p>
        </div>
      </header>

      <section className="panel ask-panel">
        <div className="panel-header">
          <div>
            <p className="panel-title">Ask a Question (AI-Powered)</p>
            <p className="panel-subtitle">Type a natural language question about the spending data. The AI will help you find answers.</p>
          </div>
        </div>
        <div className="ask-input-row">
          <input type="text" placeholder="e.g., 'What is the top spending category?' or 'Show me the total spending'" />
          <button>Ask</button>
        </div>
      </section>

      <section className="panel filter-panel">
        <div className="filter-header">
          <div>
            <p className="panel-title">Filter Data</p>
            <p className="panel-subtitle">Refine the dataset by fiscal year and fund type.</p>
          </div>
        </div>
        <div className="filter-group">
          <div>
            <p className="filter-label">Fiscal Year</p>
            <div className="button-group">
              {categories.map((label) => (
                <button key={label} className={label === 'All Years' ? 'active' : ''}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="filter-label">Fund Type</p>
            <div className="button-group">
              {funds.map((label) => (
                <button key={label} className={label === 'All Funds' ? 'active' : ''}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <p className="summary-label">Total Spending</p>
          <p className="summary-value">$31.6M</p>
          <p className="summary-note">15 transactions</p>
        </article>
        <article className="summary-card">
          <p className="summary-label">Top Category</p>
          <p className="summary-value">Education</p>
          <p className="summary-note">$10.5M</p>
        </article>
        <article className="summary-card">
          <p className="summary-label">Top Vendor</p>
          <p className="summary-value">Department of Education</p>
          <p className="summary-note">$3.8M</p>
        </article>
      </section>

      <section className="content-grid">
        <article className="chart-card">
          <div className="chart-card-header">
            <div>
              <p className="panel-title">Spending by Category</p>
              <p className="panel-subtitle">Distribution of funds across categories</p>
            </div>
          </div>
          <div className="chart-content pie-chart">
            <div className="pie-segment segment-1"></div>
            <div className="pie-segment segment-2"></div>
            <div className="pie-segment segment-3"></div>
            <div className="pie-segment segment-4"></div>
          </div>
          <div className="legend-row">
            <span><strong>Education</strong></span>
            <span><strong>Infrastructure</strong></span>
            <span><strong>Health</strong></span>
            <span><strong>Other</strong></span>
          </div>
        </article>

        <article className="chart-card">
          <div className="chart-card-header">
            <div>
              <p className="panel-title">Spending Trends</p>
              <p className="panel-subtitle">Total spending over fiscal years</p>
            </div>
          </div>
          <div className="chart-content line-chart">
            <div className="line-chart-axis" />
            <div className="line-chart-line" />
            <div className="trend-point point-1" />
            <div className="trend-point point-2" />
            <div className="trend-point point-3" />
            <div className="trend-point point-4" />
          </div>
          <div className="legend-row">
            <span>2019</span>
            <span>2020</span>
            <span>2021</span>
            <span>2022</span>
          </div>
        </article>
      </section>
    </div>
  );
}

export default App;

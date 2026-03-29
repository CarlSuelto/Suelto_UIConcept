import React, { useState } from "react";
import "./App.css";

type Page = "dashboard" | "students" | "logs" | "reports";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`app ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div className="sidebar-top">
          {!collapsed && <h2 className="logo">SIL Monitor</h2>}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        <nav className="nav">
          <NavItem label="Dashboard" icon="📊" active={page==="dashboard"} onClick={()=>setPage("dashboard")} collapsed={collapsed}/>
          <NavItem label="Students" icon="👨‍🎓" active={page==="students"} onClick={()=>setPage("students")} collapsed={collapsed}/>
          <NavItem label="Logs" icon="📝" active={page==="logs"} onClick={()=>setPage("logs")} collapsed={collapsed}/>
          <NavItem label="Reports" icon="📁" active={page==="reports"} onClick={()=>setPage("reports")} collapsed={collapsed}/>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="header glass">
          <h1>{page}</h1>
          <div className="user glass-soft">Admin</div>
        </header>

        <div className="page">
          {page === "dashboard" && <Dashboard />}
          {page === "students" && <Students />}
          {page === "logs" && <Logs />}
          {page === "reports" && <Reports />}
        </div>
      </main>
    </div>
  );
};

export default App;

/* NAV ITEM WITH TOOLTIP */
const NavItem = ({ label, icon, active, onClick, collapsed }: any) => (
  <div className="nav-wrapper">
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <span className="icon">{icon}</span>
      {!collapsed && <span className="label">{label}</span>}
      {active && <span className="active-indicator" />}
    </button>

    {collapsed && <span className="tooltip">{label}</span>}
  </div>
);

/* PAGES */
const Dashboard = () => (
  <div className="grid">
    <Card title="Active Students" value="128" />
    <Card title="Completed Hours" value="4,320" />
    <Card title="Pending Reports" value="12" />
  </div>
);

const Students = () => (
  <div className="section">
    <h3>Students</h3>
    <Table
      headers={["Name", "Hours", "Status"]}
      rows={[
        ["Juan Dela Cruz", "120", <Badge type="complete" text="Complete" />],
        ["Maria Santos", "98", <Badge type="pending" text="Pending" />],
      ]}
    />
  </div>
);

const Logs = () => (
  <div className="section">
    <h3>Logs</h3>
    <Table
      headers={["Name", "Hours", "Description"]}
      rows={[
        ["Juan", "5", "Worked on UI"],
        ["Maria", "4", "Documentation"],
      ]}
    />
  </div>
);

const Reports = () => (
  <div className="grid">
    <Card title="Approved Reports" value="90" />
    <Card title="Rejected Reports" value="5" />
    <Card title="Pending Review" value="12" />
  </div>
);

/* COMPONENTS */
const Card = ({ title, value }: any) => (
  <div className="card glass">
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

const Badge = ({ type, text }: any) => (
  <span className={`badge ${type}`}>{text}</span>
);

const Table = ({ headers, rows }: any) => (
  <div className="table glass">
    <div className="row header-row">
      {headers.map((h: string, i: number) => (
        <span key={i}>{h}</span>
      ))}
    </div>

    {rows.map((r: any, i: number) => (
      <div className="row fade-in" key={i}>
        {r.map((cell: any, j: number) => (
          <span key={j}>{cell}</span>
        ))}
      </div>
    ))}
  </div>
);
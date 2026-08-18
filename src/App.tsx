import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UploadAudit } from './pages/UploadAudit';
import { CitizenPortal } from './pages/CitizenPortal';
import { AuditReports } from './pages/AuditReports';
import { Monitoring } from './pages/Monitoring';
import { CaseFiles } from './pages/CaseFiles';
import { Compliance } from './pages/Compliance';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/upload" replace />} />
          <Route path="upload" element={<UploadAudit />} />
          <Route path="reports" element={<AuditReports />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="cases" element={<CaseFiles />} />
          <Route path="citizen" element={<CitizenPortal />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div className="p-8 text-center text-gray-500 mt-20">This page is under construction for the hackathon prototype.</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

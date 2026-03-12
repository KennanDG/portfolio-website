import { Routes, Route } from 'react-router-dom';
import { SiteLayout } from './components/layout/Site';
// import { HomePage } from './pages/Home';
// import { AboutPage } from './pages/About';
// import { ProjectsPage } from './pages/Projects';
// import { ContactPage } from './pages/Contact';

function App() {

  return (
    <SiteLayout>
      <p>Test</p>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes> */}
    </SiteLayout>
  )
}

export default App

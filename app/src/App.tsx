import { Routes, Route } from 'react-router-dom';
import { SiteLayout } from './components/layout/Site';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { ProjectsPage } from './pages/Projects';
import { ContactPage } from './pages/Contact';
import { RagDemoPage } from './pages/RagDemo';

const App = () => {

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/rag-demo" element={<RagDemoPage />} />
      </Routes>
    </SiteLayout>
  )
}

export default App

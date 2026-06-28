import { Routes, Route } from 'react-router-dom';

import { About } from './components/about';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Legal } from './components/legal';

import './App.css';

function App() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Page content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

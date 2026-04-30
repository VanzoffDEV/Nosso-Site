import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importe suas Páginas
import { Navbar } from './Components/Navbar/Navbar';
import { MainHero } from './Components/Main/Main';
import { About } from './Components/About/About';
import { Services } from './Components/Services/Services';
import { Portfolio } from './Components/Portfolio/Portfolio';
import { Blog } from './Components/Blog/Blog';
import { Contact } from './Components/Contato/Contato';
import { Footer } from './Components/Footer/Footer';
import { WorkWithUsModal } from './Components/Modal/WorkWithUs';
import { PrivacyModal } from './Components/Modal/PrivacyModal';

// Importe os novos componentes
import { LoginAdmin } from './pages/Login_Admin'; 
import { AdminPage } from './pages/Admin_Page';

function App() {
  const [activeModal, setActiveModal] = useState<null | 'work' | 'privacy'>('privacy');

  // --- TRAVA DE SEGURANÇA (ProtectedRoute) ---
  // Esta função verifica se o 'isAuth' existe no localStorage
 // --- TRAVA DE SEGURANÇA (ProtectedRoute) ---
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

  // Componente da Home
  const HomePage = () => (
    <>
      <Navbar onOpenModal={() => setActiveModal('work')} />
      <main>
        <MainHero />
        <About />
        <Services />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <Footer 
        onOpenModal={() => setActiveModal('work')} 
        onOpenPrivacy={() => setActiveModal('privacy')} 
      />
      <WorkWithUsModal isOpen={activeModal === 'work'} onClose={() => setActiveModal(null)} />
      <PrivacyModal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} />
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Rota da Página Principal */}
        <Route path="/" element={<HomePage />} />

        {/* Rota do Login */}
        <Route path="/login" element={<LoginAdmin />} />

        {/* Rota do Painel Admin PROTEGIDA */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />

        {/* Rota de "Página não encontrada" - Redireciona para Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importe suas Páginas e Componentes
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

// Importe os componentes de Admin
import { LoginAdmin } from './pages/Login_Admin'; 
import { AdminPage } from './pages/Admin_Page';

// --- TRAVA DE SEGURANÇA (ProtectedRoute) ---
// Esta função impede que pessoas não logadas acessem a rota /admin
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  
  if (!isAuth) {
    // Se não houver autorização, redireciona para o login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  // Estado para controlar os modais (começa como null para não abrir nada sozinho)
  const [activeModal, setActiveModal] = useState<null | 'work' | 'privacy'>(null);

  // Componente que agrupa as seções da Página Principal (Landing Page)
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
      
      {/* Modais Gerenciados pelo Estado */}
      <WorkWithUsModal 
        isOpen={activeModal === 'work'} 
        onClose={() => setActiveModal(null)} 
      />
      <PrivacyModal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );

  return (
    <Router>
      <Routes>
        {/* 1. Rota da Página Principal */}
        <Route path="/" element={<HomePage />} />

        {/* 2. Rota do Login Administrativo */}
        <Route path="/login" element={<LoginAdmin />} />

        {/* 3. Rota do Painel Admin (PROTEGIDA) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />

        {/* 4. Rota "Curinga" - Se o usuário digitar qualquer URL errada, volta para Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
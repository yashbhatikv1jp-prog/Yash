import { useEffect } from 'react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/not-found';
import { ThemeProvider } from './context/ThemeContext';
import { CursorGlow, NeonPreloader, ScrollProgress } from './components/ExperienceEffects';

const queryClient = new QueryClient();

function RouteShell() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <NeonPreloader />
      <ScrollProgress />
      <CursorGlow />
      {/* Global animated background — behind everything */}
      <AnimatedBackground />

      {/* App shell */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, paddingTop: 64 }}>
          <Switch>
            <Route path="/"             component={HomePage} />
            <Route path="/about"        component={AboutPage} />
            <Route path="/skills"       component={SkillsPage} />
            <Route path="/projects"     component={ProjectsPage} />
            <Route path="/achievements" component={AchievementsPage} />
            <Route path="/contact"      component={ContactPage} />
            <Route                      component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>

      <Toaster />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <RouteShell />
          </WouterRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

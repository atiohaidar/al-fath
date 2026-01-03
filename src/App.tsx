import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Loader2 } from "lucide-react";

// Lazy load pages for performance
// Lazy load Landing Page
const LandingPage = lazy(() => import("./pages/LandingPage"));

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const AmalanYaumiah = lazy(() => import("./pages/AmalanYaumiah"));
const Events = lazy(() => import("./pages/Events"));
const Info = lazy(() => import("./pages/Info"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const MyIDCard = lazy(() => import("./pages/MyIDCard"));
const EventScanner = lazy(() => import("./pages/EventScanner"));
const KaderOfMonth = lazy(() => import("./pages/KaderOfMonth"));
const StatistikAmalan = lazy(() => import("./pages/StatistikAmalan"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DecorativePreview = lazy(() => import("./pages/DecorativePreview"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />

              {/* Protected / Dashboard Routes - With Persistent Layout */}
              <Route path="/app" element={
                <AppLayout>
                  <Outlet />
                </AppLayout>
              }>
                <Route index element={<Index />} />
                <Route path="amalan" element={<AmalanYaumiah />} />
                <Route path="events" element={<Events />} />
                {/* EventScanner moved out to avoid persistent layout */}
                <Route path="info" element={<Info />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/settings" element={<ProfileSettings />} />
                <Route path="profile/id-card" element={<MyIDCard />} />
                <Route path="profile/statistik" element={<StatistikAmalan />} />
                <Route path="kader-of-month" element={<KaderOfMonth />} />
              </Route>

              {/* Protected Routes - Standalone / Fullscreen */}
              <Route path="/app/events/:id/scan" element={<EventScanner />} />

              {/* Dev Tools */}
              <Route path="/preview/decorations" element={<DecorativePreview />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

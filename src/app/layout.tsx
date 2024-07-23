// src/app/layout.tsx
import './globals.css';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Graph } from '../components/Graph';
import { Navigation } from '../components/Navigation';
import { SidebarProvider } from '../context/SidebarContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen bg-gray-800">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden ml-16">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800">
                <div className="container mx-auto px-6 py-8">
                  <Graph />
                  <Navigation />
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
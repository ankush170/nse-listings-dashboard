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
      <body className="bg-gray-100">
        <SidebarProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6">
                  <Graph />
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
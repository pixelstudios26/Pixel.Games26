import React, {StrictMode, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Ghost } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center font-pixel">
          <Ghost className="text-white mb-6 animate-pulse" size={48} />
          <h1 className="text-white text-sm mb-4 tracking-widest">SYSTEM CRASH DETECTED</h1>
          <p className="text-zinc-500 text-[8px] mb-8 leading-relaxed max-w-xs mx-auto">
            AN UNEXPECTED ERROR HAS OCCURRED IN THE PIXEL ENGINE. 
            PLEASE ATTEMPT A SYSTEM REBOOT.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 border-2 border-white bg-white text-black font-pixel text-[10px] hover:bg-black hover:text-white transition-colors"
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

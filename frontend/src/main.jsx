import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.jsx'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Default retry attempts
      staleTime: 5000, // Data is fresh for 5 seconds
    },
  },
})

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </StrictMode>,
)

// =====================================================================
//   WHAT IS STRICT MODE?
//   =====================================================================
//   You may notice that console.log() runs TWICE in development. 
//   This is due to <React.StrictMode> in main.jsx.

//   - Purpose: It intentionally double-invokes effects and renders to help 
//     detect side effects and memory leaks.
//   - Behavior: 
//       1. Mounts component
//       2. Unmounts component (Cleanups run)
//       3. Remounts component
//   - Why? It ensures your cleanup functions work correctly. If your effect
//     breaks when running twice, it means you have a bug (e.g., forgetting to cleanup).
//   - Note: This ONLY happens in Development (npm run dev). It does NOT happen in Production.

/*
     STRICT MODE & TIMERS:
     In strict mode, if you start the timer:
     1. Effect runs (Interval 1 starts)
     2. Cleanup runs IMMEDIATELY (Interval 1 clears)
     3. Effect runs again (Interval 2 starts)
     
     Result: You will see only one active timer.
     If you missed the return cleanup, you would have TWO timers running!
  */
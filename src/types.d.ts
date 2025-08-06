// Global type declarations for the telecom portal

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

// Extend Window interface for any global properties
declare global {
  interface Window {
    // Add any global window properties here if needed
  }
}

// React Router DOM types
declare module 'react-router-dom' {
  export * from 'react-router-dom';
}

// Lucide React types
declare module 'lucide-react' {
  export * from 'lucide-react';
}

export {};

declare module '@faustwp/core' {
  export interface FaustConfig {
    wpUrl: string;
    apiClientSecret: string;
    templates: Record<string, any>;
    experimentalPlugins?: any[];
    possibleTypes?: Record<string, any>;
  }

  export function setConfig(config: FaustConfig): FaustConfig;
  export function withFaust(nextConfig: any): any;
  export const FaustProvider: React.ComponentType<{ children: React.ReactNode }>;
}
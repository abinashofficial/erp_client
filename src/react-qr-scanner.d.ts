declare module 'react-qr-scanner' {
    import { CSSProperties } from 'react';
  
    interface QrReaderProps {
      delay?: number;
      onError?: (error: any) => void;
      onScan?: (data: any) => void;
      style?: CSSProperties;
      facingMode?: 'user' | 'environment';
      legacyMode?: boolean;
      maxImageSize?: number;
      resolution?: number;
      showViewFinder?: boolean;
    }
  
    const QrReader: React.FC<QrReaderProps>;
  
    export default QrReader;
  }
  
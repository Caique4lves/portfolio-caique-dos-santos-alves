export interface Gradient {
  type: 'linear' | 'radial';
  rotation: number;
  colorStops: { offset: number; color: string }[];
}

export interface QRConfig {
  data: string;
  image: string | null;
  fileName?: string;
  width: number;
  height: number;
  margin: number;
  dotsOptions: {
    color: string;
    type: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
    colorType?: 'single' | 'gradient';
    gradient?: Gradient;
  };
  cornersSquareOptions: {
    color: string;
    type: 'dot' | 'square' | 'extra-rounded' | '';
    colorType?: 'single' | 'gradient';
    gradient?: Gradient;
  };
  cornersDotOptions: {
    color: string;
    type: 'dot' | 'square' | '';
    colorType?: 'single' | 'gradient';
    gradient?: Gradient;
  };
  backgroundOptions: {
    color: string;
    colorType?: 'single' | 'gradient';
    gradient?: Gradient;
  };
  imageOptions: {
    crossOrigin: string;
    margin: number;
    imageSize: number;
    hideBackgroundDots: boolean;
  };
  qrOptions: {
    typeNumber: number;
    mode: 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji';
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
}

export const DEFAULT_QR_CONFIG: QRConfig = {
  data: 'https://qr-code-styling.com',
  image: null,
  width: 300,
  height: 300,
  margin: 10,
  dotsOptions: {
    color: '#333333',
    type: 'square',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#333333' },
        { offset: 1, color: '#666666' }
      ]
    }
  },
  cornersSquareOptions: {
    color: '#333333',
    type: 'square',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#333333' },
        { offset: 1, color: '#666666' }
      ]
    }
  },
  cornersDotOptions: {
    color: '#333333',
    type: 'square',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#333333' },
        { offset: 1, color: '#666666' }
      ]
    }
  },
  backgroundOptions: {
    color: '#ffffff',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 1, color: '#e0e0e0' }
      ]
    }
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 20,
    imageSize: 0.4,
    hideBackgroundDots: true,
  },
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
};

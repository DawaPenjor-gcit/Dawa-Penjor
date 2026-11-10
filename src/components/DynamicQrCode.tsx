import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface DynamicQrCodeProps {
  qrData?: string;
  className?: string;
}

export const DynamicQrCode: React.FC<DynamicQrCodeProps> = ({ qrData, className }) => {
  const [renderedSrc, setRenderedSrc] = useState<string>('/qr_crop.png');

  useEffect(() => {
    const raw = qrData || '/qr_crop.png';
    // If it's already an image path or data URL, render directly
    if (
      raw.startsWith('data:image/') ||
      raw.startsWith('/') ||
      raw.endsWith('.png') ||
      raw.endsWith('.jpg') ||
      raw.endsWith('.jpeg') ||
      raw.endsWith('.svg')
    ) {
      setRenderedSrc(raw);
      return;
    }

    // Otherwise, generate real QR code image using QRCode.toDataURL
    QRCode.toDataURL(raw, {
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setRenderedSrc(url))
      .catch((err) => {
        console.warn('QR code generation fallback to default sample:', err);
        setRenderedSrc('/qr_crop.png');
      });
  }, [qrData]);

  return (
    <img
      src={renderedSrc}
      alt="Verification QR Code"
      className={className || 'w-full h-full object-contain select-none'}
    />
  );
};

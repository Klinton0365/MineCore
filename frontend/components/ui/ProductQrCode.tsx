'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useRef } from 'react';

interface ProductQrCodeProps {
  productId: number;
  productName: string;
  size?: number;
  showDownload?: boolean;
  className?: string;
}

export function ProductQrCode({ productId, productName, size = 160, showDownload = true, className = '' }: ProductQrCodeProps) {
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const qrUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/qr/${productId}`
    : `https://minecoreglobal.com/qr/${productId}`;

  const downloadQrCode = (format: 'png' | 'svg') => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const fileName = `MineCore-QR-${productName.replace(/[^a-zA-Z0-9]/g, '-')}`;

    if (format === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = 512;
        canvas.height = 612;
        if (ctx) {
          // White background
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          // QR code centered
          ctx.drawImage(img, 56, 40, 400, 400);
          // Product name below
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 18px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(productName, canvas.width / 2, 480, 380);
          // Company branding
          ctx.fillStyle = '#64748b';
          ctx.font = '12px system-ui, sans-serif';
          ctx.fillText('MineCore Global', canvas.width / 2, 510);
          ctx.fillText('Scan to view product details', canvas.width / 2, 530);
          // URL
          ctx.fillStyle = '#94a3b8';
          ctx.font = '10px monospace';
          ctx.fillText(qrUrl, canvas.width / 2, 570);
          // Border
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1;
          ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

          canvas.toBlob(blob => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }, 'image/png');
        }
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <>
      <div className={className}>
        <div ref={qrRef} className="inline-block bg-white p-3 rounded-xl">
          <QRCodeSVG
            value={qrUrl}
            size={size}
            level="M"
            includeMargin={false}
            bgColor="white"
            fgColor="#0f172a"
          />
        </div>

        {showDownload && (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => downloadQrCode('png')}
              className="text-xs px-3 py-1.5 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white border border-accent-blue/20 hover:border-accent-blue transition-all"
            >
              Download PNG
            </button>
            <button
              onClick={() => downloadQrCode('svg')}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-text-secondary hover:text-text border border-white/10 hover:border-white/20 transition-all"
            >
              SVG
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-text-secondary hover:text-text border border-white/10 hover:border-white/20 transition-all"
            >
              Enlarge
            </button>
          </div>
        )}
      </div>

      {/* Full-screen modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="inline-block">
              <QRCodeSVG value={qrUrl} size={280} level="H" includeMargin bgColor="white" fgColor="#0f172a" />
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900">{productName}</p>
            <p className="text-xs text-gray-500 mt-1">Scan to view product details</p>
            <p className="text-[10px] text-gray-400 mt-2 font-mono break-all">{qrUrl}</p>
            <div className="mt-6 flex justify-center gap-2">
              <button onClick={() => downloadQrCode('png')} className="btn-primary text-xs py-2 px-4">
                <span>Download PNG</span>
              </button>
              <button onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4 !text-gray-700 !border-gray-200">
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

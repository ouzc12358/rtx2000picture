import React, { useState, useEffect, useRef } from 'react';
import type { CropRegion } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface CroppedImageViewerProps {
  sourceImage: string | null;
  imageDimensions: { width: number; height: number };
  cropRegion: CropRegion;
}

const CroppedImageViewer: React.FC<CroppedImageViewerProps> = ({ sourceImage, imageDimensions, cropRegion }) => {
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // New state for download options
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [quality, setQuality] = useState(0.92);

  useEffect(() => {
    // If sourceImage is falsy (e.g., null or empty string), it indicates missing data.
    if (!sourceImage) {
      setIsLoading(false);
      setCroppedImageDataUrl(null);
      return;
    }

    setIsLoading(true);
    const img = new Image();
    img.crossOrigin = "Anonymous"; // In case the image is hosted elsewhere
    img.src = sourceImage;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = cropRegion.width;
        canvas.height = cropRegion.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            img,
            cropRegion.x,
            cropRegion.y,
            cropRegion.width,
            cropRegion.height,
            0,
            0,
            cropRegion.width,
            cropRegion.height
          );
          setCroppedImageDataUrl(canvas.toDataURL('image/png'));
        }
      }
      setIsLoading(false);
    };
    
    img.onerror = () => {
        console.error("Image failed to load. Check the image URL or data.");
        setIsLoading(false);
        setCroppedImageDataUrl(null); // Ensure we show the error state
    }
  }, [sourceImage, cropRegion]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const mimeType = `image/${format}`;
    // For toDataURL, quality is the second argument for JPEG.
    const dataUrl = canvas.toDataURL(mimeType, format === 'jpeg' ? quality : undefined);

    const link = document.createElement('a');
    link.href = dataUrl;

    const baseFilename = cropRegion.filename.replace(/\.[^/.]+$/, "");
    const extension = format === 'jpeg' ? 'jpg' : 'png';
    link.download = `${baseFilename}.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowDownloadOptions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col relative">
      <div className="p-4 flex-grow flex items-center justify-center bg-gray-200 min-h-[200px]">
        {isLoading && (
          <div className="flex flex-col items-center text-slate-500">
            <svg className="animate-spin h-8 w-8 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="mt-2">Processing...</span>
          </div>
        )}
        {!isLoading && croppedImageDataUrl && (
          <img src={croppedImageDataUrl} alt={cropRegion.filename} className="max-w-full max-h-full object-contain" />
        )}
        {!isLoading && !croppedImageDataUrl && (
            <div className="text-center text-slate-500 p-4">
              <p className="text-2xl mb-2" aria-hidden="true">⚠️</p>
              <p className="font-semibold">Image Unavailable</p>
              <p className="text-xs mt-1">The source image could not be loaded. Please check the URL.</p>
            </div>
        )}
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <p className="text-sm font-medium text-slate-700 truncate" title={cropRegion.filename}>{cropRegion.filename}</p>
        <button
          onClick={() => setShowDownloadOptions(true)}
          disabled={!croppedImageDataUrl}
          className={`mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${croppedImageDataUrl ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download
        </button>
      </div>
      
      {/* Download Options Modal */}
      {showDownloadOptions && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-10"
          onClick={() => setShowDownloadOptions(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-options-title"
        >
          <div 
            className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="download-options-title" className="text-lg font-semibold mb-4 text-slate-800">Download Options</h3>
            
            <fieldset className="mb-4">
              <legend className="block text-sm font-medium text-slate-700 mb-2">Format</legend>
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="format" value="png" checked={format === 'png'} onChange={() => setFormat('png')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-slate-700">PNG</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="format" value="jpeg" checked={format === 'jpeg'} onChange={() => setFormat('jpeg')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-slate-700">JPEG</span>
                </label>
              </div>
            </fieldset>

            {format === 'jpeg' && (
              <div className="mb-6">
                <label htmlFor="quality" className="block text-sm font-medium text-slate-700 mb-1">Quality: <span className="font-bold tabular-nums">{Math.round(quality * 100)}%</span></label>
                <input
                  type="range"
                  id="quality"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowDownloadOptions(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 text-sm font-medium rounded-md hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download Now
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default CroppedImageViewer;
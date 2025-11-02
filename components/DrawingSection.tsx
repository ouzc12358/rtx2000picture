import React from 'react';
import type { PageData } from '../types';
import CroppedImageViewer from './CroppedImageViewer';

interface DrawingSectionProps {
  pageData: PageData;
}

const DrawingSection: React.FC<DrawingSectionProps> = ({ pageData }) => {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-semibold border-b-2 border-slate-300 pb-2 mb-6 text-slate-700">{pageData.pageName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageData.crops.map((crop) => (
          <CroppedImageViewer
            key={crop.filename}
            sourceImage={pageData.sourceImage}
            imageDimensions={{ width: pageData.imageWidth, height: pageData.imageHeight }}
            cropRegion={crop}
          />
        ))}
      </div>
    </section>
  );
};

export default DrawingSection;

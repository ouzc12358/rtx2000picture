export interface CropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  filename: string;
}

export interface PageData {
  id: string;
  pageName: string;
  sourceImage: string | null; // base64 string
  imageWidth: number;
  imageHeight: number;
  crops: CropRegion[];
}
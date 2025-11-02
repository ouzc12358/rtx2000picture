import type { PageData } from './types';
import { PAGE_38_IMAGE, PAGE_39_IMAGE, PAGE_40_IMAGE, PAGE_41_IMAGE } from './assets/pageImages';

export const DRAWING_DATA: PageData[] = [
  {
    id: 'page38',
    pageName: 'Page 38 Drawings (3.4.1 & 3.4.2)',
    sourceImage: PAGE_38_IMAGE,
    imageWidth: 1240,
    imageHeight: 1754,
    crops: [
      { x: 90, y: 70, width: 1050, height: 380, filename: '图表3.4.1 - RTX2300, RTX2400-G 基本尺寸.png' },
      { x: 140, y: 530, width: 480, height: 280, filename: '过程连接 (<= 5 MPa) - 1-2 - 14 NPT 内螺纹.png' },
      { x: 670, y: 530, width: 480, height: 280, filename: '过程连接 (<= 5 MPa) - 1-2 - 14 NPT 外螺纹.png' },
      { x: 140, y: 840, width: 480, height: 350, filename: '过程连接 (<= 5 MPa) - M20 x 1.5 外螺纹.png' },
      { x: 670, y: 840, width: 480, height: 350, filename: '过程连接 (<= 5 MPa) - G1-2 外螺纹.png' },
    ]
  },
  {
    id: 'page39',
    pageName: 'Page 39 Drawings (3.4.3 & 3.4.4)',
    sourceImage: PAGE_39_IMAGE,
    imageWidth: 1240,
    imageHeight: 1754,
    crops: [
      { x: 140, y: 140, width: 480, height: 220, filename: '过程连接 (> 5 MPa) - 1-2 - 14 NPT 内螺纹.png' },
      { x: 670, y: 140, width: 480, height: 220, filename: '过程连接 (> 5 MPa) - 1-2 - 14 NPT 外螺纹.png' },
      { x: 140, y: 380, width: 480, height: 280, filename: '过程连接 (> 5 MPa) - M20 x 1.5 外螺纹.png' },
      { x: 670, y: 380, width: 480, height: 280, filename: '过程连接 (> 5 MPa) - G1-2 外螺纹.png' },
      { x: 100, y: 600, width: 1050, height: 680, filename: '图表3.4.4 - RTX2400-K, RTX2500 基本尺寸.png' },
    ]
  },
  {
    id: 'page40',
    pageName: 'Page 40 Drawings (3.5.1 & 3.5.2)',
    sourceImage: PAGE_40_IMAGE,
    imageWidth: 1240,
    imageHeight: 1754,
    crops: [
      { x: 100, y: 150, width: 1050, height: 450, filename: '图表3.5.1 - RTX2300-A, RTX2400-G 阀组尺寸.png' },
      { x: 110, y: 500, width: 950, height: 850, filename: '图表3.5.2 - RTX2400-K 阀组尺寸.png' },
    ]
  },
  {
    id: 'page41',
    pageName: 'Page 41 Drawings (3.5.3 & 3.5.4)',
    sourceImage: PAGE_41_IMAGE,
    imageWidth: 1240,
    imageHeight: 1754,
    crops: [
      { x: 120, y: 90, width: 950, height: 480, filename: '图表3.5.3 - RTX2500-D 三阀组尺寸.png' },
      { x: 120, y: 550, width: 950, height: 500, filename: '图表3.5.4 - RTX2500-D 五阀组尺寸.png' },
    ]
  }
];

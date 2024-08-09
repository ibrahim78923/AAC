declare module 'quill-image-resize-module-react' {
  import { Quill } from 'quill';

  interface ImageResizeOptions {
    modules?: any;
    overlayStyles?: { [key: string]: string };
    handleStyles?: { [key: string]: string };
    displayStyles?: { [key: string]: string };
    [key: string]: any;
  }

  class ImageResize {
    constructor(quill: Quill, options: ImageResizeOptions);
  }

  export default ImageResize;
}

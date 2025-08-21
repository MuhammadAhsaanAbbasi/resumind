export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    pageNumber: number;
    error?: string;
  }
  
  let pdfjsLib: any = null;
  let isLoading = false;
  let loadPromise: Promise<any> | null = null;
  
  async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;
  
    isLoading = true;
  
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
      // Automatically load the correct version of the worker
      lib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";;
      pdfjsLib = lib;
      isLoading = false;
      return lib;
    });
  
    return loadPromise;
  }
  
  export async function convertPdfToImages(
    file: File
  ): Promise<{ thumbnail: string | null; results: PdfConversionResult[] }> {
    const results: PdfConversionResult[] = [];
    let thumbnail: string | null = null;
  
    if (file.type !== "application/pdf") {
      console.error("❌ Invalid file type:", file.type);
      return {
        thumbnail: null,
        results: [
          {
            imageUrl: "",
            file: null,
            pageNumber: 0,
            error: "The uploaded file is not a valid PDF.",
          },
        ],
      };
    }
  
    try {
      const lib = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
  
      if (arrayBuffer.byteLength === 0) {
        throw new Error("Empty file buffer");
      }
  
      const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
  
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        try {
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
  
          canvas.width = viewport.width;
          canvas.height = viewport.height;
  
          if (!context) {
            throw new Error("Canvas context could not be initialized");
          }
  
          await page.render({ canvasContext: context, viewport }).promise;
  
          const result = await new Promise<PdfConversionResult>((resolve) => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve({
                    imageUrl: "",
                    file: null,
                    pageNumber,
                    error: "Failed to create image blob",
                  });
                  return;
                }
  
                const baseName = file.name.replace(/\.pdf$/i, "");
                const imageFile = new File(
                  [blob],
                  `${baseName}-page-${pageNumber}.png`,
                  { type: "image/png" }
                );
  
                const imageUrl = URL.createObjectURL(blob);
                if (pageNumber === 1) thumbnail = imageUrl;
  
                resolve({
                  imageUrl,
                  file: imageFile,
                  pageNumber,
                });
              },
              "image/png",
              1.0
            );
          });
  
          results.push(result);
        } catch (err) {
          results.push({
            imageUrl: "",
            file: null,
            pageNumber,
            error: `Failed to convert page ${pageNumber}: ${err}`,
          });
        }
      }
    } catch (err) {
      console.error("❌ Failed to load PDF:", err);
      return {
        thumbnail: null,
        results: [
          {
            imageUrl: "",
            file: null,
            pageNumber: 0,
            error: `Failed to load or parse PDF: ${err}`,
          },
        ],
      };
    }
  
    return {
      thumbnail,
      results,
    };
  }
  
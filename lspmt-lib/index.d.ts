declare namespace LSPMT {
  class LSPMTTransformError extends Error {
    public info: any
  }
  export function decodeWYTK(url: string): Promise<File>
  export function extractTPWJJ(buffer: ArrayBuffer): (File | LSPMTTransformError)[]
}

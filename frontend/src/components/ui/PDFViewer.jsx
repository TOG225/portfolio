import { useState, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, Maximize2, Download,
} from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

function ToolbarBtn({ onClick, disabled, title, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-1.5 rounded hover:bg-gray-700 disabled:opacity-30 transition-colors"
    >
      {children}
    </button>
  )
}

export default function PDFViewer({ pdfUrl, fileName = 'rapport.pdf' }) {
  const [numPages, setNumPages]   = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale]         = useState(1.0)
  const [loadError, setLoadError] = useState(false)
  const containerRef              = useRef(null)

  const onSuccess = ({ numPages }) => setNumPages(numPages)
  const onError   = ()             => setLoadError(true)

  const prev    = () => setPageNumber((p) => Math.max(1, p - 1))
  const next    = () => setPageNumber((p) => Math.min(numPages ?? 1, p + 1))
  const zoomIn  = () => setScale((s) => Math.min(2.0, +(s + 0.25).toFixed(2)))
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)))

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current.requestFullscreen()
    }
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-600 font-medium mb-2">Impossible de charger le PDF</p>
        <a href={pdfUrl} download={fileName}
          className="text-sm text-accent underline hover:text-primary">
          Télécharger directement
        </a>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="rounded-xl border border-gray-200 overflow-hidden bg-gray-100">

      {/* ── Toolbar ─────────────────────────────────── */}
      <div className="bg-gray-800 text-white flex items-center gap-1 px-3 py-2 flex-wrap text-sm">

        {/* Navigation */}
        <ToolbarBtn onClick={prev} disabled={pageNumber <= 1} title="Page précédente">
          <ChevronLeft size={16} />
        </ToolbarBtn>
        <span className="font-mono text-xs min-w-[90px] text-center text-gray-300">
          {numPages ? `Page ${pageNumber} / ${numPages}` : '…'}
        </span>
        <ToolbarBtn onClick={next} disabled={!numPages || pageNumber >= numPages} title="Page suivante">
          <ChevronRight size={16} />
        </ToolbarBtn>

        <div className="w-px h-5 bg-gray-600 mx-1 hidden sm:block" />

        {/* Zoom */}
        <ToolbarBtn onClick={zoomOut} disabled={scale <= 0.5} title="Zoom arrière">
          <ZoomOut size={16} />
        </ToolbarBtn>
        <span className="font-mono text-xs w-12 text-center text-gray-300">
          {Math.round(scale * 100)}%
        </span>
        <ToolbarBtn onClick={zoomIn} disabled={scale >= 2.0} title="Zoom avant">
          <ZoomIn size={16} />
        </ToolbarBtn>

        <div className="w-px h-5 bg-gray-600 mx-1 hidden sm:block" />

        <ToolbarBtn onClick={toggleFullscreen} title="Plein écran">
          <Maximize2 size={16} />
        </ToolbarBtn>

        <a
          href={pdfUrl}
          download={fileName}
          className="p-1.5 rounded hover:bg-gray-700 transition-colors"
          title="Télécharger le PDF"
        >
          <Download size={16} />
        </a>
      </div>

      {/* ── Document ────────────────────────────────── */}
      <div className="overflow-auto" style={{ maxHeight: '72vh' }}>
        <div className="flex justify-center py-6 px-4">
          <Document
            file={pdfUrl}
            onLoadSuccess={onSuccess}
            onLoadError={onError}
            loading={
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Chargement du PDF…</p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-2xl"
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>
      </div>
    </div>
  )
}

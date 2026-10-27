"use client"

import React, { useMemo, useRef } from "react"
import dynamic from "next/dynamic"
import "jodit/es2021/jodit.min.css"

// 1. Dynamic import with ssr: false to prevent Next.js SSR "window is not defined" issues
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center font-inter text-slate-400 text-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="w-7 h-7 border-3 border-slate-300 border-t-[#1565C0] rounded-full animate-spin" />
        <span className="text-xs font-semibold">Loading Rich Text Editor...</span>
      </div>
    </div>
  ),
})

export interface BlogContentEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function BlogContentEditor({
  value,
  onChange,
  placeholder = "Write your blog content here...",
}: BlogContentEditorProps) {
  const editor = useRef(null)

  // 2. Jodit Editor Configuration matching exact toolbar requirements
  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      minHeight: 400,
      placeholder: placeholder,
      hidePoweredByJodit: true,
      showPoweredBy: false,
      statusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      toolbarAdaptive: false,
      toolbarSticky: false,
      theme: "default",
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons: [
        "paragraph",
        "fontsize",
        "brush",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "align",
        "|",
        "ul",
        "ol",
        "|",
        "table",
        "link",
        "image",
        "|",
        "source",
      ],
      defaultColorTheme: "light",
      style: {
        color: "#000000",
      },
    }),
    [placeholder]
  )

  const scopedCss = `
    .jodit-editor-wrapper .jodit-container {
      border-radius: 0.5rem !important;
      border: 1px solid #e5e7eb !important;
      background-color: #ffffff !important;
      box-shadow: none !important;
      font-family: inherit !important;
      overflow: hidden !important;
    }
    .jodit-editor-wrapper .jodit-toolbar__box {
      background-color: #f9fafb !important;
      border-bottom: 1px solid #e5e7eb !important;
      padding: 4px 6px !important;
    }
    .jodit-editor-wrapper .jodit-toolbar-button__button {
      padding: 4px 6px !important;
      min-width: 28px !important;
      height: 28px !important;
      border-radius: 4px !important;
      color: #374151 !important;
      background: transparent !important;
      border: none !important;
      transition: background-color 0.15s ease !important;
    }
    .jodit-editor-wrapper .jodit-toolbar-button__button:hover {
      background-color: #e5e7eb !important;
      color: #111827 !important;
    }
    .jodit-editor-wrapper .jodit-toolbar-button_separator {
      height: 16px !important;
      margin: auto 4px !important;
      border-left: 1px solid #e5e7eb !important;
      width: 0 !important;
    }
    .jodit-editor-wrapper .jodit-placeholder {
      color: #9ca3af !important;
      font-size: 15px !important;
      padding: 16px 20px !important;
      font-family: inherit !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg {
      color: #000000 !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      font-size: 15px !important;
      line-height: 1.7 !important;
      padding: 16px 20px !important;
      min-height: 350px !important;
    }
    /* Headings H1 to H6 */
    .jodit-editor-wrapper .jodit-wysiwyg h1 {
      font-size: 2rem !important;
      font-weight: 800 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.75rem !important;
      color: #0f172a !important;
      line-height: 1.25 !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg h2 {
      font-size: 1.5rem !important;
      font-weight: 700 !important;
      margin-top: 1.25rem !important;
      margin-bottom: 0.5rem !important;
      color: #0f172a !important;
      line-height: 1.3 !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg h3 {
      font-size: 1.25rem !important;
      font-weight: 700 !important;
      margin-top: 1rem !important;
      margin-bottom: 0.5rem !important;
      color: #1e293b !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg h4 {
      font-size: 1.1rem !important;
      font-weight: 600 !important;
      margin-top: 0.75rem !important;
      margin-bottom: 0.35rem !important;
      color: #1e293b !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg h5,
    .jodit-editor-wrapper .jodit-wysiwyg h6 {
      font-size: 1rem !important;
      font-weight: 600 !important;
      margin-top: 0.5rem !important;
      margin-bottom: 0.25rem !important;
      color: #334155 !important;
    }
    /* Paragraphs */
    .jodit-editor-wrapper .jodit-wysiwyg p {
      margin-bottom: 1rem !important;
      color: #000000 !important;
    }
    /* Lists */
    .jodit-editor-wrapper .jodit-wysiwyg ul {
      list-style-type: disc !important;
      padding-left: 1.75rem !important;
      margin-top: 0.5rem !important;
      margin-bottom: 1rem !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg ol {
      list-style-type: decimal !important;
      padding-left: 1.75rem !important;
      margin-top: 0.5rem !important;
      margin-bottom: 1rem !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg li {
      margin-bottom: 0.35rem !important;
      color: #000000 !important;
    }
    /* Tables */
    .jodit-editor-wrapper .jodit-wysiwyg table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 1.25rem 0 !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg th,
    .jodit-editor-wrapper .jodit-wysiwyg td {
      border: 1px solid #cbd5e1 !important;
      padding: 8px 12px !important;
      text-align: left !important;
    }
    .jodit-editor-wrapper .jodit-wysiwyg th {
      background-color: #f1f5f9 !important;
      font-weight: 700 !important;
      color: #0f172a !important;
    }
    /* Blockquotes */
    .jodit-editor-wrapper .jodit-wysiwyg blockquote {
      border-left: 4px solid #1565C0 !important;
      padding: 0.75rem 1.25rem !important;
      margin: 1rem 0 !important;
      color: #334155 !important;
      font-style: italic !important;
      background: #f8fafc !important;
      border-radius: 0 0.5rem 0.5rem 0 !important;
    }
    /* Links */
    .jodit-editor-wrapper .jodit-wysiwyg a {
      color: #1565C0 !important;
      text-decoration: underline !important;
      font-weight: 500 !important;
    }
    /* Inline Images */
    .jodit-editor-wrapper .jodit-wysiwyg img {
      max-width: 100% !important;
      height: auto !important;
      border-radius: 0.5rem !important;
      margin: 1rem auto !important;
      display: block !important;
    }
  `

  return (
    <div className="jodit-editor-wrapper w-full font-inter">
      {/* 3. Scoped CSS for .jodit-wysiwyg styles */}
      <style dangerouslySetInnerHTML={{ __html: scopedCss }} />

      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
        onChange={() => {}}
      />
    </div>
  )
}

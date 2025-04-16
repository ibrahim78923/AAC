import { useEffect, useRef } from 'react';
import { Html } from 'react-konva-utils';
import Konva from 'konva';
import ClearIcon from '@mui/icons-material/Clear';

interface TextEditorProps {
  textNode: Konva.Text;
  onClose: () => void;
  onChange: (text: string) => void;
  onDelete: () => void;
}

const TextEditor = ({
  textNode,
  onClose,
  onChange,
  onDelete,
}: TextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const editorContainer = editorContainerRef.current;
    if (!textarea || !textNode || !editorContainer) return;

    const stage = textNode.getStage();
    if (!stage) return;

    // Get the PDF container element
    const pdfContainer = stage.container().closest('.react-pdf__Document');
    const containerRect = pdfContainer?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    // Position calculation - account for both PDF container and stage offsets
    const textPosition = textNode.getAbsolutePosition();
    const scale = stage.scaleX();

    const areaPosition = {
      x: containerRect.left + textPosition.x * scale + window.scrollX,
      y: containerRect.top + textPosition.y * scale + window.scrollY,
    };

    Object.assign(editorContainer.style, {
      position: 'fixed',
      left: `${areaPosition.x}px`,
      top: `${areaPosition.y}px`,
      zIndex: '1000',
      display: 'inline-block',
    });

    // Style application for the textarea
    Object.assign(textarea.style, {
      width: `${Math.max(50, textNode.width() * scale)}px`,
      minHeight: `${textNode.height() * scale}px`,
      fontSize: `${textNode.fontSize() * scale}px`,
      lineHeight: textNode.lineHeight(),
      fontFamily: textNode.fontFamily(),
      textAlign: textNode.align(),
      color: textNode.fill(),
      background: 'rgba(255,255,255,0.9)',
      border: '2px solid #4285f4',
      borderRadius: '4px',
      padding: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      outline: 'none',
      resize: 'none',
      overflow: 'hidden',
      verticalAlign: 'top',
      margin: 0,
    });

    // Initialize content
    textarea.value = textNode.text();

    // Event handlers
    const updateHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 8}px`;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onChange(textarea.value);
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!editorContainer.contains(e.target as Node)) {
        onChange(textarea.value);
        onClose();
      }
    };

    // Initial setup
    updateHeight();
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    // Add event listeners with cleanup
    const clickOutsideTimer = setTimeout(() => {
      window.addEventListener('mousedown', handleClickOutside);
    }, 10);

    textarea.addEventListener('input', updateHeight);
    textarea.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(clickOutsideTimer);
      window.removeEventListener('mousedown', handleClickOutside);
      textarea.removeEventListener('input', updateHeight);
      textarea.removeEventListener('keydown', handleKeyDown);
    };
  }, [textNode, onChange, onClose]);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
    onClose();
  };

  return (
    <Html>
      <div ref={editorContainerRef}>
        <textarea
          ref={textareaRef}
          style={{
            minHeight: '1em',
            display: 'inline-block',
          }}
        />
        <button
          onClick={handleDelete}
          // onMouseDown={(e) => e.stopPropagation()}
          style={{
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderLeft: 'none',
            borderRadius: '4px',
            padding: '0',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            verticalAlign: 'top',
            margin: 0,
            position: 'absolute',
            right: '0',
            top: '-20px',
            height: '20px',
            width: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ClearIcon sx={{ fontSize: '1rem' }} />
        </button>
      </div>
    </Html>
  );
};

export default TextEditor;

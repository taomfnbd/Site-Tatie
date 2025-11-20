import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  className?: string;
  allowHTML?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  element = 'div',
  className = '',
  allowHTML = false,
}) => {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editableRef.current) {
      const newValue = allowHTML
        ? editableRef.current.innerHTML
        : editableRef.current.innerText;
      if (newValue !== value) {
        onChange(newValue);
      }
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      if (editableRef.current) {
        if (allowHTML) {
          editableRef.current.innerHTML = value;
        } else {
          editableRef.current.innerText = value;
        }
      }
      editableRef.current?.blur();
    }
  };

  const Tag = element as keyof JSX.IntrinsicElements;

  if (!isEditMode) {
    return allowHTML ? (
      <Tag className={className} dangerouslySetInnerHTML={{ __html: value }} />
    ) : (
      <Tag className={className}>{value}</Tag>
    );
  }

  if (allowHTML) {
    return (
      <Tag
        ref={editableRef as any}
        className={`${className} ${isEditMode ? 'cursor-text hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 transition-all' : ''} ${isEditing ? 'outline outline-2 outline-blue-500 outline-offset-2 bg-blue-50/10' : ''}`}
        contentEditable={isEditMode}
        suppressContentEditableWarning
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: localValue }}
      />
    );
  }

  return (
    <Tag
      ref={editableRef as any}
      className={`${className} ${isEditMode ? 'cursor-text hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 transition-all' : ''} ${isEditing ? 'outline outline-2 outline-blue-500 outline-offset-2 bg-blue-50/10' : ''}`}
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    >
      {localValue}
    </Tag>
  );
};

export default EditableText;

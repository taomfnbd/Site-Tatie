import { cleanHTML } from "#content-sanitizer";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useEditMode } from "../../contexts/EditModeContext";
interface Props {
  value: string;
  onChange: (value: string) => void;
  element?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  className?: string;
  allowHTML?: boolean;
}
const useDOMEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
export default function EditableText({
  value,
  onChange,
  element = "span",
  className = "",
  allowHTML = false,
}: Props) {
  const { isEditMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const Tag: React.ElementType = element;
  // React never owns the editable children: a rerender cannot erase a keystroke.
  useDOMEffect(() => {
    const node = ref.current;
    if (!node || document.activeElement === node) return;
    if (allowHTML) node.innerHTML = cleanHTML(value);
    else node.textContent = value;
  }, [value, isEditMode, allowHTML]);
  const blur = () => {
    setEditing(false);
    const node = ref.current;
    if (!node) return;
    const next = allowHTML ? cleanHTML(node.innerHTML) : node.innerText;
    if (allowHTML) node.innerHTML = next;
    if (next !== value) onChange(next);
  };
  const paste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (!ref.current?.contains(range.commonAncestorContainer)) return;
    range.deleteContents();
    const text = document.createTextNode(
      event.clipboardData.getData("text/plain"),
    );
    range.insertNode(text);
    range.setStartAfter(text);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };
  if (!isEditMode)
    return allowHTML ? (
      <Tag
        className={className}
        dangerouslySetInnerHTML={{ __html: cleanHTML(value) }}
      />
    ) : (
      <Tag className={className}>{value}</Tag>
    );
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      contentEditable
      suppressContentEditableWarning
      className={`${className} cursor-text hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-offset-2 ${editing ? "outline outline-2 outline-blue-500 outline-offset-2 bg-blue-50/10" : ""}`}
      onFocus={() => setEditing(true)}
      onBlur={blur}
      onPaste={paste}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === "Escape" && ref.current) {
          if (allowHTML) ref.current.innerHTML = cleanHTML(value);
          else ref.current.textContent = value;
          ref.current.blur();
        }
      }}
    />
  );
}

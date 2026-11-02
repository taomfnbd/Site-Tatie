import React, { Suspense, lazy, useState } from "react";
import { useEditMode } from "../../contexts/EditModeContext";
import { imageSource, imageSet, portraitAvifSet } from "../../utils/media";
const ImageUploadModal = lazy(() => import("./ImageUploadModal"));
interface Props {
  src: string;
  alt: string;
  onChange: (src: string, alt?: string) => void;
  className?: string;
  priority?: boolean;
  sizes?: string;
}
export default function EditableImage({
  src,
  alt,
  onChange,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: Props) {
  const { isEditMode } = useEditMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className={`relative group ${className.includes("h-full") ? "h-full" : ""} ${className.includes("w-full") ? "w-full" : ""}`}
      >
        <picture className="block w-full h-full">
          {portraitAvifSet(src) && (
            <source
              type="image/avif"
              srcSet={portraitAvifSet(src)}
              sizes={sizes}
            />
          )}
          <img
            src={imageSource(src)}
            srcSet={imageSet(src)}
            sizes={imageSet(src) ? sizes : undefined}
            alt={alt}
            width={1200}
            height={1200}
            className={className}
            loading={priority ? "eager" : "lazy"}
            {...{ fetchpriority: priority ? "high" : "auto" }}
            decoding="async"
          />
        </picture>
        {isEditMode && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-3 right-3 rounded-lg bg-white px-4 py-3 text-stone-800 shadow-lg"
            aria-label={`Modifier l’image : ${alt}`}
          >
            Modifier l’image
          </button>
        )}
      </div>
      {isEditMode && isModalOpen && (
        <Suspense fallback={null}>
          <ImageUploadModal
            isOpen
            onClose={() => setIsModalOpen(false)}
            currentSrc={imageSource(src)}
            currentAlt={alt}
            onSave={onChange}
          />
        </Suspense>
      )}
    </>
  );
}

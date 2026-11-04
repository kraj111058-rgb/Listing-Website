"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { UploadCloud, Trash2, Plus } from "lucide-react";
import { FieldWrapper } from "@/components/common/field-wrapper";
import { cn } from "@/lib/utils";

export interface GalleryUploadProps {
  id?: string;
  value?: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  description?: string;
  className?: string;
  maxImages?: number;
  maxSizeMB?: number;
}

export function GalleryUpload({
  id = "gallery-upload",
  value = [],
  onChange,
  onBlur,
  error,
  disabled = false,
  label,
  required = false,
  description = "SVG, PNG, JPG or WEBP (max. 5MB per image)",
  className,
  maxImages = 5,
  maxSizeMB = 5,
}: GalleryUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = Array.isArray(value) ? value : [];
  const remainingSlots = Math.max(0, maxImages - images.length);

  const processFiles = (files: FileList | File[]) => {
    setUploadError(null);

    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    if (remainingSlots <= 0) {
      setUploadError(`Maximum ${maxImages} images allowed. Remove an image to add a new one.`);
      return;
    }

    const filesToUpload = fileArray.slice(0, remainingSlots);
    if (fileArray.length > remainingSlots) {
      setUploadError(`Only ${remainingSlots} more image(s) could be added (max ${maxImages}).`);
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const validFiles: File[] = [];

    for (const file of filesToUpload) {
      if (!file.type.startsWith("image/")) {
        setUploadError("Please upload valid image files only (PNG, JPG, WEBP, or SVG).");
        return;
      }
      if (file.size > maxSizeBytes) {
        setUploadError(`File "${file.name}" exceeds ${maxSizeMB}MB limit. Each image must be under ${maxSizeMB}MB.`);
        return;
      }
      validFiles.push(file);
    }

    // Read all valid files as base64 data URLs
    const readPromises = validFiles.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const res = e.target?.result as string;
            if (res) resolve(res);
            else reject(new Error("Empty result"));
          };
          reader.onerror = () => reject(new Error("Read failed"));
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readPromises)
      .then((newUrls) => {
        onChange([...images, ...newUrls]);
      })
      .catch(() => {
        setUploadError("Failed to read one or more selected images. Please try again.");
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && remainingSlots > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled || remainingSlots <= 0) return;

    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleTriggerUpload = () => {
    if (!disabled && remainingSlots > 0 && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadError(null);
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
    if (onBlur) onBlur();
  };

  const activeError = error || uploadError;

  return (
    <FieldWrapper
      id={id}
      label={
        label ? (
          <div className="flex items-center justify-between w-full">
            <span>{label}</span>
            <span className="text-xs font-semibold text-slate-400">
              {images.length} / {maxImages} uploaded
            </span>
          </div>
        ) : undefined
      }
      labelClassName="w-full"
      error={activeError || undefined}
      required={required}
      className={className}
    >
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        onChange={handleFileChange}
        onBlur={onBlur}
        disabled={disabled || remainingSlots === 0}
        className="hidden"
      />

      <div className="space-y-3">
        {images.length === 0 ? (
          /* Empty state: Clean dropzone */
          <div
            onClick={handleTriggerUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative flex flex-col items-center justify-center p-7 sm:p-9 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center group select-none",
              isDragging
                ? "border-indigo-600 bg-indigo-50/50 scale-[0.99]"
                : "border-slate-200 bg-slate-50/40 hover:bg-indigo-50/20 hover:border-indigo-400",
              activeError && "border-destructive bg-destructive/5 hover:border-destructive",
              disabled && "pointer-events-none opacity-60"
            )}
          >
            <div className="size-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:scale-110 group-hover:border-indigo-300 transition-all shadow-2xs mb-3">
              <UploadCloud className="size-6" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-800">
                <span className="text-indigo-600 group-hover:underline">Click to upload</span> or drag and drop
              </p>
              <p className="text-[11px] text-slate-500">
                {description} &bull; Up to {maxImages} photos
              </p>
            </div>
          </div>
        ) : (
          /* Images present: Cohesive square cards grid + Inline Add More tile */
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs transition-all hover:shadow-sm"
                >
                  <img
                    src={img}
                    alt={`Gallery photo ${idx + 1}`}
                    className="size-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />

                  {/* Subtle top vignette so badge and button are always crystal clear */}
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />

                  {/* Always-visible top action bar: Badge & Delete Button */}
                  <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold shadow-2xs">
                      #{idx + 1}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(idx);
                      }}
                      className="size-6.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                      title="Remove photo"
                      aria-label={`Remove photo ${idx + 1}`}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Inline "+ Add Photo" tile inside the grid if slots remaining */}
              {remainingSlots > 0 && (
                <div
                  onClick={handleTriggerUpload}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all select-none group",
                    isDragging
                      ? "border-indigo-600 bg-indigo-50/50 scale-[0.98]"
                      : "border-slate-200 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-400"
                  )}
                >
                  <div className="size-9 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:scale-110 group-hover:border-indigo-300 transition-all shadow-2xs mb-1.5">
                    <Plus className="size-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600">
                    Add Photo
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {remainingSlots} {remainingSlots === 1 ? "slot" : "slots"} left
                  </span>
                </div>
              )}
            </div>

            {/* Bottom info row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500 font-medium">
              <p>
                {remainingSlots > 0
                  ? `Tip: You can upload up to ${maxImages} images (${remainingSlots} slots remaining).`
                  : `All ${maxImages} photo slots filled. Click the trash icon on any photo to replace it.`}
              </p>
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onChange([]);
                    if (onBlur) onBlur();
                  }}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  Remove All
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}

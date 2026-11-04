"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/common/field-wrapper";
import { cn } from "@/lib/utils";

export interface ImageUploadProps {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  description?: string;
  className?: string;
  maxSizeMB?: number;
}

export function ImageUpload({
  id = "image-upload",
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  label,
  required = false,
  description = "SVG, PNG, JPG or WEBP (max. 5MB)",
  className,
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    setUploadError(null);

    // 1. Verify file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WEBP, or SVG)");
      return;
    }

    // 2. Verify file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError(`File size exceeds ${maxSizeMB}MB limit. Please upload an image under ${maxSizeMB}MB.`);
      return;
    }

    // 3. Read file as Base64 Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to read the selected file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
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
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleTriggerUpload = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setUploadError(null);
    onChange("");
    if (onBlur) onBlur();
  };

  const activeError = error || uploadError;

  return (
    <FieldWrapper
      id={id}
      label={label}
      error={activeError || undefined}
      required={required}
      className={className}
    >
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        onChange={handleFileChange}
        onBlur={onBlur}
        disabled={disabled}
        className="hidden"
      />

      {value ? (
        /* Preview container when image is uploaded */
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-2xs">
          <div className="relative size-24 sm:size-28 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-2xs group flex items-center justify-center">
            <img
              src={value}
              alt={label ? `${label} Preview` : "Uploaded Image Preview"}
              className="size-full object-cover transition-transform group-hover:scale-105 duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="size-3.5 text-indigo-600" /> Image Uploaded
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {label
                  ? `Preview of the uploaded ${label.toLowerCase()}.`
                  : "Preview of the uploaded image."}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleTriggerUpload}
                disabled={disabled}
                className="h-8 rounded-lg px-2.5 text-xs font-semibold gap-1.5 cursor-pointer shadow-2xs hover:bg-slate-100"
              >
                <RefreshCw className="size-3" /> Change Image
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
                className="h-8 rounded-lg px-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 gap-1.5 cursor-pointer"
              >
                <Trash2 className="size-3" /> Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Dropzone container when NO image is uploaded */
        <div
          onClick={handleTriggerUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center group select-none",
            isDragging
              ? "border-indigo-600 bg-indigo-50/50 scale-[0.99]"
              : "border-slate-200 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-400",
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
            <p className="text-[11px] text-slate-500">{description}</p>
          </div>
        </div>
      )}
    </FieldWrapper>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  MapPin,
} from "lucide-react";
import {
  InputWithLabel,
  SelectWithLabel,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { daysOfWeek, INDIAN_STATES, getCitiesByState } from "@/data";
import type { ListingWizardFormValues } from "@/schemas";
import Link from "next/link";

const cleanCoordinate = (val: string) => {
  const hasMinus = val.startsWith("-");
  let sanitized = val.replace(/[^0-9.]/g, "");
  const parts = sanitized.split(".");
  if (parts.length > 2) {
    sanitized = parts[0] + "." + parts.slice(1).join("");
  }
  return (hasMinus ? "-" : "") + sanitized;
};

export function Step2ContactLocation() {
  const { control, setValue } = useFormContext<ListingWizardFormValues>();

  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const currentState = useWatch({ control, name: "state" }) || "";
  const is24x7 = useWatch({ control, name: "is24x7" }) ?? false;
  const latitude = useWatch({ control, name: "latitude" }) || "";
  const longitude = useWatch({ control, name: "longitude" }) || "";

  const currentCities = useMemo(() => getCitiesByState(currentState), [currentState]);

  const hasValidCoordinates = useMemo(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);
    return (
      latitude.trim() !== "" &&
      longitude.trim() !== "" &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  }, [latitude, longitude]);

  const handleGetCurrentLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);

        setValue("latitude", lat, { shouldValidate: true, shouldDirty: true });
        setValue("longitude", lng, { shouldValidate: true, shouldDirty: true });

        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "Location permission was denied. Please allow location access or enter coordinates manually."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError(
            "Location information is unavailable. Please enter coordinates manually."
          );
        } else if (error.code === error.TIMEOUT) {
          setLocationError(
            "Location request timed out. Please try again or enter coordinates manually."
          );
        } else {
          setLocationError(
            "Unable to retrieve location. Please enter coordinates manually."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          Location & Contact
        </h3>
      </div>

      <div className="space-y-4">
        {/* State & City (2 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <SelectWithLabel
                id="biz-state"
                label="State"
                placeholder="Select State"
                value={field.value}
                onValueChange={(newState) => {
                  field.onChange(newState);
                  const cities = getCitiesByState(newState);
                  if (cities.length > 0) {
                    setValue("city", cities[0], {
                      shouldValidate: true,
                    });
                  } else {
                    setValue("city", "", { shouldValidate: true });
                  }
                }}
                options={INDIAN_STATES.map((st) => ({
                  value: st.name,
                  label: st.name,
                }))}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const options =
                field.value && !currentCities.includes(field.value)
                  ? [field.value, ...currentCities]
                  : currentCities;

              return (
                <SelectWithLabel
                  id="biz-city"
                  label="City"
                  placeholder="Select City"
                  value={field.value}
                  onValueChange={(city) => field.onChange(city)}
                  options={options.map((c) => ({ value: c, label: c }))}
                  error={error?.message}
                />
              );
            }}
          />
        </div>

        {/* Full Address */}
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-address"
              label="Full Address"
              placeholder="Shop/Office address"
              {...field}
              error={error?.message}
            />
          )}
        />

        {/* Pincode */}
        <Controller
          name="pincode"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-pincode"
              label="Pincode"
              maxLength={6}
              placeholder="e.g. 110001"
              {...field}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                field.onChange(value);
              }}
              error={error?.message}
            />
          )}
        />

        {/* Latitude & Longitude (Map Coordinates) */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <FieldLabel className="text-xs sm:text-sm font-bold text-slate-700 select-none block">
                Map Coordinates (GPS)
              </FieldLabel>
              <FieldDescription className="text-xs text-slate-500 mt-0.5">
                Enter latitude & longitude manually or auto-detect with your device.
              </FieldDescription>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isLocating}
              onClick={handleGetCurrentLocation}
              className="self-start sm:self-auto h-8 px-2.5 rounded-lg font-medium text-indigo-600 border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 hover:text-indigo-700 gap-1.5 cursor-pointer shrink-0 transition-colors"
            >
              {isLocating ? (
                <>
                  <Loader2 className="size-3.5 animate-spin text-indigo-600" />
                  <span>Detecting...</span>
                </>
              ) : (
                <>
                  <MapPin className="size-3.5 text-indigo-600" />
                  <span>Use Current Location</span>
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="latitude"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-latitude"
                  label="Latitude"
                  placeholder="e.g. 21.234440"
                  {...field}
                  onChange={(e) => field.onChange(cleanCoordinate(e.target.value))}
                  error={error?.message}
                />
              )}
            />

            <Controller
              name="longitude"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-longitude"
                  label="Longitude"
                  placeholder="e.g. 72.911747"
                  {...field}
                  onChange={(e) => field.onChange(cleanCoordinate(e.target.value))}
                  error={error?.message}
                />
              )}
            />
          </div>

          {/* Map Pin Verified Status Card */}
          {hasValidCoordinates && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 transition-all animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-emerald-900">Map Pin Set:</span>{" "}
                  <span className="font-mono text-emerald-800 font-medium">
                    {latitude}, {longitude}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Link
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200/90 shadow-2xs hover:shadow-xs transition-all w-fit cursor-pointer"
                >
                  <span>Verify on Google Maps</span>
                  <ExternalLink className="size-3 text-emerald-600" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setValue("latitude", "", { shouldValidate: true, shouldDirty: true });
                    setValue("longitude", "", { shouldValidate: true, shouldDirty: true });
                  }}
                  className="text-xs font-medium text-slate-500 hover:text-rose-600 px-2 py-1 transition-colors cursor-pointer hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {locationError && (
            <FieldError className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">{locationError}</FieldError>
          )}

          <p className="text-xs text-muted-foreground font-medium">
            <span className="text-foreground">Tip : </span> Right-click your business on Google Maps to copy coordinates, or click &ldquo;Use Current Location&rdquo; above.
          </p>
        </div>

        {/* Phone Number & Secondary Phone (2 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithLabel
                id="biz-phone"
                label="Phone Number"
                type="tel"
                placeholder="e.g. 98765 43210"
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="secondaryPhone"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithLabel
                id="biz-secondary-phone"
                label="Secondary Phone (optional)"
                type="tel"
                placeholder="e.g. 98765 43210"
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
                error={error?.message}
              />
            )}
          />
        </div>

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-email"
              label="Email"
              type="email"
              placeholder="business@email.com"
              {...field}
              error={error?.message}
            />
          )}
        />

        {/* Website */}
        <Controller
          name="website"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-website"
              label="Website (optional)"
              type="url"
              placeholder="https://yourbusiness.com"
              {...field}
              error={error?.message}
            />
          )}
        />

        {/* Business Hours - Toggle + Open/Close + Weekly Off */}
        <div className="pt-2 space-y-4">
          <FieldLabel className="text-xs sm:text-sm font-semibold">
            Business Timing & Hours
          </FieldLabel>

          {/* 24x7 Toggle */}
          <Controller
            name="is24x7"
            control={control}
            render={({ field }) => (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <FieldLabel
                    htmlFor="biz-24x7"
                    className="text-xs font-bold text-slate-900 cursor-pointer block"
                  >
                    Open 24 Hours / 7 Days a Week?
                  </FieldLabel>
                  <FieldDescription className="text-[11px] text-slate-500 leading-normal">
                    Ideal for hospitals, hotels, emergency services, or 24/7 pharmacies.
                  </FieldDescription>
                </div>
                <Switch
                  id="biz-24x7"
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  className="data-checked:bg-indigo-600 cursor-pointer"
                />
              </div>
            )}
          />

          {!is24x7 && (
            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  name="openTime"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputWithLabel
                      id="biz-opentime"
                      label="Daily Opening Time"
                      type="time"
                      {...field}
                      error={error?.message}
                    />
                  )}
                />

                <Controller
                  name="closeTime"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputWithLabel
                      id="biz-closetime"
                      label="Daily Closing Time"
                      type="time"
                      {...field}
                      error={error?.message}
                    />
                  )}
                />
              </div>

              {/* Weekly Off Days with Controller and FieldLabel */}
              <Controller
                name="closedDays"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const selectedDays: string[] = field.value || [];

                  const toggleDay = (day: string) => {
                    const next = selectedDays.includes(day)
                      ? selectedDays.filter((d) => d !== day)
                      : [...selectedDays, day];
                    field.onChange(next);
                  };

                  return (
                    <div className="space-y-2">
                      <FieldLabel className="text-xs sm:text-sm font-bold text-slate-700 select-none block">
                        Weekly Off Days (Closed Days)
                      </FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => {
                          const isOff = selectedDays.includes(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${isOff
                                  ? "bg-rose-50 border-rose-200 text-rose-700"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                              {day} {isOff && "(Closed)"}
                            </button>
                          );
                        })}
                      </div>
                      {error && <FieldError>{error.message}</FieldError>}
                    </div>
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

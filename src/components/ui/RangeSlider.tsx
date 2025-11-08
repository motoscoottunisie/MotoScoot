import React, { useEffect, useRef, useState } from 'react';
import noUiSlider, { API } from 'nouislider';
import 'nouislider/dist/nouislider.css';

interface RangeSliderProps {
  min: number;
  max: number;
  start: [number, number];
  onChange: (values: [number, number]) => void;
  step?: number;
  formatter?: (value: number) => string;
  label: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  start,
  onChange,
  step = 1,
  formatter = (value) => Math.round(value).toString(),
  label,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderInstance = useRef<API | null>(null);
  const [currentValues, setCurrentValues] = useState<[number, number]>(start);

  useEffect(() => {
    if (!sliderRef.current) return;

    if (sliderInstance.current) {
      sliderInstance.current.destroy();
    }

    sliderInstance.current = noUiSlider.create(sliderRef.current, {
      start: start,
      connect: true,
      range: {
        min: min,
        max: max,
      },
      step: step,
      tooltips: false,
    });

    sliderInstance.current.on('update', (values) => {
      const numericValues = values.map(v => Number(v)) as [number, number];
      setCurrentValues(numericValues);
    });

    sliderInstance.current.on('change', (values) => {
      const numericValues = values.map(v => Number(v)) as [number, number];
      onChange(numericValues);
    });

    return () => {
      if (sliderInstance.current) {
        sliderInstance.current.destroy();
        sliderInstance.current = null;
      }
    };
  }, [min, max, step]);

  useEffect(() => {
    if (sliderInstance.current) {
      sliderInstance.current.set(start);
    }
  }, [start]);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-4">
        {label}
      </label>
      <div
        ref={sliderRef}
        className="range-slider mb-4"
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">Min</label>
          <input
            type="text"
            readOnly
            value={formatter(currentValues[0])}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">Max</label>
          <input
            type="text"
            readOnly
            value={formatter(currentValues[1])}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
          />
        </div>
      </div>
      <style>{`
        .range-slider {
          height: 6px;
          margin: 0;
        }
        .noUi-target {
          background: #e5e7eb;
          border-radius: 9999px;
          border: none;
          box-shadow: none;
          height: 6px;
        }
        .noUi-connects {
          border-radius: 9999px;
        }
        .noUi-connect {
          background: #ea580c;
          border-radius: 9999px;
        }
        .noUi-horizontal {
          height: 6px;
        }
        .noUi-handle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          background: white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          top: -9px;
          right: -12px;
        }
        .noUi-handle:before,
        .noUi-handle:after {
          display: none;
        }
        .noUi-handle:focus {
          outline: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        .noUi-horizontal .noUi-handle {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;

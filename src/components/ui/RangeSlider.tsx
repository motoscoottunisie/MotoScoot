import React, { useEffect, useRef } from 'react';
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
      tooltips: [
        {
          to: formatter,
          from: (value) => Number(value),
        },
        {
          to: formatter,
          from: (value) => Number(value),
        },
      ],
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
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {label}: {formatter(start[0])} - {formatter(start[1])}
      </label>
      <div
        ref={sliderRef}
        className="range-slider"
      />
      <style>{`
        .range-slider {
          height: 8px;
          margin: 20px 0 30px 0;
        }
        .noUi-target {
          background: #f3f4f6;
          border-radius: 9999px;
          border: none;
          box-shadow: none;
        }
        .noUi-connect {
          background: #ea580c;
        }
        .noUi-handle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 4px solid #ea580c;
          background: white;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          cursor: pointer;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .noUi-handle:before,
        .noUi-handle:after {
          display: none;
        }
        .noUi-tooltip {
          background: white;
          border: 1px solid #e5e7eb;
          color: #1f2937;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 6px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        .noUi-horizontal .noUi-handle {
          right: -10px;
        }
        .noUi-horizontal .noUi-tooltip {
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;

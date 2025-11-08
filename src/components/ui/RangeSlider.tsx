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
          margin: 50px 10px 20px 10px;
        }
        .noUi-target {
          background: #e5e7eb;
          border-radius: 9999px;
          border: none;
          box-shadow: none;
          height: 8px;
        }
        .noUi-connects {
          border-radius: 9999px;
          overflow: visible;
        }
        .noUi-connect {
          background: #ea580c;
          border-radius: 9999px;
        }
        .noUi-horizontal {
          height: 8px;
        }
        .noUi-handle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 5px solid #ea580c;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          top: 50%;
          right: -20px;
        }
        .noUi-handle:before,
        .noUi-handle:after {
          display: none;
        }
        .noUi-handle:focus {
          outline: none;
        }
        .noUi-horizontal .noUi-handle {
          width: 40px;
          height: 40px;
          top: -16px;
        }
        .noUi-tooltip {
          background: white;
          border: 1px solid #e5e7eb;
          color: #1f2937;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          bottom: 150%;
          white-space: nowrap;
        }
        .noUi-horizontal .noUi-tooltip {
          transform: translate(-50%, 0);
          left: 50%;
        }
        .noUi-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid white;
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;

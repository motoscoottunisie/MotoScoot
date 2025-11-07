import { Check } from 'lucide-react';

interface CheckboxPillProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function CheckboxPill({ label, checked, onChange }: CheckboxPillProps) {
  return (
    <label
      className="inline-flex items-center rounded-lg border-2 text-sm font-medium cursor-pointer transition-all duration-150 hover:shadow-sm px-3 py-2 gap-2"
      style={{
        backgroundColor: checked ? '#FFF8F1' : 'white',
        borderColor: checked ? '#ea580c' : '#e5e7eb',
        color: '#111827'
      }}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 appearance-none border-2 cursor-pointer transition-all duration-150"
          style={{
            borderColor: checked ? '#ea580c' : '#d1d5db',
            backgroundColor: checked ? '#ea580c' : 'white',
            borderRadius: '0.65px'
          }}
        />
        {checked && (
          <Check
            className="absolute text-white pointer-events-none"
            style={{ width: '0.75rem', height: '0.75rem' }}
            strokeWidth={3}
          />
        )}
      </div>
      <span className="leading-snug select-none">{label}</span>
    </label>
  );
}
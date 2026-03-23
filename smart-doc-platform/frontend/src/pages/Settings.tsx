import { useState } from 'react';

const sections = [
  {
    id: 'model',
    icon: 'memory',
    label: 'Model & AI',
    settings: [
      { label: 'Default Model', type: 'select', options: ['Local FLAN-T5 XL', 'Local LLaMA 3.2', 'Gemma 3 (On-Device)'], value: 'Local FLAN-T5 XL' },
      { label: 'Max Token Limit', type: 'input', value: '8192' },
      { label: 'Temperature / Creativity', type: 'slider', value: 0.7, min: 0, max: 1, step: 0.1 },
      { label: 'Always run in isolated mode', type: 'toggle', value: true },
    ],
  },
  {
    id: 'editor',
    icon: 'edit_document',
    label: 'Editor Preferences',
    settings: [
      { label: 'Default Document Type', type: 'select', options: ['College Report', 'README', 'Research Paper', 'Grant Proposal'], value: 'Research Paper' },
      { label: 'Default Tone', type: 'select', options: ['Formal', 'Neutral', 'Technical'], value: 'Technical' },
      { label: 'Auto-save drafts', type: 'toggle', value: true },
      { label: 'Spell-check on generation', type: 'toggle', value: false },
    ],
  },
  {
    id: 'notifications',
    icon: 'notifications',
    label: 'Notifications',
    settings: [
      { label: 'Notify on generation complete', type: 'toggle', value: true },
      { label: 'Notify on file upload errors', type: 'toggle', value: true },
      { label: 'Weekly digest emails', type: 'toggle', value: false },
    ],
  },
  {
    id: 'privacy',
    icon: 'lock',
    label: 'Privacy & Security',
    settings: [
      { label: 'Send anonymous usage data', type: 'toggle', value: false },
      { label: 'Local-only processing (never use cloud)', type: 'toggle', value: true },
      { label: 'Clear all local data', type: 'button', buttonLabel: 'Clear Cache' },
    ],
  },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('model');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Always run in isolated mode': true,
    'Auto-save drafts': true,
    'Spell-check on generation': false,
    'Notify on generation complete': true,
    'Notify on file upload errors': true,
    'Weekly digest emails': false,
    'Send anonymous usage data': false,
    'Local-only processing (never use cloud)': true,
  });

  const current = sections.find(s => s.id === activeSection)!;

  return (
    <div className="flex-1 flex overflow-hidden bg-surface">
      {/* Settings Sidebar */}
      <nav className="w-56 shrink-0 border-r border-outline-variant/10 bg-surface-container-low p-4 flex flex-col gap-1">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-outline px-3 mb-4 mt-2">Preferences</h2>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-all duration-150 ${activeSection === section.id ? 'bg-surface-container-lowest text-primary shadow-sm ring-1 ring-inset ring-outline-variant/10' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </nav>

      {/* Settings Content */}
      <main className="flex-1 overflow-y-auto p-10 no-scrollbar">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">{current.icon}</span>
            </div>
            <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-background">{current.label}</h1>
          </div>

          <div className="space-y-4">
            {current.settings.map((setting) => (
              <div key={setting.label} className="bg-surface-container-lowest rounded-xl p-5 ring-1 ring-inset ring-outline-variant/10 flex items-center justify-between gap-6">
                <div>
                  <p className="font-medium text-sm text-on-surface">{setting.label}</p>
                </div>
                <div className="shrink-0">
                  {setting.type === 'toggle' && (
                    <button
                      className={`w-12 h-6 rounded-full relative transition-colors ${toggles[setting.label] ? 'bg-primary' : 'bg-surface-container-highest ring-1 ring-inset ring-outline-variant/30'}`}
                      onClick={() => setToggles(t => ({ ...t, [setting.label]: !t[setting.label] }))}
                    >
                      <div className={`absolute top-[2px] w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${toggles[setting.label] ? 'right-[2px] bg-on-primary' : 'left-[2px] bg-outline-variant'}`}></div>
                    </button>
                  )}
                  {setting.type === 'select' && (
                    <select className="bg-surface-container text-sm text-on-surface rounded-lg px-3 py-2 ring-1 ring-inset ring-outline-variant/20 outline-none focus:ring-primary/30 transition-all">
                      {setting.options?.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  )}
                  {setting.type === 'input' && (
                    <input defaultValue={setting.value as string} className="bg-surface-container text-sm text-on-surface rounded-lg px-3 py-2 ring-1 ring-inset ring-outline-variant/20 outline-none focus:ring-primary/30 transition-all w-28 text-right font-mono" />
                  )}
                  {setting.type === 'slider' && (
                    <div className="flex items-center gap-3">
                      <input type="range" min={(setting.min ?? 0) * 100} max={(setting.max ?? 1) * 100} step={1} defaultValue={(setting.value as number) * 100} className="w-32 accent-primary" />
                      <span className="text-sm font-mono w-8 text-right text-on-surface-variant">{setting.value}</span>
                    </div>
                  )}
                  {setting.type === 'button' && (
                    <button className="px-4 py-2 text-sm font-semibold text-error bg-error-container/30 hover:bg-error-container/50 rounded-lg transition-colors">
                      {setting.buttonLabel}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button className="bg-studio-gradient text-on-primary px-8 py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition-all">
              Save Preferences
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Line-icon set. Single 24x24 grid, 1.6 stroke, round caps: one drawing
   system so icons read as a family rather than a pile of downloads. */

const P = {
  /* --- intelligence --- */
  chip: '<rect x="4.5" y="4.5" width="15" height="15" rx="2.5"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2.5v2M15 2.5v2M9 19.5v2M15 19.5v2M2.5 9h2M2.5 15h2M19.5 9h2M19.5 15h2"/>',
  model: '<circle cx="12" cy="6" r="2.6"/><circle cx="5.5" cy="17.5" r="2.6"/><circle cx="18.5" cy="17.5" r="2.6"/><path d="M10.2 7.9 7.3 15.1M13.8 7.9l2.9 7.2M8.1 17.5h7.8"/>',
  agent: '<path d="M12 3v3"/><rect x="4" y="6" width="16" height="11" rx="3"/><path d="M9 11v1.5M15 11v1.5M9.5 21h5"/><path d="M12 17v4"/>',
  graph: '<path d="M3 20V4"/><path d="M3 20h18"/><path d="m6.5 15.5 4-4.5 3.5 3 5-6.5"/>',
  vision: '<path d="M2.5 12s3.6-6.5 9.5-6.5S21.5 12 21.5 12s-3.6 6.5-9.5 6.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m14.8 9.2-1.6 4.6-4.6 1.6 1.6-4.6z"/>',
  /* --- autonomy / physical --- */
  drone: '<path d="M8.5 8.5h7v7h-7z"/><path d="m8.5 8.5-3-3M15.5 8.5l3-3M8.5 15.5l-3 3M15.5 15.5l3 3"/><circle cx="4.2" cy="4.2" r="2.2"/><circle cx="19.8" cy="4.2" r="2.2"/><circle cx="4.2" cy="19.8" r="2.2"/><circle cx="19.8" cy="19.8" r="2.2"/>',
  robot: '<path d="M12 2.5v3"/><rect x="3.5" y="5.5" width="17" height="12" rx="3"/><circle cx="8.75" cy="11.5" r="1.15"/><circle cx="15.25" cy="11.5" r="1.15"/><path d="M2 10.5v4M22 10.5v4M8 21.5h8M9.5 17.5v4M14.5 17.5v4"/>',
  vehicle: '<path d="M3 13.5 5.3 7a2 2 0 0 1 1.9-1.3h9.6A2 2 0 0 1 18.7 7L21 13.5"/><path d="M3 13.5h18v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M6.5 16h.01M17.5 16h.01"/>',
  radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12 18.4 5.6"/><circle cx="12" cy="12" r="1"/>',
  /* --- environments / city --- */
  city: '<path d="M3 21V9.5l6-3.5v4l6-3.5V11l6-3v13z"/><path d="M7 21v-3.5M12 21v-3.5M17 21v-3.5"/>',
  grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
  bolt: '<path d="M13.5 2.5 4.5 13.8h6.3L10.5 21.5l9-11.3h-6.3z"/>',
  leaf: '<path d="M4 20c0-8 5-13 16-14 0 10-5.5 15-11 15a5 5 0 0 1-5-1Z"/><path d="M4 20c3-6 6-8.5 10.5-11"/>',
  route: '<circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="5.5" r="2.5"/><path d="M8 18.5h6.5a4 4 0 0 0 0-8h-5a4 4 0 0 1 0-8H16"/>',
  /* --- platform / trust --- */
  layers: '<path d="M12 2.8 2.6 7.3 12 11.8l9.4-4.5z"/><path d="m2.6 12.4 9.4 4.5 9.4-4.5"/><path d="m2.6 17.2 9.4 4.5 9.4-4.5"/>',
  shield: '<path d="M12 2.6 4 5.6v6c0 5 3.4 8.4 8 9.8 4.6-1.4 8-4.8 8-9.8v-6z"/><path d="m9 12 2.2 2.2L15.2 10"/>',
  lock: '<rect x="4.5" y="10" width="15" height="10.5" rx="2.5"/><path d="M8 10V7.2a4 4 0 0 1 8 0V10"/><path d="M12 14v3"/>',
  key: '<circle cx="8" cy="12" r="4.2"/><path d="M12.2 12H21M18 12v3.2M15.2 12v2.4"/>',
  eye: '<path d="M12 4v3M12 17v3M4 12h3M17 12h3"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="1"/>',
  server: '<rect x="3" y="4" width="18" height="6.5" rx="2"/><rect x="3" y="13.5" width="18" height="6.5" rx="2"/><path d="M7 7.25h.01M7 16.75h.01M11 7.25h3M11 16.75h3"/>',
  cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 9.6a4.45 4.45 0 0 1-.6 8.9z"/>',
  api: '<path d="M9.5 3.5 6 7l3.5 3.5M14.5 13.5 18 17l-3.5 3.5"/><path d="M6 7h6.5a5 5 0 0 1 5 5v0M18 17h-6.5a5 5 0 0 1-5-5v0"/>',
  flow: '<rect x="3" y="3" width="6.5" height="5.5" rx="1.5"/><rect x="14.5" y="15.5" width="6.5" height="5.5" rx="1.5"/><path d="M6.25 8.5v5.75a2 2 0 0 0 2 2h6.25"/><path d="M12.5 14.25 14.5 16.25 12.5 18.25"/>',
  /* --- sector --- */
  health: '<path d="M20.2 5.6a5 5 0 0 0-7.1 0L12 6.7l-1.1-1.1a5 5 0 1 0-7.1 7.1l7.4 7.4a1.1 1.1 0 0 0 1.6 0l7.4-7.4a5 5 0 0 0 0-7.1Z"/><path d="M4.6 12.4h3.5l1.4-2.3 2 4 1.5-2.5h4.4"/>',
  factory: '<path d="M3 21V10l5.5 3.5V10L14 13.5V7l7 3.5V21z"/><path d="M3 21h18"/><path d="M7 17.5h.01M12 17.5h.01M17 17.5h.01"/>',
  package: '<path d="m12 2.7 8.5 4.4v9.8L12 21.3 3.5 16.9V7.1z"/><path d="M3.7 7.2 12 11.6l8.3-4.4M12 11.6v9.7"/>',
  plane: '<path d="M10.5 2.8a1.5 1.5 0 0 1 3 0V9l7.5 4.4v2.3L13.5 13v4.4l2.5 1.9v1.9L12 20l-4 1.2v-1.9l2.5-1.9V13L3 15.7v-2.3L10.5 9z"/>',
  building: '<rect x="4" y="2.8" width="16" height="18.4" rx="2"/><path d="M8.5 7h2M13.5 7h2M8.5 11h2M13.5 11h2M8.5 15h2M13.5 15h2M10 21.2v-3h4v3"/>',
  people: '<circle cx="9" cy="8" r="3.4"/><path d="M2.8 20.5a6.2 6.2 0 0 1 12.4 0"/><path d="M16.5 5.1a3.4 3.4 0 0 1 0 5.8M17.6 14.9a6.2 6.2 0 0 1 3.6 5.6"/>',
  /* --- utility --- */
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  spark: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5"/><path d="m6.4 6.4 3 3M14.6 14.6l3 3M17.6 6.4l-3 3M9.4 14.6l-3 3"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  pin: '<path d="M19 10.2c0 5.2-7 11-7 11s-7-5.8-7-11a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.4 2"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

export function icon(name, cls = "") {
  const d = P[name];
  if (!d) throw new Error(`icon(): unknown icon "${name}"`);
  return `<svg class="ico${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
}

export const iconNames = Object.keys(P);

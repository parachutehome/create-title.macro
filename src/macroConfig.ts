interface MacroConfig {
  /** defaults to `src` */
  rootDir: string;
  /** defaults to `false` */
  removeDupeTitle: boolean;
}

const defaultConfig: MacroConfig = {
  rootDir: "src",
  removeDupeTitle: false,
};

const state: { config: MacroConfig } = {
  config: { ...defaultConfig },
};

export function getMacroConfig(): MacroConfig {
  return state.config;
}

export function setMacroConfig(value: Partial<MacroConfig>): void {
  state.config = { ...state.config, ...value };
}

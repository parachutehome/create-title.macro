export interface MacroConfig {
  /** This is the root directory where you're storybook components live and is stripped from the generated title. Defaults to "src" */
  rootDir: string;
  /** Control whether or not to remove a duplicate title for generated titles if the parent folder and filename are the same. Defaults to `false` */
  removeDupeTitle: boolean;
  /** The list of subextensions you used to denote a storybook which is stripped from the generated title. Defaults to [".stories", ".story"] */
  subExtensions: string[] ;
}

export const defaultConfig: MacroConfig = {
  rootDir: "src",
  removeDupeTitle: false,
  subExtensions: [".stories", ".story"],
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

export interface IStepConfig {
  [key: string]: IStep;
}

export type IStep =
  | IRunCommand
  | IWait
  | IWriteToFile
  | IModifyFile
  | ICompareToFile
  | ICheckIfBalanceIsZero
  | IExtractDataToEnv
  | IClickButtonByText
  | IVisitURL
  | IFindText
  | IConnectToDapp
  | IConfirmTransaction
  | ISwitchNetwork
  | ISelectOption
  | IFillInput;

export interface IRunCommand {
  action: 'runCommand';
  // the directory where it should run the command
  commandFolder?: string;
  // what to name the project folder (only used for npx hardhat init)
  projectFolder?: string;
  // add something before the command
  preCommand?: string;
  // how long to wait after running the command
  waitTime?: number;
  // use this command instead of copying from the page
  useSetCommand?: string;
  // if the command has prompts, pass them here
  // ex: 'text in prompt 1:answer1|text in prompt 2:answer2'
  prompts?: string;
  // save the output of a command to a given filepath
  saveOutput?: string;
  // check if the output of a command contains a given string
  checkForOutput?: string;
  // if the command is expected to fail, pass at least part of the error message here
  expectError?: string;
  // replace a string in the command with another string
  // ex: "<0x_YOUR_ADDRESS>:0x123"
  // replaces "<0x_YOUR_ADDRESS>" with "0x123"
  replaceString?: string;
}

export interface IWait {
  action: 'wait';
  timeout: number;
}

export interface IWriteToFile {
  action: 'writeToFile';
  filepath: string;
  addSpacesAfter?: boolean;
  useSetData?: string;
}

export type IntArray = number[];
export type RangeArray = [number, '-->', number];
export type RangeOrIntArray = IntArray | RangeArray;

export interface IModifyFile {
  action: 'modifyFile';
  filepath: string;
  addSpacesBefore?: number;
  addSpacesAfter?: number;
  atLine?: number;
  removeLines?: RangeOrIntArray;
  useSetData?: string;
  getContractId?: string;
}

export interface ICompareToFile {
  action: 'compareToFile';
  filepath: string;
}

export interface ICheckIfBalanceIsZero {
  action: 'checkIfBalanceIsZero';
  networkUrl: string;
  address: string;
}

// the regex to match the data
export type RegexData = { regex: RegExp };
// the yaml variable to match the data
// use '.' to separate nested objects like 'contract.address'
export type YamlData = { yaml: string; isHexValue?: boolean };
export type Selector = RegexData | YamlData;

export interface IExtractDataToEnv {
  action: 'extractDataToEnv';
  // the file where the data is stored
  dataFilepath: string;
  // the filepath for the .env file to modify
  envFilepath: string;
  // the name of the env variable to store the data
  variableName: string;
  // the selector for the data
  selector: Selector;
}

export interface IClickButtonByText {
  action: 'clickButtonByText';
  buttonText: string;
}

export interface IVisitURL {
  action: 'visitURL';
  url: string;
}

export interface IFindText {
  action: 'findText';
  text: string;
}

export interface IConnectToDapp {
  action: 'connectToDapp';
  account?: string;
}

export interface IConfirmTransaction {
  action: 'confirmTransaction';
}

export interface ISwitchNetwork {
  action: 'switchNetwork';
  networkName?: string;
}

export interface ISelectOption {
  action: 'selectOption';
  index: number;
}

export interface IFillInput {
  action: 'fillInput';
  text: string;
}

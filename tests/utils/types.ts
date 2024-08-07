export interface IStepConfig {
  [key: string]: IStep;
}

export type IStep = IRunCommand | IWait | IWriteToFile | IModifyFile | ICompareToFile | ICheckIfBalanceIsZero;

export interface IRunCommand {
  action: 'runCommand';
  commandFolder?: string;
  projectFolder?: string;
  preCommand?: string;
  useSetCommand?: string;
  prompts?: string;
}

export interface IWait {
  action: 'wait';
  timeout: number;
}

export interface IWriteToFile {
  action: 'writeToFile';
  filepath: string;
}

export interface IModifyFile {
  action: 'modifyFile';
  filepath: string;
  addSpacesBefore?: number;
  addSpacesAfter?: number;
  atLine?: number;
  removeLines?: number[];
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

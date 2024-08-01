export type Details = {
  dataName: string;
  label: string;
  canCopy: boolean;
  customInstance?: (value: any) => JSX.Element;
  formatInput?: (input: string) => string;
  formatOutput?: (output: string) => string;
};

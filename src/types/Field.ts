export type Field = {
  label: string;
  dbName: string;
  type?: "text" | "checkbox";
  required: boolean;
  flexWidth?: string;
  formatInput?: (input: string) => string;
  formatOutput?: (output: string) => string;
};

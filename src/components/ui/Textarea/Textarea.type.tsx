export type TextareaProps = {
  rows: number;
  placeholder: string;
  value: string;
  onChange: (e: React.FormEvent<EventTarget>) => void;
};

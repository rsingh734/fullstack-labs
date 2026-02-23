import { useState } from "react";

export function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setValue(e.target.value);
  }

  function validate(
    validator: (value: string) => { ok: boolean; messages: string[] }
  ) {
    const result = validator(value);
    setMessages(result.messages);
    return result;
  }

  function clearMessages() {
    setMessages([]);
  }

  return {
    value,
    setValue,
    onChange,
    messages,
    setMessages,
    validate,
    clearMessages,
  };
}
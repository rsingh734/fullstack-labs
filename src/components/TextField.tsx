type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  messages: string[];
  placeholder?: string;
};

export default function TextField({ label, value, onChange, messages, placeholder }: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder} />
      {messages.map((m, i) => (
        <div key={i} style={{ color: "red" }}>{m}</div>
      ))}
    </div>
  );
}
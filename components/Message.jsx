export default function Message({ user, text, time }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <strong>{user}</strong> <span>({time})</span>
      <p>{text}</p>
    </div>
  );
}

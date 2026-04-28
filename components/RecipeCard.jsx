export default function RecipeCard({ text }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>
    </div>
  )
}

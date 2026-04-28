import './globals.css'

export const metadata = {
  title: 'Nutrition Planner Web App',
  description: 'AI-powered smart diet and health assistant'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

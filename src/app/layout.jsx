import "./globals.css";

export const metadata = {
  title: "Universal JSON Formatter - Professional API Testing Tool",
  description: "Advanced API testing and JSON formatting tool with headers, authentication, and request body support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <main className="flex-grow flex items-start justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  );
}

import PasswordGenerator from "@/components/PasswordGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <main className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-center">
          Password Vault
        </h1>
        <PasswordGenerator />
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { FaCopy, FaCheck, FaRedo, FaLock, FaUnlock, FaHashtag, FaAsterisk } from 'react-icons/fa';

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 7);
  };

  useEffect(() => {
    if (generatedPassword) {
      setStrength(calculateStrength(generatedPassword));
    }
  }, [generatedPassword]);

  const generatePassword = () => {
    let chars = '';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') {
      setGeneratedPassword('Please select at least one option');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (generatedPassword && generatedPassword !== 'Please select at least one option') {
      try {
        await navigator.clipboard.writeText(generatedPassword);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    if (strength <= 6) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Fair';
    if (strength <= 6) return 'Good';
    return 'Strong';
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white flex items-center justify-center gap-2">
        <FaLock className="text-blue-600" />
        Password Generator
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Password Length: <span className="text-blue-600 font-bold">{length}</span>
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
          aria-label="Password Length"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>8</span>
          <span>32</span>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <FaUnlock className="mr-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Uppercase Letters (A-Z)</span>
        </label>
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <FaLock className="mr-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Lowercase Letters (a-z)</span>
        </label>
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <FaHashtag className="mr-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Numbers (0-9)</span>
        </label>
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <FaAsterisk className="mr-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Symbols (!@#$%...)</span>
        </label>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={generatePassword}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <FaLock className="inline mr-2" />
          Generate Password
        </button>
        {generatedPassword && generatedPassword !== 'Please select at least one option' && (
          <button
            onClick={generatePassword}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            title="Regenerate"
          >
            <FaRedo />
          </button>
        )}
      </div>

      {generatedPassword && (
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Generated Password
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={generatedPassword}
              readOnly
              className="flex-1 p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white font-mono text-sm shadow-inner"
              aria-label="Generated Password"
            />
            <button
              onClick={copyToClipboard}
              className={`p-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${
                copied
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-500 hover:bg-gray-600'
              } text-white`}
              title={copied ? 'Copied!' : 'Copy to Clipboard'}
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          {generatedPassword !== 'Please select at least one option' && (
            <div className="mt-4">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-700 dark:text-gray-300">Strength:</span>
                <span className={`font-bold ${getStrengthColor().replace('bg-', 'text-').replace('-500', '-600')}`}>
                  {getStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getStrengthColor()}`}
                  style={{ width: `${(strength / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

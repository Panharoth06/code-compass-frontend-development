"use client";

import { useState } from "react";

interface LanguageSelectorProps {
  languages: string[];
  onChange: (lang: string) => void;
}

export default function LanguageSelector({
  languages,
  onChange,
}: LanguageSelectorProps) {
  const [selected, setSelected] = useState(languages[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="px-3 py-1 rounded-md border dark:bg-gray-900 dark:border-gray-700"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}

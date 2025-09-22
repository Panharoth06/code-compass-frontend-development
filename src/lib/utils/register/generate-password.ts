export function generateRandomPassword(): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "#?!@$%^&*-";

  // Ensure at least one of each required character
  let password = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    lowercase[Math.floor(Math.random() * lowercase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ].join("");

  // Fill the rest to meet 8 characters
  const allChars = lowercase + uppercase + numbers + symbols;
  for (let i = password.length; i < 8; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to avoid the fixed pattern
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
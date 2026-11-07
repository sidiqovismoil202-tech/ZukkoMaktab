/**
 * Cryptographic hashing for user and admin passwords
 * Ensures passwords are never stored in plain text in localStorage
 */

export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`zukko_salt_${plainText}_2026`);
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback below
    }
  }

  // Pure JS fallback hashing
  let hash = 0;
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `h_${Math.abs(hash).toString(16)}_${plainText.length}`;
}

export async function verifyPassword(plainText: string, storedHash: string): Promise<boolean> {
  const computed = await hashPassword(plainText);
  return computed === storedHash;
}

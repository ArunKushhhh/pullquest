import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto"

const ALGORITHM = "aes-256-gcm"
const IV_LENGTH = 12 // 96-bit IV recommended for GCM
const KEY_LENGTH = 32 // 256-bit key for AES-256

// Derived key is cached at module level to avoid repeated expensive scrypt operations
let cachedKey: Buffer | null = null

function getEncryptionKey(): Buffer {
    if (cachedKey) return cachedKey

    const secret = process.env.PAT_ENCRYPTION_KEY
    if (!secret) {
        throw new Error("PAT_ENCRYPTION_KEY environment variable is not set")
    }
    // Use a required salt for key derivation; must be set via PAT_ENCRYPTION_SALT
    const salt = process.env.PAT_ENCRYPTION_SALT
    if (!salt) {
        throw new Error("PAT_ENCRYPTION_SALT environment variable is not set")
    }
    cachedKey = scryptSync(secret, salt, KEY_LENGTH)
    return cachedKey
}

export function encryptPat(plaintext: string): string {
    const key = getEncryptionKey()
    const iv = randomBytes(IV_LENGTH)
    const cipher = createCipheriv(ALGORITHM, key, iv)

    const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
    const authTag = cipher.getAuthTag()

    // Format: base64(iv).base64(authTag).base64(ciphertext)
    return `${iv.toString("base64")}.${authTag.toString("base64")}.${encrypted.toString("base64")}`
}

export function decryptPat(ciphertext: string): string {
    const key = getEncryptionKey()
    const parts = ciphertext.split(".")

    if (parts.length !== 3) {
        throw new Error(
            "Invalid encrypted PAT format: expected base64(iv).base64(authTag).base64(ciphertext)"
        )
    }

    const [ivBase64, authTagBase64, encryptedBase64] = parts
    const iv = Buffer.from(ivBase64, "base64")
    const authTag = Buffer.from(authTagBase64, "base64")
    const encrypted = Buffer.from(encryptedBase64, "base64")

    if (iv.length !== IV_LENGTH) {
        throw new Error(
            `Invalid encrypted PAT format: IV must be ${IV_LENGTH} bytes, got ${iv.length}`
        )
    }

    // GCM auth tag length must be between 4 and 16 bytes; encryptPat uses the default 16 bytes.
    if (authTag.length !== 16) {
        throw new Error(
            `Invalid encrypted PAT format: auth tag must be 16 bytes, got ${authTag.length}`
        )
    }
    const decipher = createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8")
}

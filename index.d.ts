/**
 * Options for the kill function
 */
export interface KillOptions {
  /**
   * If true, suppresses console output
   * @default false
   */
  silent?: boolean;
}

/**
 * Kill process(es) using the specified port
 * 
 * @param port - The port number to kill processes on (can be string or number)
 * @param options - Optional configuration
 * @returns Promise that resolves when process(es) are killed
 * @throws Error if the platform is not supported
 * 
 * @example
 * ```ts
 * import { kill } from 'kill-port-bun'
 * 
 * // Kill process on port 3000
 * await kill(3000)
 * 
 * // Kill process on port 8080 (string)
 * await kill('8080')
 * 
 * // Kill process silently
 * await kill(5173, { silent: true })
 * ```
 */
export function kill(port: string | number, options?: KillOptions): Promise<void>;


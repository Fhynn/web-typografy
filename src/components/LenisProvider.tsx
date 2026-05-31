import { useLenis } from '../hooks/useLenis'

/** Mounts inside BrowserRouter so useLocation works. */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis()
  return <>{children}</>
}

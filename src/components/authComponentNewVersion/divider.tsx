export function GlowingDivider() {
  return (
    <div className="relative flex items-center py-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent opacity-50"></div>
      <span className="px-4 text-xs font-mono uppercase tracking-wider text-white/90">or register with email</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent opacity-50"></div>
    </div>
  )
}

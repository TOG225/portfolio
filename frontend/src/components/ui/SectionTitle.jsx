export default function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-8 bg-accent rounded-full flex-shrink-0" />
        <h2 className="text-3xl font-bold text-primary">{children}</h2>
      </div>
      {subtitle && (
        <p className="text-grey-text ml-4">{subtitle}</p>
      )}
    </div>
  )
}

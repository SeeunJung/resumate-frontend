function BrandSection() {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{
        background: `radial-gradient(circle at top left, var(--brand--blue) 0%, transparent 30%), radial-gradient(circle at bottom right, var(--brand--green) 0%, transparent 30%), white`,
      }}
    >
      <div className="flex flex-col justify-center items-center z-10">
        <img
          src="/login_logo.png"
          alt="Resumate Logo"
          className="flex w-35 h-auto"
        />
      </div>
    </div>
  )
}

export default BrandSection

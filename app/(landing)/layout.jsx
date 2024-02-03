import { Navbar } from "./_components/navbar";

const LandingLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}

export default LandingLayout;
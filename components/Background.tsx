import Image from "next/image";
import WheelOfTimeBG from "../public/wheel_of_time.jpg"

type LayoutProps = {
  children?: React.ReactNode;
};


const Background = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-screen bg-cover bg-right-top relative bg-black overflow-hidden" style={{backgroundImage: `url(${WheelOfTimeBG.src})`}}>
      {children}
    </div>
  );
};

export default Background;

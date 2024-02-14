// detail.tsx
import React from "react";

interface IpMacPairCardProps {
    ip: string;
    mac: string;
    vendor: string;
    OS: string;
}

const Detail: React.FC<IpMacPairCardProps> = ({ ip, mac, vendor, OS }) => {
  return (
    <div className="m-2 w-1/6 p-4 bg-gradient-to-r from-indigo-700 to-sky-700 rounded-lg shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
      <div className="text-white">
        <p className="text-center">IP: {ip}</p>
        <p className="text-center">MAC: {mac}</p>
        <p className="text-center">Vendor: {vendor}</p>
        <p className="text-center">OS: {OS}</p>
      </div>
    </div>
  );
};

export default Detail;
import React from "react";
import IUser from "../types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="flex flex-col justify-center w-fit mt-10 items-center border-4 rounded-lg border-spacing-2 border-gray-700 ">
      <div className="flex flex-row bg-white-100 rounded-lg p-4">
        <Avatar>
          <AvatarImage src={user?.picture.large} alt="User Profile" />
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-10 ">
          <h2 className="text-xl font-bold ">
            {user?.name.title} {user?.name.first} {user?.name.last}
          </h2>
          <div className="flex flex-row items-center px-2 mt-2">
            <FaLocationDot />
            <p className="text-gray-900">{user?.location.country}</p>
          </div>
        </div>
      </div>
      <div className="flex-row bg-white w-full rounded-b-lg">
        <div className="flex flex-row items-center px-2">
          <MdEmail />
          <p className="text-gray-700 p-2">{user.email}</p>
        </div>
        <div className="flex flex-row items-center px-2">
          <FaPhoneAlt />
          <p className="text-gray-800 p-2">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

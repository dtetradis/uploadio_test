import React from "react";
import IUser from "../types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <Avatar>
        <AvatarImage src={user?.picture.large} alt="User Profile" />
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold mb-2 mt-8">
        {user?.name.title} {user?.name.first} {user?.name.last}
      </h2>
      <p className="text-gray-900 mb-4">{user?.location.country}</p>
      <p className="text-gray-700 mb-2">{user.email}</p>
      <p className="text-gray-500">{user.phone}</p>
    </div>
  );
};

export default Profile;

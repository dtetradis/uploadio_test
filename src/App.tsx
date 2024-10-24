import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./components/profile";
import IUser from "./types/user";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "male",
    label: "male",
    icon: ArrowUpCircle,
  },
  {
    value: "female",
    label: "female",
    icon: CheckCircle2,
  },
  {
    value: "",
    label: "choose gender",
    icon: XCircle,
  },
];

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  // const [selectedGender, setSelectedGender] = useState("");
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState<Status | null>(
    null
  );

  const fetchUser = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/user${
          selectedGender?.value ? `?gender=${selectedGender?.value}` : ""
        }`
      );
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-x-4 gap-2 p-4">
      <h2 className="text-6xl mb-8 font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600  bg-gray-100 tracking-wide">
        Uplodio Gender Test
      </h2>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="w-[150px] justify-start"
          >
            {selectedGender ? (
              <>
                <selectedGender.icon className="mr-2 h-14 w-14 shrink-0" />
                {selectedGender.label}
              </>
            ) : (
              <>Choose a gender</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            {/* <CommandInput placeholder="Change status..." /> */}
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedGender(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedGender?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        variant="default"
        size="lg"
        className="w-[150px] justify-start"
        onClick={fetchUser}
      >
        Fetch User
      </Button>

      <div className="min-w-96 min-h-64">
        {loading ? (
          <div className="p-6 m-10 text-center">Loading...</div>
        ) : (
          user && <Profile user={user} />
        )}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";

// Import FontAwesomeIcon and specific icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const ConnectedAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: 1,
      name: "Google",
      connected: true,
      icon: faGoogle,
      color: "#DB4437",
    },
    {
      id: 2,
      name: "Facebook",
      connected: false,
      icon: faFacebook,
      color: "#4267B2",
    },
    {
      id: 3,
      name: "X",
      connected: true,
      icon: faXTwitter,
    },
  ]);

  return (
    <SettingSection icon={HelpCircle} title={"Connected Accounts"}>
      {connectedAccounts.map((account) => (
        <div key={account.id} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={account.icon}
              className={`w-5 h-5 mr-1 transition duration-200 ${
                account.connected ? "opacity-100" : "opacity-50"
              }`}
              style={{ color: account.color }}
            />
            <span className="text-gray-300">{account.name}</span>
          </div>
          <button
            className={`px-3 py-1 rounded text-sm ${
              account.connected
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            } transition duration-200`}
            onClick={() =>
              setConnectedAccounts(
                connectedAccounts.map((acc) =>
                  acc.id === account.id
                    ? { ...acc, connected: !acc.connected }
                    : acc
                )
              )
            }
          >
            {account.connected ? "Connected" : "Connect"}
          </button>
        </div>
      ))}
      <button className="mt-4 flex items-center text-indigo-400 hover:text-indigo-300 transition duration-200">
        <Plus size={18} className="mr-2" /> Add Account
      </button>
    </SettingSection>
  );
};

export default ConnectedAccounts;

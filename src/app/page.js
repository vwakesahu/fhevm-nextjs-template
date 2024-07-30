"use client";
import Login from "@/components/login";
import { Input } from "@/components/ui/input";
import { getInstance } from "@/utils/fhEVM";
import { toHexString } from "@/utils/utils";
import { usePrivy } from "@privy-io/react-auth";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const groups = [
  {
    controlId: "uint8",
    inputLabel: "uint8",
    outputLabel: "ciphertext",
    encryptFn: (instance) => instance.encrypt8,
  },
  {
    controlId: "uint16",
    inputLabel: "uint16",
    outputLabel: "ciphertext",
    encryptFn: (instance) => instance.encrypt16,
  },
  {
    controlId: "uint32",
    inputLabel: "uint32",
    outputLabel: "ciphertext",
    encryptFn: (instance) => instance.encrypt32,
  },
];

const GroupInput = ({ group, fhEVM }) => {
  const { controlId, inputLabel, outputLabel, encryptFn } = group;
  const [value, setValue] = useState(0);
  const [encryptedValue, setEncryptedValue] = useState("");

  useEffect(() => {
    if (fhEVM) {
      setEncryptedValue("0x" + toHexString(encryptFn(fhEVM)(Number(value))));
    }
  }, [value, fhEVM, encryptFn]);

  return (
    <div className="flex flex-col mb-4">
      <div className="mb-4">
        <label
          htmlFor={`${controlId}-input`}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {inputLabel}
        </label>
        <Input
          id={`${controlId}-input`}
          placeholder={`Input ${inputLabel}`}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor={`${controlId}-output`}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {outputLabel}
        </label>
        <div className="flex items-center gap-2">
          <Input
            id={`${controlId}-output`}
            type="text"
            value={encryptedValue}
            readOnly
            className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
          <CopyIcon
            className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400"
            onClick={() => {
              try {
                navigator.clipboard.writeText(encryptedValue);
                toast.success("Copied to clipboard");
              } catch (error) {
                console.log(error);
                toast.error("Error copying to clipboard");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { authenticated } = usePrivy();
  const [fhEVM, setFhEVM] = useState(null);

  useEffect(() => {
    const getFHEVMInstance = async () => {
      const fhevmInstance = await getInstance();
      setFhEVM(fhevmInstance);
      console.log("instanceCreated");
    };
    getFHEVMInstance();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  p-16">
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-between bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://www.inco.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* By{" "} */}
          <Image
            src="/next.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
      {authenticated ? (
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-x-20 lg:max-w-5xl mt-20">
          {groups.map((group) => (
            <GroupInput key={group.controlId} group={group} fhEVM={fhEVM} />
          ))}
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
}

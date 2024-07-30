"use client";
import { Input } from "@/components/ui/input";
import { getInstance } from "@/utils/fhEVM";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [encryptedValue, setEncryptedValue] = useState("");
  const [value, setValue] = useState(0);
  const [fhEVM, setFhEVM] = useState(null);
  const getFHEVMInstance = async () => {
    const fhevmInstance = await getInstance();
    return fhevmInstance;
  };

  useEffect(() => {
    getFHEVMInstance().then((instance) => {
      setFhEVM(instance);
      console.log("instanceCreated");
    });
  }, []);

  useEffect(() => {
    if (fhEVM) {
      console.log(fhEVM.encrypt32(Number(value)));
      setEncryptedValue(fhEVM.encrypt32(Number(value)));
    }
  }, [value, fhEVM]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          fhEVM&nbsp;
          <code className="font-mono font-bold">template</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
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
      </div>

      <div className="">
        {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}

        <Input
          placeholder="Input should be number"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex gap-8 mt-4">
          <p className="max-w-44">
            {encryptedValue && encryptedValue.slice(0, 10) + "..."}
          </p>
          <CopyIcon
          className="w-3"
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

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://docs.inco.org/inco-protocol/fhevm"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about fhEVM.
          </p>
        </a>
      </div>
    </main>
  );
}

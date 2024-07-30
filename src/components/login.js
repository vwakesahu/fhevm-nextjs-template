import { usePrivy } from "@privy-io/react-auth";

export default function Login() {
  const { login } = usePrivy();

  return (
    <div className="relative flex flex-col items-center justify-center p-3.5 mt-48">
      <main className="flex flex-col items-center gap-y-3.5">
        <div
          onClick={login}
          className="group cursor-pointer flex items-center text-primary font-semibold gap-[0.5ch] underline-offset-4 hover:underline"
        >
          Connect Wallet
        </div>
      </main>
    </div>
  );
}

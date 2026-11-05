import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/supporters")({
  beforeLoad: () => {
    throw redirect({ to: "/members", hash: "supporters" });
  },
});

// app/output/page.tsx

'use client'; // Marks this file as a Client Component

import dynamic from "next/dynamic";

// Dynamically import BirthdayWish without SSR
const BirthdayWish = dynamic(() => import("@/components/birthday-wish"), { ssr: false });

export default function Page() {
  return <BirthdayWish />;
}

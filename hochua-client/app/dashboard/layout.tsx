'use client';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <section className="">
      <Button
        className="font-semibold"
        type="button"
        variant="ghost"
        onClick={() => router.push('/')}
      >
        <ArrowBigLeft /> Home
      </Button>
      <div className="">{children}</div>
    </section>
  );
}

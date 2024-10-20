'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function NavButtons() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button type="button" onClick={() => router.push('dashboard/thongso')}>
        Thong so cong trinh
      </Button>
      <Button type="button" onClick={() => router.push('dashboard/vanhanh')}>
        Van hanh ho chua
      </Button>
      <Button type="button" onClick={() => router.push('dashboard/bieudo')}>
        Bieu do dieu phoi
      </Button>
      <Button type="button" onClick={() => router.push('dashboard/dactinh')}>
        Dac tinh long ho
      </Button>
      <Button type="button" onClick={() => router.push('/1')}>
        1 mo 2 dong
      </Button>
      <Button type="button" onClick={() => router.push('/dashboard')}>
        1 mo 2 mo
      </Button>
    </div>
  );
}

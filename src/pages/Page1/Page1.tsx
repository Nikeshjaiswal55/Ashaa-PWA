
import Meta from '@/components/Meta';
import { Button } from '@/components/ui/button';

function Page1() {
  return (
    <>
      <Meta title="page 1" />
      <div className="flex flex-col items-center justify-center min-h-svh">
      <Button variant="destructive">Button</Button>
      </div>
      
    </>
  );
}

export default Page1;

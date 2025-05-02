import { MailIcon, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { email, messages } from '@/config';
import resetApp from '@/utils/reset-app';

function AppErrorBoundaryFallback() {
  return (
    <div className="h-[400px] flex items-center justify-center">
      <Card className="p-6 w-full max-w-md text-center">
        <CardHeader>
          <h3 className="text-xl font-semibold">{messages.app.crash.title}</h3>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button
            variant="outline"
            asChild
          >
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <MailIcon className="w-4 h-4" />
              {messages.app.crash.options.email}
            </a>
          </Button>

          <span className="text-sm text-muted-foreground">or</span>

          <Button variant="outline" onClick={resetApp}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            {messages.app.crash.options.reset}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AppErrorBoundaryFallback;

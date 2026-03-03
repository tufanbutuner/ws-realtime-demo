import { useXrpPrice } from '@/hooks/useXrpPrice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const statusConfig = {
  connecting: { label: 'Connecting', variant: 'secondary' as const },
  connected: { label: 'Live', variant: 'default' as const },
  disconnected: { label: 'Disconnected', variant: 'secondary' as const },
  error: { label: 'Error', variant: 'destructive' as const },
}

function App() {
  const { price, status, lastUpdated } = useXrpPrice()
  const { label, variant } = statusConfig[status]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">XRP / GBP</CardTitle>
          <Badge variant={variant}>{label}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold tracking-tight">
            {price !== null ? (
              <>
                <span className="text-muted-foreground text-2xl mr-1">£</span>
                {price.toFixed(4)}
              </>
            ) : (
              <span className="text-muted-foreground text-2xl">—</span>
            )}
          </div>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-2">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App

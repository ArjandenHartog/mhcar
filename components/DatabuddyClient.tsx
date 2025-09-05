'use client'

import { Databuddy } from '@databuddy/sdk'

export default function DatabuddyClient() {
  return (
    <Databuddy
      clientId="Oa2ENomqxL08jUGYhRAdE"
      trackHashChanges={true}
      trackAttributes={true}
      trackOutgoingLinks={true}
      trackInteractions={true}
      trackEngagement={true}
      trackScrollDepth={true}
      trackExitIntent={true}
      trackBounceRate={true}
      trackWebVitals={true}
      trackErrors={true}
      enableBatching={true}
    />
  )
}



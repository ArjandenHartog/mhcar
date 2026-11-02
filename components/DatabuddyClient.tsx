'use client'

import { Databuddy } from '@databuddy/sdk/react'

export default function DatabuddyClient() {
  return (
    <Databuddy
      clientId="Oa2ENomqxL08jUGYhRAdE"
      trackHashChanges={true}
      trackAttributes={true}
      trackOutgoingLinks={true}
      trackInteractions={true}
      trackWebVitals={true}
      trackErrors={true}
      enableBatching={true}
    />
  )
}

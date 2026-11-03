import React from 'react'

/**
 * Renders a JSON-LD script tag. Mirrors the escaping used in the root layout
 * (< → \u003c) so the payload can never terminate the script early.
 */
export const JsonLd: React.FC<{ data: Record<string, unknown> }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
)
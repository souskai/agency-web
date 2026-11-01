'use client'

import { Button, Modal, TextInput, toast, useModal } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import type { ChangeEvent } from 'react'

const MODAL_SLUG = 'invite-user'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  margin: '0 0 6px',
}

const selectStyle: React.CSSProperties = {
  background: 'var(--theme-elevation-100)',
  border: '1px solid var(--theme-elevation-300)',
  borderRadius: 6,
  color: 'var(--theme-text)',
  fontSize: 14,
  padding: '8px 10px',
  width: '100%',
}

/**
 * "Invite user" action on the Users list view. Creates the account without a
 * password via POST /api/users/invite so the invitee sets their own password
 * through the emailed 3-day reset link.
 */
export const InviteUserButton: React.FC = () => {
  const { openModal, closeModal, isModalOpen } = useModal()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('viewer')
  const [submitting, setSubmitting] = useState(false)

  const invite = async () => {
    if (!email.trim()) {
      toast.error('Email is required')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/users/invite', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), roles: [role] }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        email?: string
        error?: string
        errors?: Array<{ message?: string }>
      }

      if (!res.ok) {
        toast.error(data.error ?? data.errors?.[0]?.message ?? 'Failed to send invitation')
        return
      }

      toast.success(`Invitation sent to ${data.email ?? email.trim()}`)
      setEmail('')
      setName('')
      setRole('viewer')
      closeModal(MODAL_SLUG)
      router.refresh()
    } catch {
      toast.error('Failed to send invitation')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button buttonStyle="secondary" onClick={() => openModal(MODAL_SLUG)} size="medium">
        Invite user
      </Button>

      {isModalOpen(MODAL_SLUG) && (
        <Modal
          closeOnBlur={false}
          htmlElement="div"
          slug={MODAL_SLUG}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.65)',
            padding: 16,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              padding: 24,
              background: 'var(--theme-elevation-50)',
              color: 'var(--theme-text)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 12,
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
            }}
          >
            <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 600 }}>
              Invite a user
            </h2>

            <div style={{ marginBottom: 16 }}>
              <TextInput
                label="Email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                path="email"
                required
                value={email}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <TextInput
                label="Name (optional)"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                path="name"
                value={name}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label htmlFor="invite-role" style={labelStyle}>
                Role
              </label>
              <select
                id="invite-role"
                onChange={(e) => setRole(e.target.value)}
                style={selectStyle}
                value={role}
              >
                <option value="viewer">Viewer — read-only</option>
                <option value="editor">Editor — manage content</option>
                <option value="publisher">Publisher — draft content</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 24 }}>
              <Button
                buttonStyle="secondary"
                disabled={submitting}
                onClick={() => closeModal(MODAL_SLUG)}
                size="medium"
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={submitting} onClick={invite} size="medium">
                {submitting ? 'Sending…' : 'Send invite'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
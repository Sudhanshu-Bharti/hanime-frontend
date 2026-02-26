"use client"
import { PageLayout } from "@/components/shared/PageLayout"

export default function CopyrightPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Copyright & DMCA</h1>
        <p className="text-sm text-gray-400 mt-2">Last updated: February 23, 2026</p>

        <div className="mt-8 space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Our Policy</h2>
            <p>
              We respect the intellectual property rights of others and expect users to do the same.
              If you believe your copyrighted work has been posted without authorization, please submit
              a takedown request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Takedown Request Requirements</h2>
            <p>
              Please include the following in your request: your full name, contact information,
              identification of the copyrighted work, the URL(s) of the allegedly infringing content,
              a statement of good‑faith belief, and a statement under penalty of perjury that your notice
              is accurate and you are authorized to act.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Counter‑Notification</h2>
            <p>
              If you believe content was removed in error, you may submit a counter‑notification with
              details required by applicable law. We will review and respond as appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Repeat Infringers</h2>
            <p>
              We may terminate accounts or access for repeat infringers where appropriate.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}

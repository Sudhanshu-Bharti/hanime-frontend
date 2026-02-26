"use client"
import { PageLayout } from "@/components/shared/PageLayout"

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mt-2">Last updated: February 23, 2026</p>

        <div className="mt-8 space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
            <p>
              We may collect basic usage data such as pages viewed, device type, and approximate location
              for analytics and performance monitoring. We do not sell personal data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Cookies & Analytics</h2>
            <p>
              We use cookies or similar technologies to improve functionality and analyze traffic.
              You can disable cookies in your browser settings, but some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Third‑Party Services</h2>
            <p>
              We may use third‑party services (e.g., analytics providers) that collect information under
              their own policies. We encourage you to review those policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Data Retention</h2>
            <p>
              We retain data only as long as necessary for legitimate business or legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Your Choices</h2>
            <p>
              You can request access, correction, or deletion of personal information where applicable
              by contacting us using the information provided on this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Contact</h2>
            <p>
              For privacy questions, contact the site owner via the contact methods listed on the footer.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}

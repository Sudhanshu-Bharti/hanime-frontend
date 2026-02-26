"use client"
import { PageLayout } from "@/components/shared/PageLayout"

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Terms of Service</h1>
        <p className="text-sm text-gray-400 mt-2">Last updated: February 23, 2026</p>

        <div className="mt-8 space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Hanime Hub, you agree to these Terms of Service and our Privacy Policy.
              If you do not agree, you must not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Eligibility</h2>
            <p>
              This service is intended for adults only. You must be at least 18 years old to access the site.
              By using the service, you represent and warrant that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Account & Usage</h2>
            <p>
              You agree not to misuse the service, interfere with its security, or access it in a way that
              violates applicable laws. Automated scraping, abuse of rate limits, or attempts to bypass
              access controls are prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Content & Licensing</h2>
            <p>
              Content displayed on the site is provided by third-party sources. We do not claim ownership
              over third‑party content unless explicitly stated. All trademarks, service marks, and logos
              are the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. DMCA / Copyright</h2>
            <p>
              If you believe content on this site infringes your rights, please review our Copyright page
              for instructions on submitting a takedown request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Disclaimer</h2>
            <p>
              The service is provided "as is" without warranties of any kind. We do not guarantee
              uninterrupted or error‑free access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the service after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}

import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="text-gray-600">
        We collect personal data when you use our services, including:
      </p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Name, email, phone number, and payment details.</li>
        <li>Travel and booking information.</li>
        <li>Technical data such as IP address and browser type.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">
        2. How We Use Your Information
      </h2>
      <p className="text-gray-600">We use your information to:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Provide and improve our services.</li>
        <li>Process payments and transactions.</li>
        <li>Enhance security and prevent fraud.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. Legal Compliance</h2>
      <p className="text-gray-600">GoBag complies with global privacy laws:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>
          <strong>GDPR (EU)</strong>: You have the right to access, modify, or
          delete your data.
        </li>
        <li>
          <strong>CCPA (California)</strong>: You may request to opt out of data
          collection.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Data Protection</h2>
      <p className="text-gray-600">
        We implement security measures such as encryption and secure storage to
        protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Third-Party Sharing</h2>
      <p className="text-gray-600">
        We do not sell your personal information. We may share data with:
      </p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Trusted partners for payment processing.</li>
        <li>Legal authorities if required by law.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">6. Your Rights</h2>
      <p className="text-gray-600">You can:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Request a copy of your data.</li>
        <li>Ask us to delete or modify your data.</li>
        <li>Opt out of marketing emails.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">7. Policy Updates</h2>
      <p className="text-gray-600">
        We may update this policy. Continued use of GoBag after updates means
        you accept the changes.
      </p>

      <p className="text-gray-600 mt-6">
        If you have any questions, contact us at{" "}
        <a href="mailto:support@gobag.com" className="text-blue-500">
          support@gobag.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;

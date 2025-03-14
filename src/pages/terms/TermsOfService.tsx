import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-600 mb-4">
        Welcome to GoBag! By accessing or using our services, you agree to
        comply with these Terms of Service. Please read them carefully before
        using our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
      <p className="text-gray-600">
        By accessing or using GoBag, you acknowledge that you have read,
        understood, and agreed to these Terms. If you do not agree, please
        refrain from using our services.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. User Eligibility</h2>
      <p className="text-gray-600">
        You must be at least **18 years old** to use GoBag. If you are using our
        services on behalf of an organization, you represent that you have the
        authority to bind the organization to these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. User Responsibilities</h2>
      <p className="text-gray-600">You agree to:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Provide accurate and truthful information.</li>
        <li>Not engage in any fraudulent, abusive, or unlawful activities.</li>
        <li>Maintain the confidentiality of your account credentials.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Prohibited Activities</h2>
      <p className="text-gray-600">You may not use GoBag for:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Transporting illegal or prohibited items.</li>
        <li>Engaging in harassment, abuse, or threats.</li>
        <li>Violating any international transport regulations.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">
        5. Compliance with International Laws
      </h2>
      <p className="text-gray-600">
        GoBag operates in compliance with international laws, including:
      </p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>
          <strong>General Data Protection Regulation (GDPR)</strong> –
          Protecting EU users' data rights.
        </li>
        <li>
          <strong>California Consumer Privacy Act (CCPA)</strong> – Granting
          data rights to California residents.
        </li>
        <li>
          <strong>International Transport and Customs Laws</strong> – Ensuring
          legal transportation of goods across borders.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">6. Termination of Service</h2>
      <p className="text-gray-600">
        We reserve the right to suspend or terminate your access to GoBag at any
        time for violations of these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6">7. Changes to Terms</h2>
      <p className="text-gray-600">
        We may update these Terms from time to time. Continued use of GoBag
        after updates constitutes your acceptance.
      </p>

      <p className="text-gray-600 mt-6">
        For any questions, contact us at{" "}
        <a href="mailto:support@gobag.com" className="text-blue-500">
          support@gobag.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfService;

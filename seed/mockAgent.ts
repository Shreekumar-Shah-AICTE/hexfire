import type { AgentStep } from '../server/types';

export const CUSTOMER_SUPPORT_PIPELINE: AgentStep[] = [
  {
    id: 'support-step-1',
    name: 'Receive & Parse Complaint',
    type: 'llm_call',
    input: 'Customer email: "My order #4521 has been delayed for 2 weeks. I want a refund now!"',
    expectedOutput: JSON.stringify({ complaint_type: "delivery_delay", order_id: "4521", sentiment: "frustrated" }),
    dependencies: []
  },
  {
    id: 'support-step-2',
    name: 'Classify Severity',
    type: 'llm_call',
    input: 'Classify complaint severity based on parsed parameters and order history.',
    expectedOutput: JSON.stringify({ severity: "high", escalation_needed: true }),
    dependencies: ['support-step-1']
  },
  {
    id: 'support-step-3',
    name: 'Query Warehouse Tool',
    type: 'tool_call',
    input: 'Query stock/shipping log DB for order_id: "4521"',
    expectedOutput: JSON.stringify({ tracking_status: "in_transit", location: "Depot-B", est_delivery: "3_days" }),
    dependencies: ['support-step-2']
  },
  {
    id: 'support-step-4',
    name: 'Generate Refund Option',
    type: 'decision',
    input: 'Evaluate refund eligibility under delay policy (delay > 10 days).',
    expectedOutput: JSON.stringify({ eligible: true, refund_limit_usd: 150 }),
    dependencies: ['support-step-3']
  },
  {
    id: 'support-step-5',
    name: 'Draft Compensation Email',
    type: 'llm_call',
    input: 'Draft customer response offering refund or expedited delivery choice.',
    expectedOutput: "Dear Valued Customer, We sincerely apologize for the delay. We can offer a full refund of $150 or guarantee delivery within 3 days...",
    dependencies: ['support-step-4']
  },
  {
    id: 'support-step-6',
    name: 'Dispatch Email Output',
    type: 'output',
    input: 'Send drafted message to SMTP relay endpoint.',
    expectedOutput: JSON.stringify({ sent: true, recipient: "customer@domain.com" }),
    dependencies: ['support-step-5']
  }
];

export const INVOICE_PROCESSING_PIPELINE: AgentStep[] = [
  {
    id: 'invoice-step-1',
    name: 'OCR Invoice PDF',
    type: 'tool_call',
    input: 'Parse invoice doc image for text extraction.',
    expectedOutput: "INVOICE #INV-9821 Vendor: Acme Corp. Subtotal: $1,200. Tax: $96. Total: $1,296. Due: 30 days.",
    dependencies: []
  },
  {
    id: 'invoice-step-2',
    name: 'Extract line items',
    type: 'llm_call',
    input: 'Convert raw OCR text block into structured JSON list of line items.',
    expectedOutput: JSON.stringify({ vendor: "Acme Corp", total: 1296, tax: 96, invoice_id: "INV-9821" }),
    dependencies: ['invoice-step-1']
  },
  {
    id: 'invoice-step-3',
    name: 'Validate Against PO',
    type: 'tool_call',
    input: 'Compare PO table to Acme Corp invoice_id: "INV-9821" matching $1,296',
    expectedOutput: JSON.stringify({ po_matched: true, discrepancy_detected: false }),
    dependencies: ['invoice-step-2']
  },
  {
    id: 'invoice-step-4',
    name: 'Approve Payment Tier',
    type: 'decision',
    input: 'Determine approval tier: Total ($1,296) > $1,000 threshold requires Manager approval.',
    expectedOutput: JSON.stringify({ approved: true, tier: "manager_override" }),
    dependencies: ['invoice-step-3']
  },
  {
    id: 'invoice-step-5',
    name: 'Queue bank transaction',
    type: 'output',
    input: 'Push payment instruction payload to corporate bank routing gateway.',
    expectedOutput: JSON.stringify({ transaction_status: "queued", bank_ref: "TXN-887122" }),
    dependencies: ['invoice-step-4']
  }
];

export const EMPLOYEE_ONBOARDING_PIPELINE: AgentStep[] = [
  {
    id: 'onboarding-step-1',
    name: 'Parse Resume Metadata',
    type: 'llm_call',
    input: 'Parse resume details: "Shree Shah, Software Architect, starting June 1st."',
    expectedOutput: JSON.stringify({ name: "Shree Shah", role: "Software Architect", start_date: "2026-06-01" }),
    dependencies: []
  },
  {
    id: 'onboarding-step-2',
    name: 'Provision LDAP Account',
    type: 'tool_call',
    input: 'Create active directory account for user "sshah"',
    expectedOutput: JSON.stringify({ account_created: true, username: "sshah", email: "sshah@enterprise.com" }),
    dependencies: ['onboarding-step-1']
  },
  {
    id: 'onboarding-step-3',
    name: 'Generate Contract PDF',
    type: 'tool_call',
    input: 'Compile template contract with name: "Shree Shah" and role: "Software Architect"',
    expectedOutput: "[PDF ByteStream Contract: Shree Shah]",
    dependencies: ['onboarding-step-1']
  },
  {
    id: 'onboarding-step-4',
    name: 'Request E-Signature',
    type: 'output',
    input: 'Send docu-sign payload containing generated PDF to sshah@enterprise.com',
    expectedOutput: JSON.stringify({ envelope_id: "env-44122", status: "sent" }),
    dependencies: ['onboarding-step-2', 'onboarding-step-3']
  },
  {
    id: 'onboarding-step-5',
    name: 'Verify signature state',
    type: 'tool_call',
    input: 'Poll docu-sign status for envelope: "env-44122"',
    expectedOutput: JSON.stringify({ status: "signed", signed_at: "2026-05-19" }),
    dependencies: ['onboarding-step-4']
  },
  {
    id: 'onboarding-step-6',
    name: 'Assign standard training',
    type: 'llm_call',
    input: 'Select mandatory compliance and role training modules based on role: "Software Architect"',
    expectedOutput: JSON.stringify({ modules: ["secure_coding", "ip_protection", "data_privacy"] }),
    dependencies: ['onboarding-step-5']
  },
  {
    id: 'onboarding-step-7',
    name: 'Log audit transaction',
    type: 'output',
    input: 'Write onboarding log bundle to system log store',
    expectedOutput: JSON.stringify({ logged: true, db_ref: "ONB-88219" }),
    dependencies: ['onboarding-step-6']
  }
];

export const PIPELINES: Record<string, AgentStep[]> = {
  'customer_support': CUSTOMER_SUPPORT_PIPELINE,
  'invoice_processing': INVOICE_PROCESSING_PIPELINE,
  'employee_onboarding': EMPLOYEE_ONBOARDING_PIPELINE
};

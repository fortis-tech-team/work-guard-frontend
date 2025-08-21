// --- TYPE DEFINITIONS for the PT JSON structure ---
interface Field {
  id: string;
  label: string;
  inputType: 'text' | 'textarea' | 'datetime-local' | 'signature';
  placeholder?: string;
}

interface ChecklistGroup {
  groupTitle: string;
  items: string[];
}

interface SectionContent {
  fields?: Field[];
  risks?: string[];
  groups?: ChecklistGroup[];
  declaration?: string;
}

interface Section {
  sectionId: string;
  sectionTitle: string;
  type: 'form_group' | 'risk_list' | 'checklist_group' | 'signature_area';
  layout: 'full' | 'half';
  content: SectionContent;
}

interface ErrorDetails {
  code: 'invalid_or_ambiguous_activity';
  message: string;
  suggestions: string[];
}

export type WorkPermissionData = {
  uid?: string;
  activityTitle: string;
  version: string;
  createdAt: string;
  sections: Section[];
};

export interface WorkPermissionResponse {
  status: 'success' | 'error';
  data?: WorkPermissionData;
  error?: ErrorDetails;
}

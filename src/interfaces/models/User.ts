type Role =
  | 'Admin' // Administrator with full access
  | 'Editor' // Can edit content but with limited permissions
  | 'Viewer' // Read-only access
  | 'Manager' // Responsible for managing teams or projects
  | 'Developer' // Focused on technical or coding tasks
  | 'Support' // Handles customer support or technical issues

export interface UserData {
  uid: string // Unique identifier for the user
  first_name: string // User's first name
  last_name: string // User's last name
  nick_name?: string // User's nickname
  role: Role // User's role (e.g., Admin, Editor, etc.)
  position: string // User's position (e.g., Manager, Developer, etc.)
}

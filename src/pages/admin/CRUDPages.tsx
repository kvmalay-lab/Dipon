import GenericCRUD from '../../components/admin/GenericCRUD';

export const AdminNews = () => <GenericCRUD title="News & Media" endpoint="/api/v1/news" entityName="News Article" columns={[
  { key: 'title', label: 'Title', required: true },
  { key: 'slug', label: 'Slug', required: true },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'summary', label: 'Summary', type: 'textarea' },
  { key: 'featured', label: 'Featured', type: 'boolean' }
]} />;

export const AdminCareers = () => <GenericCRUD title="Careers" endpoint="/api/v1/careers" entityName="Job Posting" columns={[
  { key: 'title', label: 'Title', required: true },
  { key: 'department', label: 'Department' },
  { key: 'location', label: 'Location' },
  { key: 'employmentType', label: 'Type' },
  { key: 'status', label: 'Status', type: 'select', options: [{value: 'open', label: 'Open'}, {value: 'closed', label: 'Closed'}] }
]} />;

export const AdminLeadership = () => <GenericCRUD title="Leadership" endpoint="/api/v1/leadership" entityName="Leader" columns={[
  { key: 'name', label: 'Name', required: true },
  { key: 'designation', label: 'Designation', required: true },
  { key: 'department', label: 'Department' },
  { key: 'featured', label: 'Featured', type: 'boolean' },
  { key: 'displayOrder', label: 'Order', type: 'number' }
]} />;

export const AdminClients = () => <GenericCRUD title="Clients" endpoint="/api/v1/clients" entityName="Client" columns={[
  { key: 'name', label: 'Name', required: true },
  { key: 'industry', label: 'Industry' },
  { key: 'website', label: 'Website' }
]} />;

export const AdminAwards = () => <GenericCRUD title="Awards" endpoint="/api/v1/awards" entityName="Award" columns={[
  { key: 'title', label: 'Title', required: true },
  { key: 'organization', label: 'Organization', required: true },
  { key: 'year', label: 'Year', type: 'number', required: true }
]} />;

export const AdminOffices = () => <GenericCRUD title="Offices" endpoint="/api/v1/offices" entityName="Office" columns={[
  { key: 'name', label: 'Name', required: true },
  { key: 'address', label: 'Address', type: 'textarea', required: true },
  { key: 'isHeadquarter', label: 'HQ?', type: 'boolean' }
]} />;

export const AdminInquiries = () => <GenericCRUD title="Inquiries" endpoint="/api/v1/inquiries" entityName="Inquiry" columns={[
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status', type: 'select', options: [{value:'new', label:'New'}, {value:'read', label:'Read'}, {value:'archived', label:'Archived'}] }
]} />;

export const AdminSEO = () => <GenericCRUD title="SEO Manager" endpoint="/api/v1/seo" entityName="SEO Entry" columns={[
  { key: 'path', label: 'Path', required: true },
  { key: 'title', label: 'Meta Title', required: true },
  { key: 'description', label: 'Meta Description', type: 'textarea' }
]} />;

export const AdminHomepage = () => <GenericCRUD title="Homepage Sections" endpoint="/api/v1/homepage" entityName="Section" columns={[
  { key: 'sectionName', label: 'Section Name', required: true },
  { key: 'isActive', label: 'Active', type: 'boolean' },
  { key: 'displayOrder', label: 'Order', type: 'number' }
]} />;

export const AdminSettings = () => <GenericCRUD title="Settings" endpoint="/api/v1/settings" entityName="Setting" columns={[
  { key: 'group', label: 'Group' },
  { key: 'key', label: 'Key', required: true },
  { key: 'value', label: 'Value', type: 'textarea' }
]} />;

export const AdminUsers = () => <GenericCRUD title="Users" endpoint="/api/v1/users" entityName="User" columns={[
  { key: 'firstName', label: 'First Name', required: true },
  { key: 'lastName', label: 'Last Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'status', label: 'Status', type: 'select', options: [{value:'active', label:'Active'}, {value:'inactive', label:'Inactive'}] }
]} />;

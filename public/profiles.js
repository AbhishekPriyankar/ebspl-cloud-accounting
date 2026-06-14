/* EBSPL Profiles — 14 demo user profiles with role-specific data */
(function () {

  var PROFILES = [
    /* ── CLIENTS (5) ── */
    {
      id: 'c1', name: 'Priya Sharma', email: 'priya.sharma@gmail.com',
      role: 'Client', initial: 'PS', company: 'Sharma Textiles Ltd',
      avatarColor: '#4285f4', loginMethod: 'google',
      data: {
        stats: { balance: '£8,420.50', revenue: '£28,500', profit: '£9,200', outstanding: '£1,200', growth: '+14.2%' },
        invoices: [
          { id: 'INV-2024-101', client: 'Sharma Textiles Ltd', initials: 'ST', date: 'Nov 1, 2024', due: 'Nov 15, 2024', amount: '£1,500.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-102', client: 'Sharma Textiles Ltd', initials: 'ST', date: 'Oct 1, 2024', due: 'Oct 30, 2024', amount: '£750.00', status: 'Overdue', color: 'bg-red-100 text-red-700' },
          { id: 'INV-2024-103', client: 'Sharma Textiles Ltd', initials: 'ST', date: 'Nov 5, 2024', due: 'Nov 20, 2024', amount: '£450.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Office Rent', cat: 'Operations', amount: '-£2,200.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Staff Salaries', cat: 'HR', amount: '-£4,500.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Software Licenses', cat: 'Tech', amount: '-£120.00', date: 'Oct 28, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Emma Rodriguez', initials: 'ER', company: 'EBSPL', email: 'e.rodriguez@ebspl.com', phone: '+44 20 7946 0321', last: 'Nov 2, 2024', status: 'Accountant' },
          { name: 'Liam Thompson', initials: 'LT', company: 'EBSPL', email: 'l.thompson@ebspl.com', phone: '+44 20 7946 0322', last: 'Oct 28, 2024', status: 'Tax Specialist' }
        ],
        transactions: [
          { t: 'Invoice Payment — INV-2024-101', amt: '+£1,500.00', date: 'Nov 15', s: 'Matched' },
          { t: 'Office Rent', amt: '-£2,200.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Payroll Run', amt: '-£4,500.00', date: 'Nov 1', s: 'Pending' },
          { t: 'Software License', amt: '-£120.00', date: 'Oct 28', s: 'Pending' }
        ]
      }
    },
    {
      id: 'c2', name: 'James Okonkwo', email: 'j.okonkwo@gmail.com',
      role: 'Client', initial: 'JO', company: 'Okonkwo Logistics',
      avatarColor: '#34a853', loginMethod: 'google',
      data: {
        stats: { balance: '£15,320.00', revenue: '£62,800', profit: '£18,400', outstanding: '£3,500', growth: '+8.7%' },
        invoices: [
          { id: 'INV-2024-090', client: 'Okonkwo Logistics', initials: 'OL', date: 'Oct 5, 2024', due: 'Oct 19, 2024', amount: '£2,200.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-091', client: 'Okonkwo Logistics', initials: 'OL', date: 'Oct 20, 2024', due: 'Nov 3, 2024', amount: '£800.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-092', client: 'Okonkwo Logistics', initials: 'OL', date: 'Nov 10, 2024', due: 'Dec 1, 2024', amount: '£3,500.00', status: 'Draft', color: 'bg-slate-100 text-slate-700' }
        ],
        expenses: [
          { desc: 'Fleet Maintenance', cat: 'Operations', amount: '-£3,400.00', date: 'Oct 31, 2024', status: 'Approved' },
          { desc: 'Insurance Premium', cat: 'Operations', amount: '-£1,200.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Marketing Campaign', cat: 'Marketing', amount: '-£650.00', date: 'Oct 25, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Liam Thompson', initials: 'LT', company: 'EBSPL', email: 'l.thompson@ebspl.com', phone: '+44 20 7946 0322', last: 'Oct 30, 2024', status: 'Tax Specialist' },
          { name: 'Aisha Patel', initials: 'AP', company: 'EBSPL', email: 'a.patel@ebspl.com', phone: '+44 20 7946 0323', last: 'Nov 1, 2024', status: 'Financial Analyst' }
        ],
        transactions: [
          { t: 'Invoice Payment — INV-2024-090', amt: '+£2,200.00', date: 'Oct 19', s: 'Matched' },
          { t: 'Fleet Maintenance', amt: '-£3,400.00', date: 'Oct 31', s: 'Matched' },
          { t: 'Insurance Premium', amt: '-£1,200.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Annual Audit — INV-2024-092', amt: '-£3,500.00', date: 'Dec 1', s: 'Pending' }
        ]
      }
    },
    {
      id: 'c3', name: 'Sophie Williams', email: 's.williams@brightretail.com',
      role: 'Client', initial: 'SW', company: 'Bright Retail Ltd',
      avatarColor: '#ea4335', loginMethod: 'password',
      data: {
        stats: { balance: '£22,100.00', revenue: '£94,500', profit: '£31,200', outstanding: '£5,600', growth: '+21.3%' },
        invoices: [
          { id: 'INV-2024-085', client: 'Bright Retail Ltd', initials: 'BR', date: 'Oct 14, 2024', due: 'Oct 28, 2024', amount: '£620.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' },
          { id: 'INV-2024-086', client: 'Bright Retail Ltd', initials: 'BR', date: 'Nov 1, 2024', due: 'Nov 15, 2024', amount: '£1,850.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-087', client: 'Bright Retail Ltd', initials: 'BR', date: 'Nov 8, 2024', due: 'Nov 22, 2024', amount: '£2,400.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Retail Store Rent', cat: 'Operations', amount: '-£5,500.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Inventory Purchases', cat: 'Stock', amount: '-£12,400.00', date: 'Oct 20, 2024', status: 'Approved' },
          { desc: 'POS System Upgrade', cat: 'Tech', amount: '-£890.00', date: 'Nov 3, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Emma Rodriguez', initials: 'ER', company: 'EBSPL', email: 'e.rodriguez@ebspl.com', phone: '+44 20 7946 0321', last: 'Nov 5, 2024', status: 'Accountant' }
        ],
        transactions: [
          { t: 'Invoice Payment — INV-2024-086', amt: '+£1,850.00', date: 'Nov 15', s: 'Matched' },
          { t: 'Store Rent Nov', amt: '-£5,500.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Inventory Purchase', amt: '-£12,400.00', date: 'Oct 20', s: 'Matched' },
          { t: 'POS Upgrade', amt: '-£890.00', date: 'Nov 3', s: 'Pending' }
        ]
      }
    },
    {
      id: 'c4', name: 'David Chen', email: 'd.chen@novasystems.io',
      role: 'Client', initial: 'DC', company: 'Nova Systems',
      avatarColor: '#9c27b0', loginMethod: 'password',
      data: {
        stats: { balance: '£9,870.00', revenue: '£45,200', profit: '£14,100', outstanding: '£580', growth: '-2.1%' },
        invoices: [
          { id: 'INV-2024-086', client: 'Nova Systems', initials: 'NS', date: 'Sep 28, 2024', due: 'Oct 12, 2024', amount: '£580.00', status: 'Overdue', color: 'bg-red-100 text-red-700' },
          { id: 'INV-2024-093', client: 'Nova Systems', initials: 'NS', date: 'Nov 1, 2024', due: 'Nov 15, 2024', amount: '£1,200.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'AWS Cloud Services', cat: 'Tech', amount: '-£840.00', date: 'Oct 31, 2024', status: 'Approved' },
          { desc: 'Dev Team Salaries', cat: 'HR', amount: '-£18,500.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Equipment Purchase', cat: 'Tech', amount: '-£2,100.00', date: 'Oct 22, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Aisha Patel', initials: 'AP', company: 'EBSPL', email: 'a.patel@ebspl.com', phone: '+44 20 7946 0323', last: 'Oct 28, 2024', status: 'Financial Analyst' }
        ],
        transactions: [
          { t: 'AWS Services', amt: '-£840.00', date: 'Oct 31', s: 'Matched' },
          { t: 'Payroll Run', amt: '-£18,500.00', date: 'Nov 1', s: 'Pending' },
          { t: 'Equipment Purchase', amt: '-£2,100.00', date: 'Oct 22', s: 'Pending' },
          { t: 'Client Payment', amt: '+£4,500.00', date: 'Oct 15', s: 'Matched' }
        ]
      }
    },
    {
      id: 'c5', name: 'Alex Henderson', email: 'alex@henderson.io',
      role: 'Client', initial: 'AH', company: 'Henderson & Co.',
      avatarColor: '#ff6d00', loginMethod: 'password',
      data: {
        stats: { balance: '£31,500.00', revenue: '£118,400', profit: '£42,600', outstanding: '£8,200', growth: '+16.8%' },
        invoices: [
          { id: 'INV-2024-078', client: 'Henderson & Co.', initials: 'HC', date: 'Oct 2, 2024', due: 'Oct 16, 2024', amount: '£3,200.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-079', client: 'Henderson & Co.', initials: 'HC', date: 'Oct 18, 2024', due: 'Nov 1, 2024', amount: '£5,000.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-080', client: 'Henderson & Co.', initials: 'HC', date: 'Nov 5, 2024', due: 'Nov 19, 2024', amount: '£8,200.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Office & Studio Rent', cat: 'Operations', amount: '-£6,200.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Client Entertainment', cat: 'Entertainment', amount: '-£1,840.00', date: 'Oct 28, 2024', status: 'Approved' },
          { desc: 'Legal Retainer', cat: 'Legal', amount: '-£2,500.00', date: 'Nov 1, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Emma Rodriguez', initials: 'ER', company: 'EBSPL', email: 'e.rodriguez@ebspl.com', phone: '+44 20 7946 0321', last: 'Nov 4, 2024', status: 'Accountant' },
          { name: 'Rachel Kim', initials: 'RK', company: 'EBSPL', email: 'r.kim@ebspl.com', phone: '+44 20 7946 0324', last: 'Nov 2, 2024', status: 'Finance Manager' }
        ],
        transactions: [
          { t: 'Invoice Payment — INV-2024-079', amt: '+£5,000.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Office Rent', amt: '-£6,200.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Client Entertainment', amt: '-£1,840.00', date: 'Oct 28', s: 'Matched' },
          { t: 'Legal Retainer', amt: '-£2,500.00', date: 'Nov 1', s: 'Pending' }
        ]
      }
    },

    /* ── ACCOUNTANTS (3) ── */
    {
      id: 'a1', name: 'Emma Rodriguez', email: 'e.rodriguez@ebspl.com',
      role: 'Accountant', initial: 'ER', company: 'EBSPL',
      avatarColor: '#0288d1', loginMethod: 'password',
      data: {
        stats: { balance: '£248,400', revenue: '£312,800', profit: '£98,500', outstanding: '£24,600', growth: '+11.4%' },
        invoices: [
          { id: 'INV-2024-101', client: 'Sharma Textiles Ltd', initials: 'ST', date: 'Nov 1, 2024', due: 'Nov 15, 2024', amount: '£1,500.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-085', client: 'Bright Retail Ltd', initials: 'BR', date: 'Oct 14, 2024', due: 'Oct 28, 2024', amount: '£620.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' },
          { id: 'INV-2024-078', client: 'Henderson & Co.', initials: 'HC', date: 'Oct 2, 2024', due: 'Oct 16, 2024', amount: '£3,200.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-087', client: 'Bright Retail Ltd', initials: 'BR', date: 'Nov 8, 2024', due: 'Nov 22, 2024', amount: '£2,400.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Professional Indemnity Insurance', cat: 'Operations', amount: '-£1,800.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Accounting Software Suite', cat: 'Tech', amount: '-£450.00', date: 'Oct 31, 2024', status: 'Approved' },
          { desc: 'CPD Training Course', cat: 'Training', amount: '-£320.00', date: 'Oct 22, 2024', status: 'Approved' }
        ],
        contacts: [
          { name: 'Priya Sharma', initials: 'PS', company: 'Sharma Textiles Ltd', email: 'priya.sharma@gmail.com', phone: '+44 7700 900001', last: 'Nov 2, 2024', status: 'Client' },
          { name: 'Sophie Williams', initials: 'SW', company: 'Bright Retail Ltd', email: 's.williams@brightretail.com', phone: '+44 7700 900003', last: 'Nov 5, 2024', status: 'Client' },
          { name: 'Alex Henderson', initials: 'AH', company: 'Henderson & Co.', email: 'alex@henderson.io', phone: '+44 7700 900005', last: 'Nov 4, 2024', status: 'Client' }
        ],
        transactions: [
          { t: 'Fee: Sharma Textiles Monthly', amt: '+£1,500.00', date: 'Nov 15', s: 'Matched' },
          { t: 'Fee: Henderson Invoice', amt: '+£3,200.00', date: 'Oct 16', s: 'Matched' },
          { t: 'Indemnity Insurance', amt: '-£1,800.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Accounting Software', amt: '-£450.00', date: 'Oct 31', s: 'Pending' }
        ]
      }
    },
    {
      id: 'a2', name: 'Liam Thompson', email: 'l.thompson@ebspl.com',
      role: 'Accountant', initial: 'LT', company: 'EBSPL',
      avatarColor: '#00897b', loginMethod: 'password',
      data: {
        stats: { balance: '£186,200', revenue: '£245,600', profit: '£74,300', outstanding: '£18,900', growth: '+9.1%' },
        invoices: [
          { id: 'INV-2024-090', client: 'Okonkwo Logistics', initials: 'OL', date: 'Oct 5, 2024', due: 'Oct 19, 2024', amount: '£2,200.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-091', client: 'Okonkwo Logistics', initials: 'OL', date: 'Oct 20, 2024', due: 'Nov 3, 2024', amount: '£800.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-102', client: 'Sharma Textiles Ltd', initials: 'ST', date: 'Oct 1, 2024', due: 'Oct 30, 2024', amount: '£750.00', status: 'Overdue', color: 'bg-red-100 text-red-700' }
        ],
        expenses: [
          { desc: 'Tax Software License', cat: 'Tech', amount: '-£380.00', date: 'Oct 31, 2024', status: 'Approved' },
          { desc: 'ICAEW Membership Fee', cat: 'Professional', amount: '-£540.00', date: 'Oct 1, 2024', status: 'Approved' },
          { desc: 'Client Meeting Travel', cat: 'Travel', amount: '-£145.00', date: 'Nov 2, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'James Okonkwo', initials: 'JO', company: 'Okonkwo Logistics', email: 'j.okonkwo@gmail.com', phone: '+44 7700 900002', last: 'Oct 30, 2024', status: 'Client' },
          { name: 'Priya Sharma', initials: 'PS', company: 'Sharma Textiles Ltd', email: 'priya.sharma@gmail.com', phone: '+44 7700 900001', last: 'Oct 28, 2024', status: 'Client' }
        ],
        transactions: [
          { t: 'Fee: Okonkwo Quarterly', amt: '+£2,200.00', date: 'Oct 19', s: 'Matched' },
          { t: 'Fee: Okonkwo Payroll', amt: '+£800.00', date: 'Nov 3', s: 'Matched' },
          { t: 'Tax Software', amt: '-£380.00', date: 'Oct 31', s: 'Matched' },
          { t: 'Client Travel', amt: '-£145.00', date: 'Nov 2', s: 'Pending' }
        ]
      }
    },
    {
      id: 'a3', name: 'Aisha Patel', email: 'a.patel@ebspl.com',
      role: 'Accountant', initial: 'AP', company: 'EBSPL',
      avatarColor: '#e91e63', loginMethod: 'password',
      data: {
        stats: { balance: '£142,800', revenue: '£198,400', profit: '£61,200', outstanding: '£14,200', growth: '+7.6%' },
        invoices: [
          { id: 'INV-2024-093', client: 'Nova Systems', initials: 'NS', date: 'Nov 1, 2024', due: 'Nov 15, 2024', amount: '£1,200.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' },
          { id: 'INV-2024-086', client: 'Nova Systems', initials: 'NS', date: 'Sep 28, 2024', due: 'Oct 12, 2024', amount: '£580.00', status: 'Overdue', color: 'bg-red-100 text-red-700' },
          { id: 'INV-2024-080', client: 'Henderson & Co.', initials: 'HC', date: 'Nov 5, 2024', due: 'Nov 19, 2024', amount: '£8,200.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Financial Modelling Software', cat: 'Tech', amount: '-£620.00', date: 'Oct 28, 2024', status: 'Approved' },
          { desc: 'Data Analytics Tools', cat: 'Tech', amount: '-£280.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Professional Development', cat: 'Training', amount: '-£490.00', date: 'Oct 15, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'David Chen', initials: 'DC', company: 'Nova Systems', email: 'd.chen@novasystems.io', phone: '+44 7700 900004', last: 'Oct 28, 2024', status: 'Client' },
          { name: 'Alex Henderson', initials: 'AH', company: 'Henderson & Co.', email: 'alex@henderson.io', phone: '+44 7700 900005', last: 'Nov 2, 2024', status: 'Client' }
        ],
        transactions: [
          { t: 'Fee: Nova Systems', amt: '+£1,200.00', date: 'Nov 15', s: 'Pending' },
          { t: 'Overdue: Nova INV-086', amt: '+£580.00', date: 'Oct 12', s: 'Pending' },
          { t: 'Financial Modelling SW', amt: '-£620.00', date: 'Oct 28', s: 'Matched' },
          { t: 'Analytics Tools', amt: '-£280.00', date: 'Nov 1', s: 'Matched' }
        ]
      }
    },

    /* ── ADMINS (3) ── */
    {
      id: 'ad1', name: 'Sarah Chen', email: 's.chen@gmail.com',
      role: 'Admin', initial: 'SC', company: 'EBSPL',
      avatarColor: '#7b1fa2', loginMethod: 'google',
      data: {
        stats: { balance: '£1,240,500', revenue: '£3,128,000', profit: '£924,000', outstanding: '£86,400', growth: '+18.4%' },
        invoices: [
          { id: 'INV-2024-101', client: 'Sharma Textiles Ltd', initials: 'ST', date: 'Nov 1, 2024', due: 'Nov 15, 2024', amount: '£1,500.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-090', client: 'Okonkwo Logistics', initials: 'OL', date: 'Oct 5, 2024', due: 'Oct 19, 2024', amount: '£2,200.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-085', client: 'Bright Retail Ltd', initials: 'BR', date: 'Oct 14, 2024', due: 'Oct 28, 2024', amount: '£620.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' },
          { id: 'INV-2024-086', client: 'Nova Systems', initials: 'NS', date: 'Sep 28, 2024', due: 'Oct 12, 2024', amount: '£580.00', status: 'Overdue', color: 'bg-red-100 text-red-700' },
          { id: 'INV-2024-080', client: 'Henderson & Co.', initials: 'HC', date: 'Nov 5, 2024', due: 'Nov 19, 2024', amount: '£8,200.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Server Infrastructure', cat: 'Tech', amount: '-£12,400.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Staff Salaries (Nov)', cat: 'HR', amount: '-£48,200.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Office Premises', cat: 'Operations', amount: '-£8,500.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Marketing Budget Q4', cat: 'Marketing', amount: '-£15,000.00', date: 'Oct 31, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Priya Sharma', initials: 'PS', company: 'Sharma Textiles Ltd', email: 'priya.sharma@gmail.com', phone: '+44 7700 900001', last: 'Nov 2, 2024', status: 'Client' },
          { name: 'James Okonkwo', initials: 'JO', company: 'Okonkwo Logistics', email: 'j.okonkwo@gmail.com', phone: '+44 7700 900002', last: 'Oct 30, 2024', status: 'Client' },
          { name: 'Sophie Williams', initials: 'SW', company: 'Bright Retail Ltd', email: 's.williams@brightretail.com', phone: '+44 7700 900003', last: 'Nov 5, 2024', status: 'Client' },
          { name: 'David Chen', initials: 'DC', company: 'Nova Systems', email: 'd.chen@novasystems.io', phone: '+44 7700 900004', last: 'Oct 28, 2024', status: 'Client' },
          { name: 'Alex Henderson', initials: 'AH', company: 'Henderson & Co.', email: 'alex@henderson.io', phone: '+44 7700 900005', last: 'Nov 4, 2024', status: 'Client' }
        ],
        transactions: [
          { t: 'Server Infrastructure', amt: '-£12,400.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Staff Salaries Nov', amt: '-£48,200.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Income: Sharma Fee', amt: '+£1,500.00', date: 'Nov 15', s: 'Matched' },
          { t: 'Income: Okonkwo Fee', amt: '+£2,200.00', date: 'Oct 19', s: 'Matched' }
        ]
      }
    },
    {
      id: 'ad2', name: 'Marcus Reed', email: 'm.reed@ebspl.com',
      role: 'Admin', initial: 'MR', company: 'EBSPL',
      avatarColor: '#1565c0', loginMethod: 'password',
      data: {
        stats: { balance: '£1,240,500', revenue: '£3,128,000', profit: '£924,000', outstanding: '£86,400', growth: '+18.4%' },
        invoices: [
          { id: 'INV-2024-078', client: 'Henderson & Co.', initials: 'HC', date: 'Oct 2, 2024', due: 'Oct 16, 2024', amount: '£3,200.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-092', client: 'Okonkwo Logistics', initials: 'OL', date: 'Nov 10, 2024', due: 'Dec 1, 2024', amount: '£3,500.00', status: 'Draft', color: 'bg-slate-100 text-slate-700' },
          { id: 'INV-2024-087', client: 'Bright Retail Ltd', initials: 'BR', date: 'Nov 8, 2024', due: 'Nov 22, 2024', amount: '£2,400.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Operations Budget Nov', cat: 'Operations', amount: '-£24,800.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'CRM Platform', cat: 'Tech', amount: '-£1,200.00', date: 'Oct 31, 2024', status: 'Approved' },
          { desc: 'Training Programme Q4', cat: 'Training', amount: '-£4,500.00', date: 'Oct 20, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Emma Rodriguez', initials: 'ER', company: 'EBSPL', email: 'e.rodriguez@ebspl.com', phone: '+44 20 7946 0321', last: 'Nov 5, 2024', status: 'Accountant' },
          { name: 'Liam Thompson', initials: 'LT', company: 'EBSPL', email: 'l.thompson@ebspl.com', phone: '+44 20 7946 0322', last: 'Nov 3, 2024', status: 'Accountant' },
          { name: 'Aisha Patel', initials: 'AP', company: 'EBSPL', email: 'a.patel@ebspl.com', phone: '+44 20 7946 0323', last: 'Nov 1, 2024', status: 'Accountant' }
        ],
        transactions: [
          { t: 'Operations Budget', amt: '-£24,800.00', date: 'Nov 1', s: 'Matched' },
          { t: 'CRM Platform', amt: '-£1,200.00', date: 'Oct 31', s: 'Matched' },
          { t: 'Income: Henderson Fee', amt: '+£3,200.00', date: 'Oct 16', s: 'Matched' },
          { t: 'Training Programme', amt: '-£4,500.00', date: 'Oct 20', s: 'Pending' }
        ]
      }
    },
    {
      id: 'ad3', name: 'Rachel Kim', email: 'r.kim@ebspl.com',
      role: 'Admin', initial: 'RK', company: 'EBSPL',
      avatarColor: '#2e7d32', loginMethod: 'password',
      data: {
        stats: { balance: '£1,240,500', revenue: '£3,128,000', profit: '£924,000', outstanding: '£86,400', growth: '+18.4%' },
        invoices: [
          { id: 'INV-2024-079', client: 'Henderson & Co.', initials: 'HC', date: 'Oct 18, 2024', due: 'Nov 1, 2024', amount: '£5,000.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'INV-2024-103', client: 'Sharma Textiles Ltd', initials: 'ST', date: 'Nov 5, 2024', due: 'Nov 20, 2024', amount: '£450.00', status: 'Sent', color: 'bg-blue-100 text-blue-700' }
        ],
        expenses: [
          { desc: 'Finance Dept Budget', cat: 'Operations', amount: '-£18,400.00', date: 'Nov 1, 2024', status: 'Approved' },
          { desc: 'Audit & Compliance Tools', cat: 'Tech', amount: '-£2,800.00', date: 'Oct 30, 2024', status: 'Approved' },
          { desc: 'External Audit Fees', cat: 'Professional', amount: '-£6,200.00', date: 'Oct 15, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Alex Henderson', initials: 'AH', company: 'Henderson & Co.', email: 'alex@henderson.io', phone: '+44 7700 900005', last: 'Nov 4, 2024', status: 'Client' },
          { name: 'Sophie Williams', initials: 'SW', company: 'Bright Retail Ltd', email: 's.williams@brightretail.com', phone: '+44 7700 900003', last: 'Nov 2, 2024', status: 'Client' }
        ],
        transactions: [
          { t: 'Finance Dept Budget', amt: '-£18,400.00', date: 'Nov 1', s: 'Matched' },
          { t: 'Audit Tools', amt: '-£2,800.00', date: 'Oct 30', s: 'Matched' },
          { t: 'Income: Henderson', amt: '+£5,000.00', date: 'Nov 1', s: 'Matched' },
          { t: 'External Audit', amt: '-£6,200.00', date: 'Oct 15', s: 'Pending' }
        ]
      }
    },

    /* ── USERS / STAFF (3) ── */
    {
      id: 'u1', name: 'Tom Bradley', email: 't.bradley@ebspl.com',
      role: 'User', initial: 'TB', company: 'EBSPL',
      avatarColor: '#f57c00', loginMethod: 'password',
      data: {
        stats: { balance: '£0', revenue: '£0', profit: '£0', outstanding: '£0', growth: 'N/A' },
        invoices: [],
        expenses: [
          { desc: 'Office Supplies', cat: 'Operations', amount: '-£45.00', date: 'Oct 19, 2024', status: 'Approved' },
          { desc: 'Client Lunch', cat: 'Entertainment', amount: '-£78.20', date: 'Oct 18, 2024', status: 'Approved' }
        ],
        contacts: [
          { name: 'Sarah Chen', initials: 'SC', company: 'EBSPL', email: 's.chen@gmail.com', phone: '+44 20 7946 0325', last: 'Nov 3, 2024', status: 'Admin' },
          { name: 'Marcus Reed', initials: 'MR', company: 'EBSPL', email: 'm.reed@ebspl.com', phone: '+44 20 7946 0326', last: 'Nov 1, 2024', status: 'Admin' }
        ],
        transactions: [
          { t: 'Office Supplies', amt: '-£45.00', date: 'Oct 19', s: 'Matched' },
          { t: 'Client Lunch', amt: '-£78.20', date: 'Oct 18', s: 'Matched' }
        ]
      }
    },
    {
      id: 'u2', name: 'Kezia Obi', email: 'k.obi@ebspl.com',
      role: 'User', initial: 'KO', company: 'EBSPL',
      avatarColor: '#ad1457', loginMethod: 'password',
      data: {
        stats: { balance: '£0', revenue: '£0', profit: '£0', outstanding: '£0', growth: 'N/A' },
        invoices: [],
        expenses: [
          { desc: 'Stationery', cat: 'Operations', amount: '-£22.00', date: 'Nov 2, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Tom Bradley', initials: 'TB', company: 'EBSPL', email: 't.bradley@ebspl.com', phone: '+44 20 7946 0327', last: 'Nov 4, 2024', status: 'Support' }
        ],
        transactions: [
          { t: 'Stationery Purchase', amt: '-£22.00', date: 'Nov 2', s: 'Pending' }
        ]
      }
    },
    {
      id: 'u3', name: 'Daniel Foster', email: 'd.foster@ebspl.com',
      role: 'User', initial: 'DF', company: 'EBSPL',
      avatarColor: '#00695c', loginMethod: 'password',
      data: {
        stats: { balance: '£0', revenue: '£0', profit: '£0', outstanding: '£0', growth: 'N/A' },
        invoices: [],
        expenses: [
          { desc: 'Travel Expenses', cat: 'Travel', amount: '-£185.00', date: 'Oct 30, 2024', status: 'Approved' },
          { desc: 'Client Gift', cat: 'Entertainment', amount: '-£55.00', date: 'Oct 25, 2024', status: 'Pending' }
        ],
        contacts: [
          { name: 'Priya Sharma', initials: 'PS', company: 'Sharma Textiles Ltd', email: 'priya.sharma@gmail.com', phone: '+44 7700 900001', last: 'Oct 31, 2024', status: 'Client' },
          { name: 'James Okonkwo', initials: 'JO', company: 'Okonkwo Logistics', email: 'j.okonkwo@gmail.com', phone: '+44 7700 900002', last: 'Oct 28, 2024', status: 'Client' }
        ],
        transactions: [
          { t: 'Travel Expenses', amt: '-£185.00', date: 'Oct 30', s: 'Matched' },
          { t: 'Client Gift', amt: '-£55.00', date: 'Oct 25', s: 'Pending' }
        ]
      }
    }
  ];

  /* ── Public API ── */
  window.EBSPL_PROFILES = {
    all: PROFILES,
    getByEmail: function (email) {
      for (var i = 0; i < PROFILES.length; i++) {
        if (PROFILES[i].email === email) return PROFILES[i];
      }
      return null;
    },
    getByRole: function (role) {
      return PROFILES.filter(function (p) { return p.role === role; });
    },
    /* Returns profile data for the logged-in user, or null */
    forCurrentUser: function () {
      try {
        var u = JSON.parse(localStorage.getItem('ebspl_user'));
        if (!u) return null;
        var p = window.EBSPL_PROFILES.getByEmail(u.email);
        return p ? p.data : null;
      } catch (e) { return null; }
    }
  };

})();

export const warehouseConfiguration = {
  columns: [
    {
      field: 'firstName',
      header: 'First Name',
      maxwidth: '240px',
      width: '240px',
    },
    {
      field: 'lastName',
      header: 'Last Name',
      maxwidth: '240px',
      width: '240px',
    },
    {
      field: 'email',
      header: 'Email',
      maxwidth: '320px',
      width: '320px',
    },
    { field: 'contactNumber', header: 'Contact' },
    { field: 'roleTypeId', header: 'Role', options: { type: 'roleObject' } },

    {
      header: 'Actions',
      type: 'actions',
      actions: [
        {
          type: 'edit',
          text: 'Edit',
          icon: 'fa-solid fa-pencil',
          toolTip: 'Edit',
        },
        {
          type: 'delete',
          text: 'Delete',
          icon: 'fa-solid fa-trash',
          toolTip: 'Delete',
        },
      ],
    },
  ],
};
export const superAdminRoles = [
  {
    id: 4,
    role: 'Warehouse Manager',
  },
  {
    id: 5,
    role: 'Warehouse Supervisor',
  },
  {
    id: 6,
    role: 'Warehouse Staff',
  },
  {
    id: 2,
    role: 'Carrier Admin',
  },
  {
    id: 3,
    role: 'Shipper Admin',
  },
];

export const managerRoles = [
  {
    id: 5,
    role: 'Warehouse Supervisor',
  },
  {
    id: 6,
    role: 'Warehouse Staff',
  },
  {
    id: 2,
    role: 'Carrier Admin',
  },
  {
    id: 3,
    role: 'Shipper Admin',
  },
];

export const supervisorRoles = [
  {
    id: 6,
    role: 'Warehouse Staff',
  },
];

export const INVOICE_STATUS = {
  CONFIRMADA: "Confirmada",
  ANULADA: "Anulada",
  PENDIENTE: "Pendiente",
  BORRADOR: "Borrador",
};

export const STATUS_DEFINITIONS = {
  [INVOICE_STATUS.CONFIRMADA]: {
    label: "Confirmada",
    badgeClass: "bg-emerald-100 text-emerald-800",
  },
  [INVOICE_STATUS.ANULADA]: {
    label: "Anulada",
    badgeClass: "bg-brand-purple/20 text-brand-purple",
  },
  [INVOICE_STATUS.PENDIENTE]: {
    label: "Pendiente",
    badgeClass: "bg-amber-100 text-amber-800",
  },
  [INVOICE_STATUS.BORRADOR]: {
    label: "Borrador",
    badgeClass: "bg-gray-100 text-gray-800",
  },
};

export const getStatusDefinition = (status) => {
  return STATUS_DEFINITIONS[status] || {
    label: status,
    badgeClass: "bg-gray-100 text-gray-700",
  };
}; 
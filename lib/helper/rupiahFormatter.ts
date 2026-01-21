const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const formatRupiah = (value?: number | null) =>
  value != null ? rupiahFormatter.format(value) : "—";

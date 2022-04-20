function formatRupiah(value) {
  const formatIdr = Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  return formatIdr.format(value);
}

module.exports = formatRupiah;
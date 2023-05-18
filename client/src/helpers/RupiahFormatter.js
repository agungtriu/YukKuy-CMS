const RupiahFormatter = (price) => {
  const stringPrice = price.toString();
  const sisa = stringPrice.length % 3;
  let rupiah = `Rp. ${stringPrice.slice(0, sisa)}`;
  let ribuan = stringPrice.slice(sisa, stringPrice.length);
  for (let index = 0; index < ribuan.length; index++) {
    if (index % 3 === 0) {
      if (sisa === 0 && index === 0) {
        rupiah += `${ribuan[index]}`;
      } else {
        rupiah += `.${ribuan[index]}`;
      }
    } else {
      rupiah += `${ribuan[index]}`;
    }
  }
  return rupiah;
};

module.exports = RupiahFormatter;
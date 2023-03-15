const currencyFormatter = (number: number) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  });

  const price = formatter.format(number)

  return price
}

export default currencyFormatter;
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' }
    const date = new Date(dateString)
    const year = date.getUTCFullYear().toString().slice(-4)
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = date.getUTCDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

module.exports = {formatDate}
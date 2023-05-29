const midtransClient = require("midtrans-client");
// Create Core API instance
const coreApi = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-ZNnu7eHfKjLPAhHXYZ8DvRaf",
  clientKey: "SB-Mid-client-xIBhUI5aACbV5KOL",
});

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-ZNnu7eHfKjLPAhHXYZ8DvRaf",
});

module.exports = { coreApi, snap };

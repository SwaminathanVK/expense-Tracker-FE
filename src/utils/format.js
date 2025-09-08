// utils/formatters.js
import moment from "moment";

// 💰 Format Money in INR
export const fmtMoney = (n) =>
  (Number(n) || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

// 📅 Format Date
export const fmtDate = (d) => (d ? moment(d).format("DD MMM YYYY") : "");

import { jsPDF } from "jspdf";
import logo from "../assets/logo.png";

export const handlePrintInvoice = (order) => {
  const doc = new jsPDF();

  doc.addImage(logo, "PNG", 80, 10, 50, 20);

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Order Invoice", 105, 40, null, null, "center");

  doc.setLineWidth(0.5);
  doc.line(10, 50, 200, 50);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order.id}`, 14, 60);
  doc.text(`Customer Name: ${order.customer_name}`, 14, 70);
  doc.text(
    `Order Date: ${new Date(order.order_date).toLocaleDateString()}`,
    14,
    80
  );
  doc.text(
    `Order Time: ${new Date(order.order_date).toLocaleTimeString()}`,
    14,
    90
  );

  let yPosition = 100;
  doc.setFontSize(12);
  doc.text("Items", 14, yPosition);
  doc.text("Quantity", 100, yPosition);
  doc.text("Price", 160, yPosition);

  yPosition += 10;

  JSON.parse(order.items).forEach((item, index) => {
    doc.text(item.name, 14, yPosition);

    doc.text(item.quantity.toString(), 110, yPosition, null, null, "center");
    doc.text(
      `Rs. ${item.price.toFixed(2)}`,
      170,
      yPosition,
      null,
      null,
      "right"
    );
    yPosition += 10;
  });

  doc.setFontSize(12);
  doc.text(`Total: Rs. ${order.total_price.toFixed(2)}`, 14, yPosition + 10);

  doc.text(
    `Status: ${order.order_status === "paid" ? "PAID" : "UNPAID"}`,
    14,
    yPosition + 20
  );

  doc.line(10, yPosition + 30, 200, yPosition + 30);

  doc.save(`order_${order.id}_invoice.pdf`);
};

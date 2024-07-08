const reservationEmailTemplate = (reservationId, checkInDate, checkOutDate, accom) =>  {

return `<body style="font-family: Arial, sans-serif; background-color: #; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="background-color: #E1C7A5; color: #000000; padding: 20px; text-align: center;">
        <h1>FLEXGO</h1>
      </div>
      <div style="padding: 20px;">
        <h2>Reservation Confirmation</h2>
        <p>Dear Customer,</p>
        <p>We are pleased to inform you that your reservation with FLEXGO has been successfully completed. Below are the details of your reservation:</p>
        <ul>
          <li><strong>Reservation ID:</strong> ${reservationId}</li>
          <li><strong>Check-in Date:</strong> ${checkInDate}</li>
          <li><strong>Check-out Date:</strong> ${checkOutDate}</li>
          <li><strong>Accommodation:</strong> ${accom}</li>
        </ul>
        <p>We hope you have a wonderful stay with us. If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
        <p>Thank you for choosing FLEXGO!</p>
        <p>Best regards,<br>The FLEXGO Team</p>
      </div>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #777777; font-size: 12px;">
        <p>&copy; 2024 FLEXGO. All rights reserved.</p>
        <p>1234 Street Address, City, State, ZIP</p>
        <p>Email: support@flexgo.com | Phone: (123) 456-7890</p>
      </div>
    </div>
  </body>`
}

module.exports = reservationEmailTemplate
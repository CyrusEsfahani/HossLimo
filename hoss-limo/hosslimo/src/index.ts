import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import {
  onDocumentCreated,
  FirestoreEvent,
  QueryDocumentSnapshot,
} from "firebase-functions/v2/firestore";
import * as dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp();

// Define the BookingData interface
interface BookingData {
  email: string;
  date: string;
  people: number;
  startTime: string;
  endTime: string;
  location: string;
  partyName: string;
}

// Gmail configuration using environment variables
const gmailEmail = process.env.GMAIL_EMAIL || "hossein48.esfahani@gmail.com";
const gmailPass = process.env.GMAIL_PASS || "hzrfklmmzrxxyjer";

if (!gmailEmail || !gmailPass) {
  console.error("Missing Gmail credentials in .env file.");
  throw new Error("Missing Gmail credentials");
}

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPass,
  },
});

// Verify transporter setup
transporter.verify((error: Error | null) => {
  if (error) {
    console.error("Transporter verification failed:", error.message);
  } else {
    console.log("Transporter ready to send emails");
  }
});

// Define the hosslimo function using v2 API
export const hosslimo = onDocumentCreated(
  "reservations/{reservationId}",
  async (
    event: FirestoreEvent<
      QueryDocumentSnapshot | undefined,
      {reservationId: string}
    >
  ) => {
    // Get reservation data and handle undefined case
    const snapshot = event.data;
    if (!snapshot) {
      console.error("No data associated with the event");
      throw new Error("No data associated with the event");
    }

    const reservation = snapshot.data() as BookingData;
    const reservationId = event.params.reservationId;

    console.log("New reservation created with ID:", reservationId);
    console.log("Reservation data:", reservation);

    // Validate required fields
    const requiredFields = [
      "email",
      "date",
      "people",
      "startTime",
      "endTime",
      "location",
      "partyName",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in reservation)
    );
    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      throw new Error(`Missing fields: ${missingFields.join(", ")}`);
    }

    // Prepare user confirmation email
    const userMailOptions = {
      from: `Hoss Limo <${gmailEmail}>`,
      to: reservation.email,
      subject: "Your Hoss Limo Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;
          margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="font-size: 24px; color: #1a73e8; margin: 0 0 15px;
            text-align: center;">
            Booking Confirmation
          </h1>
          <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px;
            text-align: center;">
            Thank you for booking with Hoss Limo!
          </p>
          <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px;">
            Your reservation details:
          </p>
          <ul style="list-style: none; padding: 0; 
          font-size: 16px; line-height: 1.5;">
            <li style="margin-bottom: 10px;">
              <strong>Email:</strong> ${reservation.email}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Date:</strong> ${reservation.date}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>People:</strong> ${reservation.people}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Start Time:</strong> ${reservation.startTime}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>End Time:</strong> ${reservation.endTime}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Location:</strong> ${reservation.location}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Party Name:</strong> ${reservation.partyName}
            </li>
          </ul>
          <p style="font-size: 16px; line-height: 1.5; margin: 15px 0 0;
            text-align: center;">
            We look forward to serving you!
          </p>
          <style>
            @media (max-width: 600px) {
              h1 {font-size: 20px;}
              p, ul {font-size: 14px;}
            }
          </style>
        </div>
      `,
    };

    // Prepare owner notification email
    const ownerMailOptions = {
      from: `Hoss Limo <${gmailEmail}>`,
      to: "hossein48.esfahani@gmail.com",
      subject: "New Booking Notification - Hoss Limo",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;
          margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="font-size: 24px; color: #1a73e8; margin: 0 0 15px;
            text-align: center;">
            New Booking Received
          </h1>
          <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px;">
            A new reservation has been made:
          </p>
          <ul style="list-style: none; padding: 0; 
          font-size: 16px; line-height: 1.5;">
            <li style="margin-bottom: 10px;">
              <strong>Email:</strong> ${reservation.email}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Date:</strong> ${reservation.date}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>People:</strong> ${reservation.people}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Start Time:</strong> ${reservation.startTime}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>End Time:</strong> ${reservation.endTime}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Location:</strong> ${reservation.location}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>Party Name:</strong> ${reservation.partyName}
            </li>
          </ul>
          <style>
            @media (max-width: 600px) {
              h1 {font-size: 20px;}
              p, ul {font-size: 14px;}
            }
          </style>
        </div>
      `,
    };

    // Send both emails
    try {
      const [userResult, ownerResult] = await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(ownerMailOptions),
      ]);
      console.log("User email sent to:", reservation.email);
      console.log("User email response:", userResult.response);
      console.log("Owner email sent to: hossein48.esfahani@gmail.com");
      console.log("Owner email response:", ownerResult.response);
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error sending emails:", err.message);
      throw new Error("Failed to send emails: " + err.message);
    }
  }
);

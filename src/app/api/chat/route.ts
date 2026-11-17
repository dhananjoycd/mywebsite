import { NextResponse } from "next/server";

export async function POST() {
  // Rayna is in training mode - returns polite status to client
  const trainingReply = 
    "🤖 **Status: Model Under Training**\n\n" +
    "Thank you for your message! My neural weights and domain training are currently being fine-tuned to represent Dhananjoy's full project portfolio.\n\n" +
    "For immediate project bookings, quotes, or inquiries, please use the **Services** section on this site or email Dhananjoy directly at **dhananjoychandradas@gmail.com**!";

  return NextResponse.json({ reply: trainingReply });
}

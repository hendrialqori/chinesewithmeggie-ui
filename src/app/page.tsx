import React from "react";
import * as LP from "#/modules/landing-page"

export default function Home() {
  return (
    <main className="bg-background">
        <LP.Hero />
        <LP.UniqueSellingPoint />
        <LP.Testimonial />
        <LP.ProductKnowledge />
        <LP.ProductOffer />
        <LP.FAQ />
        <LP.Footer />
        <LP.FloatingButton.WhatsApp />
        <LP.FloatingButton.BuyNow />
    </main>
  )
}

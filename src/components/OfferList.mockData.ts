

import type { Offer } from "./OfferCard.types";

export const offerListMockData: Offer[] = [
  {
    description:
      "Professional house cleaning services tailored to your needs. We'll leave your home spotless and fresh.",
    id: "1",
    image: "https://via.placeholder.com/300",
    offerType: "offer",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/300" },
    title: "House Cleaning"
  },
  {
    description:
      "Need assistance with your garden? Our experienced team can help you with planting, pruning, and maintaining your outdoor space.",
    id: "2",
    offerType: "request",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/400" },
    title: "Gardening Help"
  },
  {
    description:
      "Transform your space with our top-notch painting services. From walls to ceilings, we'll give your home a fresh new look.",
    id: "3",
    image: "https://via.placeholder.com/400",
    offerType: "offer",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/200" },
    title: "Painting Services"
  },
  {
    description:
      "Get reliable and efficient delivery assistance for all your packages and parcels. We'll ensure your items reach their destination safely.",
    id: "4",
    image: "https://via.placeholder.com/500",
    offerType: "request",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/500" },
    title: "Delivery Assistance"
  },
  {
    description:
      "Going away? Trust our experienced pet sitters to provide loving care for your furry friends while you're gone.",
    id: "5",
    offerType: "offer",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/800" },
    title: "Pet Sitting"
  },
  {
    description:
      "Make your move stress-free with our professional moving help. We'll handle the heavy lifting and logistics, so you can focus on settling into your new home.",
    id: "6",
    image: "https://via.placeholder.com/600",
    offerType: "request",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/600" },
    title: "Moving Help"
  },
  {
    description:
      "Planning an event? Let us take care of the setup. From decorations to seating arrangements, we'll create a memorable experience for your guests.",
    id: "7",
    image: "https://via.placeholder.com/700",
    offerType: "offer",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/700" },
    title: "Event Setup"
  },
  {
    description:
      "Don't struggle with complicated instructions. Our skilled team will assemble your furniture quickly and correctly.",
    id: "8",
    image: "https://via.placeholder.com/800",
    offerType: "request",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/900" },
    title: "Furniture Assembly"
  },
  {
    description:
      "From minor repairs to home improvement projects, our handyman services are here to help. Trust us to tackle any task with precision and expertise.",
    id: "9",
    offerType: "offer",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/800" },
    title: "Handyman Services"
  },
  {
    description:
      "Need academic support? Our qualified tutors provide personalized assistance to help you excel in your studies.",
    id: "10",
    image: "https://via.placeholder.com/900",
    offerType: "request",
    person: { name: "John Doe", picture: "https://i.pravatar.cc/700" },
    title: "Tutoring Assistance"
  },
];

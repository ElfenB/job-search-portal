/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/require-await */

import type { JobOffer } from "./jobRouter.types"

export const dbMock = {
  jobs: {
    create: async (job: Omit<JobOffer, "id">) => {
      const newJob = { ...job, id: String(jobsMock.length + 1) }
      jobsMock.push(newJob)
      return newJob
    },
    findById: async (id: string) => {
      return jobsMock.find((j) => j.id === id)
    },
    findMany: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return jobsMock
    }
  },
}

const jobsMock: JobOffer[] = [
  {
    description:
      "Professional house cleaning services tailored to your needs. We'll leave your home spotless and fresh.",
    id: "1",
    image: "https://via.placeholder.com/300",
    offerType: "offer",
    title: "House Cleaning",
    authorId: "1"
  },
  {
    description:
      "Need assistance with your garden? Our experienced team can help you with planting, pruning, and maintaining your outdoor space.",
    id: "2",
    offerType: "request",
    title: "Gardening Help",
    authorId: "1"
  },
  {
    description:
      "Transform your space with our top-notch painting services. From walls to ceilings, we'll give your home a fresh new look.",
    id: "3",
    image: "https://via.placeholder.com/400",
    offerType: "offer",
    title: "Painting Services",
    authorId: "1"
  },
  {
    description:
      "Get reliable and efficient delivery assistance for all your packages and parcels. We'll ensure your items reach their destination safely.",
    id: "4",
    image: "https://via.placeholder.com/500",
    offerType: "request",
    title: "Delivery Assistance",
    authorId: "1"
  },
  {
    description:
      "Going away? Trust our experienced pet sitters to provide loving care for your furry friends while you're gone.",
    id: "5",
    offerType: "offer",
    title: "Pet Sitting",
    authorId: "1"
  },
  {
    description:
      "Make your move stress-free with our professional moving help. We'll handle the heavy lifting and logistics, so you can focus on settling into your new home.",
    id: "6",
    image: "https://via.placeholder.com/600",
    offerType: "request",
    title: "Moving Help",
    authorId: "1"
  },
  {
    description:
      "Planning an event? Let us take care of the setup. From decorations to seating arrangements, we'll create a memorable experience for your guests.",
    id: "7",
    image: "https://via.placeholder.com/700",
    offerType: "offer",
    title: "Event Setup",
    authorId: "1"
  },
  {
    description:
      "Don't struggle with complicated instructions. Our skilled team will assemble your furniture quickly and correctly.",
    id: "8",
    image: "https://via.placeholder.com/800",
    offerType: "request",
    title: "Furniture Assembly",
    authorId: "1"
  },
  {
    description:
      "From minor repairs to home improvement projects, our handyman services are here to help. Trust us to tackle any task with precision and expertise.",
    id: "9",
    offerType: "offer",
    title: "Handyman Services",
    authorId: "1"
  },
  {
    description: "Need help with your studies? Our tutors provide expert guidance and support to help you succeed.",

    id: "10",
    image: "https://via.placeholder.com/900",
    offerType: "request",
    title: "Tutoring Assistance",
    authorId: "1"
  },
];

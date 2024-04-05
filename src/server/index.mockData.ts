/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/require-await */

type Job = {
  id: string
  name: string
}

const jobsMock: Job[] = [
  { id: '1', name: 'Job 1' },
  { id: '2', name: 'Job 2' },
  { id: '3', name: 'Job 3' },
]

export const dbMock = {
  jobs: {
    create: async (job: Partial<Job>) => {
      if (!job.name) {
        throw new Error('Name is required')
      }
      jobsMock.push({ id: String(jobsMock.length + 1), name: job.name })
      return job
    },
    findById: async (id: string) => {
      return jobsMock.find((j) => j.id === id)
    },
    findMany: async () => {
      return jobsMock
    }
  },
}

interface TaskStatus {
  id: string
  reason?: string
}

interface VolunteerProfile {
  uuid: string
  name?: string
}

interface Location {
  streetAddress?: string
  city: string
  zip: string
}

interface Task {
  uuid: string
  type: string
  status: TaskStatus
  created: string
  name: string
  description?: string
  [propName: string]: any
}

interface NewVolunteerTask extends Task {
  type: 'new-volunteer'
  profile: VolunteerProfile
}

interface PickUpTask extends Task {
  type: 'pick-up'
  location: Location
}

const tasks: Task[] = [
  {
    uuid: '8b416b2b-0642-49b3-81b5-1bf78a7f0f24',
    type: 'new-volunteer',
    status: {
      id: 'new',
      // reason: 'None yet',
    },
    created: '2019-02-03',
    name: 'New Volunteer (name?)',
    profile: {
      uuid: 'a26c64fc-2657-477b-a096-19342df4960e',
      // name: 'No name yet',
    },
  },
  {
    uuid: '0258aa81-67c7-4376-b834-8eeb0ce605ba',
    type: 'new-volunteer',
    status: {
      id: 'on-hold',
      reason: 'Waiting for response.',
    },
    created: '2019-01-24',
    name: 'New Volunteer (Pamela)',
    profile: {
      uuid: '2e55424b-e0e2-40a5-a850-81b562214f29',
      name: 'Pamela',
    },
  },
  {
    uuid: 'dc04389b-4ae8-4a64-9834-3907402e522b',
    type: 'new-volunteer',
    status: {
      id: 'active',
      reason: 'Needs cookhouse contact,',
    },
    created: '2019-01-12',
    name: 'New Volunteer: Nonnie',
    profile: {
      uuid: '7f9c0610-eb2b-465e-8c5f-4dd3b84e56fd',
      name: 'Nonnie',
    },
  },
]

export default tasks

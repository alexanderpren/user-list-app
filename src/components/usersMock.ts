import { faker } from '@faker-js/faker';
import { Title, User } from 'api/users.types';
type MockUser = Omit<
  User,
  'id' | 'gender' | 'registered' | 'dob' | 'phone' | 'cell' | 'login' | 'nat'
>;

export function generateMockUsers(count = 10): MockUser[] {
  return Array.from({ length: count }).map(() => ({
    name: {
      title: randomTitle(),
      first: faker.person.firstName(),
      last: faker.person.lastName(),
    },
    location: {
      country: faker.location.country(),
      city: faker.location.city(),
      state: faker.location.state(),
      postcode: faker.location.zipCode(),
      coordinates: {
        latitude: String(faker.location.latitude()),
        longitude: String(faker.location.longitude()),
      },
      timezone: { offset: faker.location.timeZone(), description: faker.location.timeZone() },
      street: {
        number: Number(faker.location.buildingNumber()),
        name: faker.location.streetAddress(),
      },
    },
    email: faker.internet.email(),
    picture: {
      large: faker.image.avatar.toString(),
      medium: faker.image.personPortrait.toString(),
      thumbnail: faker.image.avatar(),
    },
  }));
}

function randomTitle(): Title {
  const values = Object.values(Title);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

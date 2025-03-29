import { getUser } from "@/lib/session";

const HATE = [
  "user_123 just got warmer..",
  "Maybe you should give up?",
  "You're not very good at this",
  "Get that babb!",
  "You suck!",
  "Eat shit!",
  "Go home, you're drunk af",
  "I bet user_42 will get there first",
];

const FEEDBACK = [
  "Getting colder..",
  "I would'nt walk in that direction..",
  "Try the the correct direction",
  "What are you doing over here?",
  "No babb this way!",
  "Warmer..",
  "Correct direction, finally",
  "You're getting there..",
  "Keep going..",
  "Keep it going!",
];

const getRandomElement = (array: string[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomCoordinate = () => ({
  x: Math.floor(Math.random() * 101),
  y: Math.floor(Math.random() * 101),
});

export async function GET() {
  const user = await getUser();

  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get random elements from each list
  const randomHate = getRandomElement(HATE);
  const randomFeedback = getRandomElement(FEEDBACK);
  const randomCoordinates = getRandomCoordinate();

  return Response.json({
    hate: randomHate,
    feedback: randomFeedback,
    coordinates: randomCoordinates,
  });
}